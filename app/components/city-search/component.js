import algoliasearch from 'algoliasearch/lite';

import { isBlank } from '@ember/utils';
import Component from '@ember/component';
import { filter } from '@ember/object/computed';
import { tagName, classNames } from '@ember-decorators/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';

import config from '../../config/environment';


const client = algoliasearch(config.algoliaApp, config.algoliaApiKey);
const cityIndex = client.initIndex(config.cityIndex);

@tagName('form')
@classNames('city-search')
export default class CitySearch extends Component {

  DEBOUNCE_MS = 25;
  cities = [];

  constructor() {
    super(...arguments);
    this.cityIndex = cityIndex;
  }

  submit(e) {
    e.preventDefault();
    if (this.onSubmit) {
      let [ selectedCity ] = this.filteredCity;
      this.onSubmit(selectedCity);
    }
  }

  // returns an array
  @filter('cities', function(city) {
    return city.inseeCode === this.inseeCode;
  }) filteredCity

  @restartableTask
  queryCities = function*(value) {
    let { hits:cities } = yield this.doQuery.perform(value);
    this.set('cities', cities);

    // first city is viewable in the dropdown
    // make it the selected city as well
    if (cities.length) {
      this.set('inseeCode', cities[0].inseeCode);
    }
  }

  @restartableTask
  doQuery = function*(query) {
    if (isBlank(query)) {
      return {};
    }

    // wait DEBOUNCE_MS before hitting the server again
    yield timeout(this.DEBOUNCE_MS);

    const SEARCH_PARAMS = {
      query: query,
      restrictSearchableAttributes: ['name', 'postalCodes']
    };

    let response = yield this.cityIndex.search(SEARCH_PARAMS);
    return response;
  }
}
