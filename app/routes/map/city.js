import algoliasearch from 'algoliasearch/lite';

import Route from '@ember/routing/route';
import { action } from '@ember/object';

import config from '../../config/environment';


const client = algoliasearch(config.algoliaApp, config.algoliaApiKey);
const cityIndex = client.initIndex(config.cityIndex);

export default class CityRoute extends Route {
  model({ insee_code }) {
    const SEARCH_PARAMS = {
      query: insee_code,
      restrictSearchableAttributes: ['insee_code'],
    };
    return cityIndex.search(SEARCH_PARAMS).then(res => {
      if (res.hits.length) {
        return res.hits[0];
      } else {
        const NOT_FOUND = new Error(`City with Insee Code ${insee_code} not found`);
        NOT_FOUND.insee_code = insee_code;
        throw NOT_FOUND;
      }
    })
  }

  @action
  error(e) {
    console.log('no bueno', e.insee_code, e); // eslint-disable-line
  }
}
