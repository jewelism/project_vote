<template>
  <div class="progressbar">
    <div :class="['progress' + index]">
      <div class="pbaranim">
      </div>
      <div class="percentage-wrapper">
        {{percentage}}%
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: ['percentage', 'index'],
  mounted(){
    const percent = this.percentage || 1
    const createdStyleTag = document.createElement("style");
    createdStyleTag.textContent = `
      .progress${this.index} {
          background: rgba(114, 212, 255, 0.7); /*-- Color of the bar --*/
          height: 20px;
          width: 0%;
          max-width: 100%;
          float: left;
          -webkit-animation: progress${this.index} 2.5s 1 forwards;
          -moz-animation: progress${this.index} 2.5s 1 forwards;
          -ms-animation: progress${this.index} 2.5s 1 forwards;
          animation: progress${this.index} 2.5s 1 forwards;
      }
      
      @-webkit-keyframes progress${this.index} { 
          from { }
          to { width: ${percent}% }
      }
      @-moz-keyframes progress${this.index} { 
          from { }
          to { width: ${percent}% }
      }
      @-ms-keyframes progress${this.index} { 
          from { }
          to { width: ${percent}% }
      }
      @keyframes progress${this.index} { 
          from { }
          to { width: ${percent}% }
      }`;
    document.body.appendChild(createdStyleTag)
  }
}
</script>

<style scoped>
.progressbar {
    width: 100%;
    height: 20px;
    background-color: #eee;
    padding: 2px;
    margin: .6em 0;
    border: 1px #000 double;
    clear: both;
}

.pbaranim {
    height: 20px;
    width: 100%;
    overflow: hidden;
    background: url('http://www.cssdeck.com/uploads/media/items/7/7uo1osj.gif') repeat-x;
    -moz-opacity: 0.25;
    -khtml-opacity: 0.25;
    opacity: 0.25;
    -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=25);
    filter: progid:DXImageTransform.Microsoft.Alpha(opacity=25);
    filter: alpha(opacity=25);
    z-index:10;
}

.percentage-wrapper {
  margin-top: -20px;
}

.percentage {
  color: #272727;
  opacity: 1;
  display: !important;
}



</style>