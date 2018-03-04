const createRequest = require('../../src/utils/createRequest')

test('Create request', () => {
  return createRequest('https://api.etherscan.io', {
    module:  'account',
    action:  'balance',
    address: '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae',
    tag:     'latest',
    apikey:  ''
  }).then(data => {
    expect(isNaN(Number(data))).toBeFalsy()
  })
})
