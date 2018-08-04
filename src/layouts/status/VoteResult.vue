<template>
  <div>
    <h1>투표 결과</h1>
    <div v-for="item in dataList" 
      :style="{ 
        // border: '1px solid gray', 
        padding: '10px', 
        marginBottom:'20px' 
      }">
      <div :style="{ fontSize: '30px', fontWeight:'bold', marginBottom:'20px' }">
        {{item.voteName}}
      </div>
      <div :style="{
            display: 'flex',
            flexDirection: 'row',
            // alignItems: 'center',
            justifyContent: 'center'
          }">
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

export default {
  name: 'VoteResult',
  data: () => ({
    dataList: [],
    maxValueList: [],
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
      console.warn(err);
    } finally {
      this.$eventBus.$emit('loading', false);
    }
  },
  components: {
    CandidateItem
  }
}
</script>

<style scoped>

</style>
