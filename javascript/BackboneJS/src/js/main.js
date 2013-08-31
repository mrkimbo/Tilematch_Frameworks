/**
 * @fileoverview Main config for TileMatch App.
 * @author tripleaxis@gmail.com (Kim Holland)
 * @created: 28/04/13
 */
requirejs.config({

  baseUrl: 'js',

  paths:{
    /*text: 'lib/text',
    template: '../template',
    data: '../data'*/
  },

  shim:
  {
    'lib/underscore-min':{
      exports: '_'
    },
    'lib/backbone':{
      deps: ['lib/underscore-min'],
      exports: 'Backbone'
    },
    'app':{
      deps: [
        'lib/underscore-min',
        'lib/backbone'
      ]
    }
  }
});

// Kick off //
require(
  ['app', 'lib/backbone-utils'],
  function(App, Utils)
  {
    window.app = new App();
  }
);
