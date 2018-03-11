<template>
  <div class="item">
    <img :src="item.photo" class="picture"/>
    <h3>{{ item.campName }}</h3>
    <h3>후보 {{ item.candidateId }}번</h3>
    <div :style="rowStyle">
      <div :style="itemStyle">
        <div>{{ item.leaderDeptName }}</div>
        <span>{{ item.leaderName }}</span> 
      </div>
      <div :style="itemStyle">
        <div>{{ item.subLeaderDeptName }}</div>
        <span>{{ item.subLeaderName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CandidateItem',
  props: ['item'],
  data () {
    return {
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
  }
}
</script>

<style scoped>
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

</style>
