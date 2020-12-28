const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var particles;
var plinkos = [];
var divisions =[];
var particle;
var part = [];
var divisionHeight=300;
var score =0;
var count = 0;
var gameState ="start";

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
    ground = new Ground(400,790,800,20);

   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }
    for (var j = 20; j <=width; j=j+50) {
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) {
        plinkos.push(new Plinko(j,175));
    }

    for (var j = 20; j <=width; j=j+50) {
        plinkos.push(new Plinko(j,275));
    }

    for (var j = 50; j <=width-10; j=j+50) {
        plinkos.push(new Plinko(j,375));
    }
    
}
 
function draw() {
  background("black");
  textSize(18)
  text("Score : "+score + "/3000",20,40);
  fill("white");
  
  textSize(20)
  text(" 600 ", 10, 550);
  text(" 600 ", 90, 550);
  text(" 600 ", 170, 550);
  text(" 600 ", 250, 550);
  text(" 300 ", 330, 550);
  text(" 300 ", 410, 550);
  text(" 300 ", 490, 550);
  text(" 500 ", 570, 550);
  text(" 500 ", 650, 550);
  text(" 500 ", 730, 550);

  Engine.update(engine);

  ground.display();
  
  if ( gameState =="end") {
    
    if(score === 3000){
      textSize(30);
      fill("cyan");
      
      text("'GAME OVER AND YOU ARE THE WINNER'",130,450);


      if(frameCount % 5 === 0){
        part.push(new Sprinkle(random(10,800),10,10));
      }

      for(var e = 0;e < part.length; e++){
        part[e].display();
      }

    }
    else{
      textSize(70);
      fill("cyan");
      

      if(frameCount % 5 === 0){
        part.push(new Sprinkle(random(10,800),10,10));
      }

      for(var e = 0;e < part.length; e++){
        part[e].display();
      }

      text("'GAME OVER'", 160, 460);
    }

  }

  

  

  for (var i = 0; i < plinkos.length; i++) {
     plinkos[i].display();  
  }
 
    if(particle!=null)
    {
       particle.display();
        
        if (particle.body.position.y>760)
        {
              if (particle.body.position.x < 300) 
              {
                  score=score+600;      
                  particle=null;
                  if ( count>= 5) gameState ="end";                          
              }


              else if (particle.body.position.x < 600 && particle.body.position.x > 301 ) 
              {
                    score = score + 300;
                    particle=null;
                    if ( count>= 5) gameState ="end";

              }
              else if (particle.body.position.x < 900 && particle.body.position.x > 601 )
              {
                    score = score + 500;
                    particle=null;
                    if ( count>= 5)  gameState ="end";

              }      
              
        }
  
      }

      

   for (var k = 0; k < divisions.length; k++) 
   {
     divisions[k].display();
   }

 
 
}


function mousePressed()
{
  if(gameState!=="end")
  {
      count++;
     particle=new Particle(mouseX, 10, 10, 10); 
  }   
}