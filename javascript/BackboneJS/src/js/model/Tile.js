/**
 * Created with JetBrains WebStorm.
 * User: kholland
 * Date: 27/05/13
 * Time: 2:07 PM
 * To change this template use File | Settings | File Templates.
 */

define([], function()
{
  var Tile = Backbone.Model.extend({

    name: 'Tile',

    defaults: {
      // no objects required, do no parsing needed //
      src: '',
      setId: 0,
      selected: false,
      correct: false
    },

    initialize: function()
    {
      this.createAccessors('src', true);
      this.createAccessors('setId', true);
      this.createAccessors('selected', true, true);
      this.createAccessors('correct', true, true);
    },

    resetData: function()
    {
      this.selected = false;
      this.correct = false;
    }

  });

  return Tile;
});