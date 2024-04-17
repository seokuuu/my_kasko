// 상시 판매 관리 > 주문 확인

import { getNormalTableRows } from '../../utils/table'
import { SaleNumberCellRender } from '../../pages/Table/SaleNumberCellRender'

var checkboxSelection = function (params) {
	return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
	return params.columnApi.getRowGroupColumns().length === 0
}

export const saleProductListFieldsCols = getNormalTableRows([
	{
		maxWidth: 50,
		checkboxSelection: checkboxSelection,
		headerCheckboxSelection: headerCheckboxSelection,
		minWidth: 100,
		cellStyle: { textAlign: 'center' },
	},
	{ field: '순번', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '상시판매 번호', minWidth: 100, cellStyle: { textAlign: 'center' }, cellRenderer: SaleNumberCellRender },
	{ field: '상시판매 주문일자', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '패키지명', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '패키지번호', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '고객사명', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '고객코드', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '창고', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '상시판매 상태', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '승인상태', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '판매구분', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '판매유형', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '판매가유형', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '제품군', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '제품 수량', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '총 중량', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '제품금액 (VAT포함)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '운반비 금액 (VAT포함)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '입금 요청액', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '목적지 코드', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '목적지 명', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '목적지 주소', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '목적지 연락처(사무실)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '목적지담당자 연락처 (휴대폰)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '하차지명', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '주문상태', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '확정전송 일자', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '주문번호', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '비고', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '매입운반비', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '매출운반비', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '재고상태', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '최종수정자', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '최종수정일시', minWidth: 100, cellStyle: { textAlign: 'center' } },
])

export const saleProductListResponseToTableRowMap = {
	uid: 'auctionNumber',
	순번: 'orderUid',
	'상시판매 번호': 'auctionNumber',
	'상시판매 주문일자': 'auctionCreateDate',
	패키지번호: 'packageNumber',
	패키지명: 'packageName',
	고객사명: 'customerName',
	고객코드: 'customerCode',
	창고: 'storageName',
	'상시판매 상태': 'saleStatus',
	승인상태: 'approvalStatus',
	판매구분: 'saleCategory',
	판매유형: 'saleType',
	판매가유형: 'salePriceType',
	제품군: 'spart',
	'제품 수량': 'quantity',
	'총 중량': 'totalWeight',
	'제품금액 (VAT포함)': 'totalOrderPrice',
	'운반비 금액 (VAT포함)': 'totalFreightCost',
	'입금 요청액': 'orderPrice',
	'목적지 코드': 'destinationCode',
	'목적지 명': 'destinationName',
	'목적지 주소': 'customerDestinationAddress',
	'목적지 연락처(사무실)': 'customerDestinationPhone',
	'목적지담당자 연락처 (휴대폰)': 'customerDestinationManagerPhone',
	하차지명: 'customerDestinationName',
	주문상태: 'orderStatus',
	'확정전송 일자': 'updateDate',
	주문번호: 'orderUid',
	비고: 'productMemo',
	매입운반비: 'freightCost',
	매출운반비: 'totalFreightCost',
	재고상태: 'stockStatus',
	최종수정자: 'updateMemberName',
	최종수정일시: 'updateDate',
}
