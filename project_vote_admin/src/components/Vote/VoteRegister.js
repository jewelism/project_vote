import React, { Component } from 'react'
import Rx from 'rxjs'
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

import { voteRegister } from '../../actions'
import { inputStyle, buttonStyle } from '../../constants'


const DepartmentList = [
  { id: 1, name: '전체' }
  , { id: 10, name: '인문융합자율학부' }
  , { id: 11, name: '인문융합자율학부 영어학전공' }
  , { id: 12, name: '인문융합자율학부 일어일본학전공' }
  , { id: 13, name: '인문융합자율학부 중어중국학전공' }
  , { id: 14, name: '인문융합자율학부 기독교문화전공' }
  , { id: 15, name: '인문융합자율학부 혁신융합전공' }
  , { id: 20, name: '사회융합자율학부' }
  , { id: 21, name: '사회융합자율학부 사회과학전공' }
  , { id: 22, name: '사회융합자율학부 사회복지학전공' }
  , { id: 23, name: '사회융합자율학부 경영학전공' }
  , { id: 24, name: '사회융합자율학부 혁신융합전공' }
  , { id: 30, name: '미디어컨텐츠융합자율학부' }
  , { id: 31, name: '미디어컨텐츠융합자율학부 신문방송학전공' }
  , { id: 32, name: '미디어컨텐츠융합자율학부 디지털컨텐츠전공' }
  , { id: 33, name: '미디어컨텐츠융합자율학부 혁신융합전공' }
  , { id: 40, name: 'IT융합자율학부' }
  , { id: 41, name: 'IT융합자율학부 컴퓨터공학전공' }
  , { id: 42, name: 'IT융합자율학부 소프트웨어공학전공' }
  , { id: 43, name: 'IT융합자율학부 정보통신공학전공' }
  , { id: 44, name: 'IT융합자율학부 글로컬IT전공' }
  , { id: 45, name: 'IT융합자율학부 혁신융합전공' }
  , { id: 50, name: '테스트' }
]

class Vote extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectList: DepartmentList,
      selectValue: -1,
      inputNameValue: '',
      resultText: '',
    }
    this.inputNameValue$ = new Rx.Subject()

    this.handleChangeSelect = this.handleChangeSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.inputNameValue$
      .subscribe(inputNameValue => this.setState({ inputNameValue }))
    // getVoteTargetDepartment()
    //   .then((selectList) => {
    //     this.setState({ selectList })
    //   })
  }

  handleChangeSelect(event) {
    // this.setState({ dropdownOpen: false, selectValue: option })
    this.setState({ selectValue: event.target.value })
  }

  startDateInputHandler = (e, date) => {
    this.startYear = date.getFullYear()
    this.startMonth = date.getMonth()
    this.startDate = date.getDate()
    
  }

  startTimeInputHandler= (e, t)=>{
    this.startHour = t.getHours()
    this.startMin = t.getMinutes()
  }

  endDateInputHandler = (e, date) => {
    this.endYear = date.getFullYear()
    this.endMonth = date.getMonth()
    this.endDate = date.getDate()
    
  }

  endTimeInputHandler= (e, t)=>{
    this.endHour = t.getHours()
    this.endMin = t.getMinutes()
  }

  handleSubmit(event) {
    // new Date(year, month[, day[, hour[, minutes
    const startTime = new Date(this.startYear, this.startMonth, this.startDate, this.startHour, this.startMin)
    const endTime = new Date(this.endYear, this.endMonth, this.endDate, this.endHour, this.endMin)
    const body = {
      "voteName": this.state.inputNameValue,
      startTime,
      endTime,
      "target": parseInt(this.state.selectValue, 10)
    }
    voteRegister(body)
      .then((result) => {
        if (result) {
          this.setState({ resultText: result.data.msg })
        } else {
          alert('오류 발생')
        }
      })
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
              <option disabled value={-1}>선택하세요</option>
              {this.state.selectList.map((op, index) => {
                return (
                  <option value={op.id} key={index}>{op.id}. {op.name}</option>
                )
              })}
            </select>
          </label>
          <DatePicker hintText="투표 시작 날짜 선택" onChange={this.startDateInputHandler} />
          <TimePicker hintText="투표 시작 시간 선택" onChange={this.startTimeInputHandler}/>
          <DatePicker hintText="투표 종료 날짜 선택" onChange={this.endDateInputHandler} />
          <TimePicker hintText="투표 종료 시간 선택" onChange={this.endTimeInputHandler}/>
          <input type="submit" value="등록" style={buttonStyle} />
        </form>
        <div>
          {this.state.resultText}
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
