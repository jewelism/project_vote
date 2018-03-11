import React, { Component } from 'react'
import Rx from 'rxjs'

import Button from '../common/Button'
import { emcCheck, getAuthCode, authCodeLogin, authCodeLogout } from '../actions'
import { inputStyle, buttonStyle, wrapperStyle } from '../constants'

class Voter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: '',
      password: '',
      isLogin: false,
      inputIdValue: '',
      resultMsg: '',
      status: '',
      authedId: null,
      authedData: null,
      authMsg: '',
      authStatus: '',
      authCode: '',
    }
    this.inputIdValue$ = new Rx.Subject()
    this.onPressGetAuthCodeBtn = this.onPressGetAuthCodeBtn.bind(this)
    this.onClickLogout = this.onClickLogout.bind(this)
  }

  componentDidMount() {
    this.inputIdValue$
      .filter(val => val.length >= 4)
      .debounceTime(400)
      .subscribe(async (id) => {
        this.setState({ resultMsg: '', authedId: null, authedData: null, authMsg: '', authCode: '', status: '', authStatus: '' })
        const token = localStorage.getItem('token')
        // console.log('check token : ', token)
        let result = await emcCheck(id, token)
        // console.log(result)
        if (result && result.status === 200) {
          this.setState({
            resultMsg: result.data.msg,
            status: result.data.status,
            authedId: id,
            authedData: result.data
          })
        } else {
          this.setState({ resultMsg: '뭔가 잘못된거같아요. 관리자에게 문의하세요!', status: 'FAIL' })
        }
      })
  }

  onPressGetAuthCodeBtn() {
    getAuthCode(this.state.authedId)
      .then(async (result) => {
        // console.log(this.state.authedId, result)
        if (result) {
          await this.setState({ authMsg: result.msg, authStatus: result.status })
          if(result.data) this.setState({ authCode: result.data })
        } else {
          this.setState({ authMsg: '뭔가 잘못된거같아요. 관리자에게 문의하세요!', status: 'FAIL' })
        }
      })
  }

  onClickLoginBtn = () => {
    const { id, password } = this.state
    authCodeLogin({ id, password })
      .then((result) => {
        alert(result.data.msg)
        if (result.data.data) {
          this.setState({ isLogin: true })
        }
      })
  }

  async onClickLogout() {
    const token = localStorage.getItem('token2')
    let result = await authCodeLogout(token)
    if (result) {
      this.props.switchPage('MainPage')
      // this.props.toggleFooterMenu(false)
    } else {
      alert('알수없는 오류발생')
      return false
    }
  }

  beforeLoginView = () => {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'scale(1.5) translate(0px, 30px)'
      }}>
        <div style={{ fontSize: '1rem', marginTop: '2vw' }}>선거 관리 위원회 로그인</div>
        <div style={{ fontSize: '0.8rem', marginTop: '20px', marginBottom: '1vw' }}>유권자 인증번호 발급 페이지</div>
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

  afterLoginView = () => {
    return (
      <div style={styles.container}>
        <span style={{ fontSize: '1rem', margin: '1rem' }}>유권자 투표권 확인</span>
        <input
          type="text"
          onChange={e => this.inputIdValue$.next(e.target.value)}
          placeholder="학번을 입력하세요"
          style={Object.assign({}, styles.input, inputStyle)}
        />
        <div style={{ fontSize: '1rem', margin: '1rem' }}>
          {this.state.resultMsg}
        </div>

        {this.state.authedData &&
          <div style={{ fontSize: '1rem', margin: '1rem' }}>
            {this.state.authedData.data &&
              <div style={styles.border}>
                학부 : {this.state.authedData.data.department.departmentName}
                ({this.state.authedData.data.department.departmentId})<br />
                이름 : {this.state.authedData.data.name}<br />
                전화 : {this.state.authedData.data.tel}
              </div>
            }
          </div>
        }

        {this.state.status === 'SUCCESS' &&
          <button
            onClick={this.onPressGetAuthCodeBtn}
            style={Object.assign({}, buttonStyle, { margin: '1rem' })}>인증코드 발급</button>
        }

        <div style={{ fontSize: '1rem', margin: '1rem' }}>
          {this.state.authMsg}<br />
          {this.state.authStatus === "SUCCESS" && this.state.authCode}
        </div>
        <Button onClick={this.onClickLogout}>로그아웃</Button>
      </div>
    )
  }

  render() {
    return (
      <div>
        {!this.state.isLogin && this.beforeLoginView()}
        {this.state.isLogin && this.afterLoginView()}
      </div>
    )
  }
}



const styles = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    textAlign: 'center',
  },
  border: {
    borderWidth: 1,
    borderColor: '#008CBA',
  }
}

export default Voter
