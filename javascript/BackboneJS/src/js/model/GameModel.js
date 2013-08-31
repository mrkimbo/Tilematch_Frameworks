/**
 * Created with JetBrains WebStorm.
 * User: kholland
 * Date: 27/05/13
 * Time: 4:22 PM
 * To change this template use File | Settings | File Templates.
 */

define(
  [
    'model/TileCollection',
    'config/Events'
  ],
  function (TileCollection, Events)
  {
    var GameModel = Backbone.Model.extend({

      defaults: {
        // tiles grouped into matching pairs //
        tiledata: [
          [
            { "src": "img/tiles/sealab.jpg" },
            { "src": "img/tiles/sealab.jpg" }
          ],[
            { "src": "img/tiles/louie.jpg" },
            { "src": "img/tiles/louie.jpg" }
          ],[
            { "src": "img/tiles/eagleheart.jpg" },
            { "src": "img/tiles/eagleheart.jpg" }
          ],[
            { "src": "img/tiles/breaking_bad.jpg" },
            { "src": "img/tiles/breaking_bad.jpg" }
          ],[
            { "src": "img/tiles/brak.jpg" },
            { "src": "img/tiles/brak.jpg" }
          ],[
            { "src": "img/tiles/boston_legal.jpg" },
            { "src": "img/tiles/boston_legal.jpg" }
          ],[
            { "src": "img/tiles/archer.jpg" },
            { "src": "img/tiles/archer.jpg" }
          ],[
            { "src": "img/tiles/american_dad.jpg" },
            { "src": "img/tiles/american_dad.jpg" }
          ],[
            { "src": "img/tiles/adventure_time.jpg" },
            { "src": "img/tiles/adventure_time.jpg" }
          ]
        ]
      },

      name: 'GameModel',
      model: TileCollection,

      initialize: function()
      {
        this.createAccessors('tiledata', true);
        this.set('tiledata', this.parse(this.tiledata));
        this.tiledata.shuffle();
      },

      parse: function(data)
      {
        // Convert initial json into proper models //
        return new TileCollection(data, {parse:true});
      },

      resetData: function()
      {
        this.tiledata.resetData();
        this.tiledata.shuffle();
        this.trigger(Events.GAME_RESET);
      },

      forceComplete_: function()
      {
        this.tiledata.tiles.forEach(
          function(item)
          {
            // leave one pair incomplete //
            item.correct = item.setId > 0;
          }
        );
      },

      getSelectedTiles: function()
      {
        return this.tiledata.tiles.filter(
          function(item)
          {
            return item.selected;
          }
        );
      },

      getUnmatchedTiles: function()
      {
        return this.tiledata.tiles.filter(
          function(item)
          {
            return !item.correct;
          }
        )
      }

    });

    return GameModel;
  }
);