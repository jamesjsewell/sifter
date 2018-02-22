
class Game extends Phaser.State {

    init() {
        this.theGame = this.game.state.game
        this.w = this.theGame.width
        this.h = this.theGame.height
        this.selectedTilesArray = []
        this.selected = false
        this.connectedTiles = []
        this.possibleBranches = []
        this.deadEnds = []
        this.alreadyMatched = []
        this.currentCell = null
        this.cycles = 0
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
            
                // if(tile.properties.type === "connector"){
                //     this.connectors.push(tile)
                // }

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

        console.log(currentCell)
        
        
        var foundMatches = this.testConnections(currentCell, this.alreadyMatched)

        this.cycles = this.cycles + 1

        if(foundMatches && !foundMatches.length){
            
            
            this.deadEnds.push(currentCell)
            
            if(this.alreadyMatched.length <= 1){
                currentCell = this.alreadyMatched[0]
            }
            else{
                currentCell = this.alreadyMatched[this.alreadyMatched.length]
            }
            console.log(currentCell)

            if(this.cycles < 20){
                this.traversePath(currentCell)
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
                    if(!this.deadEnds.includes(foundMatches[i])){
                        currentCell = foundMatches[i]
                        
                        break
                    }
                }  

            }

            if(currentCell){
                console.log(currentCell)
                if(this.cycles < 20){
                    this.traversePath(currentCell)
                }
                else{
                    console.log('cycle limit reached')
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
                    
                    if(!alreadyMatched.includes(above)){
                        matches.push(above)
                        
                    }  
                    
                }
        
            }

            if(belowProps){

                if(belowProps.top === true && theTileProps.bottom === true){
                
                    if(!alreadyMatched.includes(below)){
                        matches.push(below)
                        
                    }      
                    
                }
        
            }

            if(leftProps){

                if(leftProps.right === true && theTileProps.left === true){
                    
                    if(!alreadyMatched.includes(left)){
                        matches.push(left)
            
                    }  

                }

            }

            if(rightProps){
                if(right.properties.type === "destination"){
                    console.log(right)
                }
                console.log(rightProps)
                if(rightProps.left === true && theTileProps.right === true || rightProps.type === "destination"){

                    if(!alreadyMatched.includes(right)){
                        matches.push(right)
                        
                        if(rightProps.type === "destination"){
                            console.log('donne')
                            console.log(right)
                            this.currentCell = null
                            this.alreadyMatched = []
                            this.deadEnds = []
                            this.cycles = 0
                            return
                        }
                    }  
                    
                        
                }

            } 

            return matches
        
        }
    }

    getTileProperties() {

        var x = this.layer1.getTileX(this.theGame.input.activePointer.worldX);
        var y = this.layer1.getTileY(this.theGame.input.activePointer.worldY);
        var tile = this.theTileMap.getTile(x, y, this.layer1);

        if(!this.selectedTilesArray.length && tile && !tile.properties.isBorder){
            
            this.selectedTilesArray[0] = tile
            this.selected = true
        
            this.create_selector(tile.worldX, tile.worldY)
            return
        }
        
        if(this.selected === true && !tile.properties.isBorder){
            if(!tile){
                console.log('drop selection')
            }

            if(tile){
                this.selectedTilesArray[1] = tile
                
                this.swap()

                this.remove_selector()

                return
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

        
        this.checkForRoadStart()
    
       
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


var connected = 0 
        
        

        // for(var y = 0; y < 5; y++){


        //     for(var x = 0; x < 5; x++){
        
        //         var theTile = this.theTileMap.getTile(x, y, 0)
        //         var connectedTile = this.testConnections(theTile)

        //         if(connectedTile){
        //             this.connectedTiles.push(connectedTile)
        //         }
        //     }
        
        // }    
        
        // var xIndexTotal = 0
        // var tilesAlongX = 0
        // //var tilesAlongY = 0
        // for(var xIndex = 1; xIndex < 5; xIndex++){
            
        //     for(var tileIndex in this.connectedTiles){
        //         var tile = this.connectedTiles[tileIndex]
                
        //         if(tile.x === xIndex){
        //             tilesAlongX = tilesAlongX + 1
                    
        //             break;
        //         }

        //     }
            
        // }


        // var tileIndexesY = []
        // for(var tileIndex in this.connectedTiles){
        //     var tile = this.connectedTiles[tileIndex]

        //     tileIndexesY.push(tile.y)

    
        // }

        // var highestTile = Math.min(...tileIndexesY)
        // var lowestTile = Math.max(...tileIndexesY)
        // console.log(highestTile, lowestTile)


        // var tilesConnectedOnY = 0

        // for(var yIndex = highestTile; yIndex <= lowestTile; yIndex++){


        //     for(var xIndex = 1; xIndex <=4; xIndex++){
                
        //         var testTile = this.testConnections(this.theTileMap.getTile(xIndex, yIndex, 0))
              
        //         if(!testTile){
        //             var aboveTile = this.theTileMap.getTileAbove(0, xIndex, yIndex)
        //             var belowTile = this.theTileMap.getTileBelow(0, xIndex, yIndex)

        //             var testAboveTile = this.testConnections(aboveTile)
                   
        //             if(testAboveTile){
        //                 var testAboveTileMultiple = this.testForMultipleConnections(aboveTile)
        //             }

        
        //             var testBelowTile = this.testConnections(belowTile)

        //             if(testBelowTile || testAboveTile){
        //                 var testBelowTileMultiple = this.testForMultipleConnections(belowTile)
        //             }

                    
        //             if(testAboveTileMultiple > 1 || testBelowTileMultiple > 1){
                        
                        
        //             }
        //             else{
        //                 tilesConnectedOnY = tilesConnectedOnY - 1
        //             }
        //         }

        //         if(testTile){
                    
        //             tilesConnectedOnY = tilesConnectedOnY + 1
        //             //break
                    
        //         }
                
        //         //tilesConnectedOnY = tilesConnectedOnY + 1
                    
                
        //     }
        // }
        // console.log(tilesConnectedOnY)
        
        // if(tilesAlongX === 4 && tilesConnectedOnY >= 6){

            
        //     console.log('won')


        // }

        // //find range of y indexes