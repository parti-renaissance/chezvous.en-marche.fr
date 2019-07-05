import { Serializer } from 'ember-cli-mirage';
import { camelize } from '@ember/string';

export default Serializer.extend({
  keyForModel: () => 'hits',
  keyForAttribute: function (attr) {
    if ('_geoloc' === attr) {
      return attr;
    }

    return camelize(attr)
  },
});
