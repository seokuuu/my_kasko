import { atom, useAtom } from 'jotai'

export const headerAtom = atom(true)
export const accordionAtom = atom(true)
export const subHeaderAtom = atom(true)

export const toggleAtom = atom(true)

export const calendarAtom = atom(false)

export const alertAtom = atom(false)
export const alertAtom2 = atom(false)

// 규격 약호 찾기 Global Modal
export const blueModalAtom = atom(false)
export const hyundaiModalAtom = atom(false)
export const standardModalAtom = atom(false)
export const SingleProductModalAtom = atom(false)
export const claimProductModalAtom = atom(false)
// 규격약호 선택 값
export const specAtom = atom('')
export const hyundaiSpecAtom = atom('')
export const standardSpecAtom = atom('')
export const SingleProductSpecAtom = atom('')

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

export const selectedRowsAtom2 = atom([])
export const selectedRowsAtom3 = atom([])

// 중복 방지 switch (모달 진입시 false로 막음)
export const selectedRows2Switch = atom(true)

// test3 테이블 체크했을시 데이터
export const doubleClickedRowAtom = atom([])

// 테이블 page 50/100/500 정렬
export const pageSort = atom(50)

// 대표 상세 정보 모달 (수정)
export const clientEditModalAtom = atom(false)

// 대표 상세 정보 모달 (회원 생성)
export const clientPostModalAtom = atom(false)

/* ==============================
     사용자 관리 (usermanage)
============================== */

//사용자 관리 - 고객사 관리파트 회원제한모달
export const AuctionRestrictionModal = atom(false)

// 고객사 관리 수정버튼 모달 switch
export const userpageDestinationEdit = atom(false)

// + 고객사 관리 수정버튼 Test
export const usermanageClientEdit = atom(false)

// 고객사 목적지 관리 수정버튼
export const UsermanageDestiEditModal = atom(false)

// 고객사 목적지 등록 /수정 - 조회
export const UsermanageFindModal = atom(false)

export const UsermanageUserPostModal = atom(false)

export const UsermanageUserManageEditModal = atom(false)
/* ==============================
     주문 관리 (Order)
============================== */

export const OrderCellAtom = atom({
	auctionNumber: '',
	customerCode: '',
	storage: '',
	customerDestinationUid: '',
})

/* ==============================
    출고 관리 (Standard)
============================== */

// 배차기사 관리 - 배차 기사 등록 modal
export const StandardDispatchPostAtom = atom(false)

// 배차기사 관리 - 배차 기사 수정 modal
export const StandardDispatchEditAtom = atom(false)

// 배차/출고등록  -
export const StandardDispatchDetailAtom = atom(false)

/* ==============================
     경매 관리 (Auction)
============================== */

// 경매 관리 - 경매 회차 관리 / 경매 목록 수정 Modal
// 기본 : 경매 회차 관리
// 수정 : 경매 목록 수정(단일)
export const aucProListEditAtom = atom('기본')

// 경매 관리 - 경매 회차 관리 / 경매 회차 등록 Modal
export const roundPostModalAtom = atom(false)

// 경매 관리 - 경매 회차 관리 / 경매 목록 수정 Modal
export const auctionRoundEditPageAtom = atom(false)

// 경매 목록 수정 - 제품 추가 Modal
export const aucProAddModalAtom = atom(false)

// 경매 낙찰관리 - 낙찰 생성 - 고객사 찾기 버튼 Modal
export const WinningCreateFindAtom = atom(false)

export const WinningProductAddAtom = atom(false)

// 경매 시작 단가 관리 - 단가 등록 Modal
export const AuctionUnitPriceAtom = atom(false)

// 경매 타입
export const auctionTypeAtom = atom('단일')

/* ==============================
    기준 관리 (Standard)
============================== */

//목적지 관리 - 목적지 등록 Modal
export const modalAtom = atom(false)

export const popupAtom = atom(false)

//수정 버튼의 Modal (test)
export const btnCellRenderAtom = atom(false)

export const StandardConsoliateEdit = atom(false)

// 전체 Uid
export const btnCellUidAtom = atom('')

//운반비 관리 - 운반비 등록 Modal
export const destiPostModalAtom = atom(false)

//운반비 관리 - 운반비 삭제 popup
export const destiDelPopupAtom = atom(false)

