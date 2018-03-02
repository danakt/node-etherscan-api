/**
 * Coverts object to get-param-string
 * @param {object} obj Key-value map
 * @return {string}
 */
export function serializeObject(obj: { [any: string]: any }): string {
  return Object.keys(obj)
    .map(
      key => (obj[key] == null ? key : `${key}=${encodeURIComponent(obj[key])}`)
    )
    .join('&')
}
