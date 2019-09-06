import { animate } from 'liquid-fire';

export default function() {
  this.transition(
    this.hasClass('city-search-wrapper'),
    this.use('explode', {
      pick: '.ember-modal-overlay',
      use: ['fade', {duration: 250}]
    }, {
      pick: '.ember-modal-dialog',
      use: [slideThenFade],
    }),
  );
  this.transition(
    this.hasClass('summary-detail-wrapper'),
    this.use('explode', {
      pick: '.ember-modal-overlay',
      use: ['fade', {duration: 125}]
    }, {
      pick: '.ember-modal-dialog',
      use: [slideInOut],
    }),
  );
}

function slideThenFade() {
  // if there's a new element, it's forward animation
  if (this.newElement) {
    const inner = this.newElement.find('.city-search-modal__inner');
    inner.css('opacity', 0);

    return this.lookup('to-down').call(this, {duration: 250, easing: 'easeInOut'})
      .then(() => animate(inner, {opacity: 1, duration: 250}));
  } else {
    return this.lookup('to-up').call(this, {duration: 200, easing: 'easeOut'});
  }
}

function slideInOut() {
  const OPS = {duration: 125, easing: 'easeInOut'};
  if (this.newElement) {
    return this.lookup('to-left').call(this, OPS);
  } else {
    return this.lookup('to-right').call(this, OPS);
  }
}
