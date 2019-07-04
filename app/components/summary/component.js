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
    let { payload = {} } = this.summary
    let { template } = this.metadata;

    Object.keys(payload).forEach(key => {
      if (typeof template === "function") {
        template = template(payload);

        return;
      }
      template = template.replace(`{{${key}}}`, payload[key]);
    });

    return template;
  }
}
