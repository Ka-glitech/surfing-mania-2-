class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    surfer1 = createSprite(100,200);
    surfer1.addImage(surfer1Img);
    surfer2 = createSprite(300,200);
    surfer2.addImage(surfer1Img);
    // car3 = createSprite(500,200);
    // car3.addImage("car3",car3_img);
    // car4 = createSprite(700,200);
    // car4.addImage("car4",car4_img);
    surfers = [surfer1, surfer2];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getsurfersAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(backgroundImage, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        x = x + allPlayers[plr].lr+150;
        surfers[index-1].x = x; 
        surfers[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          surfers[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = surfers[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
      player.rank +=1
      Player.updatesurfersAtEnd(player.rank)
    }
   
    drawSprites();
  }
 
  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
