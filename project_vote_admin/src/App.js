import React, { Component } from 'react';

import { logout } from './actions'

import FooterMenu from './components/FooterMenu'
import MainPage from './components/MainPage'
import Vote from './components/Vote/Vote'
import VoteRegister from './components/Vote/VoteRegister'
import Register from './components/Register'
import Voter from './components/Voter'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPage: 'MainPage',
      menuVisible: false,
    }

    this.switchPage = this.switchPage.bind(this)
    this.toggleFooterMenu = this.toggleFooterMenu.bind(this)
    this.onUnload = this.onUnload.bind(this)
  }

  onUnload(event) { // the method that will be used for both add and remove event
    logout()
    this.switchPage('MainPage')
    this.toggleFooterMenu(false)
    event.returnValue = "로그아웃합니다"
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onUnload)
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onUnload)
  }

  switchPage(currentPage) {
    // if(this.state.currentPage!==currentPage)
    this.setState({ currentPage })
  }

  toggleFooterMenu(bool) {
    this.setState({ menuVisible: bool })
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.inner}>
          <span style={{ fontSize: this.state.currentPage === 'MainPage' ? '2.2rem' : '1.7rem', marginTop:30 }}>성공회대학교 투표시스템</span>
          {this.state.currentPage === 'MainPage' && <MainPage toggleFooterMenu={this.toggleFooterMenu} switchPage={this.switchPage} />}
          {this.state.currentPage === 'Vote' && <Vote switchPage={this.switchPage} />}
          {this.state.currentPage === 'VoteRegister' && <VoteRegister switchPage={this.switchPage} />}
          {this.state.currentPage === 'CandidateRegister' && <Register />}
          {this.state.currentPage === 'AdminRegister' && <Register admin />}
          {this.state.currentPage === 'Voter' && <Voter />}
        </div>
        <div style={{
          width: '100%',
          position: 'fixed',
          bottom: 0,
          paddingBottom: '7vh',
          backgroundColor: '#FFF',
          textAlign: 'center',
        }}>
          {this.state.menuVisible && <FooterMenu onPress={this.switchPage} toggleFooterMenu={this.toggleFooterMenu} />}
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
    fontFamily: 'sans-serif',
    paddingTop: '3.5rem',
    paddingBottom: '20vh',
    fontSize: '1rem',
  },
  inner: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}

export default App;
