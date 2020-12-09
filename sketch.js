var player1, player2;
var edges,fireG;
var BGimg;
var BlueDragon, RedDragon, fireimg, fire;
var score = 0;
var player5;
var BDragon;
var enemyG,gameOver, gameOverImg;
var gameState = "play";

function preload()
{
   Bgimg = loadImage("background.jpg");
     gimg = loadAnimation("tenor.gif")  ;  
     gameOverImg = loadImage("gameover.jpg") 
 
   RedDragon = loadAnimation("d1.jpg","d2.jpg","d3.jpg");
  BlueDragon = loadAnimation("dragon1.png","dragon2.png","dragon3.png");
   // fireimg = loadImage("firesprite1.png");
  updragon = loadAnimation("dragonimg1.png","dragonimg2.png","dragonimg3.png");
 fireimg = loadAnimation("fire1.png","fire2.png","fire3.png","fire4.png","fire5.png");
downdragon = loadAnimation("Dragonsprite1.png","Dragonsprite2.png","Dragonsprite3.png")
BDragon = loadAnimation("DragonP1.png","DragonP2.png","DragonP3.png","DragonP4.png","DragonP5.png")
}
 
function setup() {
  createCanvas(windowWidth,windowHeight);
  background = createSprite(0,0,width,height);
 background.scale = 1.3;         
  background.addImage(Bgimg);
  player1 = createSprite(0,100,10,10);
  player1.addAnimation("Dragon",RedDragon);
 // player1.debug = true;
  
  enemyG = new Group();
  

console.log(windowWidth,windowHeight);
  fireG = new Group();
  
  edges = createEdgeSprites();
}

function draw() {
 // background(Bgimg);
if(gameState === "play"){
  background.velocityX = -5;
  if (background.x < 350){
    background.x = background.width/2
  }
  
  if(keyDown(RIGHT_ARROW)){
    //player1.velocityX = 5;
    player1.x = player1.x + 5
  
  }
  if(keyDown(LEFT_ARROW)){
   // player1.velocityX = -5;
    player1.x = player1.x - 5
  }
  if(keyDown(UP_ARROW)){
   // player1.velocityY = -5;
    player1.y = player1.y - 5
  }
  if(keyDown(DOWN_ARROW)){
   // player1.velocityY = 5;
    player1.y = player1.y + 5
  }
 if (keyDown("space"))
{
  dragonfire(); 
}
enemies();
for(var i = 0;i<enemyG.length;i ++){
  if(enemyG.get(i).isTouching(fireG)){
    enemyG.get(i).destroy();
    score = score + 1;
  }
}
}
  for(var i = 0;i<enemyG.length;i ++){
    if(enemyG.get(i).isTouching(player1)){
      player1.destroy();
      gameState = "end";
         }
  }  

if(gameState === "end"){
 
 
  enemyG.destroyEach();
  fireG.destroyEach();
  background = createSprite(width/2,height/2,width,height);
  background.addImage(gameOverImg);
  background.scale = 5;
  //background("black");
  
}



  drawSprites();
  textSize(35)
  strokeWeight(5);
  stroke("white");
  fill ("green");
   text("Points: "+score,width/2-80,30)
}

function dragonfire(){
  fire = createSprite(100,100);
  fire.addAnimation("fires",fireimg);
  fire.x = player1.x +70;
  fire.y = player1.y;
  fire.velocityX = 7;
  fire.lifetime = 460;
  fireG.add(fire);
  //fire.visible = true;
}

function enemies(){
  if(frameCount % 30 === 0){

  enemy = createSprite(Math.round(random(100,width)),Math.round(random(0,height)),20,20);
  enemy.velocityX = random(-3,3);
  var rand = Math.round(random(1,4));
  switch(rand){
    case 1: enemy.addAnimation("Dragon1",BlueDragon);
    break;
    case 2: enemy.addAnimation("UpDragon1",updragon);
    break;
    case 3: enemy.addAnimation("DownDragon1",downdragon);
    break;
    case 4: enemy.addAnimation("BlueDragon",BDragon);
    break;
    default:break;
    }
    enemyG.add(enemy);
    enemy.bounceOff(edges);
  }
}
