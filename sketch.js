var LEVEL1=3;
var START=2;
var PLAY=1;
var END=0;
var gameState=START;
var score=0;
var bg,bowl,restart;
var cloudsGroup,dropGroup,garbageGroup;

var bgImage,cloudImage,dropImage,bg2Image,canImage;
function preload(){
  bgImage=loadImage("bg.png");
  cloudImage=loadImage("cloud.png");
  dropImage=loadImage("drop.png");
  bowlImage=loadImage("bowl.png");
  bg2Image=loadImage("bg2.png");
  pondImage=loadImage("pond.png")
  canImage=loadImage("can.png");
  waterSound=loadSound("Water-Bloop-2CloseDistance-www.FesliyanStudios.com.mp3");
  canSound=loadSound("zapsplat_household_bathroom_pedal_bin_open_lid_hit_wall_behind.mp3");
  gameOverSound=loadSound("zapsplat_human_male_voice_says_game_over_001_15726.mp3");
}
function setup(){
   bg=createSprite(0,0,400,400);
bg.addImage(bgImage)
bg.scale=2;
bg.x=bg.width/2;
 restart=createSprite(150,350,20,20);
//restart.setAnimation("restart");
restart.visible=false;
restart.scale=0.9;
// bowl=createSprite(50,350,40,30);
//  bowl.scale=0.7
//bowl.addImage(bowlImage)
textSize(20);
textFont("georgia");
 cloudsGroup=createGroup();
 garbageGroup=createGroup();
 dropGroup=createGroup();

//bowl.debug=true;
//bowl.setCollider("rectangle",5,-3,85,45);
}

function draw() {
 background("white");
  if(gameState===PLAY){
     background("white");
    bg.velocityX=-(2+2*frameCount/100);
    bowl.visible=true;
   
     //bowl.addImage(bowlImage)
    bowl.x=mouseX;
    createClouds();
    createGarbage();
    console.log(bg.x);
     if(bg.x<0){
     bg.x=bg.width/2;
  } 
  

  if(dropGroup.isTouching(bowl)){
    score=score+3;
    waterSound.play();
    //playSound("sound://category_accent/puzzle_game_accent_a_01.mp3",false);
    dropGroup.destroyEach();
    
  }
   if(garbageGroup.isTouching(bowl)){
     score=score-3;
     canSound.play();
     //playSound("sound://category_hits/8bit_splat.mp3");
     garbageGroup.destroyEach();
   }
  
    if(score<0){
      gameOverSound.play();
      gameState=END;
    }
    
  }
  
  
  
    
  
    
 
  drawSprites();
  
 if(score>6){
    bg.velocityX=0;
  
   cloudsGroup.setVelocityXEach(1);
      dropGroup.setVelocityYEach(0);
      garbageGroup.setVelocityYEach(0);
    cloudsGroup.destroyEach();
    dropGroup.destroyEach();
    garbageGroup.destroyEach();
      //var bg3=createSprite(200,200,400,400);
      bg.addImage(pondImage);
      restart.visible=true;
      fill("white");
      text("Hurray!!You have successfully\n collected enough water to save the aquatic\n animals. Keep playing and save water\n",20,200);
      bowl.visible=false;
    if(keyDown("space")){
      Arestart();
       gameState=START;
    }
  }
  if(gameState===END){
      bg.velocityX=0;
      cloudsGroup.setVelocityYEach(0);
      dropGroup.setVelocityYEach(0);
      garbageGroup.setVelocityYEach(0);
    cloudsGroup.destroyEach();
    dropGroup.destroyEach();
    garbageGroup.destroyEach();
      bg.addImage(bg2Image)
      fill("yellow")
      text("Sorry!!\n You couldn't save much water\n Now the world is suffering ", 20,200);
      bowl.destroy();
      fill("white");
      text("Press r to restart",92,290);
      
    }
    if(keyDown("r")&&gameState===END){
        Arestart();
     
      }
  if(gameState===START ){
    //bg.setAnimation("bg");
    fill(0);
    text("World is moving towards water scarcity\n we need to harvest\n as much rain water as we can and\n get rid of garbage.\n Let's see if you can collect more of water\n or garbage!!\n Press Space Key to start the game",20,100);
     bowl=createSprite(50,350,40,30);
    bowl.scale=0.7;
    bowl.addImage(bowlImage);
    bowl.visible=false;
    
    if(keyDown("space")){
      gameState=PLAY;
    
    }
 }

  fill(0);
  text("score:"+score,315,20);

  
  
  }

function createClouds(){
  if(World.frameCount%60===0){
    var cloud=createSprite(400,52,30,10);
     cloud.addImage(cloudImage)
    cloud.scale=0.5;
    cloud.velocityX=-(4+2*frameCount/100);
    cloud.y=random(45,65);
    var drops=createSprite(400,52,5,5);
    drops.addImage(dropImage)
    drops.scale=0.3;
    drops.y=cloud.y;
    drops.velocityY=4+2*frameCount/100;
    drops.velocityX=random(-1,-9);
    cloudsGroup.add(cloud);
    dropGroup.add(drops);
    cloud.lifetime=100;
    drops.lifetime=100;
  }
}
function createGarbage(){
  if(frameCount%100===0){
    var garbage=createSprite(random(80,350),30,10,30);
garbage.addImage(canImage)
    garbage.scale=0.1;
    garbage.velocityY=5+2*frameCount/100;
    garbageGroup.add(garbage);
    garbage.lifetime=100;
  }
}
function Arestart(){
  gameState=START;
  bg.addImage(bgImage);
  
  
  cloudsGroup.destroyEach();
  dropGroup.destroyEach();
  garbageGroup.destroyEach();
  score=0;
  
 
}

