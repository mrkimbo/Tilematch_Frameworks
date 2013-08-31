/**
 * Created with JetBrains WebStorm.
 * User: kholland
 * Date: 27/05/13
 * Time: 2:33 PM
 * To change this template use File | Settings | File Templates.
 */

define(
  [
    'view/TileBoardView',
    'config/Events'
  ],

  function(TileBoardView, Events)
  {
    var GameView = Backbone.View.extend({

      name: 'GameView',
      el: $('#gameview'),
      completePanel_: null,
      resetBtn_: null,

      initialize: function()
      {
        this.render();
        this.board.on(Events.GAME_COMPLETE, this.gameCompleteHandler_, this);
      },

      events: {
        'click #resetBtn': 'reset_'
      },

      render: function()
      {
        this.board = new TileBoardView({
          el:$('#tileContainer'),
          model: this.model
        });
        this.completePanel_ = $('#completeMsg');
        this.resetBtn_ = $('#resetBtn');

        // ** DEV ** //
        //this.model.forceComplete_();
      },

      gameCompleteHandler_: function()
      {
        //log(this + '::gameCompleteHandler()');
        this.completePanel_.show();
      },

      reset_: function()
      {
        //log(this + '::reset()');
        this.completePanel_.hide();
        this.model.resetData();
      }

    });

    return GameView;
  }
);