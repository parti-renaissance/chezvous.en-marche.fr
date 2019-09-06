import Component from '@ember/component';
import { computed, action } from '@ember/object';
import { reads, or } from '@ember/object/computed';
import { classNames } from '@ember-decorators/component';

import TEMPLATES from './summary-templates';

@classNames('summary')
export default class Summary extends Component {

  TEMPLATES = TEMPLATES

  @reads('summary.type.code')
  type

  @computed('type')
  get metadata() {
    return this.TEMPLATES[this.type];
  }

  @or('summary.type.label', 'type')
  label

  @reads('summary.type.sourceLink')
  sourceLink

  @reads('summary.type.sourceLabel')
  sourceLabel

  @reads('summary.type.updatedAt')
  updatedAt

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
