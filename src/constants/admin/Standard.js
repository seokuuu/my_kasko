import BtnCellRenderer from '../../pages/Table/BtnCellRenderer'
import { commonStyles } from './Auction'

const checkboxSelection = function (params) {
	// we put checkbox on the name if we are not doing grouping
	return params.columnApi.getRowGroupColumns().length === 0
}

const headerCheckboxSelection = function (params) {
	// we put checkbox on the name if we are not doing grouping
	return params.columnApi.getRowGroupColumns().length === 0
}

/* ==============================
    기준 관리 - 목적지 관리 (Destination)
============================== */

// 기준관리 - 목적지관리 Modal fields
export const StandardDestinaionFields = {
	순번: 'index',
	'목적지 고유 번호': 'uid',
	'목적지 코드': 'code',
	'목적지 명': 'name',
	'특별목적지 여부': 'isSpecialAddress',
	작성자: 'createMember',
	작성일: 'createDate',
	수정자: 'updateMember',
	수정일: 'updateDate',
	비고: 'note',
	'매입운반비 목적지': 'inDestinationName',
	매입운반비: 'inEffectCost',
	'매출운반비 목적지': 'outDestinationName',
	매출운반비: 'outEffectCost',
}

// 기준관리 - 목적지관리 Modal post
export const StandardDestinationPost = {
	'목적지 선택': 'destipostbutton',
	'목적지 코드': 'destipostcode',
	'목적지 명': 'destipostname',
	등록자: 'auto',
	등록일자: 'auto',
	비고: 'note',
}

// 기준관리 - 목적지관리 Modal Edit
export const StandardDestinationEdit = {
	'목적지 코드': 'auto',
	'목적지 명': 'name-input',
	작성자: 'auto',
	작성일: 'formatDate',
	수정자: 'auto',
	수정일: 'formatDate',
}

// {
//     "uid": 15,
//     "storage": "창고2",
//     "destinationCode": "A",
//     "destinationName": "인천",
//     "spart": "후판",
//     "effectDate": "2023-06-21",
//     "previousCost": 0,
//     "effectCost": 200000
// },

// 기준관리 - 목적지관리 fieldsCols
//  주석 처리 : cell 내 버튼 기능
export const StandardDestinaionFieldsCols = [
	{ ...commonStyles, field: '', minWidth: 50, maxWidth: 50, checkboxSelection, headerCheckboxSelection },
	{ ...commonStyles, field: '순번', minWidth: 100 },
	// {
	// 	...commonStyles,
	// 	field: '수정',
	// 	minWidth: 90,
	// 	cellRenderer: BtnCellRenderer,
	// 	cellRendererParams: {
	// 		uidFieldName: '목적지 고유 번호',
	// 		editType: 'table',
	// 	},
	// },
	{ ...commonStyles, field: '목적지 고유 번호', minWidth: 120 },
	{ ...commonStyles, field: '특별목적지 여부', minWidth: 120 },
	{ ...commonStyles, field: '목적지 코드', minWidth: 100 }, //숫자
	{ ...commonStyles, field: '목적지 명', minWidth: 300 },
	{ ...commonStyles, field: '작성자', minWidth: 100 },
	{ ...commonStyles, field: '작성일', minWidth: 200 },
	{ ...commonStyles, field: '수정자', minWidth: 100 },
	{ ...commonStyles, field: '수정일', minWidth: 100 },
	{ ...commonStyles, field: '비고', minWidth: 200 },
	{ ...commonStyles, field: '매입운반비 목적지', minWidth: 200 },
	{ ...commonStyles, field: '매입운반비', minWidth: 200 },
	{ ...commonStyles, field: '매출운반비 목적지', minWidth: 200 },
	{ ...commonStyles, field: '매출운반비', minWidth: 200 },
]

/* ==============================
    기준 관리 - 운반비 관리 (Transportation)
============================== */

// 기준관리 - 운반비 관리 fields
export const StandardTransportationFields = {
	순번: 'index',
	'운반비 고유 번호': 'uid',
	창고: 'storage',
	목적지코드: 'destinationCode',
	목적지명: 'destinationName',
	제품군: 'spart',
	적용일: 'effectDate',
	'단가 적용일': 'effectDate',
	이전단가: 'previousCost',
	적용단가: 'effectCost',
	수정자: 'updateMember',
}

// 기준 관리 - 운반비 관리 post
export const StandardTransportationPost = {
	출발지: 'dropdown4',
	'목적지 찾기': 'destipostbutton',
	'목적지 코드': 'destipostcode',
	목적지: 'destinationName',
	'제품 구분': 'dropdown',
	'단가 적용일': 'date',
	'적용 단가': 'effectCost',
}

