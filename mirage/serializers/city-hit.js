import { Serializer } from 'ember-cli-mirage';
import { camelize } from '@ember/string';

export default Serializer.extend({
  keyForModel: () => 'hits',
  keyForAttribute: attr => camelize(attr),
});
