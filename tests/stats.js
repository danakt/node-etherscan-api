const EtherscanAPI = require('../src')

describe('Etherscan stats methods', () => {
  const e = new EtherscanAPI()

  test('getTotalEtherSupply', async () => {
    const data = await e.getTotalEtherSupply()
    expect(isNaN(Number(data))).toBe(false)
  })

  test('getEtherLastPrice', async () => {
    const data = await e.getEtherLastPrice()
    expect(Object.keys(data)).toEqual([
      'ethbtc',
      'ethbtc_timestamp',
      'ethusd',
      'ethusd_timestamp'
    ])
  })
})
