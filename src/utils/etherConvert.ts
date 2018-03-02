import { UNITS } from '../constants/units'
import BigNumber from 'bignumber.js'

/**
 * Coverts Ethereum units
 * @param value Value to convert
 * @param from Covert from
 * @param to Convert to
 * @return {BigNumber}
 */
export function etherConvert(
  value: number | string | BigNumber,
  from: keyof typeof UNITS,
  to: keyof typeof UNITS
): string {
  return new BigNumber(value)
    .multipliedBy(UNITS[from])
    .integerValue(BigNumber.ROUND_DOWN)
    .div(UNITS[to])
    .toFixed()
}
