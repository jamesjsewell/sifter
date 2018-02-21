(function () {
'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var GameMenu = function (_Phaser$State) {
    inherits(GameMenu, _Phaser$State);

    function GameMenu() {
        classCallCheck(this, GameMenu);
        return possibleConstructorReturn(this, (GameMenu.__proto__ || Object.getPrototypeOf(GameMenu)).apply(this, arguments));
    }

    createClass(GameMenu, [{
        key: "init",
        value: function init() {
            this.theGame = this.game.state.game;
            this.width = this.theGame._width;
            this.height = this.theGame._height;
        }
    }, {
        key: "create",
        value: function create() {

            this.theGame.add.sprite(0, 0, 'menu_bg');
            this.button = this.theGame.add.button(this.width / 2, this.height / 2, "menu_start_button", this.startGame, this, 1, 0, 2);
            this.button.x = this.width / 2 - this.button.texture.frame.width / 2;
            this.button.y = this.height / 2 - this.button.texture.frame.height / 2;
        }
    }, {
        key: "update",
        value: function update() {}
    }, {
        key: "render",
        value: function render() {}
    }, {
        key: "startGame",
        value: function startGame() {

            this.theGame.state.start("Game");
        }
    }]);
    return GameMenu;
}(Phaser.State);

var Game = function (_Phaser$State) {
    inherits(Game, _Phaser$State);

    function Game() {
        classCallCheck(this, Game);
        return possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).apply(this, arguments));
    }

    createClass(Game, [{
        key: 'init',
        value: function init() {
            this.theGame = this.game.state.game;
            this.w = this.theGame.width;
            this.h = this.theGame.height;
        }
    }, {
        key: 'preload',
        value: function preload() {}
    }, {
        key: 'create',
        value: function create() {

            this.theTileMap = this.theGame.add.tilemap('testing');
            this.theTileMap.addTilesetImage('tiles');
            this.layer1 = this.theTileMap.createLayer('Tile Layer 1');
            this.layer1.resizeWorld();
            var mapW = this.theTileMap.widthInPixels;
            var mapH = this.theTileMap.heightInPixels;

            this.layer1.fixedToCamera = true;
            this.layer1.cameraOffset = { x: this.w / 2 - mapW / 2, y: this.h / 2 - mapH / 2 };
            this.layer1.anchor.setTo(0, 0);

            console.log(this.theGame.camera);
        }
    }, {
        key: 'update',
        value: function update() {}
    }, {
        key: 'render',
        value: function render() {}
    }]);
    return Game;
}(Phaser.State);

var GameOver = function (_Phaser$State) {
    inherits(GameOver, _Phaser$State);

    function GameOver() {
        classCallCheck(this, GameOver);
        return possibleConstructorReturn(this, (GameOver.__proto__ || Object.getPrototypeOf(GameOver)).apply(this, arguments));
    }

    createClass(GameOver, [{
        key: "init",
        value: function init() {}
    }, {
        key: "preload",
        value: function preload() {}
    }, {
        key: "create",
        value: function create() {}
    }, {
        key: "update",
        value: function update() {}
    }, {
        key: "render",
        value: function render() {}
    }]);
    return GameOver;
}(Phaser.State);

