<template>
  <div>
    <h1>선거 여부 확인</h1>
    <input v-model="id" placeholder="인증코드를 입력하세요" @change="inputHandler">
    <div>
      <div v-if="checkLoaded">
        <h3>선거 여부 확인</h3>
        <h4>{{ msg }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import Rx from 'rxjs'
import { getSuffrage, voteCheck } from '../../actions'

export default {
  name: 'Check',
  data () {
    return {
      checkLoaded: false,
      id: '',
      msg: '',
    }
  },
  methods: {
    inputHandler: function () {
      if(this.id.length != 0){
        voteCheck(this.id)
          .then(result => {
            if(result){
              // console.log(result)
              this.msg = result.data.message
            } else {
              this.msg = 'API 오류 발생'
            }
            this.checkLoaded = true
          })
      }
    }
  },
  beforeCreate(){
    this.inputId$ = new Rx.Subject()
  },
  mounted(){
    this.inputId$
      .debounceTime(300)
      .subscribe(this.inputHandler)
  },
  watch: {
    id: function (val, oldVal) {
      if(val.length<4){
        this.checkLoaded = false
      } else {
        this.inputId$.next(val)
      }
    }
  },
}
</script>

<style>

</style>
