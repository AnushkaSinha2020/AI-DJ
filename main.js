song = 'music.mp3';
song1= 'music2.mp3';

leftWristX="";
leftWristY="";

rightWristX="";
rightWristY="";

scoreLeftWrist= 0;

function setup(){
    canvas= createCanvas(600,500);
    canvas.position(450, 200);

    video= createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function modelLoaded(){
     console.log('PoseNet is Initialised');
} 

function draw(){
    image(video, 0, 0, 600, 500);
    fill('#FF0000');
    stroke('#FF0000');
    if(scoreLeftWrist > 0){
        circle(leftWristX, rightWristY, 20);

        InNumberLeftWristY= Number(leftWristY);
        remove_decimals= floor(InNumberLeftWristY);
        song= remove_decimals/500;
        document.getElementById("song_name").innerHTML= "Song Name = Harry Potter Theme Song";
        song.play("music.mp3");
    }
}

function preload(){
    song= loadSound("music.mp3");
    song1= loadSound("music2.mp3");
}

function play(){
    song.play();
    song1.play();
}

function gotPoses(results){
   if(results.length > 0){
       console.log(results);
       scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = "+scoreLeftWrist);
       leftWristX= results[0].pose.leftWrist.x;
       leftWristY= results[0].pose.leftWrist.y;
       console.log("leftWristX = "+leftWristX+" leftWristY = "+leftWristY);

       rightWristX= results[0].pose.rightWrist.x;
       rightWristY= results[0].pose.rightWrist.y;
       console.log("rightWristX = "+rightWristX+" rightWristY = "+rightWristY);
   }
}