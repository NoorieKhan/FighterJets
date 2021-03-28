var database;
var gameState = 0,playerCount;
var redJetImg, redJet;
var blueJetImg, blueJet;
var back_img;
var allPlayers, player;
var players =[];
var form, game;
var redBulletImg, blueBulletImg;
var x = 200 ;
var y = 100;
var redbulletGroup, bluebulletGroup;
var allBullets1, allBullets2;
var flag1=false;
var flag2=false;
var winner=null;
function preload(){
redJetImg = loadImage("images/redJet.png");
blueJetImg = loadImage("images/blueJet.png");
back_img = loadImage("images/background.jpg");
redBulletImg = loadImage("images/redBullet0.png");
blueBulletImg = loadImage("images/blue_bullet0.png");
  
}
function setup() {
  createCanvas(1000, 600);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  
}

function draw() {
  //game.getState();
  if (playerCount === 2 && winner === null) {
    game.update(1);
  }
  if (winner!==null) {
    game.update(2);
  
   }
 if(gameState === 1 && winner === null){
  game.play();
 }
else  if(gameState===2){
    game.end();
    game.updateWinner(winner)
  }

}
