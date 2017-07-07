var mycanvas,mycontext;



//get an image from the "Original" menu
function changeImage(path,location) {
  var image = new Image;
   image.src = path;
   image.onload = newloaded;
   let canvas_loc = "canvas#"+location;
   mycanvas = document.querySelector(canvas_loc),
   mycontext = mycanvas.getContext("2d");
}

function loaded1() {
  context1.drawImage(this, 0, 0);

  svg1.append("g")
      .attr("class", "brush")
      .call(brush1)
      .call(brush1.move, [[30, 16], [211, 139]]);
}

function loaded2() {
  context2.drawImage(this, 0, 0);

  svg2.append("g")
      .attr("class", "brush")
      .call(brush2)
      .call(brush2.move, [[30, 16], [211, 139]]);

      svg3.append("g")
          .attr("class", "brush")
          .call(brush2)
          .call(brush2.move, [[30, 16], [211, 139]]);
}

function newloaded() {

  mycontext.drawImage(this, 0, 0);
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
