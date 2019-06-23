import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import test from 'ember-sinon-qunit/test-support/test';

module('Integration | Component | header-toolbar/button', function(hooks) {
  setupRenderingTest(hooks);

  test('it passes up the provided values', async function(assert) {
    this.setProperties({
      OPEN: this.mock().once().withArgs('some service', {key: 'value', other: 'thing'})
    });
    await render(hbs`
      <HeaderToolbar::button
        @open={{action OPEN 'some service' (hash key='value' other='thing')}}
        data-test-button
      >
        Fire the open action
      </HeaderToolbar::button>
    `);

    assert.dom('[data-test-button]').hasText('Fire the open action');

    await click('[data-test-button]');
  });
});
