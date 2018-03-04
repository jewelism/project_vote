<template>
  <div>
    <h2>유의사항</h2>
    <div>
      <p v-for="index in 4">
        {{index}}. 유의사항{{index}}
      </p>
    </div>
    <div :style="{ marginTop: '3rem' }">
      <p>
        인증번호를 입력하고, 엔터를 누르세요!
      </p>
      <input type="text" v-model="authCode" @change="inputHandler" placeholder="인증번호"/>
    </div>
    <div :style="{ marginTop: '3rem' }">
      <p>
        {{ msg }}
      </p>
    </div>
  </div>
</template>

<script>
import { postAccess } from '../actions'

export default {
  name: 'Waiting',
  props: ['toggleLoading', 'switchPage'],
  data () {
    return {
      authCode: '',
      msg: '',
    }
  },
  methods: {
    inputHandler: async function () {
      this.toggleLoading(true)
      let result = await postAccess(this.authCode)
      // console.log(this.authCode, result)
      this.toggleLoading(false)
      if (result) {
        this.msg = result.data.msg
        localStorage.setItem('token', result.data.jwt)
        if(result.data.data){
          localStorage.setItem('authCode', this.authCode)
          this.switchPage(1, result.data.data)
        }
      } else {
        alert('오류가 발생했습니다.\n관리자에게 문의하세요')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
