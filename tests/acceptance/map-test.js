import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | map', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /map', async function(assert) {
    await visit('/map');

    assert.equal(currentURL(), '/map');
  });
});
