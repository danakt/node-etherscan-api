# API Reference

<a name="EtherscanApi"></a>

## EtherscanApi
EtherscanApi

**Kind**: global class  

* [EtherscanApi](#EtherscanApi)
    * [new EtherscanApi([token], [networkName])](#new_EtherscanApi_new)
    * [.getAccountBalance(address, [options])](#EtherscanApi+getAccountBalance) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.getAccountBalances(addresses, [options])](#EtherscanApi+getAccountBalances) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getTransactions(address, [options])](#EtherscanApi+getTransactions) ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
    * [.getInternalTransactions(address, [options])](#EtherscanApi+getInternalTransactions) ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
    * [.getInternalTransactionsByHash(txhash)](#EtherscanApi+getInternalTransactionsByHash) ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
    * [.getMinedBlocks(address, [options])](#EtherscanApi+getMinedBlocks) ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
    * [.getContractAbi(address)](#EtherscanApi+getContractAbi) ⇒ <code>Promsie.&lt;Array.&lt;object&gt;&gt;</code>
    * [.getContractExecutionStatus(txhash)](#EtherscanApi+getContractExecutionStatus) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getTransactionStatus(txhash)](#EtherscanApi+getTransactionStatus) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getBlockReward(blockNumber)](#EtherscanApi+getBlockReward)
    * [.getEventsLogs(address, options)](#EtherscanApi+getEventsLogs) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getRecentBlockNumber()](#EtherscanApi+getRecentBlockNumber) ⇒ <code>Promise.&lt;number&gt;</code>
    * [.getBlockByNumber(blockNumber)](#EtherscanApi+getBlockByNumber) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getUncleByBlockNumberAndIndex(blockNumber, [index])](#EtherscanApi+getUncleByBlockNumberAndIndex) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getBlockTransactionCount(blockNumber)](#EtherscanApi+getBlockTransactionCount) ⇒ <code>Promise.&lt;number&gt;</code>
    * [.getTransactionByHash(txhash)](#EtherscanApi+getTransactionByHash) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getTransactionByBlockNumberAndIndex(blockNumber, [index])](#EtherscanApi+getTransactionByBlockNumberAndIndex) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getTransactionCount(address, [options])](#EtherscanApi+getTransactionCount) ⇒ <code>Promise.&lt;number&gt;</code>
    * [.sendRawTransaction(hex)](#EtherscanApi+sendRawTransaction) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.getTransactionReceipt(txhash)](#EtherscanApi+getTransactionReceipt) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.call(to, data, [options])](#EtherscanApi+call) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.getCode(address, [options])](#EtherscanApi+getCode) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.getStorageAt(address, position, options)](#EtherscanApi+getStorageAt) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.getGasPrice([options])](#EtherscanApi+getGasPrice) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.estimateGas(toAddress, options)](#EtherscanApi+estimateGas) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.getTokenByContractAddress(contractAddress)](#EtherscanApi+getTokenByContractAddress) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.getTokenBalanceByContractAddress(contractAddress, address, [options])](#EtherscanApi+getTokenBalanceByContractAddress) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.getTotalEtherSupply()](#EtherscanApi+getTotalEtherSupply) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.getEtherLastPrice()](#EtherscanApi+getEtherLastPrice) ⇒ <code>Promise.&lt;object&gt;</code>

<a name="new_EtherscanApi_new"></a>

### new EtherscanApi([token], [networkName])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [token] | <code>string</code> |  | Etherscan API token |
| [networkName] | <code>string</code> | <code>&quot;MAIN&quot;</code> | Network name. Available:  main, ropsten, kovan and rinkeby |

<a name="EtherscanApi+getAccountBalance"></a>

### etherscanApi.getAccountBalance(address, [options]) ⇒ <code>Promise.&lt;string&gt;</code>
Returns Ether balance for a single address

**Kind**: instance method of [<code>EtherscanApi</code>](#EtherscanApi)  
**Todo**

- [ ] Write test for options


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | Address |
| [options] | <code>object</code> |  |  |
| [options.unit] | <code>string</code> | <code>&quot;wei&quot;</code> | Balance unit |
| [options.tag] | <code>string</code> | <code>&quot;latest&quot;</code> |  |

<a name="EtherscanApi+getAccountBalances"></a>

### etherscanApi.getAccountBalances(addresses, [options]) ⇒ <code>Promise.&lt;object&gt;</code>
Returns Ether balance for multiple addresses in a single call.
Up to a maximum of 20 accounts in a single batch.

**Kind**: instance method of [<code>EtherscanApi</code>](#EtherscanApi)  
**Todo**

- [ ] Write test for options


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| addresses | <code>Array.&lt;string&gt;</code> |  | List of addresses |
| [options] | <code>object</code> |  |  |
| [options.unit] | <code>string</code> | <code>&quot;wei&quot;</code> | Balance unit |
| [options.tag] | <code>string</code> | <code>&quot;latest&quot;</code> |  |

<a name="EtherscanApi+getTransactions"></a>

### etherscanApi.getTransactions(address, [options]) ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
Returns a list of 'Normal' transactions by address.
Returns up to a maximum of the last 10000 transactions only.

**Kind**: instance method of [<code>EtherscanApi</code>](#EtherscanApi)  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | Contract address |
| [options] | <code>object</code> |  |
| [options.startBlock] | <code>object</code> | Starting block number to retrieve results |
| [options.endBlock] | <code>string</code> \| <code>number</code> | Ending block number to retrieve results |
| [options.offset] | <code>number</code> | Max records to return |
| [options.page] | <code>number</code> | Page number |
| [options.sort] | <code>&quot;asc&quot;</code> \| <code>&quot;desc&quot;</code> | Sort type |

<a name="EtherscanApi+getInternalTransactions"></a>

### etherscanApi.getInternalTransactions(address, [options]) ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
Returns a list of 'Internal' Transactions by Address.
Returns up to a maximum of the last 10000 transactions only.

**Kind**: instance method of [<code>EtherscanApi</code>](#EtherscanApi)  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | Contract address |
| [options] | <code>object</code> |  |
| [options.startBlock] | <code>string</code> \| <code>number</code> | Starting block number to retrieve results |
| [options.endBlock] | <code>string</code> \| <code>number</code> | Ending block number to retrieve results |
| [options.offset] | <code>string</code> \| <code>number</code> | Max records to return |
| [options.page] | <code>string</code> \| <code>number</code> | Page number |
| [options.sort] | <code>&quot;asc&quot;</code> \| <code>&quot;desc&quot;</code> | Sort type |

<a name="EtherscanApi+getInternalTransactionsByHash"></a>

### etherscanApi.getInternalTransactionsByHash(txhash) ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
Returns a list of 'Internal' Transactions by Address

**Kind**: instance method of [<code>EtherscanApi</code>](#EtherscanApi)  

| Param | Description |
| --- | --- |
| txhash | Contract address |

<a name="EtherscanApi+getMinedBlocks"></a>

### etherscanApi.getMinedBlocks(address, [options]) ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
List of blocks mined by address

**Kind**: instance method of [<code>EtherscanApi</code>](#EtherscanApi)  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | Miner address |
| [options] | <code>object</code> |  |
| [options.type] | <code>&quot;blocks&quot;</code> \| <code>&quot;uncles&quot;</code> | Type of block: blocks (full blocks only) or uncles (uncle blocks only) |
| [options.offset] | <code>number</code> | Max records to return |
| [options.page] | <code>number</code> | Page number |

<a name="EtherscanApi+getContractAbi"></a>

### etherscanApi.getContractAbi(address) ⇒ <code>Promsie.&lt;Array.&lt;object&gt;&gt;</code>
Returns Contract ABI

**Kind**: instance method of [<code>EtherscanApi</code>](#EtherscanApi)  

| Param |
| --- |
| address | 

<a name="EtherscanApi+getContractExecutionStatus"></a>

### etherscanApi.getContractExecutionStatus(txhash) ⇒ <code>Promise.&lt;object&gt;</code>
Checks contract execution status (if there was an error during contract
execution). "isError": "0" = Pass, "isError": "1" = Error during contract
execution

**Kind**: instance method of [<code>EtherscanApi</code>](#EtherscanApi)  

| Param | Type | Description |
| --- | --- | --- |
| txhash | <code>string</code> | Contract address |

<a name="EtherscanApi+getTransactionStatus"></a>

### etherscanApi.getTransactionStatus(txhash) ⇒ <code>Promise.&lt;object&gt;</code>
Checks transaction receipt status (only applicable for post byzantium fork
transactions). Status: 0 = Fail, 1 = Pass. Will return null/empty value
for pre-byzantium fork

**Kind**: instance method of [<code>EtherscanApi</code>](#EtherscanApi)  

| Param | Type | Description |
| --- | --- | --- |
| txhash | <code>string</code> | Transaction address |

<a name="EtherscanApi+getBlockReward"></a>

### etherscanApi.getBlockReward(blockNumber)
Get block and uncle rewards by block number

**Kind**: instance method of [<code>EtherscanApi</code>](#EtherscanApi)  

| Param | Type | Description |
| --- | --- | --- |
| blockNumber | <code>number</code> | The number of the block |

<a name="EtherscanApi+getEventsLogs"></a>

### etherscanApi.getEventsLogs(address, options) ⇒ <code>Promise.&lt;object&gt;</code>
Returns events logs.
The Event Log API was designed to provide an alternative to the native
eth_getLogs. Topic Operator choices are either 'and' or 'or' and are
restricted to the above choices only. For performance and security
considerations, only the first 1000 results are return.

**Kind**: instance method of [<code>EtherscanApi</code>](#EtherscanApi)  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> |  |
| options | <code>object</code> |  |
| options.fromBlock | <code>number</code> | Start block number (integer, NOT hex) |
| options.toBlock | <code>number</code> \| <code>&#x27;latest&#x27;</code> | End block number or "latest" (earliest and pending is NOT supported yet) |
| options.topic0 | <code>string</code> | Topic 0 |
| [options.topic01operator] | <code>&quot;and&quot;</code> \| <code>&quot;or&quot;</code> | Operator between topic0 & topic1 |
| [options.topic1] | <code>string</code> | Topic 1 |
| [options.topic12operator] | <code>&quot;and&quot;</code> \| <code>&quot;or&quot;</code> | Operator between topic1 & topic2 |
| [options.topic2] | <code>string</code> | Topic 2 |
| [options.topic23operator] | <code>&quot;and&quot;</code> \| <code>&quot;or&quot;</code> | Operator between topic2 & topic3 |
| [options.topic3] | <code>string</code> | Topic 3 |
| [options.topic02operator] | <code>&quot;and&quot;</code> \| <code>&quot;or&quot;</code> | Operator between topic0 & topic2 |

<a name="EtherscanApi+getRecentBlockNumber"></a>

### etherscanApi.getRecentBlockNumber() ⇒ <code>Promise.&lt;number&gt;</code>
Returns the number of the most recent block

**Kind**: instance method of [<code>EtherscanApi</code>](#EtherscanApi)  
<a name="EtherscanApi+getBlockByNumber"></a>

### etherscanApi.getBlockByNumber(blockNumber) ⇒ <code>Promise.&lt;object&gt;</code>
Returns information about a block by block number

**Kind**: instance method of [<code>EtherscanApi</code>](#EtherscanApi)  

| Param | Type | Description |
| --- | --- | --- |
| blockNumber | <code>number</code> | Block number |

<a name="EtherscanApi+getUncleByBlockNumberAndIndex"></a>

### etherscanApi.getUncleByBlockNumberAndIndex(blockNumber, [index]) ⇒ <code>Promise.&lt;object&gt;</code>
Returns information about a uncle by block number and index

**Kind**: instance method of [<code>EtherscanApi</code>](#EtherscanApi)  

| Param | Type | Default |
| --- | --- | --- |
| blockNumber | <code>number</code> |  | 
| [index] | <code>number</code> | <code>0</code> | 

<a name="EtherscanApi+getBlockTransactionCount"></a>

### etherscanApi.getBlockTransactionCount(blockNumber) ⇒ <code>Promise.&lt;number&gt;</code>
Returns the number of transactions in a block from a block matching the
given block number

**Kind**: instance method of [<code>EtherscanApi</code>](#EtherscanApi)  

| Param | Type |
| --- | --- |
| blockNumber | <code>number</code> | 

<a name="EtherscanApi+getTransactionByHash"></a>

### etherscanApi.getTransactionByHash(txhash) ⇒ <code>Promise.&lt;object&gt;</code>
Returns the information about a transaction requested by transaction hash

**Kind**: instance method of [<code>EtherscanApi</code>](#EtherscanApi)  

| Param | Type | Description |
| --- | --- | --- |
| txhash | <code>string</code> | Transaction hash |

<a name="EtherscanApi+getTransactionByBlockNumberAndIndex"></a>

### etherscanApi.getTransactionByBlockNumberAndIndex(blockNumber, [index]) ⇒ <code>Promise.&lt;object&gt;</code>
Returns information about a transaction by block number and transaction
index position

**Kind**: instance method of [<code>EtherscanApi</code>](#EtherscanApi)  

| Param | Type | Default |
| --- | --- | --- |
| blockNumber | <code>number</code> |  | 
| [index] | <code>number</code> | <code>0</code> | 

<a name="EtherscanApi+getTransactionCount"></a>

### etherscanApi.getTransactionCount(address, [options]) ⇒ <code>Promise.&lt;number&gt;</code>
Returns the number of transactions sent from an address

**Kind**: instance method of [<code>EtherscanApi</code>](#EtherscanApi)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | Transaction address |
| [options] | <code>object</code> |  |  |
| [options.tag] | <code>string</code> | <code>&quot;latest&quot;</code> |  |

<a name="EtherscanApi+sendRawTransaction"></a>

### etherscanApi.sendRawTransaction(hex) ⇒ <code>Promise.&lt;void&gt;</code>
Creates new message call transaction or a contract creation for signed
transactions

**Kind**: instance method of [<code>EtherscanApi</code>](#EtherscanApi)  

| Param | Type | Description |
| --- | --- | --- |
| hex | <code>string</code> | Raw hex encoded transaction that you want to send |

<a name="EtherscanApi+getTransactionReceipt"></a>

### etherscanApi.getTransactionReceipt(txhash) ⇒ <code>Promise.&lt;object&gt;</code>
Returns the receipt of a transaction by transaction hash

**Kind**: instance method of [<code>EtherscanApi</code>](#EtherscanApi)  

| Param | Type | Description |
| --- | --- | --- |
| txhash | <code>string</code> | Transaction hash |

<a name="EtherscanApi+call"></a>

### etherscanApi.call(to, data, [options]) ⇒ <code>Promise.&lt;string&gt;</code>
Executes a new message call immediately without creating a transaction on
the block chain

**Kind**: instance method of [<code>EtherscanApi</code>](#EtherscanApi)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| to | <code>string</code> |  | Address to execute from |
| data | <code>string</code> |  | Data to transfer |
| [options] | <code>object</code> |  |  |
| [options.tag] | <code>string</code> | <code>&quot;latest&quot;</code> |  |

<a name="EtherscanApi+getCode"></a>

### etherscanApi.getCode(address, [options]) ⇒ <code>Promise.&lt;string&gt;</code>
Returns code at a given address

**Kind**: instance method of [<code>EtherscanApi</code>](#EtherscanApi)  

| Param | Type | Default |
| --- | --- | --- |
| address | <code>string</code> |  | 
| [options] | <code>object</code> |  | 
| [options.tag] | <code>string</code> | <code>&quot;latest&quot;</code> | 

<a name="EtherscanApi+getStorageAt"></a>

### etherscanApi.getStorageAt(address, position, options) ⇒ <code>Promise.&lt;string&gt;</code>
Returns the value from a storage position at a given address.

**Kind**: instance method of [<code>EtherscanApi</code>](#EtherscanApi)  

| Param | Type | Default |
| --- | --- | --- |
| address | <code>string</code> |  | 
| position | <code>number</code> |  | 
| options | <code>object</code> |  | 
| [options.tag] | <code>string</code> | <code>&quot;latest&quot;</code> | 

<a name="EtherscanApi+getGasPrice"></a>

### etherscanApi.getGasPrice([options]) ⇒ <code>Promise.&lt;string&gt;</code>
Returns the current price per gas (in wei by default)

**Kind**: instance method of [<code>EtherscanApi</code>](#EtherscanApi)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>object</code> |  |  |
| [options.unit] | <code>string</code> | <code>&quot;wei&quot;</code> | Unit of gas |

<a name="EtherscanApi+estimateGas"></a>

### etherscanApi.estimateGas(toAddress, options) ⇒ <code>Promise.&lt;void&gt;</code>
Makes a call or transaction, which won't be added to the blockchain and
returns the used gas, which can be used for estimating the used gas

**Kind**: instance method of [<code>EtherscanApi</code>](#EtherscanApi)  

| Param | Type | Description |
| --- | --- | --- |
| toAddress | <code>string</code> | Address to get code from |
| options | <code>object</code> |  |
| options.value | <code>string</code> | Storage position |
| options.gasPrice | <code>string</code> | Gas price in wei |
| options.gas | <code>string</code> |  |

<a name="EtherscanApi+getTokenByContractAddress"></a>

### etherscanApi.getTokenByContractAddress(contractAddress) ⇒ <code>Promise.&lt;string&gt;</code>
Returns ERC20-Token total supply by contract address

**Kind**: instance method of [<code>EtherscanApi</code>](#EtherscanApi)  

| Param | Type |
| --- | --- |
| contractAddress | <code>string</code> | 

<a name="EtherscanApi+getTokenBalanceByContractAddress"></a>

### etherscanApi.getTokenBalanceByContractAddress(contractAddress, address, [options]) ⇒ <code>Promise.&lt;string&gt;</code>
Returns ERC20-Token account balance by token's contract address

**Kind**: instance method of [<code>EtherscanApi</code>](#EtherscanApi)  

| Param | Type | Default |
| --- | --- | --- |
| contractAddress | <code>string</code> |  | 
| address | <code>string</code> |  | 
| [options] | <code>object</code> |  | 
| [options.tag] | <code>object</code> | <code>latest</code> | 

<a name="EtherscanApi+getTotalEtherSupply"></a>

### etherscanApi.getTotalEtherSupply() ⇒ <code>Promise.&lt;string&gt;</code>
Returns total supply of Ether

**Kind**: instance method of [<code>EtherscanApi</code>](#EtherscanApi)  
<a name="EtherscanApi+getEtherLastPrice"></a>

### etherscanApi.getEtherLastPrice() ⇒ <code>Promise.&lt;object&gt;</code>
Returns Ether last price

**Kind**: instance method of [<code>EtherscanApi</code>](#EtherscanApi)  

* * *
