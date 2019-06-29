import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn, settled } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

import { setupMapbox } from '../helpers/mapbox-stubs';

module('Acceptance | index', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  setupMapbox(hooks);

  test('landing page', async function(assert) {
    server.createList('city-hit', 10);
    server.create('city-hit', {insee_code: '12345'});
    await visit('/');

    assert.equal(currentURL(), '/');
    await fillIn('[data-test-city-search-input]', 'paris');

    // wait for ember concurrency tasks
    await settled();

    assert.dom('[data-test-city-search-select] option').exists({count: 11});

    await fillIn('[data-test-city-search-select]', '12345');
    await click('[data-test-city-search-submit-button]');

    assert.equal(currentURL(), '/map/12345');
  });
});
