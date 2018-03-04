<template>
  <div id="app">
    <div>
      <h2>성공회대학교 투표시스템</h2>
      <Waiting v-if="page==0" :switchPage="switchPage" :toggleLoading="toggleLoading"/>
      <Vote v-if="page==1" :switchPage="switchPage" :toggleLoading="toggleLoading" :responseData="responseData"/>
      <GoodBye v-if="page==2" :switchPage="switchPage"/>
    </div>
    <div class="loadingWrapper">
      <Loading v-if="loading" class="loading"/>
    </div>
  </div>
</template>

<script>
import Loading from './components/Loading'
import Waiting from './components/Waiting'
import Vote from './components/Vote'
import GoodBye from './components/GoodBye'

export default {
  name: 'app',
  data () {
    return {
      loading: false,
      page: false,
      last: false,
      responseData: null,
    }
  },
  methods: {
    switchPage: function (switching, responseData) {
      this.page = switching
      this.responseData = responseData
    },
    toggleLoading: function (switching) {
      this.loading = switching
    }
  },
  components: {
    Loading,
    Waiting,
    Vote,
    GoodBye
  },
}
</script>

<style>
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

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  z-index: 100;
}
</style>
