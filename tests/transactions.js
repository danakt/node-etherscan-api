const EtherscanAPI = require('../src/EtherscanAPI')

describe('Etherscan transactions methods', () => {
  const e = new EtherscanAPI()

  test('getContractExecutionStatus', () => {
    return e
      .getContractExecutionStatus(
        '0x513c1ba0bebf66436b5fed86ab668452b7805593c05073eb2d51d3a52f480a76'
      )
      .then(data => {
        expect(typeof data.isError).toBe('string')
      })
  })

  test('getTransactionStatus', () => {
    return e
      .getTransactionStatus(
        '0x513c1ba0bebf66436b5fed86ab668452b7805593c05073eb2d51d3a52f480a76'
      )
      .then(data => {
        expect(typeof data.status).toBe('string')
      })
  })
})
