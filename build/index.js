"use strict";
var networks_1 = require("./constants/networks");
module.exports = /** @class */ (function () {
    /**
     * @constructor
     * @param {string} [token="YourApiKeyToken"] Etherscan API token
     * @param {string} [network="main"] Network name. Available: main, ropsten,
     * kovan, rinkeby
     */
    function EtherscanApi(token, network) {
        if (token === void 0) { token = 'YourApiKeyToken'; }
        if (network === void 0) { network = 'MAIN'; }
        this.token = token;
        var netName = network.toUpperCase();
        this.network
            = netName in networks_1.NETWORKS ? netName : 'MAIN';
        this.url = networks_1.NETWORKS[this.network];
    }
    return EtherscanApi;
}());
