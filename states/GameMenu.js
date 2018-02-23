import MainMenu from './menus/main/main_menu'

class GameMenu extends Phaser.State {

    init() {
        this.theGame = this.game.state.game
        this.width = this.theGame._width
        this.height = this.theGame._height
    
    }

    create() {

        // this.theGame.add.sprite(0, 0, 'menu_bg')
        // this.button = this.theGame.add.button(this.width/2, this.height/2, "atlas", this.startGame, this, 1, 0, 2);
        // this.button.frameName = "play_button1.png"
        // this.button.x = this.width/2 - (this.button.texture.frame.width/2) 
        // this.button.y = this.height/2 - (this.button.texture.frame.height/2)
        
        this.menu_features = new MainMenu(this)

    }

    update() {
       
        
    }

    render(){
       
    }

    startGame(){
        //console.log('starting game')
        //this.theGame.state.start("Game");
        
    }
 
}

export default GameMenu