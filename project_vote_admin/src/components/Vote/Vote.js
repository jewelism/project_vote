import React, { Component } from 'react'

import CandidateItem from '../CandidateItem'
import { getVoteList, deleteVote, saveCandidates } from '../../actions'
import { buttonStyle, flexAlignCenter, flexColumn, flexRow, hover, notHover, inputStyle } from '../../constants'

class Vote extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hoverIndex: -1,
      voteList: [],
      candidates: [],
      selectedVoteId: null,
      visibleCandidatesRegister: false,
      campName: null,
      "leaderName": null,
      "leaderDepName": null,
      "subLeaderName": null,
      "subLeaderDepName": "",
      "photo": null,
    }

    this.onClickRegister = this.onClickRegister.bind(this)
    this.isHover = this.isHover.bind(this)
    this.onClickTr = this.onClickTr.bind(this)
  }

  componentDidMount() {
    //get vote list
    const token = localStorage.getItem('token')
    getVoteList(token)
      .then((result) => {
        if (result && result.data) {
          this.setState({ voteList: result.data || [] })
        } else {
          alert('오류 발생')
        }
      })
  }

  onClickRegister() {
    this.props.switchPage('VoteRegister')
  }

  onClickCandidateRegister = () => {
    this.setState({ visibleCandidatesRegister: true })
  }

  onClickSaveCandidate = () => {
    const { selectedVoteId } = this.state
    if (selectedVoteId) {
      const reqBody = {
        "campName": this.state.campName,
        "leaderName": this.state.leaderName,
        "leaderDepName": this.state.leaderDepName,
        "subLeaderName": this.state.subLeaderName,
        "subLeaderDepName": this.state.subLeaderDepName,
        "photo": this.state.photo
      }
      saveCandidates(selectedVoteId, reqBody)
        .then((result) => {
          if (result) {
            this.setState({
              visibleCandidatesRegister: false,
              campName: null,
              "leaderName": null,
              "leaderDepName": null,
              "subLeaderName": null,
              "subLeaderDepName": "",
              "photo": null,
            })
            alert('후보자 등록 완료')
          } else {
            alert('오류 발생')
          }
        })
    } else {
      alert('후보자를 등록할 선거를 선택하세요')
    }
  }

  onClickDelete = () => {
    deleteVote(this.state.selectedVoteId)
      .then((result) => {
        if (result) {
          alert(result.data.msg)
        } else {
          alert('오류 발생')
        }
      })
  }

  isHover(index) {
    return this.state.hoverIndex === index
  }

  onClickTr(item) {
    this.setState({ selectedVoteId: item.voteId, candidates: item.candidates })
  }

  render() {
    const tableHead = ['번호', '이름']
    const widthList = ['5vw', '20vw']
    return (
      <div style={Object.assign({}, flexColumn)}>
        <button onClick={this.onClickRegister} style={Object.assign({ alignSelf: 'center' }, buttonStyle)}>선거 등록</button>
        <button onClick={this.onClickCandidateRegister} style={Object.assign({ alignSelf: 'center' }, buttonStyle)}>후보자 등록</button>
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
        {this.state.visibleCandidatesRegister &&
          <div>
            <input type="text" style={inputStyle}
              onChange={e => this.setState({ campName: e.target.value })}
              placeholder="선본 이름을 입력하세요"
            />
            <input type="text" style={inputStyle}
              onChange={e => this.setState({ leaderName: e.target.value })}
              placeholder="회장 이름을 입력하세요"
            />
            <input type="text" style={inputStyle}
              onChange={e => this.setState({ leaderDepName: e.target.value })}
              placeholder="회장 학부를 입력하세요"
            />
            <input type="text" style={inputStyle}
              onChange={e => this.setState({ subLeaderName: e.target.value })}
              placeholder="부회장 이름을 입력하세요"
            />
            <input
              type="file"
              onChange={e => this.setState({ photo: e.target.files[0] })}
              style={inputStyle}
            />
            <button onClick={this.onClickSaveCandidate} style={Object.assign({ alignSelf: 'center' }, buttonStyle)}>등록</button>
          </div>
        }

        <div>
          <button onClick={this.onClickDelete} style={Object.assign({ alignSelf: 'center' }, buttonStyle)}>선거 삭제</button>
        </div>
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
