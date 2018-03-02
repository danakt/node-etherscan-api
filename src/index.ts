import { NETWORKS }      from './constants/networks'
import { createRequest } from './utils/createRequest'
import { MODULES }       from './constants/modules'
import { ACTIONS }       from './constants/actions'

/**
 * Etherscan API
 */
export = class EtherscanApi {
  /** Etherscan API token */
  private token: string

  /** Network name */
  private network: keyof typeof NETWORKS

  /** Network API host */
  private host: string

  /**
   * @constructor
   * @param {string} [token="YourApiKeyToken"] Etherscan API token
   * @param {string} [network="main"] Network name. Available: main, ropsten,
   * kovan, rinkeby
   */
  constructor(token = 'YourApiKeyToken', network = 'MAIN') {
    this.token = token

    const netName = network.toUpperCase()
    this.network
      = netName in NETWORKS ? (netName as keyof typeof NETWORKS) : 'MAIN'

    this.host = NETWORKS[this.network]
  }

  /**
   * Returns Ether Balance for a single Address
   * @param address
   * @param {string?} [unit="wei"] Balance unit
   * @return {Promise<string>}
   */
  public async getAccountBalance(
    address: string,
    unit: string = 'wei'
  ): Promise<string> {
    const resp = await createRequest(this.host, {
      apikey: this.token,
      action: ACTIONS.BALANCE,
      module: MODULES.ACCOUNT,
      tag:    'latest',
      address
    })

    return resp
  }

  /**
   * Get Ether Balance for multiple Addresses in a single call
   * @param {Array<string>} addresses
   * @param {string?} [unit="wei"] Balance unit
   */
  public async getAccountBalances(
    addresses: string[],
    unit: string = 'wei'
  ): Promise<{ account: string; balance: string }> {
    const resp: { account: string; balance: string } = await createRequest(
      this.host,
      {
        apikey:  this.token,
        action:  MODULES.ACCOUNT,
        module:  ACTIONS.BALANCE_MULTI,
        tag:     'latest',
        address: addresses.join(',')
      }
    )

    return resp
  }
}
