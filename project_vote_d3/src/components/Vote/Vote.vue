<template>
  <div>
    <h1>선거 정보</h1>
    <h5>테이블 행을 누르면 자세한 정보를 볼 수 있습니다</h5>

    <div v-if="loaded && data" class="virTable">
      <div class="virThead">
        <div :style="rowStyle">
          <div v-for="index in tableHead.length"
            :style="[
              tdStyle,
              tdLength[index-1],
              { backgroundColor:'rgba(114, 212, 255, 0.3)', fontWeight:'bold' }
              ]"
          >
            {{tableHead[index-1]}}
          </div>
        </div>
      </div>
      <div
        v-for="(d, index) in data"
      >
        <div 
          @click="onClick(d.voteId)"
          @mouseover="hoverIndex=index"
          @mouseleave="hoverIndex=-1"
          :style="[rowStyle, isHover(index) ? hoverStyle : style]"
        >
          <div :style="[tdStyle, tdLength[0]]">{{d.voteId}}</div>
          <div :style="[tdStyle, tdLength[1]]">{{d.target}}</div>
          <div :style="[tdStyle, tdLength[2]]">{{d.voteName}}</div>
          <div :style="[tdStyle, tdLength[3]]">{{ d.startTime | moment }} ~ {{ d.endTime | moment }}</div>
        </div>
        
        <div :style="[rowStyle, { width: '99.25%' }]">
          <div :style="{ width: '10%', 'display': 'flex', alignItems: 'center' }">
            현재 투표율 :
          </div>
          <div :style="{ width: '90%' }">
            <ProgressBar :percentage="d.votePercent" :index="index"/>
          </div>
        </div>
      </div>
    </div>

    <div v-if="listLoaded" class="itemWrapper">
      <CandidateItem
        v-if="candidateList.length!=0"
        v-for="item in candidateList"
        :item="item"
        :key="item.candidateId"
        class="item"/>
      <div v-else>
        정보 없음
      </div>
    </div>
    
  </div>
</template>

<script>
import moment from 'moment'

import ProgressBar from '../Common/ProgressBar'
import CandidateItem from '../Common/CandidateItem'
import { getVoteInfo, getVoteInfoDetail } from '../../actions'

export default {
  name: 'Vote',
  props: ['toggleLoading'],
  data () {
    return {
      data: null,
      loaded: false,
      candidateList: [],
      listLoaded: false,
      hoverIndex: -1,
      style: {
        backgroundColor: 'transparent',
        cursor: 'auto',
      },
      hoverStyle: {
        backgroundColor: 'rgba(114, 212, 255, 0.3)',
        cursor: 'pointer',
      },
      tdStyle: {
        border: '1px solid #72D4FF',
        padding: '10px',
        margin: '1px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      tdLength: [
        { width: '7vw' },
        { width: '5vw' },
        { width: '30vw' },
        { width: '30vw' },
      ],
      rowStyle: {
        'display': 'flex',
        'flex-direction': 'row',
      }
    }
  },
  methods: {
    onClick: async function (voteId) {
      this.toggleLoading(true)
      let result = await getVoteInfoDetail(voteId)
      if(result){
        // console.log(result.data.data)
        this.candidateList = result.data.data
        this.listLoaded = true
      } else {
        alert('데이터 받기 실패')
      }
      this.toggleLoading(false)
    },
    isHover: function(index){
      // console.log(index)
      return this.hoverIndex==index
    },
  },
  created () {
    this.tableHead = ['선거 번호', '대상', '투표 이름', '시간']
  },
  async mounted(){
    this.toggleLoading(true)
    let result = await getVoteInfo()
    // console.log(result)
    if(result){
      this.data = result.data.data
    } else {
      alert('데이터를 가져오는데 실패했습니다!')
    }
    this.loaded = true
    this.toggleLoading(false)
  },
  filters: {
    moment: function (date) {
      return moment(date).format("YYYY-MM-DD HH:mm:ss")
    }
  },
  components: {
    CandidateItem,
    ProgressBar
  },
}
</script>

<style scoped>
.virTable {
  width: 70vw;
  margin: 0 auto;
}

.td {
  border: 1px solid #72D4FF;
  padding: 10px;
  margin: 1px;
}

.itemsWrapper {
  margin: 10px auto;
}

.item {
  border: 1px solid #72D4FF;
  width: 100%;
  margin: 1rem;
  padding: 1rem;
}

</style>
