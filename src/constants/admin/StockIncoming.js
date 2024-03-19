import { commonStyles } from './Auction'

var checkboxSelection = function (params) {
	return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
	return params.columnApi.getRowGroupColumns().length === 0
}

export const StockIncomingFields = [
	{
		...commonStyles,
		field: '',
		minWidth: 50,
		checkboxSelection: checkboxSelection,
		headerCheckboxSelection: headerCheckboxSelection,
	},
	{
		...commonStyles,
		headerName: '순번',
		field: '순번',
		minWidth: 120,
	},
	{
		...commonStyles,
		field: '제품 번호',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '창고',
		minWidth: 190,
	},
	{
		...commonStyles,
		field: '입고 상태',
		cellStyle: function (params) {
			if (params.value === '입고 확정') {
				return { color: 'dodgerblue', borderRight: '1px solid #c8c8c8', textAlign: 'center' }
			} else if (params.value === '입고확정 취소') {
				return { color: 'gray', borderRight: '1px solid #c8c8c8', textAlign: 'center' }
			} else {
				return { borderRight: '1px solid #c8c8c8', textAlign: 'center' }
			}
		},
		minWidth: 110,
	},
	{
		...commonStyles,
		field: '입고일',
		minWidth: 120,
	},
	{
		...commonStyles,
		field: '매입처',
		minWidth: 110,
	},
	{
		...commonStyles,
		field: '제조사',
		minWidth: 110,
	},
	{
		...commonStyles,
		field: '제품군',
		minWidth: 107,
	},
	{
		...commonStyles,
		field: '등급',
		minWidth: 90,
	},
	{
		...commonStyles,
		field: '정척 여부',
		cellStyle: function (params) {
			if (params.value === 'Y') {
				return { color: 'dodgerblue', borderRight: '1px solid #c8c8c8', textAlign: 'center' }
			} else {
				return { borderRight: '1px solid #c8c8c8', textAlign: 'center' }
			}
		},
		minWidth: 100,
	},
	{
		...commonStyles,
		field: '유찰 횟수',
		minWidth: 90,
	},
	{
		...commonStyles,
		field: '매입가',
		minWidth: 90,
	},
	{
		...commonStyles,
		field: '두께',
		minWidth: 100,
	},
	{
		...commonStyles,
		field: '폭',
		minWidth: 100,
	},
	{
		...commonStyles,
		field: '길이',
		minWidth: 100,
	},
	{
		...commonStyles,
		field: '중량',
		minWidth: 100,
	},
	{
		...commonStyles,
		field: '규격 약호',
		minWidth: 100,
	},
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
	{ ...commonStyles, field: '메모', minWidth: 100 },
	{ ...commonStyles, field: '확정전송일', minWidth: 100 },
	{ ...commonStyles, field: '주문 번호', minWidth: 100 },
	{ ...commonStyles, field: '출고일자', minWidth: 100 },
	{ ...commonStyles, field: '비고', minWidth: 100 },
	{ ...commonStyles, field: '재고 상태', minWidth: 100 },
	{ ...commonStyles, field: '클레임 진행상태', minWidth: 100 },
	{ ...commonStyles, field: '현대제철 반품일자', minWidth: 100 },
	{ ...commonStyles, field: '카스코 반품일자', minWidth: 100 },
]

export const stockFields = {
	순번: 'index',
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
	'제품 고유 번호': 'uid',
	창고: 'storageName',
	입고일: 'receiptDate',
	제품군: 'spart',
	'재고 상태': 'stockStatus',
	매입처: 'supplier',
	제조사: 'maker',
	'제품 번호': 'number',
	'정척 여부': 'preferThickness',
	'유찰 횟수': 'failCount',
	'용도 코드': 'usageCode',
	용도명: 'usageCodeName',
	'여재 원인 코드': 'causeCode',
	'여재 원인명': 'causeCodeName',
	수정일: 'updateDate',
	'주문 번호': 'hsOrderNo',
	'클레임 진행상태': 'claimStatus',
	'입고 상태': 'receiptStatus',
	'현대제철 반품일자': 'hsReturnDate',
	'카스코 반품일자': 'kaskoReturnDate',
	생성일: 'createDate',
	확정전송일: 'sendDate',
	매입가: 'price',
	메모: 'memo',
	비고: 'note',
	출고일자: 'outDate',
}
