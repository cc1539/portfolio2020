
var boxScale;
var boxes = [];

var fadeShade = 0;

var mouseX_lag;
var mouseY_lag;

function lineBetweenVertices(a,b) {
	line(a.x,a.y,b.x,b.y);
}

class Box {
	
	constructor(time) {
		this.reset(time);
	}
	
	reset(time) {
		this.z = 200*(1-time);
		this.x = random(-1,1)*.05*window.innerWidth;
		this.y = random(-1,1)*.05*window.innerHeight;
		this.size = 7;
	}
	
	move() {
		this.z--;
		if(this.z<0) {
			this.reset(0);
		}
	}
	
	draw() {
		//stroke(fadeShade+(255-fadeShade)*(this.z/100-1));
		colorMode(RGB);
		stroke(200,(1-this.z/100)*255*fadeShade);
		var verts = {};
		for(var i=0;i<=1;i++) { verts[i]={}
		for(var j=0;j<=1;j++) { verts[i][j]={}
		for(var k=0;k<=1;k++) {
			var vert = {
				'x':this.x+i*this.size,
				'y':this.y+j*this.size,
				'z':this.z+k*this.size
			};
			vert.x /= vert.z/boxScale;
			vert.y /= vert.z/boxScale;
			//vert.x += window.innerWidth/2;
			//vert.y += window.innerHeight/2;
			vert.x += mouseX_lag;
			vert.y += mouseY_lag;
			verts[i][j][k] = vert;
		}
		}
		}
		for(var i=0;i<=1;i++) {
		for(var j=0;j<=1;j++) {
		for(var k=0;k<=1;k++) {
			var v0 = verts[i][j][k];
			var v1;
			if(i==0) { v1=verts[i+1][j][k]; lineBetweenVertices(v0,v1); }
			if(j==0) { v1=verts[i][j+1][k]; lineBetweenVertices(v0,v1); }
			if(k==0) { v1=verts[i][j][k+1]; lineBetweenVertices(v0,v1); }
		}
		}
		}
	}
	
}

function strokeHSB(h,s,b,a) {
	colorMode(HSB);
	var col = color(h,s,b);
	colorMode(RGB);
	stroke(red(col),green(col),blue(col),a);
}

function drawBranch(x,y,a,length,a0,a1,shrink,d0,d1,s) {
	
	var x1 = x+length*cos(a);
	var y1 = y+length*sin(a);
	
	strokeWeight(length*0.1);
	//stroke(fadeShade+(255-fadeShade)*(1-s));
	//strokeHSB(((1-s)*64+frameCount)%255,255,55,fadeShade*255*(1-s));
	stroke(200,fadeShade*255*(1-s));
	line(x,y,x1,y1);
	
	length *= shrink;
	s += .15;
	
	if(s<1) {
		drawBranch(x1,y1,a-a0,length,a0-d0,a1+d1,shrink,d0,d1,s);
		drawBranch(x1,y1,a+a1,length,a0-d0,a1+d1,shrink,d0,d1,s);
	}
	
}

var fx = {
	'lines':function() {
		
		var speed = 50;
		var start = (frameCount*.5)%speed;
		
		var length = window.innerWidth+window.innerHeight;
		
		//colorMode(HSB);
		for(var i=start;i<length;i+=speed) {
			var t = i + frameCount*3;
			
			var w = (sin((t+mouseX_lag+mouseY_lag)/100.)*.5+.5)*3+1;
			
			strokeWeight(w);
			
			//strokeHSB(((sin(t/100.)*.5+.5)*32+frameCount)%255,55,255,fadeShade*255);
			
			stroke(220,fadeShade*255);
			line(i,0,0,i);
			/*
			w -= 2;
			if(w>0) {
				strokeWeight(w);
				stroke(0,fadeShade*255);
				line(i,0,0,i);
			}
			*/
		}
		//colorMode(RGB);
		
	},
	'boxes':function() {
		strokeWeight(2);
		for(var i=0;i<boxes.length;i++) { boxes[i].move(); }
		for(var i=0;i<boxes.length;i++) { boxes[i].draw(); }
	},
	'fractal':function() {
		/*
		noStroke();
		fill(0,fadeShade*255);
		rect(0,0,width,height);
		*/
		stroke(fadeShade);
		var split_angle = frameCount/210.;
		var drift0 = (mouseX_lag-window.innerWidth/2)/1000.;
		var drift1 = (mouseY_lag-window.innerHeight/2)/1000.;
		var length = max(window.innerWidth,window.innerHeight)/9;
		for(var i=0;i<3;i++) {
			var angle = i/3*TWO_PI+frameCount/130.;
			drawBranch(
					window.innerWidth/2,
					window.innerHeight/2,
					angle,length,
					split_angle,split_angle,0.9,
					drift0,drift1,0);
		}
	},
	'epilepsy':function() {
		background(random(0,255));
	}
};

var fxlist = {};
var fxindex = 0;
var fxtimer = 750;
var fxfade = 0;

function setup() {
	
	createCanvas(windowWidth-17,windowHeight);
	
	let canvas = document.getElementById("defaultCanvas0");
	let splash = document.getElementById("content-title-panel");
	splash.prepend(canvas);
	
	for(var i=0;i<50;i++) {
		boxes.push(new Box(1-i/50.));
	}
	
	boxScale = 400;
	
	fxlist = ['lines','boxes','fractal'];
	fxindex = 0;
	fxtimer = 700;
	fxfade = 0;
	
	mouseX_lag = 0;
	mouseY_lag = 0;
	
	strokeCap(SQUARE);
}

function windowResized() {
	resizeCanvas(windowWidth-17,windowHeight);
}

function draw() {
	
	clear();
	
	if(window.scrollY>windowHeight) {
		return;
	}
	
	mouseX_lag += (mouseX-mouseX_lag)*.1;
	mouseY_lag += (mouseY-mouseY_lag)*.1;
	
	fadeShade = 1;
	
	fx[fxlist[fxindex]]();
	if(++fxtimer>1000) {
		fxtimer = 0;
		fxindex++;
		if(fxindex>=fxlist.length) {
			fxindex = 0;
		}
	}
	
}
