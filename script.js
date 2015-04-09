$(function() {

	var vid = document.getElementById("vid");

	var canvas = document.getElementById("canvas"),
		c = canvas.getContext("2d"),
		canvasWidth = canvas.width,
		canvasHeight = canvas.height;

	c.fillStyle = "rgba(66, 66, 66, 1)";
	c.fillRect(0, 0, canvasWidth, canvasHeight);
	c.font = "30px 'Comic Sans MS'";
	c.fillStyle = "#c6c6c6";
	c.fillText("Brush here :) ", 225, 150);

	var outputCanvas = document.getElementById("output"),
		cOutput = outputCanvas.getContext("2d");

	var newColr = {r: 0, g: 0, b: 0, a: 0};

	function brush(event) { 
		
		var $this = $(this);
		
		vid.play();
		
		$this.on({ 	// Attach multiple event handlers simultaneously using a plain object. (http://api.jquery.com/on/#on-events-selector-data)
			mousemove: function(event) {

				// get brush position
				var xPos = event.pageX, // left                   
					yPos = event.pageY;	// top

				var widthSpace = ($(window).width() - 640) / 2,
					topSpace = $("video").position().top;

				var brushPosX = xPos - widthSpace,
					brushPosY = yPos - topSpace;
				// end of get brush position

				c.fillStyle = "rgb(0, 0, 0)";
				c.beginPath();
				c.arc(brushPosX, brushPosY, 50, 0, 2 * Math.PI, false);
				c.fill();

				manip();
			},
			mouseup: function() {
				$this.off("mousemove");
			}
		});
	}

	function manip() {
		var image = c.getImageData(0, 0, canvasWidth, canvasHeight),
		imageData = image.data,
		length = imageData.length;
		for ( var i = 0; i < length; i += 4 ) {
			var r = imageData[i],
				g = imageData[i+1],
				b = imageData[i+2],
				a = imageData[i+3]; 
			
			if (r == 0 && g == 0 && b == 0) {
				// imageData[i] = newColr.r;
	    		// imageData[i+1] = newColr.g;
				// imageData[i+2] = newColr.b;
	            imageData[i+3] = newColr.a;
			}
		}

		image.data = imageData;
		canvas.style.display = "none";
		cOutput.putImageData(image, 0, 0, 0, 0, canvasWidth, canvasHeight);
	}

	$(window).on("mousedown", brush);

});