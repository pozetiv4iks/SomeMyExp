//Flappy Board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//Flappy Bird
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg ;

//Pipes
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let downPipeImg;

//physics
let velocityX = -2; //pipe left
let velocityY = 0;//jump speed bird
let gravity = 0.4;

//over
let gameOver = false;

//score
let score = 0;
let scoreHight = [0,0,0,0,0,0,0,0,0,0];

 

let howManyGame = 0;

let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}


let wallX = boardWidth / 12;
let wallY = 120;
let wallHeight = 400;
let wallWidth = 300;
let wallImg;

let wall = {
    x : wallX,
    y : wallY,
    height : wallHeight,
    width : wallWidth
}

const flip = document.getElementById("sound");
const hit = document.getElementById("hit");
const point = document.getElementById("point");
const fall = document.getElementById("fall");
const swoosh = document.getElementById("swoosh");

//Background&&Bird
window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");


    //loadImage
    birdImg = new Image();
    birdImg.src = "flappybird.png";
    birdImg.onload = function(){
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }

    topPipeImg = new Image();
    topPipeImg.src = "toppipe.png";

    downPipeImg = new Image();
    downPipeImg.src = "bottompipe.png";
    
    wallImg = new Image();
    wallImg.src = "wall.png"


    requestAnimationFrame(update);
    setInterval(placePipes, 1500);//1.5s
    document.addEventListener("keydown", moveBird);

}

function update() {
    requestAnimationFrame(update);
    if(gameOver){
        localStorage.setItem(howManyGame, score);
        context.drawImage(wallImg, wall.x, wall.y, wall.width, wall.height);
        context.fillStyle = "black";
        context.font = "50px fantasy";
        context.fillText('YOU LOSE', 90, 170 );
        context.fillStyle = "black";
        context.font = "40px fantasy";
        context.fillText('Score: ' + score, 40, 250 );
        context.fillText('Hight score: ' + scoreHight[scoreHight.length - 1], 40, 290 );
        context.font = "25px fantasy";
        context.fillText('Top 10 game:', 40 ,320);
        context.font = "15px fantasy";
        context.fillText('1: ' + scoreHight[9], 40 ,335);
        context.fillText('2: ' + scoreHight[8], 40 ,352);
        context.fillText('3: ' + scoreHight[7], 40 ,369);
        context.fillText('4: ' + scoreHight[6], 40 ,386);
        context.fillText('5: ' + scoreHight[5], 40 ,403);
        context.fillText('6: ' + scoreHight[4], 90 ,335);
        context.fillText('7: ' + scoreHight[3], 90 ,352);
        context.fillText('8: ' + scoreHight[2], 90 ,369);
        context.fillText('9: ' + scoreHight[1], 90 ,386);
        context.fillText('10:' + scoreHight[0], 90 ,403);
        context.font = "40px fantasy";
        context.fillText('"space to start"', 53, 450);
        return;
    }
    context.clearRect(0 , 0, board.width, board.height);

    //Flappybird
    velocityY += gravity;
    bird.y = Math.max(bird.y + velocityY, 0)//limit
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    //bottomlimit
    if (bird.y > board.height){
        gameOver = true;
        fall.play();
        if (howManyGame < 9){
            howManyGame++;
        } else {
            howManyGame = 0
        }
        scoreHight[howManyGame] = score;
            scoreHight.sort(function (a, b) {
            return a - b;
        });
    }

    //Pipse
    for (let i = 0 ; i < pipeArray.length; i ++){
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if(!pipe.passed && bird.x > pipe.x + pipe.width){
            score += 0.5; // because 2 pipes
            pipe.passed = true;
            point.play();
        }

        if (delectCollision(bird, pipe)){
            gameOver = true
            hit.play();
            if (howManyGame < 9){
                howManyGame++;
            } else {
                howManyGame = 0
            }
            scoreHight[howManyGame] = score;
            scoreHight.sort(function (a, b) {
                return a - b;
              });
        }
    }
    
    //clearpipes
    while ( pipeArray.length > 0 && pipeArray[0].x < -pipeWidth){
        pipeArray.shift();

    }

    //score
    context.fillStyle = "black";
    context.font = "45px fantasy";
    context.fillText(score, 5, 45);

}

function placePipes() {
    if (gameOver){
        return
    }

    let randomPipeY = pipeY - pipeHeight/4 - Math.random() * (pipeHeight/2);
    let openingSpace = board.height/4;
    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }

    pipeArray.push(topPipe);

    let downPipe = {
        img : downPipeImg,
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }

    pipeArray.push(downPipe);
}

function moveBird(e) {
    if ( e.code == "Space" || e.code == "ArrowUp" ){
        //jump
        velocityY = -6;
        flip.currentTime = 0;
        flip.play();

        if (gameOver){
            bird.y = birdY;
            pipeArray = [];
            score = 0;
            gameOver = false;
        }
    }


}

function delectCollision(a , b){
    return a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
}

