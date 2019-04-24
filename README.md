# HotSpotlight

A bot built to gather network speeds over time and communicate to AT&T how much they underperform.

Tweets can be seen at [@DibCribSpeed](https://twitter.com/DibCribSpeed)

## Third Party Libraries

### App

- [dotenv](https://github.com/motdotla/dotenv) - Environment variable handler
- [node-cron](https://github.com/kelektiv/node-cron) - Cron for NodeJS
- [twitter](https://www.npmjs.com/package/twitter) - Twitter API

### Dev Tooling

- [cross-env](https://github.com/kentcdodds/cross-env) - Environment scripts
- [eslint](https://eslint.org/) - JS linter
- [eslint-config-airbnb-base](https://github.com/airbnb/javascript) - Linting style guide
- [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import) - Proper import guide
- [nodemon](https://github.com/remy/nodemon) - Watcher

### Testing

- [chai](https://github.com/chaijs/chai) - Assertion framework
- [mocha](https://github.com/mochajs/mocha) - Test framework
- [nyc](https://github.com/istanbuljs/nyc) - Istanbul CLI

## Setup

Clone the repository:

```sh
$ git clone https://github.com/acdibble/rasp-pi-speed-bot
```

Install dependencies:

```sh
$ npm install
```

## Start

Start the development server at [http://localhost:3000](http://localhost:3000) (implicitly rebuilds on code changes):

```sh
$ npm run dev
```

## Style Guide

This project follows the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript#airbnb-javascript-style-guide-).
