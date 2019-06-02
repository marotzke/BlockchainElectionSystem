# API

## Usage

First install all dependencies running:

`$ npm install`

If you are running on a local ethereum blockchain (for example: ganache), start it with:

`$ ganache-cli`

Then migrate your contracts on `/blockchain` running:

`$ truffle migrate`

Then start the server:

`$ npm start`

## API Doc

The API Documentation's path is `public/index.html`

To build the documentation you need to install `apidoc` and run the following script:

`apidoc -f src/routes/index.js -o public/apidoc`