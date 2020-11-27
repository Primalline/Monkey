var monkey , monkey_running;
var banana ,bananaImage, stone, stoneImage;
var bananaGroup, stoneGroup;
var score = 0, survivalTime = 0;
var ground, groundImage, invisibleGround;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  groundImage = loadImage("gcgdg.jpg");
  
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,200);
  
  monkey = createSprite(100,170);
  monkey.addAnimation("a", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(500,150);
  ground.addImage("g", groundImage);
  ground.depth = monkey.depth -100;
  ground.scale = 1;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(90,200,5,5);
  invisibleGround.visible = false;

  stoneGroup = new Group();
  bananaGroup = new Group();
}


function draw() {
  background("white");
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(invisibleGround);

  if (bananaGroup.isTouching(monkey)){
    score = score + 1;
    bananaGroup.destroyEach;
  }

  if(score===10){
    monkey.scale = 0.12;
  }

  if(score===20){
    monkey.scale = 0.14;
  }

  if(score===30){
    monkey.scale = 0.16;
    textSize(90);
    fill("black");
    text("YOU WON ",290,150);
  }

  if(monkey.isTouching(stoneGroup)){
    ground.velocityX = 0;
    stoneGroup.setVelocityXEach = (0);
    bananaGroup.setVelocityXEach = (0);
  }
  
  spawnBanana();
  spawnStone();
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Score "+ score,290,20);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival time:" + survivalTime, 290, 40);
  
  drawSprites();
}

function spawnBanana() {

  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120);
    banana.y = Math.round(random(120,190));
    banana.addImage(bananaImage);
    banana.scale = 0.07;
    banana.velocityX = -4;
    banana.lifetime = 200;
    banana.depth = monkey.depth -1;

    bananaGroup.add(banana);
  }
}

function spawnStone() {
  
  if (frameCount % 300 === 0) {
    var stone = createSprite(600,180,40,10);
    stone.addImage(stoneImage);
    stone.scale = 0.1;
    stone.velocityX = -4;
    stone.lifetime = 200;
    stone.depth = monkey.depth -1;

    stoneGroup.add(stone);
  }
  
}