

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
        this.level = this.theGame.theLevel

        
    }

    preload() {

        
    }

    create() {
    
        this.theTileMap = this.theGame.add.tilemap('map2')
        this.theTileMap.addTilesetImage('tiles');
        this.layer1 = this.theTileMap.createLayer(this.level)
        this.layer1.exists = true
        this.theTileMap.setLayer(this.layer1)
        this.currentLayerIndex = this.theTileMap.getLayer(this.theTileMap.currentLayer)

        //this.layer2 = this.theTileMap.createLayer(1)
        //this.theTileMap.setLayer(this.layer1)
        this.currentLayerIndex = this.level
        console.log(this.currentLayerIndex)
        
        //this.layer1.resizeWorld();
        // this.theTileMap.setPreventRecalculate(true)
        // this.theTileMap.shuffle(1, 1, 4, 4, this.currentLayerIndex)

        this.theGame.input.onDown.add(this.getTileProperties, this);

        this.theTileMap.forEach((tile)=>{
            
            if(tile.properties){

                if(tile.properties.type === "source"){
                    this.sourceBlock = tile
                    this.firstInChain = this.theTileMap.getTileRight(this.currentLayerIndex, this.sourceBlock.x, this.sourceBlock.y)
                }

                if(tile.properties.type === "destination"){
                    this.destinationBlock = tile
                }

            }
        
        
        }, this, 0, 0, 6, 6,this.currentLayerIndex)
        
        this.selector = this.theGame.add.sprite(0, 0, 'atlas', this.currentLayerIndex);
        this.selector.frameName = "selector.png"
        this.selector.visible = false

        this.marker = this.theGame.add.sprite(0, 0, 'atlas', this.currentLayerIndex)
        this.marker.frameName = "marker.png"
        this.marker.anchor.setTo(0)
        this.theGame.input.addMoveCallback(this.updateMarker, this);

 
        this.startTime = new Date();
        this.totalTime = 120;
        this.timeElapsed = 0;
    
        this.createTimer();
    
        this.gameTimer = this.theGame.time.events.loop(100, ()=>{this.updateTimer()} );

        this.backButton = this.theGame.add.button(0, 0, "atlas", this.openMenu, this, 'menu_button2.png', 'menu_button1.png');
        this.backButton.anchor.setTo(0.5)
        this.backButton.alignIn(this.theGame.camera.view, Phaser.TOP_LEFT)
        this.backButton.bringToTop()

        this.truck = this.theGame.add.sprite(this.sourceBlock.worldX, this.sourceBlock.worldY, 'environment', this.currentLayerIndex);
        this.truck.frameName = "truck1.png"

        this.truck.animations.add('truck');
        this.truck.animations.play('truck', 30, true);
      
    


    }

    update() {

        
    }

    render(){
       
    }

    checkForRoadStart(){
    
        var startCell = this.theTileMap.getTileRight(this.currentLayerIndex, this.sourceBlock.x, this.sourceBlock.y)
       
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

        if(currentCell){
            if(currentCell.worldY && currentCell.worldX){

                if(currentCell.properties && currentCell.properties.type === "connector"){
                    this.truck.x = currentCell.worldX
                    this.truck.y = currentCell.worldY
                }
            }
            
        }
        

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


                    
            var above = this.theTileMap.getTileAbove(this.currentLayerIndex, theTile.x, theTile.y)
            var below = this.theTileMap.getTileBelow(this.currentLayerIndex, theTile.x, theTile.y)
            var left = this.theTileMap.getTileLeft(this.currentLayerIndex, theTile.x, theTile.y)
            var right = this.theTileMap.getTileRight(this.currentLayerIndex, theTile.x, theTile.y)

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
                console.log(rightProps)
                if(rightProps.left === true && theTileProps.right === true){

                    if(!alreadyMatched.includes(right) && !this.deadEnds.includes(right)){
                        
                        
                        
                        matches.push(right)
                        
                        if(rightProps.type === "destination"){
                            console.log('donne')
                            this.truck.x = this.destinationBlock.worldX
                            this.truck.y = this.destinationBlock.worldY
                            this.currentCell = null
                            this.alreadyMatched = []
                            
                            this.cycles = 0
                            this.done = true

                            //this.level = this.level + 1
                            
                            //this.change_level()
                            
                            this.levelComplete()
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
        var tile = this.theTileMap.getTile(x, y);

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
        var tile1Copy = new Phaser.Tile(this.currentLayerIndex)
        
        var tile2 = this.selectedTilesArray[1] 
        var tile2Copy = new Phaser.Tile(this.currentLayerIndex)

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

    
        if(performSwap){
            
            this.theTileMap.putTile(tile1, tile2Copy.x, tile2Copy.y, this.currentLayerIndex)
            this.theTileMap.putTile(tile2Copy, tile1Copy.x, tile1Copy.y, this.currentLayerIndex)
            this.selectedTilesArray = []
            this.selected = false

            this.done = false
            this.checkForRoadStart()

        }

    } 

    create_selector(x, y){

        if(this.selector && x && y){
            this.selector.bringToTop()
            this.selector.z = 20
            this.selector.x = x
            this.selector.y = y
            this.selector.visible = true
        }

        else{
            
        }
           
        
        
    }
    
    remove_selector(){
        this.selector.visible = false
    }

    change_level(){

        this.layer1.destroy()

        this.layer1 = this.theTileMap.createLayer(this.level)
    
        this.layer1.exists = true
        this.theTileMap.setLayer(this.layer1)
        this.currentLayerIndex = this.theTileMap.getLayer(this.theTileMap.currentLayer)
        this.selector.bringToTop()

        this.selectedTilesArray = []
        this.selected = false
        this.deadEnds = []
        this.alreadyMatched = []
        this.currentCell = null
        this.cycles = 0
        this.done = false
    

        this.theTileMap.forEach((tile)=>{
            
            if(tile.properties){

                if(tile.properties.type === "source"){
                    this.sourceBlock = tile
                    this.firstInChain = this.theTileMap.getTileRight(this.currentLayerIndex, this.sourceBlock.x, this.sourceBlock.y)
                }

                if(tile.properties.type === "destination"){
                    this.destinationBlock = tile
                }

            }
        
        
        }, this, 0, 0, 6, 6, this.currentLayerIndex)

        console.log(this.sourceBlock)
    }

    updateMarker() {

        this.marker.x = this.layer1.getTileX(this.theGame.input.activePointer.worldX) * 64;
        this.marker.y = this.layer1.getTileY(this.theGame.input.activePointer.worldY) * 64;
    
    }

    createTimer(){
        
        this.timeLabel = this.theGame.add.bitmapText(10, 100, 'gem','00:00',18);
        this.timeLabel.alignIn(this.theGame.camera.view, Phaser.TOP_RIGHT)
        this.timeLabel.anchor.setTo(0.5, 0);
        this.timeLabel.align = 'center';
        
     
    }

    updateTimer(){
 
        var currentTime = new Date();
        var timeDifference = this.startTime.getTime() - currentTime.getTime();
     
        //Time elapsed in seconds
        this.timeElapsed = Math.abs(timeDifference / 1000);
     
        //Time remaining in seconds
        var timeRemaining = this.timeElapsed
     
        //Convert seconds into minutes and seconds
        var minutes = Math.floor(timeRemaining / 60);
        var seconds = Math.floor(timeRemaining) - (60 * minutes);
     
        //Display minutes, add a 0 to the start if less than 10
        var result = (minutes < 10) ? "0" + minutes : minutes;
     
        //Display seconds, add a 0 to the start if less than 10
        result += (seconds < 10) ? ":0" + seconds : ":" + seconds;
     
        this.timeLabel.text = result;
        this.theGame.score = result
     
    }

    openMenu(){
        this.theGame.state.start("GameMenu")
    }

    levelComplete(){
     
        this.theGame.time.events.add(Phaser.Timer.SECOND, ()=>{this.theGame.state.start("LevelComplete")}, this);
    }
 
}

export default Game



        
