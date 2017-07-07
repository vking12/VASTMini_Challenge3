// set the dimensions and margins of the graph
var margin = {top: 40, right: 40, bottom: 40, left: 40},
    widthgraph = 250;
    heightgraph = 250;

// store our canvas information
var canvas1 = document.querySelector("canvas#Canvas1"),
    context1 = canvas1.getContext("2d"),
    canvas2 = document.querySelector("canvas#Canvas2"),
    context2 = canvas2.getContext("2d"),
    width = canvas1.width,
    height = canvas1.height;

//set up scales for the graph to show RGB values
var x = d3.scaleLinear().domain([0, 260]).rangeRound([0, widthgraph]),
    y = d3.scaleLinear().rangeRound([heightgraph, 0]);

var x2 = d3.scaleLinear().domain([0, 260]).rangeRound([0, widthgraph]),
    y2 = d3.scaleLinear().rangeRound([heightgraph, 0]);

// select the SVG we created in HTML
var svg1 = d3.select("svg#Svg1");
var svg2 = d3.select("svg#Svg2");
var svg3 = d3.select("svg#Svg3");

var Graph1SVG = d3.select("div#Graph1").append("svg")
    .attr("width", widthgraph + margin.left + margin.right)
    .attr("height", heightgraph + margin.top + margin.bottom)
    .style("background","white")
    .style("border","1px solid green")
    .attr("transform",
          "translate(0,0)")
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var Graph2SVG = d3.select("div#Graph2").append("svg")
    .attr("width", widthgraph + margin.left + margin.right)
    .attr("height", heightgraph + margin.top + margin.bottom)
    .style("background","white")
    .style("border","1px solid green")
    .attr("transform",
          "translate(0,0)")
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var Graph3SVG = d3.select("div#Graph3").append("svg")
    .attr("width", widthgraph + margin.left + margin.right)
    .attr("height", heightgraph + margin.top + margin.bottom)
    .style("background","white")
    .style("border","1px solid green")
    .attr("transform",
          "translate(0,0)")
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");




  // text label for the whole graph
  Graph1SVG.append("text")
      .attr("transform",
          "translate(" + (widthgraph/2) + " ,-10)")
      .style("text-anchor", "middle")
      .style("font-size","20px")
      .text("Image 1 Histogram");

// do nice formatting for the second svg
//add the x Axis
    Graph1SVG.append("g")
        .attr("transform",
            "translate(" + 0 + " ," + (heightgraph ) + ")")
        .call(d3.axisBottom(x).ticks(5));

    // text label for the x axis
    Graph1SVG.append("text")
        .attr("transform",
            "translate(" + (widthgraph/2) + " ," + (heightgraph + 30) + ")")
        .style("text-anchor", "middle")
        .style("font-size","16px")
        .text("RGB Value");

   // add the y Axis
      Graph1SVG.append("g")
          .call(d3.axisLeft(y).ticks(5));

  // text label for the y axis
    Graph1SVG.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -42 )
      .attr("x",-110 )
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size","16px")
      .text("Intensity");



// set up the histogram and its area

    // store the three RGB values that come from using the brushing
    var r = new Array(257),
        g = new Array(257),
        b = new Array(257);

    // specify the area of the graph
    var area = d3.area()
        .curve(d3.curveStepAfter)
        .x(function(d, i) { return x(i); })
        .y0(y(0))
        .y1(y);

    //sepcify the line of the graph
    var line = d3.line()
        .curve(curveStepBelow)
        .x(function(d, i) { return x(i); })
        .y(y);

    //set up the brushing feature ( i.e. the movable box)
    var brush1 = d3.brush()
        .on("start brush", brushed)
        .on("end", brushended);

  // set up the histogram in the second svg view
    var histogram1 = Graph1SVG.append("g")
        .attr("class", "histogram");

    var histoarea = histogram1.selectAll(".histogram-area")
    .data([r, g, b])
    .enter().append("path")
    .attr("class", function(d, i) { return "histogram-area histogram-" + "rgb"[i]; });

    var histoline = histogram1.selectAll(".histogram-line")
    .data([r, g, b])
    .enter().append("path")
    .attr("class", function(d, i) { return "histogram-line histogram-" + "rgb"[i]; });

