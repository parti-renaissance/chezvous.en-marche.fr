import mapboxgl from 'mapbox-gl';

import Component from '@ember/component';
import { tagName } from '@ember-decorators/component';

import config from '../../config/environment';
import TEMPLATES from './filter-templates';

mapboxgl.accessToken = config.mapboxToken;

@tagName('')
export default class Map extends Component {

  ZOOM_LEVEL = 20
  coordinates = []
  markers = []

  mapMarkers = []
  filters = []

  didInsertElement() {
    super.didInsertElement(...arguments);

    this.map = window.map = new mapboxgl.Map({
      container: 'map-ui',
      style: 'mapbox://styles/mapbox/light-v9',
      center: [this.coordinates[1], this.coordinates[0]],
      zoom: this.ZOOM_LEVEL,
    });

    // build filter labels
    this.markers.uniqBy('type').forEach(type => this.filters.push(TEMPLATES[type]));
    const BOUNDS = new mapboxgl.LngLatBounds();

    this.markers.forEach(({ coordinates, type }) => {
      const coords = [coordinates[1], coordinates[0]];
      const marker = new mapboxgl.Marker().setLngLat(coords);
      marker.addTo(this.map);
      BOUNDS.extend(coords);
    });

    this.map.fitBounds(BOUNDS, {padding: 50});
  }
}
