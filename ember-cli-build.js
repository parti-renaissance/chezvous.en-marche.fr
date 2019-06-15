'use strict';
const webpack = require('webpack');

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
    autoImport: {
      webpack: {
        plugins: [
          new webpack.DefinePlugin({
            'process.env.RESET_APP_DATA_TIMER': 60 * 2 * 1000,
          })
        ]
      }
    }
  });

  app.import('node_modules/normalize.css/normalize.css');
  return app.toTree();
};
