import { useAtom } from 'jotai'
import BtnCellRenderer from '../../pages/Table/BtnCellRenderer'
import MarkerCellRenderer from '../../pages/Table/MarkerCellRenderer'
import { auctionPackDetailModal, auctionPackDetailNumAtom } from '../../store/Layout/Layout'
import { PROD_COL_NAME } from '../user/constantKey'

var checkboxSelection = function (params) {
	// we put checkbox on the name if we are not doing grouping
	return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
	// we put checkbox on the name if we are not doing grouping
	return params.columnApi.getRowGroupColumns().length === 0
}

export const commonStyles = {
	headerClass: 'custom-header-style',
	flex: 1,
	cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
	getFieldMinWidth: (field) => field.length * 10 + 60, // 조절 가능한 계수 및 기본 값 사용
}

const LinkRenderer = (props) => {
	const { data } = props
	const [aucDetail, setAucDetail] = useAtom(auctionPackDetailNumAtom) // 해당 row 값 저장
	const [aucDetailModal, setAucDetailModal] = useAtom(auctionPackDetailModal) // 패키지 모달

	return (
		<>
			{aucDetailModal ? (
				<>{props.value || ''}</>
			) : (
				<a
					onClick={() => {
						setAucDetailModal(true)
						setAucDetail(data)
					}}
					style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bolder' }}
					rel="noreferrer"
				>
					{props.value || ''}
				</a>
			)}
		</>
	)
}

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

//dropdown spart
export const AuctionUnitPricePostDropOptions = [
	{ value: '', label: '제품군 ' },
	{ value: '후판', label: '후판' },
]

//dropdown2 preferThickness
export const AuctionUnitPricePostDropOptions2 = [
	{ value: '', label: '정척여부 ' },
	{ value: 'Y', label: 'Y' },
	{ value: 'N', label: 'N' },
]

//dropdown3 grade
export const AuctionUnitPricePostDropOptions3 = [
	{ value: '', label: '제품등급 ' },
	{ value: '1', label: '1' },
	{ value: '2', label: '2' },
	{ value: '3', label: '3' },
	{ value: '4', label: '4' },
]

// !! 영역이 좁으므로 Upload props에 width값 1000 주고 쓰기 !!!

/* ============================================
    경매 관리 - 경매 회차 관리 "전체 TABLE" (round)
============================================ */
export const AuctionRoundFields = {
	'고유 번호': 'uid',
	'판매 구분': 'saleType',
	'경매 번호': 'number',
	시작일시: 'startDate',
	종료일시: 'endDate',
	'경매 상태': 'status',
	'경매 수량': 'productCount',
	'낙찰 수량': 'successfulBidCount',
	'유찰 수량': 'failBidCount',
	'제품 중량': 'weight',
	비고: 'memo',
	수정일: 'updateDate',
	수정자: 'updateMemberName',
}

export const AuctionRoundFieldsCols = [
	{ ...commonStyles, field: '', maxWidth: 50, checkboxSelection, headerCheckboxSelection },
	{
		...commonStyles,
		field: '수정',
		minWidth: 90,
		cellRenderer: BtnCellRenderer,
		cellRendererParams: {
			uidFieldName: '고유 번호',
			editType: 'auctionroundedit',
		},
	},
	{ ...commonStyles, field: '판매 구분' },
	{ ...commonStyles, field: '경매 번호' },
	{ ...commonStyles, field: '경매 상태' },
	{ ...commonStyles, field: '시작일시' },
	{ ...commonStyles, field: '종료일시' },
	{ ...commonStyles, field: '경매 수량' },
	{ ...commonStyles, field: '낙찰 수량' },
	{ ...commonStyles, field: '유찰 수량' },
	{ ...commonStyles, field: '비고' },
	{ ...commonStyles, field: '제품 중량' },
	{ ...commonStyles, field: '수정자' },
	{ ...commonStyles, field: '수정일' },
].map((col) => ({
	...col,
	minWidth: col.minWidth !== undefined ? col.minWidth : commonStyles.getFieldMinWidth(col.field),
}))

/* ============================================
    경매 관리 - 경매 회차 관리 "상세 TABLE" (round)
=============================================== */

export const AuctionRoundDetailFields = {
	'경매 제품 고유 번호': 'auctionProductUid',
	'제품 고유 번호': 'productUid',
	창고: 'storageName',
	제품군: 'spart',
	'재고 상태': 'stockStatus',
	매입처: 'supplier',
	제조사: 'maker',
	'판매 구분': 'saleCategory',
	'판매 유형': 'saleType',
	'판매가 유형': 'salePriceType',
	'경매 번호': 'auctionNumber',
	'제품 번호': 'productNumber',
	등급: 'grade',
	'정척 여부': 'preferThickness',
	'유찰 횟수': 'failCount',
	시작가: 'auctionStartPrice',
	두께: 'thickness',
	폭: 'width',
	길이: 'length',
	중량: 'weight',
	'규격 약호': 'spec',
	yp: 'yp',
	ts: 'ts',
	c: 'c',
	p: 'p',
	s: 's',
	si: 'si',
	el: 'el',
	mn: 'mn',
	'여재 원인 코드': 'causeCode',
	'여재 원인명': 'causeCodeName',
	'용도 코드': 'usageCode',
	용도명: 'usageCodeName',
	'경매 등록 상태': 'registrationStatus',
	'판매 제외 사유': 'excludeSaleReason',
	등록일: 'createDate',
	매입가: 'price',
	'고유 번호': 'uid',
	패키지명: 'packageName',
	패키지번호: 'packageNumber',
	메모: 'memo',
	비고: 'note',
	ProNo: 'productNoNumber',
}

/* ===================================================================
    경매 관리 - 경매 회차 관리 - 경매 목록 수정 (단일) - 제품 추가 Table (round)
====================================================================== */

export const AuctionRoundExtraProductFields = {
	'고유 번호': 'uid',
	'제품 번호': 'number',
	'규격 약호': 'spec',
	창고: 'storageName',
	두께: 'thickness',
	폭: 'width',
	길이: 'length',
	중량: 'weight',
	등급: 'grade',
	'용도 코드': 'usageCode',
	용도명: 'usageCodeName',
	c: 'c',
	si: 'si',
	mn: 'mn',
	p: 'p',
	s: 's',
	ts: 'ts',
	yp: 'yp',
	el: 'el',
	제품군: 'spart',
	품명: 'name',
	'정척 여부': 'preferThickness', // (Y / N)
	'여재 원인 코드': 'causeCode',
	'여재 원인명': 'causeCodeName',
	'유찰 횟수': 'failCount',
	'경매 등록 상태': 'registrationStatus', // (경매 등록 / 경매 등록 대기)
	매입처: 'supplier', // (현대제철 / 카스코철강)
	제조사: 'maker', // (현대제철 / 동은스틸)
	'판매 구분': 'saleCategory', // (판매재 / 판매 제외재 / 판매 완료재)
	'판매 제외 사유': 'excludeSaleReason',
	'재고 상태': 'stockStatus', // (타사 재고 / 자사 재고)
	'판매 유형': 'saleType', // (경매 대상재 / 상시 판매 대상재)
	'판매가 유형': 'salePriceType', // (특가 / 일반)
	생성일: 'createDate',
	시작가: 'auctionStartPrice',
	패키지명: 'packageName',
	'패키지 번호': 'packageNumber',
	'Pro.No 번호': 'productNoNumber',
	매입가: 'price',
}

