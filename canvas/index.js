	
import  {Narzędzie} from  './narzedzie.js';
	
	var box = document.getElementById('display');
	
	
	
	var kind=1;
	var touchX1;
var touchY1;

	var canvas,ctx,c,ctx2;                         
	const rtyp=2;
	const narz=new Narzędzie();
    narz.ustawdane(192,306,66,235,20,15,'elipse');
const toolbar = document.getElementById('toolbar');
var reader = new FileReader();
canvas = document.getElementById('canvas');
	  ctx = canvas.getContext('2d');
	   
		
const canvaswidth=canvas.width;
const canvasheight=canvas.height;

malujfigure(narz._data);
toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

toolbar.addEventListener('change', e => {
    if(e.target.id === 'stroke') {
        ctx.strokeStyle = e.target.value;
		
		canv.zmienkolor(ctx.strokeStyle);
    }

    if(e.target.id === 'thickness') {
        ctx.lineWidth = e.target.value;
		
		
		
    }
	if(e.target.id=== 'kind')
	{
	 
	 kind=e.target.value;


   
	
	 
	 
	}
    
});



const pen=new Narzędzie();




		// Variables to keep track of the mouse position and left-button status
		var mouseX,mouseY,moving, mouseDown=0;

		// Variables to keep track of the touch position
		var touchX,touchY;

		var userDrawnPixels = [];

		// Get the touch position relative to the top-left of the canvas
		// When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
		// but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
		// "target.offsetTop" to get the correct values in relation to the top left of the canvas.
		function getTouchPos(e) {
				if (!e)
				    var e = event;

				if(e.touches) {
				    if (e.touches.length == 1) { // Only deal with one finger
				        var touch = e.touches[0]; // Get the information for finger #1
				        touchX=touch.pageX-touch.target.offsetLeft;
				        touchY=touch.pageY-touch.target.offsetTop;
				    }
				}
		}

		// Set-up the canvas and add our event handlers after the page has loaded
		function init() {
				// Get the specific canvas element from the HTML document
				

				canvas.focus();

				// If the browser supports the canvas tag, get the 2d drawing context for this canvas
				if (canvas.getContext)
				    ctx = canvas.getContext('2d');

				// Check that we have a valid context to draw on/with before adding event handlers
				if (ctx) {
				    // React to mouse events on the canvas, and mouseup on the entire document
				    canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
				    canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
				    canvas.addEventListener('mouseup', mouseOrTouchUp, false);

				    // React to touch events on the canvas
				    canvas.addEventListener('touchstart', sketchpad_touchStart, false);
				    canvas.addEventListener('touchmove', sketchpad_touchMove, false);
				    canvas.addEventListener('touchend', mouseOrTouchUp, false);
				}
		}

		// Draws a dot at a specific position on the supplied canvas name
		// Parameters are: A canvas context, the x position, the y position, the size of the dot
		function drawLine(ctx, x, y, size) {
			
if(kind==1){
			ctx.fillStyle = "lightgrey";
				ctx.beginPath();

				var n = userDrawnPixels.length;
				var point = userDrawnPixels[n-1];

				if ((n>1) && moving) {
				    var prevPoint = userDrawnPixels[n-2];
				    ctx.moveTo(prevPoint[0],prevPoint[1]);
				    ctx.lineTo(point[0], point[1]);
					pen._data['cordinates'][]=[[point[0],point[1]]];
					
				} else {
				    //ctx.moveTo(point[0],point[0]);
				    //ctx.lineTo(point[0], point[1]);
				}

				ctx.lineCap = "round";
				ctx.lineJoin = "round";
			
				ctx.stroke();
				ctx.closePath();
				ctx.fill();
			
		}
		}

		function drawDot(ctx, x, y, size) {
				

				// Draw a filled circle
				ctx.beginPath();
				ctx.arc(x, y, size, 0, Math.PI*2, true);
				ctx.closePath();
				ctx.fill();
		}

				// Keep track of the mouse button being pressed and draw a dot at current location
		function sketchpad_mouseDown() {
			if(kind==1)
				pen.ustawdane(Endx,Endyy,touchX1,touchY1,canvasheight,canvaswidth,'pen');
				userDrawnPixels.push([mouseX, mouseY]);
				drawDot(ctx,mouseX,mouseY,3);

				mouseDown=1;
		}


		function mouseOrTouchUp() {
				mouseDown=0;
				moving=0;
				
		}

		function sketchpad_mouseMove(e) {
				// Update the mouse co-ordinates when moved
				getMousePos(e);

				// Draw a dot if the mouse button is currently being pressed
				if (mouseDown==1) {
				    drawLine(ctx,mouseX,mouseY,6);
					
					
				    userDrawnPixels.push([mouseX, mouseY]);
				    moving=1;
				}
		}

		// Get the current mouse position relative to the top-left of the canvas
		function getMousePos(e) {
				if (!e)
				    var e = event;

				if (e.offsetX) {
				    mouseX = e.offsetX;
				    mouseY = e.offsetY;
				}
				else if (e.layerX) {
				    mouseX = e.layerX;
				    mouseY = e.layerY;
				}
		}

		// Draw something when a touch start is detected
		function sketchpad_touchStart() {
				getTouchPos();
				userDrawnPixels.push([touchX, touchY]);
				drawDot(ctx,touchX,touchY);

				// Prevent a scrolling action as a result of this touchmove triggering.
				event.preventDefault();

				moving=1;
				
			
		}

		function sketchpad_touchMove(e) {
				getTouchPos(e);
				userDrawnPixels.push([touchX, touchY]);
				drawLine(ctx,touchX,touchY);

	
				// Prevent a scrolling action as a result of this touchmove triggering.
				event.preventDefault();
		}
