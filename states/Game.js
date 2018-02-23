
class Game extends Phaser.State {

    init() {
        this.theGame = this.game.state.game
        this.w = this.theGame.width
        this.h = this.theGame.height
        this.selectedTilesArray = []
        this.selected = false
        this.deadEnds = []
        this.alreadyMatched = []
        this.currentCell = null
        this.cycles = 0
        this.done = false
    }

    preload() {

        
    }

    create() {

        this.theTileMap = this.theGame.add.tilemap('testing')
        this.theTileMap.addTilesetImage('tiles');
        this.layer1 = this.theTileMap.createLayer('base_layer')

        this.theGame.input.onDown.add(this.getTileProperties, this);

        this.theTileMap.forEach((tile)=>{
            
            if(tile.properties){

                if(tile.properties.type === "source"){
                    this.sourceBlock = tile
                    this.firstInChain = this.theTileMap.getTileRight(0, this.sourceBlock.x, this.sourceBlock.y)
                }

                if(tile.properties.type === "destination"){
                    this.destinationBlock = tile
                }

            }
        
        
        }, this, 0, 0, 8, 8,0)


        this.checkForRoadStart()

    }

    update() {

        
    }

    render(){
       
    }

    checkForRoadStart(){
        var startCell = this.theTileMap.getTileRight(0, this.sourceBlock.x, this.sourceBlock.y)
        if(startCell){
            if(startCell.properties.left === true){
                this.currentCell = null
                this.alreadyMatched = []
                this.deadEnds = []
                this.alreadyMatched[0] = startCell
                this.cycles = 0
                this.traversePath(startCell)
            
            }
        }
    }

    traversePath(currentCell){

        if(this.done === false){
                
            var foundMatches = this.testConnections(currentCell, this.alreadyMatched)

            if(this.done === true){

                return
            }
            
            this.cycles = this.cycles + 1

            var foundMatches = this.testConnections(currentCell, this.alreadyMatched)
            
            if(!foundMatches){
             
                
                if(!this.deadEnds.includes(currentCell)){
                    
                    if(currentCell){
                        this.deadEnds.push(currentCell)
                    }
                    
                }
                else{
                    
                }
                

                if(this.cycles < 20){

                    if(this.alreadyMatched.length){
                        currentCell = this.alreadyMatched[this.alreadyMatched.length]
                        this.traversePath(currentCell)
                    }
                    
                }
                else{
                    console.log('cycle limit reached, dead end')              
                
                }
                
            }
            else{
            
                this.alreadyMatched.push(currentCell)
                currentCell = null

                if(foundMatches && foundMatches.length){

                    for(var i = 0; i <= foundMatches.length; i++){

                        if(foundMatches[i]){
                            currentCell = foundMatches[i]
                        }
                    }  

                }

                if(currentCell){
                   
                    if(this.cycles < 20){
                        this.traversePath(currentCell)
                    }
                    else{
                        console.log('cycle limit reached')
                    }
                    
                }
            
            }
        }
    
    }

    testConnections(theTile, alreadyMatched){

        var matches = []

        if(theTile && theTile.properties){
                    
            var above = this.theTileMap.getTileAbove(0, theTile.x, theTile.y)
            var below = this.theTileMap.getTileBelow(0, theTile.x, theTile.y)
            var left = this.theTileMap.getTileLeft(0, theTile.x, theTile.y)
            var right = this.theTileMap.getTileRight(0, theTile.x, theTile.y)

            var theTileProps = theTile.properties

            if(above){
                var aboveProps = above.properties
            }

            if(below){
                var belowProps = below.properties
            }

            if(left){
                var leftProps = left.properties
            }
            
            if(right){
                var rightProps = right.properties
            }
                    
            if(aboveProps){
                if(aboveProps.bottom === true && theTileProps.top === true){
                    
                    if(!alreadyMatched.includes(above) && !this.deadEnds.includes(above)){
                        matches.push(above)
                        
                    }  
                    
                }
        
            }

            if(belowProps){

                if(belowProps.top === true && theTileProps.bottom === true){
                
                    if(!alreadyMatched.includes(below) && !this.deadEnds.includes(below)){
                        matches.push(below)
                        
                    }      
                    
                }
        
            }

            if(leftProps){

                if(leftProps.right === true && theTileProps.left === true){
                    
                    if(!alreadyMatched.includes(left) && !this.deadEnds.includes(left)){
                        matches.push(left)
            
                    }  

                }

            }

            if(rightProps){
                
                if(rightProps.left === true && theTileProps.right === true){

                    if(!alreadyMatched.includes(right) && !this.deadEnds.includes(right)){
                        
                        
                        
                        matches.push(right)
                        
                        if(rightProps.type === "destination"){
                            console.log('donne')
                           
                            this.currentCell = null
                            this.alreadyMatched = []
                            
                            this.cycles = 0
                            this.done = true
                            return
                        }
                    }  
                    
                        
                }

            } 
           
            if(matches.length){
                return matches
            }
            else{
                return null
            } 
        
        }
    }

    getTileProperties() {

        var x = this.layer1.getTileX(this.theGame.input.activePointer.worldX);
        var y = this.layer1.getTileY(this.theGame.input.activePointer.worldY);
        var tile = this.theTileMap.getTile(x, y, this.layer1);

        if(!this.selectedTilesArray.length){
            
            if(tile.properties.type === "connector" || tile.properties.type === "blank"){
                this.selectedTilesArray[0] = tile
                this.selected = true
            
                this.create_selector(tile.worldX, tile.worldY)
                return
            }
        }
        
        if(this.selected === true){
            if(!tile){
                console.log('drop selection')
            }

            if(tile){
                
                if(tile.properties.type === "connector" || tile.properties.type === "blank"){
                
                    this.selectedTilesArray[1] = tile
                    
                    this.swap()

                    this.remove_selector()

                    return
                }
            }
        }
        
    
    }

    swap(){
        var tile1 = this.selectedTilesArray[0]
        var tile1Copy = new Phaser.Tile
        
        var tile2 = this.selectedTilesArray[1] 
        var tile2Copy = new Phaser.Tile

        var performSwap = true

        

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

        
        console.log(tile1Copy.properties.type, tile2Copy.properties.type)
        if(performSwap){

            this.theTileMap.putTile(tile1, tile2Copy.x, tile2Copy.y)
            this.theTileMap.putTile(tile2Copy, tile1Copy.x, tile1Copy.y)
            this.selectedTilesArray = []
            this.selected = false

            this.done = false
            this.checkForRoadStart()

        }

    } 

    create_selector(x, y){
        if(!this.selector){
            this.selector = this.theGame.add.sprite(x, y, 'atlas');
            this.selector.frameName = "selector.png"
        }
        else{
            this.selector.x = x
            this.selector.y = y
            this.selector.visible = true
        }
           
        
        
    }
    
    remove_selector(){
        this.selector.visible = false
    }
 
}

export default Game



        
