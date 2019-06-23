import Component from '@ember/component';
import { action } from '@ember/object';
import { classNames } from '@ember-decorators/component';

@classNames('map-filter')
export default class MapFilter extends Component {

  // passed in by map component
  @action
  onchange() {
    if (this.filter) {
      this.filter(this.type);
    }
  }
}