// make the same things now for the other histogram :)





    // store the three RGB values that come from using the brushing
    var r2 = new Array(257),
        g2 = new Array(257),
        b2 = new Array(257);

    // specify the area of the graph
    var area2 = d3.area()
        .curve(d3.curveStepAfter)
        .x(function(d, i) { return x(i); })
        .y0(y(0))
        .y1(y);

    //sepcify the line of the graph
    var line2 = d3.line()
        .curve(curveStepBelow2)
        .x(function(d, i) { return x(i); })
        .y(y);

    //set up the brushing feature ( i.e. the movable box)
    var brush2 = d3.brush()
        .on("start brush", brushed2)
        .on("end", brushended2);

  // set up the histogram in the second svg view
    var histogram2 = Graph2SVG.append("g")
        .attr("class", "histogram");

    var histoarea2 = histogram2.selectAll(".histogram-area2")
    .data([r2, g2, b2])
    .enter().append("path")
    .attr("class", function(d, i) { return "histogram-area2 histogram-" + "rgb"[i]; });

    var histoline2 = histogram2.selectAll(".histogram-line2")
    .data([r2, g2, b2])
    .enter().append("path")
    .attr("class", function(d, i) { return "histogram-line2 histogram-" + "rgb"[i]; });






// add the X gridlines
  Graph1SVG.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + heightgraph + ")")
      .call(make_x_gridlines()
          .tickSize(-250)
          .tickFormat(""))

// add the Y gridlines
  Graph1SVG.append("g")
      .attr("class", "grid")
      .call(make_y_gridlines()
          .tickSize(-250)
          .tickFormat("")) // make sure it doesn't print the labels again

// ------------------- second histogram --------------------------------------


    // text label for the whole graph
    Graph2SVG.append("text")
        .attr("transform",
            "translate(" + (widthgraph/2) + " ,-10)")
        .style("text-anchor", "middle")
        .style("font-size","20px")
        .text("Image 2 Histogram");
// do nice formatting for the second svg
//add the x Axis
      Graph2SVG.append("g")
          .attr("transform",
              "translate(" + 0 + " ," + (heightgraph ) + ")")
          .call(d3.axisBottom(x).ticks(5));

      // text label for the x axis
      Graph2SVG.append("text")
          .attr("transform",
              "translate(" + (widthgraph/2) + " ," + (heightgraph + 30) + ")")
          .style("text-anchor", "middle")
          .style("font-size","16px")
          .text("RGB Value");

     // add the y Axis
        Graph2SVG.append("g")
            .call(d3.axisLeft(y).ticks(5));

    // text label for the y axis
      Graph2SVG.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -42 )
        .attr("x",-110 )
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-size","16px")
        .text("Intensity");


        // add the X gridlines
        Graph2SVG.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(0," + heightgraph + ")")
        .call(make_x_gridlines()
        .tickSize(-250)
        .tickFormat(""))

        // add the Y gridlines
        Graph2SVG.append("g")
        .attr("class", "grid")
        .call(make_y_gridlines()
        .tickSize(-250)
        .tickFormat("")) // make sure it doesn't print the labels again



// ------------------- third histogram --------------------------------------


// text label for the whole graph
Graph3SVG.append("text")
.attr("transform",
    "translate(" + (widthgraph/2) + " ,-10)")
.style("text-anchor", "middle")
.style("font-size","20px")
.text("Image 3 Histogram");
// do nice formatting for the second svg
//add the x Axis
Graph3SVG.append("g")
  .attr("transform",
      "translate(" + 0 + " ," + (heightgraph ) + ")")
  .call(d3.axisBottom(x).ticks(5));

// text label for the x axis
Graph3SVG.append("text")
  .attr("transform",
      "translate(" + (widthgraph/2) + " ," + (heightgraph + 30) + ")")
  .style("text-anchor", "middle")
  .style("font-size","16px")
  .text("RGB Value");

// add the y Axis
Graph3SVG.append("g")
    .call(d3.axisLeft(y).ticks(5));

// text label for the y axis
Graph3SVG.append("text")
.attr("transform", "rotate(-90)")
.attr("y", -42 )
.attr("x",-110 )
.attr("dy", "1em")
.style("text-anchor", "middle")
.style("font-size","16px")
.text("Intensity");


// add the X gridlines
Graph3SVG.append("g")
.attr("class", "grid")
.attr("transform", "translate(0," + heightgraph + ")")
.call(make_x_gridlines()
.tickSize(-250)
.tickFormat(""))

// add the Y gridlines
Graph3SVG.append("g")
.attr("class", "grid")
.call(make_y_gridlines()
.tickSize(-250)
.tickFormat("")) // make sure it doesn't print the labels again


