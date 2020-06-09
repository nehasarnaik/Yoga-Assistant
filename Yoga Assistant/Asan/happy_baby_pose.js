var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');


setTimeout(function(){
  document.getElementById("startcontent").style.display="none";

document.getElementById("maincontent").style.display="block";
start();

},5000);


function start(){

// Get access to the camera!
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        //video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream;
        video.flipHorizontal=true;
        video.play();
        
    });
    
    timer(15,0);
    
    
}
}
function timer(time,chk){
  setTimeout(function(){
    document.getElementById("timer").innerHTML=time;
    if(time>0)
    timer(time-1,chk);
    else if(chk==0)
    snap();
    else if(chk==1)
    location.replace("../option.html")
    
    
    

    
  },1000);

}


// Trigger photo take
function snap() {
  document.getElementById("vidimg").style.display="none";
  context.drawImage(video, 0, 0, 1200, 675);
 // video.hide();
  check();
  
}

function check(){

  
    var actpose;
    var imageElement = document.getElementById('canvas');
    

    var actpose;
    posenet.load().then(function(net) {
      const pose = net.estimateSinglePose(imageElement, {
        flipHorizontal: true
      });
      return pose;
    }).then(function(pose){
      
      
      actpose=window['pose'];
      drawKeypoints(pose,"canvas2");
      drawKeypoints(actpose,"canvas1");
      var vect1=new Array();
      var vect2=new Array();

      /*var keypoint1=new Array();
      var keypoint2=new Array();*/
      var angle=new Array();
      var dist=new Array();
      var no_of_keypoint=17;

      console.log(pose);
      console.log(actpose);
      
    for(var i=0;i<no_of_keypoint;i++){
      vect1=[];
      vect2=[];
      /*keypoint1.push(pose.keypoints[i].position.x);
      keypoint1.push(pose.keypoints[i].position.y);

      keypoint2.push(actpose.keypoints[i].position.x);
      keypoint2.push(actpose.keypoints[i].position.y);*/
      

      if(i>=5){
      
      /*if(pose.keypoints[i].score<0.5){
        vect1.push(0);
        vect1.push(0);
      }*/
      //else{

      
      vect1.push(pose.keypoints[i].position.x);
      vect1.push(pose.keypoints[i].position.y);//}var points1=crop_coord(keypoint1);


      /*if(actpose.keypoints[i].score<0.5){
        vect2.push(0);
      vect2.push(0);
      }*/
      //else{
      vect2.push(actpose.keypoints[i].position.x);
      vect2.push(actpose.keypoints[i].position.y);
      var sim=slopeSim(vect1,vect2);
      var dis=distance(vect1[0],vect1[1],vect2[0],vect2[1]);
      angle.push(sim);
      dist.push(dis);
      
      //}
      }
      
    }
    /*var points1=crop_coord(keypoint1);
    var points2=crop_coord(keypoint2);

    console.log(points1);
    console.log(points2);*/
    console.log(angle);
    console.log(dist);
    var size=angle.length;
    var tocrct=new Array();
    var text="Please Correct your"
    for(var i=0;i<size;i++){
      if(angle[i]>0.1||dist[i]>100){
        tocrct.push(actpose.keypoints[i+5].part);
        text=text+" "+actpose.keypoints[i+5].part;
      }
      
    }
    if(tocrct.length>0)
    document.getElementById("corrections").innerHTML=text;
    else
    document.getElementById("corrections").innerHTML="Good Job";
    console.log(tocrct);
    console.log((size-tocrct.length)*100/size);
  
    document.getElementById("score").innerHTML=(size-tocrct.length)*100/size;
     
      
      document.getElementById("afterClick").style.display="block";
      timer(8,1);
      

    
    
    
    /*console.log(vect1);
      console.log(vect2);
      var sim=window['func'](vect1,vect2);
      console.log(sim);*/
      
    })
}




function drawKeypoints(poses,type)  {
  // Loop through all the poses detected
  //image(video, 0, 0, width, height);
  var canvas=document.getElementById(type).getContext("2d");
  
  for (let i = 0; i < 1; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        
        canvas.ellipse(keypoint.position.x, keypoint.position.y, 5, 5,0,0,2*Math.PI);
        canvas.fill();
        canvas.strokeStyle = "#FFFFFF";

        
      }
    }
  }
}
