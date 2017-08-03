
var myS;
var brush1,brush2,brush3;

function makeHistogram(GraphSVG,svg,imageLocation,context,title){
  var r = new Array(257),
      g = new Array(257),
      b = new Array(257);

  var area = d3.area()
      .curve(d3.curveStepAfter)
      .x(function(d, i) { return x(i); })
      .y0(y(0))
      .y1(y);

  var line = d3.line()
      .curve(curveStepBelow)
      .x(function(d, i) { return x(i); })
      .y(y);

  var brush = d3.brush()
       .on("start brush", brushed)
       .on("end", brushended);

       if(title === "Image 1")
       { // this brush needs to be different so zooming is linked
         brush = d3.brush()
               .on("start brush", firstBrush)
               .on("end", brushended);

          brush1 = brush;
       }
       else if(title === "Image 2"){brush2 = brush;}
       else { brush3 = brush;}


  var histogram = GraphSVG.append("g")
      .attr("class", "histogram");

  var histoarea = histogram.selectAll(".histogram-area")
      .data([r, g, b])
    .enter().append("path")
      .attr("class", function(d, i) { return "histogram-area histogram-" + "rgb"[i]; });

  var histoline = histogram.selectAll(".histogram-line")
      .data([r, g, b])
    .enter().append("path")
      .attr("class", function(d, i) { return "histogram-line histogram-" + "rgb"[i]; });


// add the X gridlines
  GraphSVG.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + heightgraph + ")")
      .call(make_x_gridlines()
          .tickSize(-250)
          .tickFormat(""))

// add the Y gridlines
  GraphSVG.append("g")
      .attr("class", "grid")
      .call(make_y_gridlines()
          .tickSize(-250)
          .tickFormat("")) // make sure it doesn't print the labels again


    // text label for the whole graph
    GraphSVG.append("text")
        .attr("transform",
            "translate(" + (widthgraph/2) + " ,-10)")
        .style("text-anchor", "middle")
        .style("font-size","20px")
        .text(title);


  //add the x Axis
      GraphSVG.append("g")
          .attr("transform",
              "translate(" + 0 + " ," + (heightgraph ) + ")")
          .call(d3.axisBottom(x).ticks(5));

      // text label for the x axis
      GraphSVG.append("text")
          .attr("transform",
              "translate(" + (widthgraph/2) + " ," + (heightgraph + 28) + ")")
          .style("text-anchor", "middle")
          .style("font-size","12px")
          .text("RGB Value");

     // add the y Axis
        GraphSVG.append("g")
            .call(d3.axisLeft(y).ticks(5));

    // text label for the y axis
      GraphSVG.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -42 )
        .attr("x",-110 )
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-size","16px")
        .text("Intensity");



  var image = new Image;
  image.crossOrigin = "";
  image.src = imageLocation;
  image.onload = loaded;

  function loaded() {
    context.drawImage(this, 0, 0,292,292);

    svg.append("g")
        .attr("class", "brush")
        .attr("id","brushes")
        .call(brush)
        .call(brush.move, [[30, 16], [211, 139]]);
  }

  function brushed() {

    var s = d3.event.selection,
        x0 = s[0][0],
        y0 = s[0][1],
        dx = s[1][0] - x0,
        dy = s[1][1] - y0,
        max = 0;
    myS = s;

    for (var i = 0; i < 257; ++i) {
      r[i] = g[i] = b[i] = 0;
    }

    if (dx && dy) {
      var data = context.getImageData(x0, y0, dx, dy).data;
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

    moveZoom(myS[0][0],myS[0][1],myS[1][0],myS[1][1]);

  }

  function curveStepBelow(context) {
    var y0, i;
    return {
      lineStart: function() { y0 = NaN, i = 0; },
      lineEnd: function() {},
      point: function(x, y) {
        x -= y0 < y ? -0.5 : +0.5, y += 0.5;
        if (++i === 1) context.moveTo(x, y0 = y);
        else context.lineTo(x, y0), context.lineTo(x, y0 = y);
      }
    };
  }

  // ---------------------------- making grid functons ------------------------------------
      // gridlines in x axis function
      function make_x_gridlines() {
        return d3.axisBottom(x)
        .tickArguments([10, "s"]);
      }
      // gridlines in y axis function
      function make_y_gridlines() {
        return d3.axisLeft(y)
        .tickSize(widthgraph)
        .tickArguments([10, "s"]);
      }


      function firstBrush()
      {

        if(!d3.event.sourceEvent){return;}

        var s = d3.event.selection,
            x0 = s[0][0],
            y0 = s[0][1],
            dx = s[1][0] - x0,
            dy = s[1][1] - y0,
            max = 0;

      var validbrush1 = d3.select("#Svg1").select("#brushes");
      var validbrush2 = d3.select("#Svg2").select("#brushes");
      var validbrush3 = d3.select("#Svg3").select("#brushes");
      // if all the valid brushes have been created, start moving them togheter
      if(!validbrush1.empty() &&  !validbrush2.empty() && !validbrush3.empty())
      {
        d3.select("#Svg2").select("#brushes").call(brush2.move,s);
        d3.select("#Svg3").select("#brushes").call(brush3.move,s);
       }

        for (var i = 0; i < 257; ++i) {
          r[i] = g[i] = b[i] = 0;
        }

        if (dx && dy) {
          var data = context.getImageData(x0, y0, dx, dy).data;
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



      function globalBrush()
      {

        if(!d3.event.sourceEvent){return;}

        var s = d3.event.selection,
            x0 = s[0][0],
            y0 = s[0][1],
            dx = s[1][0] - x0,
            dy = s[1][1] - y0,
            max = 0;

      var validbrush1 = d3.select("#Svg1").select("#brushes");
      var validbrush2 = d3.select("#Svg2").select("#brushes");
      var validbrush3 = d3.select("#Svg3").select("#brushes");

      if(!validbrush1.empty() &&  !validbrush2.empty() && !validbrush3.empty())
      {
        d3.select("#Svg2").select("#brushes").call(brush2.move,s);
        d3.select("#Svg3").select("#brushes").call(brush3.move,s);
       }

        for (var i = 0; i < 257; ++i) {
          r[i] = g[i] = b[i] = 0;
        }

        if (dx && dy) {
          var data = context.getImageData(x0, y0, dx, dy).data;
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

}
