<template>
  <div>
    <h2>유의사항</h2>
    <div>
      <p>
        1. 여러분의 투표 결과는 오직 인증 번호로 저장이 되기 때문에 아무도 알지 못합니다.<br/>
        2. 한번 투표를 진행하면 다시 시작할 수 없습니다. 신중히 진행해 주시기 바랍니다.<br/>
        3. 인터넷 창을 닫거나 뒤로 가기 버튼을 누르지 마세요. 투표가 진행되지 않습니다.<br/>
        4. 투표 결과는 인증 번호로 다시 확인하실 수 있습니다.<br/>
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
        console.log('result:',result)
        this.msg = result.data.msg
        localStorage.setItem('token', result.data.data.jwt)
        if(result.data.data){
          localStorage.setItem('authCode', this.authCode)
          this.switchPage(1, result.data.data.list)
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
