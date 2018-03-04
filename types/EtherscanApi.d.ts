import { UNITS } from './constants/units';
import { EtherscanRequest } from './EtherscanRequest';
/**
 * Etherscan API
 */
export declare class EtherscanApi extends EtherscanRequest {
    /**
     * Returns Ether Balance for a single Address
     * @param address
     * @param {string?} [unit="wei"] Balance unit
     * @return {Promise<string>}
     */
    getAccountBalance(address: string, unit?: keyof typeof UNITS, tag?: string): Promise<string>;
    /**
     * Get Ether Balance for multiple Addresses in a single call
     * @description Up to a maximum of 20 accounts in a single batch
     * @param {Array<string>} addresses
     * @param {string?} [unit="wei"] Balance unit
     *
     */
    getAccountBalances(addresses: string[], unit?: keyof typeof UNITS, tag?: string): Promise<{
        account: string;
        balance: string;
    }[]>;
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
    getTransactions(address: string, startBlock?: number, endBlock?: number, offset?: number, page?: number, sort?: 'asc' | 'desc'): Promise<TransactionDescription[]>;
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
    getInternalTransactions(address: string, startBlock?: number, endBlock?: number, offset?: number, page?: number, sort?: 'asc' | 'desc'): Promise<InternalTransactionDescription[]>;
    /**
     * Returns a list of 'Internal' Transactions by Address
     * @param txhash Contract address
     * @return {Promise<InternalTransactionDescription[]>}
     */
    getInternalTransactionsByHash(txhash: string): Promise<TransactionDescription[]>;
    /**
     * List of Blocks Mined by Address
     * @param {string} address Miner address
     * @param {'blocks'|'uncles'} type Type of block: blocks (full blocks only)
     * or uncles (uncle blocks only)
     * @param {number} offset Max records to return
     * @param {number} page Page number
     * @return {Promise<BlockInfo[]>}
     */
    getMinedBlocks(address: string, type?: 'blocks' | 'uncles', offset?: number, page?: number): Promise<BlockInfo[]>;
    /**
     * Returns Contract ABI
     * @param address
     * @return {Promsie<AbiItemDescription[]>}
     */
    getContractAbi(address: string): Promise<AbiItemDescription[]>;
    /**
     * Checks contract execution status (if there was an error during contract
     * execution).
     * @description "isError": "0" = Pass, "isError": "1" = Error during contract
     * execution
     * @param txhash Contract address
     * @return {Promise<object>}
     */
    getContractExecutionStatus(txhash: string): Promise<{
        isError: string;
        errDescription?: string;
    }>;
    /**
     * Checks transaction receipt status (only applicable for post byzantium fork
     * transactions).
     * @description Status: 0 = Fail, 1 = Pass. Will return null/empty value
     * for pre-byzantium fork
     * @param txhash Transaction address
     * @return {Promise<object>}
     */
    getTransactionStatus(txhash: string): Promise<{
        status: string;
    }>;
    /**
     * Get block and uncle rewards by block number
     * @param {number} blockNumber The number of the block
     */
    getBlockReward(blockNumber: number | string): Promise<BlockRewardInfo>;
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
    getEventsLogs(address: string, fromBlock: number, toBlock: number | 'latest', topic0?: string, topic01operator?: 'and' | 'or', topic1?: string, topic12operator?: 'and' | 'or', topic2?: string, topic23operator?: 'and' | 'or', topic3?: string, topic02operator?: 'and' | 'or'): Promise<EventDescription[]>;
    /**
     * Returns the number of the most recent block
     * @return {Promise<number>}
     */
    getRecentBlockNumber(): Promise<number>;
    /**
     * Returns information about a block by block number
     * @param {number} blockNumber Block number
     * @return {Promise<GethBlockInfo>}
     */
    getBlockByNumber(blockNumber: number): Promise<GethBlockInfo>;
    /**
     * Returns information about a uncle by block number and index
     * @param {number} blockNumber
     * @param {number} [index=0]
     * @return {Promise<GethBlockInfo>}
     */
    getUncleByBlockNumberAndIndex(blockNumber: number, index?: number): Promise<GethBlockInfo>;
    /**
     * Returns the number of transactions in a block from a block matching the
     * given block number
     * @param {number} blockNumber
     * @return {Promise<number>}
     */
    getBlockTransactionCount(blockNumber: number): Promise<number>;
    /**
     * Returns the information about a transaction requested by transaction hash
     * @param {string} txhash Transaction hash
     * @return {Promise<TransactionDescription>}
     */
    getTransactionByHash(txhash: string): Promise<TransactionDescription>;
    /**
     * Returns information about a transaction by block number and transaction
     * index position
     * @param {number} blockNumber
     * @param {number} [index=0]
     * @returns {Promise<TransactionDescription>}
     */
    getTransactionByBlockNumberAndIndex(blockNumber: number, index?: number): Promise<TransactionDescription>;
    /**
     * Returns the number of transactions sent from an address
     * @param {string} address Transaction address
     * @returns {Promise<number>}
     */
    getTransactionCount(address: string, tag?: string): Promise<number>;
    /**
     * Creates new message call transaction or a contract creation for signed
     * transactions
     * @param {string} hex Raw hex encoded transaction that you want to send
     */
    sendRawTransaction(hex: string): Promise<void>;
    /**
     * Returns the receipt of a transaction by transaction hash
     * @param {string} txhash Transaction hash
     * @returns {Promise<TransactionReceipt>}
     */
    getTransactionReceipt(txhash: string): Promise<TransactionReceipt>;
    /**
     * Executes a new message call immediately without creating a transaction on
     * the block chain
     * @param {string} to Address to execute from
     * @param {string} data Data to transfer
     * @return {Promise<string>}
     */
    call(to: string, data: string, tag?: string): Promise<string>;
    /**
     * Returns code at a given address
     * @param {string} address
     * @returns {Promise<string>}
     */
    getCode(address: string, tag?: string): Promise<string>;
    /**
     * Returns the value from a storage position at a given address.
     * @param {string} address
     * @param {number} position
     * @return {Promise<string>}
     */
    getStorageAt(address: string, position: number, tag?: string): Promise<string>;
    /**
     * Returns the current price per gas (in wei by default)
     * @param {string} [unit="wei"] Unit of gas
     * @return {string}
     */
    getGasPrice(unit?: keyof typeof UNITS): Promise<string>;
    /**
     * Makes a call or transaction, which won't be added to the blockchain and
     * returns the used gas, which can be used for estimating the used gas
     * @param {string} to Address to get code from
     * @param {string} value Storage position
     * @param {string} gasPrice Gas price in wei
     * @param {string} gas
     */
    estimateGas(to: string, value: string | number, gasPrice: string, gas: string): Promise<void>;
    /**
     * Get ERC20-Token TotalSupply by ContractAddress
     * @param {string} contractAddress
     * @return {Promise<string>}
     */
    getTokenByContractAddress(contractAddress: string): Promise<string>;
    /**
     * Get ERC20-Token Account Balance for TokenContractAddress
     * @param {string} contractAddress
     * @return {Promise<string>}
     */
    getTokenBalanceByContractAddress(contractAddress: string, address: string, tag?: string): Promise<string>;
    /**
     * Get total supply of Ether
     * @return {Promise<string>}
     */
    getTotalEtherSupply(): Promise<string>;
    /**
     * Get Ether last price
     * @return {Promise<EtherPrice>}
     */
    getEtherLastPrice(): Promise<EtherPrice>;
}
