var rawXMin = 100;
var rawXMax = -100;
var rawYMin = 100;
var rawYMax = -100;

var controllerOptions = {};
var i = 0;

//function
function HandleFrame(frame){
 clear();

  if(frame.hands.length == 1){
    var hand = frame.hands[0];
    HandleHand(hand);
  }

}

function HandleHand(hand){
    var fingers = hand.fingers;
    for(var n = 0; n < fingers.length; n++){
        HandleFinger(fingers[n])
    }
  }

function HandleFinger(finger){

  for(var n = 0; n < 4; n++){
      HandleBone(finger.bones[n]);
  }
}


function HandleBone(bone){
  var bone_start = bone.prevJoint;
  var bone_end = bone.nextJoint;

  var center_bone = bone.center();
  var horizontal = center_bone[0];
  var y_center_bone = center_bone[2];
  var vertical = center_bone[1];
  console.log(horizontal);
  if(horizontal < rawXMin){
    rawXMin = horizontal;
  }
  if(horizontal > rawXMax){
    rawXMax = horizontal;
  }
  if(vertical < rawYMin){
    rawYMin = vertical;
  }
  if(vertical > rawYMax){
    rawYMax = vertical;
  }

  var x_pos_bone = ((horizontal-rawXMin)/(rawXMax - rawXMin)) * window.innerWidth ;
  var y_pos_bone = window.innerHeight - (((vertical-rawYMin)/(rawYMax-rawYMin))* window.innerHeight);
  circle(x_pos_bone,y_pos_bone,50);

  line(bone_start[0]*x_pos_bone,bone_start[2]*y_pos_bone,bone_end[0]**x_pos_bone,bone_end[2]*y_pos_bone);

}

Leap.loop(controllerOptions, function(frame){

 HandleFrame(frame);

}

);