//운반비 관리 - 운반비 수정버튼 Modal
export const destiEditModalAtom = atom(false)

//운반비 관리 - 운반비 수정 Cell Uid
export const destiEditCellUidAtom = atom('')

//할증 관리 - 운반비 수정 버튼 Modal
export const surEditModalAtom = atom('')

//할증 관리 - 할증 등록 /수정 버튼 타입 지정
export const surTypeAtom = atom('')

//합짐비 관리 - 합짐비 수정 버튼 Modal
export const consolEditModalAtom = atom('')

/* ==============================
    출고 관리 (shipping)
============================== */

//출고 관리 - 배차기사 관리 등록 / 수정 Modal
export const dispatchPostEditAtom = atom(false)

//출고 관리 - 배차기사 관리 등록 / 수정  타입 지정
export const dispatchTypeAtom = atom('등록')

//출고 관리 - 출고 실적 - 추가비 및 공차비 추가 Momal
export const achievementAddedAtom = atom(false)

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

/* ==============================
    운영 관리
============================== */

// 운영 관리 > 제품군 수정,창고 추가
export const operateAddAtom = atom(false)

// 테이블 모달에 대한 atom
// 해당 모달을
// 한 컴포넌트에서 모달 갯수가 많으면 ..? 어떻게 관리?
// bluebar에서 관리를 하는게 좋나?

//패키지 상세 보기
export const packDetailAuctView = atom(false)

export const modal1 = atom(false)

/* ==============================
  ***** 사용자 페이지 *****
============================== */

/* ==============================
    마이페이지 (userpage)
============================== */

// 선호제품 관리 수정버튼 모달 switch
export const userpageUserPreferEdit = atom(false)

//  선호제품 관리 수정 Object
export const userpageUserPreferEditObject = atom('')

// ========= 재고 수불 관리 ===============
// 목적지
export const invenDestination = atom(false)
// 고객사
export const invenCustomer = atom(false)
// 고객사 데이터
export const invenCustomerData = atom({
	businessNumber: '',
	code: '',
	name: '',
	uid: 0,
})

export const invenDestinationData = atom({
	code: '',
	name: '',
	uid: 0,
})

export const winningDestiData = atom({
	uid: null,
	code: '',
	represent: 0,
	destinationCode: null,
	destinationName: null,
	name: '',
	managerPhone: '',
	phone: '',
	address: '',
})

// =======================================

// 목적지 관리 수정 switch
export const userpageDestiEdit = atom(false)

// 판매 구분 변경 -> (판매 제품 관리)

export const hyunDaiMultiModal = atom(false)
export const StockMultiModal = atom(false)

//판매제품 관리 -> 패키지 관리

export const packageCreateAtom = atom(false)
export const packageCreateObjAtom = atom({
	packageNumber: '',
	sellType: '경매',
	packageName: '',
})
export const packageModeAtom = atom('')
export const selectPackageAtom = atom({})
export const singleModifyObj = atom({})
export const singleAllProductModal = atom(false)
export const packageDetailModal = atom(false)
export const singleProductModify = atom(false)
export const requestSingleModify = atom({
	storage: '',
	storageName: '',
	spec: '',
	wdh: '',
	thickness: '',
	width: '',
	length: '',
	weight: '',
	grade: '',
	usageCode: '',
	usageCodeName: '',
	c: '',
	si: '',
	mn: '',
	p: '',
	s: '',
	ts: '',
	yp: '',
	el: '',
	spartCode: '',
	spart: '',
	supplier: '',
	maker: '',
	name: '',
	preferThickness: '',
	causeCode: '',
	causeCodeName: '',
	receiptDate: '',
	stockStatus: '',
	saleCategory: '',
})

// 목적지 에딧 모달
export const userPageDestiEditModal = atom(false)
export const adminPageDestiEditModal = atom(false)
export const packageUidsAtom = atom([])

export const popupAtom2 = atom(false)

// 재고 관리 중량
export const weightAtom = atom(false)
export const weightObj = atom({})

/* ==============================
    경매 (userpage/auction)
============================== */

// 사용자 - 경매(단일) - 목적지 찾기
export const userPageSingleDestiFindAtom = atom(false)

// 상시 판매 관리 > 노출 상태 변경 모달
export const salesPackageModal = atom(false)