init();
var canvas = document.querySelector('canvas')
document.getElementById('save').addEventListener('click', function () {
  // retrieve the canvas data
  var canvasContents = canvas.toDataURL(); // a data URL of the current canvas image
  var data = { image: canvasContents, date: Date.now() };
  var string = JSON.stringify(data);

  // create a blob object representing the data as a JSON string
  var file = new Blob([string], {
    type: 'application/json'
  });
  
  // trigger a click event on an <a> tag to open the file explorer
  var a = document.createElement('a');
  a.href = URL.createObjectURL(file);
  a.download = 'data.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

// event handler for the load button
document.getElementById('load').addEventListener('change', function () {
  if (this.files[0]) {
    // read the contents of the first file in the <input type="file">
    reader.readAsText(this.files[0]);
  }
});

// this function executes when the contents of the file have been fetched
reader.onload = function () {
  var data = JSON.parse(reader.result);
  var image = new Image();
  image.onload = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0); // draw the new image to the screen
  }
  image.src = data.image; // data.image contains the data URL
};

	
	
	var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var canvasOffset = $("#canvas").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
var startX;
var startY;
var isDown = false;
var snapshot;
function drawOval(x, y) {
  ctx.putImageData(snapshot,0,0);
    ctx.beginPath();
    ctx.moveTo(startX, startY + (y - startY) / 2);
    ctx.bezierCurveTo(startX, startY, x, startY, x, startY + (y - startY) / 2);
    ctx.bezierCurveTo(x, y, startX, y, startX, startY + (y - startY) / 2);
    ctx.closePath();
    ctx.stroke();
}

function drawline(x, y) {
  ctx.putImageData(snapshot,0,0);
    ctx.beginPath();
    ctx.moveTo(startX,startY);

	
			ctx.lineTo(x,y);

    ctx.closePath();
    ctx.stroke();
}

function malujfigure(data)
{	
		//ctx.strokeStyle = data['color'];
		//ctx.lineWidth = data['width'];
	   
	   
	  var x=data['coordinates'][0][0],y=data['coordinates'][0][1],startX=data['coordinates'][0][2],startY=data['coordinates'][0][3];
	   console.log(x);
	 
	 if(rtyp==2)
	 {
		  ctx.beginPath();
    ctx.moveTo(startX,startY);

	
			ctx.lineTo(x,y);

    ctx.closePath();
    ctx.stroke();
		 
		 
	 }
	 
	 
if(rtyp==3){
	 ctx.beginPath();
    ctx.moveTo(startX, startY + (y - startY) / 2);
    ctx.bezierCurveTo(startX, startY, x, startY, x, startY + (y - startY) / 2);
    ctx.bezierCurveTo(x, y, startX, y, startX, startY + (y - startY) / 2);
    ctx.closePath();
 	ctx.stroke();
}

}

