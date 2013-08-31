/**
 * Created with JetBrains WebStorm.
 * User: kholland
 * Date: 27/05/13
 * Time: 2:33 PM
 * To change this template use File | Settings | File Templates.
 */

define(
  [
    'view/TileView',
    'model/GameModel',
    'config/Events'
  ],

  function(TileView, GameModel, Events)
  {
    var TileBoardView = Backbone.View.extend({

      name: 'TileBoardView',
      tiles: [],
      model: GameModel,

      events:
      {
        'click #resetBtn': 'reset'
      },

      initialize: function()
      {
        this.render();
        this.model.tiledata.on('change', this.update_, this);
        this.model.on(Events.GAME_RESET, this.render, this);
      },

      render: function()
      {
        var tiles = this.model.tiledata.tiles;
        /*log(
          this + '::render() - ' + tiles.length + ' tiles'
        );*/

        this.clear_();
        for(var i=0;i <tiles.length; i++)
        {
          this.tiles.push(
            this.addChild(
              new TileView({model: tiles[i]})
            )
          );
        }
      },

      update_: function(itemModel)
      {
        //log(this + '::update()');
        // ignore de-selection of correct items //
        if(itemModel.correct) return;
        if('selected' in itemModel.changed) this.compareTiles_();
      },

      compareTiles_: function()
      {
        var selection = this.model.getSelectedTiles();
        if(selection.length < 2) return;

        //log(this + '::compareTiles()');

        var correct = selection[0].setId == selection[1].setId;
        selection[0].correct = selection[1].correct = correct;

        setTimeout(
          _.bind(this.checkComplete_, this),
          300
        );
      },

      checkComplete_:function()
      {
        //log(this + '::checkComplete()');

        // Deselect any selected tiles //
        this.model.getSelectedTiles().forEach(
          function(item)
          {
            item.selected = false;
          }
        );

        // Check for game completion //
        if(this.model.getUnmatchedTiles().length == 0)
        {
          this.trigger(Events.GAME_COMPLETE);
        }
      },

      reset: function()
      {
        this.model.tiles.forEach(
          function(item)
          {
            item.reset();
          }
        );
      },

      clear_: function()
      {
        while(this.tiles.length) this.tiles.pop().dispose();
        this.$el.empty();
      }

    });

    return TileBoardView;
  }
);