export const AuctionRoundExtraProductFieldsCols = [
	{ ...commonStyles, field: '', maxWidth: 50, checkboxSelection, headerCheckboxSelection },
	{ ...commonStyles, field: '고유 번호' },
	{ ...commonStyles, field: '제품 번호' },
	{ ...commonStyles, field: '패키지명' },
	{ ...commonStyles, field: '패키지 번호' },

	{ ...commonStyles, field: 'Pro.No 번호' },
	// 경매 등록 일자

	{ ...commonStyles, field: '창고' },
	{ ...commonStyles, field: '경매 등록 상태' },
	// 경매 번호
	{ ...commonStyles, field: '판매 구분' },
	{ ...commonStyles, field: '판매 유형' },
	{ ...commonStyles, field: '판매가 유형' },

	{ ...commonStyles, field: '등급' },
	{ ...commonStyles, field: '정척 여부' },
	{ ...commonStyles, field: '유찰 횟수' },
	{ ...commonStyles, field: '매입가' },
	{ ...commonStyles, field: '시작가' },

	{ ...commonStyles, field: '두께' },
	{ ...commonStyles, field: '폭' },
	{ ...commonStyles, field: '길이' },
	{ ...commonStyles, field: '중량' },
	{ ...commonStyles, field: '규격 약호' },
	{ ...commonStyles, field: 'ts' },
	{ ...commonStyles, field: 'yp' },
	{ ...commonStyles, field: 'c' },
	{ ...commonStyles, field: 'el' },
	{ ...commonStyles, field: 'si' },
	{ ...commonStyles, field: 'mn' },
	{ ...commonStyles, field: 'p' },
	{ ...commonStyles, field: 's' },

	{ ...commonStyles, field: '용도 코드' },
	{ ...commonStyles, field: '용도명' },
	// 메모
	// 비고
	{ ...commonStyles, field: '재고 상태' },
	{ ...commonStyles, field: '판매 제외 사유' },

	// 아래는 필드 항목에 없음
	{ ...commonStyles, field: '제품군' },
	{ ...commonStyles, field: '품명명' },
	{ ...commonStyles, field: '여재 원인 코드' },
	{ ...commonStyles, field: '여재 원인명' },
	{ ...commonStyles, field: '매입처' },
	{ ...commonStyles, field: '제조사' },
	{ ...commonStyles, field: '생성일' },
].map((col) => ({
	...col,
	minWidth: col.minWidth !== undefined ? col.minWidth : commonStyles.getFieldMinWidth(col.field),
}))

export const AuctionRoundDetailFieldsCols = [
	{ ...commonStyles, field: '', maxWidth: 50, checkboxSelection, headerCheckboxSelection },
	{ ...commonStyles, field: '제품 번호' },

	// 패키지 명
	// 패키지 번호
	// 프로넘

	{ ...commonStyles, field: '등록일' },
	{ ...commonStyles, field: '창고' },
	{ ...commonStyles, field: '경매 등록 상태' },
	{ ...commonStyles, field: '경매 번호' },
	{ ...commonStyles, field: '고유 번호' }, // 필드에 없음
	{ ...commonStyles, field: '경매 제품 고유 번호' }, // 필드에 없음
	{ ...commonStyles, field: '제품 고유 번호' }, // 필드에 없음

	{
		...commonStyles,
		field: '판매 구분',

		cellStyle: { color: 'dodgerblue', borderRight: '1px solid #c8c8c8', textAlign: 'center', fontWeight: 'bolder' },
	},
	{ ...commonStyles, field: '판매 유형' },
	{ ...commonStyles, field: '판매가 유형' },
	{ ...commonStyles, field: '등급' }, // 제품 등급

	{ ...commonStyles, field: '정척 여부' },
	{ ...commonStyles, field: '유찰 횟수' },
	{ ...commonStyles, field: '매입가' },
	{ ...commonStyles, field: '시작가' },
	{ ...commonStyles, field: '두께' },
	{ ...commonStyles, field: '폭' },
	{ ...commonStyles, field: '길이' },
	{ ...commonStyles, field: '중량' },
	{ ...commonStyles, field: '규격 약호' },
	{ ...commonStyles, field: 'yp' },
	{ ...commonStyles, field: 'ts' },
	{ ...commonStyles, field: 'c' },
	{ ...commonStyles, field: 'el' },
	{ ...commonStyles, field: 'si' },
	{ ...commonStyles, field: 'mn' },
	{ ...commonStyles, field: 'p' },
	{ ...commonStyles, field: 's' },
	{ ...commonStyles, field: '여재 원인 코드' }, // 여재원인
	{ ...commonStyles, field: '여재 원인명' }, //여재원인명1
	{ ...commonStyles, field: '용도 코드' },
	{ ...commonStyles, field: '용도명' },
	{ ...commonStyles, field: '메모' },
	{ ...commonStyles, field: '비고' },
	{ ...commonStyles, field: '재고 상태' },
	{ ...commonStyles, field: '판매 제외 사유' }, //판매 제외
	// + 사유 최종수정자
	// + 최종수정일시

	{ ...commonStyles, field: '제품군' }, // 필드에 없음
	{ ...commonStyles, field: '매입처' }, // 필드에 없음
	{ ...commonStyles, field: '제조사' }, // 필드에 없음

	// 패키지 관련 - 패키지명, 패키지번호 처리
].map((col) => ({
	...col,
	minWidth: col.minWidth !== undefined ? col.minWidth : commonStyles.getFieldMinWidth(col.field),
}))

/* ==============================
    경매 관리 - 경매 응찰 (bidding)
================================= */

