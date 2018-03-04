export const ACTIONS = {
  GET_BALANCE:                      'balance',
  GET_BALANCE_MULTI:                'balancemulti',
  GET_TRANSACTIONS_LIST:            'txlist',
  GET_TRANSACTIONS_LIST_INTERNAL:   'txlistinternal',
  GET_MINED_BLOCKS:                 'getminedblocks',
  GET_ABI:                          'getabi',
  GET_CONTRACT_STATUS:              'getstatus',
  GET_TRANSACTION_STATUS:           'gettxreceiptstatus',
  GET_BLOCK_REWARD:                 'getblockreward',
  GET_LOGS:                         'getLogs',
  GET_RECENT_BLOCK_NUMBER:          'eth_blockNumber',
  GET_BLOCK_BY_NUMBER:              'eth_getBlockByNumber',
  GET_UNCLE_BLOCK_NUMBER_AND_INDEX: 'eth_getUncleByBlockNumberAndIndex',
  GET_BLOCK_TX_COUNT_BY_NUMBER:     'eth_getBlockTransactionCountByNumber',
  GET_TRANSACTION_BY_HASH:          'eth_getTransactionByHash',
  GET_TX_BY_BLOCK_NUMBER_AND_INDEX: 'eth_getTransactionByBlockNumberAndIndex',
  GET_TRANSACTION_COUNT:            'eth_getTransactionCount',
  SEND_RAW_TRANSACTION:             'eth_sendRawTransaction',
  GET_TRANSACTION_RECEIPT:          'eth_getTransactionReceipt',
  CALL:                             'eth_call',
  GET_CODE:                         'eth_getCode',
  GET_STORAGE_AT:                   'eth_getStorageAt',
  GET_GAS_PRICE:                    'eth_gasPrice',
  ESTIMATE_GAS:                     'eth_estimateGas',
  GET_TOKEN_BY_CONTRACT:            'tokensupply',
  GET_TOKEN_BALANCE_BY_CONTRACT:    'tokenbalance',
  GET_TOTAL_SUPPLY:                 'ethsupply',
  GET_LAST_PRICE:                   'ethprice'
}
