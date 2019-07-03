import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import test from 'ember-sinon-qunit/test-support/test';

module('Integration | Component | header-toolbar/feedback', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<HeaderToolbar::feedback/>`);

    assert.dom('[data-test-report]').exists();
    assert.dom('[data-test-share-twitter]').exists();
    assert.dom('[data-test-share-facebook]').exists();
    assert.dom('[data-test-share-telegram]').exists();
  });

  test('twitter shares', async function() {
    const TITLE = 'Page Title';
    const VIA = 'enmarchefr';

    this.mock(window)
      .expects('open')
      .withArgs(`https://twitter.com/intent/tweet?text=${encodeURIComponent(TITLE)}&via=${encodeURIComponent(VIA)}&url=${encodeURIComponent(window.location)}`);

    this.setProperties({
      TITLE,
      URL,
    });

    await render(hbs`<HeaderToolbar::feedback @title={{TITLE}} @url={{URL}}/>`);

    await click('[data-test-share-twitter]');
  });

  test('facebook shares', async function() {
    this.mock(window)
      .expects('open')
      .withArgs(`https://www.facebook.com/sharer.php?u=${encodeURIComponent(window.location)}`);

    await render(hbs`<HeaderToolbar::feedback />`);

    await click('[data-test-share-facebook]');
  });

  test('telegram shares', async function() {
    this.mock(window)
      .expects('open')
      .withArgs(`https://telegram.me/share/url?url=${encodeURIComponent(window.location)}`);

    await render(hbs`<HeaderToolbar::feedback />`);

    await click('[data-test-share-telegram]');
  });

  test('email feedback', async function() {
    const SUBJECT = "Signalement d'une erreur sur Ce qui a changé près de chez vous";
    const BODY = `Je souhaite signaler une erreur sur ${window.location}`;
    this.mock(window)
      .expects('open')
      .withArgs(`mailto:idees@en-marche.fr?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`);

    await render(hbs`<HeaderToolbar::feedback />`);

    await click('[data-test-report]');
  })
});
