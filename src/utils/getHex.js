/**
 * Return hexadecimal number with "0x" from decimal number
 * @param {number} [num=0] Decimal number
 * @return {number} Hexadecimal number
 */
function getHex(num = 0) {
  return '0x' + num.toString(16)
}

module.exports = getHex
