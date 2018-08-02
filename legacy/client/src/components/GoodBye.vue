<template>
  <div>
    <h2>투표가 끝났어요!</h2>
    <h2>감사합니다~!</h2>
    <p>
      {{sc}}초 후 메인페이지로 이동합니다
    </p>
  </div>
</template>

<script>
export default {
  name: 'GoodBye',
  props: ['switchPage'],
  data () {
    return {
      sc: 5,
      intervalId: null,
      timeoutId: null,
    }
  },
  mounted () {
    this.intervalId = setInterval(()=>{
      this.sc--
    }, 1000)
    this.timeoutId = setTimeout(() => {
        this.switchPage(0)
        clearTimeout()
    }, this.sc*1000)
  },
  destroyed () {
    clearInterval(this.intervalId)
    clearTimeout(this.timeoutId)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
