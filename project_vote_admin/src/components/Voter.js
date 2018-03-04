import React, { Component } from 'react'
import Rx from 'rxjs'

import { emcCheck, getAuthCode } from '../actions/ManageActions'
import { inputStyle, buttonStyle } from '../constants/CommonStyles'

class Voter extends Component {
  constructor(props) {
    super(props)

    this.state = {
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
  }

  componentDidMount() {
    this.inputIdValue$
      .filter(val => val.length >= 4)
      .debounceTime(400)
      .subscribe(async (id) => {
        this.setState({ resultMsg: '', authedId: null, authedData: null, authMsg: '', authCode: '', status: '', authStatus: '' })
        const token = localStorage.getItem('token')
        console.log('check token : ', token)
        let result = await emcCheck(id, token)
        console.log(result)
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
        console.log(this.state.authedId, result)
        if (result) {
          await this.setState({ authMsg: result.data.msg, authStatus: result.data.status })
          result.data.data && this.setState({ authCode: result.data.data })
        } else {
          this.setState({ authMsg: '뭔가 잘못된거같아요. 관리자에게 문의하세요!', status: 'FAIL' })
        }
      })
  }

  render() {
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
