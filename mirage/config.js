import config from '../config/environment';


export default function() {
  this.urlPrefix = `https://${config.algoliaApp.toLowerCase()}-dsn.algolia.net`;
  this.namespace = '/1/indexes';

  this.post(`/${config.cityIndex}/query`, (schema, request) => {
    let { params } = JSON.parse(request.requestBody);
    params = decodeURIComponent(params)
      .split('&')
      .map(p => p.split('='))
      .reduce((params, [key, val]) => {params[key] = val; return params}, {});

    if (params.restrictSearchableAttributes && JSON.parse(params.restrictSearchableAttributes).includes('inseeCode')) {
      // looking at one city
      return schema.cityHits.where({ insee_code: params.query });
    } else {
      return schema.cityHits.all();
    }
  });

  this.passthrough('https://api.mapbox.com/**');

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.4.x/shorthands/
  */
}
