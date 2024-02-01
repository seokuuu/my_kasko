// 상시 판매 관리 > 패캐지
import MarkerCellRenderer from '../../pages/Table/MarkerCellRenderer'
import { getNormalTableRows } from '../../utils/table'

var checkboxSelection = function (params) {
	return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
	return params.columnApi.getRowGroupColumns().length === 0
}

export const packageFieldsCols = (numberClickHandler = undefined) =>
	getNormalTableRows([
		{ field: '', maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
		{ field: '순번', minWidth: 100, cellStyle: { 'text-align': 'center' } },
		{ field: '노출 여부', minWidth: 100, cellStyle: { 'text-align': 'center' } },
		{ field: '패키지명', minWidth: 100, cellStyle: { 'text-align': 'center' } },
		{
			field: '패키지번호',
			minWidth: 100,
			cellRenderer: MarkerCellRenderer,
			cellRendererParams: (params) => ({ ...params.data[params.column.colId], clickHandler: numberClickHandler }),
			valueGetter: (v) => v.data[v.column.colId],
		},
		{ field: '상시판매 번호', minWidth: 100, cellStyle: { 'text-align': 'center' } },
		{ field: '상시판매가', minWidth: 100, cellStyle: { 'text-align': 'center' } },
		{ field: '상시판매 상태', minWidth: 100, cellStyle: { 'text-align': 'center' } },
		{ field: '상시판매 주문일자', minWidth: 100, cellStyle: { 'text-align': 'center' } },
		{ field: '경매번호', minWidth: 100, cellStyle: { 'text-align': 'center' } },
		{ field: '판매구분', minWidth: 100, cellStyle: { 'text-align': 'center' } },
		{ field: '판매유형', minWidth: 100, cellStyle: { 'text-align': 'center' } },
		{ field: '경매시작단가 (시작가)', minWidth: 100, cellStyle: { 'text-align': 'center' } },
		{ field: '중량', minWidth: 100, cellStyle: { 'text-align': 'center' } },
		{ field: '메모', minWidth: 100, cellStyle: { 'text-align': 'center' } },
		{ field: '비고', minWidth: 100, cellStyle: { 'text-align': 'center' } },
		{ field: '최종수정자', minWidth: 100, cellStyle: { 'text-align': 'center' } },
		{ field: '최종수정일시', minWidth: 100, cellStyle: { 'text-align': 'center' } },
	])

export const packageResponseToTableRowMap = {
	순번: 'uid',
	패키지명: 'name',
	'노출 여부': 'viewStatus',
	패키지번호: 'number',
	'상시판매 번호': 'orderNumber',
	상시판매가: 'price',
	'상시판매 상태': 'saleStatus',
	'상시판매 주문일자': 'orderDate',
	경매번호: 'auctionNumber',
	판매구분: 'saleCategory',
	판매유형: 'saleType',
	'경매시작단가 (시작가)': 'price',
	중량: 'totalWeight',
	메모: 'memo',
	비고: 'note',
	최종수정자: 'updater',
	최종수정일시: 'updateDate',
}
