import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { classNames, tagName } from '@ember-decorators/component';

@classNames('header-toolbar')
@tagName('header')
export default class HeaderToolbar extends Component {
  @service router

  @action
  goToCity(city) {
    this.router.transitionTo('map.city', city);
  }
}