var Credits = function (_Phaser$State) {
    inherits(Credits, _Phaser$State);

    function Credits() {
        classCallCheck(this, Credits);
        return possibleConstructorReturn(this, (Credits.__proto__ || Object.getPrototypeOf(Credits)).apply(this, arguments));
    }

    createClass(Credits, [{
        key: 'init',
        value: function init() {
            this.theGame = this.game.state.game;
            this.score = 0;
        }
    }, {
        key: 'preload',
        value: function preload() {}
    }, {
        key: 'create',
        value: function create() {

            this.cursors = this.theGame.input.keyboard.createCursorKeys();

            //  We're going to be using physics, so enable the Arcade Physics system
            this.theGame.physics.startSystem(Phaser.Physics.ARCADE);
            //  A simple background for our this.theGame
            this.theGame.add.sprite(0, 0, 'sky');
            //  The platforms group contains the ground and the 2 ledges we can jump on
            this.platforms = this.theGame.add.group();
            //  We will enable physics for any object that is created in group
            this.platforms.enableBody = true;
            // Here we create the ground.
            this.ground = this.platforms.create(0, this.theGame.world.height - 64, 'ground');
            //  Scale it to fit the width of the this.theGame (the original sprite is 400x32 in size)
            this.ground.scale.setTo(2, 2);
            //  This stops it from falling away when you jump on it
            this.ground.body.immovable = true;
            //  Now let's create two ledges
            this.ledge = this.platforms.create(400, 480, 'ground');
            this.ledge.body.immovable = true;
            this.ledge = this.platforms.create(-100, 440, 'ground');
            this.ledge.body.immovable = true;
            this.ledge = this.platforms.create(200, 400, 'ground');
            this.ledge.scale.setTo(.2, .5);
            this.ledge.body.immovable = true;
            // ready player one
            // The player and its settings
            this.player = this.theGame.add.sprite(32, this.theGame.world.height - 150, 'dude');
            //  We need to enable physics on the player
            this.theGame.physics.arcade.enable(this.player);
            //  Player physics properties. Give the little guy a slight bounce.
            this.player.body.bounce.y = 0.2;
            this.player.body.gravity.y = 900;
            this.player.body.collideWorldBounds = true;
            //  Our two animations, walking left and right.
            this.player.animations.add('left', [0, 1, 2, 3], 10, true);
            this.player.animations.add('right', [5, 6, 7, 8], 10, true);
            //add some stars
            this.stars = this.theGame.add.group();
            this.stars.enableBody = true;

            //  Here we'll create 12 of them evenly spaced apart
            for (var i = 0; i < 12; i++) {
                //  Create a star inside of the 'stars' group
                var star = this.stars.create(i * 70, 0, 'star');
                //  Let gravity do its thing
                star.body.gravity.y = 900;
                //  This just gives each star a slightly random bounce value
                star.body.bounce.y = 0.7 + Math.random() * 0.2;
            }
            //gui
            this.scoreText = this.theGame.add.text(650, 0, "score: 0", { font: "18px Arial", fill: "#ffffff", align: "right" });
            this.scoreText.fixedToCamera = true;
            this.scoreText.cameraOffset.setTo(650, 0);

            //move sprite to cursor
            this.seeker = this.theGame.add.sprite(400, 300, '../assets/images/diamond.png');
            this.seeker.anchor.setTo(0.5, 0.5);

            //  Enable Arcade Physics for the sprite
            this.theGame.physics.enable(this.seeker, Phaser.Physics.ARCADE);

            //  Tell it we don't want physics to manage the rotation
            this.seeker.body.allowRotation = false;

            //pause menu
            this.pause_menu();
        }
    }, {
        key: 'update',
        value: function update() {
            this.theGame.world.setBounds(0, 0, 1920, 1920);
            //  Notice that the sprite doesn't have any momentum at all,
            //  it's all just set by the camera follow type.
            //  0.1 is the amount of linear interpolation to use.
            //  The smaller the value, the smooth the camera (and the longer it takes to catch up)
            this.theGame.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
            //  Collide the player and the stars with the this.platforms
            var hitPlatform = this.theGame.physics.arcade.collide(this.player, this.platforms);
            //  Reset the players velocity (movement)
            this.player.body.velocity.x = 0;
            if (this.cursors.left.isDown) {
                //  Move to the left
                this.player.body.velocity.x = -150;
                this.player.animations.play('left');
            } else if (this.cursors.right.isDown) {
                //  Move to the right
                this.player.body.velocity.x = 150;
                this.player.animations.play('right');
            } else {
                //  Stand still
                this.player.animations.stop();
                this.player.frame = 4;
            }
            //  Allow the player to jump if they are touching the ground.
            if (this.cursors.up.isDown && this.player.body.touching.down && hitPlatform) {
                this.player.body.velocity.y = -350;
            }
            //stars
            this.theGame.physics.arcade.collide(this.stars, this.platforms);
            this.theGame.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);

            //seeker
            this.seeker.rotation = this.theGame.physics.arcade.moveToPointer(this.seeker, 60, this.theGame.input.activePointer, 500);
        }
    }, {
        key: 'render',
        value: function render() {
            var debug = this.theGame.debug;
            debug.scale(20, 20, '#fff');
            debug.phaser(10, 580);
        }
    }, {
        key: 'pause_menu',
        value: function pause_menu() {

            //pause menu
            var w = 800,
                h = 600;

            add_pause_button(this);

            console.log(this.theGame);

            var self = this;

            function paused() {

                // When the paus button is pressed, we pause the this.theGame
                self.theGame.paused = true;
                self.pause_button.destroy();
                // Then add the menu
                self.menu = self.theGame.add.sprite(w / 2, h / 2, 'menu');
                var xPos = self.theGame.camera.x;
                var yPos = self.theGame.camera.y;

                // And a label to illustrate which menu item was chosen. (self is not necessary)
                self.choiceLabel = self.theGame.add.text(w / 2, h - 150, 'Click outside menu to continue', { font: '30px Arial', fill: '#fff' });
                self.menu.x = xPos + w / 2 - 270 / 2;
                self.menu.y = yPos + h / 2 - 180 / 2;

                self.menu.x = self.theGame.camera.x + w / 2 - 270 / 2;
                self.menu.y = self.theGame.camera.y + h / 2 - 180 / 2;

                self.choiceLabel.x = self.menu.x;
                self.choiceLabel.y = self.menu.y + h / 3.5;

                self.resume_button = self.theGame.add.button(self.theGame.world.centerX, self.theGame.world.centerY, 'resumeButton', unpause, self, 1, 0, 2);
                self.resume_button.x = xPos + w / 2 - 32;
                self.resume_button.y = yPos + 20;

                self.theGame.input.onDown.add(menuClick, self);
                // And finally the method that handels the pause menu

                function menuClick(event) {

                    // Only act if paused
                    if (self.theGame.paused) {
                        // Calculate the corners of the menu
                        var x1 = w / 2 - 270 / 2,
                            x2 = w / 2 + 270 / 2,
                            y1 = h / 2 - 180 / 2,
                            y2 = h / 2 + 180 / 2;
                        // Check if the click was inside the menu
                        if (event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2) {
                            // The choicemap is an array that will help us see which item was clicked
                            var choiceMap = ['one', 'two', 'three', 'four', 'five', 'six'];
                            // Get menu local coordinates for the click
                            var x = event.x - x1,
                                y = event.y - y1;
                            // Calculate the choice 
                            var choice = Math.floor(x / 90) + 3 * Math.floor(y / 90);
                            // Display the choice
                            self.choiceLabel.text = 'You chose menu item: ' + choiceMap[choice];
                        }
                    }
                }

                function unpause(event) {

                    self.resume_button.setFrames(0, 1, 2);
                    // Only act if paused
                    if (self.theGame.paused) {

                        // Remove the menu and the label
                        self.menu.destroy();
                        self.choiceLabel.destroy();
                        self.resume_button.destroy();
                        self.theGame.paused = false;
                        add_pause_button(self);
                    }
                }
            }

            function add_pause_button(self) {

                self.pause_button = self.theGame.add.button(self.theGame.world.centerX, self.theGame.world.centerY, 'pauseButton', paused, this, 1, 0, 2);
                self.pause_button.fixedToCamera = true;
                self.pause_button.cameraOffset.setTo(w / 2 - 32, 20);
            }
        }
    }, {
        key: 'collectStar',
        value: function collectStar(player, star) {
            // Removes the star from the screen
            star.kill();
            //  Add and update the score
            this.score += 10;
            console.log(this.score);
            this.scoreText.text = 'score: ' + this.score;
        }
    }]);
    return Credits;
}(Phaser.State);

