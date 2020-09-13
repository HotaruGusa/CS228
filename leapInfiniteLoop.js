var controllerOptions = {};
var i = 0;
var h = 0;
var x = window.innerWidth/2;
var y = window.innerHeight/2;
var rawXMin = 100;
var rawXMax = -100;
var rawYMin = 100;
var rawYMax = -100;

Leap.loop(controllerOptions, function(frame) {clear();
	//console.log(i)
	//var a = Math.floor(Math.random() * 3) -  1;
	//var b = Math.floor(Math.random() * 3) -  1;
	//circle(x + a, y + b, 100);	
	HandleFrame(frame);
}
);

function HandleFrame(frame) {
	if (frame.hands.length == 1) {
		var hand = frame.hands[0];
		HandleHand(hand);
	}
}

function HandleHand(hand){
	HandleFinger(hand.indexFinger);
}

function HandleFinger(finger){
	[x, y, z] = finger.tipPosition;

	if (x < rawXMin) {
		rawXMin = x;
	}
	if (x > rawXMax) {
		rawXMax = x;
	}
	if (y < rawYMin) {
		rawYMin = y;
	}
	if (y > rawYMax) {
		rawYMax = y;
	}

	x = (((x - rawXMin) * (window.innerWidth)) / (rawXMax - rawXMin))
	y = (((y - rawYMin) * (window.innerHeight)) / (rawYMax - rawYMin))
	circle(x,window.innerHeight - y,100);

}
