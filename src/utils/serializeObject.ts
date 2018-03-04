/**
 * Coverts object to get-param-string
 * @param {object} obj Key-value map
 * @return {string}
 */
export function serializeObject(obj: { [any: string]: any }): string {
  return Object.keys(obj)
    .map(key => {
      if (obj[key] == null || obj[key] === false) {
        return false
      }

      if (obj[key] === true) {
        return key
      }

      return `${key}=${encodeURIComponent(obj[key])}`
    })
    .filter(Boolean)
    .join('&')
}