export const AuctionBiddingFields = {
	'목적지 코드': 'destinationCode',
	'목적지 명': 'destinationName',
	'하차지 명': 'customerDestinationName',
	'목적지 주소': 'customerDestinationAddress',
	'목적지 연락처': 'customerDestinationPhone',
	'경매 제품 고유 번호': 'uid',
	'경매 고유 번호': 'auctionUid',
	'제품 고유 번호': 'productUid',
	창고: 'storageName',
	제품군: 'spart',
	'판매 유형': 'saleType',
	'경매 번호': 'auctionNumber',
	[PROD_COL_NAME.productNumber]: 'productNumber',
	'프로넘 번호': 'productNoNumber',
	[PROD_COL_NAME.packageNumber]: 'packageNumber',
	시작가: 'auctionStartPrice',
	'현재 최고 가격': 'biddingPrice',
	'규격 약호': 'spec',
	'여재 원인 코드': 'causeCode',
	'여재 원인명': 'causeCodeName',
	'용도 코드': 'usageCode',
	용도명: 'usageCodeName',
	패키지명: 'packageName',
	'추천 여부': 'bestStatus',
	등록일: 'createDate',
	'경매 상태': 'auctionStatus',
	'판매 구분': 'saleCategory',
	'판매가 유형': 'salePriceType',
	매입가: 'price',
	'재고 상태': 'stockStatus',
	'판매 제외 사유': 'excludeSaleReason',
	수정일: 'updateDate',
	메모: 'memo',
	비고: 'note',
	'응찰 상태': 'biddingStatus',
	'나의 현재 응찰 가격': 'bestBiddingPrice',
	'나의 최고 응찰 가격': 'memberBestBiddingPrice',
	응찰가: 'memberBiddingPrice',
	등급: 'grade',
	중량: 'weight',
	두께: 'thickness',
	폭: 'width',
	길이: 'length',
	yp: 'yp',
	ts: 'ts',
	c: 'c',
	p: 'p',
	s: 's',
	si: 'si',
	el: 'el',
	mn: 'mn',
	상태: 'biddingStatus',
}

// 단일 응찰
// export const AuctionBiddingFieldsCols = (selected) => {
// 	console.log('AuctionBiddingFieldsCols selected: ', selected)

// 	const checkboxSelection2 = (params) => {
// 		// we put checkbox on the name if we are not doing grouping
// 		if (selected && selected.length > 0) {
// 			const selectedUid = [...new Set(selected?.map((item) => item['제품 번호']?.value))]

// 			if (selectedUid?.includes(params.data['제품 번호'].value)) {
// 				params.node.setSelected(true)
// 			}
// 		}
// 		return params.columnApi.getRowGroupColumns().length === 0
// 	}
// 	return [
// 		// { ...commonStyles, field: '', minWidth: 50, checkboxSelection, headerCheckboxSelection },
// 		{
// 			...commonStyles,
// 			field: '',
// 			maxWidth: 50,
// 			checkboxSelection: checkboxSelection2,
// 			headerCheckboxSelection,
// 			pinned: 'left',
// 		},

// 		{ ...commonStyles, field: '경매 상태' },
// 		{ ...commonStyles, field: '상태' },
// 		{ ...commonStyles, field: '경매 번호' },
// 		{ ...commonStyles, field: '추천 여부', cellRenderer: (params) => (params.value ? 'O' : 'X') },
// 		{
// 			...commonStyles,
// 			// field: PROD_COL_NAME.productNumber,
// 			field: '제품 번호',
// 			minWidth: 250,
// 			cellRenderer: MarkerCellRenderer,
// 			cellRendererParams: (params) => params?.data[params.column.colId] || '',
// 			valueGetter: (v) => v.data[v.column.colId]?.value || '',
// 		},
// 		// { ...commonStyles, field: '제품 번호'},

// 		{ ...commonStyles, field: '프로넘 번호' },
// 		{ ...commonStyles, field: '창고' },
// 		{ ...commonStyles, field: '판매 유형' },
// 		{ ...commonStyles, field: '판매가 유형' },
// 		{ ...commonStyles, field: '제품군' },
// 		{ ...commonStyles, field: '등급' },
// 		{ ...commonStyles, field: '시작가' },
// 		{
// 			...commonStyles,
// 			headerName: '현재 최고 가격',
// 			field: '현재 최고 가격',
// 			headerClass: 'custom-header-style',
// 			cellStyle: function (params) {
// 				let lost = params.data['응찰 상태'] === '응찰 실패'
// 				let win = params.data['응찰 상태'] === '응찰' || params.data['응찰 상태'] === null
// 				// let defaultData = params.data['나의 최고 응찰 가격'] === 0 || null
// 				if (params.data['응찰가'] === 0) {
// 					return { color: 'black', fontWeight: 'bolder', textAlign: 'center', borderRight: '1px solid #C8C8C8' }
// 				}
// 				if (lost) {
// 					return { color: 'dodgerblue', fontWeight: 'bolder', textAlign: 'center', borderRight: '1px solid #C8C8C8' } // dodgerblue
// 				} else if (win) {
// 					if (params.data['나의 최고 응찰 가격'] < params.data['현재 최고 가격']) {
// 						return { color: 'dodgerblue', fontWeight: 'bolder', textAlign: 'center', borderRight: '1px solid #C8C8C8' } // dodgerblue
// 					} else if (params.data['나의 최고 응찰 가격'] > params.data['현재 최고 가격']) {
// 						return { color: 'red', fontWeight: 'bolder', textAlign: 'center', borderRight: '1px solid #C8C8C8' } // red
// 					} else if ((params.data['나의 최고 응찰 가격'] = params.data['현재 최고 가격'])) {
// 						return { color: 'red', fontWeight: 'bolder', textAlign: 'center', borderRight: '1px solid #C8C8C8' } // red
// 					} else {
// 						return { color: 'black', fontWeight: 'bolder', textAlign: 'center', borderRight: '1px solid #C8C8C8' }
// 					}
// 				} else {
// 					return { color: 'black', fontWeight: 'bolder', textAlign: 'center', borderRight: '1px solid #C8C8C8' }
// 				}
// 			},
// 			minWidth: 150,
// 			cellRenderer: (params) => params.value,
// 		},
// 		{ ...commonStyles, field: '나의 현재 응찰 가격' },
// 		{ ...commonStyles, field: '나의 최고 응찰 가격', minWidth: 150 },
// 		{ ...commonStyles, field: '응찰가', minWidth: 150, editable: true },
// 		{ ...commonStyles, field: '목적지 명' },
// 		{ ...commonStyles, field: '목적지 코드' },
// 		{ ...commonStyles, field: '목적지 주소' },
// 		{ ...commonStyles, field: '목적지 연락처' },
// 		{ ...commonStyles, field: '하차지 명' },
// 		{ ...commonStyles, field: '두께' },
// 		{ ...commonStyles, field: '폭' },
// 		{ ...commonStyles, field: '길이' },
// 		{ ...commonStyles, field: '중량' },
// 		{ ...commonStyles, field: '규격 약호' },
// 		{ ...commonStyles, field: 'ts' },
// 		{ ...commonStyles, field: 'yp' },
// 		{ ...commonStyles, field: 'c' },
// 		{ ...commonStyles, field: 'el' },
// 		{ ...commonStyles, field: 'si' },
// 		{ ...commonStyles, field: 'mn' },
// 		{ ...commonStyles, field: 'p' },
// 		{ ...commonStyles, field: 's' },
// 		{ ...commonStyles, field: '여재 원인 코드' },
// 		{ ...commonStyles, field: '여재 원인명' },
// 		{ ...commonStyles, field: '용도 코드' },
// 		{ ...commonStyles, field: '용도명' },
// 		{ ...commonStyles, field: '제품 고유 번호' },
// 		{ ...commonStyles, field: '메모' },
// 	].map((col) => ({
// 		...col,
// 		minWidth: col.minWidth !== undefined ? col.minWidth : commonStyles.getFieldMinWidth(col.field),
// 	}))
// }

