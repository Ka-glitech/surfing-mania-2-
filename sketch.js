var canvas, backgroundImage;
var gameState = 0;
var sea;
var ob1Img, ob2Img, ob3Img, ob4Img;
var  obstacle1, obstacle2, obstacle3, obstacle4;
var surfer1Img, surfer1, surfer2;
var player, surfers;
var form, playerCount;
var allPlayers;
var x = 175;


function preload(){
  backgroundImage = loadImage("images/seaBg.jpg");
  ob1Img = loadImage("images/obstacle1-removebg-preview.png")
  ob2Img = loadImage("images/obstacle2-removebg-preview.png")
  ob3Img = loadImage("images/obstacle3-removebg-preview.png");
  ob4Img = loadImage("images/obstacle4-removebg-preview.png");
  surfer1Img = loadImage("images/Surfer-removebg-preview (1).png")
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

  
}


function draw(){
  background (backgroundImage)

  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  // if(gameState === 2){
  //   game.end();
  // }
  // drawSprites()
}
