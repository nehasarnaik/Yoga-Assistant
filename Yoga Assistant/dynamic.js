var urlParams = new URLSearchParams(window.location.search);

document.getElementById("cat").src=urlParams.get('src');
document.getElementById("title").innerHTML=urlParams.get('pose');

var flipHorizontal = false;
    var actpose;
    var imageElement = document.getElementById('cat');
    var actpose;
    posenet.load().then(function(net) {
      const pose = net.estimateSinglePose(imageElement, {
        flipHorizontal: true
      });
      return pose;
    }).then(function(pose){
      window.pose=pose;
      
      
      
      
    })