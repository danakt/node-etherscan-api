const { getHex } = require('../../build/utils/getHex')

test('Get hex from number', () => {
  expect(getHex()).toBe('0x0')
  expect(getHex(0)).toBe('0x0')
  expect(getHex(1234567890)).toBe('0x499602d2')
})
