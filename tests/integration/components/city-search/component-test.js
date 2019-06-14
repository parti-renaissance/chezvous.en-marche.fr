import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import test from 'ember-sinon-qunit/test-support/test';


module('Integration | Component | city-search', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<CitySearch />`);

    assert.dom('form.city-search').exists();
  });

  test('clicking submit calls onSubmit arg', async function(assert) {
    assert.expect(1);
    const submit = () => assert.ok('submit called');

    this.setProperties({ submit });

    await render(hbs`<CitySearch @onSubmit={{submit}}/>`);

    await click('.city-search__submit button');
  });

  test('typing in the field hits the algolia api with the typed value', async function() {
    const QUERY = 'foo';

    const cityIndex = {search() {}};
    this.mock(cityIndex)
      .expects('search')
      .once()
      .withArgs({ query: QUERY })
      .resolves({hits: []});

    this.set('cityIndex', cityIndex);
    await render(hbs`<CitySearch @cityIndex={{cityIndex}} />`);
    await fillIn('.city-search__input input', QUERY);
  });

  test('it fills in the dropdown with algolia results', async function(assert) {
    const cityIndex = {
      search: this.stub().resolves({
        hits: [{
          insee_code: 'foo',
        }, {
          insee_code: 'bar',
        }, {
          insee_code: 'baz'
        }],
      })
    };

    this.set('cityIndex', cityIndex);

    await render(hbs`<CitySearch @cityIndex={{cityIndex}} />`);
    await fillIn('.city-search__input input', 'foo');

    assert.dom('select option').exists({count: 3});
    assert.dom('select option:nth-child(1)').hasValue('foo');
    assert.dom('select option:nth-child(2)').hasValue('bar');
    assert.dom('select option:nth-child(3)').hasValue('baz');
  });

  test('if there is only one city, disable the dropdown', async function(assert) {
    const cityIndex = {
      search: this.stub().resolves({
        hits: [{
          insee_code: 'foo',
        }],
      })
    };

    this.set('cityIndex', cityIndex);

    await render(hbs`<CitySearch @cityIndex={{cityIndex}} />`);
    await fillIn('.city-search__input input', 'foo');

    assert.dom('select').isDisabled();

  });
});
