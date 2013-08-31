/**
 * Created with JetBrains WebStorm.
 * User: kholland
 * Date: 27/05/13
 * Time: 2:09 PM
 * To change this template use File | Settings | File Templates.
 */

define(
  ['model/Tile'],
  function(Tile)
  {
    var TileCollection = Backbone.Collection.extend({

      name: 'TileCollection',
      model: Tile,

      initialize: function()
      {

      },

      parse: function(data)
      {
        var m = [];
        for(var i=0; i<data.length; i++)
        {
          // apply a set id to each tile in the set //
          data[i][0].setId = data[i][1].setId = i;
          m.push(
            new Tile(data[i][0], {parse: true}),
            new Tile(data[i][1], {parse: true})
          );
        }
        return m;
      },

      resetData: function()
      {
        this.tiles.forEach(
          function(item)
          {
            item.resetData();
          }
        );
      },

      shuffle: function()
      {
        this.models.sort(
          function()
          {
            return Math.round(Math.random()) ? 1 : -1;
          }
        )
      }

    });

    Object.defineProperty(
      TileCollection.prototype, 'tiles',
      {
        get: function(){ return this.models }
      }
    );

    return TileCollection;
  }
);