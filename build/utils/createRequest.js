"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise");
const serializeObject_1 = require("./serializeObject");
/**
 * Creates request
 * @param host The host for connect
 * @param params Query parameters
 */
function createRequest(host, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = serializeObject_1.serializeObject(params);
        const url = `${host}/api?${query}`;
        const resp = yield request(url);
        return JSON.parse(resp).result;
    });
}
exports.createRequest = createRequest;
