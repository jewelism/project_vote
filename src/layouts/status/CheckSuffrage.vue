<template>
  <div>
    <h1>선거 확인</h1>
    <md-field md-inline>
      <label>학번을 입력하세요</label>
      <md-input v-model="id" @change="inputHandler"></md-input>
    </md-field>
    <div>
      <div v-if="suffrageLoaded">
        <h3>선거권 확인</h3>
      </div>
      <h4>{{ msg }}</h4>
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
  }),
  methods: {
    getSuffrage,
    voteCheck,
    inputHandler() {
      console.log(this.$route, this.$router, this.isSuffragePage());
      if(this.id.length != 0){
        this['getSuffrage'](this.id)
          .then(({data}) => {
            if(data){
              this.msg = data.message
            } else {
              this.msg = 'API 오류 발생';
            }
            this.suffrageLoaded = true;
          })
          .catch(err => {
            this.msg = '서버에서 데이터를 불러올 수 없습니다.';
          });
      }
    },
    isSuffragePage() {
      return this.$route.path.includes('suffrage');
    }
  },
  beforeCreate(){
    this.inputId$ = new Rx.Subject();
  },
  mounted(){
    this.inputId$
      .debounceTime(300)
      .subscribe(id => this.inputHandler);
  },
  watch: {
    id(val, oldVal) {
      if(val.length < 4){
        this.suffrageLoaded = false;
        this.msg = '5글자 이상 입력하고 엔터키를 누르세요'
      } else {
        this.inputId$.next(val);
      }
    }
  },
}
</script>