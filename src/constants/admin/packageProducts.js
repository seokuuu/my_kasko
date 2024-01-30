// 상시 판매 관리 > 패캐지
import MarkerCellRenderer from '../../pages/Table/MarkerCellRenderer'
import { getNormalTableRows } from '../../utils/table'

var checkboxSelection = function (params) {
	// we put checkbox on the name if we are not doing grouping
	return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
	// we put checkbox on the name if we are not doing grouping
	return params.columnApi.getRowGroupColumns().length === 0
}

export const packageFieldsCols = (numberClickHandler = undefined) =>
	getNormalTableRows([
		{ field: '', maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
		{ field: '순번', minWidth: 100, cellStyle: { 'text-align': 'center' } },
		{ field: '노출상태', minWidth: 100, cellStyle: { 'text-align': 'center' } },
		{ field: '패키지명', minWidth: 100, cellStyle: { 'text-align': 'center' } },
		{
			field: '패키지번호',
			minWidth: 100,
			cellRenderer: MarkerCellRenderer,
			valueGetter: (v) => ({ ...v.data[v.column.colId], clickHandler: numberClickHandler }),
		},
		// { field: '패키지번호', minWidth: 100, cellStyle: { 'text-align': 'center' } },
		{ field: '상시판매 번호', minWidth: 100, cellStyle: { 'text-align': 'center' } },
		{ field: '상시판매가', minWidth: 100, cellStyle: { 'text-align': 'center' } },
		{ field: '상시판매 상태', minWidth: 100, cellStyle: { 'text-align': 'center' } },
		{ field: '상시판매 주문일자', minWidth: 100, cellStyle: { 'text-align': 'center' } },
		{ field: '경매번호', minWidth: 100, cellStyle: { 'text-align': 'center' } },
		{ field: '판매구분', minWidth: 100, cellStyle: { 'text-align': 'center' } },
		{ field: '판매유형', minWidth: 100, cellStyle: { 'text-align': 'center' } },
		{ field: '경매시작단가', minWidth: 100, cellStyle: { 'text-align': 'center' } },
		{ field: '중량', minWidth: 100, cellStyle: { 'text-align': 'center' } },
		{ field: '메모', minWidth: 100, cellStyle: { 'text-align': 'center' } },
		{ field: '비고', minWidth: 100, cellStyle: { 'text-align': 'center' } },
		{ field: '최종수정자', minWidth: 100, cellStyle: { 'text-align': 'center' } },
		{ field: '최종수정일시', minWidth: 100, cellStyle: { 'text-align': 'center' } },
	])

/*
    api/package-product
    Response

    uid             // 패키지 고유번호
    name            // 패키지 이름
    number          // 패키지 번호
    saleType        // 판매 유형 (경매 대상재 / 상시 판매 대상재)
    saleCategory    // 판매 구분 (판매재 / 판매 제외재 / 판매 완료재)
    price           // 패키지 경매&판매 시작가
    totalWeight     // 중량
    memo            // 메모
    note            // 비고
    updateDate      // 최종 수정일자
    auctionNumber   // 경매 번호
    auctionStatus   // 경매 상태
    updater         // 최종 수정자
*/

// TODO: Check the missing mapping with Hobin or Hyuk.
export const packageResponseToTableRowMap = {
	순번: 'uid', // Correct mapping to 'uid'
	패키지명: 'name', // Correct mapping to 'name'
	노출상태: 'viewStatus', // 노출 상태
	패키지번호: 'number', // Correct mapping to 'number'
	'상시판매 번호': 'orderNumber', // Unclear: not in the response structure
	상시판매가: 'price', // Correct mapping to 'price'
	'상시판매 상태': 'auctionStatus', // Correct mapping to 'auctionStatus'
	'상시판매 주문일자': 'orderDate', // Unclear: not in the response structure
	경매번호: 'auctionNumber', // Double check with client after development. Correct mapping to 'auctionNumber'
	판매구분: 'saleCategory', // Correct mapping to 'saleCategory'
	판매유형: 'saleType', // Correct mapping to 'saleType'
	경매시작단가: 'price', // Correct mapping to 'price'
	중량: 'totalWeight', // Correct mapping to 'totalWeight'
	메모: 'memo', // Correct mapping to 'memo'
	비고: 'note', // Correct mapping to 'note'
	최종수정자: 'updater', // Correct mapping to 'updater' from response
	최종수정일시: 'updateDate', // Correct mapping to 'updateDate' from response
}
