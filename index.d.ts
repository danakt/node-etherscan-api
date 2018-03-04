/**
 * Ethereum units
 */
type UNITS = {
  wei: string
  kwei: string
  Kwei: string
  babbage: string
  femtoether: string
  mwei: string
  Mwei: string
  lovelace: string
  picoether: string
  gwei: string
  Gwei: string
  shannon: string
  nanoether: string
  nano: string
  szabo: string
  microether: string
  micro: string
  finney: string
  milliether: string
  milli: string
  ether: string
  eth: string
  kether: string
  grand: string
  mether: string
  gether: string
  tether: string
}

/**
 * Application binary interface's item description
 * The typings based on solidity specification:
 * http://solidity.readthedocs.io/en/develop/abi-spec.html#json
 */
type AbiItemDescription = AbiFunctionDescription | AbiEventDescription

/**
 * Application binary interface's function description
 */
interface AbiFunctionDescription {
  // The type of the function
  // The type can be omitted, defaulting to "function".
  type?: 'function' | 'constructor' | 'fallback'
  // The name of the function;
  // Constructor and fallback function never have name
  name: string
  // An array of objects
  // Fallback function doesn’t have inputs
  inputs?: AbiItemIO[]
  // An array of objects similar to inputs, can be omitted if function doesn’t
  // return anything.
  // Constructor and fallback function never have outputs
  outputs?: AbiItemIO[]
  // "true" if function accepts ether, defaults to false
  payable?: boolean
  // A string with one of the following values:
  // - pure (specified to not read blockchain state)
  // - view (specified to not modify the blockchain state)
  // - nonpayable
  // - payable (same as payable above).
  stateMutability?: 'pure' | 'view' | 'nonpayable' | 'payable'
  // "true" if function is either pure or view
  constant?: boolean
}

/**
 * Type of an event description
 */
interface AbiEventDescription {
  // Type always "event"
  type: 'event'
  // The name of the event;
  name: string
  // An array of objects
  inputs: AbiEventIO[]
  // "true" if the event was declared as anonymous.
  anonymous: boolean
}

/**
 * Type of input/output of an ABI item description
 */
interface AbiItemIO {
  // The name of the parameter
  name: string
  // The canonical type of the parameter (more below)
  type: string
  // Used for tuple types (more below)
  components?: AbiItemIO[]
}

/**
 * Type of input/output of an ABI event description
 */
interface AbiEventIO extends AbiItemIO {
  // "true" if the field is part of the log’s topics, false if it one of the
  // log’s data segment.
  indexed?: boolean
}

/**
 * Ether price result type
 */
type EtherPrice = {
  ethbtc: string
  ethbtc_timestamp: string
  ethusd: string
  ethusd_timestamp: string
}

/**
 * Block info
 */
interface BlockInfo {
  blockNumber: string
  blockReward: string
  timeStamp: string
}

/**
 * Block reward info
 */
interface BlockRewardInfo extends BlockInfo {
  blockMiner: string
  uncleInclusionReward: string
  uncles: Array<{
    blockreward: string
    miner: string
    unclePosition: string
  }>
}

/**
 * Geth block info
 */
interface GethBlockInfo {
  difficulty: string
  extraData: string
  gasLimit: string
  gasUsed: string
  hash: string
  logsBloom: string
  miner: string
  mixHash: string
  nonce: string
  number: string
  parentHash: string
  receiptsRoot: string
  sha3Uncles: string
  size: string
  stateRoot: string
  timestamp: string
  totalDifficulty: string
  transactions: TransactionDescription[]
  transactionsRoot: string
  uncles: any[]
}

/**
 * Type of an event
 */
interface EventDescription {
  address: string
  topics: string[]
  data: string
  blockNumber: string
  logIndex: string
  transactionHash: string
  transactionIndex: string
  timeStamp?: string
  gasPrice?: string
  gasUsed?: string
  blockHash?: string
  removed?: boolean
}

/**
 * Transaction info
 */
type TransactionDescription = {
  blockHash: string
  blockNumber: string
  confirmations?: string
  contractAddress?: string
  cumulativeGasUsed?: string
  from: string
  gas: string
  gasPrice: string
  gasUsed: string
  hash: string
  input: string
  isError?: string
  nonce: string
  timeStamp?: string
  to: string
  transactionIndex: string
  txreceipt_status?: string
  value: string
  v?: string
  r?: string
  s?: string
}

/**
 * Internal transaction info
 */
