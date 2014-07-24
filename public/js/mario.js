/*

    FILE: Mario.js
    DESCRIPTION: Basic App functions and config
    AUTHOR(S): Jesse Weed

*/

var Mario = window.Mario || {};

/* - - - - - - - - - - - - - - - - - >

    CONFIGURATION & INITILIZATION

< - - - - - - - - - - - - - - - - - */

Mario.config = {  // GLOBAL CONFIG SETTINGS

    // SET TO FALSE TO DISABLE LOGGING TO CONSOLE
    debug : true,

    // BASE URL'S
    url : {
        base: window.location.protocol + '//' + window.location.hostname + (window.location.port !== '' ? ':' + window.location.port : '') + '/', //BASE URL
    }

}; // END: CONFIG


Mario.html = {  // SET REFERENCES TO HTML ELEMENTS HERE


}; // END: HTML

Mario.engine = false;

Mario.env = {
  w: 800,
  h: 600
};

Mario.init = function ( dir ) {  // INITALIZE J

  var self = this
      self.dir = dir;

  self.info('Mario loaded');

    head.load(self.dir.lib + 'phaser/./phaser.js', function() {

      // head.load(self.dir.js + '_modules/game.js', function() {
      //   // console.log(Phaser);
      //   self.Engine = new Phaser.Game(1000, 600, Phaser.AUTO, '', { preload: Mario.Game.preload, create: Mario.Game.create });
      // });

    });


    head.load([
      self.dir.js + '_modules/browser.js',
      self.dir.js + '_modules/game.js'],
      function() {

        // Get Environment Info
        self.env.w = Mario.Browser.size('w');
        self.env.h = Mario.Browser.size('h', 'inner');

        // Initialize Game Engine
        self.Engine = new Phaser.Game(self.env.w, self.env.h, Phaser.AUTO, '', {
        // self.Engine = new Phaser.Game(800, 600, Phaser.AUTO, '', {
          preload: Mario.Game.preload,
          create: Mario.Game.create,
          update: Mario.Game.update,
        });

    });


}; // END: INIT


Mario.bind = function () {  // GLOBAL BINDINGS

  var self = this;

  // Track window size if it changes
  window.onresize = function(event) {
    self.env.w = Mario.Browser.size('w', 'inner');
    self.env.h = Mario.Browser.size('h', 'inner');

    console.log( self.Engine );
  };

}; // END: BIND





//  LOGGING

Mario.error = function (what) {  // LOG AN ERROR TO THE CONSOLE

    var self = this;

    if (typeof console !== "undefined" && self.config.debug === true ) {
        console.error(what);
    } else if (self.config.debug === true) {
        window.console = {error: function () {}};
    }

};


Mario.info = function (what) {  // LOG SOME INFO TO THE CONSOLE

    var self = this;

    if (typeof console !== "undefined" && self.config.debug === true ) {
        console.info(what);
    } else if (self.config.debug === true) {
        window.console = {info: function () {}};
    }

};

Mario.log = function (what) {  // LOG TO CONSOLE IF CONSOLE EXISTS && DEBUG === TRUE

    var self = this;

    if (typeof console !== "undefined" && self.config.debug === true ) {
        console.log(what);
    } else if (self.config.debug === true) {
        window.console = {log: function () {}};
    }

}; // END: LOG


Mario.warn = function (what) {  // LOG A WARNING TO THE CONSOLE

    var self = this;

    if (typeof console !== "undefined" && self.config.debug === true ) {
        console.warn(what);
    } else if (self.config.debug === true) {
        window.console = {warn: function () {}};
    }

};


// END OF FILE: _MAIN.PongS
