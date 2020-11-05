var trex ,trex_running, trex_collided;
var ground, groundImage;
var invisibleground;
var cloud, cloudimage, cloudgroup;
var obstacle, obstacle1 ,obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstaclegroup;
var jumpsound, diesound, checksound;
var restart, restartimage, gameover, gameoverimage;
var score =0;

var PLAY = 1;
var END = 0;
var gamestate = PLAY;

function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png")
  groundImage = loadImage("ground2.png");
  cloudimage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  jumpsound = loadSound("jump.mp3");
  diesound = loadSound("die.mp3");
  checksound = loadSound("checkPoint.mp3");
  
  restartimage = loadImage("restart.png");
  gameoverimage = loadImage("gameOver.png");
}

function setup(){
  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  trex.debug = false;
  trex.setCollider("circle",0,0,50);
  
  ground = createSprite(300,160,600,20);
  ground.addImage("ground",groundImage);
  
  invisibleground = createSprite(300,180,600,20);
  invisibleground.visible = false;
  
  restart = createSprite(300,100);
  restart.addImage(restartimage);
  restart.scale = 0.5;
  
  gameover = createSprite(300,50);
  gameover.addImage(gameoverimage);
  gameover.scale = 0.8;
  
  cloudgroup = new Group();
  
  obstaclegroup = new Group();
  
}

function draw(){
  background("lightblue");
  
  var message = 'hi i am jayant';
  console.log(message);
  
  if(gamestate === PLAY)
    {
      ground.velocityX = -(5 + Math.round(score/100));
      
      score = score + Math.round(getFrameRate()/60);
      
      if(keyDown("space") && trex.y > 130)
      {
        trex.velocityY = -8;
        jumpsound.play();
      }
  
      trex.velocityY = trex.velocityY + 0.5;
      if(ground.x < 0)
      {
        ground.x = ground.width/2;
      }
      
      spawnclouds();
  
      spawnobstacles();
      
      if(obstaclegroup.isTouching(trex))
         {
           gamestate = END;
           diesound.play();
         }
      
      if(score % 100 === 0 && score > 0)
      {
        checksound.play();
      } 
      
      restart.visible = false;
      gameover.visible = false;
  }
  else 
  if(gamestate === END)
    {
      ground.velocityX = 0;
      trex.changeAnimation("collided",trex_collided);
      trex.velocityY = 0;
      obstaclegroup.setVelocityXEach(0);
      obstaclegroup.setLifetimeEach(-1);
      
      cloudgroup.setVelocityXEach(0);
      cloudgroup.setLifetimeEach(-1);
      
      restart.visible = true;
      gameover.visible = true;
      
      if(mousePressedOver(restart))
      {
        reset();
      }  
    }
      
  text("SCORE = " + score, 500,20);
  
  //console.log(getFrameRate());
  
  trex.collide(invisibleground);
  
  drawSprites();
}

function spawnclouds()
{
  if(frameCount % 60 === 0)
    {
      cloud = createSprite(600,50,10,10);
      cloud.velocityX = -(5 + Math.round(score/100));
      cloud.addImage(cloudimage);
      cloud.scale = 0.5;
      cloud.y = Math.round(random(0,100));
      cloud.lifetime = 120;
      
      trex.depth = cloud.depth;
      trex.depth = trex.depth + 1;
      
      cloudgroup.add(cloud);
    }
}
  
function spawnobstacles()
  {
    if(frameCount % 60 === 0)
      {
        obstacle = createSprite(600,150);
        obstacle.velocityX = -(5 + Math.round(score/100));
        var rand = Math.round(random(1,6));
        
        switch(rand)
          {
            case 1: obstacle.addImage(obstacle1);
                    break; 
            case 2: obstacle.addImage(obstacle2);
                    break; 
            case 3: obstacle.addImage(obstacle3);
                    break; 
            case 4: obstacle.addImage(obstacle4);
                    break; 
            case 5: obstacle.addImage(obstacle5);
                    break; 
            case 6: obstacle.addImage(obstacle6);
                    break; 
            default: break;        
          }
         obstacle.scale = 0.5;
         obstacle.lifetime = 130;
         obstaclegroup.add(obstacle); 
      }
  }
  
function reset()
{
  restart.visible = false;
  gameover.visible = false;
  obstaclegroup.destroyEach();
  cloudgroup.destroyEach();
        
  trex.changeAnimation("running", trex_running);
        
  gamestate = PLAY;
        
  score = 0;  
}
