import * as request        from 'request-promise'
import { serializeObject } from './serializeObject'
import { MODULES }         from '../constants/modules'

/** Request parameters */
export type TParams = {
  module: ValueOf<typeof MODULES>
  action: string
  apikey: string
  tag?: string
  address?: string
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
