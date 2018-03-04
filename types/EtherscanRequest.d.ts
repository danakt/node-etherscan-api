import { NETWORKS } from './constants/networks';
import { TParams } from './utils/createRequest';
export declare class EtherscanRequest {
    /** Etherscan API token */
    protected token: string;
    /** Network name */
    protected network: keyof typeof NETWORKS;
    /** Network API host */
    protected host: string;
    /**
     * @constructor
     * @param {string} [token="YourApiKeyToken"] Etherscan API token
     * @param {string} [network="main"] Network name. Available: main, ropsten,
     * kovan, rinkeby
     */
    protected constructor(token?: string, network?: string);
    /**
     * Creates request
     * @private
     * @param params Query params
     * @return {Promise<any>}
     */
    protected createRequest(params: TParams): Promise<any>;
}
