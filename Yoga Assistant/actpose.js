var flipHorizontal = false;
    var actpose;
    var imageElement = document.getElementById('cat');

    posenet.load().then(function(net) {
      const pose = net.estimateSinglePose(imageElement, {
        flipHorizontal: true
      });
      return pose;
    }).then(function(pose){
      actpose=pose;
      console.log(actpose);
      
    })