export const AuctionBiddingFieldsCols = (selected) => {
	const checkboxSelection2 = (params) => {
		// we put checkbox on the name if we are not doing grouping
		if (selected && selected.length > 0) {
			const selectedUid = [...new Set(selected?.map((item) => item['제품 번호']?.value))]

			if (selectedUid?.includes(params.data['제품 번호'].value)) {
				params.node.setSelected(true)
			}
		}
		return params.columnApi.getRowGroupColumns().length === 0
	}
	return [
		// { ...commonStyles, field: '', minWidth: 50, checkboxSelection, headerCheckboxSelection },
		{
			...commonStyles,
			field: '',
			maxWidth: 50,
			checkboxSelection: checkboxSelection2,
			headerCheckboxSelection,
			showDisabledCheckboxes: true,
			pinned: 'left',
		},

		{ ...commonStyles, field: '경매 상태', minWidth: 100 },
		{ ...commonStyles, field: '상태', minWidth: 100 },
		{ ...commonStyles, field: '경매 번호', minWidth: 100 },
		{ ...commonStyles, field: '추천 여부', minWidth: 100, cellRenderer: (params) => (params.value ? 'O' : 'X') },
		{
			...commonStyles,
			field: PROD_COL_NAME.productNumber,
			minWidth: 150,
			cellRenderer: MarkerCellRenderer,
			cellRendererParams: (params) => params?.data[params.column.colId] || '',
			valueGetter: (v) => v.data[v.column.colId]?.value || '',
		},
		// { ...commonStyles, field: '제품 번호', minWidth: 100 },

		{ ...commonStyles, field: '프로넘 번호', minWidth: 100 },
		{ ...commonStyles, field: '창고', minWidth: 100 },
		{ ...commonStyles, field: '판매 유형', minWidth: 100 },
		{ ...commonStyles, field: '판매가 유형', minWidth: 100 },
		{ ...commonStyles, field: '제품군', minWidth: 100 },
		{ ...commonStyles, field: '등급', minWidth: 100 },
		{ ...commonStyles, field: '시작가', minWidth: 100 },
		{
			...commonStyles,
			headerName: '현재 최고 가격',
			field: '현재 최고 가격',
			headerClass: 'custom-header-style',
			cellStyle: function (params) {
				let lost = params.data['응찰 상태'] === '응찰 실패'
				let win = params.data['응찰 상태'] === '응찰' || params.data['응찰 상태'] === null
				if (params.data['응찰가'] === 0) {
					return { color: 'black', fontWeight: 'bolder', textAlign: 'center', borderRight: '1px solid #C8C8C8' }
				}
				if (lost) {
					return { color: 'dodgerblue', fontWeight: 'bolder', textAlign: 'center', borderRight: '1px solid #C8C8C8' } // dodgerblue
				} else if (win) {
					const memberBestBiddingPrice = parseInt(params.data['나의 최고 응찰 가격']?.replace(/,/g, ''))
					const biddingPrice = parseInt(params.data['현재 최고 가격']?.replace(/,/g, ''))

					if (memberBestBiddingPrice < biddingPrice) {
						return { color: 'dodgerblue', fontWeight: 'bolder', textAlign: 'center', borderRight: '1px solid #C8C8C8' } // dodgerblue
					} else if (memberBestBiddingPrice > biddingPrice) {
						return { color: 'red', fontWeight: 'bolder', textAlign: 'center', borderRight: '1px solid #C8C8C8' } // red
					} else if (memberBestBiddingPrice === biddingPrice) {
						return { color: 'red', fontWeight: 'bolder', textAlign: 'center', borderRight: '1px solid #C8C8C8' } // red
					} else {
						return { color: 'black', fontWeight: 'bolder', textAlign: 'center', borderRight: '1px solid #C8C8C8' }
					}
				} else {
					return { color: 'black', fontWeight: 'bolder', textAlign: 'center', borderRight: '1px solid #C8C8C8' }
				}
			},
			minWidth: 150,
			cellRenderer: (params) => params.value,
		},
		{ ...commonStyles, field: '나의 현재 응찰 가격', minWidth: 100 },
		{ ...commonStyles, field: '나의 최고 응찰 가격', minWidth: 150 },
		{ ...commonStyles, field: '응찰가', minWidth: 150, editable: true },
		{ ...commonStyles, field: '목적지 명', minWidth: 100 },
		{ ...commonStyles, field: '목적지 코드', minWidth: 100 },
		{ ...commonStyles, field: '목적지 주소', minWidth: 100 },
		{ ...commonStyles, field: '목적지 연락처', minWidth: 100 },
		{ ...commonStyles, field: '하차지 명', minWidth: 100 },
		{ ...commonStyles, field: '두께', minWidth: 100 },
		{ ...commonStyles, field: '폭', minWidth: 100 },
		{ ...commonStyles, field: '길이', minWidth: 100 },
		{ ...commonStyles, field: '중량', minWidth: 100 },
		{ ...commonStyles, field: '규격 약호', minWidth: 100 },
		{ ...commonStyles, field: 'ts', minWidth: 100 },
		{ ...commonStyles, field: 'yp', minWidth: 100 },
		{ ...commonStyles, field: 'c', minWidth: 100 },
		{ ...commonStyles, field: 'el', minWidth: 100 },
		{ ...commonStyles, field: 'si', minWidth: 100 },
		{ ...commonStyles, field: 'mn', minWidth: 100 },
		{ ...commonStyles, field: 'p', minWidth: 100 },
		{ ...commonStyles, field: 's', minWidth: 100 },
		{ ...commonStyles, field: '여재 원인 코드', minWidth: 100 },
		{ ...commonStyles, field: '여재 원인명', minWidth: 100 },
		{ ...commonStyles, field: '용도 코드', minWidth: 100 },
		{ ...commonStyles, field: '용도명', minWidth: 100 },
		{ ...commonStyles, field: '제품 고유 번호', minWidth: 100 },
		{ ...commonStyles, field: '메모', minWidth: 100 },
	].map((col) => ({
		...col,
		minWidth: col.minWidth !== undefined ? col.minWidth : commonStyles.getFieldMinWidth(col.field),
	}))
}

