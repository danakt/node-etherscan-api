const { serializeObject } = require('../../build/utils/serializeObject')

test('Serialize object to props', () => {
  const str = serializeObject({
    param1: '123',
    param2: 123,
    param3: true,
    param4: undefined
  })

  expect(str).toBe('param1=123&param2=123&param3=true&param4')
})
