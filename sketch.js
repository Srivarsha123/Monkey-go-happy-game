var monkey , monkey_running , monkeyStop
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var bg, bgImg
var InviGround
var survivalTime
var score
var gameState = "PLAY"
var PLAY 
var END
var gameover, gameoverImg
var restart, restartImg

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  bgImg = loadImage("bg.jpg");
  
  gameoverImg = loadImage("Game Over button.png")
  
  restartImg = loadImage("Retry button.png")
  
  monkeyStop = loadAnimation("Monkey game.png")
  
}



function setup() {

   bg = createSprite(200, 200, 600, 600)
  bg.addAnimation ("background", bgImg);
  bg.scale = 2.8
  
  
  monkey = createSprite(50, 315, 20, 20)
  monkey.addAnimation("moving", monkey_running)
  monkey.addAnimation("stop", monkeyStop)
  monkey.scale = 0.15
  
  InviGround = createSprite(200, 378, 600, 45 )
  InviGround.visible = false
  
  survivalTime = 0;
  
  score = 0;
  
  FoodGroup = createGroup();
  
  obstacleGroup = createGroup();
  
  restart = createSprite(200, 240, 20, 20)
  restart.addImage("restart", restartImg)
  restart.scale = 0.5
  restart.visible = false
  
  gameover = createSprite(200, 180, 20, 20)
  gameover.addImage("gameover", gameoverImg)
  gameover.scale = 0.5
  gameover.visible = false

}


function food() {
  
   if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.scale = 0.12;
    banana.velocityX = -3;
    banana.lifetime = 200;
    FoodGroup.add(banana);
   }  
}

function rock() {
  
   if (frameCount % 300 === 0) {
    obstacle = createSprite(350,325,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
   }  
}
function reset(){
  gameState = "PLAY";
  score = 0;
  survivalTime = 0;
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  restart.visible = false
  gameover.visible = false
  monkey.changeAnimation("moving", monkey_running)
}

function draw() {
  
  createCanvas(400, 400)
  
  background("blue")
  
  console.log(gameState)
  
  if (gameState === "PLAY"){
    
      bg.velocityX = -2;

      if(bg.x < 0) {
            bg.x = bg.width/2;
      }
    
      survivalTime = survivalTime + Math.round(getFrameRate()/60);

      monkey.collide(InviGround)

      if(keyDown("space")&& monkey.y >= 200) {
            monkey.velocityY = -12;
        }

      monkey.velocityY = monkey.velocityY + 0.8


      if(FoodGroup.isTouching(monkey)){
            FoodGroup.destroyEach();
            score = score+2
      }

      if(obstacleGroup.isTouching(monkey)){
         gameState = "END";
         obstacleGroup.destroyEach();
      }
  }
  
  else if (gameState === "END"){
    gameover.visible = true;
      restart.visible = true;
    bg.velocityX = 0;
      monkey.velocityY = 0
    
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0); 
    
    monkey.changeAnimation("stop", monkeyStop)
    
    if(mousePressedOver(restart)) {
    reset();
    }
  }
  
  
  drawSprites();
  food();
  rock();
  
     fill("black")
  textSize (20)
  text("Survival Time = "+survivalTime, 210, 20)
  
  text("Score = "+score, 10, 20)
  
}