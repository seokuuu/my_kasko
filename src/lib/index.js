export function isEmptyObj(obj) {
  // 객체 타입체크
  if (obj.constructor !== Object) {
    return false
  }

  // property 체크
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (obj[prop] === '' || undefined || null) {
        return false
      }
    }
  }

  return true
}
