$(function() {

	var vid = document.getElementById("vid");
	var img = document.getElementById("testimg");

	var baseCanvas = document.getElementById("canvas"),
		c = baseCanvas.getContext("2d"),
		canvasWidth = baseCanvas.width,
		canvasHeight = baseCanvas.height;

	var outputCanvas = document.getElementById("output"),
		cOutput = outputCanvas.getContext("2d");

	/* c.fillStyle = "rgba(66, 66, 66, 1)";
	c.fillRect(0, 0, canvasWidth, canvasHeight);
	c.font = "30px 'Comic Sans MS'";
	c.fillStyle = "#c6c6c6";
	c.fillText("Brush here :) ", 225, 150); */
	
	// c.drawImage(img, 0, 0, 640, 360);

	$(window).on("mousedown", function() {  
		vid.play();
		runAnalysis();
	});

	//  $("window").on("click", function() {
	// 	vid.play();
	// 	brush();
	// });
	/* 
	vid.play();
	setInterval(function() {
		c.drawImage(vid, 0, 0, 640, 360);
		var image = c.getImageData(0, 0, canvasWidth, canvasHeight);
		cOutput.putImageData(image, 0, 0, 0, 0, canvasWidth, canvasHeight);
		manip();
		brush();
	}, 0);
	*/
	// function drawVideo() {
	// 	c.drawImage(vid, 0, 0, 640, 360);
	// }

	var newColr = {r: 0, g: 0, b: 0, a: 0};

	var image = c.getImageData(0, 0, canvasWidth, canvasHeight);

	function brush(event) { 

		var $this = $(this);
		
		$this.on({ 	// Attach multiple event handlers simultaneously using a plain object. (http://api.jquery.com/on/#on-events-selector-data)
			mousemove: function(event) {
				
				// get brush position
				var xPos = event.pageX, // left                   
					yPos = event.pageY;	// top

				var widthSpace = ($(window).width() - 640) / 2,
					topSpace = $("#output").position().top;

				var brushPosX = xPos - widthSpace,
					brushPosY = yPos - topSpace;
				// end of get brush position

				c.fillStyle = "rgb(0, 0, 0)";
				c.beginPath();
				c.arc(brushPosX, brushPosY, 30, 0, 2 * Math.PI, false);
				c.fill();

				// manip();
			},
			mouseup: function() {
				$this.off("mousemove");
			}
		});
	}

	function manip() {
		c.drawImage(vid, 0, 0, 640, 360);
		var image = c.getImageData(0, 0, canvasWidth, canvasHeight),
		imageData = image.data,
		length = imageData.length;
		for ( var i = 0; i < length; i += 4 ) {
			var r = imageData[i],
				g = imageData[i+1],
				b = imageData[i+2],
				a = imageData[i+3]; 
			
			if (r > 0 && g > 0 && b > 0) {
				// imageData[i] = 0;
	 	 		// imageData[i+1] = 0;
				// imageData[i+2] = 0;
	            imageData[i+3] = 100;
			}
		}

		image.data = imageData;
		baseCanvas.style.display = "none";
		cOutput.putImageData(image, 0, 0, 0, 0, canvasWidth, canvasHeight);
	}

	function runAnalysis() {
	    if (vid.paused || vid.ended) {
	    	return;
	    }
    	manip();
    	if (requestAnimationFrame) {
        	requestAnimationFrame(runAnalysis);
        } else {
    		setTimeout(runAnalysis, 0);
    	}
  	}

  	function processFrame() {
  		c.drawImage(vid, 0, 0, 640, 360);
  		var frame = c.getImageData(0, 0, 640, 360);
  		var length = frame.data.length;
        for (var i = 0; i < length; i += 4) {
        	var r = frame.data[i],
            	g = frame.data[i+1],
           		b = frame.data[i+2];

	        if (r > 0 && g > 0 && b > 0) {  
	        	frame.data[i+3] = 10; 
	        } 
        }

    	cOutput.putImageData(frame, 0, 0);
  	}

	// vid.addEventListener("play", runAnalysis, false);



});