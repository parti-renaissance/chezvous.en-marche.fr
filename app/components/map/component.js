import L from 'mapbox.js';

import Component from '@ember/component';
import { tagName } from '@ember-decorators/component';

import config from '../../config/environment';
import TEMPLATES from './filter-templates';

L.mapbox.accessToken = config.mapboxToken;

@tagName('')
export default class Map extends Component {

  ZOOM_LEVEL = 20
  coordinates = []
  markers = []

  mapMarkers = []
  filters = []

  didInsertElement() {
    super.didInsertElement(...arguments);

    var map = L.mapbox.map('map', 'mapbox.light').setView(this.coordinates, this.ZOOM_LEVEL);

    const BOUNDS = L.latLngBounds();
    this.markers.forEach(marker => {
      this.mapMarkers.pushObject(L.marker(marker.coordinates).addTo(map));
      BOUNDS.extend(marker.coordinates);
    });

    // build filter labels
    this.markers.uniqBy('type').forEach(type => this.filters.push(TEMPLATES[type]));

    map.fitBounds(BOUNDS);

  }
}
