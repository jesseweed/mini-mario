/*

    FILE: GAME.JS
    DESCRIPTION: Basic game functions
    AUTHOR(S): Jesse Weed

*/

var Mario = window.Mario || {};

Mario.Game = {


  /* - - - - - - - - - - - - - - - - - >

      CONFIGURATION & INITILIZATION

  < - - - - - - - - - - - - - - - - - */


  init : function () {  // INITIALIZE BROWSER

    var self = this;

    Mario.info('Game module was loaded');

  }, // END: INIT



  /* - - - - - - - - - - - - - - - - - >

      MODULE FUNCTIONS

  < - - - - - - - - - - - - - - - - - */


  preload : function () {

    var self = Mario.Game,
        game = Mario.Engine;

    // IMAGES
    game.load.image('sky', 'img/game/sky.png');
    game.load.image('bush', 'img/game/bush-large.png');
    game.load.image('bush-small', 'img/game/bush-small.png');
    game.load.image('ground', 'img/game/ground.png');
    game.load.image('platform', 'img/game/bricks.png');
    game.load.image('star', 'img/game/star.png');
    game.load.spritesheet('dude', 'img/game/dude.png', 32, 48);
    game.load.spritesheet('mario', 'img/game/dude2.png', 32, 28);

    // AUDIO
    game.load.audio('coin', ['audio/coin.mp3']);
    game.load.audio('jump', ['audio/jump.mp3']);
    game.load.audio('theme', ['audio/theme.mp3']);

  },

  create : function () {

    var self = Mario.Game,
        game = Mario.Engine;


    self.score = 0;

    Mario.Game.world();
    self.addPlayer();
    self.addStars();

    music = game.add.audio('theme', 0.7, true);
    music.play();

  },

  update : function () {

    var self = Mario.Game,
        game = Mario.Engine,
        player = self.player,
        ground = self.ground,
        platforms = self.platforms,
        cursors = game.input.keyboard.createCursorKeys();


    // KEYS
    jump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    game.physics.arcade.collide( player, platforms);

     //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (jump.isDown && player.body.touching.down ||  cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -500;
        music = game.add.audio('jump');
        music.play();
    }

    game.physics.arcade.collide(self.stars, self.platforms);

    game.physics.arcade.overlap(self.player, self.stars, self.collectStar, null, this);

    self.cursors = cursors;


  },

  collectStar : function(player, star) {

    var self = Mario.Game,
        game = Mario.Engine;

    star.kill();

    self.score += 10;
    self.scoreText.text = 'Score: ' + self.score;

    music = game.add.audio('coin');
    music.play();

  },

  world : function() {

    var self = Mario.Game,
        game = Mario.Engine;

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    // Add Background items
    background = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 48, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(1, 1);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    // var ledge = platforms.create(215, 650, 'platform');

    // ledge = platforms.create(-150, 250, 'platform');

    ledge = platforms.create(game.world.width - (game.world.width * 1), game.world.height - 150, 'platform');

    ledge2 = platforms.create(game.world.width - (game.world.width * 0.9), game.world.height - 250, 'platform');
    ledge3 = platforms.create(game.world.width - (game.world.width / 1.9), game.world.height - 250, 'platform');
    ledge4 = platforms.create(game.world.width - (game.world.width * 0.75 ), game.world.height - 350, 'platform');
    // ledge3 = platforms.create(500, 650, 'platform');

    // ledge4 = platforms.create(1000, 650, 'platform');

    // ledge.body.immovable = true;

    ledge.body.immovable = true;
    ledge2.body.immovable = true;
    ledge3.body.immovable = true;
    ledge4.body.immovable = true;


    // BUSHES
    var bush1 = background.create(-140, game.world.height - 80, 'bush');

    var bush2 = background.create(game.world.width * 0.4, game.world.height - 80, 'bush');


    self.platforms = platforms;
    self.ground = ground;
    self.ledge = ledge;

  },


  addStars : function() {

    var self = Mario.Game,
        game = Mario.Engine,
        player = self.player,
        platforms = self.platforms;

    //  Finally some stars to collect
    var stars = game.add.group();

    //  We will enable physics for any star that is created in this group
    stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 40; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * (game.world.width/40), -20, 'star');

        //  Let gravity do its thing
        star.body.gravity.y = 400;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.3;
    }

    //  The score
    self.scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

    self.stars = stars;

  },


  addPlayer : function() {

    var self = Mario.Game,
        game = Mario.Engine;

    // The player and its settings
    player = game.add.sprite(200, game.world.height - 100, 'mario');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 1000;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    self.player = player;

  }


};


// END FILE: Mario.BROWSER.JS
