const NETWORKS = require('./constants/networks')
const createRequest = require('./utils/createRequest')

class EtherscanRequest {
  /**
   * @constructor
   * @param {string} [token=""] Etherscan API token
   * @param {string} [network="MAIN"] Network name. Available: main, ropsten,
   * kovan, rinkeby
   */
  constructor(token = '', network = 'MAIN') {
    this.token = token
    const netName = network.toUpperCase()
    this.network = netName in NETWORKS ? netName : 'MAIN'
    this.host = NETWORKS[this.network]
  }

  /**
   * Creates request
   * @private
   * @param {object} params Query params
   * @return {Promise<any>}
   */
  createRequest(params) {
    return createRequest(this.host, {
      ...params,
      apikey: this.token
    })
  }
}

module.exports = EtherscanRequest
