const UNITS = require('../constants/units')
const BigNumber = require('bignumber.js')

/**
 * Coverts Ethereum units
 * @param {string} value Value to convert
 * @param {string} from Covert from
 * @param {string} to Convert to
 * @return {BigNumber}
 */
function etherConvert(value, from, to) {
  return new BigNumber(value)
    .multipliedBy(UNITS[from])
    .integerValue(BigNumber.ROUND_DOWN)
    .div(UNITS[to])
    .toFixed()
}

module.exports = etherConvert
