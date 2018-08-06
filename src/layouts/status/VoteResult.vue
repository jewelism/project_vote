<template>
  <div>
    <h1>투표 결과</h1>
    <fetch-failed v-if="error"/>
    <div v-for="item in dataList" 
      :style="{ 
        // border: '1px solid gray', 
        padding: '10px', 
        marginBottom:'20px' 
      }">
      <div class="vote-name">
        {{item.voteName}}
      </div>
      <div class="flex-row-center">
        <div v-for="(candidate, index) in item.data" >
          <CandidateItem :item="candidate" :style="{ width: '25vw' }"/>
          {{candidate.message}}
          <div v-if="index==0" :style="{ fontSize: '40px', fontWeight:'bold' }">
            당선
          </div>
        </div>
      </div>
      <hr/>
    </div>
  </div>
</template>

<script>
import CandidateItem from '../../components/common/CandidateItem'
import { getVoteResult } from '../../api'
import FetchFailed from '../../components/common/FetchFailed';

export default {
  name: 'VoteResult',
  components: {
    CandidateItem,
    FetchFailed
  },
  data: () => ({
    dataList: [],
    maxValueList: [],
    error: false,
  }),
  async mounted () {
    this.$eventBus.$emit('loading', true);
    try {
      const {data} = await getVoteResult();
      console.log(data);
      if(data){
        this.dataList = data.message;
      } else {
        alert('오류 발생\n관리자에게 문의하세요')
      }
    } catch(err) {
      this.error = true;
    } finally {
      this.$eventBus.$emit('loading', false);
    }
  },
}
</script>

<style scoped>
.flex-row-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.vote-name {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>