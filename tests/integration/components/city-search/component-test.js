import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import test from 'ember-sinon-qunit/test-support/test';


module('Integration | Component | city-search', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<CitySearch data-test-city-search />`);

    assert.dom('[data-test-city-search]').exists();
    assert.dom('[data-test-city-search-submit-button]').isDisabled('disabled at load');
  });

  test('clicking submit calls onSubmit arg', async function(assert) {
    assert.expect(1);
    const submit = () => assert.ok('submit called');

    this.setProperties({ submit });

    // initialize with a value for cities so button is not disabled
    await render(hbs`<CitySearch @onSubmit={{submit}} @cities={{true}}/>`);

    await click('[data-test-city-search-submit-button]');
  });

  test('typing in the field hits the algolia api with the typed value', async function() {
    const QUERY = 'foo';

    const cityIndex = {search() {}};
    this.mock(cityIndex)
      .expects('search')
      .once()
      .withArgs({ query: QUERY, restrictSearchableAttributes: ['name', 'postalCodes'] })
      .resolves({hits: []});

    this.set('cityIndex', cityIndex);
    await render(hbs`<CitySearch @cityIndex={{cityIndex}} />`);
    await fillIn('[data-test-city-search-input]', QUERY);
  });

  test('it fills in the dropdown with algolia results', async function(assert) {
    const cityIndex = {
      search: this.stub().resolves({
        hits: [{
          inseeCode: 'foo',
        }, {
          inseeCode: 'bar',
        }, {
          inseeCode: 'baz'
        }],
      })
    };

    this.set('cityIndex', cityIndex);

    await render(hbs`<CitySearch @cityIndex={{cityIndex}} />`);
    await fillIn('[data-test-city-search-input]', 'foo');

    assert.dom('select option').exists({count: 3});
    assert.dom('select option:nth-child(1)').hasValue('foo');
    assert.dom('select option:nth-child(2)').hasValue('bar');
    assert.dom('select option:nth-child(3)').hasValue('baz');
  });

  test('if there is only one city, disable the dropdown', async function(assert) {
    assert.expect(2);

    const CITY = { inseeCode: 'foo' };
    const CITY_INDEX = {
      search: this.stub().resolves({
        hits: [CITY],
      })
    };
    const ON_SUBMIT = city => assert.deepEqual(city, CITY, 'submitting should pass only city');

    this.setProperties({ ON_SUBMIT, CITY_INDEX });

    await render(hbs`<CitySearch @cityIndex={{CITY_INDEX}} @onSubmit={{ON_SUBMIT}} />`);
    await fillIn('[data-test-city-search-input]', 'foo');

    assert.dom('select').isDisabled();

    await click('[data-test-city-search-submit-button]');
  });

  test('submitting calls onChange with the selected city object', async function(assert) {
    assert.expect(1);

    const CITIES = [{
      name: 'foo',
      inseeCode: '123'
    }, {
      name: 'bar',
      inseeCode: '456'
    }];
    const ON_SUBMIT = city => assert.deepEqual(city, CITIES[1], 'should pass in selected city');
    this.setProperties({ CITIES, ON_SUBMIT });

    await render(hbs`<CitySearch @cities={{CITIES}} @onSubmit={{ON_SUBMIT}} />`);
    await fillIn('[data-test-city-search-select]', '456'); // select second option
    await click('[data-test-city-search-submit-button]');
  });

  test('submitting without choosing a city submits the first city', async function(assert) {
    assert.expect(1);

    const CITIES = [{
      name: 'foo',
      inseeCode: '123'
    }, {
      name: 'bar',
      inseeCode: '456'
    }];
    const CITY_INDEX = {
      search: this.stub().resolves({
        hits: CITIES,
      })
    };

    const ON_SUBMIT = city => assert.deepEqual(city, CITIES[0], 'should pass in the first city');

    this.setProperties({ CITY_INDEX, ON_SUBMIT });

    await render(hbs`<CitySearch @cityIndex={{CITY_INDEX}} @onSubmit={{ON_SUBMIT}} />`);
    await fillIn('[data-test-city-search-input]', 'foo');

    // don't use the dropdown
    await click('[data-test-city-search-submit-button]');
  });
});
