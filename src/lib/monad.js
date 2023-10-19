// ✅ 함수형 프로그래밍을 nullish, type을 안전하게 하기위함
import * as R from 'ramda'

export class Maybe {
  constructor(value) {
    this.value = value
  }

  static of(value) {
    return new Maybe(value)
  }

  map(fn) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this.value))
  }

  isNothing() {
    return this.value === null || this.value === undefined
  }
}
