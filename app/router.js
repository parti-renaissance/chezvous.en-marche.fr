import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('map', function() {
    // eslint-disable-next-line ember/routes-segments-snake-case
    this.route('city', {path: ':inseeCode'});
  });
});

export default Router;
