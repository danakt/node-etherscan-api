"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Coverts object to get-param-string
 * @param {object} obj Key-value map
 * @return {string}
 */
function serializeObject(obj) {
    return Object.keys(obj)
        .map(function (key) { return (obj[key] == null ? key : key + "=" + encodeURIComponent(obj[key])); })
        .join('&');
}
exports.serializeObject = serializeObject;
