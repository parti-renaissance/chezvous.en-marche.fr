/* eslint-env node */
'use strict';

module.exports = function(deployTarget) {
  let ENV = {
    pipeline: {},
    build: {
      environment: 'production',
    },
    git: {
      commitMessage: 'Deploying [skip ci]',
    },
    'gcloud-storage': {
      keyFilename: './key.json',
      projectId: process.env.GCS_PROJECT_ID,
      bucket: process.env.GCLOUD_BUCKET,
    },
    'gcs-index': {
      keyFilename: './key.json',
      projectId: process.env.GCS_PROJECT_ID,
      bucket: process.env.GCLOUD_BUCKET,
      allowOverwrite: true,
    }
  };

  if (deployTarget === 'dev') {
    ENV.build.environment = 'development';
  }

  if (deployTarget === 'staging') {
    // staging config
    ENV.pipeline.activateOnDeploy = true;
  }

  if (deployTarget === 'prod') {
    // prod config
  }

  // only run git deploy in dev
  if (deployTarget !== 'dev') {
    ENV.pipeline.disabled = {
      git: true,
    };
  } else {
    ENV.pipeline.disabled = {
      'gcloud-storage': true,
      'gcs-index': true,
    };
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
