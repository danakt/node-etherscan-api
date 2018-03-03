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
