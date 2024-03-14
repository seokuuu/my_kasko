/* eslint-disable no-restricted-globals */
import BtnCellRenderer from '../../pages/Table/BtnCellRenderer.jsx'
import InputCellRenderer from '../../pages/Table/InputCellRenderer.jsx'
import { commonStyles } from '../commonCellStyle.js'
import { recommendCell } from '../../pages/Product/SingleProduct/cellRender/RecommendCellRender.jsx'

var checkboxSelection = function (params) {
	// we put checkbox on the name if we are not doing grouping
	return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
	// we put checkbox on the name if we are not doing grouping
	return params.columnApi.getRowGroupColumns().length === 0
}

export const singleDispatchFields = {
	순번: 'index',
	'제품 번호': 'number',
	창고: 'storageName',
	ProNo: 'productNoNumber',
	'등록 일자': 'createDate',
	'입고 상태': 'receiptStatus',
	매입처: 'supplier',
	제조사: 'maker',
	입고일자: 'receiptDate',
	'경매 등록 상태': 'registrationStatus',
	'경매 번호': 'auctionNumber',
	'판매 구분': 'saleCategory',
	'판매 유형': 'saleType',
	'판매가 유형': 'salePriceType',
	제품군: 'spart',
	'제품 등급': 'grade',
	'정척 여부': 'preferThickness',
	'유찰 횟수': 'failCount',
	매입가: 'price',
	'경매 시작 단가': 'auctionStartPrice',
	'낙찰 상태': 'biddingStatus',
	'제품 사양': 'wdh',
	두께: 'thickness',
	폭: 'width',
	길이: 'length',
	중량: 'weight',
	'규격 약호': 'spec',
	TS: 'ts',
	YP: 'yp',
	'C%': 'c',
	EL: 'el',
	Si: 'si',
	Mn: 'mn',
	P: 'p',
	S: 's',
	'여재 원인': 'causeCode',
	'여재 원인명': 'causeCodeName',
	'용도 코드': 'usageCode',
	용도명: 'usageCodeName',
	메모: 'memo',
	'제품 낙찰 단가': 'productBiddingPrice',
	'낙찰 총 단가': 'totalBiddingPrice',
	'제품 공급가': 'orderPrice',
	'제품 부가세': 'orderPriceVat',
	'제품금액 (VAT포함)': 'orderPriceVat',
	'기본 운임 단가': 'freightFee',
	'할증 운임 단가': 'extraUnitPrice',
	'운임 총단가': 'totalFreightPrice',
	'운반비 공급가': 'freightCost',
	'운반비 부가세': 'freightCostVat',
	'운반비 금액 (VAT포함)': 'totalFreightCost',
	총공급가: 'totalPrice',
	총부가세: 'totalPriceVat',
	합계: 'total',
	목적지명: 'destinationName',
	비고: 'note',
	'제품 상태': 'productStatus',
	'재고 상태': 'stockStatus',
	'주문 상태': 'orderStatus',
	'상시 판매가': 'salePrice',
	'상시 판매 상태': 'saleStatus',
	'확정 전송 일자': 'sendDate',
	패키지명: 'packageName',
	패키지번호: 'packageNumber',
	'판매 제외 사유': 'excludeSaleReason',
	'클레임 진행 상태': 'claimStatus',
	'아울렛 상태': 'outletStatus',
	'아울렛 가격': 'outletPrice',
	'추천 제품 여부': 'bestStatus',
	'노출 상태': 'viewStatus',
	'고유 번호': 'uid',
	'최종 수정자': 'lastedUpdater',
	'최종 수정 일자': 'updateDate',
}

export const SingleDispatchFieldsCols = () => [
	{ field: '', ...commonStyles, minWidth: 50, checkboxSelection, headerCheckboxSelection },
	// {
	// 	...commonStyles,
	// 	minWidth: 100,
	// 	cellRenderer: BtnCellRenderer,
	// 	cellRendererParams: {
	// 		uidFieldName: '경매 번호',
	// 		editType: 'productModify',
	// 	},
	// },
	{ ...commonStyles, field: '순번', minWidth: 100 },
	{ ...commonStyles, field: '제품 번호', minWidth: 200, cellRenderer: recommendCell },
	...Object.keys(singleDispatchFields)
		.slice(2)
		.map((item) => ({
			...commonStyles,
			field: item,
			editable: item === '메모' || item === '비고' ? true : false,
			minWidth: item === '메모' || item === '비고' ? 200 : 150,
			cellRenderer: (params) => {
				if (item === '메모' || item === '비고') {
					return params.value
				}
				if (typeof params.value === 'boolean') {
					return params.value ? 'Y' : 'N'
				} else {
					return params.value
				}
			},
		})),
]

