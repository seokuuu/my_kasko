// value가 빈값이면 페이로드에 아예 실리지 않게 만드는 짧은 유틸 함수 입니다.
/// 임포트하고, 파람스 넣고, 변수로 지정해주세요
export function Filtering(params) {
  return Object.fromEntries(Object.entries(params).filter(([_, v]) => v !== ''))
}

export function FilteringV2(params) {
  return Object.fromEntries(Object.entries(params).filter(([_, v]) => Boolean(v)))
}
