/*
 * Transaction info
 */
declare type TransactionDescription = {
  blockHash: string
  blockNumber: string
  confirmations: string
  contractAddress: string
  cumulativeGasUsed: string
  from: string
  gas: string
  gasPrice: string
  gasUsed: string
  hash: string
  input: string
  isError: string
  nonce: string
  timeStamp: string
  to: string
  transactionIndex: string
  txreceipt_status: string
  value: string
}

/**
 * Internal transaction info
 */
declare type InternalTransactionDescription = {
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
