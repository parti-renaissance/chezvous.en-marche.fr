import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn, pauseTest } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | index', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('landing page', async function(assert) {
    server.createList('city-hit', 10);
    server.create('city-hit', {insee_code: 12345});
    await visit('/');

    assert.equal(currentURL(), '/');
    await fillIn('.city-search__input input', 'foo');

    assert.dom('.city-search__dropdown option').exists({count: 11});

    await fillIn('.city-search__dropdown select', '12345');
    await click('.city-search__submit button');

    assert.equal(currentURL(), '/map/12345');
  });
});
