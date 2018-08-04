<template>
  <div>
    <h2>투표가 끝났어요!</h2>
    <h2>감사합니다~!</h2>
    <p>
      {{sec}}초 후 메인페이지로 이동합니다
    </p>
  </div>
</template>

<script>
export default {
  name: 'End',
  props: ['navigate'],
  data: () => ({
    sec: 5,
    intervalTimerId: null,
    timeoutId: null,
  }),
  mounted () {
    const intervalTimer = () => setTimeout(() => {
      this.sec--;
      this.intervalTimerId = intervalTimer();
    }, 1000);
    intervalTimer();
    this.timeoutId = setTimeout(() => {
      this.navigate({name: 'Main'});
    }, this.sec*1000);
  },
  destroyed () {
    clearTimeout(this.timeoutId);
    clearTimeout(this.intervalTimerId);
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
