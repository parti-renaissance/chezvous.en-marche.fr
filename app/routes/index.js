import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  setupController(controller) {
    super.setupController(...arguments);
    controller.set('onSubmit', city => this.transitionTo('map', city));
  }
}
