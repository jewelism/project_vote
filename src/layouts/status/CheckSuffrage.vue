<template>
  <div>
    <h1>선거 확인</h1>
    <input v-model="id" placeholder="학번을 입력하세요" @change="inputHandler">
    <div>
      <div v-if="suffrageLoaded">
        <h3>선거권 확인</h3>
        <h4>{{ msg }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import Rx from 'rxjs'
import { getSuffrage, voteCheck } from '../../api';

export default {
  name: 'CheckSuffrage',
  data: () => ({
    suffrageLoaded: false,
      id: '',
      msg: '',
      msg2: '',
  }),
  methods: {
    inputHandler() {
      if(this.id.length != 0){
        getSuffrage(this.id)
          .then(({data}) => {
            if(data){
              this.msg = data.message
            } else {
              this.msg = 'API 오류 발생';
            }
            this.suffrageLoaded = true;
          });
      }
    }
  },
  beforeCreate(){
    this.inputId$ = new Rx.Subject();
  },
  mounted(){
    this.inputId$
      .debounceTime(300)
      .subscribe(this.inputHandler);
  },
  watch: {
    id(val, oldVal) {
      if(val.length < 4){
        this.suffrageLoaded = false;
      } else {
        this.inputId$.next(val);
      }
    }
  },
}
</script>

<style>

</style>
