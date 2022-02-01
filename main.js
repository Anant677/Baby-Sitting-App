img = "";
state = "";
object = [];
soundplaying = "";
ok = "";
function preload(){
img = loadImage("istockphoto-1316375066-170667a.jpg");
//song = loadSound("mixkit-vintage-warning-alarm-990 (1).wav");
}
function setup(){
canvas = createCanvas(400,400);
canvas.center();

video = createCapture(VIDEO);
video.hide();
objectDetector = ml5.objectDetector("cocossd",modelLoaded);

}
function draw(){
image(video,0,0,400,400);
//soundplaying = song.isPlaying();
if(state != ""){
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video,gotResult);
   for(var i=0 ; i < object.length ; i++){
       document.getElementById("status").innerHTML = "Status: Object Detected";
       document.getElementById("objects").innerHTML = "Number of Objects Detected = "+object.length;
       confidence = floor(object[i].confidence*100);
       fill(r,g,b);
       text(object[i].label +" "+confidence+" "+"%" , object[i].x+10 , object[i].y+20);
       noFill();
       stroke(r,g,b);
       rect(object[i].x , object[i].y , object[i].width+40 , object[i].height+40);
   }
}
if(object.length == 0){
    document.getElementById("objects").innerHTML= "Baby Not Found"; 
       //song.play();
   }else{
    document.getElementById("objects").innerHTML= "Baby Found";
    if(soundplaying == true){
        //song.stop();
    }
   }
}
//rect(x,y,width,height);
function modelLoaded(){
console.log("model is initialized");
state = true;
document.getElementById("status").innerHTML = "Status : Detecting Objects";
//objectDetector.detect(video,gotResult);
}
function gotResult(error,results){
if(error){
    console.log(error);
}else{
    console.log(results);
    object = results;
}
}