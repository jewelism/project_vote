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
    <div class="msg">
      <p>
        인증번호를 입력하고, 엔터를 누르세요!
      </p>
      <input type="text" v-model="authCode" @change="inputHandler" placeholder="인증번호"/>
    </div>
    <div class="msg">
      <p>
        {{ msg }}
      </p>
    </div>
  </div>
</template>

<script>
import { postAccess } from '../../api';

export default {
  name: 'Main',
  props: ['navigate', 'toggleLoading'],
  data: () => ({
    authCode: '',
    msg: '',
  }),
  methods: {
    async inputHandler() {
      this.toggleLoading(true);
      this.navigate({name: 'End'});
      const {data} = await postAccess(this.authCode);
      // console.log(this.authCode, data);
      if (data) {
        this.msg = data.msg
        localStorage.setItem('token', data.data.jwt);
        if(data.data){
          localStorage.setItem('authCode', this.authCode);
          this.navigate({name: 'Vote', propData: data.data.list});
        }
      } else {
        alert('오류가 발생했습니다.\n관리자에게 문의하세요')
      }
      this.toggleLoading(false);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.msg {
  margin-top: 30px;
}

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
