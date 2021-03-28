class Game{
    constructor(){
        
    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    updateWinner(winner) {
        database.ref('/').update({
            winner: winner
        });
    }
    getWinner() {
        var gameStateRef = database.ref('winner');
        gameStateRef.on("value", function (data) {
            winner = data.val();
        })

    }
  
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                   
                }
                form = new Form()
                form.display();
            }
    redJet = createSprite(200,500);
    redJet.addImage("player1",redJetImg);
    
    blueJet = createSprite(800,500);
    blueJet.addImage("player2",blueJetImg );
    players=[redJet,blueJet];

    redbulletGroup = new Group();
    bluebulletGroup = new Group();

        }
    
    play(){
        
        form.hide();
        player.getPos();
        Player.getPlayerInfo();
       
        image(back_img, 0, 0, 1000, 800);
 
        var index =0;
       
          if(keyDown(UP_ARROW)&& player.index != null) {//Move Up
            if(player.index === 1){
                players[0].setSpeedAndDirection(2, player.angle-90);
                player.updatePos(players[0].x,players[0].y,player.angle);
                player.getPos();
            }
            if(player.index === 2){
                players[1].setSpeedAndDirection(2, player.angle-90);
                player.updatePos(players[1].x,players[1].y,player.angle);
                player.getPos();
            }

        }

        if(keyWentUp(UP_ARROW)&& player.index != null){
            if(player.index === 1){
                players[0].velocityX = 0;
                players[0].velocityY = 0;
            }
            if(player.index === 2){
                players[1].velocityX = 0;
                players[1].velocityY = 0;
            }
        }
           
           if(keyDown(LEFT_ARROW)&& player.index != null) {//Move Left
            if(player.index === 1){
            player.angle -= 1;
            players[0].rotation = player.angle;
            player.updatePos(players[0].x,players[0].y,player.angle);
            player.getPos();
            }
            if(player.index === 2){
                player.angle -= 1;
            players[1].rotation = player.angle;
            player.updatePos(players[1].x,players[1].y,player.angle);
                player.getPos();
           
        }
    }
            if(keyDown(RIGHT_ARROW)&& player.index != null) {//Move Right
                if(player.index === 1){
                    player.angle += 1;
                    players[0].rotation = player.angle;
                    player.updatePos(players[0].x,players[0].y,player.angle);
                player.getPos();
                    }
                    if(player.index === 2){
                        player.angle += 1;
                    players[1].rotation = player.angle;
                    player.updatePos(players[1].x,players[1].y,player.angle);
                player.getPos();
                }
            }
    
            Player.getBulletInfo2();
            this.shoot2()   
            Player.getBulletInfo1();
            this.shoot1()
                
        
           
            
            if(keyWentDown("space")){
                if(player.index===1){
                    this.spawnRedBullet();
                    flag1=true;
                                            
                } else if (player.index===2){
                    
                
            flag2=true
                    this.spawnBlueBullet();
                 
                }
               
                
                
               
            }
           
           
               
           
               
                
            
              
                
            
            if(allPlayers !== undefined){
                var index = 0
                
          
            for(var plr in allPlayers){
                index = index + 1
               players[index - 1].x = allPlayers[plr].x
                players[index - 1].y = allPlayers[plr].y;
                players[index-1].rotation = allPlayers[plr].angle;
                if (plr === "player" + player.index){
                  fill("red")
                  
                 
                }else{fill("black")}
                textSize(15);
                text(allPlayers[plr].name , players[index - 1].x-20,players[index - 1].y+70)
              }
            }
            drawSprites();
            
           
           
            if(bluebulletGroup.isTouching(redJet)){
                winner="BLUE";
                gameState=2;
                }
               if(redbulletGroup.isTouching(blueJet)){
                   winner="RED";
                   gameState=2;
               }
             //Try to detect colloison between plane and  bullet
            // if(bulletGroup.isTouching(the oppsoite jet)){
            // score for current player will increase
            // look at fruit catcher game to help
    }
    
    
    end(){
       console.log("Game Ended");
       textSize(40);
       fill("black")
       text(winner + " WINS!!!!", 100,100)
    }
    spawnRedBullet(){
        var bullet = createSprite(player.x,player.y);
        bullet.addImage(redBulletImg);
        bullet.x = player.x;
        bullet.y = player.y;
        bullet.scale= 0.5;
        bullet.rotation = player.angle;
        bullet.setSpeedAndDirection(2, player.angle-90);
        player.updateBullet(bullet.x,bullet.y,bullet.rotation);
        player.count +=1
        bullet.lifetime=200;
        redbulletGroup.add(bullet)
    }

    spawnBlueBullet(){
        var bullet = createSprite(player.x,player.y);
        bullet.addImage(blueBulletImg);
        bullet.x = player.x;
        bullet.y = player.y;
        bullet.scale= 0.5;
        bullet.rotation = player.angle;
        bullet.setSpeedAndDirection(2, player.angle-90);
        bullet.lifetime=200;
     
        player.updateBullet(bullet.x,bullet.y,bullet.rotation);
        player.count +=1
        bluebulletGroup.add(bullet);
        //player.getBullet();
    }

shoot1(){
    if(allBullets1 !== undefined && player.index===2 && frameCount%10===0){
                    
        for(var bcount in allBullets1){
           
            var bullet = createSprite(0,0,10,10);
                 bullet.x = allBullets1[bcount].Bx
                bullet.y=allBullets1[bcount].By
                bullet.addImage(redBulletImg)
                bullet.scale= 0.5;
                bullet.rotation = allBullets1[bcount].Bangle;
                bullet.setSpeedAndDirection(2, allBullets1[bcount].Bangle-90);
                bullet.lifetime=200;
                Player.destroyBullet1(bcount)
                redbulletGroup.add(bullet) 
        }

        for(var i=0;i<bluebulletGroup.length;i++){
            if(bluebulletGroup.isTouching(redbulletGroup)){
                bluebulletGroup.get(i).destroy()
                redbulletGroup.destroyEach();
            }
        }
    }
        
}
shoot2(){
    if(allBullets2 !== undefined && player.index===1 && frameCount%10===0){
                  
        for(var bcount in allBullets2){
            var bullet = createSprite(0,0,10,10);
               
               bullet.x = allBullets2[bcount].Bx
               bullet.y=allBullets2[bcount].By
                bullet.addImage(blueBulletImg)
                bullet.scale= 0.5;
                bullet.rotation = allBullets2[bcount].Bangle;
                //bullet.tint="rgba(255, 255, 255, 0.1)"
                bullet.setSpeedAndDirection(2, allBullets2[bcount].Bangle-90);
              
                //allBullets2.shift();
                bullet.lifetime=200;
                Player.destroyBullet2(bcount)
                bluebulletGroup.add(bullet);  
                  
        }
       
    }
     for(var i=0;i<redbulletGroup.length;i++){
                if(redbulletGroup.isTouching(bluebulletGroup)){
                    redbulletGroup.get(i).destroy();
                    bluebulletGroup.destroyEach()
                }
            }

    }
    
}