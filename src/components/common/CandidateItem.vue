<template>
  <div class="item-container">
    <img :src="item.photo" class="picture"/>
    <h3>{{ item.campName }}</h3>
    <h3>후보 {{ item.candidateId }}번</h3>
    <div class="flex-row">
      <div class="item">
        <div>{{ item.leaderDeptName }}</div>
        <span>{{ item.leaderName }}</span> 
      </div>
      <div class="item">
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
}
</script>

<style scoped>
.item-container {
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

.flex-row {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
}

.item {
  margin-bottom: 2px;
}

</style>
