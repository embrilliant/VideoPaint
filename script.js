$(function() {

	var vid = document.getElementById("vid");

	var vid2 = document.getElementById("vid2");

	var baseCanvas = document.getElementById("canvas"),
		c = baseCanvas.getContext("2d"),
		canvasWidth = baseCanvas.width,
		canvasHeight = baseCanvas.height;

	var merge = document.getElementById("merge"),
		cMerge = merge.getContext("2d");

	var outputCanvas = document.getElementById("output"),
		cOutput = outputCanvas.getContext("2d");

	var timeOut;

	// cOutput.fillStyle = "rgba(0, 0, 0, 1)";
	// cOutput.fillRect(0, 0, canvasWidth, canvasHeight);
	// cOutput.font = "30px 'Comic Sans MS'";
	// cOutput.fillStyle = "#c6c6c6";
	// cOutput.fillText("Brush here :) ", 225, 150);
	
	vid.play();
	startToLoop();

	$(window).on("mousedown", function() {  
		vid2.play();
		vid.play();
		startToLoop();
		brush();
	});

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

				c.fillStyle = "rgba(0, 0, 0, 1)";
				c.beginPath();
				c.arc(brushPosX, brushPosY, 30, 0, 2 * Math.PI, false);
				c.fill();
			},
			mouseup: function() {
				$this.off("mousemove");
			}
		});
	}

	function startToLoop() {
	    if (vid.paused || vid.ended) {
	    	return;
	    }
    	manip();
    	if (requestAnimationFrame) { // "requestAnimationFrame" by Paul Irish http://www.paulirish.com/2011/requestanimationframe-for-smart-animating
        	requestAnimationFrame(startToLoop);
        } else {
    		timeOut = setTimeout(startToLoop, 0);
    	}
  	}

  	function manip() {

		cMerge.drawImage(vid, 0, 0, 640, 360);
		cMerge.drawImage(baseCanvas, 0, 0, 640, 360);

		var image = cMerge.getImageData(0, 0, canvasWidth, canvasHeight),
		imageData = image.data,
		length = imageData.length;
		for ( var i = 0; i < length; i += 4 ) {
			var r = imageData[i],
				g = imageData[i+1],
				b = imageData[i+2],
				a = imageData[i+3]; 
			
			if (r == 0 && g == 0 && b == 0) {
	            imageData[i+3] = 0;
			}
		}

		image.data = imageData;
		cOutput.putImageData(image, 0, 0, 0, 0, canvasWidth, canvasHeight);
	}

	vid.addEventListener("ended", function() {
		clearTimeout(timeOut);
	});

});