const EtherscanAPI = require('../src/EtherscanAPI')

describe('Etherscan tokens methods', () => {
  const e = new EtherscanAPI()

  test('getTokenByContractAddress', async () => {
    const data = await e.getTokenByContractAddress(
      '0x57d90b64a1a57749b0f932f1a3395792e12e7055'
    )

    expect(isNaN(Number(data))).toBe(false)
  })

  test('getTokenBalanceByContractAddress', async () => {
    const data = await e.getTokenBalanceByContractAddress(
      '0x57d90b64a1a57749b0f932f1a3395792e12e7055',
      '0xe04f27eb70e025b78871a2ad7eabe85e61212761'
    )

    expect(isNaN(Number(data))).toBe(false)
  })
})
