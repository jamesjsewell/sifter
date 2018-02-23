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

var LevelSelect = function () {
    function LevelSelect(context) {
        classCallCheck(this, LevelSelect);

        this.context = context;
        this.theGame = this.context.theGame;
        this.create_level_select();
    }

    createClass(LevelSelect, [{
        key: 'create_level_select',
        value: function create_level_select() {

            this.lvl_select_bg = this.theGame.add.sprite(0, 0, 'atlas');

            this.lvl_select_bg.alignIn(this.theGame.camera.view, Phaser.CENTER);
            this.level1Button = this.theGame.add.button(this.width / 2, this.height / 2, "atlas", this.level1, this, 'lvl2.png', 'lvl1.png');
            this.level1Button.anchor.setTo(0.5);
            this.level2Button = this.theGame.add.button(this.width / 2, this.height / 2, "atlas", this.level2, this, 'lvl4.png', 'lvl3.png');
            this.level2Button.anchor.setTo(-0.8, 0.5);
            this.level3Button = this.theGame.add.button(this.width / 2, this.height / 2, "atlas", this.level3, this, 'lvl6.png', 'lvl5.png');
            this.level3Button.anchor.setTo(-2.1, 0.5);
            this.level4Button = this.theGame.add.button(this.width / 2, this.height / 2, "atlas", this.level4, this, 'lvl8.png', 'lvl7.png');
            this.level4Button.anchor.setTo(-3.4, 0.5);
            this.lvl_select_bg.addChild(this.level1Button);
            this.lvl_select_bg.addChild(this.level2Button);
            this.lvl_select_bg.addChild(this.level3Button);
            this.lvl_select_bg.addChild(this.level4Button);
            this.lvl_select_bg.frameName = "level_select_bg.png";
        }
    }, {
        key: 'level1',
        value: function level1() {
            this.startLevel(0);
        }
    }, {
        key: 'level2',
        value: function level2() {
            this.startLevel(1);
        }
    }, {
        key: 'level3',
        value: function level3() {
            this.startLevel(2);
        }
    }, {
        key: 'level4',
        value: function level4() {
            this.startLevel(3);
        }
    }, {
        key: 'startLevel',
        value: function startLevel(lvl) {
            console.log(this);
            this.theGame.theLevel = lvl;
            this.theGame.state.start("Game");
        }
    }]);
    return LevelSelect;
}();

var MainMenu = function () {
    function MainMenu(context) {
        classCallCheck(this, MainMenu);

        this.context = context;
        this.theGame = this.context.theGame;
        this.width = this.theGame._width;
        this.height = this.theGame._height;
        this.create_main_menu();
    }

    createClass(MainMenu, [{
        key: "create_main_menu",
        value: function create_main_menu() {

            // this.button = this.theGame.add.button(this.width/2, this.height/2, "atlas", this.startGame, this, 'play_button2.png', 'play_button1.png');
            // this.button.frameName = "play_button1.png"
            // this.button.x = this.width/2 - (this.button.texture.frame.width/2) 
            // this.button.y = this.height/2 - (this.button.texture.frame.height/2)

            this.levelSelect = new LevelSelect(this);

            //this.menu_features = new MainMenu(this)
        }
    }, {
        key: "startGame",
        value: function startGame() {
            //console.log('starting game')
            this.theGame.state.start("Game");
        }
    }]);
    return MainMenu;
}();

