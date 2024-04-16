import RecommendCellRenderer from '../../pages/Table/RecommendCellRenderer.jsx'
var checkboxSelection = function (params) {
	// we put checkbox on the name if we are not doing grouping
	return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
	// we put checkbox on the name if we are not doing grouping
	return params.columnApi.getRowGroupColumns().length === 0
}

export const singleDispatchFields = {
	'제품 번호': 'number',
	'규격 약호': 'spec',
	창고: 'storageName',
	'제품 사양': 'wdh',
	두께: 'thickness',
	폭: 'width',
	길이: 'length',
	중량: 'weight',
	'제품 등급': 'grade',
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
	제품군명: 'spart',
	'정척 여부': 'preferThickness',
	'여재 원인': 'causeCode',
	'여재 원인명': 'causeCodeName',
	입고일: 'receiptDate',
	'추천 제품 여부': 'bestStatus',
}

export const SingleDispatchFieldsCols = [
	{ headerClass: 'custom-header-style', field: '제품 번호', minWidth: 100 },
	{ headerClass: 'custom-header-style', field: '규격 약호', minWidth: 100 },
	{ headerClass: 'custom-header-style', field: '창고', minWidth: 100 },
	{ headerClass: 'custom-header-style', field: '제품 사양', minWidth: 100 },
	{ headerClass: 'custom-header-style', field: '두께', minWidth: 100 },
	{ headerClass: 'custom-header-style', field: '폭', minWidth: 100 },
	{ headerClass: 'custom-header-style', field: '길이', minWidth: 100 },
	{ headerClass: 'custom-header-style', field: '중량', minWidth: 100 },
	{ headerClass: 'custom-header-style', field: '제품 등급', minWidth: 100 },
	{ headerClass: 'custom-header-style', field: '용도 코드', minWidth: 100 },
	{ headerClass: 'custom-header-style', field: '용도명', minWidth: 100 },
	{ headerClass: 'custom-header-style', field: 'C%', minWidth: 100 },
	{ headerClass: 'custom-header-style', field: 'Si', minWidth: 100 },
	{ headerClass: 'custom-header-style', field: 'Mn', minWidth: 100 },
	{ headerClass: 'custom-header-style', field: 'P', minWidth: 100 },
	{ headerClass: 'custom-header-style', field: 'S', minWidth: 100 },
	{ headerClass: 'custom-header-style', field: 'TS', minWidth: 100 },
	{ headerClass: 'custom-header-style', field: 'YP', minWidth: 100 },
	{ headerClass: 'custom-header-style', field: 'EL', minWidth: 100 },
	{ headerClass: 'custom-header-style', field: '제품군명', minWidth: 100 },
	{ headerClass: 'custom-header-style', field: '정척 여부', minWidth: 100 },
	{ headerClass: 'custom-header-style', field: '여재 원인', minWidth: 100 },
	{ headerClass: 'custom-header-style', field: '여재 원인명', minWidth: 100 },
	{ headerClass: 'custom-header-style', field: '입고일', minWidth: 100 },
	{
		headerClass: 'custom-header-style',
		field: '추천 제품 여부',
		minWidth: 100,
		cellRenderer: RecommendCellRenderer,
		cellRendererParams: {
			uidFieldName: '추천 제품 여부',
			editType: 'recommend',
		},
	},
]
