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

* `git clone git@github.com:enmarche/municipales` this repository
* `cd municipales`
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
 - Deploys to https://enmarche.github.io/municipales
- staging: ember deploy staging you can run this command from your machine
 - TBD commits to master will deploy to staging
- prod: ember deploy prod
 - TBD tags following semantic versioning will deploy to prod

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
