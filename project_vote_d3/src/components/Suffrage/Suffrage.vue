<template>
  <div>
    <h1>선거 확인</h1>
    <input v-model="id" placeholder="학번을 입력하세요" @change="inputHandler">
    <div>
      <div v-if="suffrageLoaded">
        <h3>선거권 확인</h3>
        <h4>{{ msg }}</h4>
      </div>
      
      <div v-if="checkLoaded">
        <h3>선거 여부 확인</h3>
        <h4>{{ msg2 }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import Rx from 'rxjs'
import { getSuffrage, voteCheck } from '../../actions'

export default {
  name: 'Suffrage',
  props: ['toggleLoading'],
  data () {
    return {
      suffrageLoaded: false,
      checkLoaded: false,
      id: '',
      msg: '',
      msg2: '',
    }
  },
  methods: {
    inputHandler: function () {
      if(this.id.length!=0){
        getSuffrage(this.id)
        .then((result)=>{
          if(result){
            // console.log(result)
            this.msg = result.data.message
          } else {
            this.msg = 'API 오류 발생'
          }
          this.suffrageLoaded = true
        })
      
        voteCheck(this.id)
          .then((result2)=>{
            if(result2){
              // console.log(result2)
              this.msg2 = result2.data.message
            } else {
              this.msg2 = 'API 오류 발생'
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
      .subscribe(id => {
        this.inputHandler()
      })
  },
  watch: {
    id: function (val, oldVal) {
      if(val.length<4){
        this.suffrageLoaded = false
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
