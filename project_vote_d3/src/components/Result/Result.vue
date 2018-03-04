<template>
  <div>
    <h1>투표 결과</h1>

  </div>
</template>

<script>


export default {
  name: 'Result',
  props: ['toggleLoading'],
  data () {
    return {
      
    }
  },
  mounted () {
    this.toggleLoading(true)
    //some api call
    this.toggleLoading(false)
  }
}
</script>

<style scoped>

</style>
