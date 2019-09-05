import Component from '@ember/component';
import { action } from '@ember/object';
import { classNames } from '@ember-decorators/component';

@classNames('summary-detail')
export default class SummaryDetail extends Component {
  @action
  onClose() {
    if (typeof this.close === 'function') {
      this.close();
    }
  }
}
