import { NETWORKS }               from './constants/networks'
import { createRequest, TParams } from './utils/createRequest'
import { MODULES }                from './constants/modules'
import { ACTIONS }                from './constants/actions'
import { etherConvert }           from './utils/etherConvert'
// eslint-disable-next-line no-unused-vars
import { UNITS }                  from './constants/units'
import { getHex }                 from './utils/getHex'

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
    const resp = await this.createRequest({
      module: MODULES.ACCOUNT,
      action: ACTIONS.GET_BALANCE,
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
    const resp: {
      account: string
      balance: string
    }[] = await this.createRequest({
      apikey:  this.token,
      module:  MODULES.ACCOUNT,
      action:  ACTIONS.GET_BALANCE_MULTI,
      tag:     'latest',
      address: addresses.join(',')
    })

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
   * Returns up to a maximum of the last 10000 transactions only
   * @param address Contract address
   * @param startBlock Starting block number to retrieve results
   * @param endBlock Ending block number to retrieve results
   * @param offset Max records to return
   * @param page Page number
   * @param sort Sort type (asc/desc)
   * @return {Promise<TransactionDescription[]>}
   */
  public async getTransactions(
    address: string,
    startBlock?: number,
    endBlock?: number,
    offset?: number,
    page?: number,
    sort?: 'asc' | 'desc'
  ): Promise<TransactionDescription[]> {
    return this.createRequest({
      action:     MODULES.ACCOUNT,
      module:     ACTIONS.GET_TRANSACTIONS_LIST,
      address,
      endblock:   endBlock,
      startblock: startBlock,
      offset,
      page,
      sort
    })
  }

  /**
   * Returns a list of 'Internal' Transactions by Address
   * Returns up to a maximum of the last 10000 transactions only
   * @param address Contract address
   * @param startBlock Starting block number to retrieve results
   * @param endBlock Ending block number to retrieve results
   * @param offset Max records to return
   * @param page Page number
   * @param sort Sort type (asc/desc)
   * @return {Promise<TransactionDescription[]>}
   */
  public async getInternalTransactions(
    address: string,
    startBlock?: number,
    endBlock?: number,
    offset?: number,
    page?: number,
    sort?: 'asc' | 'desc'
  ): Promise<InternalTransactionDescription[]> {
    return this.createRequest({
      action:     MODULES.ACCOUNT,
      module:     ACTIONS.GET_TRANSACTIONS_LIST_INTERNAL,
      address,
      endblock:   endBlock,
      startblock: startBlock,
      offset,
      page,
      sort
    })
  }

  /**
   * Returns a list of 'Internal' Transactions by Address
   * @param txhash Contract address
   * @return {Promise<InternalTransactionDescription[]>}
   */
  public async getInternalTransactionsByHash(
    txhash: string
  ): Promise<TransactionDescription[]> {
    return this.createRequest({
      action: MODULES.ACCOUNT,
      module: ACTIONS.GET_TRANSACTIONS_LIST_INTERNAL,
      txhash
    })
  }

  /**
   * List of Blocks Mined by Address
   * @param address Miner address
   * @param offset Max records to return
   * @param page Page number
   * @return {Promise<BlockInfo[]>}
   */
  public async getMinedBlocks(
    address: string,
    offset?: number,
    page?: number
  ): Promise<BlockInfo[]> {
    return this.createRequest({
      action:    MODULES.ACCOUNT,
      module:    ACTIONS.GET_MINED_BLOCKS,
      blocktype: 'blocks',
      address,
      offset,
      page
    })
  }

  /**
   * Returns Contract ABI
   * @param address
   * @return {Promsie<AbiItemDescription[]>}
   */
  public async getContractAbi(address: string): Promise<AbiItemDescription[]> {
    const resp = await this.createRequest({
      module: MODULES.CONTRACT,
      action: ACTIONS.GET_ABI,
      address
    })

    return JSON.parse(resp)
  }

  /**
   * Checks contract execution status (if there was an error during contract
   * execution).
   * @description "isError": "0" = Pass, "isError": "1" = Error during contract
   * execution
   * @param txhash Contract address
   * @return {Promise<object>}
   */
  public async getContractExecutionStatus(
    txhash: string
  ): Promise<{
    isError: string
    errDescription?: string
  }> {
    const resp = await this.createRequest({
      module: MODULES.TRANSACTION,
      action: ACTIONS.GET_CONTRACT_STATUS,
      txhash
    })

    return resp
  }

  /**
   * Checks transaction receipt status (only applicable for post byzantium fork
   * transactions).
   * @description Status: 0 = Fail, 1 = Pass. Will return null/empty value
   * for pre-byzantium fork
   * @param txhash Transaction address
   * @return {Promise<object>}
   */
  public async getTransactionStatus(
    txhash: string
  ): Promise<{ status: string }> {
    return this.createRequest({
      module: MODULES.TRANSACTION,
      action: ACTIONS.GET_TRANSACTION_STATUS,
      txhash
    })
  }

  /**
   * Get block and uncle rewards by block number
   * @param {number} blockNumber The number of the block
   */
  public async getBlockReward(
    blockNumber: number | string
  ): Promise<BlockRewardInfo> {
    return this.createRequest({
      module: MODULES.BLOCK,
      action: ACTIONS.GET_BLOCK_REWARD,
      bockno: blockNumber
    })
  }

  /**
   * Returns events logs
   * @description The Event Log API was designed to provide an alternative to
   * the native eth_getLogs. Topic Operator (opr) choices are either 'and' or
   * 'or' and are restricted to the above choices only. For performance and
   * security considerations, only the first 1000 results are return.
   * @param {string} address
   * @param {number} fromBlock Start block number (integer, NOT hex)
   * @param {number|'latest'} toBlock End block number or "latest"
   * (earliest and pending is NOT supported yet)
   * @param {string} topic0 Topic 0
   * @param {'and'|'or'} topic01operator Operator and|or between topic0 & topic1
   * @param {string} topic1 Topic 1
   * @param {'and'|'or'} topic12operator Operator and|or between topic1 & topic2
   * @param {string} topic2 Topic 2
   * @param {'and'|'or'} topic23operator Operator and|or between topic2 & topic3
   * @param {string} topic3 Topic 3
   * @param {'and'|'or'} topic02operator Operator and|or between topic0 & topic2
   */
  public async getEventsLogs(
    address: string,
    fromBlock: number,
    toBlock: number | 'latest',
    topic0: string,
    topic01operator: 'and' | 'or',
    topic1: string,
    topic12operator: 'and' | 'or',
    topic2: string,
    topic23operator: 'and' | 'or',
    topic3: string,
    topic02operator: 'and' | 'or'
  ): Promise<EventDescription[]> {
    return this.createRequest({
      module:       MODULES.LOGS,
      action:       ACTIONS.GET_LOGS,
      fromBlock,
      toBlock,
      topic0,
      topic0_1_opr: topic01operator,
      topic1,
      topic1_2_opr: topic12operator,
      topic2,
      topic2_3_opr: topic23operator,
      topic3,
      topic0_2_opr: topic02operator
    })
  }

  /**
   * Returns the number of the most recent block
   * @return {Promise<number>}
   */
  public async getRecentBlockNumber(): Promise<number> {
    const blockNumberHex: string = await this.createRequest({
      module: MODULES.PROXY,
      action: ACTIONS.GET_RECENT_BLOCK_NUMBER
    })

    return parseInt(blockNumberHex, 16)
  }

  /**
   * Returns information about a block by block number
   * @param {number} blockNumber Block number
   * @return {Promise<GethBlockInfo>}
   */
  public async getBlockByNumber(blockNumber: number): Promise<GethBlockInfo> {
    return this.createRequest({
      module:  MODULES.PROXY,
      action:  ACTIONS.GET_BLOCK_BY_NUMBER,
      tag:     '0x' + blockNumber.toString(16),
      boolean: 'true'
    })
  }

  /**
   * Returns information about a uncle by block number and index
   * @param {number} blockNumber
   * @param {number} [index=0]
   * @return {Promise<GethBlockInfo>}
   */
  public async getUncleByBlockNumberAndIndex(
    blockNumber: number,
    index: number = 0
  ): Promise<GethBlockInfo> {
    return this.createRequest({
      module: MODULES.PROXY,
      action: ACTIONS.GET_UNCLE_BLOCK_NUMBER_AND_INDEX,
      tag:    getHex(blockNumber),
      index:  getHex(index)
    })
  }

  /**
   * Returns the number of transactions in a block from a block matching the
   * given block number
   * @param {number} blockNumber
   * @return {Promise<number>}
   */
  public async getBlockTransactionCount(blockNumber: number): Promise<number> {
    const countHex = await this.createRequest({
      module: MODULES.PROXY,
      action: ACTIONS.GET_BLOCK_TX_COUNT_BY_NUMBER,
      tag:    getHex(blockNumber)
    })

    return parseInt(countHex, 16)
  }

  /**
   * Returns the information about a transaction requested by transaction hash
   * @param {string} txhash Transaction hash
   * @return {Promise<TransactionDescription>}
   */
  public async getTransactionByHash(
    txhash: string
  ): Promise<TransactionDescription> {
    return this.createRequest({
      module: MODULES.PROXY,
      action: ACTIONS.GET_TRANSACTION_BY_HASH,
      txhash
    })
  }

  /**
   * Returns information about a transaction by block number and transaction
   * index position
   * @param {number} blockNumber
   * @param {number} [index=0]
   * @returns {Promise<TransactionDescription>}
   */
  public async getTransactionByBlockNumberAndIndex(
    blockNumber: number,
    index: number = 0
  ): Promise<TransactionDescription> {
    return this.createRequest({
      module: MODULES.PROXY,
      action: ACTIONS.GET_TX_BY_BLOCK_NUMBER_AND_INDEX,
      tag:    getHex(blockNumber),
      index:  getHex(index)
    })
  }

  /**
   * Returns the number of transactions sent from an address
   * @param {string} address Transaction address
   * @returns {Promise<number>}
   */
  public async getTransactionCount(address: string): Promise<number> {
    const countHex = await this.createRequest({
      module: MODULES.PROXY,
      action: ACTIONS.GET_TRANSACTION_COUNT,
      tag:    'latest',
      address
    })

    return parseInt(countHex, 16)
  }

  /**
   * Creates new message call transaction or a contract creation for signed transactions
   * @param {string} hex Raw hex encoded transaction that you want to send
   */
  public async sendRawTransaction(hex: string): Promise<void> {
    this.createRequest({
      module: MODULES.PROXY,
      action: ACTIONS.SEND_RAW_TRANSACTION,
      hex
    })
  }

  /**
   * Creates request
   * @private
   * @param params Query params
   * @return {Promise<any>}
   */
  private createRequest(params: TParams): Promise<any> {
    return createRequest(this.host, { ...params, apikey: this.token })
  }
}
