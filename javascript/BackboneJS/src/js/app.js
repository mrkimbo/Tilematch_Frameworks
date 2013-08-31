/**
 * @fileoverview App entry point.
 * @author tripleaxis@gmail.com (Kim Holland)
 * @created: 25/05/13
 */

define(
  [
    'view/GameView',
    'model/GameModel',
    'config/AppRouter'
  ],

  function(GameView, GameModel, AppRouter)
  {

    var App = function()
    {
      this.model = new GameModel;
      this.game = new GameView({
          model:this.model
      });

      this.onRoute = function(route)
      {
        log(this + '::onRoute(' + route + ')');
      };
      /**
       * Setup app routing and history.
       * Not really used, but just to test.
       */
      this.router = new AppRouter;
      this.router.on('route', _.bind(this.onRoute, this));

      // start history //
      Backbone.history.start();
    };

    App.prototype.toString = function()
    {
      return 'App';
    }

    return App;
  }
);