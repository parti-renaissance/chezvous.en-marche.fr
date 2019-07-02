/* eslint-env node */
'use strict';

module.exports = function(deployTarget) {
  let ENV = {
    build: {},
    'gcloud-storage': {
      credentials: {
        private_key: process.env.GCS_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.GCS_CLIENT_EMAIL,
      },
      projectId: process.env.GCS_PROJECT_ID,
      bucket: process.env.GCLOUD_BUCKET,
    }
  };

  if (deployTarget === 'dev') {
    ENV.build.environment = 'development';
    ENV.git = {
      commitMessage: 'Deploying [skip ci]',
    };
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'prod') {
    ENV.build.environment = 'prod';
    // configure other plugins for production deploy target here
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
