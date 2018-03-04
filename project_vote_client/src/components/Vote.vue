<template>
  <div>
    <div class="voteWrapper">
      <h1>{{ responseData[currentVote].voteName }}</h1>
      <div class="itemsWrapper">
        <div
          v-for="(candidate, index) in responseData[currentVote].candidates"
          @click="nextVote(index)"
          @mouseover="hoverIndex=index"
          @mouseleave="hoverIndex=-1"
          :style="isHover(index) ? hoverStyle : style"
          class="item"
        >
          <img :src="candidate.photo" class="picture"/>
          <h3>{{ candidate.campName }}</h3>
          <h3>후보 {{ candidate.candidateId }}번</h3>
          <div :style="rowStyle">
            <div :style="itemStyle">
              <div>{{ candidate.leaderDeptName }}</div>
              <span>{{ candidate.leaderName }}</span> 
            </div>
            <div :style="itemStyle">
              <div>{{ candidate.subLeaderDeptName }}</div>
              <span>{{ candidate.subLeaderName }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postVote } from '../actions'

export default {
  name: 'Vote',
  props: ['toggleLoading', 'switchPage', 'responseData'],
  data () {
    return {
      loaded: false,
      voteList: [],
      currentVote: 0,
      myVotedList: [],
      hoverIndex: -1,
      style: {
        opacity: '1.0',
        borderWidth: '1px',
        borderColor: '#72D4FF',
        cursor: 'auto',
      },
      hoverStyle: {
        opacity: '0.3',
        borderColor: '#72D4FF',
        cursor: 'pointer',
      },
      rowStyle: {
        'display': 'flex',
        'flex-direction': 'row-reverse',
        'justify-content': 'space-around'
      },
      itemStyle: {
        // border:'1px solid black',
        marginBottom: '2px'
      }
    }
  },
  methods: {
    nextVote: async function (id) {
      if (confirm(`후보 ${this.responseData[this.currentVote].candidates[id].candidateId}번에 투표하시겠습니까?`)) {
        console.log(this.responseData[this.currentVote].candidates[id])
        this.myVotedList.push(this.responseData[this.currentVote].candidates[id])
        if (this.currentVote + 1 == this.responseData.length) { //call post api
          this.toggleLoading(true)
          console.log(this.myVotedList)
          let result = await postVote(this.myVotedList) 
          if(result) { //exit vote
            this.switchPage(2)
          } else {
            alert('오류가 발생했습니다!\n관리자에게 문의해주세요')
            return false
          }
        } else {
          this.currentVote ++
        }
        this.toggleLoading(false)
      } else {
        return false
      }
    },
    isHover: function(index){
      return this.hoverIndex==index
    },
  },
  async mounted () {
    
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.voteWrapper {
  text-align: center;
}

.itemsWrapper {
  margin: 10px auto;
}

.item {
  width: 15%;
  border: 1px solid black;
  border-radius: 3px;
  padding: 25px 15px 0px 15px;
  margin: 10px;
  display: inline-block;
}

.picture {
  max-width: 70%;
  max-height: 70%;
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
