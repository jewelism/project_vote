import React, { Component } from 'react'

import { flexColumn } from '../constants/CommonStyles'

class CandidateItem extends Component {
  render() {
    const item = this.props.item
    const rowStyle = {
      marginTop: '10px',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around'
    }
    const itemStyle = {
      marginBottom: '2px'
    }

    return (
      <div>
        <style scoped>
          {`
          .item {
            width: 20vw;
            border: 1px solid black;
            border-radius: 3px;
            padding: 25px 15px 0px 15px;
            margin: 10px;
            display: inline-block;
          }
          .picture {
            max-width: 70%;
            max-height: 70%;
            margin-bottom: 20px;
          }
        `}
        </style>
        <div className="item" style={flexColumn}>
          <img src={item.photo} className="picture" alt="후보자 이미지"/>
          <h3>{item.campName}</h3>
          <h3>후보 {item.candidateId}번</h3>
          <div style={rowStyle}>
            <div style={Object.assign({}, itemStyle, flexColumn)}>
              <div>{item.leaderDeptName}</div>
              <span>{item.leaderName}</span>
            </div>
            <div style={Object.assign({}, itemStyle, flexColumn)}>
              <div>{item.subLeaderDeptName}</div>
              <span>{item.subLeaderName}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CandidateItem

