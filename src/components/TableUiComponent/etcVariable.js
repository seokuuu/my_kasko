export const columnDefs = [
	{
		headerName: '순번',
		field: '',
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 120,
	},
	{
		headerName: '제품 번호',
		field: '제품 번호',
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 150,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '창고',
		field: '창고',
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 190,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '입고상태',
		field: '입고 상태',
		headerClass: 'custom-header-style',
		cellStyle: function (params) {
			if (params.value === '입고 확정') {
				return { color: 'dodgerblue', borderRight: '1px solid #c8c8c8', textAlign: 'center' }
			} else if (params.value === '입고확정 취소') {
				return { color: 'gray', borderRight: '1px solid #c8c8c8', textAlign: 'center' }
			} else {
				return { borderRight: '1px solid #c8c8c8', textAlign: 'center' }
			}
		},
		width: 110,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '입고일자',
		field: '입고일',
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 120,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '매입구분',
		field: '매입 구분',
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 90,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '제품군',
		field: '제품군',
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 107,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '재고상태',
		field: '재고 상태',
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 110,
		cellRenderer: (params) => params.value || '-',
	},
	{
		headerName: '매입처',
		field: '매입처',
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 110,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '제조사',
		field: '제조사',
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 110,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '등급',
		field: '등급',
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 90,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '정척여부',
		field: '정척 여부',
		headerClass: 'custom-header-style',
		cellStyle: function (params) {
			if (params.value === 'Y') {
				return { color: 'dodgerblue', borderRight: '1px solid #c8c8c8', textAlign: 'center' }
			} else {
				return { borderRight: '1px solid #c8c8c8', textAlign: 'center' }
			}
		},
		width: 100,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '두께(MM)',
		field: '두께',
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 100,
		cellRenderer: function (params) {
			if (params.value !== null && params.value !== undefined) {
				return `${Math.round(params.value)}MM`
			} else {
				return 'N'
			}
		},
	},
	{
		headerName: '폭(MM)',
		field: '폭',
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 100,
		cellRenderer: function (params) {
			if (params.value !== null && params.value !== undefined) {
				return `${Math.round(params.value)}MM`
			} else {
				return 'N'
			}
		},
	},
]

export const divideProField = {
	등급: 'grade',
	중량: 'weight',
	두께: 'thickness',
	폭: 'width',
	길이: 'length',
	yp: 'yp',
	ys: 'ts',
	'c%': 'c',
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
	'여재 원인': 'causeCode',
	'여재 원인명1': 'causeCodeName',
	수정일: 'updateDate',
	'주문 번호': 'hsOrderNo',
	'클레임 진행상태': 'claimStatus',
	'입고 상태': 'receiptStatus',
	'현대제철 반품일자': 'hsReturnDate',
	'카스코 반품일자': 'kaskoReturnDate',
	생성일: 'createDate',
	확정전송일자: 'sendDate',
	매입가: 'price',
}
