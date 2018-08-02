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
import CandidateItem from '../Common/CandidateItem'
import { getVoteResult } from '../../actions'

export default {
  name: 'Result',
  props: ['toggleLoading'],
  data () {
    return {
      dataList: [],
      maxValueList: [],
    }
  },
  async mounted () {
    this.toggleLoading(true)
    //some api call
    const result = await getVoteResult()
    console.log(result)
    if(result){
      this.dataList = result.data.message
      // this.maxValueList = dataList.map((data)=>{
      //   let max = 0
      //   data.data.map((d)=>{
      //     if(max<d['count(*)'])
      //       max = d['count(*)']
      //   })
      //   return max
      // })
    } else {
      alert('오류 발생\n관리자에게 문의하세요')
    }
    this.toggleLoading(false)
  },
  components: {
    CandidateItem
  }
}
</script>

<style scoped>

</style>
