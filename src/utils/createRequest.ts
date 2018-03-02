import * as request        from 'request-promise'
import { serializeObject } from './serializeObject'
import { MODULES }         from '../constants/modules'
import { ACTIONS }         from '../constants/actions'

type TRequiredParams = {
  module: ValueOf<typeof MODULES>
  action: ValueOf<typeof ACTIONS>
  apikey: string
}

type TSelectiveParams
  // Request balance
  = | {
      module: typeof MODULES.ACCOUNT
      action: typeof ACTIONS.BALANCE | typeof ACTIONS.BALANCE_MULTI
      address: string
      tag?: string
    }
  // Request transactions list
  | {
      module: typeof MODULES.ACCOUNT
      action: typeof ACTIONS.TRANSACTIONS_LIST
      address: string
      endblock?: number
      startblock?: number
      offset?: number
      page?: number
      sort?: 'asc' | 'desc'
    }

type TParams = TRequiredParams & TSelectiveParams

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
