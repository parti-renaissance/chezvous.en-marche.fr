import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setBreakpoint } from 'ember-responsive/test-support';
import { clickTrigger } from 'ember-basic-dropdown/test-support/helpers';


module('Integration | Component | header-toolbar', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    setBreakpoint('large');

    await render(hbs`<HeaderToolbar />`);

    assert.dom('[data-test-logo]').exists();
    assert.dom('[data-test-open-search]').exists();
    assert.dom('[data-test-feedback]').exists();
  });

  test('it hides the feedback controls behind a dropdown at smaller breakpoints', async function(assert) {
    setBreakpoint('medium');

    await render(hbs`<HeaderToolbar/>`);

    assert.dom('[data-test-feedback]').doesNotExist();

    await clickTrigger();

    assert.dom('[data-test-feedback]').exists();
  });

  test('it opens the search component', async function(assert) {
    await render(hbs`<HeaderToolbar />`);

    assert.dom('[data-test-city-search]').doesNotExist();

    await click('[data-test-open-search]');

    assert.dom('[data-test-city-search]').exists();
  })
});
