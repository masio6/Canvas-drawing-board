	
import  {Narzędzie} from  './narzedzie.js';
	var tabu=[];
	var board1 = document.getElementById('board1');
	var box = document.getElementById('display');
	var titl = document.getElementById('tytul');
	getparam();
	var localhistory=[];
	var history=[];
	var kind=1,types='pen';
	var touchX1;
var touchY1;
var tit = document.querySelectorAll("titl");
	var canvas,ctx,c,ctx2;                         
	const rtyp=1;
	const dlugo=new Narzędzie();
const his1=[];
const toolbar = document.getElementById('toolbar');
var reader = new FileReader();
var canvas = document.getElementById('canvas');
	  ctx = canvas.getContext('2d');
	 var  col=ctx.strokeStyle;
	 var wid=ctx.lineWidth;
	   var czyrysuje=false;
		var skx,sky;
		
		canvas.width=window.innerWidth;
		canvas.height=window.innerHeight;
		
const canvaswidth=canvas.width;
const canvasheight=canvas.height;
downloadData();

toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

function getparam()
{var nazwastr='rysuj!';

	let param=new URLSearchParams(window.location.search);
	  nazwastr=param.get('n');
	
	 
titl.innerHTML=nazwastr;
}

setInterval(function(){
	
	if(!czyrysuje){
	downloadData();
	}
},1000);

function pushTohistory(obj) {
		history.push(obj);
		localhistory.push(obj);
	
	sendData();
	
		
		
	}



function  sendData() {
		
		const json = JSON.stringify(history);
		fetch(`http://localhost/canvas/serw.php${window.location.search}`, {
			method: 'POST',
			body: json
		});
	}

	function downloadData() {
		fetch(`http://localhost/canvas/serw.php${window.location.search}`)
			.then((response) => response.json())
			.then((json) => {
			
				json = JSON.parse(json);
				history=[];localhistory=[];
			
             
				// prints all lines on canvas
				json.map((element) => {
			
				history.push(element);
					
				
					malujfigure(element._data);

					// return canvass to preivious scale
					
				});
			});
	}



toolbar.addEventListener('change', e => {
    if(e.target.id === 'stroke') {
        ctx.strokeStyle = e.target.value;
		
		
     col=e.target.value;
	}

    if(e.target.id === 'thickness') {
        ctx.lineWidth = e.target.value;
		
		wid= e.target.value;
		
    }
	if(e.target.id=== 'kind')
	{
	 
	 kind=e.target.value;

     if(kind==1)
		 types='pen';
	 if(kind==2)
		 types='line';
	 if(kind==3)
		 types='elipse';
   
	
	 
	 
	}
    
});



var	pen=new Narzędzie();




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
				  tabu.push([point[0],point[1]]);
				  
				  
				 
					
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

				// Keep track of the mouse button beid and draw a dot at current location
		function sketchpad_mouseDown() {
			if(kind==1){
			
				
				
				userDrawnPixels.push([mouseX, mouseY]);
				drawDot(ctx,mouseX,mouseY,3);
              skx=mouseX,sky=mouseY;
			  czyrysuje=true;
			  tabu=[];
			mouseDown=1;}
		}


		function mouseOrTouchUp() {
				if(kind==1)
				{mouseDown=0;
				moving=0;
czyrysuje=false;			
			var pen=new Narzędzie();
				pen.ustawdane(skx,sky,skx,sky,ctx,canvasheight,canvaswidth,'pen');
				tabu.map((xytab) => {
			

			pen.pushxy(xytab[0], xytab[1]);
	
		
		
		});
				pushTohistory(pen);
				
				}
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
			if(kind==1)	
				{	getTouchPos();
				czyrysuje=true;
				userDrawnPixels.push([touchX, touchY]);
				drawDot(ctx,touchX,touchY);
				skx=touchX;
				sky=touchY;
 tabu=[];
				// Prevent a scrolling action as a result of this touchmove triggering.
				event.preventDefault();

				moving=1;
				}	
			
		}

		function sketchpad_touchMove(e) {
				getTouchPos(e);
				userDrawnPixels.push([touchX, touchY]);
				drawLine(ctx,touchX,touchY);

	
				// Prevent a scrolling action as a result of this touchmove triggering.
				event.preventDefault();
		}
init();

	
	
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
Endx=x;
Endyy=y; 
    ctx.beginPath();
    ctx.moveTo(startX, startY + (y - startY) / 2);
    ctx.bezierCurveTo(startX, startY, x, startY, x, startY + (y - startY) / 2);
    ctx.bezierCurveTo(x, y, startX, y, startX, startY + (y - startY) / 2);
    ctx.closePath();
    ctx.stroke();
}

function drawline(x, y) {
Endx=x;
Endyy=y; 
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
	   
	    if(data['type']!='pen')
		{ var x=data['coordinates'][0][0],y=data['coordinates'][0][1],startX=data['coordinates'][0][2],startY=data['coordinates'][0][3];
		}
	 
	
	
	 
	 if(data['type']=='pen')
	 {
	
		 
		 ctx.beginPath();
		ctx.strokeStyle = data['color'];
		ctx.lineWidth = data['width'];
         
		data['coordinates'].map((xytab) => {
			

			ctx.lineTo(xytab[0], xytab[1]);
	
		
		
		});

		ctx.stroke();
		ctx.closePath();
		 
		 
	 }
	 
	 
	 
	 
	 
	 
	 
	 if(data['type']=='line')
	 {
		  ctx.beginPath();
    
	
	
		ctx.strokeStyle = data['color'];
		ctx.lineWidth = data['width'];
	ctx.moveTo(startX,startY);

	
			ctx.lineTo(x,y);

    ctx.closePath();
    ctx.stroke();
		 
		 
	 }
	 
	 
if(data['type']=='elipse'){
	 ctx.beginPath();
    
		ctx.strokeStyle = data['color'];
		ctx.lineWidth = data['width'];
	ctx.moveTo(startX, startY + (y - startY) / 2);
    ctx.bezierCurveTo(startX, startY, x, startY, x, startY + (y - startY) / 2);
    ctx.bezierCurveTo(x, y, startX, y, startX, startY + (y - startY) / 2);
    ctx.closePath();
 	ctx.stroke();
}


ctx.strokeStyle=col;
ctx.lineWidth=wid;

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
	czyrysuje=true;
		
	
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

if(kind==2 || kind==3){
	snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
	if (!isDown) {
		return;
	}
	czyrysuje=false;
	e.preventDefault();
	e.stopPropagation();
	var nar=new Narzędzie();
	nar.ustawdane(Endx,Endyy,touchX1,touchY1,ctx,canvasheight,canvaswidth,types);
	pushTohistory(nar);

	
	
	
isDown = false;}
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
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);  
  e.preventDefault();
    e.stopPropagation();
    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);
	czyrysuje=true;
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
var nar=new Narzędzie();
	nar.ustawdane(Endx,Endyy,startX,startY,ctx,canvasheight,canvaswidth,types);
	pushTohistory(nar);
	
	
    isDown = false;
		}
}



function handleMouseOut(e) {
if(kind==3 || kind==2){ 
 snapshot=ctx.getImageData(0,0,canvas.width,canvas.height);
 czyrysuje=false;
    if (!isDown) {
        return;
    }
    e.preventDefault();
    e.stopPropagation();
isDown = false;

var nar=new Narzędzie();
	nar.ustawdane(Endx,Endyy,startX,startY,ctx,canvasheight,canvaswidth,types);
	pushTohistory(nar);
	
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
	

