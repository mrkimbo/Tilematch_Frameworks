TileMatch - Backbone JS 
=======================

Tile matching game re-created in BackboneJS as a learning exercise. 
[Demo](http://tripleaxis.bitbucket.org/tilematch-backbone/)

---
Resources: 
http://addyosmani.github.io/backbone-fundamentals/#backbone-basics
http://ricostacruz.com/backbone-patterns/

---

*Thoughts:*

	The general concensus of Backbone is that it stays relatively out of your way and doesn't necessarily force you to develop your app in too strict a fashion.
	I found this to be pretty true, although I got hung up on the models a little as I immediately tried to use nested models and was expecting the parsing of models to instantiate classes automatically and slot things away in the correct places.
	It does not do this...
	
	*Models*
	I also found it a little cumbersome to use the 'get('prop')' and 'set('prop')' when accessing properties on a model that you know exist, but have been tucked away inside the 'attributes' object and therefore cannot be accessed by autocomplete IDEs and leave potential typo errors in property names.
	I understand the need for this, considering binding and change event notifications, but one of the first things I did was write a helper method to easily create ES5 getter/setters on a Backbone Model. These methods just abstracted the 'get' and 'set' methods away from the property that I was calling and removed the usage of unsafe strings. 
	This made the code scan a lot nicer..
	
	For example: Instead of using 
		personModel.get('age');
	you can use 
		personModel.age;
		
	I didn't use the automatic id wiring feature, but it looks like it could really come in handy navigating Collections and the like.
	
	*Views/Events*
	One thing I felt it was missing was an addChild/removeChild system and subsequent event management when Views are added and removed to the DOM.
	
	The events system is pretty straightforward and really makes things simple when it comes to model updates as the property name is broadcast as part of the event name and you can listen for quite specific events. 
	
	*Templates*
	I originally set this example up using runtime loaded data and templates (using the require text plugin) but you need a local server running in order to get this to work, so I dialled back to [inline templates] (http://ricostacruz.com/backbone-patterns/#inline_templates) as I wanted these examples to be as easy to setup and run as possible.
