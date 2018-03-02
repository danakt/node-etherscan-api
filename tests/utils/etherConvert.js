const { etherConvert } = require('../../build/utils/etherConvert')

describe('Ether units coverter', () => {
  test('Should work for big unit to small unit', function () {
    expect(etherConvert('1', 'eth', 'wei')).toBe('1000000000000000000')
    expect(etherConvert('20', 'gwei', 'wei')).toBe('20000000000')
    expect(etherConvert('20.05', 'gwei', 'wei')).toBe('20050000000')
    expect(etherConvert('20.005', 'kwei', 'wei')).toBe('20005')
    expect(etherConvert('20.0005', 'kwei', 'wei')).toBe('20000')
    expect(etherConvert('1', 'tether', 'eth')).toBe('1000000000000')
    expect(etherConvert('1', 'tether', 'wei')).toBe(
      '1000000000000000000000000000000'
    )
  })

  test('Should work for small unit to big unit', function () {
    expect(etherConvert('1', 'wei', 'eth')).toBe('0.000000000000000001')
    expect(etherConvert('0.5', 'wei', 'eth')).toBe('0')
    expect(etherConvert('0.0005', 'kwei', 'eth')).toBe('0')
    expect(etherConvert('1', 'finney', 'eth')).toBe('0.001')
    expect(etherConvert('20', 'gwei', 'eth')).toBe('0.00000002')
    expect(etherConvert('1', 'eth', 'tether')).toBe('0.000000000001')
    // XXX: precision loss
    expect(etherConvert('1', 'wei', 'tether')).toBe('0')
  })

  test('Should work for same unit', () => {
    expect(etherConvert('1', 'wei', 'wei')).toBe('1')
  })
})
