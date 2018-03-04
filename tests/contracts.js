const EtherscanAPI = require('../src/EtherscanAPI')

describe('Etherscan contracts methods', () => {
  const e = new EtherscanAPI()

  test('getContractAbi', async () => {
    const abi = await e.getContractAbi(
      '0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413'
    )
    expect(Array.isArray(abi)).toBe(true)
    expect(
      ['function', 'constructor', 'event', 'fallback'].includes(abi[0].type)
    ).toBe(true)
    // console.log(abi)
  })
})
