/**
 * @fileoverview .
 * @author tripleaxis@gmail.com (Kim Holland)
 * @created: 08/06/13
 */

define(
  [],
  function()
  {
    var AppRouter = Backbone.Router.extend({

      name: 'AppRouter',

      routes: {
        '': 'index',
        '*anything': '_404'
      },

      _404: function(url)
      {
        log(this + '::_404(' + url + ')');
      }

    });

    return AppRouter;
  }
);