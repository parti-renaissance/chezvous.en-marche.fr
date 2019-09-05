import Component from '@ember/component';
import { computed, action } from '@ember/object';
import { classNames } from '@ember-decorators/component';

import TEMPLATES from './summary-templates';

@classNames('summary')
export default class Summary extends Component {

  TEMPLATES = TEMPLATES

  @computed('summary')
  get type() {
    if (this.summary && this.summary.type) {
      return this.summary.type.code;
    } else {
      return null;
    }
  }

  @computed('type')
  get metadata() {
    return this.TEMPLATES[this.type];
  }

  @computed('metadata')
  get label() {
    return this.metadata ? this.metadata.label : this.type;
  }

  @computed('metadata', 'summary.payload')
  get details() {
    if (!this.metadata) {
      return '';
    }
    let { payload = {} } = this.summary
    let { template } = this.metadata;

    if (typeof template === "function") {
      return template(payload);
    }

    Object.keys(payload).forEach(key => {
      template = template.replace(`{{${key}}}`, payload[key]);
    });

    return template;
  }

  @action
  choose() {
    if (typeof this.chooseSummary === 'function') {
      this.chooseSummary();
    }
  }
}
