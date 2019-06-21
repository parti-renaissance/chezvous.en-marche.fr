import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn, settled } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | map', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /map', async function(assert) {
    await visit('/map');
    assert.equal(currentURL(), '/map');
  });

  test('visiting a city', async function(assert) {
    const NAME = 'Foo';
    server.create('city-hit', {
      name: NAME,
      insee_code: '1234',
      markers: [{
        type: "creation_maison_service_au_public",
        coordinates: [ 48.5815276, 7.7407641 ]
      }, {
        type: "other_type",
        coordinates: [ 48.6815276, 7.8407641 ]
      }],
      summary: [{
        type: "creation_force_police_securite_quotidien",
      }, {
        type: "total_nouvelles_maisons_service_au_public_departement",
      }],
    });

    await visit('/map/1234');

    assert.dom('[data-test-city-name]').hasText(NAME);
    assert.dom('[data-test-summary]').exists({count: 2});
    assert.dom('[data-test-filter] input').exists({count: 2});
  });

  test('searching for a new city', async function(assert) {
    server.create('city-hit', {insee_code: '1234'})

    await visit('/map/1234');

    await click('[data-test-search]');

    await fillIn('[data-test-city-search-input]', 'foo');

    await settled();

    assert.dom('[data-test-city-search-select] option').exists({count: 11});

    await fillIn('[data-test-city-search-select]', 'foo');
    await click('[data-test-city-search-submit-button]');

    assert.equal(currentURL(), '/map/foo');
  });
});
