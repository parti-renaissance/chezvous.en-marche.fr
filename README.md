# It Happened Near You (en Anglais)

Explore all the new improvements that the Macron presidency has brought to the localities.

Search by your postal code and choose the city nearest you to view a map of all the places the administration has made investments.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone git@github.com:enmarche/chezvous.en-marche.fr chezvous` this repository
* `cd chezvous`
* `yarn install`

## Running / Development

Make an .env file file
`$ cp .env.sample .env`

Run the app
`ember serve`

Visit your app at [http://localhost:4200](http://localhost:4200).
Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `yarn lint:hbs`
* `yarn lint:js`
* `yarn lint:js --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

This project uses ember-cli-deploy to run deployments.

There are three environments, each with its own command.

- dev: ember deploy dev
 - Deploys to https://enmarche.github.io/chezvous.en-marche.fr
- staging: ember deploy staging you can run this command from your machine
 - Deploys to https://staging-chezvous.en-marche.fr
 - commits to master will deploy to staging
- prod: ember deploy prod
 - Deploys to https://chezvous.en-marche.fr
 - tags following semantic versioning will deploy to prod

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

## Static Templates

There are two types of templates compiled with the app:
- `app/components/summary/summary-templates.js`
- `app/components/map/filter-templates.js`

Both are a hashmap relating a key to a small set of data. `summary-templates` maps a `label` to be used a header for the summary, and a `template`, with placeholders in `{{ }}` curly brackets. `filter-templates` maps a marker `type` to a `color` and a `label`. The `label` is displayed in a user control, and the `color` name is used to color corresponding map markers and the user control as well.

## Adding new Colors and Types

Simply follow the established data structures within the two template files to add either a new marker or summary type.

To associate a color with a marker type, two new CSS rules must be added: one for the filter control and one for the marker itself. These rules are driven by the value specified for the `color` key in the `filter-templates` file, so if you've got a filter type (for a map marker) defined like so:
```js
// app/components/map/filter-templates.js
export default {
  ...
  new_fiber_optics: {
    label: "New Fiber Optics (but in French)",
    color: "seafoam",
  },
  ...
};
```

Then you'd be using the value `seafoam` to add the CSS rules. Both rules should be added to `app/styles/components/_map.scss`. We're making use of the CSS variable `currentColor` in both cases, which is why we set the `color` style.

To add a a css rule for the input itself, find the `.map-filter` rule block, and add a nested selector for the color, like so:
```sass
// app/styles/components/_map.scss
.map-filter {
  ...

  &.seafoam .map-filter__input:checked {
    color: // whatever color seafoam is
  }
}
```

This will make the `new_fiber_optics` filter control have a background of whatever value you put in there.

To add a css rule for the marker, add a `.color--seafoam` rule that specifies the `color` value. There are a set of existing color rules at the bottom of `app/styles/components/_map.scss`.
```sass
// app/styles/components/_map.scss
.color--seafoam {
  color: // whatever color seafoam is
}
```
