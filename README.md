README. md#Node.js Etherscan API

[![npm](https://img.shields.io/npm/v/node-etherscan-api.svg?style=flat-square)](https://www.npmjs.com/package/node-etherscan-api)
[![Travis branch](https://img.shields.io/travis/danakt/node-etherscan-api/master.svg?style=flat-square)](https://travis-ci.org/danakt/node-etherscan-api)

Node.js package to interact with official [Etherscan API](https://etherscan.io/apis)

## Documentation

**[API reference](https://github.com/danakt/node-etherscan-api/blob/master/docs/API.md)**

The API reference was generated by JSDoc.
If you use Typescript, you can use the more detailed reference found in the [type declaration file](https://github.com/danakt/node-etherscan-api/blob/master/index.d.ts)

## Install

```bash
$ npm install node-etherscan-api
```

## Usage

```js
const Etherscan = require('node-etherscan-api')

// Replace the value below with the your Etherscan token
const TOKEN_API = 'YourApiKeyToken'

// Creating the Etherscan instance
const etherscan = new Etherscan(TOKEN_API)

// Creating a request for account balance in Ether (default returns in Wei)
etherscan
  .getAccountBalance('0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae', 'eth')
  .then(balance => {
    // Working with the balance here
    console.log(balance)
  })
  .catch(err => {
    // Handle error here
    console.error(err)
  })
```

## License

**The MIT License (MIT)**

Copyright © 2018 Danakt Frost
