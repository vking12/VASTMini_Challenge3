var mycanvas,mycontext; // when changing images, use a different conext/canvas selector

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
