const EtherscanAPI = require('../src/EtherscanAPI')

describe('Etherscan blocks methods', () => {
  const e = new EtherscanAPI()

  test('getBlockReward', async () => {
    const block = await e.getBlockReward(2165403)
    expect(Object.keys(block)).toEqual([
      'blockNumber',
      'timeStamp',
      'blockMiner',
      'blockReward',
      'uncles',
      'uncleInclusionReward'
    ])
  })
})
