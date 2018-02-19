!function(){"use strict";var e=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},t=function(){function e(e,t){for(var s=0;s<t.length;s++){var a=t[s];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,s,a){return s&&e(t.prototype,s),a&&e(t,a),t}}(),s=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},i=function(i){function r(){return e(this,r),a(this,(r.__proto__||Object.getPrototypeOf(r)).apply(this,arguments))}return s(r,i),t(r,[{key:"init",value:function(){this.theGame=this.game.state.game,this.score=0}},{key:"preload",value:function(){this.theGame.load.image("sky","./assets/images/sky.png"),this.theGame.load.image("ground","./assets/images/platform.png"),this.theGame.load.image("star","./assets/images/star.png"),this.theGame.load.spritesheet("dude","./assets/images/dude.png",32,48),this.theGame.load.spritesheet("resumeButton","./assets/pause_menu/resume_button.png",32,32),this.theGame.load.spritesheet("pauseButton","./assets/pause_menu/pause_button.png",32,32),this.theGame.load.image("menu","./assets/images/number-buttons-90x90.png",270,180)}},{key:"create",value:function(){this.cursors=this.theGame.input.keyboard.createCursorKeys(),this.theGame.physics.startSystem(Phaser.Physics.ARCADE),this.theGame.add.sprite(0,0,"sky"),this.platforms=this.theGame.add.group(),this.platforms.enableBody=!0,this.ground=this.platforms.create(0,this.theGame.world.height-64,"ground"),this.ground.scale.setTo(2,2),this.ground.body.immovable=!0,this.ledge=this.platforms.create(400,480,"ground"),this.ledge.body.immovable=!0,this.ledge=this.platforms.create(-100,440,"ground"),this.ledge.body.immovable=!0,this.ledge=this.platforms.create(200,400,"ground"),this.ledge.scale.setTo(.2,.5),this.ledge.body.immovable=!0,this.player=this.theGame.add.sprite(32,this.theGame.world.height-150,"dude"),this.theGame.physics.arcade.enable(this.player),this.player.body.bounce.y=.2,this.player.body.gravity.y=900,this.player.body.collideWorldBounds=!0,this.player.animations.add("left",[0,1,2,3],10,!0),this.player.animations.add("right",[5,6,7,8],10,!0),this.stars=this.theGame.add.group(),this.stars.enableBody=!0;for(var e=0;e<12;e++){var t=this.stars.create(70*e,0,"star");t.body.gravity.y=900,t.body.bounce.y=.7+.2*Math.random()}this.scoreText=this.theGame.add.text(650,0,"score: 0",{font:"18px Arial",fill:"#ffffff",align:"right"}),this.scoreText.fixedToCamera=!0,this.scoreText.cameraOffset.setTo(650,0),this.seeker=this.theGame.add.sprite(400,300,"../assets/images/diamond.png"),this.seeker.anchor.setTo(.5,.5),this.theGame.physics.enable(this.seeker,Phaser.Physics.ARCADE),this.seeker.body.allowRotation=!1,this.pause_menu()}},{key:"update",value:function(){this.theGame.world.setBounds(0,0,1920,1920),this.theGame.camera.follow(this.player,Phaser.Camera.FOLLOW_LOCKON,.1,.1);var e=this.theGame.physics.arcade.collide(this.player,this.platforms);this.player.body.velocity.x=0,this.cursors.left.isDown?(this.player.body.velocity.x=-150,this.player.animations.play("left")):this.cursors.right.isDown?(this.player.body.velocity.x=150,this.player.animations.play("right")):(this.player.animations.stop(),this.player.frame=4),this.cursors.up.isDown&&this.player.body.touching.down&&e&&(this.player.body.velocity.y=-350),this.theGame.physics.arcade.collide(this.stars,this.platforms),this.theGame.physics.arcade.overlap(this.player,this.stars,this.collectStar,null,this),this.seeker.rotation=this.theGame.physics.arcade.moveToPointer(this.seeker,60,this.theGame.input.activePointer,500)}},{key:"render",value:function(){var e=this.theGame.debug;e.scale(20,20,"#fff"),e.phaser(10,580)}},{key:"pause_menu",value:function(){var e=800,t=600;i(this),console.log(this.theGame);var s=this;function a(){s.theGame.paused=!0,s.pause_button.destroy(),s.menu=s.theGame.add.sprite(e/2,t/2,"menu");var a=s.theGame.camera.x,r=s.theGame.camera.y;s.choiceLabel=s.theGame.add.text(e/2,t-150,"Click outside menu to continue",{font:"30px Arial",fill:"#fff"}),s.menu.x=a+e/2-135,s.menu.y=r+t/2-90,s.menu.x=s.theGame.camera.x+e/2-135,s.menu.y=s.theGame.camera.y+t/2-90,s.choiceLabel.x=s.menu.x,s.choiceLabel.y=s.menu.y+t/3.5,s.resume_button=s.theGame.add.button(s.theGame.world.centerX,s.theGame.world.centerY,"resumeButton",function(e){s.resume_button.setFrames(0,1,2),s.theGame.paused&&(s.menu.destroy(),s.choiceLabel.destroy(),s.resume_button.destroy(),s.theGame.paused=!1,i(s))},s,1,0,2),s.resume_button.x=a+e/2-32,s.resume_button.y=r+20,s.theGame.input.onDown.add(function(a){if(s.theGame.paused){var i=e/2-135,r=e/2+135,o=t/2-90,h=t/2+90;if(a.x>i&&a.x<r&&a.y>o&&a.y<h){var n=a.x-i,l=a.y-o,u=Math.floor(n/90)+3*Math.floor(l/90);s.choiceLabel.text="You chose menu item: "+["one","two","three","four","five","six"][u]}}},s)}function i(t){t.pause_button=t.theGame.add.button(t.theGame.world.centerX,t.theGame.world.centerY,"pauseButton",a,this,1,0,2),t.pause_button.fixedToCamera=!0,t.pause_button.cameraOffset.setTo(e/2-32,20)}}},{key:"collectStar",value:function(e,t){t.kill(),this.score+=10,console.log(this.score),this.scoreText.text="score: "+this.score}}]),r}(Phaser.State);new(function(t){function r(){e(this,r);var t=a(this,(r.__proto__||Object.getPrototypeOf(r)).call(this,{renderer:Phaser.AUTO,crisp:!0,roundPixels:!0,alignH:!0,alignV:!0,scaleH:1,scaleV:1,trimH:0,trimV:0,scaleMode:Phaser.ScaleManager.SHOW_ALL,antialias:!0}));return t.state.add("Scene1",i,!1),t.state.start("Scene1"),t}return s(r,t),r}(Phaser.Game))}();
//# sourceMappingURL=compiled.js.map
