<template>
  <div>
    <h1>선거 정보</h1>
    
    <div v-if="loaded && data" class="virTable">
      <h5>테이블 행을 누르면 자세한 정보를 볼 수 있습니다</h5>
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
      <div v-for="(d, index) in data">
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
    <fetch-failed v-else />

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

import ProgressBar from '../../components/common/ProgressBar'
import CandidateItem from '../../components/common/CandidateItem'
import FetchFailed from '../../components/common/FetchFailed';
import { getVoteInfo, getVoteInfoDetail } from '../../api'

export default {
  name: 'VoteInfo',
  data: () => ({
    tableHead: ['선거 번호', '대상', '투표 이름', '시간'],
    data: null,
    loaded: false,
    candidateList: [],
    listLoaded: false,
    hoverIndex: -1,
    errorMsg: '',
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
      { width: '100px' },
      { width: '100px' },
      { width: '300px' },
      { width: '500px' },
    ],
    rowStyle: {
      'display': 'flex',
      'flex-direction': 'row',
    }
  }),
  methods: {
    async onClick(voteId) {
      this.$eventBus.$emit('loading', true);
      const {data} = await getVoteInfoDetail(voteId)
      if(data){
        // console.log(data.data)
        this.candidateList = data.data;
        this.listLoaded = true;
      } else {
        alert('데이터 받기 실패');
      }
      this.$eventBus.$emit('loading', false);
    },
    isHover(index){
      return this.hoverIndex===index;
    },
  },
  async mounted(){
    this.$eventBus.$emit('loading', true);
    try {
      const {data} = await getVoteInfo()
      // console.log(data)
      if(data){
        this.data = data.data;
      } else {
        alert('데이터를 가져오는데 실패했습니다!');
      }
    } catch(err){
      this.errorMsg = '서버에서 데이터를 불러올 수 없습니다.';
    } finally {
      this.loaded = true
      this.$eventBus.$emit('loading', false);
    }
  },
  filters: {
    moment(date) {
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  components: {
    CandidateItem,
    ProgressBar,
    FetchFailed
  },
}
</script>

<style scoped>
.virTable {
  width: 100%;
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
  margin: 5px;
  padding: 5px;
}

</style>
