var urlParams = new URLSearchParams(window.location.search);
var srcz=urlParams.get('src');
var name=urlParams.get('name');
console.log(srcz);

document.getElementById("cat1").src=srcz;
document.getElementById("start").src=srcz;
document.getElementById("catz").src=srcz;

document.getElementById("title").innerHTML=name;
  console.log("Mountain1");
var flipHorizontal = false;
    
    var imageElement = document.getElementById('cat1');
    
    posenet.load().then(function(net) {
      const pose = net.estimateSinglePose(imageElement, {
        flipHorizontal: true
      });
      return pose;
    }).then(function(pose){
      window.pose=pose;
      
      
      
      
    })





