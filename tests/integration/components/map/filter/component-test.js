import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import test from 'ember-sinon-qunit/test-support/test';

module('Integration | Component | map/filter', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    const LABEL = 'Foo';
    this.set('label', LABEL);
    await render(hbs`<Map::filter @label={{label}} data-test-map-filter />`);

    assert.dom('[data-test-map-filter]').exists();
    assert.dom('[data-test-map-filter-label]').hasText(LABEL);
  });

  test('it calls the provided filter argument with the given filter type', async function() {
    const TYPE = 'filter_type';
    this.setProperties({
      filter: this.mock('filter').once().withArgs(TYPE),
      TYPE,
    });

    await render(hbs`<Map::filter @filter={{filter}} @type={{TYPE}}/>`);

    await click('[data-test-filter-input]');
  });

  test('checked state is controlled by `@selected argument`', async function(assert) {
    this.set('selected', true);

    await render(hbs`<Map::filter @selected={{selected}} />`);

    assert.dom('[data-test-filter-input]').isChecked();

    this.set('selected', false);

    assert.dom('[data-test-filter-input]').isNotChecked();
  })
});
