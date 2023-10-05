import _ from 'lodash'
import { add, delay, go, reduce, rangeL } from 'fxjs'
import * as L from 'fxjs/Lazy'
import * as C from 'fxjs/Concurrency'

export const log = console.log

// go(
//   rangeL(1, 4),
//   L.map((a) => a * a),
//   L.map(delay(300)),
//   C.takeAll,
//   reduce(add),
//   console.log,
// )
// const result = go(
//   [1, 2, 3, 4, 5],
//   L.map((a) => a * a),
// )
// log(result)

const res = go([1,2,3,4,5],)

export const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a))

export const pipe1 =
  (...fns) =>
  (arg) =>
    fns.reduce((acc, fn) => fn(acc), arg)

// exception.js 모듈
export function exception(condition) {
  return function (originalFunction) {
    return function (value) {
      try {
        const result = originalFunction(value)
        if (condition(result)) {
          return result
        }
      } catch (e) {
        if (condition(e)) {
          return e
        }
      }
    }
  }
}

// error.js 모듈
export function error() {
  return function (originalFunction) {
    return function (value) {
      try {
        return originalFunction(value)
      } catch (e) {
        console.error(e)
      }
    }
  }
}

// nullable.js 모듈
export function nullable() {
  return function (originalFunction) {
    return function (value) {
      if (value === null || value === undefined) {
        return originalFunction(value)
      }
    }
  }
}

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

export function isArrayAnd(arr) {
  if (_.isArray(arr)) return arr
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
