'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    sourcemaps: {
      enabled: true,
    },
    sassOptions: {
      includePaths: [
        'node_modules/include-media/dist',
      ],
    },
  });
  
  app.import('node_modules/normalize.css/normalize.css');
  return app.toTree();
};
