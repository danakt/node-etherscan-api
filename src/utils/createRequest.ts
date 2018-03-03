import * as request        from 'request-promise'
import { serializeObject } from './serializeObject'
import { MODULES }         from '../constants/modules'
import { ACTIONS }         from '../constants/actions'

/** Type of params */
export type TParams = {
  [param: string]: void | string | number | boolean
  module: ValueOf<typeof MODULES>
  action: ValueOf<typeof ACTIONS>
  apikey?: string
}

/**
 * Creates request
 * @param host The host for connect
 * @param params Query parameters
 */
export async function createRequest(
  host: string,
  params: TParams
): Promise<any> {
  const query = serializeObject(params)
  const url = `${host}/api?${query}`
  const resp = await request(url)

  return JSON.parse(resp).result
}