var Endx,Endyy;








function drawOval1(x, y) {
  startX=touchX1;
  startY=touchY1;
  Endx=x;
  Endyy=y;
  ctx.putImageData(snapshot,0,0);
    ctx.beginPath();
    ctx.moveTo(startX, startY + (y - startY) / 2);
    ctx.bezierCurveTo(startX, startY, x, startY, x, startY + (y - startY) / 2);
    ctx.bezierCurveTo(x, y, startX, y, startX, startY + (y - startY) / 2);
    ctx.closePath();

	
	
	
    ctx.stroke();
}
function drawline1(x, y) {
 Endx=x;
  Endyy=y; 
 ctx.putImageData(snapshot,0,0);
    ctx.beginPath();
    ctx.moveTo(touchX1,touchY1);

	
			ctx.lineTo(x,y);

    ctx.closePath();
    ctx.stroke();
}


function handleMouseDown1(e) {
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    e.preventDefault();
	e.stopPropagation();
	touchX1 = parseInt(e.touches[0].clientX - offsetX);
	touchY1 = parseInt(e.touches[0].clientY - offsetY);
	
		
	
	isDown = true;
}

function handleMouseUp1(e) {
    
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
	if (!isDown) {
		return;
	}
	

	e.preventDefault();
	e.stopPropagation();
	isDown = false;
}

function handleMouseOut1(e) {
	snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
	if (!isDown) {
		return;
	}
	e.preventDefault();
	e.stopPropagation();
	var nar=new Narzędzie();
	narz.ustawdane(Endx,Endyy,touchX1,touchY1,canvasheight,canvaswidth);
	

	
	
	
	isDown = false;
}

function handleMouseMove1(e) {

   
    if (!isDown) {
		return;
	}

	e.preventDefault();
	e.stopPropagation();
	mouseX = parseInt(e.touches[0].clientX - offsetX);
	mouseY = parseInt(e.touches[0].clientY - offsetY);
if(kind==3)
	drawOval1(mouseX, mouseY);
if(kind==2)
	drawline1(mouseX,mouseY);
}


function handleMouseDown(e) {
if(kind==3 || kind==2){   
   e.preventDefault();
    e.stopPropagation();
    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);
isDown = true;}
}

function handleMouseUp(e) {
    	if(kind==3 || kind==2){
		snapshot=ctx.getImageData(0,0,canvas.width,canvas.height);
	if (!isDown) {
        return;
    }
    e.preventDefault();
    e.stopPropagation();
	narz=new Narzędzie;
	narz.onPointerDown();
    isDown = false;
		}
}

function handleMouseOut(e) {
if(kind==3 || kind==2){ 
 snapshot=ctx.getImageData(0,0,canvas.width,canvas.height);
 
    if (!isDown) {
        return;
    }
    e.preventDefault();
    e.stopPropagation();
isDown = false;

var nar=new Narzędzie();
	narz.ustawdane(Endx,Endyy,startX,startY,canvasheight,canvaswidth);
	
	
}
}

function handleMouseMove(e) {
   
if(kind==3 || kind==2){
   if (!isDown) {
        return;
    }

    e.preventDefault();
    e.stopPropagation();
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
if(kind==3)  
  drawOval(mouseX, mouseY);
if(kind==2)
	drawline(mouseX,mouseY)
}}


canvas.addEventListener("touchstart", function (e) {
	
    handleMouseDown1(e);
   
});
canvas.addEventListener("touchend", function (e) {
    
    handleMouseOut1(e);
});
canvas.addEventListener("touchmove", function (e) {


	handleMouseMove1(e);

});

$("#canvas").mousedown(function (e) {
    handleMouseDown(e);
});
$("#canvas").mousemove(function (e) {
    handleMouseMove(e);
});
$("#canvas").mouseup(function (e) {
    handleMouseUp(e);
});
$("#canvas").mouseout(function (e) {
    handleMouseOut(e);
});
	
