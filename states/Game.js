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
        this.layer1 = this.theTileMap.createLayer('base_layer')
        //this.layer1.resizeWorld()
        var mapW = this.theTileMap.widthInPixels
        var mapH = this.theTileMap.heightInPixels
        
        this.theGame.input.onDown.add(this.getTileProperties, this);

        console.log(this.theTileMap)
    

    }

    update() {
       
        
    }

    render(){
       
    }

    swap(){
        //this.theTileMap.swap(5, 2);
    }

    getTileProperties() {

        var x = this.layer1.getTileX(this.theGame.input.activePointer.worldX);
        console.log(x)
        var y = this.layer1.getTileY(this.theGame.input.activePointer.worldY);
        var tile = this.theTileMap.getTile(x, y, this.layer1);
        console.log(tile)
        // Note: JSON.stringify will convert the object tile properties to a string
        //currentDataString = JSON.stringify( tile.properties );
        //tile.properties.wibble = true;
        console.log(x, y)
    
    }

    

 
}

export default Game