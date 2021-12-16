var leftWristY = 0;
var rightWristY = 0;
var leftWristX = 0;
var rightWristX = 0;
var song = "";
var leftWristScore = 0;
var rightWristScore = 0;

function preload(){
    song = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(650, 470);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, function(){
        console.log("Posenet is Activated");
    });
    posenet.on("pose", gotPoses);
}
function draw(){
    image(video, 0, 0, 650, 470);

    if(leftWristScore >  0.2){
        circle(leftWristX, leftWristY, 25);
        intLeftWristY = Number(leftWristY);
        floorLeftWristY = floor(intLeftWristY);
        volume = floorLeftWristY/470;
        document.getElementById("volumeSpan").innerHTML = volume;
        song.setVolume(volume);

    }
    if(rightWristScore > 0.2){
        circle(rightWristX, rightWristY, 25);
    
        if(rightWristY > 0 && rightWristY <= 100){
            document.getElementById("speedSpan").innerHTML = "0.5x"
            song.rate(0.5);
        }

        else if(rightWristY > 100 && rightWristY <= 200){
            document.getElementById("speedSpan").innerHTML = "1x"
            song.rate(1);
        }

        else if(rightWristY > 200 && rightWristY <= 300){
            document.getElementById("speedSpan").innerHTML = "1.5x"
            song.rate(1.5);
        }
        else if(rightWristY > 300 && rightWristY <= 400){
            document.getElementById("speedSpan").innerHTML = "2x"
            song.rate(2);
        }
        else if(rightWristY > 400){
            document.getElementById("speedSpan").innerHTML = "2.5x"
            song.rate(2.5);
        }
    }
}
function Play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        rightWristScore = results[0].pose.keypoints[10].score;
        leftWristScore = results[0].pose.keypoints[9].score;
        console.log(" left wrist score = "+ leftWristScore);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        //console.log("Right wrist x = " + rightWristX + " Right wrist y = " + rightWristY);
        
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        //console.log("Left wrist x = " + leftWristX + " Left wrist y = " + leftWristY);
    };
}