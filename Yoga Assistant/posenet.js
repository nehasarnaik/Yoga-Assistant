let video;
let poseNet;
let poses = [];
let chk=0;
function setup() {
  
  const canvas = createCanvas(640, 480);
  canvas.parent('videoContainer');

  // Video capture
  video = createCapture(VIDEO);
  video.size(width, height);
  
  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  chk=0;
  poseNet.on('pose', function(results) {
    
    if(chk==0){
      
    poses = results;
    
    }
    
    setTimeout(function(){ if(chk==0){
      var actpose=window.pose;
      
      console.log(actpose.keypoints);
      console.log(poses[0].pose.keypoints);

    var vect1=new Array();
    var vect2=new Array();

    var vect3=new Array();
    var vect4=new Array();

    var vect5=new Array();
    var vect6=new Array();
      var no_of_keypoint=17;
    for(var i=0;i<no_of_keypoint;i++){
      if(i<5){
      vect1.push(poses[0].pose.keypoints[i].position.x);
      vect1.push(poses[0].pose.keypoints[i].position.y);
      
      vect2.push(actpose.keypoints[i].position.x);
      vect2.push(actpose.keypoints[i].position.y);
      }

      if(i>=5&&i<11){
        vect3.push(poses[0].pose.keypoints[i].position.x);
        vect3.push(poses[0].pose.keypoints[i].position.y);
        
        vect4.push(actpose.keypoints[i].position.x);
        vect4.push(actpose.keypoints[i].position.y);
        }
        if(i>=11){
          vect5.push(poses[0].pose.keypoints[i].position.x);
          vect5.push(poses[0].pose.keypoints[i].position.y);
          
          vect6.push(actpose.keypoints[i].position.x);
          vect6.push(actpose.keypoints[i].position.y);
          }


    }

    
    console.log(vect5);
    console.log(vect6);
    var match1=window['func'](vect1,vect2);
    var match2=window['func'](vect3,vect4);
    var match3=window['func'](vect5,vect6);
    
    console.log(match1);   
    console.log(match2);
    console.log(match3);
    
    }  chk++;}, 5000);
    
  });
  
  // Hide the video element, and just show the canvas
  video.hide();
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
}

function modelReady(){
  console.log("in");
  select('#status').html('model Loaded')
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}