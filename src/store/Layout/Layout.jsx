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

// 기준 관리

//목적지 관리 - 목적지 등록 Modal
export const modalAtom = atom(false)

export const popupAtom = atom(false)

//모든 수정 버튼의 Modal
export const btnCellRenderAtom = atom(false)

//목적지 관리 - 목적지 수정버튼 Uid
export const btnCellUidAtom = atom('')

//운반비 관리 - 운반비 등록 Modal
export const destiPostModalAtom = atom(false)

//운반비 관리 - 운반비 삭제 popup
export const destiDelPopupAtom = atom(false)

//운반비 관리 - 운반비 수정버튼 Modal
export const destiEditModalAtom = atom(false)

//운반비 관리 - 운반비 수정 Cell Uid
export const destiEditCellUidAtom = atom('')

//합짐 관리 - 운반비 수정 버튼 Modal
export const surEditModalAtom = atom(false)

//할증 관리 - 할증 등록 /수정 버튼 타입 지정
export const surTypeAtom = atom('')

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

export const onClickCheckAtom = atom(false)
