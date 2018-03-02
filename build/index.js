"use strict";
const networks_1 = require("./constants/networks");
const createRequest_1 = require("./utils/createRequest");
module.exports = class EtherscanApi {
    /**
     * @constructor
     * @param {string} [token="YourApiKeyToken"] Etherscan API token
     * @param {string} [network="main"] Network name. Available: main, ropsten,
     * kovan, rinkeby
     */
    constructor(token = 'YourApiKeyToken', network = 'MAIN') {
        this.token = token;
        const netName = network.toUpperCase();
        this.network
            = netName in networks_1.NETWORKS ? netName : 'MAIN';
        this.host = networks_1.NETWORKS[this.network];
    }
    getAccountBalance(address) {
        createRequest_1.createRequest(this.host, {
            apikey: this.token,
            action: 'balance',
            module: 'account',
            tag: 'latest'
        });
    }
};
