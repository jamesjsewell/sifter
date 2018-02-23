
class LevelSelect {

    constructor(context){
        this.context = context
        this.theGame = this.context.theGame
        this.create_level_select()
    }

    create_level_select(){
    
        
        this.lvl_select_bg = this.theGame.add.sprite(0, 0, 'atlas')
      
        this.lvl_select_bg.alignIn(this.theGame.camera.view, Phaser.BOTTOM_CENTER)
        this.level1Button = this.theGame.add.button(this.width/2, this.height/2, "atlas", this.level1, this, 'lvl2.png', 'lvl1.png');
        this.level1Button.anchor.setTo(0.5)
        this.level2Button = this.theGame.add.button(this.width/2, this.height/2, "atlas", this.level2, this, 'lvl4.png', 'lvl3.png');
        this.level2Button.anchor.setTo(-0.8, 0.5)
        this.level3Button = this.theGame.add.button(this.width/2, this.height/2, "atlas", this.level3, this, 'lvl6.png', 'lvl5.png');
        this.level3Button.anchor.setTo(-2.1, 0.5)
        this.level4Button = this.theGame.add.button(this.width/2, this.height/2, "atlas", this.level4, this, 'lvl8.png', 'lvl7.png');
        this.level4Button.anchor.setTo(-3.4, 0.5)
        this.lvl_select_bg.addChild(this.level1Button);
        this.lvl_select_bg.addChild(this.level2Button);
        this.lvl_select_bg.addChild(this.level3Button);
        this.lvl_select_bg.addChild(this.level4Button);
        this.lvl_select_bg.frameName = "level_select_bg.png"



    }

    level1(){
        this.startLevel(0)
    }
    level2(){
        this.startLevel(1)
    }
    level3(){
        this.startLevel(2)
    }
    level4(){
        this.startLevel(3)
    }
    startLevel(lvl){
        console.log(this)
        this.theGame.theLevel = lvl
        this.theGame.state.start("Game")
    }

}

export default LevelSelect