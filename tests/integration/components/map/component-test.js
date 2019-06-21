import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import test from 'ember-sinon-qunit/test-support/test';

import L from 'mapbox.js';

module('Integration | Component | map', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.stub(L.mapbox, 'map')
      .returns({
        setView: () => this.stub({ fitBounds() {} })
      });

    this.stub(L, 'marker')
      .returns({
        addTo() {},
      });
    await render(hbs`<Map />`);

    assert.dom('[data-test-map]').exists();
  });

  test('calls mapbox functions with expected args', async function() {
    const ZOOM = 10;
    const MARKERS = [{
      coordinates: [123, 456],
    }, {
      coordinates: [789, 102],
    }];
    const COORDS = [1111, 2222];

    this.setProperties({ MARKERS, COORDS, ZOOM });

    this.stub(L.mapbox, 'map')
      .returns({
        setView: this.mock().withArgs(COORDS, ZOOM).returns({ fitBounds: this.mock().once() })
      });

    this.mock(L)
      .expects('marker')
      .twice()
      .returns({
        addTo() {}
      });

    await render(hbs`<Map @coordinates={{COORDS}} @markers={{MARKERS}} @ZOOM_LEVEL={{ZOOM}} />`);

  });
});
