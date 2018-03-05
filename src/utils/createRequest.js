const request = require('request-promise')
const serializeObject = require('./serializeObject')

/**
 * Creates request
 * @param {string} host The host for connect
 * @param {object} params Query parameters
 * @return {any}
 */
async function createRequest(host, params) {
  const query = serializeObject(params)
  const url = `${host}/api?${query}`
  const resp = await request(url)
  const data = JSON.parse(resp)

  if (data.error || data.result === null) {
    const message = data.message
      ? data.message
      : (data.error && data.error.message) || data.error

    throw new Error(message)
  }

  return data.result
}

module.exports = createRequest
