//import Scene1 from './states/Scene1.js';
// import Preload from 'states/Preload';
// import GameTitle from 'states/GameTitle';
// import Main from 'states/Main';
// import GameOver from 'states/GameOver';
import Scene1 from './states/Scene1'

class Game extends Phaser.Game {
 
    constructor() {
 
        super({renderer: Phaser.AUTO,
            crisp: true,
            roundPixels: true,
            alignH: true,
            alignV: true,
            scaleH: 1,
            scaleV: 1,
            trimH: 0,
            trimV: 0,
            scaleMode: Phaser.ScaleManager.SHOW_ALL,
            antialias: true });
        
        this.state.add('Scene1', Scene1, false);
        this.state.start('Scene1');
    }
 
}
 
new Game();
    

  




