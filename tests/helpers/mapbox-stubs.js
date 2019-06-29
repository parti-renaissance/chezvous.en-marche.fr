import sinon from 'sinon';
import mapboxgl from 'mapbox-gl';

export function setupMapbox(hooks) {
  hooks.beforeEach(function() {
    sinon.stub(mapboxgl, 'Map')
      .returns(sinon.stub({
        fitBounds() {},
        remove() {},
     }));

    sinon.stub(mapboxgl, 'Marker')
      .returns({
        setLngLat: sinon.stub().returnsThis(),
        addTo() {},
      });
  });

  hooks.afterEach(function() {
    mapboxgl.Marker.restore();
    mapboxgl.Map.restore();
  });
}
