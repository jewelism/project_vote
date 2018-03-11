// AdminMng
import React, { Component } from 'react'

import { getAdminList, deleteAdmin } from '../actions'

import { buttonStyle, flexAlignCenter, flexColumn, flexRow, hover, notHover } from '../constants'

class AdminMng extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedAdminId: null,
      adminList: [],
      hoverIndex: -1,
    }
  }

  componentDidMount() {
    //get vote list
    getAdminList()
      .then((result) => {
        if (result && result.data) {
          console.log(result.data)
          this.setState({ adminList: result.data || [] })
        } else {
          alert('오류 발생')
        }
      })
  }

  isHover = (index) => {
    return this.state.hoverIndex === index
  }

  onClickTr = (item) => {
    this.setState({ selectedAdminId: item.id })
  }

  onClickDelete = () => {
    if(this.state.selectedAdminId){
      deleteAdmin(this.state.selectedAdminId)
      .then((result) => {
        if (result) {
          alert(result.data.msg)
        } else {
          alert('오류 발생')
        }
      })
    } else {
      alert('삭제할 선관위를 선택하세요')
    }
  }

  render() {
    const tableHead = ['직책', '학부', '이름']
    const widthList = ['7vw', '20vw', '10vw']
    return (
      <div style={flexColumn}>
        <span style={{ fontSize: '1rem' }}>선관위 목록</span>
        <button onClick={this.onClickDelete} style={Object.assign({ alignSelf: 'center' }, buttonStyle)}>선택한 선관위 삭제</button>
        <style scoped>{`
          table{
            border: 1px solid rgba(39, 39, 39, 0.8);
          }
        `}</style>
        <table style={flexColumn} className="border">
          <thead style={{ backgroundColor: 'rgba(39, 39, 39, 0.05)' }}>
            <tr style={flexRow}>
              {tableHead.map((th, index) => {
                return (
                  <th style={Object.assign({ width: widthList[index], padding: 10 }, flexAlignCenter)} key={index}>
                    {th}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {this.state.adminList.map((item, index) => {
              return (
                <tr
                  onClick={() => this.onClickTr(item)}
                  onMouseOver={() => { this.setState({ hoverIndex: index }) }}
                  onMouseOut={() => { this.setState({ hoverIndex: -1 }) }}
                  style={Object.assign({}, flexRow, this.isHover(index) ? hover : notHover)}
                  key={index}
                >
                  <td style={Object.assign({ width: widthList[0], padding: 10 }, flexAlignCenter)}>{item.type == 1 ? '선관위원장' : '선관위원'}</td>
                  <td style={Object.assign({ width: widthList[1], padding: 10 }, flexAlignCenter)}>{item.departmentName}</td>
                  <td style={Object.assign({ width: widthList[2], padding: 10 }, flexAlignCenter)}>{item.name}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default AdminMng