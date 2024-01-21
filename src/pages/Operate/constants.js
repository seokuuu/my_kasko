// 일반관리 탭 옵션
export const normalTabOptions = [
	{
		text: '클레임 관리',
		value: 'claim',
		link: '/operate/common',
	},
	{
		text: 'FAQ 관리',
		value: 'faq',
		link: '/operate/faq',
	},
	{
		text: '공지사항',
		value: 'notice',
		link: '/operate/notice',
	},
	{
		text: '자료실',
		value: 'datasheet',
		link: '/operate/datasheet',
	},
]

// 노출관리 탭 옵션
export const exposureTabOptions = [
	{
		text: '팝업 관리',
		value: 'exposure',
		link: '/operate/exposure',
	},
	{
		text: '전광판 관리',
		value: 'noticeboard',
		link: '/operate/noticeboard',
	},
]

/* ==============================
    운영 관리 - FAQ 관리
============================== */

// FAQ 관리 검색 카테고리 셀렉트 박스 옵션
export const searchCategoryOptions = [
	{
		value: '제목',
		label: '제목',
	},
	{
		value: '카테고리',
		label: '카테고리',
	},
]

// FAQ 목록 검색 옵션 초기값
export const faqListSearchInitValue = {
	pageNum: 1,
	pageSize: 10,
	category: searchCategoryOptions[0],
	keyword: '',
}

/* ==============================
    운영 관리 - 공지사항 관리
============================== */
// 공지사항&자료실 관리 검색 카테고리 셀렉트 박스 옵션
export const noticeSearchCategoryOptions = [
	{
		value: '제목',
		label: '제목',
	},
	{
		value: '작성자',
		label: '작성자',
	},
]

// 공지사항&자료실 목록 검색 옵션 초기값
export const noticeListSearchInitValue = (type) => ({
	pageNum: 1,
	pageSize: 50,
	// category: noticeSearchCategoryOptions[0],
	// keyword: '',
	type, // 공지사항 or 자료실
})

/* ==============================
    운영 관리 - 전광판 관리
============================== */

// 전광판 관리 검색 카테고리 셀렉트 박스 옵션
export const noticeBoardSearchCategoryOptions = [
	{
		value: '제목',
		label: '제목',
	},
	{
		value: '작성자',
		label: '작성자',
	},
]
// 전광판 목록 검색 옵션 초기값
export const noticeBoardListSearchInitValue = {
	pageNum: 1,
	pageSize: 50,
	// category: noticeBoardSearchCategoryOptions[0],
	// keyword: '',
}

// 많이 쓰이는 목록 검색 옵션
export const commonListSearchInitValue = {
	pageNum: 1,
	pageSize: 50,
}

/* ==============================
    운영 관리 - 팝업 관리
============================== */
// 팝업 등록/수정 메인 팝업 셀렉트 박스 옵션
export const mainPopupSelectOptions = [
	{
		value: 1,
		label: '1번',
	},
	{
		value: 2,
		label: '2번',
	},

	{
		value: 3,
		label: '3번',
	},
]

/* ==============================
    운영 관리 - 클레임 관리
============================== */
// 클레임 관리 검색 필터 셀렉트 박스 옵션
export const claimSearchCategoryOptions = [
	{
		value: '',
		label: '전체',
	},

	{
		value: '진행중',
		label: '진행중',
	},
	{
		value: '종료',
		label: '종료',
	},
	{
		value: '반품',
		label: '반품',
	},
	{
		value: '교정',
		label: '교정',
	},
	{
		value: '보상',
		label: '보상',
	},
]

// 클레임 목록 검색 옵션 초기값
export const claimInitState = {
	pageNum: 1,
	pageSize: 50,
	// claimStatus: claimSearchCategoryOptions[0],
	// startDate: '',
	// endDate: '',
	// productNumberList: [], //제품 번호
}

// 클레임 상품 목록 검색 옵션 초깃값
export const claimProductInitState = {
	pageNum: 1,
	pageSize: 10,
	storage: { label: '전체', value: '', address: null }, // 창고 구분
	supplier: { label: '전체', value: '' }, // 매입처
	spec: '', // 규격 약호
	spart: { label: '제품군', value: '' }, // 제품군
	maker: {
		label: '제조사',
		value: '',
	}, // 제조사
	stockStatus: {
		label: '재고 상태',
		value: '',
	}, // 재고 상태
	grade: {
		label: '등급 목록',
		value: '',
	}, // 등급
	preferThickness: {
		label: '정척여부',
		value: '',
	}, // 정척 여부
	saleCategoryList: [], // 판매 구분
	saleType: [], // 판매 유형
	salePriceType: [], // 판매가 유형
	minThickness: 0, // 최소 두깨,
	maxThickness: 0, // 최대 두깨
	minWidth: 0, // 최소 폭
	maxWidth: 0, // 최대 폭
	minLength: 0, // 최소 길이
	maxLength: 0, // 최대 길이
	minFailCount: 0, // 유찰 횟수 범위 시작
	maxFailCount: 0, // 유찰 횟수 범위 종료
	productNumberList: [],
}
