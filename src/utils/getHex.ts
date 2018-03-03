/**
 * Return hexadecimal number with "0x" from decimal number
 * @param {number} num Decimal number
 * @return {number} Hexadecimal number
 */
export function getHex(num: number): string {
  return '0x' + num.toString(16)
}
