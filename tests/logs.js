const EtherscanAPI = require('../src')

describe('Etherscan logs methods', () => {
  const e = new EtherscanAPI()

  test('getEventsLogs', async () => {
    const logs = await e.getEventsLogs(
      '0x33990122638b9132ca29c723bdf037f1a891a70c',
      {
        fromBlock: 379224,
        toBlock:   400000,
        topic0:
          '0xf63780e752c6a54a94fc52715dbc5518a3b4c3c2833d301a204226548a2a8545',
        topic01operator: 'and',
        topic1:
          '0x72657075746174696f6e00000000000000000000000000000000000000000000'
      }
    )

    expect(Array.isArray(logs)).toBe(true)
    expect(logs.length).not.toBe(0)
    expect(logs[0]).not.toEqual([
      'address',
      'topics',
      'data',
      'blockNumber',
      'timeStamp',
      'gasPrice',
      'gasUsed',
      'logIndex',
      'transactionHash',
      'transactionIndex'
    ])
  })
})