export const SingleSalesDispatchFieldsCols = (isUpdate = false) => [
	{ field: '', ...commonStyles, minWidth: 50, checkboxSelection, headerCheckboxSelection },
	isUpdate && {
		...commonStyles,
		minWidth: 100,
		cellRenderer: BtnCellRenderer,
		cellRendererParams: {
			uidFieldName: '경매 번호',
			editType: 'productModify',
		},
	},
	{ ...commonStyles, field: '순번', minWidth: 100 },
	{ ...commonStyles, field: '제품 번호', minWidth: 200, cellRenderer: recommendCell },
	...Object.keys(singleDispatchFields)
		.slice(2)
		.map((item) => ({
			...commonStyles,
			field: item,
			editable: item === '메모' || item === '비고' ? true : false,
			minWidth: item === '메모' || item === '비고' ? 200 : 150,
			cellRenderer: (params) => {
				if (item === '메모' || item === '비고') {
					return params.value
				}
				if (typeof params.value === 'boolean') {
					return params.value ? 'Y' : 'N'
				} else {
					return params.value
				}
			},
		})),
]

var optionFn = function (key) {
	let options = []

	switch (key) {
		case '재고 상태':
			options = ['자사 재고', '타사 재고']
			break
		case '제조사':
			options = ['현대제철', '동은스틸']
			break
		case '판매 구분':
			options = ['판매재', '판매 제외재', '판매 완료재']
			break
		case '매입처':
			options = ['현대제철', '카스코철강']
			break
		default:
			break
	}

	return options
}
/// 제품 수정 창에 데려올 필드와 설정하는 컬럼

export const SingleModifyFields = {
	'제품 번호': 'number',
	'저장 위치': 'storage',
	'저장 위치명': 'storageName',
	'규격 약호': 'spec',
	'제품 사양': 'wdh',
	두께: 'thickness',
	폭: 'width',
	길이: 'length',
	중량: 'weight',
	등급: 'grade',
	'용도 코드': 'usageCode',
	용도명: 'usageCodeName',
	'C%': 'c',
	Si: 'si',
	Mn: 'mn',
	P: 'p',
	S: 's',
	TS: 'ts',
	YP: 'yp',
	EL: 'el',
	'제품군 코드': 'spartCode',
	제품군명: 'spart',
	매입처: 'supplier',
	제조사: 'maker',
	품명: 'name',
	매입가: 'price',
	'정척 여부': 'preferThickness',
	'여재 원인 코드': 'causeCode',
	'여재 원인명': 'causeCodeName',
	입고일: 'receiptDate',
	'재고 상태': 'stockStatus',
	'판매 구분': 'saleCategory',
}

export const SingleModifyDispatchFieldsCols = [
	{
		field: '',
		headerClass: 'custom-header-style',
		flex: 1,
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		minWidth: 50,
		checkboxSelection,
		headerCheckboxSelection,
	},
	...Object.entries(SingleModifyFields).map(([k, v]) => {
		if (k !== '재고 상태' && k !== '판매 구분' && k !== '매입처' && k !== '제조사') {
			return {
				...commonStyles,
				field: k,
				minWidth: 150,
				editable: true,
				cellRenderer: InputCellRenderer,
				cellRendererParams: {
					uidFieldName: k,
					valueName: v,
					type: 'input',
				},
			}
		} else {
			return {
				...commonStyles,
				field: k,
				minWidth: 150,
				editable: true,
				cellEditor: 'agSelectCellEditor',
				cellRenderer: InputCellRenderer,
				cellRendererParams: {
					uidFieldName: k,
					valueName: v,
					type: 'select',
				},
				cellEditorParams: {
					values: optionFn(k), // 셀렉트 박스에 표시할 옵션들
				},
			}
		}
	}),
]
