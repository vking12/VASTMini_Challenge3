var mycanvas,mycontext; // when changing images, use a different conext/canvas selector

//get an image from the "Original" menu
function changeImage(path,location) {
  let canvas_loc = "canvas#"+location;
  mycanvas = document.querySelector(canvas_loc),
  mycontext = mycanvas.getContext("2d");
  mycontext.clearRect(0, 0,651,651);
  changeZoomImage(path,location);
  var image = new Image;
   image.crossOrigin = "";
  console.log("Location is " + location);
   image.src = path;
   image.onload = newloaded;

}

// if we change variables to the difference image,
// we have to make sure to update the zoomed in one as well
function changeZoomImage(path,location)
{
  if(location === "Canvas1")
  { image1.src = path; image1.onload = loadZoom1;}
  else if(location === "Canvas2")
  { image2.src = path; image2.onload = loadZoom2;}
  updateDiffImage();
}

// when the diff image changes, we update it's canvas
function updateDiffImage()
{
  var image = new Image;
  var canvas = document.querySelector("canvas#Canvas3"),
      context = canvas.getContext("2d");
  context.clearRect(0, 0,651,651);
  contextZoom3.clearRect(0, 0,651,651);
  let imageDiff = d3.select("#image-diff").select("img").attr("src");
  image.src = imageDiff;
  image3.src =  imageDiff;
  image.onload = load;
  image3.onload = loadZoom3;

  function load() {

    context.drawImage(this, 0, 0,294,294);
  }

}

function makeZoomLayout(path1,path2,path3)
{
  contextZoom1 = document.querySelector("canvas#Zoom1").getContext("2d");
  contextZoom2 = document.querySelector("canvas#Zoom2").getContext("2d");
  contextZoom3 = document.querySelector("canvas#Zoom3").getContext("2d");

   image1 = new Image;
   image2 = new Image;
   image3 = new Image;
   image1.crossOrigin = "";
   image1.src = path1;
   image1.onload = loadZoom1;

   image2.crossOrigin = "";
   image2.src = path2;
   image2.onload = loadZoom2;

   image3.crossOrigin = "";
   image3.src = path3;
   image3.onload = loadZoom3;
}

// ------ zooming functions ----------
// each one has seperate depending on what image gets changed
function loadZoom1() {
  contextZoom1.drawImage(this, 0, 0);
}

function loadZoom2() {
  contextZoom2.drawImage(this, 0, 0);
}

function loadZoom3() {
  contextZoom3.drawImage(this, 0, 0);
}

function newloaded() {

  mycontext.drawImage(this, 0, 0,292,292);
}

function moveZoom(x,y,dx,dy){
  dx = (dx-x)/292;
  dy = (dy-y)/292;
  var imgwidth =  (1/dx)*(310);
  var imgheight =  (1/dy)*(310);

  // clear the three canvases of the old image
  contextZoom1.clearRect(0, 0,651,651);
  contextZoom2.clearRect(0, 0,651,651);
  contextZoom3.clearRect(0, 0,651,651);
  // update with new image, that is scaled to what the user wants to zoom in on
  contextZoom1.drawImage(image1, -x * (1/dx), -y * (1/dy),imgwidth,imgheight);
  contextZoom2.drawImage(image2, -x * (1/dx), -y * (1/dy),imgwidth,imgheight);
  contextZoom3.drawImage(image3, -x * (1/dx), -y * (1/dy),imgwidth,imgheight);
}



// creates a layout for where the histogram graph will be
function makeGraphLayout(GraphSVG)
{
  var graph = d3.select(GraphSVG).append("svg")
      .attr("width", widthgraph + margin.left + margin.right)
      .attr("height", heightgraph + margin.top + margin.bottom)
      .style("background","white")
      .attr("transform",
            "translate(0,0)")
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
   return graph;
}
