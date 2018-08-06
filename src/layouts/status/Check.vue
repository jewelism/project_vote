<template>
  <div>
    <h1>{{title}}</h1>
    <md-field md-inline>
      <label>{{inputLabel}}</label>
      <md-input v-model="id" @change="inputHandler"></md-input>
    </md-field>
    <div>
      <fetch-failed v-if="msg==='error'"/>
      <h4 v-else>{{ msg }}</h4>
    </div>
  </div>
</template>

<script>
import Rx from 'rxjs'
import { getSuffrage, voteCheck } from '../../api';
import FetchFailed from '../../components/common/FetchFailed';

export default {
  name: 'Check',
  components: {
    FetchFailed
  },
  data: () => ({
    loaded: false,
    id: '',
    msg: '',
  }),
  computed: {
    title() {
      return this.isSuffragePage() ? '선거권 확인' : '선거 여부 확인';
    },
    inputLabel() {
      return this.isSuffragePage() ? '학번을 입력하세요' : '인증코드를 입력하세요';
    }
  },
  methods: {
    getSuffrage,
    voteCheck,
    inputHandler() {
      // console.log(this.$route, this.$router, this.isSuffragePage());
      if(this.id.length > 0){
        this[this.getApiName()](this.id)
          .then(({data}) => {
            if(data){
              this.msg = data.message
            } else {
              this.msg = 'error';
            }
            this.loaded = true;
          })
          .catch(err => {
            this.msg = 'error';
          });
      }
    },
    isSuffragePage() {
      return this.$route.path.includes('suffrage');
    },
    getApiName() {
      return this.isSuffragePage() ? 'getSuffrage' : 'voteCheck';
    }
  },
  watch: {
    id(val, oldVal) {
      const {length} = val;
      if(length !==0 && length < 4){
        this.loaded = false;
        this.msg = '5글자 이상 입력하고 엔터키를 누르세요'
      } else {
        this.inputId$.next(val);
      }
    },
    '$route.path'(val){
      this.id = '';
      this.msg = '';
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
}
</script>