// 패키지 응찰 필드
export const AuctionBiddingPackageFields = {
	'목적지 코드': 'destinationCode',
	'목적지 명': 'customerDestinationName',
	'목적지 주소': 'customerDestinationAddress',
	'목적지 연락처': 'customerDestinationPhone',
	'경매 고유 번호': 'auctionUid',
	'제품 고유 번호': 'productUid',
	'경매 번호': 'auctionNumber',
	[PROD_COL_NAME.packageNumber]: 'packageNumber',
	시작가: 'auctionStartPrice',
	'현재 최고 가격': 'biddingPrice',
	'총 중량': 'totalWeight',
	'패키지 명': 'packageName',
	'추천 여부': 'bestStatus',
	등록일: 'createDate',
	'경매 상태': 'auctionStatus',
	수정일: 'updateDate',
	메모: 'memo',
	비고: 'note',
	'응찰 상태': 'biddingStatus',
	'나의 현재 응찰 가격': 'bestBiddingPrice',
	'나의 최고 응찰 가격': 'memberBestBiddingPrice',
	응찰가: 'memberBiddingPrice',
}

// ** TODO : 아래 fieldsCols로 전부 교체하기.
// export const AuctionBiddingFieldsCols = [
// 	{ ...commonStyles, field: '' },
// 	{ ...commonStyles, field: '나의 현재 응찰 가격' },
// 	{ ...commonStyles, field: '목적지 명', minWidth: 150 }, // 이 부분은 고정된 minWidth 값을 사용
// 	// 나머지 필드들도 동일하게 추가
// 	// ...
// ].map((col) => ({
// 	...col,
// 	minWidth: col.minWidth !== undefined ? col.minWidth : commonStyles.getFieldMinWidth(col.field),
// }))

// 패키지 응찰
export const AuctionPackageBiddingFieldsCols = (selected) => {
	const checkboxSelection2 = (params) => {
		if (selected && selected.length > 0) {
			const selectedUid = [...new Set(selected.map((item) => item['패키지 번호']))]

			if (selectedUid?.includes(params.data['패키지 번호'])) {
				params.node.setSelected(true)
			}
		}
		return params.columnApi.getRowGroupColumns().length === 0
	}
	return [
		{ ...commonStyles, field: '', minWidth: 50, checkboxSelection: checkboxSelection2, headerCheckboxSelection },

		{ ...commonStyles, field: '경매 상태' },
		{ ...commonStyles, field: '경매 고유 번호' },
		{ ...commonStyles, field: '제품 고유 번호' },
		{ ...commonStyles, field: '경매 번호' },
		{ ...commonStyles, field: '패키지 명' },
		{
			headerName: '패키지 번호',
			field: '패키지 번호',
			headerClass: 'custom-header-style',
			cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
			width: 150,
			cellRenderer: LinkRenderer,
		},
		{ ...commonStyles, field: '추천 여부', cellRenderer: (params) => (params.value ? 'O' : 'X') },
		{ ...commonStyles, field: '시작가' },
		{
			...commonStyles,
			headerName: '현재 최고 가격',
			field: '현재 최고 가격',
			headerClass: 'custom-header-style',
			cellStyle: function (params) {
				let lost = params.data['응찰 상태'] === '응찰 실패'
				let win = params.data['응찰 상태'] === '응찰' || params.data['응찰 상태'] === null
				if (params.data['응찰가'] === 0) {
					return { color: 'black', fontWeight: 'bolder', textAlign: 'center', borderRight: '1px solid #c8c8c8' }
				}

				if (lost) {
					return { color: 'dodgerblue', fontWeight: 'bolder', textAlign: 'center', borderRight: '1px solid #c8c8c8' } // dodgerblue
				} else if (win) {
					const memberBestBiddingPrice = parseInt(params.data['나의 최고 응찰 가격']?.replace(/,/g, ''))
					const biddingPrice = parseInt(params.data['현재 최고 가격']?.replace(/,/g, ''))

					if (memberBestBiddingPrice < biddingPrice) {
						return { color: 'dodgerblue', fontWeight: 'bolder', textAlign: 'center', borderRight: '1px solid #C8C8C8' } // dodgerblue
					} else if (memberBestBiddingPrice > biddingPrice) {
						return { color: 'red', fontWeight: 'bolder', textAlign: 'center', borderRight: '1px solid #C8C8C8' } // red
					} else if (memberBestBiddingPrice === biddingPrice) {
						return { color: 'red', fontWeight: 'bolder', textAlign: 'center', borderRight: '1px solid #C8C8C8' } // red
					} else {
						return { color: 'black', fontWeight: 'bolder', textAlign: 'center', borderRight: '1px solid #C8C8C8' }
					}
				} else {
					return { color: 'black', fontWeight: 'bolder', textAlign: 'center', borderRight: '1px solid #c8c8c8' }
				}
			},
			minWidth: 150,
			cellRenderer: (params) => params.value,
		},
		{ ...commonStyles, field: '나의 현재 응찰 가격' },
		{ ...commonStyles, field: '나의 최고 응찰 가격', minWidth: 150 },
		{ ...commonStyles, field: '응찰가', minWidth: 150, editable: true },
		{ ...commonStyles, field: '하차지 명' },
		{ ...commonStyles, field: '목적지 명' },
		{ ...commonStyles, field: '목적지 코드' },
		{ ...commonStyles, field: '목적지 주소' },
		{ ...commonStyles, field: '목적지 연락처' },
		{ ...commonStyles, field: '메모' },
		{ ...commonStyles, field: '비고' },
		{ ...commonStyles, field: '총 중량' },
		{ ...commonStyles, field: '등록일' },
		{ ...commonStyles, field: '수정일' },
	].map((col) => ({
		...col,
		minWidth: col.minWidth !== undefined ? col.minWidth : commonStyles.getFieldMinWidth(col.field),
	}))
}

/* ==============================
    경매 관리 - 경매 진행 조회 (progress)
============================== */

