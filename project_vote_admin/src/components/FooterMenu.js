import React, { Component } from 'react';

import { logout } from '../actions/RegisterActions'
import Button from '../common/Button'

class FooterMenu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menuItems: [
        // { id: 'MainPage', name: '메인' },
        { id: 'Vote', name: '선거 관리' },
        { id: 'CandidateRegister', name: '유권자 등록' },
        { id: 'Voter', name: '유권자 관리' },
        { id: 'AdminRegister', name: '선관위 등록' },
        { id: 'AdminMng', name: '선관위 관리' },
      ]
    }
    this.onClickLogout = this.onClickLogout.bind(this)
  }

  async onClickLogout() {
    let result = await logout()
    if (result) {
      this.props.onPress('MainPage')
      this.props.toggleFooterMenu(false)
    } else {
      alert('알수없는 오류발생')
      return false
    }
  }

  render() {
    return (
      <div>
        {this.state.menuItems.map((item, index) => {
          return (
            <Button onClick={() => this.props.onPress(item.id)} key={index}>{item.name}</Button>
          )
        })}
        <Button onClick={this.onClickLogout}>로그아웃</Button>
      </div>
    )
  }
}

export default FooterMenu;
