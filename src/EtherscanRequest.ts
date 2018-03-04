import { NETWORKS }               from './constants/networks'
import { createRequest, TParams } from './utils/createRequest'

export class EtherscanRequest {
  /** Etherscan API token */
  protected token: string

  /** Network name */
  protected network: keyof typeof NETWORKS

  /** Network API host */
  protected host: string

  /**
   * @constructor
   * @param {string} [token="YourApiKeyToken"] Etherscan API token
   * @param {string} [network="main"] Network name. Available: main, ropsten,
   * kovan, rinkeby
   */
  protected constructor(token = '', network = 'MAIN') {
    this.token = token

    const netName = network.toUpperCase()
    this.network
      = netName in NETWORKS ? (netName as keyof typeof NETWORKS) : 'MAIN'

    this.host = NETWORKS[this.network]
  }

  /**
   * Creates request
   * @private
   * @param params Query params
   * @return {Promise<any>}
   */
  protected createRequest(params: TParams): Promise<any> {
    return createRequest(this.host, { ...params, apikey: this.token })
  }
}