type InternalTransactionDescription = {
  blockNumber: string
  timeStamp: string
  hash: string
  from: string
  to: string
  value: string
  contractAddress: string
  input: string
  type: string
  gas: string
  gasUsed: string
  traceId: string
  isError: string
  errCode: string
}

/**
 * Type of transaction receipt
 */
type TransactionReceipt = {
  blockHash: string
  blockNumber: string
  contractAddress?: any
  cumulativeGasUsed: string
  from: string
  gasUsed: string
  logs: EventDescription[]
  logsBloom: string
  root: string
  to: string
  transactionHash: string
  transactionIndex: string
}

/** Networks names */
type NETWORKS = {
  MAIN: string
  ROPSTEN: string
  KOVAN: string
  RINKEBY: string
}

/**
 * The Etherscan API
 */
declare class EtherscanApi {
  /**
   * @constructor
   * @param {string} [token="YourApiKeyToken"] Etherscan API token
   * @param {string} [network="main"] Network name. Available: main, ropsten,
   * kovan, rinkeby
   */
  constructor(token?: string, network?: keyof NETWORKS)

  /**
   * Returns Ether Balance for a single Address
   * @param address
   * @param {string?} [unit="wei"] Balance unit
   * @return {Promise<string>}
   */
  getAccountBalance(
    address: string,
    unit?: keyof UNITS,
    tag?: string
  ): Promise<string>

  /**
   * Get Ether Balance for multiple Addresses in a single call
   * @description Up to a maximum of 20 accounts in a single batch
   * @param {Array<string>} addresses
   * @param {string?} [unit="wei"] Balance unit
   *
   */
  getAccountBalances(
    addresses: string[],
    unit?: keyof UNITS,
    tag?: string
  ): Promise<
    {
      account: string
      balance: string
    }[]
  >

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
  getTransactions(
    address: string,
    startBlock?: number,
    endBlock?: number,
    offset?: number,
    page?: number,
    sort?: 'asc' | 'desc'
  ): Promise<TransactionDescription[]>

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
  getInternalTransactions(
    address: string,
    startBlock?: number,
    endBlock?: number,
    offset?: number,
    page?: number,
    sort?: 'asc' | 'desc'
  ): Promise<InternalTransactionDescription[]>

  /**
   * Returns a list of 'Internal' Transactions by Address
   * @param txhash Contract address
   * @return {Promise<InternalTransactionDescription[]>}
   */
  getInternalTransactionsByHash(
    txhash: string
  ): Promise<TransactionDescription[]>

  /**
   * List of Blocks Mined by Address
   * @param {string} address Miner address
   * @param {'blocks'|'uncles'} type Type of block: blocks (full blocks only)
   * or uncles (uncle blocks only)
   * @param {number} offset Max records to return
   * @param {number} page Page number
   * @return {Promise<BlockInfo[]>}
   */
  getMinedBlocks(
    address: string,
    type?: 'blocks' | 'uncles',
    offset?: number,
    page?: number
  ): Promise<BlockInfo[]>

  /**
   * Returns Contract ABI
   * @param address
   * @return {Promsie<AbiItemDescription[]>}
   */
  getContractAbi(address: string): Promise<AbiItemDescription[]>

  /**
   * Checks contract execution status (if there was an error during contract
   * execution).
   * @description "isError": "0" = Pass, "isError": "1" = Error during contract
   * execution
   * @param txhash Contract address
   * @return {Promise<object>}
   */
  getContractExecutionStatus(
    txhash: string
  ): Promise<{
    isError: string
    errDescription?: string
  }>

  /**
   * Checks transaction receipt status (only applicable for post byzantium fork
   * transactions).
   * @description Status: 0 = Fail, 1 = Pass. Will return null/empty value
   * for pre-byzantium fork
   * @param txhash Transaction address
   * @return {Promise<object>}
   */
  getTransactionStatus(
    txhash: string
  ): Promise<{
    status: string
  }>

  /**
   * Get block and uncle rewards by block number
   * @param {number} blockNumber The number of the block
   */
  getBlockReward(blockNumber: number | string): Promise<BlockRewardInfo>

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
   * @param {'and'|'or'?} topic01operator Operator (and|or) between topic0
   * & topic1
   * @param {string?} topic1 Topic 1
   * @param {'and'|'or'?} topic12operator Operator (and|or) between topic1
   * & topic2
   * @param {string} topic2 Topic 2
   * @param {'and'|'or'?} topic23operator Operator (and|or) between topic2
   * & topic3
   * @param {string?} topic3 Topic 3
   * @param {'and'|'or'?} topic02operator Operator (and|or) between topic0
   * & topic2
   */
  getEventsLogs(
    address: string,
    fromBlock: number,
    toBlock: number | 'latest',
    topic0?: string,
    topic01operator?: 'and' | 'or',
    topic1?: string,
    topic12operator?: 'and' | 'or',
    topic2?: string,
    topic23operator?: 'and' | 'or',
    topic3?: string,
    topic02operator?: 'and' | 'or'
  ): Promise<EventDescription[]>

