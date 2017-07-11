var mycanvas,mycontext; // when changing images, use a different conext/canvas selector
var thecanvas,thecontext;
//get an image from the "Original" menu
function changeImage(path,location) {
  var image = new Image;
   image.src = path;
   image.onload = newloaded;
   let canvas_loc = "canvas#"+location;
   mycanvas = document.querySelector(canvas_loc),
   mycontext = mycanvas.getContext("2d");
}

function newloaded() {

  mycontext.drawImage(this, 0, 0,331,331);
}

function loadZoom() {

  thecontext.drawImage(this, 0, 0,331,331);
}




function makeGraphLayout(GraphSVG)
{
  var graph = d3.select(GraphSVG).append("svg")
      .attr("width", widthgraph + margin.left + margin.right)
      .attr("height", heightgraph + margin.top + margin.bottom)
      .style("background","white")
      .style("border","1px solid green")
      .attr("transform",
            "translate(0,0)")
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
   return graph;
}

function makeZoomLayout(picPath,ZoomSVG)
{
  let svgName = "canvas#Zoom" + ZoomSVG;

  let theimage = new Image;
  thecanvas = document.querySelector(svgName);
  thecontext = thecanvas.getContext("2d");
  theimage.src = picPath;
  theimage.load = loadZoom;
  return thecanvas;

}
