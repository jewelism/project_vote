<template>
  <div>
    <h1>선거 여부 확인</h1>
    <md-field md-inline>
      <label>인증코드를 입력하세요</label>
      <md-input v-model="id" @change="inputHandler"></md-input>
    </md-field>
    <div>
      <div v-if="checkLoaded">
        <h3>선거 여부 확인</h3>
      </div>
      <h4>{{ msg }}</h4>
    </div>
  </div>
</template>

<script>
import Rx from 'rxjs'
import { getSuffrage, voteCheck } from '../../api'

export default {
  name: 'CheckVote',
  data: () => ({
    checkLoaded: false,
    id: '',
    msg: '',
  }),
  methods: {
    inputHandler() {
      if(this.id.length>0){
        voteCheck(this.id)
          .then(({data}) => {
            if(data){
              // console.log(data)
              this.msg = data.message;
            } else {
              this.msg = 'API 오류 발생';
            }
            this.checkLoaded = true;
          })
          .catch(err => {
            this.msg = '서버에서 데이터를 불러올 수 없습니다.';
          });
      }
    }
  },
  beforeCreate() {
    this.inputId$ = new Rx.Subject();
  },
  mounted() {
    this.inputId$
      .debounceTime(300)
      .subscribe(id => this.inputHandler);
  },
  watch: {
    id(val) {
      if(val.length < 4){
        this.msg = '5글자 이상 입력하고 엔터키를 누르세요'
        this.checkLoaded = false;
      } else {
        this.inputId$.next(val);
      }
    }
  },
}
</script>
