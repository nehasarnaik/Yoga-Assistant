function distance(x1,y1,x2,y2){

    var a=x1-x2;
    var b=y1-y2;
    return Math.sqrt((a*a)+(b*b));
}
function cosineSim(vect1,vect2){
    var dot=(vect1[1]*vect2[1])+(vect1[0]*vect2[0]);
    var mag1=Math.sqrt((vect1[1]*vect1[1])+(vect1[0]*vect1[0]));
    var mag2=Math.sqrt((vect2[1]*vect2[1])+(vect2[0]*vect2[0]));var points1=crop_coord(keypoint1);
    
    var cosval=dot/(mag1*mag2);
    return cosval;

    


}


function slopeSim(vect1,vect2){
    var a=(Math.abs(vect1[1]-675))/vect1[0];
    var b=(Math.abs(vect2[1]-675))/vect2[0];
    return Math.abs(a-b);

    


}

