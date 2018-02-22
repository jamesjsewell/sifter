
class Game extends Phaser.State {

    init() {
        this.theGame = this.game.state.game
        this.w = this.theGame.width
        this.h = this.theGame.height
        this.selectedTilesArray = []
        this.selected = false
        this.connectors = []
        this.roadArray = []
        this.checkedSourceConnection = false
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
            
                if(tile.properties.type === "connector"){
                    this.connectors.push(tile)
                }

                if(tile.properties.type === "source"){
                    this.sourceBlock = tile
                    this.firstInChain = this.theTileMap.getTileRight(0, this.sourceBlock.x, this.sourceBlock.y)
                }

                if(tile.properties.type === "destination"){
                    this.destinationBlock = tile
                }

            }
        
        
        }, this, 0, 0, 8, 8,0)

        if(this.sourceBlock && this.theTileMap && !this.checkedSourceConnection){
            
            var startBlock = this.theTileMap.getTileRight( 0, this.sourceBlock.x, this.sourceBlock.y)
            this.roadArray[0] = startBlock
            console.log(startBlock.properties, 'firstBlock')
            var connections = this.findConnections(startBlock)
            
            console.log(this.roadArray)
        
        
        }

        this.roadArray = []

    
    

    }

    update() {


        
        

        // var startBlock = null
        // var roadSections = []
        // var connected = false

        // if(this.sourceBlock && this.theTileMap){
        //     //console.log(0, this.sourceBlock.x, this.sourceBlock.y)
        //     startBlock = this.theTileMap.getTileRight( 0, this.sourceBlock.x, this.sourceBlock.y)
        // }
        // else{
        //     startBlock = null
        // }
        
        // if(startBlock){

        //     if(startBlock.properties.left === true){
    
        //         roadSections[0] = startBlock
                
        //         var above = this.theTileMap.getTileAbove(0, startBlock.x, startBlock.y)
        //         var below = this.theTileMap.getTileBelow(0, startBlock.x, startBlock.y)
        //         var left = this.theTileMap.getTileLeft(0, startBlock.x, startBlock.y)
        //         var right = this.theTileMap.getTileRight(0, startBlock.x, startBlock.y)

        //         var startBlockProps = startBlock.properties
        //         var aboveProps = above.properties
        //         var belowProps = below.properties
        //         var leftProps = left.properties
        //         var rightProps = right.properties

        //         if(aboveProps){
        //             if(aboveProps.bottom === true && startBlockProps.top === true){
                        
        //                 roadSections[1] = above
        //                 
        //             }
        //             else{
                       
        //                 var theIndex = roadSections.indexOf(above)

        //                 if(roadSections.length && theIndex > 0){
        //                     roadSections.splice(theIndex, 1)
        //                 }  
                        
                           
        //             }
        //         }

        //         if(belowProps){
        //             if(belowProps.top === true && startBlockProps.bottom === true){
                
        //                 roadSections.push(below)
        //                 
        //             }
        //             else{
                        
        //                 var theIndex = roadSections.indexOf(above)

        //                 if(roadSections.length && theIndex > 0 && connected === false){
        //                     roadSections.splice(theIndex, 1)
        //                 }    
                            
        //             }
        //         }


        //         if(leftProps){
        //             if(leftProps.right === true && startBlockProps.left === true && connected === false){
        //                 roadSections.push(left)
        //                 
        //             }
        //             else{
                        
        //                 var theIndex = roadSections.indexOf(left)

        //                 if(roadSections.length > 0 && theIndex > 0 && connected === false){
        //                     roadSections.splice(theIndex, 1)
        //                 }
                          
        //             }
        //         }

        //         if(rightProps){
                
        //             if(rightProps.left === true && startBlockProps.right === true){
                        
        //                 roadSections.push(right)
        //                 
                        
        //             }
        //             else{     

        //                 var theIndex = roadSections.indexOf(right)
        //                 if(roadSections.length > 0 && theIndex > 0 && connected === false){
        //                     roadSections.splice(theIndex, 1) 
        //                 }
                             
        //             }
        //         }

                
            
            
        //     }
        //     else{

        //         if(roadSections.length > 0){
        //             roadSections.splice(roadSections.indexOf(startBlock), 1)
        //         }
                
        //     }

        //     console.log(roadSections)
        // } 
        
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
            console.log(tile)
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

        this.roadArray = []
        this.cycles = 0
        this.checkedSourceConnection = false
        var firstBlock = this.theTileMap.getTileRight(0, this.sourceBlock.x, this.sourceBlock.y)
        this.findConnections(firstBlock)
        
        
       
    }

    findConnections(startBlock){
        
        
        var nextBlock = null

        if(startBlock && this.cycles < 12){

            if(startBlock.properties){
                
                var above = this.theTileMap.getTileAbove(0, startBlock.x, startBlock.y)
                var below = this.theTileMap.getTileBelow(0, startBlock.x, startBlock.y)
                var left = this.theTileMap.getTileLeft(0, startBlock.x, startBlock.y)
                var right = this.theTileMap.getTileRight(0, startBlock.x, startBlock.y)

                var startBlockProps = startBlock.properties
                var aboveProps = above.properties
                var belowProps = below.properties
                var leftProps = left.properties
                var rightProps = right.properties
                
                if(aboveProps){
                    if(aboveProps.bottom === true && startBlockProps.top === true){
                        
                        console.log(this.roadArray)
                        if(!this.roadArray.includes(above)){
                          
                            this.roadArray.push(above)
                            
                            nextBlock = above
                        }
                        
                    }
            
                }

                if(belowProps){

                    if(belowProps.top === true && startBlockProps.bottom === true){
                    
                        if(!this.roadArray.includes(below)){
                            
                            nextBlock = below
                        }
                        
                    }
            
                }

                if(leftProps){

                    if(leftProps.right === true && startBlockProps.left === true){
                        
                        if(!this.roadArray.includes(left)){
                            
                            nextBlock = left
                        }  

                    }
    
                }

                if(rightProps){

                    if(startBlock.properties.right === true){
                        if(right.properties.type === "destination"){
                            this.won = true
                            console.log('won')
                            this.roadArray = []
                            this.cycles = 0

                            return
                        }
                    }
                    
                
                    if(rightProps.left === true && startBlockProps.right === true){
                        
                        if(!this.roadArray.includes(right)){
                            this.roadArray.push(right)
                            
                            nextBlock = right
                        }
                             
                    }
    
                }  
            
            }
            
        } 


        console.log('thisBlock: ', startBlock)
        console.log('next startblock', nextBlock)
        //console.log('nextBlock', nextBlock, nextBlock.index)
        this.cycles = this.cycles + 1

        if(!this.checkedSourceConnection){
            this.checkedSourceConnection = true
        }

        console.log('------------')

        if(nextBlock){
        
            this.findConnections(nextBlock)
            
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