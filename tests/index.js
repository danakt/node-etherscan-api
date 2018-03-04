const EtherscanAPI = require('../src/EtherscanAPI')

test('Etherscan instance', () => {
  const etherscan1 = new EtherscanAPI('SomeToken')
  expect(etherscan1.token).toBe('SomeToken')
  expect(etherscan1.network).toBe('MAIN')
  expect(etherscan1.host).toBe('https://api.etherscan.io')

  const etherscan2 = new EtherscanAPI('123', 'ropsten')
  expect(etherscan2.token).toBe('123')
  expect(etherscan2.network).toBe('ROPSTEN')
  expect(etherscan2.host).toBe('http://api-ropsten.etherscan.io')
})
