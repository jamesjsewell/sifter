class MainMenu{

    constructor(context){
        this.context = context
        this.theGame = this.context.theGame
        this.width = this.theGame._width
        this.height = this.theGame._height
        this.create_main_menu()
    }

    create_main_menu(){
        console.log('the gamme', this.theGame)
        console.log('creating main menu')
        this.theGame.add.sprite(0, 0, 'menu_bg')
        this.button = this.theGame.add.button(this.width/2, this.height/2, "atlas", this.startGame, this, 1, 0, 2);
        this.button.frameName = "play_button1.png"
        this.button.x = this.width/2 - (this.button.texture.frame.width/2) 
        this.button.y = this.height/2 - (this.button.texture.frame.height/2)
        
        //this.menu_features = new MainMenu(this)
    }

    startGame(){
        //console.log('starting game')
        this.theGame.state.start("Game");
        
    }

}

export default MainMenu