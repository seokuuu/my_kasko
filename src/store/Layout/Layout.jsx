import { atom, useAtom } from 'jotai'

export const headerAtom = atom(true)
export const accordionAtom = atom(true)
export const subHeaderAtom = atom(true)

export const toggleAtom = atom(true)

export const calendarAtom = atom(false)

export const alertAtom = atom(false)
export const alertAtom2 = atom(false)

export const blueModalAtom = atom(false)

export const packageCEAtom = atom('')

export const winningAtom = atom(false)

// 오른쪽 창 모드
export const rightOneAtom = atom(true)
export const rightTwoAtom = atom(true)
export const rightThreeAtom = atom(true)
export const rightFourAtom = atom(true)

export const rightArray = atom([true, false, false, false])

export const rightSwitch = atom(false)

// 아코디언 열기, 닫기
export const accordionOpenAtom = atom(false)
export const useAccordionOpenAtom = () => useAtom(accordionOpenAtom)

// test3 테이블 체크했을시 데이터
export const selectedRowsAtom = atom([])

// test3 테이블 체크했을시 데이터
export const doubleClickedRowAtom = atom([])

// 테이블 page 50/100/500 정렬
export const pageSort = atom(50)

// 대표 상세 정보 모달
export const clientModalAtom = atom(false)

//사용자 관리 - 고객사 관리파트 회원제한모달
export const AuctionRestrictionModal = atom(false)

export const modalAtom = atom(false)

export const popupAtom = atom(false)

console.log('popupAtom =>', popupAtom)

export const popupTypeAtom = atom('')

export const popupObject = atom({
  num: '', // num 값에 따라 초기 팝업 설정
  title: '',
  content: '',
  type: '', // type 값에 따라 버튼 구조 설정
  next: '',
  onClick: () => {},
  func: () => {},
  func2: () => {},
})

export const modalObject = atom({
  func: () => {},
})

export const engRowTitle = atom('')

export const excelToJsonAtom = atom('')

// 수정버튼 Modal
export const btnCellRenderAtom = atom(false)
// 수정버튼 Uid
export const btnCellUidAtom = atom('')

export const onClickCheckAtom = atom(false)
