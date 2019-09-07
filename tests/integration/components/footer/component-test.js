import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setBreakpoint } from 'ember-responsive/test-support';


module('Integration | Component | footer', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    setBreakpoint('large');

    await render(hbs`<Footer />`);

    assert.dom('[data-test-report]').exists();
  });
});
