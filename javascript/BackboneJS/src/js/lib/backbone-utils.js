/**
 * Created with JetBrains WebStorm.
 * User: kholland
 * Date: 29/05/13
 * Time: 12:50 PM
 * To change this template use File | Settings | File Templates.
 */

define(
  ['lib/backbone'],
  function(Backbone)
  {
    /**
     * Debug helpers - if name is defined as a property of the class
     * it is used when logging 'this'
     */
    Backbone.View.prototype.toString = function()
    {
      return this.name || 'UnnamedView';
    };
    Backbone.Model.prototype.toString = function()
    {
      return this.name || 'UnnamedModel';
    };
    Backbone.Collection.prototype.toString = function()
    {
      return this.name || 'UnnamedCollection';
    };
    Backbone.Router.prototype.toString = function()
    {
      return this.name || 'UnnamedRouter';
    };

    /**
     * AddChild helper - appends child object's element to the parent's
     * element and re-invokes event binding.
     * @param {Backbone.View} childView
     * @returns {Backbone.View}
     */
    Backbone.View.prototype.addChild = function(childView)
    {
      if(!childView || !childView.el)
      {
        throw new Error('No element on childView to add');
        return;
      }
      this.$el.append(childView.el);
      this.delegateEvents();
      return childView;
    };

    /**
     * RemoveChild helper - removes child object's element from parent's
     * element and invokes event unbinding.
     * @param {Backbone.View} childView
     * @returns {Backbone.View}
     */
    Backbone.View.prototype.removeChild = function(childView)
    {
      if(!childView || !childView.$el)
      {
        throw new Error('No element on childView to remove');
        return;
      }
      childView.$el.remove();
      childView.undelegateEvents();
      this.delegateEvents();
      return childView;
    };

    /**
     * Helper for models to create getter/setters for known attributes.
     * @param {string} propertyName
     * @param {function=} getter optional
     * @param {function=} setter optional
     */
    Backbone.Model.prototype.createAccessors = function(
        propertyName, getter, setter)
    {
      //log('proto: ' + this.prototype.);
      var f = {};
      if(getter) f.get = typeof(getter)=='function' ? getter :
        function(){return this.get(propertyName);}
      if(setter) f.set = typeof(setter)=='function' ? setter :
        function(v){return this.set(propertyName, v);}

      Object.defineProperty(this, propertyName, f)
    }

    // Shortcut for logging //
    window.log = function(msg)
    {
      var d = new Date();
      console.log(msg);
    }

  }
)

