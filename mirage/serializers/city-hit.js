import { Serializer } from 'ember-cli-mirage';

export default Serializer.extend({
  keyForModel() {
    return 'hits';
  }
});
