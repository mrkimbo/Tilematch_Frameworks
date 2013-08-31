/**
 * Created with JetBrains WebStorm.
 * User: kholland
 * Date: 27/05/13
 * Time: 2:33 PM
 * To change this template use File | Settings | File Templates.
 */

define(
  [
    'model/Tile'
  ],

  function(Tile)
  {
    var TileView = Backbone.View.extend({

      name: 'TileView',
      el: 'div',
      model: Tile,
      template: _.template($('#tile-template').html()),

      events:
      {
        'click': 'clickHandler_'
      },

      initialize: function()
      {
        this.render();
        this.model.on('change:selected', this.updateClass_, this);
        this.model.on('change:correct', this.updateClass_, this);
      },

      render: function()
      {
        // replace stub element with rendered template html //
        this.setElement(this.template(this.model.toJSON()));
      },

      updateClass_: function()
      {
        //log(this + '::updateClass()');
        this.$el.toggleClass('selected', this.model.selected);
        this.$el.toggleClass('correct', this.model.correct);
      },

      clickHandler_: function()
      {
        if(this.model.correct) return;
        this.model.selected = !this.model.selected;
      },

      dispose: function()
      {
        if(this.$el.length)
        {
          this.$el.remove();
        }
      }
    });

    return TileView;
  }
);