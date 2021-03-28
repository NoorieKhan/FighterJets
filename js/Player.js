class Player {
    constructor() {
        this.index = null;
        this.name = null;
        this.score =0;
        this.bulletGroup = createGroup();
        this.angle = 0;
        this.x = 0;
        this.y = displayHeight/2;
        this.Bx =0;
        this.By =0;
        this.Bangle =0;
        this.count=0;
        
    }

    getCount() {
        var playerCountRef = database.ref('playerCount');
        playerCountRef.on("value", (data) => {
            playerCount = data.val();
        })
    }

    updateCount(count) {
        database.ref('/').update({
            playerCount: count
        });
    }

    update() {
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).set({
            name: this.name,
            score:this.score,
            x:this.x,
            y:this.y,
            angle:this.angle
        });
    }
    
    updatePos(a,b,c){
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).update({
            x:a,
            y:b,
            angle:c
        }) 
        this.x = a;
        this.y = b;
    }

    getPos(){
        var playerPosRef = database.ref('players/player'+this.index);
        playerPosRef.on("value", (data) => {
            this.x = data.val().x;
            this.y = data.val().y;
            this.angle = data.val().angle;
            
        })
    }

    static getPlayerInfo() {
        var playerInfoRef = database.ref('players');
        playerInfoRef.on("value", (data) => {
            allPlayers = data.val();
        })
    }

    updateBullet(a,b,c){
        var playerIndex = "players/player" + this.index+"/Bullets/"+this.count;
        database.ref(playerIndex).set({
            Bx:a,
            By:b,
            Bangle:c
        }) 
        this.Bx = a;
        this.By = b;
        this.Bangle = c;
    }

    static destroyBullet1(cnt){
       
        database.ref("players/player1/Bullets/"+cnt).update({
            Bx:null,
            By:null,
            Bangle:null
            
        })
    }
    static destroyBullet2(cnt){
      
        database.ref("players/player2/Bullets/"+cnt).update({
            Bx:null,
            By:null,
            Bangle:null
           
        })
    }
    
    static getBulletInfo1() {
        var playerInfoRef = database.ref('players/player1');
        playerInfoRef.on("value", (data) => {
            allBullets1 = data.val().Bullets;
        })
    }
    static getBulletInfo2() {
        var playerInfoRef = database.ref('players/player2');
        playerInfoRef.on("value", (data) => {
            allBullets2 = data.val().Bullets;
        })
    }
}