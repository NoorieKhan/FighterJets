class Form{
    constructor(){
       this.input = createInput("Name");
       this.button = createButton('Play');
       this.greeting = createElement('h2');
       this.title = createElement('h2');
       this.intructions = createElement("h2");
       this.reset = createButton("Reset");
    }
    hide() {
        this.greeting.hide();
        this.button.hide();
        this.input.hide();
        this.title.hide();
        this.intructions.hide();
    }
    display() {
        this.title.html("Fighter Jets");
        this.title.position(300, 0);
        this.title.style('font-size', '70px');
        this.title.style('color', 'skyblue');
        this.input.position(400,350);
        this.input.style('width', '200px');
        this.input.style('height', '20px');
        this.input.style('background', 'lavender');
        this.button.position(400,500);
        this.button.style('width', '200px');
        this.button.style('height', '40px');
        this.button.style('background', 'lightpink');
        //this.intructions.html("Rules: You have to defeat the other player. Use arrow keys to move and space bar to shoot. Each player 5 lives. First one to zero lives loses. "); // Add rules later
       // this.intructions.position(300,300); //Change position later
        this.reset.position(1100,75);


        this.button.mousePressed(() => {
            this.input.hide();
            this.button.hide();
            player.name = this.input.value();
            playerCount += 1;
            player.index = playerCount;
            if(player.index === 1){
                player.x = 50;
            }

            if(player.index === 2){
                player.x = 467;
            }
            player.update();
            player.updateCount(playerCount);
            this.greeting.html("Hello" + player.name)
            this.greeting.position(400,250);
            this.greeting.style('color', 'white');
            this.greeting.style('font-size', '100px');
        

        });
        this.reset.mousePressed(() => {
            database.ref('/').update({
                players:null,
                gameState:0,
                playerCount:0
            })
        });

    }
}