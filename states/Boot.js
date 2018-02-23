import GameMenu from "./GameMenu"
import Game from "./Game"
import GameOver from "./GameOver"
import Credits from "./Credits"
import Options from "./Options"
import LevelComplete from "./LevelComplete"

class Boot extends Phaser.State {

    init() {
        this.theGame = this.game.state.game
        this.addedStates = false
        this.theGame.load.onLoadStart.add(this.loadStart, this);
        this.theGame.load.onFileComplete.add(this.fileComplete, this);
        this.theGame.load.onLoadComplete.add(this.loadComplete, this);
        
        this.theGame.scale.aspectRatio = 1
        console.log(this.theGame.scale.aspectRatio)
        console.log(this.theGame)
        
    }

    preload() {
        this.theGame.load.tilemap('map2', 'assets/images/tilemap_2.json', null, Phaser.Tilemap.TILED_JSON);
        this.theGame.load.tilemap('map3', 'assets/images/tilemap_3.json', null, Phaser.Tilemap.TILED_JSON);
        this.theGame.load.image('tiles', './assets/images/tilemap.png');
        this.theGame.load.atlas('atlas', 'assets/images/atlas.png', 'assets/images/atlas.json');
        this.theGame.load.image('button_bg', './assets/images/button_background.png');
        this.theGame.load.image('sky', './assets/images/sky.png');
        this.theGame.load.image('ground', './assets/images/platform.png');
        this.theGame.load.image('star', './assets/images/star.png');
        this.theGame.load.spritesheet('dude', './assets/images/dude.png', 32, 48);
        this.theGame.load.spritesheet('resumeButton', './assets/pause_menu/resume_button.png', 32, 32);
        this.theGame.load.spritesheet('pauseButton', './assets/pause_menu/pause_button.png', 32, 32);
        this.theGame.load.image('menu', './assets/images/number-buttons-90x90.png', 270, 180);
        this.theGame.load.bitmapFont('carrier_command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');
        this.theGame.load.bitmapFont('gem', 'assets/fonts/gem.png', 'assets/fonts/gem.xml');
        this.theGame.load.spritesheet('menu_start_button', './assets/main_menu/play_button.png', 128, 32)
        this.theGame.load.image('menu_bg', './assets/main_menu/menu_bg.png')
    }

    create() {

        this.bmpText = this.theGame.add.bitmapText(10, 100, 'gem','LOADING...',34);

        // bmpText.inputEnabled = true;

        // bmpText.input.enableDrag();

        this.addGameStates();
        this.addGameMusic();

        //just leaving this here for later, will come in handy maybe
        //  Register the keys.
	    this.leftKey = this.theGame.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	    this.rightKey = this.theGame.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.spaceKey = this.theGame.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    

        
    }

    update(){

        if(this.addedStates && this.filesLoaded){
            this.theGame.state.start("GameMenu");
            //this.theGame.state.start("Game");
        }

    }

    addGameStates(){
     
        this.theGame.state.add("GameMenu",GameMenu);
        this.theGame.state.add("Game",Game);
        this.theGame.state.add("GameOver",GameOver);
        this.theGame.state.add("Credits",Credits);
        this.theGame.state.add("Options",Options);
        this.theGame.state.add("LevelComplete", LevelComplete)

        this.addedStates = true

    }
    
    addGameMusic(){
        // music = game.add.audio('dangerous');
        // music.loop = true;
        // music.play();
    }

    loadStart() {

        console.log('loading')
    
    }
    
   
    fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
        //http://phaser.io/examples/v2/loader/load-events
        // text.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
        console.log(progress)
    
    }
    
    loadComplete(){
        this.filesLoaded = true
    }
 
}

export default Boot