var Options = function (_Phaser$State) {
    inherits(Options, _Phaser$State);

    function Options() {
        classCallCheck(this, Options);
        return possibleConstructorReturn(this, (Options.__proto__ || Object.getPrototypeOf(Options)).apply(this, arguments));
    }

    createClass(Options, [{
        key: "init",
        value: function init() {}
    }, {
        key: "preload",
        value: function preload() {}
    }, {
        key: "create",
        value: function create() {}
    }, {
        key: "update",
        value: function update() {}
    }, {
        key: "render",
        value: function render() {}
    }]);
    return Options;
}(Phaser.State);

var Boot = function (_Phaser$State) {
    inherits(Boot, _Phaser$State);

    function Boot() {
        classCallCheck(this, Boot);
        return possibleConstructorReturn(this, (Boot.__proto__ || Object.getPrototypeOf(Boot)).apply(this, arguments));
    }

    createClass(Boot, [{
        key: "init",
        value: function init() {
            this.theGame = this.game.state.game;
            this.addedStates = false;
            this.theGame.load.onLoadStart.add(this.loadStart, this);
            this.theGame.load.onFileComplete.add(this.fileComplete, this);
            this.theGame.load.onLoadComplete.add(this.loadComplete, this);
        }
    }, {
        key: "preload",
        value: function preload() {
            this.theGame.load.tilemap('testing', 'assets/images/fuck.json', null, Phaser.Tilemap.TILED_JSON);
            this.theGame.load.image('tiles', './assets/images/test_map.png');
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
            this.theGame.load.spritesheet('menu_start_button', './assets/main_menu/play_button.png', 128, 32);
            this.theGame.load.image('menu_bg', './assets/main_menu/menu_bg.png');
        }
    }, {
        key: "create",
        value: function create() {

            this.bmpText = this.theGame.add.bitmapText(10, 100, 'gem', 'LOADING...', 34);

            // bmpText.inputEnabled = true;

            // bmpText.input.enableDrag();

            this.addGameStates();
            this.addGameMusic();

            //just leaving this here for later, will come in handy maybe
            //  Register the keys.
            this.leftKey = this.theGame.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            this.rightKey = this.theGame.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            this.spaceKey = this.theGame.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

            //  Stop the following keys from propagating up to the browser
            this.theGame.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR]);
        }
    }, {
        key: "update",
        value: function update() {

            if (this.addedStates && this.filesLoaded) {
                //this.theGame.state.start("GameMenu");
                this.theGame.state.start("Game");
            }
        }
    }, {
        key: "addGameStates",
        value: function addGameStates() {

            this.theGame.state.add("GameMenu", GameMenu);
            this.theGame.state.add("Game", Game);
            this.theGame.state.add("GameOver", GameOver);
            this.theGame.state.add("Credits", Credits);
            this.theGame.state.add("Options", Options);

            this.addedStates = true;
        }
    }, {
        key: "addGameMusic",
        value: function addGameMusic() {
            // music = game.add.audio('dangerous');
            // music.loop = true;
            // music.play();
        }
    }, {
        key: "loadStart",
        value: function loadStart() {

            console.log('loading');
        }
    }, {
        key: "fileComplete",
        value: function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
            //http://phaser.io/examples/v2/loader/load-events
            // text.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
            console.log(progress);
        }
    }, {
        key: "loadComplete",
        value: function loadComplete() {
            console.log('done loading files');
            this.filesLoaded = true;
        }
    }]);
    return Boot;
}(Phaser.State);

//import Scene1 from './states/Scene1.js';

var Game$2 = function (_Phaser$Game) {
    inherits(Game, _Phaser$Game);

    function Game() {
        classCallCheck(this, Game);

        var _this = possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, { renderer: Phaser.AUTO,
            crisp: true,
            roundPixels: true,
            alignH: true,
            alignV: true,
            scaleH: 1,
            scaleV: 1,
            trimH: 0,
            trimV: 0,
            scaleMode: Phaser.ScaleManager.SHOW_ALL,
            antialias: true }));

        _this.state.add('Boot', Boot, false);
        _this.state.start('Boot');
        return _this;
    }

    return Game;
}(Phaser.Game);

new Game$2();

}());
//# sourceMappingURL=compiled.js.map
