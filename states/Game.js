


class Game extends Phaser.State {

    init() {
        this.theGame = this.game.state.game
        this.w = this.theGame.width
        this.h = this.theGame.height
        this.selectedTilesArray = []
        this.selected = false
    
    }

    preload() {

        
    }

    create() {

        this.theTileMap = this.theGame.add.tilemap('testing')
        this.theTileMap.addTilesetImage('tiles');
        this.layer1 = this.theTileMap.createLayer('base_layer')

        this.theGame.input.onDown.add(this.getTileProperties, this);

        this.theTileMap.forEach((tile)=>{
            
            
            if(tile.x === 0 || tile.x === 7 || tile.y === 0 || tile.y === 7){
                if(tile.properties){
                    tile.properties['isBorder'] = true
                    console.log(tile)
                }
                
            }
            
        
        
        
        
        }, this, 0, 0, 8, 8,0)

        console.log(this.theTileMap)
    

    }

    update() {
       
        
    }

    render(){
       
    }

    getTileProperties() {

        var x = this.layer1.getTileX(this.theGame.input.activePointer.worldX);
        var y = this.layer1.getTileY(this.theGame.input.activePointer.worldY);
        var tile = this.theTileMap.getTile(x, y, this.layer1);

        if(!this.selectedTilesArray.length && tile && !tile.properties.isBorder){
            
            this.selectedTilesArray[0] = tile
            this.selected = true
            return
        }

        if(this.selected === true && !tile.properties.isBorder){
            if(!tile){
                console.log('drop selection')
            }

            if(tile){
                this.selectedTilesArray[1] = tile
                
                this.swap()
            }
        }
        
    
    }

    swap(){
        var tile1 = this.selectedTilesArray[0]
        var tile1Copy = new Phaser.Tile
        
        var tile2 = this.selectedTilesArray[1] 
        var tile2Copy = new Phaser.Tile

        for (var prop in tile2) {
            if (tile2.hasOwnProperty(prop)) {
                tile2Copy[prop] = tile2[prop];
            }
        }

        for (var prop in tile1) {
            if (tile1.hasOwnProperty(prop)) {
                tile1Copy[prop] = tile1[prop];
            }
        }
       
        this.theTileMap.putTile(tile1, tile2Copy.x, tile2Copy.y)
        this.theTileMap.putTile(tile2Copy, tile1Copy.x, tile1Copy.y)
        this.selectedTilesArray = []
        this.selected = false
        
        
       
    }

    

 
}

export default Game