_.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };

require.config({
  paths: {
    text: '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.10/text',

    templates: '../templates'
  }
});

require(['recent', 'create'], function(recent, create) {
  recent.update();
});

