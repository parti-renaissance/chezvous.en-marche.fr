import algoliasearch from 'algoliasearch/lite';

import Route from '@ember/routing/route';
import { action } from '@ember/object';

import config from '../../config/environment';


const client = algoliasearch(config.algoliaApp, config.algoliaApiKey);
const cityIndex = client.initIndex(config.cityIndex);

export default class CityRoute extends Route {
  model({ inseeCode }) {
    const SEARCH_PARAMS = {
      query: inseeCode,
      restrictSearchableAttributes: ['inseeCode']
    };
    return cityIndex.search(SEARCH_PARAMS).then(res => {
      if (res.hits.length) {
        return res.hits[0];
      } else {
        const NOT_FOUND = new Error(`City with Insee Code ${inseeCode} not found`);
        NOT_FOUND.inseeCode = inseeCode;
        throw NOT_FOUND;
      }
    })
  }

  @action
  error(e) {
    console.log('no bueno', e.inseeCode, e); // eslint-disable-line
  }

  @action
  didTransition() {
    window.scrollTo(0, 0);
  }
}
