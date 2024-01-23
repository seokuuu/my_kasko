// 상시 판매 관리 > 주문 확인

var checkboxSelection = function (params) {
	// we put checkbox on the name if we are not doing grouping
	return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
	// we put checkbox on the name if we are not doing grouping
	return params.columnApi.getRowGroupColumns().length === 0
}

export const saleProductListFieldsCols = [
	{ maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
	{ field: '순번' },
	{ field: '상시판매 번호' },
	{ field: '상시판매 주문일자' },
	{ field: '고객사명' },
	{ field: '고객코드' },
	{ field: '창고' },
	{ field: '상시판매 상태' },
	{ field: '승인상태' },
	{ field: '판매구분' },
	{ field: '판매유형' },
	{ field: '판매가유형' },
	{ field: '제품군' },
	{ field: '제품 수량' },
	{ field: '중량 합계' },
	{ field: '제품금액 (VAT포함)' },
	{ field: '운반비 금액 (VAT포함)' },
	{ field: '입금 요청액' },
	{ field: '목적지 코드' },
	{ field: '목적지 명' },
	{ field: '목적지 주소' },
	{ field: '목적지 연락처(사무실)' },
	{ field: '목적지담당자 연락처 (휴대폰)' },
	{ field: '하차지명' },
	{ field: '주문상태' },
	{ field: '확정전송 일자' },
	{ field: '주문번호' },
	{ field: '비고' },
	{ field: '매입운반비' },
	{ field: '매출운반비' },
	{ field: '재고상태' },
	{ field: '최종수정자' },
	{ field: '최종수정일시' },
]

export const saleProductListResponseToTableRowMap = {
	uid: 'auctionNumber', // This field 'sequence' was not in the original response. Please replace with the correct field if necessary.
	'상시판매 번호': 'auctionNumber',
	'상시판매 주문일자': 'auctionCreateDate',
	고객사명: 'customerName',
	고객코드: 'customerCode',
	창고: 'storageName',
	'상시판매 상태': 'auctionStatus',
	승인상태: 'approvalStatus',
	판매구분: 'saleCategory',
	판매유형: 'saleType',
	판매가유형: 'salePriceType',
	제품군: 'spart',
	'제품 수량': 'quantity',
	'중량 합계': 'totalWeight',
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
	주문번호: 'auctionBidUid',
	비고: 'productMemo',
	매입운반비: 'freightCost',
	매출운반비: 'totalFreightCost',
	재고상태: 'saleStatus',
	최종수정자: 'updateMemberName',
	최종수정일시: 'updateDate',
}