export const AuctionProgressFields = {
	'경매 제품 고유 번호': 'uid',
	'고객 코드': 'code',
	회사명: 'customerName',
	'회원 이름': 'memberName',
	창고: 'storageName',
	제품군: 'spart',
	'판매 유형': 'saleType', // (경매 대상재 / 상시 판매 대상재)
	'경매 번호': 'auctionNumber',
	'제품 번호': 'productNumber',
	'Pro.No 번호': 'productNoNumber',
	등급: 'grade',
	'정척 여부': 'preferThickness', //  (Y / N)
	'유찰 횟수': 'failCount',
	시작가: 'auctionStartPrice',
	응찰가: 'biddingPrice',
	두께: 'thickness',
	폭: 'width',
	길이: 'length',
	중량: 'weight',
	'규격 약호': 'spec',
	yp: 'yp',
	ts: 'ts',
	c: 'c',
	p: 'p',
	s: 's',
	si: 'si',
	el: 'el',
	mn: 'mn',
	'여재 원인 코드': 'causeCode',
	'여재 원인명': 'causeCodeName',
	'용도 코드': 'usageCode',
	용도명: 'usageCodeName',
	패키지명: 'packageName',
	'패키지 번호': 'packageNumber',
	'낙찰 상태': 'biddingStatus', //(응찰 대기 / 응찰 / 최고가 입찰 / 낙찰 / 낙찰 확정 / 낙찰 취소 / 유찰 / 패찰)
	목적지명: 'destinationName',
	'목적지 코드': 'destinationCode',
	'목적지 주소': 'customerDestinationAddress',
	'목적지 연락처': 'customerDestinationPhone',
	하차지명: 'customerDestinationName',
	'입찰 순번': 'biddingRank',
	'입찰 고객명': 'biddingCustomerName',
	'입찰 고객 코드': 'biddingCustomerCode',
	'입찰자 ID': 'biddingMemberId',
	입찰일시: 'biddingTime',
}

export const AuctionProgressFieldsCols = [
	{ ...commonStyles, field: '', maxWidth: 50, checkboxSelection, headerCheckboxSelection },

	{ ...commonStyles, field: '경매 상태' },
	{ ...commonStyles, field: '경매 번호' },
	{ ...commonStyles, field: '패키지명' },
	{ ...commonStyles, field: '패키지 번호' },
	{ ...commonStyles, field: '제품 번호' },
	{ ...commonStyles, field: 'Pro.No 번호' },
	{ ...commonStyles, field: '창고' },
	// 판매 구분
	{ ...commonStyles, field: '판매 유형' },
	// 판매가 유형
	{ ...commonStyles, field: '제품군' },
	{ ...commonStyles, field: '등급' },
	{ ...commonStyles, field: '정척 여부' },
	{ ...commonStyles, field: '유찰 횟수' },
	{ ...commonStyles, field: '시작가' },
	{ ...commonStyles, field: '응찰가' },

	// 낙찰 여부
	// 취소 사유
	{ ...commonStyles, field: '입찰 순번' },
	{ ...commonStyles, field: '입찰 고객명' },
	{ ...commonStyles, field: '입찰 고객 코드' },
	{ ...commonStyles, field: '입찰자 ID' },
	{ ...commonStyles, field: '입찰일시' },
	// 고객사 명

	{ ...commonStyles, field: '경매 제품 고유 번호' }, // 이거 없음
	{ ...commonStyles, field: '고객 코드' },
	{ ...commonStyles, field: '목적지명' },
	{ ...commonStyles, field: '목적지 코드' },
	{ ...commonStyles, field: '목적지 주소' },
	{ ...commonStyles, field: '목적지 연락처' },
	{ ...commonStyles, field: '하차지명' },

	{ ...commonStyles, field: '회사명' }, // 이거 없음
	{ ...commonStyles, field: '회원 이름' }, // 이거 없음

	{ ...commonStyles, field: '두께' },
	{ ...commonStyles, field: '폭' },
	{ ...commonStyles, field: '중량' },
	{ ...commonStyles, field: '규격 약호' },
	{ ...commonStyles, field: 'yp' },
	{ ...commonStyles, field: 'ts' },
	{ ...commonStyles, field: 'c' },
	{ ...commonStyles, field: 'p' },
	{ ...commonStyles, field: 's' },
	{ ...commonStyles, field: 'si' },
	{ ...commonStyles, field: 'el' },
	{ ...commonStyles, field: 'mn' },
	{ ...commonStyles, field: '여재 원인 코드' },
	{ ...commonStyles, field: '여재 원인명' },
	{ ...commonStyles, field: '용도 코드' },
	{ ...commonStyles, field: '용도명' },
].map((col) => ({
	...col,
	minWidth: col.minWidth !== undefined ? col.minWidth : commonStyles.getFieldMinWidth(col.field),
}))

/* ===============================================
    경매 관리 - 경매 진행 상세 조회 (detailprogress)
================================================= */

export const AuctionDetailProgressFields = {
	'응찰 고유 번호': 'auctionBidUid',
	'경매 상태': 'auctionStatus',
	'고객 코드': 'code',
	회사명: 'customerName',
	'회원 이름': 'memberName',
	창고: 'storageName',
	제품군: 'spart',
	'판매 유형': 'saleType',
	'경매 번호': 'auctionNumber',
	'제품 번호': 'productNumber',
	'Pro.No 번호': 'productNoNumber',
	등급: 'grade',
	응찰가: 'biddingPrice',
	두께: 'thickness',
	폭: 'width',
	길이: 'length',
	중량: 'weight',
	'규격 약호': 'spec',
	패키지명: 'packageName',
	'패키지 번호': 'packageNumber',
	'낙찰 상태': 'biddingStatus',
	목적지명: 'destinationName',
	'목적지 코드': 'destinationCode',
	'목적지 주소': 'customerDestinationAddress',
	'목적지 연락처': 'customerDestinationPhone',
	하차지명: 'customerDestinationName',
	'입찰 순번': 'biddingRank',
	'입찰 고객명': 'biddingCustomerName',
	'입찰 고객 코드': 'biddingCustomerCode',
	'입찰자 ID': 'biddingMemberId',
	입찰일시: 'biddingTime',
	'취소 사유': 'failReason',
	yp: 'yp',
	ts: 'ts',
	c: 'c',
	p: 'p',
	s: 's',
	si: 'si',
	el: 'el',
	mn: 'mn',
	'판매가 유형': 'salePriceType',
	'정척 여부': 'preferThickness', //  (Y / N)
	'유찰 횟수': 'failCount',
	'여재 원인 코드': 'causeCode',
	'여재 원인명': 'causeCodeName',
	'용도 코드': 'usageCode',
	용도명: 'usageCodeName',
}

