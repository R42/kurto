define(['views/recent', 'views/busy'], function(setupView, busy) {

  var PREFIX = document.location.origin + '/';

  var Single = Backbone.Model.extend({
    initialize: function() {
      this.set('prefix', PREFIX);
    }
  });

  var Collection = Backbone.Collection.extend({
    url: '/recent',
    model: Single
  });

  var collection = new Collection();
  setupView(collection);

  collection.update = update;
  function update() {
    return collection.fetch({reset: true});
  }

  return collection;
});
