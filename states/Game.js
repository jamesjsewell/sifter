class Game extends Phaser.State {

    init() {
        this.theGame = this.game.state.game
        this.w = this.theGame.width
        this.h = this.theGame.height
    
    }

    preload() {

        
    }

    create() {

        this.theTileMap = this.theGame.add.tilemap('testing')
        this.theTileMap.addTilesetImage('tiles');
        this.layer1 = this.theTileMap.createLayer('Tile Layer 1')
        this.layer1.resizeWorld()
        var mapW = this.theTileMap.widthInPixels
        var mapH = this.theTileMap.heightInPixels
        
        this.layer1.fixedToCamera = true
        this.layer1.cameraOffset = {x: this.w/2 - (mapW/2), y: this.h/2 - (mapH/2)}
        this.layer1.anchor.setTo(0,0)
    
        console.log(this.theGame.camera)


    }

    update() {
       
        
    }

    render(){
       
    }
 
}

export default Game