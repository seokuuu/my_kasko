import _ from 'lodash'

export const log = console.log

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

export function isEmptyArray(arr) {
  return _.isArray(arr) && _.isEmpty(arr)
}

export function isArray(arr) {
  return _.isArray(arr)
}

export function isEmptyObject(obj) {
  return _.isObject(obj) && _.isEmpty(obj)
}

export function isObject(obj) {
  return _.isObject(obj)
}
export function isValidValue(value) {
  return value !== null && value !== undefined && value !== ''
}

// 객체 value없을때 삭제
export function removeEmptyFields(obj) {
  return Object.keys(obj)
    .filter((key) => isValidValue(obj[key]))
    .reduce((acc, key) => {
      acc[key] = obj[key]
      return acc
    }, {})
}

export function createQueryParams(obj) {
  return Object.keys(obj)
    .map((key) => `${key}=${encodeURIComponent(obj[key])}`)
    .join('&')
}

// 객체 return url

// // 1. Array Utilities
// export const arrayUtils = {
//   isEmptyArray: (arr) => _.isEmpty(arr),
//   uniqueElements: (arr) => _.uniq(arr),
//   flattenArray: (arr) => _.flatten(arr),
// }

// // 2. Object Utilities
// export const objectUtils = {
//   isEmptyObject: (obj) => _.isEmpty(obj),
//   objectKeys: (obj) => _.keys(obj),
//   objectValues: (obj) => _.values(obj),
// }

// // 3. String Utilities
// export const stringUtils = {
//   capitalizeString: (str) => _.capitalize(str),
//   camelCaseString: (str) => _.camelCase(str),
//   kebabCaseString: (str) => _.kebabCase(str),
// }

// // 4. Collection Utilities
// export const collectionUtils = {
//   findInCollection: (collection, predicate) => _.find(collection, predicate),
//   filterCollection: (collection, predicate) => _.filter(collection, predicate),
//   mapCollection: (collection, iteratee) => _.map(collection, iteratee),
// }

// // 5. Number Utilities
// export const numberUtils = {
//   addNumbers: (a, b) => _.add(a, b),
//   subtractNumbers: (a, b) => _.subtract(a, b),
//   multiplyNumbers: (a, b) => _.multiply(a, b),
// }

// // 6. Function Utilities
// export const functionUtils = {
//   debounceFunc: (func, wait) => _.debounce(func, wait),
//   throttleFunc: (func, wait) => _.throttle(func, wait),
//   memoizeFunc: (func) => _.memoize(func),
// }

// // 7. Date Utilities
// export const dateUtils = {
//   now: () => _.now(),
//   delay: (func, wait) => _.delay(func, wait),
// }

// // 8. Lang Utilities
// export const langUtils = {
//   isNull: (value) => _.isNull(value),
//   isUndefined: (value) => _.isUndefined(value),
//   isFunction: (value) => _.isFunction(value),
// }

// // 9. Math Utilities
// export const mathUtils = {
//   getRandom: (min, max) => _.random(min, max),
//   meanOfArray: (arr) => _.mean(arr),
//   sumOfArray: (arr) => _.sum(arr),
// }

// // 10. Sequence Utilities
// export const sequenceUtils = {
//   flowFunctions: (...funcs) => _.flow(funcs),
//   chainSequence: (value) => _.chain(value),
// }

// // 사용 예시:
// console.log(arrayUtils.uniqueElements([1, 2, 2, 3])) // [1, 2, 3]
