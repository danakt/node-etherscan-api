const BigNumber = require('bignumber.js')
const MODULES = require('./constants/modules')
const ACTIONS = require('./constants/actions')
const UNITS = require('./constants/units')
const etherConvert = require('./utils/etherConvert')
const getHex = require('./utils/getHex')
const EtherscanRequest = require('./EtherscanRequest')

class EtherscanApi extends EtherscanRequest {
  /**
   * Returns Ether Balance for a single Address
   * @method getAccountBalance
   * @param {string} address
   * @param {string?} [unit=wei] Balance unit
   * @returns {Promise<string>}
   */
  async getAccountBalance(address, unit = 'wei', tag = 'latest') {
    const resp = await this.createRequest({
      module: MODULES.ACCOUNT,
      action: ACTIONS.GET_BALANCE,
      tag,
      address
    })

    // Converting balance to another unit
    return unit === 'wei' || !(unit in UNITS)
      ? resp
      : etherConvert(resp, 'wei', unit)
  }

  /**
   * Get Ether Balance for multiple Addresses in a single call
   * @method getAccountBalances
   * @description Up to a maximum of 20 accounts in a single batch
   * @param {Array<string>} addresses
   * @param {string?} [unit=wei] Balance unit
   * @return {Promise<object>} Array of "{ account: string; balance: string }[]"
   */
  async getAccountBalances(addresses, unit = 'wei', tag = 'latest') {
    const resp = await this.createRequest({
      apikey:  this.token,
      module:  MODULES.ACCOUNT,
      action:  ACTIONS.GET_BALANCE_MULTI,
      address: addresses.join(','),
      tag
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
   * @method getTransactions
   * @param {string} address Contract address
   * @param {string|number} startBlock Starting block number to retrieve results
   * @param {string|number} endBlock Ending block number to retrieve results
   * @param {number} offset Max records to return
   * @param {number} page Page number
   * @param {number} sort Sort type (asc/desc)
   * @returns {Promise<TransactionDescription[]>}
   */
  async getTransactions(address, startBlock, endBlock, offset, page, sort) {
    return this.createRequest({
      module:     MODULES.ACCOUNT,
      action:     ACTIONS.GET_TRANSACTIONS_LIST,
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
   * @method getInternalTransactions
   * @param {string} address Contract address
   * @param {string|number} startBlock Starting block number to retrieve results
   * @param {string|number} endBlock Ending block number to retrieve results
   * @param {string|number} offset Max records to return
   * @param {string|number} page Page number
   * @param {'asc'|'desc'} sort Sort type (asc/desc)
   * @returns {Promise<TransactionDescription[]>}
   */
  async getInternalTransactions(
    address,
    startBlock,
    endBlock,
    offset,
    page,
    sort
  ) {
    return this.createRequest({
      module:     MODULES.ACCOUNT,
      action:     ACTIONS.GET_TRANSACTIONS_LIST_INTERNAL,
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
   * @method getInternalTransactionsByHash
   * @param txhash Contract address
   * @returns {Promise<InternalTransactionDescription[]>}
   */
  async getInternalTransactionsByHash(txhash) {
    return this.createRequest({
      module: MODULES.ACCOUNT,
      action: ACTIONS.GET_TRANSACTIONS_LIST_INTERNAL,
      txhash
    })
  }

  /**
   * List of Blocks Mined by Address
   * @method getMinedBlocks
   * @param {string} address Miner address
   * @param {'blocks'|'uncles'} type Type of block: blocks (full blocks only)
   * or uncles (uncle blocks only)
   * @param {number} offset Max records to return
   * @param {number} page Page number
   * @returns {Promise<BlockInfo[]>}
   */
  async getMinedBlocks(address, type = 'blocks', offset, page) {
    return this.createRequest({
      module:    MODULES.ACCOUNT,
      action:    ACTIONS.GET_MINED_BLOCKS,
      blocktype: type,
      address,
      offset,
      page
    })
  }

  /**
   * Returns Contract ABI
   * @method getContractAbi
   * @param address
   * @returns {Promsie<AbiItemDescription[]>}
   */
  async getContractAbi(address) {
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
   * @method getContractExecutionStatus
   * @description "isError": "0" = Pass, "isError": "1" = Error during contract
   * execution
   * @param {string} txhash Contract address
   * @returns {Promise<object>}
   */
  async getContractExecutionStatus(txhash) {
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
   * @method getTransactionStatus
   * @description Status: 0 = Fail, 1 = Pass. Will return null/empty value
   * for pre-byzantium fork
   * @param {string} txhash Transaction address
   * @returns {Promise<object>}
   */
  async getTransactionStatus(txhash) {
    return this.createRequest({
      module: MODULES.TRANSACTION,
      action: ACTIONS.GET_TRANSACTION_STATUS,
      txhash
    })
  }

  /**
   * Get block and uncle rewards by block number
   * @method getBlockReward
   * @param {number} blockNumber The number of the block
   */
  async getBlockReward(blockNumber) {
    return this.createRequest({
      module:  MODULES.BLOCK,
      action:  ACTIONS.GET_BLOCK_REWARD,
      blockno: blockNumber
    })
  }

  /**
   * Returns events logs
   * @method getEventsLogs
   * @description The Event Log API was designed to provide an alternative to
   * the native eth_getLogs. Topic Operator (opr) choices are either '''and' or
   * 'or' and are restricted to the above choices only. For performance and
   * security considerations, only the first 1000 results are return.
   * @param {string} address
   * @param {number} fromBlock Start block number (integer, NOT hex)
   * @param {number|'latest'} toBlock End block number or "latest"
   * (earliest and pending is NOT supported yet)
   * @param {string} topic0 Topic 0
   * @param {string?} topic01operator Operator (and|or) between topic0 & topic1
   * @param {string?} topic1 Topic 1
   * @param {string?} topic12operator Operator (and|or) between topic1 & topic2
   * @param {string} topic2 Topic 2
   * @param {string?} topic23operator Operator (and|or) between topic2 & topic3
   * @param {string?} topic3 Topic 3
   * @param {string?} topic02operator Operator (and|or) between topic0 & topic2
   */
  async getEventsLogs(
    address,
    fromBlock,
    toBlock,
    topic0,
    topic01operator,
    topic1,
    topic12operator,
    topic2,
    topic23operator,
    topic3,
    topic02operator
  ) {
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
   * @method getRecentBlockNumber
   * @returns {Promise<number>}
   */
  async getRecentBlockNumber() {
    const blockNumberHex = await this.createRequest({
      module: MODULES.PROXY,
      action: ACTIONS.GET_RECENT_BLOCK_NUMBER
    })

    return parseInt(blockNumberHex, 16)
  }

  /**
   * Returns information about a block by block number
   * @method getBlockByNumber
   * @param {number} blockNumber Block number
   * @returns {Promise<GethBlockInfo>}
   */
  async getBlockByNumber(blockNumber) {
    return this.createRequest({
      module:  MODULES.PROXY,
      action:  ACTIONS.GET_BLOCK_BY_NUMBER,
      tag:     '0x' + blockNumber.toString(16),
      boolean: 'true'
    })
  }

  /**
   * Returns information about a uncle by block number and index
   * @method getUncleByBlockNumberAndIndex
   * @param {number} blockNumber
   * @param {number} [index=0]
   * @returns {Promise<GethBlockInfo>}
   */
  async getUncleByBlockNumberAndIndex(blockNumber, index = 0) {
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
   * @method getBlockTransactionCount
   * @param {number} blockNumber
   * @returns {Promise<number>}
   */
  async getBlockTransactionCount(blockNumber) {
    const countHex = await this.createRequest({
      module: MODULES.PROXY,
      action: ACTIONS.GET_BLOCK_TX_COUNT_BY_NUMBER,
      tag:    getHex(blockNumber)
    })
    return parseInt(countHex, 16)
  }

  /**
   * Returns the information about a transaction requested by transaction hash
   * @method getTransactionByHash
   * @param {string} txhash Transaction hash
   * @returns {Promise<TransactionDescription>}
   */
  async getTransactionByHash(txhash) {
    return this.createRequest({
      module: MODULES.PROXY,
      action: ACTIONS.GET_TRANSACTION_BY_HASH,
      txhash
    })
  }

  /**
   * Returns information about a transaction by block number and transaction
   * index position
   * @method getTransactionByBlockNumberAndIndex
   * @param {number} blockNumber
   * @param {number} [index=0]
   * @returns {Promise<TransactionDescription>}
   */
  async getTransactionByBlockNumberAndIndex(blockNumber, index = 0) {
    return this.createRequest({
      module: MODULES.PROXY,
      action: ACTIONS.GET_TX_BY_BLOCK_NUMBER_AND_INDEX,
      tag:    getHex(blockNumber),
      index:  getHex(index)
    })
  }

  /**
   * Returns the number of transactions sent from an address
   * @method getTransactionCount
   * @param {string} address Transaction address
   * @returns {Promise<number>}
   */
  async getTransactionCount(address, tag = 'latest') {
    const countHex = await this.createRequest({
      module: MODULES.PROXY,
      action: ACTIONS.GET_TRANSACTION_COUNT,
      tag,
      address
    })
    return parseInt(countHex, 16)
  }

  /**
   * Creates new message call transaction or a contract creation for signed
   * transactions
   * @method sendRawTransaction
   * @param {string} hex Raw hex encoded transaction that you want to send
   */
  async sendRawTransaction(hex) {
    this.createRequest({
      module: MODULES.PROXY,
      action: ACTIONS.SEND_RAW_TRANSACTION,
      hex
    })
  }

  /**
   * Returns the receipt of a transaction by transaction hash
   * @method getTransactionReceipt
   * @param {string} txhash Transaction hash
   * @returns {Promise<TransactionReceipt>}
   */
  async getTransactionReceipt(txhash) {
    return this.createRequest({
      module: MODULES.PROXY,
      action: ACTIONS.GET_TRANSACTION_RECEIPT,
      txhash
    })
  }

  /**
   * Executes a new message call immediately without creating a transaction on
   * the block chain
   * @method call
   * @param {string} to Address to execute from
   * @param {string} data Data to transfer
   * @returns {Promise<string>}
   */
  async call(to, data, tag = 'latest') {
    return this.createRequest({
      module: MODULES.PROXY,
      action: ACTIONS.CALL,
      tag,
      to,
      data
    })
  }

  /**
   * Returns code at a given address
   * @method getCode
   * @param {string} address
   * @returns {Promise<string>}
   */
  async getCode(address, tag = 'latest') {
    return this.createRequest({
      module: MODULES.PROXY,
      action: ACTIONS.GET_CODE,
      address,
      tag
    })
  }

  /**
   * Returns the value from a storage position at a given address.
   * @method getStorageAt
   * @param {string} address
   * @param {number} position
   * @returns {Promise<string>}
   */
  async getStorageAt(address, position, tag = 'latest') {
    return this.createRequest({
      module:   MODULES.PROXY,
      action:   ACTIONS.GET_STORAGE_AT,
      address,
      position: getHex(position),
      tag
    })
  }

  /**
   * Returns the current price per gas (in wei by default)
   * @method getGasPrice
   * @param {string} [unit=wei] Unit of gas
   * @returns {string}
   */
  async getGasPrice(unit = 'wei') {
    const priceHex = await this.createRequest({
      module: MODULES.PROXY,
      action: ACTIONS.GET_GAS_PRICE
    })

    const priceBN = new BigNumber(priceHex)
    const priceFixed = priceBN.toFixed()

    // If unit is wei, don't convert gas price
    if (unit === 'wei') {
      return priceFixed
    }

    // else covert to specified ether unit
    return etherConvert(priceFixed, 'wei', unit)
  }

  /**
   * Makes a call or transaction, which won't be added to the blockchain and
   * returns the used gas, which can be used for estimating the used gas
   * @method estimateGas
   * @param {string} to Address to get code from
   * @param {string} value Storage position
   * @param {string} gasPrice Gas price in wei
   * @param {string} gas
   */
  async estimateGas(to, value, gasPrice, gas) {
    this.createRequest({
      module: MODULES.PROXY,
      action: ACTIONS.ESTIMATE_GAS,
      to,
      value,
      gasPrice,
      gas
    })
  }

  /**
   * Get ERC20-Token TotalSupply by ContractAddress
   * @method getTokenByContractAddress
   * @param {string} contractAddress
   * @returns {Promise<string>}
   */
  async getTokenByContractAddress(contractAddress) {
    return this.createRequest({
      module:          MODULES.STATS,
      action:          ACTIONS.GET_TOKEN_BY_CONTRACT,
      contractaddress: contractAddress
    })
  }

  /**
   * Get ERC20-Token Account Balance for TokenContractAddress
   * @method getTokenBalanceByContractAddress
   * @param {string} contractAddress
   * @returns {Promise<string>}
   */
  async getTokenBalanceByContractAddress(
    contractAddress,
    address,
    tag = 'latest'
  ) {
    return this.createRequest({
      module:          MODULES.ACCOUNT,
      action:          ACTIONS.GET_TOKEN_BALANCE_BY_CONTRACT,
      contractaddress: contractAddress,
      address,
      tag
    })
  }

  /**
   * Get total supply of Ether
   * @method getTotalEtherSupply
   * @returns {Promise<string>}
   */
  async getTotalEtherSupply() {
    return this.createRequest({
      module: MODULES.STATS,
      action: ACTIONS.GET_TOTAL_ETHER_SUPPLY
    })
  }

  /**
   * Get Ether last price
   * @method getEtherLastPrice
   * @returns {Promise<EtherPrice>}
   */
  async getEtherLastPrice() {
    return this.createRequest({
      module: MODULES.STATS,
      action: ACTIONS.GET_LAST_ETHER_PRICE
    })
  }
}

module.exports = EtherscanApi
