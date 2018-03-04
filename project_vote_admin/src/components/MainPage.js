import React, { Component } from 'react';

import { login } from '../actions'
import { inputStyle, buttonStyle, wrapperStyle } from '../constants/CommonStyles'

class MainPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: '',
      password: '',
    }

    this.onClickLoginBtn = this.onClickLoginBtn.bind(this)
  }

  async onClickLoginBtn() {
    const id = this.state.id
    const password = this.state.password
    let result = await login({ id, password })
    // console.log(result.data.data)
    if (result && result.data) {
      alert(result.data.msg)
      if (result.data.data)
        localStorage.setItem('token', result.data.data)
      // console.log('login token : ',localStorage.getItem('token'))
      if (result.data.status === "SUCCESS") {
        this.props.toggleFooterMenu(true)
        this.props.switchPage('Vote')
      }
    } else {
      alert('에러발생. 서버 관리자에게 문의하세요')
      return false
    }
  }

  render() {
    return (

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'scale(1.5) translate(0px, 30px)'
      }}>
        <div style={{ fontSize: '1rem', marginTop: '2vw', marginBottom: '1vw' }}>선거 관리 위원회 로그인</div>
        <div style={wrapperStyle}>
          <input type="text" style={inputStyle}
            onChange={(event) => {
              this.setState({ id: event.target.value })
            }} />
        </div>
        <div style={wrapperStyle}>
          <input type="password" style={inputStyle}
            onChange={(event) => {
              this.setState({ password: event.target.value })
            }}
          />
        </div>
        <div style={wrapperStyle}>
          <button onClick={this.onClickLoginBtn} style={buttonStyle}>로그인</button>
        </div>
      </div>
    )
  }
}

export default MainPage;
