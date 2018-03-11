import React, { Component } from 'react'

import { uploadVoterExcelFile, uploadAdminExcelFile } from '../actions'
import { inputStyle, buttonStyle, flexColumn } from '../constants'

class CandidatesRegister extends Component {
  constructor(props) {
    super(props)

    this.state = {
      file: null,
      resultMsg: '',
    }

    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    // console.log(this.state.file)
    // console.log(this.state.file.name)
    if (this.props.admin) {
      uploadAdminExcelFile(this.state.file)
        .then((result) => {
          console.log(result)
          result.data && this.setState({ resultMsg: result.data.msg })
        })
    } else {
      uploadVoterExcelFile(this.state.file)
        .then((result) => {
          console.log(result)
          result.data && this.setState({ resultMsg: result.data.msg })
        })
    }
    event.preventDefault()
  }

  handleFileChange(e) {
    const file = e.target.files[0]
    this.setState({ file })
  }

  render() {
    const target = this.props.admin ? '선관위' : '유권자'
    return (
      <div style={flexColumn}>
        <span style={{ fontSize: '1rem' }}>{target} 등록</span>
        <form onSubmit={this.handleSubmit} style={styles.form}>
          <label style={styles.margin}>
            {`${target} 목록 엑셀 업로드`}
          </label>
          <input
            type="file"
            onChange={this.handleFileChange}
            accept=".xlsx, .xls, .csv"
            style={inputStyle}
          />
          <input type="submit" value="등록" style={buttonStyle} />
        </form>
        <span style={{ fontSize: '2rem', color: '#272727' }}>{this.state.resultMsg}</span>
      </div>
    )
  }
}

const styles = {
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

export default CandidatesRegister;
