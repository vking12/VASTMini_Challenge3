var loaded = false;

$(function(){
	var $target = $('#dropzone1');

	function dropZone($target, onDrop){
		$target.
			bind('dragover', function(){
				$target.addClass( 'drag-over' );
				return false;
			}).
			bind("dragend", function () {
				$target.removeClass( 'drag-over' );
				return false;
			}).
			bind("dragleave", function () {
				$target.removeClass( 'drag-over' );
				return false;
			}).
			bind("drop", function(event) {
				var file = event.originalEvent.dataTransfer.files[0];

				event.stopPropagation();
				event.preventDefault();

				$target.removeClass( 'drag-over' );

				var droppedImage = new Image();
				var fileReader = new FileReader();

				fileReader.onload = function (event) {
					droppedImage.src = event.target.result;
					$target.html(droppedImage);
				};

				fileReader.readAsDataURL(file);

				onDrop(file);
			});
	}

	dropZone($target, function(file){

		resemble(file).onComplete(function(data){
			$('#image-data').show();
			$('#red').css('width',data.red+'%');
			$('#green').css('width',data.green+'%');
			$('#blue').css('width',data.blue+'%');
			$('#alpha').css('width',data.alpha+'%');
			$('#brightness').css('width',data.brightness+'%');
			$('#white').css('width',data.white+'%');
			$('#black').css('width',data.black+'%');

		});

	});

	function onComplete(data){
		var time = Date.now();
		var diffImage = new Image();
		diffImage.src = data.getImageDataUrl();

		$('#image-diff').html(diffImage);

		$(diffImage).click(function(){
			window.open(diffImage.src, '_blank');
		});

		$('#difference-perc').text(data.misMatchPercentage + "%");
		$('#thebar').css("width", data.misMatchPercentage * 3 );

		var misM = data.misMatchPercentage;

		if(misM < 20){$('#thebar').css("background-color", "#1a9641");}
		else if(misM < 40){$('#thebar').css("background-color", "#a6d96a");}
		else if(misM < 60){$('#thebar').css("background-color", "#ffffbf");}
		else if(misM < 80){$('#thebar').css("background-color", "#fdae61");}
		else {$('#thebar').css("background-color", "#ba2e51");}

		if(!loaded)
		{startGraph(); // after everything has been loaded for the image manipulation, start loading the graphs/brushing
			loaded = true;

		}
		else {
		updateDiffImage(); // re-draw the zoom image
		// we have to keep the settings from what was done previously

	}



}


	var file1,file2; // the two images' paths which we'll be comparing to each other
	var resembleControl;
	// var map =
	// {
	// 	raw:  { func : resembleControl.ignoreNothing},
	// 	less: { func : resembleControl.ignoreLess},
	// 	colors: {func : resembleControl.ignoreColors},
	// 	antialising: { func: }
	//
	// }


  function redoResemble()
	{
		var answer= [];
						$('.buttons button.active').each(function(){
								answer.push ( $(this).attr('id') );
						});

		console.log(answer);

				// if(answer.includes('raw')){ resembleControl.ignoreNothing();}
				// else if(answer.includes('less')){ resembleControl.ignoreLess();}
				// else if(answer.includes('colors')){ resembleControl.ignoreColors();}
				// else if(answer.includes('antialising')){ resembleControl.ignoreAntialiasing();}
				// resembleControl.repaint();

	}




// still allowing dropping in case we want to
	dropZone($('#dropzone1'), function(file){
		file1 = file;
		if(file2){
			resembleControl = resemble(file).compareTo(file2).onComplete(onComplete);
		}
	});

	dropZone($('#dropzone2'), function(file){
		file2 = file;
		if(file1){
			resembleControl = resemble(file).compareTo(file1).onComplete(onComplete);
		}
	});

	var buttons = $('.buttons button');
 // keep track of what the buttons do
	buttons.click(function(){
		var $this = $(this);

		$this.parent('.buttons').find('button').removeClass('active');
		$this.addClass('active');

		if($this.is('#raw')){
			resembleControl.ignoreNothing();

		}
		else
		if($this.is('#less')){
			resembleControl.ignoreLess();

		}
		if($this.is('#colors')){
			resembleControl.ignoreColors();

		}
		else
		if($this.is('#antialising')){
			resembleControl.ignoreAntialiasing();

		}
		else
		if($this.is('#pink')){
			resemble.outputSettings({
				errorColor: {
					red: 255,
					green: 0,
					blue: 255
				}
			});
			resembleControl.repaint();

		}
		else
		if($this.is('#yellow')){
			resemble.outputSettings({
				errorColor: {
					red: 255,
					green: 255,
					blue: 0
				}
			});
			resembleControl.repaint();

		}
		else
		if($this.is('#flat')){
			resemble.outputSettings({
				errorType: 'flat'
			});
			resembleControl.repaint();

		}
		else
		if($this.is('#movement')){
			resemble.outputSettings({
				errorType: 'movement'
			});
			resembleControl.repaint();

		}
		else
		if($this.is('#flatDifferenceIntensity')){
			resemble.outputSettings({
				errorType: 'flatDifferenceIntensity'
			});
			resembleControl.repaint();

		}
		else
		if($this.is('#movementDifferenceIntensity')){
			resemble.outputSettings({
				errorType: 'movementDifferenceIntensity'
			});
			resembleControl.repaint();

		}
		else
		if($this.is('#opaque')){
			resemble.outputSettings({
				transparency: 1
			});
			resembleControl.repaint();

		}
		else
		if($this.is('#transparent')){
			resemble.outputSettings({
				transparency: 0.3
			});
			resembleControl.repaint();
		}
});

	(function(){
		var xhr = new XMLHttpRequest();
		var xhr2 = new XMLHttpRequest();
		var done = $.Deferred();
		var dtwo = $.Deferred();
    var firstImage = 'data/rgb/image01_2014_03_17.png'; // this will be the first image we use

		xhr.open('GET', firstImage, true);
		xhr.responseType = 'blob';
		xhr.onload = function(e) {
			done.resolve(this.response);
		};
		xhr.send();

		xhr2.open('GET', firstImage, true);
		xhr2.responseType = 'blob';
		xhr2.onload = function(e) {
			dtwo.resolve(this.response);
		};
		xhr2.send();


			// handle menu options
			$('input:image').click(function(){

				// get source of the image
				let file = $(this).attr("src");
				// figure out if this is button 1 or 2
				let button =  $(this).attr("id");
				let year = d3.select(this).attr("date");
				if(button == "btn1")
				{
					  d3.select("#myDate").text(year);
					  changeImage(file,"Canvas1");
						file1 = file;

						if(file2){
							resembleControl = resemble(file).compareTo(file2).onComplete(onComplete);
							console.log("File 2 done ");
									 redoResemble();

						}
					}
					else {
						d3.select("#myOtherDate").text(year);
						changeImage(file,"Canvas2");
				file2 = file;
				if(file1){
					resembleControl = resemble(file).compareTo(file1).onComplete(onComplete);
					console.log("File 1 done ");
							 redoResemble();


				}
				}


			});

 // when we start out, load these two images.
		$(document).ready(function(){
 				// again, when we start out make the first two files be equal to
				file1 = firstImage;
				file2 = firstImage;

			$.when(done, dtwo).done(function(file, file1){
				if (typeof FileReader === 'undefined') {
					resembleControl = resemble(file1).compareTo(file2).onComplete(onComplete);

				} else {
					resembleControl = resemble(file).compareTo(file1).onComplete(onComplete);
				}
			});
			return false;
		});

	}());

});
