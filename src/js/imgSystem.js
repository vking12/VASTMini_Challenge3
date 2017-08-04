"use strict";
var imgSystem = function() {

  // setup the pointer to the scope 'this' variable
  var self = this;

  // data container
  var data = [];

  // bounds of the data
  var bounds = {};

  self.calculateSquareSideLength = function (x, y, n) {
    // algorithm to calculate square side length for n squares within an
    // x by y rectangle
    let sx, sy;

    let px = Math.ceil(Math.sqrt(n * x / y));

    if (Math.floor(px * y / x) * px < n) { // does not fit, y/(x/px)=px*y/x
      sx = y / Math.ceil(px * y / x);
    } else {
      sx = x / px;
    }

    let py = Math.ceil(Math.sqrt(n * y / x));
    if (Math.floor(py * x / y) * py < n) { // does not fit
      sy = x / Math.ceil(x * py / y);
    } else {
      sy = y / py;
    }

    return Math.max(sx, sy);
  };

  // self.updateProgressBar = function () {
  //   var elem = document.getElementById("myBar");
  //   var width = 20;
  //   var id = setInterval(frame, 20);
  //   function frame() {
  //     if (width >= 100) {
  //       clearInterval(id);
  //     } else {
  //       width = width + 20;
  //       elem.style.width = width + '%';
  //       elem.innerHTML = width * 1  + '%';
  //     }
  //   }
  // }

  self.loadImg = function(file, wCanvas, vImage, fLeft) {
    var imgPath = file.slice(5,23);;
    if (vImage === 'rgb') {
      imgPath = 'data/' + 'rgb/' + imgPath + '.png';
    } else if (vImage === 'plantH') {
      imgPath = 'data/' + 'plant_health/' + imgPath + '.png';
    } else if (vImage === 'floodB') {
      imgPath = 'data/' + 'flood_burn/' + imgPath + '.png';
    } else if (vImage === 'sic') {
      imgPath = 'data/' + 'sic/' + imgPath + '.png';
    }
    //alert(imgPath);

    var img = new Image();
    img.src = imgPath;
    var canvas = document.getElementById(wCanvas);
    var ctx = canvas.getContext('2d');
    canvas.height = 331;
    canvas.width = 331;
    img.onload = function() {
      ctx.drawImage(img, 0, 0, 331, 331);
      canvas.style.visibility = 'visible';
    };


  };

  self.createImg = function(wCanvas, fLeft) {
    var canvas = document.getElementById(wCanvas);
    var ctx = canvas.getContext('2d');

    // create the image
    var imgdata = ctx.getImageData(0, 0, 651, 651);
    var imgdatalen = imgdata.data.length;
    for (var i = 0; i < imgdatalen / 4; i++) { //iterate over every pixel in the canvas
      imgdata.data[4 * i] = data[i].R; // RED (0-255)
      imgdata.data[4 * i + 1] = data[i].G; // GREEN (0-255)
      imgdata.data[4 * i + 2] = data[i].B; // BLUE (0-255)
      imgdata.data[4 * i + 3] = 255; // APLHA (0-255)
    }
    ctx.putImageData(imgdata, 0, 0);

    var oldCanvas = canvas.toDataURL("image/png");
    var img = new Image();
    img.src = oldCanvas;
    img.onload = function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, 200, 200);
      canvas.style.visibility = 'visible';
      // self.updateProgressBar();
      // alert("fLeft =" + fLeft);
    }

    // var img = canvas.toDataURL("image/png");
    // document.write('<img src="'+img+'"/>');
  };

  // data loading function
  self.loadData = function(file, wCanvas, vImage, fLeft) {
    // read the csv file
    d3.csv(file)
      // iterate over the rows of the csv file
      .row(function(d) {
        // get the min bounds
        bounds.minX = Math.min(bounds.minX || Infinity, d.X);
        bounds.minY = Math.min(bounds.minY || Infinity, d.Y);

        // get the max bounds
        bounds.maxX = Math.max(bounds.maxX || -Infinity, d.X);
        bounds.maxY = Math.max(bounds.maxY || -Infinity, d.Y);

        if (vImage === 'rgb') {
          // add the element to the data collection
          data.push({
            // Position
            X: Number(d.X),
            Y: Number(d.Y),
            // RGB stored somewhere. Maybe have another parameter that checks which mode in.
            R: Number(d.B3),
            G: Number(d.B2),
            B: Number(d.B1)

          });
        } else if (vImage === 'plantH') {
          // add the element to the data collection
          data.push({
            // Position
            X: Number(d.X),
            Y: Number(d.Y),
            // RGB stored somewhere. Maybe have another parameter that checks which mode in.
            R: Number(d.B4),
            G: Number(d.B3),
            B: Number(d.B2)

          });
        } else if (vImage === 'floodB') {
          // add the element to the data collection
          // THIS HAS BEEN MODIFIED BY VIJAY SO FLOODB IS NOT REAL NAME IT'S A NDVI TYPE IMAGE
          data.push({
            // Position
            X: Number(d.X),
            Y: Number(d.Y),
            // RGB stored somewhere. Maybe have another parameter that checks which mode in.
            R: Number(d.B5),
            G: Number(d.B4),
            B: Number(d.B2)

          });
        } else if (vImage === 'sic') {
          // add the element to the data collection
          data.push({
            // Position
            X: Number(d.X),
            Y: Number(d.Y),
            // RGB stored somewhere. Maybe have another parameter that checks which mode in.
            R: Number(d.B1),
            G: Number(d.B5),
            B: Number(d.B6)
          });
        }

      })
      // when done loading
      .get(function() {
        // create the particle system
        self.createImg(wCanvas, fLeft);
      });
  };

  // publicly available functions
  var publiclyAvailable = {
    // load the data and setup the system
    initialize: function(file, wCanvas, vImage, fLeft) {
      self.loadData(file, wCanvas, vImage, fLeft);
    },

    // simply load the images
    loadImage: function(file, wCanvas, vImage, fLeft) {
      self.loadImg(file, wCanvas, vImage, fLeft);
    }
  };
  return publiclyAvailable;

};
