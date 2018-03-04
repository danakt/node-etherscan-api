/**
 * Return hexadecimal number with "0x" from decimal number
 * @param {number} [num=0] Decimal number
 * @return {number} Hexadecimal number
 */
export function getHex(num: number = 0): string {
  return '0x' + num.toString(16)
}
