import algoliasearch from 'algoliasearch/lite';

import Component from '@ember/component';
import config from '../../config/environment';


const client = algoliasearch(config.algoliaApp, config.algoliaApiKey);
const cityIndex = client.initIndex(config.cityIndex);

export default class CityNearby extends Component {
  cities = []

  constructor() {
    super(...arguments);
    this.cityIndex = cityIndex;
  }

  queryNearbyCities() {
    let latLng = this.coordinates.lat+', '+this.coordinates.lng;

    const SEARCH_PARAMS = {
      aroundLatLng: latLng,
      aroundRadius: 100000
    };

    let { hits:cities } = this.cityIndex.search(SEARCH_PARAMS).then(({ hits } = {}) => {
      // first result is the current city
      hits.shift();
      this.set('cities', hits);
    }).catch(() => {
      this.set('cities', []);
    });

    this.set('cities', cities);
  }

  didInsertElement() {
    super.didInsertElement(...arguments);

    this.queryNearbyCities();
  }
}
