<template>
  <div id="app">
    <Vote v-if="currentMenu=='vote'" :toggleLoading="toggleLoading" :disable="true"/>
    <Candidate v-if="currentMenu=='candidate'" :toggleLoading="toggleLoading" :disable="true"/>
    <Suffrage v-if="currentMenu=='suffrage'" :toggleLoading="toggleLoading"/>
    <Check v-if="currentMenu=='check'" :toggleLoading="toggleLoading"/>
    <Result v-if="currentMenu=='result'" :toggleLoading="toggleLoading" :disable="true"/>
    <div class="footerHolder">
      <FooterMenu :currentMenu="currentMenu" :onPress="onPressMenuItem" class="footer"/>  
    </div>
    <div class="loadingWrapper">
      <Loading v-if="loading" class="loading"/>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Vote from './components/Vote/Vote'
import Candidate from './components/Candidate/Candidate'
import Suffrage from './components/Suffrage/Suffrage'
import Check from './components/Check/Check'
import Result from './components/Result/Result'
import FooterMenu from './components/FooterMenu'
import Loading from './components/Loading'

export default {
  name: 'app',
  data (){
    return {
      currentMenu: 'vote',
      loading: false,
    }
  },
  methods: {
    onPressMenuItem : function(menu){
      this.currentMenu = menu
    },
    toggleLoading: function (switching) {
      this.loading = switching
    }
  },
  components: {
    Vote,
    Candidate,
    Suffrage,
    Check,
    Result,
    FooterMenu,
    Loading
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 4rem;
  padding-bottom: 4rem;
}

.footerHolder {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
}

.footer {
  height: 4rem;
  margin: auto;
}

.loadingWrapper {
  height: 50%;
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 200;
}

.loading {
  position: relative;
  left: -60%;
  top: -50%;
}

input {
  width: 15rem;
  height: 1.9rem;
  border-radius: 5px;
  font-size: 0.9rem;
  text-align: center;
}

select {
  width: 30rem;
  height: 3rem;
}

button {
  background-color: #008CBA;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 0.9rem;
  margin: 0.3rem;
  border-radius: 3px;
}
</style>
