/** Block info */
declare interface BlockInfo {
  blockNumber: string
  blockReward: string
  timeStamp: string
}

declare interface BlockRewardInfo extends BlockInfo {
  blockMiner: string
  uncleInclusionReward: string
  uncles: Array<{
    blockreward: string
    miner: string
    unclePosition: string
  }>
}

declare interface GethBlockInfo {
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
