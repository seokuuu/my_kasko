import * as R from 'ramda'
import {} from 'ramda'
// ramda 공식문서 : https://ramdajs.com/docs/
// ramda 블로그 : https://fr.umio.us/why-ramda/

// 자주쓰는 API 리스트 :
// Function : pipe, curry, curryN, andThen, otherwise, identify, T ,F, juxt,apply 등
// List : map, filter, find, reduce, sort, sortBy, range, tail, take, takeLast, uniq, concat, fromPair 등
// Logic : ifElse, when, unless, cond, and 등
// Relation : equals, gt, lt, clamp, min, IsNil 등

// ❤️ 목적 : Ramda.api를 활용한 또 다른 함수를 만드는 유연한 함수형 코딩 (유연함 + 합성)

// 함수를 compose하라, 람다는 데이터를 다음인자에 넣어주기만 하면 자동 커링이 됩니다. (지연 실행)
// var sortByDateDescend = R.compose(R.reverse, sortByDate);
// var sortUserTasks = R.compose(R.mapObj(sortByDateDescend), activeByUser);

// 데이터는 어디로 넣어주나요!? => 파이프라인 => "데이터가 흘러 나올 때까지 기다려라"

// ✅ 권유
// 리팩토링시 함수만 고치면되는 매우 간결한 코드
// 실제로 기능적인 코드를 작성하지 않고 단지 명령형 스타일로 작성하고 싶다면 map, Reduce 또는 filter와 같은 기본 ES6 기능을 사용하는 것이 좋습니다.

const log = console.log
log('*** Ramda using ***')

//기본예시
// R.is(Number);

const sum = (arg) => arg.reduce((acc, i) => acc + i)
const odd = (arg) => arg.filter((_) => _ % 2)
// const rlst = R.pipe(odd, sum)([1, 2, 3, 4, 5])

const group = [
  { username: 'u', data: 'data1' },
  { username2: 'abc', data: 'data2' },
  { username3: 'adsf', data: 'data3' },
  { username4: 'username', data: 'data4' },
]
const groupByUser = R.partition(R.prop('username'))
log(groupByUser(group))

// const topFiveUserTasks = R.compose(R.mapObj(R.take(5)), 'sortUserTasks')

// const divide = (a, b) => {
//   if (typeof a !== 'number' || typeof b !== 'number') {
//     throw new Error('Invalid input');
//   }
//   return a / b;
// };

// const safeDivide = R.tryCatch(
//   divide,
//   R.always('Error: Invalid input')
// );

// ✅ 다양한 접근성
// var incomplete = R.filter(R.where({complete: false}));
// var sortByDate = R.sortBy(R.prop('dueDate'));
// var sortByDateDescend = R.compose(R.reverse, sortByDate);
// var importantFields = R.project(['title', 'dueDate']);
// var groupByUser = R.partition(R.prop('username'));
// var activeByUser = R.compose(groupByUser, incomplete);
// var topDataAllUsers = R.compose(R.mapObj(R.compose(importantFields,
//     R.take(5), sortByDateDescend)), activeByUser);
