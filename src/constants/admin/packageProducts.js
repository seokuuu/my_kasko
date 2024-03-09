// 상시 판매 관리 > 패캐지
import MarkerCellRenderer from '../../pages/Table/MarkerCellRenderer'
import { getNormalTableRows } from '../../utils/table'
import { commonStyles } from '../commonCellStyle'

var checkboxSelection = function (params) {
	return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
	return params.columnApi.getRowGroupColumns().length === 0
}

export const packageResponseToTableRowMap = {
	순번: 'index',
	패키지명: 'name',
	패키지번호: 'number',
	등록일자: 'createDate',
	판매구분: 'saleCategory',
	판매유형: 'saleType',
	'상시판매 번호': 'orderNumber',
	상시판매가: 'price',
	'상시판매 상태': 'saleStatus',
	'상시판매 주문일자': 'orderDate',
	판매가: 'price',
	중량: 'totalWeight',
	메모: 'memo',
	비고: 'note',
	'노출 여부': 'viewStatus',
	'패키지 고유번호': 'uid',
	최종수정자: 'updater',
	최종수정일시: 'updateDate',
}

export const packageFieldsCols = (numberClickHandler = undefined) =>
	getNormalTableRows([
		{
			...commonStyles,
			field: '',
			minWidth: 50,
			maxWidth: 50,
			checkboxSelection: checkboxSelection,
			headerCheckboxSelection: headerCheckboxSelection,
		},
		{ ...commonStyles, field: '순번', minWidth: 80 },
		{ ...commonStyles, field: '패키지명', minWidth: 150 },
		{
			...commonStyles,
			field: '패키지번호',
			minWidth: 100,
			cellRenderer: MarkerCellRenderer,
			cellRendererParams: (params) => ({ ...params.data[params.column.colId], clickHandler: numberClickHandler }),
			valueGetter: (v) => v.data[v.column.colId],
		},
		{ ...commonStyles, field: '등록일자', minWidth: 200 },
		{ ...commonStyles, field: '판매구분', minWidth: 100 },
		{ ...commonStyles, field: '판매유형', minWidth: 100 },
		{ ...commonStyles, field: '상시판매 번호', minWidth: 200 },
		{ ...commonStyles, field: '상시판매가', minWidth: 200 },
		{ ...commonStyles, field: '상시판매 상태', minWidth: 200 },
		{ ...commonStyles, field: '상시판매 주문일자', minWidth: 200 },
		{ ...commonStyles, field: '판매가', minWidth: 100 },
		{ ...commonStyles, field: '중량', minWidth: 100 },
		{ ...commonStyles, field: '메모', minWidth: 100 },
		{ ...commonStyles, field: '비고', minWidth: 100 },
		{ ...commonStyles, field: '노출 여부', minWidth: 100 },
		{ ...commonStyles, field: '패키지 고유번호', minWidth: 100 },
		{ ...commonStyles, field: '최종수정자', minWidth: 100 },
		{ ...commonStyles, field: '최종수정일시', minWidth: 100 },
	])
