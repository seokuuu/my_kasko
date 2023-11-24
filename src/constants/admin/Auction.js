// 경매 관리 - 단가 등록
export const AuctionUnitPricePost = {
  제품군: 'dropdown',
  정척여부: 'dropdown2',
  유찰횟수: 'input',
  제품등급: 'dropdown3',
  적용일자: 'auto',
  '적용 단가': 'input',
}

// 해당 값 쓰일 컴포넌트 -> Upload로 props로 전달
// const dropdownProps = [
//   { options: AuctionUnitPricePostDropOptions, defaultValue: AuctionUnitPricePostDropOptions[0] },
//   { options: AuctionUnitPricePostDropOptions2, defaultValue: AuctionUnitPricePostDropOptions2[0] },
// ]

//dropdown
export const AuctionUnitPricePostDropOptions = [
  { value: 'ask0', label: '제품군 ' },
  { value: 'ask1', label: '1' },
  { value: 'ask2', label: '2' },
  { value: 'ask3', label: '3' },
  { value: 'ask4', label: '4' },
]

//dropdown2
export const AuctionUnitPricePostDropOptions2 = [
  { value: 'ask0', label: '정척여부 ' },
  { value: 'ask1', label: '1' },
  { value: 'ask2', label: '2' },
  { value: 'ask3', label: '3' },
  { value: 'ask4', label: '4' },
]

//dropdown3
export const AuctionUnitPricePostDropOptions3 = [
  { value: 'ask0', label: '제품등급 ' },
  { value: 'ask1', label: '1' },
  { value: 'ask2', label: '2' },
  { value: 'ask3', label: '3' },
  { value: 'ask4', label: '4' },
]


// !! 영역이 좁으므로 Upload props에 width값 1000 주고 쓰기 !!!