// 기준 관리 - 운반비 관리 Edit
export const StandardTransportationEdit = {
	출발지: 'dropdown4',
	'목적지 코드': 'auto',
	목적지명: 'auto',
	제품구분: 'spartList',
	이전단가: 'auto',
	'단가 적용일': 'date',
	적용단가: 'input',
	수정자: 'auto',
}

// 기준관리 - 운반비 관리 fieldsCols
export const StandardTransportationFieldsCols = [
	{ ...commonStyles, field: '', minWidth: 50, maxWidth: 50, checkboxSelection, headerCheckboxSelection },
	{
		...commonStyles,
		field: '수정',
		maxWidth: 90,
		cellRenderer: BtnCellRenderer,
		cellRendererParams: {
			uidFieldName: '운반비 고유 번호',
			editType: 'table',
		},
	},
	{ ...commonStyles, field: '순번', minWidth: 100 },
	{
		...commonStyles,
		field: '창고',
		minWidth: 100,
	},
	{
		...commonStyles,
		field: '목적지코드',
		minWidth: 100,
	},
	{
		...commonStyles,
		field: '목적지명',
		minWidth: 300,
	},
	{
		...commonStyles,
		field: '제품군',
		minWidth: 100,
	},
	{
		...commonStyles,
		field: '적용일',
	},
	{
		...commonStyles,
		field: '이전단가',
		minWidth: 100,
	},
	{
		...commonStyles,
		field: '적용단가',
		minWidth: 100,
	},
	{
		...commonStyles,
		field: '운반비 고유 번호',
		minWidth: 160,
	},
]

/* ==============================
    기준 관리 - 할증 관리 (Surcharge)
============================== */

export const StandardSurchargeFields = {
	'할증 고유 번호': 'uid',
	'최소 길이': 'lengthMin',
	'최대 길이': 'lengthMax',
	'최소 폭': 'widthMin',
	'최대 폭': 'widthMax',
	'할증 (%)': 'percent',
}

export const StandardSurchargeFieldsCols = [
	{ ...commonStyles, field: '', minWidth: 50, maxWidth: 50, checkboxSelection, headerCheckboxSelection },
	{
		...commonStyles,
		field: '수정',
		minWidth: 90,
		cellRenderer: BtnCellRenderer,
		cellRendererParams: {
			uidFieldName: '할증 고유 번호',
			editType: 'calcul',
		},
	},
	{
		...commonStyles,
		field: '할증 고유 번호',
		minWidth: 100,
	},
	{ ...commonStyles, field: '최소 길이', minWidth: 100 },
	{ ...commonStyles, field: '최대 길이', minWidth: 100 },
	{ ...commonStyles, field: '최소 폭', minWidth: 100 },
	{
		...commonStyles,
		field: '최대 폭',
		minWidth: 100,
	},
	{
		...commonStyles,
		field: '할증 (%)',
		minWidth: 100,
	},
]

// 기준 관리 - 운반비 관리 Edit
export const StandardSurchargeEdit = {
	창고: 'auto',
	'목적지 코드': 'auto',
	목적지명: 'auto',
	제품군: 'auto',
	적용일: 'date',
	적용단가: 'input',
}

/* ==============================
    기준 관리 - 합짐비 관리 (Consolidation)
============================== */

export const StandardConsolidationFields = {
	순번: 'index',
	'합짐비 고유 번호': 'uid',
	착: 'land',
	'동일 시군 가격': 'inAreaPrice',
	'타 시군 가격': 'outAreaPrice',
}

export const StandardConsolidationFieldsCols = [
	{ ...commonStyles, field: '', minWidth: 50, maxWidth: 50, checkboxSelection, headerCheckboxSelection },
	{
		...commonStyles,
		field: '수정',
		minWidth: 90,
		maxWidth: 90,
		cellRenderer: BtnCellRenderer,
		cellRendererParams: {
			uidFieldName: '합짐비 고유 번호',
			editType: 'consoli',
		},
	},
	{ ...commonStyles, field: '순번', minWidth: 100, maxWidth: 100 },
	{
		...commonStyles,
		field: '합짐비 고유 번호',
		minWidth: 100,
	},
	{ ...commonStyles, field: '착', minWidth: 100 },
	{ ...commonStyles, field: '동일 시군 가격', minWidth: 100 },
	{ ...commonStyles, field: '타 시군 가격', minWidth: 100 },
]
