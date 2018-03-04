import { MODULES } from '../constants/modules';
import { ACTIONS } from '../constants/actions';
/** Type of params */
export declare type TParams = {
    [param: string]: void | string | number | boolean;
    module: ValueOf<typeof MODULES>;
    action: ValueOf<typeof ACTIONS>;
    apikey?: string;
};
/**
 * Creates request
 * @param host The host for connect
 * @param params Query parameters
 */
export declare function createRequest(host: string, params: TParams): Promise<any>;