  /**
   * Returns the number of the most recent block
   * @return {Promise<number>}
   */
  getRecentBlockNumber(): Promise<number>

  /**
   * Returns information about a block by block number
   * @param {number} blockNumber Block number
   * @return {Promise<GethBlockInfo>}
   */
  getBlockByNumber(blockNumber: number): Promise<GethBlockInfo>

  /**
   * Returns information about a uncle by block number and index
   * @param {number} blockNumber
   * @param {number} [index=0]
   * @return {Promise<GethBlockInfo>}
   */
  getUncleByBlockNumberAndIndex(
    blockNumber: number,
    index?: number
  ): Promise<GethBlockInfo>

  /**
   * Returns the number of transactions in a block from a block matching the
   * given block number
   * @param {number} blockNumber
   * @return {Promise<number>}
   */
  getBlockTransactionCount(blockNumber: number): Promise<number>

  /**
   * Returns the information about a transaction requested by transaction hash
   * @param {string} txhash Transaction hash
   * @return {Promise<TransactionDescription>}
   */
  getTransactionByHash(txhash: string): Promise<TransactionDescription>

  /**
   * Returns information about a transaction by block number and transaction
   * index position
   * @param {number} blockNumber
   * @param {number} [index=0]
   * @returns {Promise<TransactionDescription>}
   */
  getTransactionByBlockNumberAndIndex(
    blockNumber: number,
    index?: number
  ): Promise<TransactionDescription>

  /**
   * Returns the number of transactions sent from an address
   * @param {string} address Transaction address
   * @returns {Promise<number>}
   */
  getTransactionCount(address: string, tag?: string): Promise<number>

  /**
   * Creates new message call transaction or a contract creation for signed
   * transactions
   * @param {string} hex Raw hex encoded transaction that you want to send
   */
  sendRawTransaction(hex: string): Promise<void>

  /**
   * Returns the receipt of a transaction by transaction hash
   * @param {string} txhash Transaction hash
   * @returns {Promise<TransactionReceipt>}
   */
  getTransactionReceipt(txhash: string): Promise<TransactionReceipt>

  /**
   * Executes a new message call immediately without creating a transaction on
   * the block chain
   * @param {string} to Address to execute from
   * @param {string} data Data to transfer
   * @return {Promise<string>}
   */
  call(to: string, data: string, tag?: string): Promise<string>

  /**
   * Returns code at a given address
   * @param {string} address
   * @returns {Promise<string>}
   */
  getCode(address: string, tag?: string): Promise<string>

  /**
   * Returns the value from a storage position at a given address.
   * @param {string} address
   * @param {number} position
   * @return {Promise<string>}
   */
  getStorageAt(address: string, position: number, tag?: string): Promise<string>

  /**
   * Returns the current price per gas (in wei by default)
   * @param {string} [unit="wei"] Unit of gas
   * @return {string}
   */
  getGasPrice(unit?: keyof UNITS): Promise<string>

  /**
   * Makes a call or transaction, which won't be added to the blockchain and
   * returns the used gas, which can be used for estimating the used gas
   * @param {string} to Address to get code from
   * @param {string} value Storage position
   * @param {string} gasPrice Gas price in wei
   * @param {string} gas
   */
  estimateGas(
    to: string,
    value: string | number,
    gasPrice: string,
    gas: string
  ): Promise<void>

  /**
   * Get ERC20-Token TotalSupply by ContractAddress
   * @param {string} contractAddress
   * @return {Promise<string>}
   */
  getTokenByContractAddress(contractAddress: string): Promise<string>

  /**
   * Get ERC20-Token Account Balance for TokenContractAddress
   * @param {string} contractAddress
   * @return {Promise<string>}
   */
  getTokenBalanceByContractAddress(
    contractAddress: string,
    address: string,
    tag?: string
  ): Promise<string>

  /**
   * Get total supply of Ether
   * @return {Promise<string>}
   */
  getTotalEtherSupply(): Promise<string>

  /**
   * Get Ether last price
   * @return {Promise<EtherPrice>}
   */
  getEtherLastPrice(): Promise<EtherPrice>
}

export as namespace EtherscanApi
export = EtherscanApi
