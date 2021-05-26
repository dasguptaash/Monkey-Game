var monkey,monkeyImg1,monkeyImg2;
var ground,groundImg;
var invisibleGround;
var banana,bananaImg;
var stone,stoneImg;
var bananaGrp,stoneGrp;
var bg;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  monkeyImg1 = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png");
  
  monkeyImg2 = loadImage("Monkey_10.png");
  bananaImg = loadImage("banana.png");
  stoneImg = loadImage("stone.png");
  bg = loadImage("jungle.jpg");              
}

function setup() {
  createCanvas(1200, 600);
  
  monkey = createSprite(50,450);
  monkey.addAnimation("monkey", monkeyImg1);
  monkey.scale = 0.05;
  
  ground = createSprite(300,500,1300,40);
  ground.velocityX = -2;
  
  bananaGrp = new Group();
  stoneGrp = new Group();
}

function draw() {
  background(bg);
  ground.visible = false;
  
  if(gameState === PLAY){
    
    score = score + Math.round(getFrameRate()/60);
    
     ground.velocityX = -(4+score*2/100);
    
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    spawnBanana();
    spawnStone();
  
  if(monkey.isTouching(bananaGrp)){
    score = score + 1;
    bananaGrp.destroyEach();
  }
  
  if(monkey.isTouching(stoneGrp)){
    gameState = END;
  }
    
    
  if(gameState === END){
    ground.velocityX = 0;
    monkey.y = 240;
    monkey.changeAnimation("collide",monkeyImg2);
    
    bananaGrp.setVelocityEach(0);
    stoneGrp.setVelocityEach(0);
    
    fill("red");
    textSize(30);
    text("Game Over", 200,200);
    fill("black");
    textSize(10);
    text("Press space to restart",200,230);
    
    if(keyDown("space")){
      restart();
    }
        
  }
  }
  
}

function spawnBanana(){
  if(frameCount % 100 === 0){
    banana = createSprite(300,100);
    banana.addImage(bananaImg);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*2/100);           
    banana.lifetime = 220;
    bananaGrp.add(banana);
  }
}

function spawnStone(){
  if (frameCount%200 === 0){
    stone = createSprite(300,300);
    stone.addImage(stoneImg);
    stone.scale = 0.7 ;
    stone.velocityX = -(4+score*2/100);
    stone.lifetime = 220;
    stoneGrp.add(stone);
  }
}

function restart(){
    monkey.changeAnimation("monkey",monkeyImg1);
    score = 0;
    gameState = PLAY;
}