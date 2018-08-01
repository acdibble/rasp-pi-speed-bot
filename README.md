# HotSpotlight

A bot built to gather network speeds over time and communicate to AT&T how much they underperform.

Tweets can be seen at [@DibCribSpeed](https://twitter.com/DibCribSpeed)

## Third Party Libraries

### App

* [dotenv](https://github.com/motdotla/dotenv) - Environment variable handler
* [mathjs](http://mathjs.org/) - JS math library
* [mongoose](https://github.com/Automattic/mongoose) - MongoDB ODM
* [node-cron](https://github.com/kelektiv/node-cron) - Cron for NodeJS
* [puppeteer](https://github.com/GoogleChrome/puppeteer) - Headless Chrome Node API
* [twitter](https://www.npmjs.com/package/twitter) - Twitter API

### Dev Tooling

* [eslint](https://eslint.org/) - JS linter
* [nodemon](https://github.com/remy/nodemon) - Change monitor

### Build Tooling

* [babel](https://babeljs.io/) - JS compiler

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
