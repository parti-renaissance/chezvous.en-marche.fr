import L from 'mapbox.js';

import Component from '@ember/component';
import { tagName } from '@ember-decorators/component';

import config from '../../config/environment';

L.mapbox.accessToken = config.mapboxToken;

@tagName('')
export default class Map extends Component {

  ZOOM_LEVEL = 20
  coordinates = []
  markers = []

  didInsertElement() {
    super.didInsertElement(...arguments);

    var map = L.mapbox.map('map', 'mapbox.light').setView(this.coordinates, this.ZOOM_LEVEL);

    const BOUNDS = L.latLngBounds();
    this.markers.forEach(marker => {
      L.marker(marker.coordinates).addTo(map);
      BOUNDS.extend(marker.coordinates);
    });

    map.fitBounds(BOUNDS);

  }
}
