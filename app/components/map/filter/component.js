import Component from '@ember/component';
import { action } from '@ember/object';
import { classNames, className } from '@ember-decorators/component';

@classNames('map-filter')
export default class MapFilter extends Component {

  @className color

  // passed in by map component
  @action
  onchange() {
    if (this.filter) {
      this.filter(this.type);
    }
  }
}
