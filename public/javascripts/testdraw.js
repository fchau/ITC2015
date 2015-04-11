var width = 500,
    height = 500,
    radius = Math.min(width, height) / 2,
    innerRadius = 0.3 * radius;

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.width; });

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([0, 0])
  .html(function(d) {
    return d.data.label + ": <span style='color:orangered'>" + d.data.score + "</span>";
  });

var arc = d3.svg.arc()
  .innerRadius(innerRadius)
  .outerRadius(function (d) { 
    return (radius - innerRadius) * (d.data.score / 100.0) + innerRadius; 
  });

var outlineArc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(radius);

var svg = d3.select("#modaltest").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg.call(tip);

var data = {"foo":"bar"};

d3.json('javascripts/testapi.json', function(data) {

  var colorTotals = {};
  var colorData = [];
  data.forEach(function(item, index) {
    var color = item.dominant;
    if (!colorTotals[color]) {
      colorTotals[color] = 0;
    }
    colorTotals[color]++;
  });

  for (color in colorTotals) {
    if (colorTotals.hasOwnProperty(color)) {
      colorData.push({
        id: color,
        order: 1,
        color: color,
        weight: 100,
        score: colorTotals[color],
        width: 100,
        label: color
      });
    }
  }
  // data.forEach(function(d, index) {
  //   d.id     =  d.name;
  //   d.order  = +d.order;
  //   d.color  =  d.dominant;
  //   d.weight = +d.weight;
  //   d.score  = +d.score;
  //   d.width  = +d.weight;
  //   d.label  =  d.name;
  // });
  // for (var i = 0; i < data.score; i++) { console.log(data[i].id) }
  
  var path = svg.selectAll(".solidArc")
      // .data(pie(data))
      .data(pie(colorData))
    .enter().append("path")
      .attr("fill", function(d) { return d.data.color; })
      .attr("class", "solidArc")
      .attr("stroke", "gray")
      .attr("d", arc)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

  var outerPath = svg.selectAll(".outlineArc")
      // .data(pie(data))
      .data(pie(colorData))
    .enter().append("path")
      .attr("fill", "none")
      .attr("stroke", "gray")
      .attr("class", "outlineArc")
      .attr("d", outlineArc);  


  // calculate the weighted mean score
  var score = 
    // data.reduce(function(a, b) {
    colorData.reduce(function(a, b) {
      //console.log('a:' + a + ', b.score: ' + b.score + ', b.weight: ' + b.weight);
      return a + (b.score * b.weight); 
    }, 0) / 
    // data.reduce(function(a, b) { 
    colorData.reduce(function(a, b) {
      return a + b.weight; 
    }, 0);

  svg.append("svg:text")
    .attr("class", "aster-score")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle") // text-align: right
    .text(Math.round(score));

});