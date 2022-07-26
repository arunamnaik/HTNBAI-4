function setup(){
    canvas= createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modalLoaded);
    poseNet.on("pose", gotPoses);
}

function draw(){
    image(video,0,0,600,500)
    fill("#0006b5");
    stroke("#000354");
    song1.isPlaying();
    variable1 = song1.status
    if(scorLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        song2.stop();
        if(song1.status == "false"){
            song1.play();
        }
    }
}

song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scorLeftWrist =0;
variable1 ="";

function preload(){
    song1 = loadSound("Shulk.mp3");
    song2 = loadSound("Otherstep.mp3");
}

function play(){
    song1.setVolume(1);
    song1.rate(1);
    song2.setVolume(1);
    song2.rate(1);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist X = "+leftWristX+"Left wrist Y ="+leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right wrist X = "+rightWristX+"Right wrist Y ="+rightWristY);
        scorLeftWrist =results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist"+scorLeftWrist);
    }
}