import Component from '@ember/component';
import { computed } from '@ember/object';
import { classNames } from '@ember-decorators/component';

import TEMPLATES from './summary-templates';

@classNames('summary')
export default class Summary extends Component {

  TEMPLATES = TEMPLATES

  @computed('summary.type')
  get metadata() {
    let { type } = this.summary;
    return this.TEMPLATES[type];
  }

  @computed('metadata')
  get label() {
    return this.metadata ? this.metadata.label : this.summary.type;
  }

  @computed('metadata', 'summary.data')
  get details() {
    if (!this.metadata) {
      return '';
    }
    let { data = {} } = this.summary
    let { template } = this.metadata;

    Object.keys(data).forEach(key => {
      template = template.replace(`{{${key}}}`, data[key]);
    });
    return template;
  }
}
