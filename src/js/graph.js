// set the dimensions and margins of the graph
var margin = {top: 40, right: 40, bottom: 40, left: 40},
    widthgraph = 250;
    heightgraph = 250;
var canvas1,canvas2,canvas3,context1,context2,context3,width,height;
var canvasZoom1,canvasZoom2,canvasZoom3,contextZoom1,contextZoom2,contextZoom3,widthZoom,heightZoom;
var image1,image2,image3;
var svg1,svg2,svg3;

//set up scales for the graph to show RGB values
var x = d3.scaleLinear().domain([0, 260]).rangeRound([0, widthgraph]),
y = d3.scaleLinear().domain([0,1]).rangeRound([heightgraph, 0]);

function startGraph()
{
// delete bs-caret here... TODO


// store our canvas information
    canvas1 = document.querySelector("canvas#Canvas1"),
    context1 = canvas1.getContext("2d"),
    canvas2 = document.querySelector("canvas#Canvas2"),
    context2 = canvas2.getContext("2d"),
    canvas3 = document.querySelector("canvas#Canvas3"),
    context3 = canvas3.getContext("2d"),
    width = canvas1.width,
    height = canvas1.height;

// this will be the information for the zoomed images
    canvasZoom1 = document.querySelector("canvas#Zoom1"),
    contextZoom1 = canvas1.getContext("2d"),
    canvasZoom2 = document.querySelector("canvas#Zoom2"),
    contextZoom2 = canvas2.getContext("2d"),
    canvasZoom3 = document.querySelector("canvas#Zoom3"),
    contextZoom3 = canvas3.getContext("2d"),
    widthZoom = canvasZoom1.width,
    heightZoom = canvasZoom1.height;


// select the SVG we created in HTML
svg1 = d3.select("svg#Svg1");
svg2 = d3.select("svg#Svg2");
svg3 = d3.select("svg#Svg3");

var Graph1SVG = makeGraphLayout("div#Graph1");
var Graph2SVG = makeGraphLayout("div#Graph2");
var Graph3SVG = makeGraphLayout("div#Graph3");

makeHistogram(Graph1SVG,svg1,"data/rgb/image01_2014_03_17.png",context1,"Image 1");
makeHistogram(Graph2SVG,svg2,"data/rgb/image01_2014_03_17.png",context2,"Image 2");
var imageDif = d3.select("#image-diff").select("img").attr("src");
makeHistogram(Graph3SVG,svg3,imageDif,context3,"Comparison Image");

// making the zoomed in views locations
makeZoomLayout("data/rgb/image01_2014_03_17.png","data/rgb/image01_2014_03_17.png",imageDif);


}
