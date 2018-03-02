import * as request        from 'request-promise'
import { serializeObject } from './serializeObject'
import { MODULES }         from '../constants/modules'
import { ACTIONS }         from '../constants/actions'

// Required params for any request
type TRequiredParams = {
  module: ValueOf<typeof MODULES>
  action: ValueOf<typeof ACTIONS>
  apikey: string
}

// Request balance
type TBalanceParams = {
  address: string
  tag?: string
}

// Request transactions list
type TTxParams = {
  address: string
  endblock?: number
  startblock?: number
  offset?: number
  page?: number
  sort?: 'asc' | 'desc'
}

/** Request parameters */
export type TParams = TRequiredParams & (TBalanceParams | TTxParams)

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