var GameMenu = function (_Phaser$State) {
    inherits(GameMenu, _Phaser$State);

    function GameMenu() {
        classCallCheck(this, GameMenu);
        return possibleConstructorReturn(this, (GameMenu.__proto__ || Object.getPrototypeOf(GameMenu)).apply(this, arguments));
    }

    createClass(GameMenu, [{
        key: 'init',
        value: function init() {
            this.theGame = this.game.state.game;
            this.width = this.theGame._width;
            this.height = this.theGame._height;
        }
    }, {
        key: 'create',
        value: function create() {

            // this.theGame.add.sprite(0, 0, 'menu_bg')
            // this.button = this.theGame.add.button(this.width/2, this.height/2, "atlas", this.startGame, this, 1, 0, 2);
            // this.button.frameName = "play_button1.png"
            // this.button.x = this.width/2 - (this.button.texture.frame.width/2) 
            // this.button.y = this.height/2 - (this.button.texture.frame.height/2)

            this.menu_features = new MainMenu(this);
        }
    }, {
        key: 'update',
        value: function update() {}
    }, {
        key: 'render',
        value: function render() {}
    }, {
        key: 'startGame',
        value: function startGame() {
            //console.log('starting game')
            //this.theGame.state.start("Game");

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
            this.selectedTilesArray = [];
            this.selected = false;
            this.deadEnds = [];
            this.alreadyMatched = [];
            this.currentCell = null;
            this.cycles = 0;
            this.done = false;
            this.level = this.theGame.theLevel;
        }
    }, {
        key: 'preload',
        value: function preload() {}
    }, {
        key: 'create',
        value: function create() {
            var _this2 = this;

            this.theTileMap = this.theGame.add.tilemap('map2');
            this.theTileMap.addTilesetImage('tiles');
            this.layer1 = this.theTileMap.createLayer(this.level);
            this.layer1.exists = true;
            this.theTileMap.setLayer(this.layer1);
            this.currentLayerIndex = this.theTileMap.getLayer(this.theTileMap.currentLayer);

            //this.layer2 = this.theTileMap.createLayer(1)
            //this.theTileMap.setLayer(this.layer1)
            this.currentLayerIndex = this.level;
            console.log(this.currentLayerIndex);

            //this.layer1.resizeWorld();
            //this.theTileMap.shuffle(1, 1, 4, 4, this.currentLayerIndex)

            this.theGame.input.onDown.add(this.getTileProperties, this);

            this.theTileMap.forEach(function (tile) {

                if (tile.properties) {

                    if (tile.properties.type === "source") {
                        _this2.sourceBlock = tile;
                        _this2.firstInChain = _this2.theTileMap.getTileRight(_this2.currentLayerIndex, _this2.sourceBlock.x, _this2.sourceBlock.y);
                    }

                    if (tile.properties.type === "destination") {
                        _this2.destinationBlock = tile;
                    }
                }
            }, this, 0, 0, 6, 6, this.currentLayerIndex);

            this.selector = this.theGame.add.sprite(0, 0, 'atlas', this.currentLayerIndex);
            this.selector.frameName = "selector.png";
            this.selector.visible = false;
        }
    }, {
        key: 'update',
        value: function update() {}
    }, {
        key: 'render',
        value: function render() {}
    }, {
        key: 'checkForRoadStart',
        value: function checkForRoadStart() {

            var startCell = this.theTileMap.getTileRight(this.currentLayerIndex, this.sourceBlock.x, this.sourceBlock.y);

            if (startCell) {
                if (startCell.properties.left === true) {
                    this.currentCell = null;
                    this.alreadyMatched = [];
                    this.deadEnds = [];
                    this.alreadyMatched[0] = startCell;
                    this.cycles = 0;
                    this.traversePath(startCell);
                }
            }
        }
    }, {
        key: 'traversePath',
        value: function traversePath(currentCell) {

            if (this.done === false) {

                var foundMatches = this.testConnections(currentCell, this.alreadyMatched);

                if (this.done === true) {

                    return;
                }

                this.cycles = this.cycles + 1;

                var foundMatches = this.testConnections(currentCell, this.alreadyMatched);

                if (!foundMatches) {

                    if (!this.deadEnds.includes(currentCell)) {

                        if (currentCell) {
                            this.deadEnds.push(currentCell);
                        }
                    } else {}

                    if (this.cycles < 20) {

                        if (this.alreadyMatched.length) {
                            currentCell = this.alreadyMatched[this.alreadyMatched.length];
                            this.traversePath(currentCell);
                        }
                    } else {
                        console.log('cycle limit reached, dead end');
                    }
                } else {

                    this.alreadyMatched.push(currentCell);
                    currentCell = null;

                    if (foundMatches && foundMatches.length) {

                        for (var i = 0; i <= foundMatches.length; i++) {

                            if (foundMatches[i]) {
                                currentCell = foundMatches[i];
                            }
                        }
                    }

                    if (currentCell) {

                        if (this.cycles < 20) {
                            this.traversePath(currentCell);
                        } else {
                            console.log('cycle limit reached');
                        }
                    }
                }
            }
        }
    }, {
        key: 'testConnections',
        value: function testConnections(theTile, alreadyMatched) {

            var matches = [];

            if (theTile && theTile.properties) {

                var above = this.theTileMap.getTileAbove(this.currentLayerIndex, theTile.x, theTile.y);
                var below = this.theTileMap.getTileBelow(this.currentLayerIndex, theTile.x, theTile.y);
                var left = this.theTileMap.getTileLeft(this.currentLayerIndex, theTile.x, theTile.y);
                var right = this.theTileMap.getTileRight(this.currentLayerIndex, theTile.x, theTile.y);

                var theTileProps = theTile.properties;

                if (above) {
                    var aboveProps = above.properties;
                }

                if (below) {
                    var belowProps = below.properties;
                }

                if (left) {
                    var leftProps = left.properties;
                }

                if (right) {
                    var rightProps = right.properties;
                }

                if (aboveProps) {
                    if (aboveProps.bottom === true && theTileProps.top === true) {

                        if (!alreadyMatched.includes(above) && !this.deadEnds.includes(above)) {
                            matches.push(above);
                        }
                    }
                }

                if (belowProps) {

                    if (belowProps.top === true && theTileProps.bottom === true) {

                        if (!alreadyMatched.includes(below) && !this.deadEnds.includes(below)) {
                            matches.push(below);
                        }
                    }
                }

                if (leftProps) {

                    if (leftProps.right === true && theTileProps.left === true) {

                        if (!alreadyMatched.includes(left) && !this.deadEnds.includes(left)) {
                            matches.push(left);
                        }
                    }
                }

                if (rightProps) {
                    console.log(rightProps);
                    if (rightProps.left === true && theTileProps.right === true) {

                        if (!alreadyMatched.includes(right) && !this.deadEnds.includes(right)) {

                            matches.push(right);

                            if (rightProps.type === "destination") {
                                console.log('donne');

                                this.currentCell = null;
                                this.alreadyMatched = [];

                                this.cycles = 0;
                                this.done = true;

                                //this.level = this.level + 1

                                //this.change_level()
                                this.theGame.state.start("LevelComplete");
                                return;
                            }
                        }
                    }
                }

                if (matches.length) {
                    return matches;
                } else {
                    return null;
                }
            }
        }
    }, {
        key: 'getTileProperties',
        value: function getTileProperties() {

            var x = this.layer1.getTileX(this.theGame.input.activePointer.worldX);
            var y = this.layer1.getTileY(this.theGame.input.activePointer.worldY);
            var tile = this.theTileMap.getTile(x, y);

            if (!this.selectedTilesArray.length) {

                if (tile.properties.type === "connector" || tile.properties.type === "blank") {
                    this.selectedTilesArray[0] = tile;
                    this.selected = true;

                    this.create_selector(tile.worldX, tile.worldY);
                    return;
                }
            }

            if (this.selected === true) {
                if (!tile) {
                    console.log('drop selection');
                }

                if (tile) {

                    if (tile.properties.type === "connector" || tile.properties.type === "blank") {

                        this.selectedTilesArray[1] = tile;

                        this.swap();

                        this.remove_selector();

                        return;
                    }
                }
            }
        }
    }, {
        key: 'swap',
        value: function swap() {

            var tile1 = this.selectedTilesArray[0];
            var tile1Copy = new Phaser.Tile(this.currentLayerIndex);

            var tile2 = this.selectedTilesArray[1];
            var tile2Copy = new Phaser.Tile(this.currentLayerIndex);

            var performSwap = true;

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

            if (performSwap) {

                this.theTileMap.putTile(tile1, tile2Copy.x, tile2Copy.y, this.currentLayerIndex);
                this.theTileMap.putTile(tile2Copy, tile1Copy.x, tile1Copy.y, this.currentLayerIndex);
                this.selectedTilesArray = [];
                this.selected = false;

                this.done = false;
                this.checkForRoadStart();
            }
        }
    }, {
        key: 'create_selector',
        value: function create_selector(x, y) {

            if (this.selector && x && y) {
                this.selector.bringToTop();
                this.selector.z = 20;
                this.selector.x = x;
                this.selector.y = y;
                this.selector.visible = true;
            } else {}
        }
    }, {
        key: 'remove_selector',
        value: function remove_selector() {
            this.selector.visible = false;
        }
    }, {
        key: 'change_level',
        value: function change_level() {
            var _this3 = this;

            this.layer1.destroy();

            this.layer1 = this.theTileMap.createLayer(this.level);

            this.layer1.exists = true;
            this.theTileMap.setLayer(this.layer1);
            this.currentLayerIndex = this.theTileMap.getLayer(this.theTileMap.currentLayer);
            this.selector.bringToTop();

            this.selectedTilesArray = [];
            this.selected = false;
            this.deadEnds = [];
            this.alreadyMatched = [];
            this.currentCell = null;
            this.cycles = 0;
            this.done = false;

            this.theTileMap.forEach(function (tile) {

                if (tile.properties) {

                    if (tile.properties.type === "source") {
                        _this3.sourceBlock = tile;
                        _this3.firstInChain = _this3.theTileMap.getTileRight(_this3.currentLayerIndex, _this3.sourceBlock.x, _this3.sourceBlock.y);
                    }

                    if (tile.properties.type === "destination") {
                        _this3.destinationBlock = tile;
                    }
                }
            }, this, 0, 0, 6, 6, this.currentLayerIndex);

            console.log(this.sourceBlock);
        }
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

var LevelComplete = function (_Phaser$State) {
    inherits(LevelComplete, _Phaser$State);

    function LevelComplete() {
        classCallCheck(this, LevelComplete);
        return possibleConstructorReturn(this, (LevelComplete.__proto__ || Object.getPrototypeOf(LevelComplete)).apply(this, arguments));
    }

    createClass(LevelComplete, [{
        key: 'init',
        value: function init() {
            this.theGame = this.game.state.game;
            this.score = this.theGame.completionTime;
        }
    }, {
        key: 'preload',
        value: function preload() {}
    }, {
        key: 'create',
        value: function create() {

            this.lvl_select_bg = this.theGame.add.sprite(0, 0, 'atlas');
            this.lvl_select_bg.alignIn(this.theGame.camera.view, Phaser.BOTTOM_CENTER);
            this.level1Button = this.theGame.add.button(this.width / 2, this.height / 2, "atlas", this.level1, this, 'lvl2.png', 'lvl1.png');
            this.level1Button.anchor.setTo(0.5);
            this.level2Button = this.theGame.add.button(this.width / 2, this.height / 2, "atlas", this.level2, this, 'lvl4.png', 'lvl3.png');
            this.level2Button.anchor.setTo(-0.8, 0.5);
            this.level3Button = this.theGame.add.button(this.width / 2, this.height / 2, "atlas", this.level3, this, 'lvl6.png', 'lvl5.png');
            this.level3Button.anchor.setTo(-2.1, 0.5);
            this.level4Button = this.theGame.add.button(this.width / 2, this.height / 2, "atlas", this.level4, this, 'lvl8.png', 'lvl7.png');
            this.level4Button.anchor.setTo(-3.4, 0.5);
            this.lvl_select_bg.addChild(this.level1Button);
            this.lvl_select_bg.addChild(this.level2Button);
            this.lvl_select_bg.addChild(this.level3Button);
            this.lvl_select_bg.addChild(this.level4Button);
            this.lvl_select_bg.frameName = "level_select_bg.png";
            this.scoreText = this.theGame.add.bitmapText(10, 100, 'gem', '1:00:30', 34);
            this.scoreText.alignIn(this.theGame.camera.view, Phaser.CENTER);
            this.nextButton = this.theGame.add.button(this.width / 2, this.height / 2, "atlas", this.next_level, this, 'next_button2.png', 'next_button1.png');
            this.nextButton.alignIn(this.theGame.camera.view, Phaser.TOP_CENTER);
        }
    }, {
        key: 'level1',
        value: function level1() {
            this.startLevel(0);
        }
    }, {
        key: 'level2',
        value: function level2() {
            this.startLevel(1);
        }
    }, {
        key: 'level3',
        value: function level3() {
            this.startLevel(2);
        }
    }, {
        key: 'level4',
        value: function level4() {
            this.startLevel(3);
        }
    }, {
        key: 'next_level',
        value: function next_level() {
            console.log('next level');
            if (this.theGame.theLevel < 4) {
                this.theGame.theLevel = this.theGame.theLevel + 1;
            }
            if (this.theGame.theLevel === 4) {
                this.theGame.theLevel = 0;
            }

            console.log(this.theGame.theLevel);

            this.startLevel(this.theGame.theLevel);
        }
    }, {
        key: 'startLevel',
        value: function startLevel(lvl) {

            this.theGame.theLevel = lvl;
            this.theGame.state.start("Game");
        }
    }]);
    return LevelComplete;
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

            this.theGame.scale.aspectRatio = 1;
            console.log(this.theGame.scale.aspectRatio);
            console.log(this.theGame);
        }
    }, {
        key: "preload",
        value: function preload() {
            this.theGame.load.tilemap('map2', 'assets/images/tilemap_2.json', null, Phaser.Tilemap.TILED_JSON);
            this.theGame.load.tilemap('map3', 'assets/images/tilemap_3.json', null, Phaser.Tilemap.TILED_JSON);
            this.theGame.load.image('tiles', './assets/images/tilemap.png');
            this.theGame.load.atlas('atlas', 'assets/images/atlas.png', 'assets/images/atlas.json');
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
        }
    }, {
        key: "update",
        value: function update() {

            if (this.addedStates && this.filesLoaded) {
                this.theGame.state.start("GameMenu");
                //this.theGame.state.start("Game");
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
            this.theGame.state.add("LevelComplete", LevelComplete);

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
            width: 384,
            height: 384,
            aspectRatio: 1,
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
