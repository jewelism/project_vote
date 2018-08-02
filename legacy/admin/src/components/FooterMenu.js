import React, { Component } from 'react';

import Button from '../common/Button'

class FooterMenu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menuItems: [
        { id: 'MainPage', name: '로그인' },
        { id: 'Vote', name: '선거 관리' },
        { id: 'CandidateRegister', name: '유권자 등록' },
        { id: 'Voter', name: '유권자 관리' },
        { id: 'AdminRegister', name: '선관위 등록' },
        { id: 'AdminMng', name: '선관위 관리' },
      ]
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
      </div>
    )
  }
}

export default FooterMenu;
