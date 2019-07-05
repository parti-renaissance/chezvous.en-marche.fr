import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import test from 'ember-sinon-qunit/test-support/test';

import mapboxgl from 'mapbox-gl';

module('Integration | Component | map', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.stub(mapboxgl, 'Map')
      .returns(this.stub({
        fitBounds() {},
        remove() {},
     }));

    this.stub(mapboxgl, 'Marker')
      .returns({
        setLngLat: this.stub().returnsThis(),
        addTo() {},
      });
    await render(hbs`<Map />`);

    assert.dom('[data-test-map]').exists();
  });

  test('calls mapbox functions with expected args', async function() {
    const ZOOM = 10;
    const MARKERS = [{
      coordinates: [49, 24],
    }, {
      coordinates: [77, -62],
    }];
    const COORDS = {
        "lat": 20,
        "lng": 70
    };

    this.setProperties({ MARKERS, COORDS, ZOOM });

    this.mock(mapboxgl)
      .expects('Map')
      .withArgs({
        container: 'map-ui',
        style: 'mapbox://styles/mapbox/light-v9',
        center: [COORDS.lng, COORDS.lat],
        zoom: ZOOM,
      })
      .returns({
        fitBounds: this.mock().once(),
        remove() {},
      });

    this.mock(mapboxgl)
      .expects('Marker')
      .twice()
      .returns({
        setLngLat: this.stub().returnsThis(),
        addTo() {},
      });

    await render(hbs`<Map @coordinates={{COORDS}} @markers={{MARKERS}} @ZOOM_LEVEL={{ZOOM}} />`);

  });
});
