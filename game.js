var game = new Phaser.Game({ 
    renderer: Phaser.AUTO,
    preload: this.preload, 
    create: this.create, 
    update: this.update,
    crisp: true,
    roundPixels: true,
    alignH: true,
    alignV: true,
    scaleH: 1,
    scaleV: 1,
    trimH: 0,
    trimV: 0,
    scaleMode: Phaser.ScaleManager.SHOW_ALL,
    antialias: true,
    state:{
      init: function() {
        game.input.onDown.add(function() { console.log('clicked') })
        this.score = 0
       
      },
      preload: function() {
          this.game.load.image('sky', 'assets/sky.png');
          this.game.load.image('ground', 'assets/platform.png');
          this.game.load.image('star', 'assets/star.png');
          this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
          game.load.image('menu', 'assets/number-buttons-90x90.png', 270, 180);
      },
      create: function() {
          
        cursors = this.game.input.keyboard.createCursorKeys();
        
        //  We're going to be using physics, so enable the Arcade Physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        //  A simple background for our game
        this.game.add.sprite(0, 0, 'sky');
        //  The platforms group contains the ground and the 2 ledges we can jump on
        this.platforms = this.game.add.group();
        //  We will enable physics for any object that is created in this group
        this.platforms.enableBody = true;
        // Here we create the ground.
        this.ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        this.ground.scale.setTo(2, 2);
        //  This stops it from falling away when you jump on it
        this.ground.body.immovable = true;
        //  Now let's create two ledges
        this.ledge = this.platforms.create(400, 480, 'ground');
        this.ledge.body.immovable = true;
        this.ledge = this.platforms.create(-100, 440, 'ground');
        this.ledge.body.immovable = true;
        this.ledge = this.platforms.create(200, 400, 'ground');
        this.ledge.scale.setTo(.2,.5)
        this.ledge.body.immovable = true;
        // ready player one
        // The player and its settings
        this.player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');
        //  We need to enable physics on the player
        this.game.physics.arcade.enable(this.player);
        //  Player physics properties. Give the little guy a slight bounce.
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 900;
        this.player.body.collideWorldBounds = true;
        //  Our two animations, walking left and right.
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);
        //add some stars
        this.stars = this.game.add.group();
        this.stars.enableBody = true;

        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 12; i++)
        {
            //  Create a star inside of the 'stars' group
            var star = this.stars.create(i * 70, 0, 'star');
            //  Let gravity do its thing
            star.body.gravity.y = 900;
            //  This just gives each star a slightly random bounce value
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }
        //gui
        this.scoreText = game.add.text(650, 0, "score: 0", { font: "18px Arial", fill: "#ffffff", align: "right" });
        this.scoreText.fixedToCamera = true;
        this.scoreText.cameraOffset.setTo(650, 0);
        

        //move sprite to cursor
        this.seeker = game.add.sprite(400, 300, '.assets/diamond.png');
        this.seeker.anchor.setTo(0.5, 0.5);

        //  Enable Arcade Physics for the sprite
        game.physics.enable(this.seeker, Phaser.Physics.ARCADE);

        //  Tell it we don't want physics to manage the rotation
        this.seeker.body.allowRotation = false;

        //pause menu
        this.pause_menu()

      },
      update: function() {
          game.world.setBounds(0, 0, 1920, 1920);
          //  Notice that the sprite doesn't have any momentum at all,
          //  it's all just set by the camera follow type.
          //  0.1 is the amount of linear interpolation to use.
          //  The smaller the value, the smooth the camera (and the longer it takes to catch up)
          game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
          //  Collide the player and the stars with the this.platforms
          var hitPlatform = this.game.physics.arcade.collide(this.player, this.platforms);
          //  Reset the players velocity (movement)
          this.player.body.velocity.x = 0;
          if (cursors.left.isDown)
          {
              //  Move to the left
              this.player.body.velocity.x = -150;
              this.player.animations.play('left');
          }
          else if (cursors.right.isDown)
          {
              //  Move to the right
              this.player.body.velocity.x = 150;
              this.player.animations.play('right');
          }
          else
          {
              //  Stand still
              this.player.animations.stop();
              this.player.frame = 4;
          }
          //  Allow the player to jump if they are touching the ground.
          if (cursors.up.isDown && this.player.body.touching.down && hitPlatform)
          {
              this.player.body.velocity.y = -350;
          }
          //stars
          this.game.physics.arcade.collide(this.stars, this.platforms);
          this.game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);

          //seeker
          this.seeker.rotation = game.physics.arcade.moveToPointer(this.seeker, 60, game.input.activePointer, 500);
          
      },
      render: function(){
          var debug = this.game.debug;
          debug.scale(20, 20, '#fff');
          debug.phaser(10, 580);
      },
      pause_menu: function(){

        //pause menu
        var w = 800, h = 600;
        // Create a label to use as a button
        this.pause_label = game.add.text(w - 100, 20, 'Pause', { font: '24px Arial', fill: '#fff' });
        this.pause_label.inputEnabled = true;
        this.pause_label.fixedToCamera = true;
        this.pause_label.cameraOffset.setTo(325, 0);
        this.pause_label.events.onInputUp.add(function () {
            // When the paus button is pressed, we pause the game
            game.paused = true;
            // Then add the menu
            this.menu = game.add.sprite(w/2, h/2, 'menu');

            // And a label to illustrate which menu item was chosen. (This is not necessary)
            this.choiceLabel = game.add.text(w/2, h-150, 'Click outside menu to continue', { font: '30px Arial', fill: '#fff' });
            this.menu.x = this.game.camera.x + w/2 - ( 270/2 )
            this.menu.y = this.game.camera.y + h/2 - ( 180/2 )
    
            this.choiceLabel.x = this.menu.x 
            this.choiceLabel.y = this.menu.y + h/3.5

        });
        // Add a input listener that can help us return from being paused
        game.input.onDown.add(unpause, self);
        // And finally the method that handels the pause menu
        function unpause(event){
            // Only act if paused
            if(game.paused){
                // Calculate the corners of the menu
                var x1 = w/2 - 270/2, x2 = w/2 + 270/2,
                    y1 = h/2 - 180/2, y2 = h/2 + 180/2;
                // Check if the click was inside the menu
                if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
                    // The choicemap is an array that will help us see which item was clicked
                    var choiceMap = ['one', 'two', 'three', 'four', 'five', 'six'];
                    // Get menu local coordinates for the click
                    var x = event.x - x1,
                        y = event.y - y1;
                    // Calculate the choice 
                    var choice = Math.floor(x / 90) + 3*Math.floor(y / 90);
                    // Display the choice
                    choiceLabel.text = 'You chose menu item: ' + choiceMap[choice];
                    
                }
                else{
                    // Remove the menu and the label
                    menu.destroy();
                    choiceLabel.destroy();
                    // Unpause the game
                    game.paused = false;
                }
            }
        }

      },
      collectStar: function(player, star) {
          // Removes the star from the screen
          star.kill();
          //  Add and update the score
          this.score += 10;
          console.log(this.score)
          this.scoreText.text = 'score: ' + this.score;
      }
      
    }
    
  })

  