// ----------------------- get the images set up

var image1 = new Image;
var image2 = new Image;

// specify as anonymous to remove cross-origin error
image1.crossOrigin = "";
image1.src = "data/rgb/image01_2014_03_17.png"; // starting out picture
image1.onload = loaded1;

image2.crossOrigin = "";
image2.src = "data/rgb/image04_2014_12_30.png"; // starting out picture
image2.onload = loaded2;


// making the zoomed in views locations


var zoom1 = d3.select("div#Zoom1").append("svg")
    .attr("width", widthgraph + margin.left + margin.right)
    .attr("height", heightgraph + margin.top + margin.bottom)
    .style("background","white")
    .style("border","5px solid black")
    .attr("transform",
          "translate(0,0)")
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var zoom2 = d3.select("div#Zoom2").append("svg")
    .attr("width", widthgraph + margin.left + margin.right)
    .attr("height", heightgraph + margin.top + margin.bottom)
    .style("background","white")
    .style("border","5px solid black")
    .attr("transform",
          "translate(0,0)")
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var zoom3 = d3.select("div#Zoom3").append("svg")
    .attr("width", widthgraph + margin.left + margin.right)
    .attr("height", heightgraph + margin.top + margin.bottom)
    .style("background","white")
    .style("border","5px solid black")
    .attr("transform",
          "translate(0,0)")
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");



// --------------------brushing functions-----------------------
function brushed() {
  var s = d3.event.selection,
      x0 = s[0][0],
      y0 = s[0][1],
      dx = s[1][0] - x0,
      dy = s[1][1] - y0,
      max = 0;

  for (var i = 0; i < 257; ++i) {
    r[i] = g[i] = b[i] = 0;
  }

  if (dx && dy) {
    var data = context1.getImageData(x0, y0, dx, dy).data;
    for (var i = 0; i < dx; ++i) {
      for (var j = 0; j < dy; ++j) {
        var k = j * dx + i << 2;
        max = Math.max(max, ++r[data[k]], ++g[data[k + 1]], ++b[data[k + 2]]);
      }
    }
    y.domain([0, max]);
    histoarea.attr("d", area);
    histoline.attr("d", line);
  } else {
    histoarea.attr("d", null);
    histoline.attr("d", null);
  }
}

function brushended() {
  if (!d3.event.selection) {
    histoarea.attr("d", null);
    histoline.attr("d", null);
  }
}

function curveStepBelow(context) {
  var y0, i;
  return {
    lineStart: function() { y0 = 0, i = 0; },
    lineEnd: function() {},
    point: function(x, y) {
      x -= y0 < y ? -0.5 : +0.5, y += 0.5;
      if (++i === 1) context.moveTo(x, y0 = y);
      else context.lineTo(x, y0), context.lineTo(x, y0 = y);
    }
  };
}


// --------------------brushing functions for the other view-----------------------
function brushed2() {
  var s = d3.event.selection,
      x20 = s[0][0],
      y20 = s[0][1],
      dx2 = s[1][0] - x20,
      dy2 = s[1][1] - y20,
      max2 = 0;

  for (var i = 0; i < 257; ++i) {
    r2[i] = g2[i] = b2[i] = 0;
  }

  if (dx2 && dy2) {
    var data2 = context2.getImageData(x20, y20, dx2, dy2).data;
    for (var i = 0; i < dx2; ++i) {
      for (var j = 0; j < dy2; ++j) {
        var k = j * dx2 + i << 2;
        max2 = Math.max(max2, ++r[data2[k]], ++g[data2[k + 1]], ++b[data2[k + 2]]);
      }
    }
    y2.domain([0, max2]);
    histoarea2.attr("d", area);
    histoline2.attr("d", line);
  } else {
    histoarea2.attr("d", null);
    histoline2.attr("d", null);
  }
}

function brushended2() {
  if (!d3.event.selection) {
    histoarea2.attr("d", null);
    histoline2.attr("d", null);
  }
}

function curveStepBelow2(context2) {
  var y01, i1;
  return {
    lineStart: function() { y01 = 0, i1 = 0; },
    lineEnd: function() {},
    point: function(x1, y1) {
      x1 -= y01 < y1 ? -0.5 : +0.5, y += 0.5;
      if (++i1 === 1) context.moveTo(x1, y01 = y1);
      else context2.lineTo(x1, y01), context2.lineTo(x1, y01 = y1);
    }
  };
}
