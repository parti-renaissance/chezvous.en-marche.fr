import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import test from 'ember-sinon-qunit/test-support/test';

module('Integration | Component | footer/feedback', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<Footer::feedback/>`);

    assert.dom('[data-test-report]').exists();
  });

  test('email feedback', async function() {
    const SUBJECT = "Signalement d'une erreur sur Ce qui a changé près de chez vous";
    const BODY = `Je souhaite signaler une erreur sur ${window.location}`;
    this.mock(window)
      .expects('open')
      .withArgs(`mailto:idees@en-marche.fr?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`);

    await render(hbs`<Footer::feedback />`);

    await click('[data-test-report]');
  })
});
