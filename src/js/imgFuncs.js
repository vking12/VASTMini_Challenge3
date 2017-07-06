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
  context1.drawImage(this, 0, 0,331,331);

  svg1.append("g")
      .attr("class", "brush")
      .call(brush)
      .call(brush.move, [[30, 16], [211, 139]]);
}

function loaded2() {
  context2.drawImage(this, 0, 0,351,351);


}

function newloaded() {

  mycontext.drawImage(this, 0, 0,351,351);
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
