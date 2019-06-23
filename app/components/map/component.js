import mapboxgl from 'mapbox-gl';

import Component from '@ember/component';
import { computed, action, set } from '@ember/object';
import { classNames } from '@ember-decorators/component';

import config from '../../config/environment';
import TEMPLATES from './filter-templates';

mapboxgl.accessToken = config.mapboxToken;

@classNames('map')
export default class Map extends Component {

  TEMPLATES = TEMPLATES
  ZOOM_LEVEL = 14
  coordinates = []
  markers = []

  concreteMarkers = []

  @computed('markers')
  get filters() {
    return this.markers
      .uniqBy('type')
      .mapBy('type')
      .map(type => ({ type, label: this.TEMPLATES[type] || type, selected: true }));
  }

  @action
  filter(type) {
    const FILTER = this.filters.findBy('type', type);

    set(FILTER, 'selected', !FILTER.selected);

    this.concreteMarkers
      .filterBy('type', type)
      .forEach(marker => {
        if (FILTER.selected) {
          marker.addTo(this.map);
        } else {
          marker.remove();
        }
      });
  }

  didInsertElement() {
    super.didInsertElement(...arguments);

    this.map = new mapboxgl.Map({
      container: 'map-ui',
      style: 'mapbox://styles/mapbox/light-v9',
      // coordinates from algolia are [lat, long]
      // mapbox expects them to be [long, lat]
      center: [this.coordinates[1], this.coordinates[0]],
      zoom: this.ZOOM_LEVEL,
    });

    // make sure map is zoomed out enough to show all the markers
    const BOUNDS = new mapboxgl.LngLatBounds();

    this.markers.forEach(({ coordinates, type }) => {
      // coords from algolia are [lat, long]
      // mapbox expects them to be [long, lat]
      const coords = [coordinates[1], coordinates[0]];

      const marker = new mapboxgl.Marker().setLngLat(coords);
      marker.type = type;

      marker.addTo(this.map);

      // save markers locally for filtering
      this.concreteMarkers.pushObject(marker);

      // expand known set of bounds
      BOUNDS.extend(coords);
    });

    // fit to max bounds with a bit of padding
    this.map.fitBounds(BOUNDS, {padding: 50});
  }

  willDestroyElement() {
    super.willDestroyElement(...arguments);
    this.map.remove();
  }
}
