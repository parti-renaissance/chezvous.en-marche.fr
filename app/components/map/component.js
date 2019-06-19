import L from 'mapbox.js';

import Component from '@ember/component';
import { tagName } from '@ember-decorators/component';

import config from '../../config/environment';

L.mapbox.accessToken = config.mapboxToken;

@tagName('')
export default class Map extends Component {

  didInsertElement() {
    super.didInsertElement(...arguments);

    var map = L.mapbox.map('map', 'mapbox.light').setView(this.coordinates, 20);

    const BOUNDS = L.latLngBounds();
    this.markers.forEach(marker => {
      L.marker(marker.coordinates, {draggable: true}).addTo(map);
      BOUNDS.extend(marker.coordinates);
    });

    map.fitBounds(BOUNDS);

  }
}
