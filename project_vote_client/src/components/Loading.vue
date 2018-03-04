<template>
  <div class="wandering_cube">
    <div class="cube1"></div>
    <div class="cube2"></div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  mounted () {
    const fields = document.getElementById("app").getElementsByTagName('*');
    for (let i = 0; i < fields.length; i++)
    {
      fields[i].disabled = true;
    }
  },
  destroyed () {
    document.body.style.backgroundColor = 'transparent'
    var fields = document.getElementById("app").getElementsByTagName('*');
    for (var i = 0; i < fields.length; i++)
    {
      fields[i].disabled = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.wandering_cube{
  margin: 100px auto;
  width: 40px;
  height: 40px;
  position: relative;
}

.cube1, .cube2 {
  border: 1px solid white;
  background-color: #272727;
  width: 15px;
  height: 15px;
  position: absolute;
  top: 0;
  left: 0;
  
  -webkit-animation: sk-cubemove 1.8s infinite ease-in-out;
  animation: sk-cubemove 1.8s infinite ease-in-out;
}

.cube2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

@-webkit-keyframes sk-cubemove {
  25% { -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5) }
  50% { -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg) }
  75% { -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5) }
  100% { -webkit-transform: rotate(-360deg) }
}

@keyframes sk-cubemove {
  25% { 
    transform: translateX(42px) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  } 50% { 
    transform: translateX(42px) translateY(42px) rotate(-179deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
  } 50.1% { 
    transform: translateX(42px) translateY(42px) rotate(-180deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  } 75% { 
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
  } 100% { 
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
}
</style>
