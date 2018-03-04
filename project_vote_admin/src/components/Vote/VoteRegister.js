import React, { Component } from 'react'
import * as Rx from 'rxjs'

// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

import { inputStyle, buttonStyle } from '../../constants/CommonStyles'
import { getVoteTargetDepartment } from '../../actions/RegisterActions'

class Vote extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectList: [],
      selectValue: '1a',
      inputNameValue: '',
    }
    this.inputNameValue$ = new Rx.Subject()

    this.handleChangeSelect = this.handleChangeSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.inputNameValue$
      .subscribe(inputNameValue => this.setState({ inputNameValue }))

    getVoteTargetDepartment()
      .then((selectList) => {
        this.setState({ selectList })
      })
  }

  handleChangeSelect(event) {
    // console.log('click ')
    // this.setState({ dropdownOpen: false, selectValue: option })
    this.setState({ selectValue: event.target.value })
  }

  handleSubmit(event) {
    console.log(this.state.inputNameValue, this.state.selectValue)
    event.preventDefault()
  }

  render() {
    return (
      <div style={styles.container}>
        <span style={{ fontSize: '1rem' }}>선거 등록</span>
        <form onSubmit={this.handleSubmit} style={styles.form}>
          <input
            type="text"
            onChange={e => this.inputNameValue$.next(e.target.value)}
            placeholder="선거 이름을 입력하세요"
            style={inputStyle}
          />
          
          <label style={styles.margin}>
            {`대상 : `}
            <select value={this.state.selectValue} onChange={this.handleChangeSelect} style={styles.select}>
              {this.state.selectList.map((op, index) => {
                return (
                  <option value={op} key={index}>{op}</option>
                )
              })}
            </select>
          </label>
          <input type="submit" value="등록" style={buttonStyle} />
        </form>
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
  form: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  margin: {
    margin: '1rem 1rem',
  },
  select: {
    width: '10rem',
    height: '2rem',
    borderRadius: 3,
  }
}

export default Vote;
