/**
 * Type of an event
 */
declare interface EventDescription {
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