export const AuctionDetailProgressFieldsCols = [
	{ ...commonStyles, field: '', maxWidth: 50, checkboxSelection, headerCheckboxSelection },
	{ ...commonStyles, field: '응찰 고유 번호', minWidth: 150 },
	{ ...commonStyles, field: '경매 상태', minWidth: 120 },
	{ ...commonStyles, field: '경매 번호', minWidth: 120 },
	{ ...commonStyles, field: '패키지명', minWidth: 120 },
	{ ...commonStyles, field: '패키지 번호', minWidth: 120 },
	{ ...commonStyles, field: '제품 번호', minWidth: 120 },
	{ ...commonStyles, field: 'Pro.No 번호', minWidth: 120 },
	{ ...commonStyles, field: '창고' },
	// 판매 구분
	{ ...commonStyles, field: '판매 유형', minWidth: 120 },
	{ ...commonStyles, field: '판매가 유형', minWidth: 150 },
	{ ...commonStyles, field: '제품군' },
	{ ...commonStyles, field: '등급' },
	{ ...commonStyles, field: '정척 여부', minWidth: 150 },
	{ ...commonStyles, field: '유찰 횟수', minWidth: 150 },

	{ ...commonStyles, field: '응찰가' }, // 다른 이름으로 바뀌야 할 듯
	// 현재최고 응찰가격
	// 나의 현재 응찰가격
	// 나의 응찰 최고 가격
	// 응찰가격
	{ ...commonStyles, field: '낙찰 상태', minWidth: 120 },
	// 취소 사유
	{ ...commonStyles, field: '입찰 순번' },
	{ ...commonStyles, field: '입찰 고객명', minWidth: 150 },
	{ ...commonStyles, field: '입찰 고객 코드', minWidth: 120 },
	{ ...commonStyles, field: '입찰자 ID', minWidth: 120 },
	{ ...commonStyles, field: '입찰일시', minWidth: 150 },
	{ ...commonStyles, field: '고객 코드' },
	{ ...commonStyles, field: '목적지명', minWidth: 120 },
	{ ...commonStyles, field: '목적지 코드', minWidth: 120 },
	{ ...commonStyles, field: '목적지 주소', minWidth: 150 },
	{ ...commonStyles, field: '목적지 연락처', minWidth: 150 },
	{ ...commonStyles, field: '하차지명', minWidth: 120 },

	{ ...commonStyles, field: '회사명', minWidth: 150 }, // 없음
	{ ...commonStyles, field: '회원 이름', minWidth: 120 }, // 없음

	{ ...commonStyles, field: '두께' },
	{ ...commonStyles, field: '폭' },
	{ ...commonStyles, field: '길이' },
	{ ...commonStyles, field: '중량' },
	{ ...commonStyles, field: '규격 약호', minWidth: 120 },

	{ ...commonStyles, field: 'ts', minWidth: 150 },
	{ ...commonStyles, field: 'yp', minWidth: 150 },
	{ ...commonStyles, field: 'c', minWidth: 150 },
	{ ...commonStyles, field: 'el', minWidth: 150 },
	{ ...commonStyles, field: 'si', minWidth: 150 },
	{ ...commonStyles, field: 'mn', minWidth: 150 },
	// p
	{ ...commonStyles, field: 's', minWidth: 150 },

	{ ...commonStyles, field: '여재 원인 코드', minWidth: 150 },
	{ ...commonStyles, field: '여재 원인명', minWidth: 150 },
	{ ...commonStyles, field: '용도 코드', minWidth: 150 },
	{ ...commonStyles, field: '용도명', minWidth: 150 },
	// 메모
	// 비고
].map((col) => ({
	...col,
	minWidth: col.minWidth !== undefined ? col.minWidth : commonStyles.getFieldMinWidth(col.field),
}))

/* ====================================
    경매 관리 - 경매 낙찰 관리 상세(winningDetail)
======================================= */

export const AuctionWinningDetailFields = {
	'경매 번호': 'auctionNumber',
	'주문 고유 번호': 'orderUid',
	'고객사 목적지 고유 번호': 'customerDestinationUid',
	'목적지 고유 번호': 'destinationUid',

	'패키지 명': 'packageName',
	'패키지 번호': 'packageNumber',
	고객사명: 'customerName',
	'고객 코드': 'code',
	'제품 번호': 'productNumber',
	'Pro.No 번호': 'productNoNumber',
	창고: 'storage',
	'낙찰 상태': 'biddingStatus',
	낙찰가: 'biddingPrice',
	'승인 상태': 'requestStatus',
	'목적지 코드': 'destinationCode',
	'목적지 명': 'destinationName',
	'목적지 주소': 'destinationAddress',
	'목적지 연락처': 'destinationPhone',
	'목적지 담당자 연락처': 'destinationManagerPhone',
	'하차지 명': 'customerDestinationName',
	'변경 요청 목적지명': 'requestDestinationName',
	'변경 요청 목적지 주소': 'requestDestinationAddress',
	'변경 요청 목적지 연락처': 'requestDestinationPhone',
	'변경 요청 목적지 담당자 연락처': 'requestDestinationManagerPhone',
	'판매 구분': 'saleCategory',
	'판매 유형': 'saleType',
	'판매가 유형': 'salePriceType',
	제품군: 'spart',
	등급: 'grade',
	정척여부: 'preferThickness',
	유찰횟수: 'failCount',
	'제품 낙찰 단가': 'productBiddingPrice',
	'낙찰 총 단가': 'totalBiddingPrice',
	'제품 공급가': 'orderPrice',
	'제품 부가세': 'orderPriceVat',
	// 제품 금액
	'매출 기본 운임단가': 'freightFee',
	'매출 할증 운임단가': 'extraUnitPrice',
	'매출 운송비 공급가': 'freightCost',
	'매출 운송비 부가세': 'freightCostVat',
	'매입 기본 운임단가': 'inboundFreightFee',

	// 운반비 금액
	총공급가: 'totalPrice',
	총부가세: 'totalPriceVat',
	합계: 'total',
	두께: 'thickness',
	폭: 'width',
	길이: 'length',
	중량: 'weight',
	'규격 약호': 'spec',
	ts: 'ts',
	yp: 'yp',
	c: 'c',
	el: 'el',
	si: 'si',
	mn: 'mn',
	p: 'p',
	s: 's',
	'여재 원인': 'causeCode',
	'여재 원인명': 'causeCodeName',
	'용도 코드': 'usageCode',
	용도명: 'usageCodeName',
	메모: 'memo',
	'주문 상태': 'orderStatus',
	'확정 전송일': 'sendDate',
	'주문 번호': 'hsOrderNo',
	비고: 'note',
	'매입 할증 운임단가': 'inboundExtraUnitPrice',
	'매입 운송비 공급가': 'inboundFreightCost',
	'매입 운송비 부가세': 'inboundFreightCostVat',
	// 매입 운반비 금액
	// 매입 운반비
	// 매출 운반비
	'재고 상태': 'stockStatus',
	'카스코 낙찰가': 'confirmPrice',
	//최종 수정자
	수정일: 'updateDate',
}

export const AuctionWinningDetailFieldsCols = [
	{ ...commonStyles, field: '', maxWidth: 50, checkboxSelection, headerCheckboxSelection },
	...Object.keys(AuctionWinningDetailFields)
		.filter((item) => !item.includes('고유 번호'))
		.map((item) => ({
			...commonStyles,
			field: item,
			minWidth: 150,
		})),
].map((col) => ({
	...col,
	minWidth: col.minWidth !== undefined ? col.minWidth : commonStyles.getFieldMinWidth(col.field),
}))

