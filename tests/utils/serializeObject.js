const serializeObject = require('../../src/utils/serializeObject')

test('Serialize object to props', () => {
  const str = serializeObject({
    param1: '123',
    param2: 123,
    param3: true,
    param4: undefined,
    param5: false,
    param6: 'false'
  })

  expect(str).toBe('param1=123&param2=123&param3&param6=false')
})
