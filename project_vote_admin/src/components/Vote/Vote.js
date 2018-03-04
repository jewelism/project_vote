import React, { Component } from 'react'

import CandidateItem from '../CandidateItem'
import { getVoteList } from '../../actions/ManageActions'
import { buttonStyle, flexAlignCenter, flexColumn, flexRow, hover, notHover } from '../../constants/CommonStyles'

class Vote extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hoverIndex: -1,
      voteList: [],
      candidates: [],
    }

    this.onClickRegister = this.onClickRegister.bind(this)
    this.isHover = this.isHover.bind(this)
    this.onClickTr = this.onClickTr.bind(this)

  }

  componentDidMount() {
    //get vote list
    getVoteList()
      .then((result) => {
        if (result) {
          // console.log(result.data.data)
          result.data && this.setState({ voteList: result.data.data })
        } else {
          alert('오류 발생')
        }
      })
  }

  onClickRegister() {
    this.props.switchPage('VoteRegister')
  }

  isHover(index) {
    return this.state.hoverIndex === index
  }

  onClickTr(item) {
    this.setState({ candidates: item.candidates })
  }

  render() {
    const tableHead = ['번호', '이름']
    const widthList = ['5vw', '20vw']
    return (
      <div style={Object.assign({}, flexColumn)}>
        <button onClick={this.onClickRegister} style={Object.assign({ alignSelf: 'center' }, buttonStyle)}>선거 등록</button>
        <span style={{ fontSize: '1rem' }}>선거 목록</span>
        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>테이블 행을 클릭하여 관리할 수 있습니다</span>

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
            {this.state.voteList.map((item, index) => {
              return (
                <tr
                  onClick={() => this.onClickTr(item)}
                  onMouseOver={() => { this.setState({ hoverIndex: index }) }}
                  onMouseOut={() => { this.setState({ hoverIndex: -1 }) }}
                  style={Object.assign({}, flexRow, this.isHover(index) ? hover : notHover)}
                  key={index}
                >
                  <td style={Object.assign({ width: widthList[0], padding: 10 }, flexAlignCenter)}>{item.voteId}</td>
                  <td style={Object.assign({ width: widthList[1], padding: 10 }, flexAlignCenter)}>{item.voteName}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <hr />
        <div style={flexRow}>
          {this.state.candidates.map((candidate, index) => {
            return (
              <CandidateItem item={candidate} key={index} />
            )
          })}
        </div>
      </div>
    )
  }
}

export default Vote;
