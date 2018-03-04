# Node.js Etherscan API

Node.js package to interact with official [Etherscan API](https://etherscan.io/apis)

## Install

Via npm:

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
```
