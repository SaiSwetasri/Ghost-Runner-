var gameState="play";

var tower,towerImage;
var door,doorImage,doorsGroup;
var climber,climberImage,climbersGroup;
var ghost,ghostImage;
var invisibleBlock, invisibleBlocksGroup;

function preload() {
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage= loadImage("climber.png");
  ghostImage= loadImage("ghost-standing.png");
}
function setup(){
  createCanvas(600,600);
  tower= createSprite(300,300);
  tower.addImage("tower", towerImage);
  tower.velocityY= 1;
  
  ghost= createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImage);
  ghost.scale=0.3;
  
  doorsGroup=new Group();
  climbersGroup= new Group();
  invisibleBlocksGroup= new Group();
}
function draw(){
  background(0);
  if(gameState==="play"){
  if(tower.y>400){
    tower.y=300;
  }
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  if(keyDown("space")){
    ghost.velocityY=-5;
}
  ghost.velocityY=ghost.velocityY+0.8;
  spawnDoors();
    
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  if(invisibleBlocksGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="end";
  }
  
  drawSprites();
  }
  if(gameState==="end"){
  stroke("yellow");
  fill("yellow");
  textSize(30);
  text("GAME OVER",200,200);
  }
}
function spawnDoors(){
  if (frameCount%240===0){
    door = createSprite(200,50);
    climber = createSprite(200,110);
    invisibleBlock = createSprite(200,115,climber.width,2);
    
    
    door.addImage("door",doorImage);
    climber.addImage("climber",climberImage);
    
    door.x= Math.round(random(120,400));
    climber.x=door.x;
    invisibleBlock.x=door.x
    
    door.velocityY=1;
    climber.velocityY=1;
    invisibleBlock.velocityY=1;
        
    door.Lifetime=700;
    climber.Lifetime=700;
    invisibleBlock.Lifetime=700;
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    
    invisibleBlock.debug=true;
    invisibleBlocksGroup.add(invisibleBlock);
    
    ghost.depth= door.depth;
    ghost.depth= ghost.depth+1;

  }
}