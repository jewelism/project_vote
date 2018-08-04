<template>
  <div>
    <h1>실시간 투표율</h1>
  </div>
</template>

<script>
import { testTimer, getGraphData } from '../../actions'
var d3 = require('d3')

export default {
  name: 'RealtimeGraph',
  data: ()=>({
    data: [],
    interval: null,
  }),
  mounted () {
    this.$eventBus.$emit('loading', true);
    //test data
    this.data = [
        // {date: '20-Apr', close: '10.13'},
        // {date: '21-Apr', close: '20.98'},
        // {date: '22-Apr', close: '30.00'},
        // {date: '23-Apr', close: '40.70'},
        // {date: '24-Apr', close: '50.00'}
        {date: Date.now()-10000, close: '10.13'},
        {date: Date.now()-1000, close: '20.98'},
        {date: Date.now()-100, close: '30.00'},
        {date: Date.now()-10, close: '40.70'},
        {date: Date.now(), close: '50.00'}
      ]
    // this.data = await getGraphData()
    this.paintGraph()
    this.interval = setInterval(async () => {
      //get data
      this.data = await getGraphData()
      // console.log(this.data)
      d3.select("svg").remove()
      this.paintGraph()
    }, 5000)
    this.$eventBus.$emit('loading', false);
  },
  methods: {
    paintGraph: function () {
      var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

      // parse the date / time
      // var parseTime = d3.timeParse("%d-%b-%y");
      // var parseTime = d3.timeParse("%d");
      // var parseTime = d3.timeFormat("%X")
      
      // set the ranges
      var x = d3.scaleTime().range([0, width]);
      var y = d3.scaleLinear().range([height, 0]);

      // define the line
      var valueline = d3.line()
          .x(function(d) { return x(d.date); })
          .y(function(d) { return y(d.close); });

      // append the svg obgect to the body of the page
      // appends a 'group' element to 'svg'
      // moves the 'group' element to the top left margin
      var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

      // Get the data
      this.data.forEach(function(d) {
        // d.date = parseTime(d.date);
        d.date = new Date(d.date)
        console.log(d.date)
        d.close = +d.close;
      });

      x.domain(d3.extent(this.data, function(d) { return d.date; }));
      y.domain([0, d3.max(this.data, function(d) { return d.close; })]);

        // Add the valueline path.
      svg.append("path")
          .data([this.data])
          .attr("class", "line")
          .attr("d", valueline);

      // Add the X Axis
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

      // Add the Y Axis
      svg.append("g")
          .call(d3.axisLeft(y));
    }
  },
  destroyed () {
    d3.select("svg").remove()
    clearInterval(this.interval)
  }
}
</script>

<style>
svg {
  display: block;
  margin: 0 auto;
}

.line {
  fill: none;
  stroke: steelblue;
  stroke-width: 2px;
}

</style>
