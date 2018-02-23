import LevelSelect from '../level_select/level_select.js'

class MainMenu{

    constructor(context){
        this.context = context
        this.theGame = this.context.theGame
        this.width = this.theGame._width
        this.height = this.theGame._height
        this.create_main_menu()
    }

    create_main_menu(){

        // this.button = this.theGame.add.button(this.width/2, this.height/2, "atlas", this.startGame, this, 'play_button2.png', 'play_button1.png');
        // this.button.frameName = "play_button1.png"
        // this.button.x = this.width/2 - (this.button.texture.frame.width/2) 
        // this.button.y = this.height/2 - (this.button.texture.frame.height/2)
        
        this.levelSelect = new LevelSelect(this)

        //this.menu_features = new MainMenu(this)
    }

    startGame(){
        //console.log('starting game')
        this.theGame.state.start("Game");
        
    }

}

export default MainMenu