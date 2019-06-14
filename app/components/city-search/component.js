import algoliasearch from 'algoliasearch/lite';

import { isBlank } from '@ember/utils';
import Component from '@ember/component';
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

  insee_code = null;

  constructor() {
    super(...arguments);
    this.cityIndex = cityIndex;
  }

  @restartableTask
  doQuery = function*(query) {
    if (isBlank(query)) {
      return {};
    }

    // wait DEBOUNCE_MS before hitting the server again
    yield timeout(this.DEBOUNCE_MS);
    let response = yield this.cityIndex.search({query});
    return response;
  }

  submit(e) {
    e.preventDefault();
    if (this.onSubmit) {
      this.onSubmit(this.insee_code);
    }
  }

  @restartableTask
  queryCities = function*(value) {
    let response = yield this.doQuery.perform(value);
    this.set('cities', response.hits);
  }
}
