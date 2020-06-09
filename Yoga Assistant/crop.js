
var points=new Array();

var x=new Array();
var y=new Array();


function crop_coord(vect1){

    for(var i=0;i<34;i++){
        if(i%2==0){
            x.push(vect1[i]);
        }
        else{
            y.push(vect1[i]);
        }

        
    }

points=[];
var xmax=Math.max(...x) // 4
        var xmin=Math.min(...x) // 1

        var ymax=Math.max(...y) // 4
        var ymin=Math.min(...y) // 1
     var width=xmax-xmin;
     var height=ymax-ymin;
     points.push(xmin);
     points.push(ymin);
     points.push(width);
     points.push(height);
     
     return points;


}