export const UserAuctionWinningDetailFields = {
	'주문 고유 번호': 'orderUid',
	'고객사 목적지 고유 번호': 'customerDestinationUid',
	'목적지 고유 번호': 'destinationUid',

	'경매 번호': 'auctionNumber',
	'패키지 명': 'packageName',
	'패키지 번호': 'packageNumber',
	고객사명: 'customerName',
	'고객 코드': 'code',
	'제품 번호': 'productNumber',
	'Pro.No 번호': 'productNoNumber',
	창고: 'storage',
	'낙찰 상태': 'biddingStatus',
	낙찰가: 'biddingPrice',
	'승인 상태': 'requestStatus',
	'목적지 코드': 'destinationCode',
	'목적지 명': 'destinationName',
	'목적지 주소': 'destinationAddress',
	'목적지 연락처': 'destinationPhone',
	'목적지 담당자 연락처': 'destinationManagerPhone',
	'하차지 명': 'customerDestinationName',
	'변경 요청 목적지명': 'requestDestinationName',
	'변경 요청 목적지 주소': 'requestDestinationAddress',
	'변경 요청 목적지 연락처': 'requestDestinationPhone',
	'변경 요청 목적지 담당자 연락처': 'requestDestinationManagerPhone',
	'판매 유형 (경매 대상재 / 상시 판매 대상재)': 'saleType',
	'판매가 유형 (특가 / 일반)': 'salePriceType',
	제품군: 'spart',
	등급: 'grade',
	'제품 낙찰 단가': 'productBiddingPrice',
	'낙찰 총 단가': 'totalBiddingPrice',
	'제품 공급가': 'orderPrice',
	'제품 부가세': 'orderPriceVat',
	'기본 운임단가': 'freightFee',
	'할증 운임단가': 'extraUnitPrice',
	'운송비 공급가': 'freightCost',
	'운송비 부가세': 'freightCostVat',
	총공급가: 'totalPrice',
	총부가세: 'totalPriceVat',
	합계: 'total',
	두께: 'thickness',
	폭: 'width',
	길이: 'length',
	중량: 'weight',
	'규격 약호': 'spec',
	ts: 'ts',
	yp: 'yp',
	c: 'c',
	el: 'el',
	si: 'si',
	mn: 'mn',
	p: 'p',
	s: 's',
	'여재 원인': 'causeCode',
	'여재 원인명': 'causeCodeName',
	'용도 코드': 'usageCode',
	용도명: 'usageCodeName',
	메모: 'memo',
	수정일: 'updateDate',
}

export const UserAuctionWinningDetailFieldsCols = [
	{ ...commonStyles, field: '', maxWidth: 50, checkboxSelection, headerCheckboxSelection },
	...Object.keys(UserAuctionWinningDetailFields)
		.filter((item) => !item.includes('고유 번호'))
		.map((item) => ({
			...commonStyles,
			field: item,
		})),
].map((col) => ({
	...col,
	minWidth: col.minWidth !== undefined ? col.minWidth : commonStyles.getFieldMinWidth(col.field),
}))

/* ======================================================
    경매 관리 - 경매 낙찰 관리 - "낙찰 생성" (winningCreate)
========================================================= */

export const AuctionWinningCreateFields = {
	'제품 고유 번호': 'uid',
	// 카스코 매입가
	'경매 등록 상태': 'registrationStatus',
	// 경매 번호
	// 관심 제품
	'제품 번호': 'number',
	'Pro.No 번호': 'productNoNumber',
	창고: 'storagename',
	'판매 유형': 'saleType',
	'판매가 유형': 'salePriceType',
	제품군: 'spart',
	등급: 'grade',
	시작가: 'auctionStartPrice',
	// 현재 최고 응찰가격
	// 나의 현재 응찰 가격
	// 나의 응찰 최고 가격
	// 응찰가격
	// 낙찰여부
	// 목적지명
	// 목적지 코드
	// 목적지 주소
	// 목적지 연락처
	// 하차지 명

	두께: 'thickness',
	폭: 'width',
	길이: 'length',
	중량: 'weight',
	'규격 약호': 'spec',
	ts: 'ts',
	yp: 'yp',
	c: 'c',
	el: 'el',
	si: 'si',
	mn: 'mn',
	p: 'p',
	s: 's',
	'여재 원인 코드': 'causeCode',
	'여재 원인명': 'causeCodeName',
	'용도 코드': 'usageCode',
	용도명: 'usageCodeName',

	// 이 밑에는 필드 항목에 없음.
	품명: 'name', //
	'정척 여부': 'preferThickess',
	'유찰 횟수': 'failCount',
	매입처: 'supplier',
	제조사: 'maker',
	'판매 구분': 'saleCategory',
	'판매 제외 사유': 'excludeSaleReason',
	'재고 상태': 'stockStatus',
	생성일: 'createDate',
	패키지명: 'packageName',
	'패키지 번호': 'packageNumber',

	매입가: 'price',
}

export const AuctionWinningCreateFieldsCols = [
	{ ...commonStyles, field: '', maxWidth: 50, checkboxSelection, headerCheckboxSelection },
	...Object.keys(AuctionWinningCreateFields).map((item) => ({
		...commonStyles,
		field: item,
	})),
]

/* ===========================================
    경매 관리 - 경매 시작 단가 관리 (startprice)
============================================== */

export const AuctionStartPriceFields = {
	'고유 번호': 'uid',
	제품군: 'spart',
	'정척 여부': 'preferThickness',
	'유찰 횟수': 'failCount',
	등급: 'grade',
	적용일: 'effectDate',
	'적용전 단가': 'originalPrice',
	'적용 단가': 'effectPrice',
}

export const AuctionStartPriceFieldsCols = [
	{ ...commonStyles, field: '', maxWidth: 50, checkboxSelection, headerCheckboxSelection },
	{ ...commonStyles, field: '고유 번호', minWidth: 150 },
	{ ...commonStyles, field: '제품군', minWidth: 170 },
	{ ...commonStyles, field: '정척 여부', minWidth: 170 },
	{ ...commonStyles, field: '유찰 횟수', minWidth: 170 },
	{ ...commonStyles, field: '등급', minWidth: 170 },
	{ ...commonStyles, field: '적용일', minWidth: 170 },
	{ ...commonStyles, field: '적용전 단가', minWidth: 170 },
	{ ...commonStyles, field: '적용 단가', minWidth: 190 },
]

const uniqueKeys = new Set([...Object.keys(AuctionRoundExtraProductFields), ...Object.keys(AuctionRoundDetailFields)])

const uniqueObject = {}

uniqueKeys.forEach((key) => {
	if (AuctionRoundExtraProductFields.hasOwnProperty(key) && !AuctionRoundDetailFields.hasOwnProperty(key)) {
		uniqueObject[key] = AuctionRoundExtraProductFields[key]
	} else if (!AuctionRoundExtraProductFields.hasOwnProperty(key) && AuctionRoundDetailFields.hasOwnProperty(key)) {
		uniqueObject[key] = AuctionRoundDetailFields[key]
	}
})
