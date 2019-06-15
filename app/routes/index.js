import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  setupController(controller) {
    super.setupController(...arguments);
    controller.set('onSubmit', insee_code =>
      this.transitionTo('map', {insee_code}));
  }
}
