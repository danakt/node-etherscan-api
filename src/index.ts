import { NETWORKS }      from './constants/networks'
import { createRequest } from './utils/createRequest'
import { MODULES }       from './constants/modules'
import { ACTIONS }       from './constants/actions'
import { etherConvert }  from './utils/etherConvert'
// eslint-disable-next-line no-unused-vars
import { UNITS }         from './constants/units'

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
    unit: keyof typeof UNITS = 'wei'
  ): Promise<string> {
    const resp = await createRequest(this.host, {
      apikey: this.token,
      module: MODULES.ACCOUNT,
      action: ACTIONS.BALANCE,
      tag:    'latest',
      address
    })

    // Converting balance to another unit
    return unit === 'wei' || !(unit in UNITS)
      ? resp
      : etherConvert(resp, 'wei', unit)
  }

  /**
   * Get Ether Balance for multiple Addresses in a single call
   * @description Up to a maximum of 20 accounts in a single batch
   * @param {Array<string>} addresses
   * @param {string?} [unit="wei"] Balance unit
   *
   */
  public async getAccountBalances(
    addresses: string[],
    unit: keyof typeof UNITS = 'wei'
  ): Promise<{ account: string; balance: string }[]> {
    const resp: { account: string; balance: string }[] = await createRequest(
      this.host,
      {
        apikey:  this.token,
        module:  MODULES.ACCOUNT,
        action:  ACTIONS.BALANCE_MULTI,
        tag:     'latest',
        address: addresses.join(',')
      }
    )

    // Converting balances to another unit
    return unit === 'wei' || !(unit in UNITS)
      ? resp
      : resp.map(item => {
        return {
          account: item.account,
          balance: etherConvert(item.balance, 'wei', unit)
        }
      })
  }

  /**
   * Get a list of 'Normal' Transactions By Address
   * @param address
   * @param startBlock Starting block number to retrieve results
   * @param endBlock Ending block number to retrieve results
   */
  public async getTransactions(
    address: string,
    startBlock?: number,
    endBlock?: number,
    offset?: number,
    page?: number,
    sort?: 'asc' | 'desc'
  ): Promise<TTransaction[]> {
    return createRequest(this.host, {
      apikey:     this.token,
      action:     MODULES.ACCOUNT,
      module:     ACTIONS.TRANSACTIONS_LIST,
      address,
      endblock:   endBlock,
      startblock: startBlock,
      offset,
      page,
      sort
    })
  }
}
