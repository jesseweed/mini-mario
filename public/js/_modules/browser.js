/*

    FILE: BROWSER.JS
    DESCRIPTION: Browser and File locations
    AUTHOR(S): Jesse Weed

    TO DO:

*/

var Pong = window.Pong || {};

Pong.Browser = {


    /* - - - - - - - - - - - - - - - - - >

        CONFIGURATION & INITILIZATION

    < - - - - - - - - - - - - - - - - - */


    config : {  // CONFIG SETTINGS FOR BROWSER

        mobilePX: 768, // andthing under this size is considered "mobile-ish"
        tabletPX: 1024 // andthing under this size is considered "tablet-ish"

    }, // END: INIT


    init : function () {  // INITIALIZE BROWSER

        var self = this;

        Pong.info('Browser module was loaded');

    }, // END: INIT



    /* - - - - - - - - - - - - - - - - - >

        MODULE FUNCTIONS

    < - - - - - - - - - - - - - - - - - */


    info : function (which) {  // GET BASIC BROWSER INFO

        var self = this;

        var ua = navigator.userAgent.toLowerCase(),
            platform = navigator.platform.toLowerCase(),
            UA = ua.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/) || [null, 'unknown', 0],
            mode = UA[1] == 'ie' && document.documentMode;

            if ( which === 'name' ) {
                return (UA[1] == 'version') ? UA[3] : UA[1];
            } else if ( which === 'version' ) {
                return mode || parseFloat((UA[1] == 'opera' && UA[4]) ? UA[4] : UA[2]);
            }

    }, // END: INFO


    domain: function () {  // GET CURRENT DOMAIN NAME

        var self = this;

        return window.location.hostname;

    }, // END: DOMAIN


    forward: function (url, time) {  // REDIRECT TO SPECIFIC URL

        var self = this;

        // DELAY REDIRECT IF REQUESTED
        if (typeof time !== 'undefined') {
            setTimeout(

            function () {
                if (url !== false) {
                    location.href = url;
                }
            },
            time * 1000);

        // OTHERWISE REDIRECT IMMEDIATELY
        } else {
            if (url !== false) {
                window.location = url;
            }
        }

    }, // END: FORWARD


    go: function (url) {  // GO TO A SPECIFIC URL

        var self = this;

        window.location.href = url;

    }, // END: GO

    isMobile : function() { // DETERMINE IF DEVICE IS MOBILE-ISH SIZE

        var self = this;

        if (self.width() <= self.config.mobilePX) {
            return true;
        } else {
            return false;
        }

    },


    isTablet : function() {  // DETERMINE IS DEVICE IS TABLET-ISH SIZE

        var self = this;

        if (self.width() <= self.config.tabletPX) {
            return true;
        } else {
            return false;
        }

    },


    page: function () {  // RETURN CURRENT PAGE NAME

        var self = this;

        var path = location.pathname.split('/');

        return path.slice(-1)[0];

    }, // END: PAGE


    path: function () {  // RETURN CURRENT PATH

        return location.pathname;

    }, // END: PATH


    query: function (term) {  // QUERY URI FOR A 'GET' PARAM

        var data = false,
            loc = location.search,
            q = loc.split('?'),
            query = '&' + q[1],
            parts = query.split('&');

        $.each(parts, function (index, value) {

            if (value.indexOf(term) !== -1) {
                data = value.split('=');
                data = data[1];
            }

        });

        return data;

    }, // END: QUERY


    segment: function ( num ) {  // RETURN SPECIFIC URL SEGMENT

        var self = this;

        var path = location.pathname,
            path = path.split('/');

        return path[ num ];

    }, // END: PATH


    url: function() { // GET CURRENT URL

        var self = this;

        return window.location.protocol + '//' + window.location.hostname + (window.location.port !== '' ? ':' + window.location.port : '') + '/'; //BASE URL

    },


    size: function ( which ) {

      if ( !arguments[1] ) {

        if ( which === 'height' || which === 'h' ) {
          return window.outerHeight;
        } else if ( which === 'width' || which === 'w' ) {
          return window.outerWidth;
        }

      } else if ( arguments[1] == 'inner' ) {
        if ( which === 'height' || which === 'h' ) {
          return window.innerHeight;
        } else if ( which === 'width' || which === 'w' ) {
          return window.innerWidth;
        }
      }

    }


};


// END FILE: Pong.BROWSER.JS
