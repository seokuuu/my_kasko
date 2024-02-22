import { commonStyles } from './Auction'

var checkboxSelection = function (params) {
	return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
	return params.columnApi.getRowGroupColumns().length === 0
}

export const InventoryFieldsCols = [
	{
		...commonStyles,
		field: '',
		minWidth: 50,
		checkboxSelection: checkboxSelection,
		headerCheckboxSelection: headerCheckboxSelection,
	},
	{ ...commonStyles, field: '제품 번호', minWidth: 150 },
	{ ...commonStyles, field: '창고', minWidth: 100 },
	{ ...commonStyles, field: '등록 일자', minWidth: 250 },
	{ ...commonStyles, field: '입고 상태', minWidth: 150 },
	{ ...commonStyles, field: '입고일자', minWidth: 150 },
	{ ...commonStyles, field: '매입처', minWidth: 100 },
	{ ...commonStyles, field: '제조사', minWidth: 100 },
	{ ...commonStyles, field: '제품군', minWidth: 100 },
	{ ...commonStyles, field: '경매 등록 상태', minWidth: 100 },
	{ ...commonStyles, field: '경매 상태', minWidth: 100 },
	{ ...commonStyles, field: '경매 번호', minWidth: 100 },
	{ ...commonStyles, field: '판매 구분', minWidth: 100 },
	{ ...commonStyles, field: '판매 유형', minWidth: 100 },
	{ ...commonStyles, field: '판매가 유형', minWidth: 100 },
	{ ...commonStyles, field: '제품군', minWidth: 100 },
	{ ...commonStyles, field: '등급', minWidth: 100 },
	{ ...commonStyles, field: '정척 여부', minWidth: 100 },
	{ ...commonStyles, field: '유찰 횟수', minWidth: 100 },
	{ ...commonStyles, field: '매입가', minWidth: 100 },
	{ ...commonStyles, field: '낙찰 상태', minWidth: 100 },
	{ ...commonStyles, field: '낙찰가', minWidth: 100 },
	{ ...commonStyles, field: '고객사명', minWidth: 100 },
	{ ...commonStyles, field: '고객코드', minWidth: 100 },
	{ ...commonStyles, field: '두께', minWidth: 100 },
	{ ...commonStyles, field: '폭', minWidth: 100 },
	{ ...commonStyles, field: '길이', minWidth: 100 },
	{ ...commonStyles, field: '중량', minWidth: 100 },
	{ ...commonStyles, field: '규격 약호', minWidth: 100 },
	{ ...commonStyles, field: 'ts', minWidth: 100 },
	{ ...commonStyles, field: 'yp', minWidth: 100 },
	{ ...commonStyles, field: 'c', minWidth: 100 },
	{ ...commonStyles, field: 'el', minWidth: 100 },
	{ ...commonStyles, field: 'si', minWidth: 100 },
	{ ...commonStyles, field: 'mn', minWidth: 100 },
	{ ...commonStyles, field: 'p', minWidth: 100 },
	{ ...commonStyles, field: 's', minWidth: 100 },
	{ ...commonStyles, field: '여재 원인', minWidth: 100 },
	{ ...commonStyles, field: '여재 원인명', minWidth: 100 },
	{ ...commonStyles, field: '용도 코드', minWidth: 100 },
	{ ...commonStyles, field: '용도명', minWidth: 200 },
	{ ...commonStyles, field: '메모', minWidth: 100 },
	{ ...commonStyles, field: '제품 낙찰 단가', minWidth: 150 },
	{ ...commonStyles, field: '기본 운임단가', minWidth: 150 },
	{ ...commonStyles, field: '할증 운임단가', minWidth: 150 },
	{ ...commonStyles, field: '낙찰 총 단가', minWidth: 150 },
	{ ...commonStyles, field: '제품 공급가', minWidth: 150 },
	{ ...commonStyles, field: '운송비 공급가', minWidth: 150 },
	{ ...commonStyles, field: '총 공급가', minWidth: 150 },
	{ ...commonStyles, field: '제품대 부가세', minWidth: 150 },
	{ ...commonStyles, field: '운송비 부가세', minWidth: 150 },
	{ ...commonStyles, field: '총 부가세', minWidth: 150 },
	{ ...commonStyles, field: '제품 금액 (VAT)', minWidth: 150 },
	{ ...commonStyles, field: '운반비 금액 (VAT)', minWidth: 150 },
	{ ...commonStyles, field: '목적지명', minWidth: 200 },
	{ ...commonStyles, field: '목적지 코드', minWidth: 150 },
	{ ...commonStyles, field: '목적지 주소', minWidth: 200 },
	{ ...commonStyles, field: '목적지 연락처', minWidth: 150 },
	{ ...commonStyles, field: '목적지 담당자 연락처', minWidth: 150 },
	{ ...commonStyles, field: '하차지명', minWidth: 150 },
	{ ...commonStyles, field: '확정 전송일', minWidth: 150 },
	{ ...commonStyles, field: '주문 상태', minWidth: 150 },
	{ ...commonStyles, field: '주문 번호', minWidth: 150 },
	{ ...commonStyles, field: '출하 상태', minWidth: 150 },
	{ ...commonStyles, field: '출하지시 일자', minWidth: 150 },
	// 출하 요청 번호
	{ ...commonStyles, field: '배차 차량번호', minWidth: 150 },
	{ ...commonStyles, field: '배차 운전기사명', minWidth: 150 },
	{ ...commonStyles, field: '배차 운전기사 연락처', minWidth: 150 },
	{ ...commonStyles, field: '배차 차량종류', minWidth: 150 },
	{ ...commonStyles, field: '비고', minWidth: 100 },
	{ ...commonStyles, field: '매입 기본 운임단가', minWidth: 150 },
	{ ...commonStyles, field: '매입 할증 운임단가', minWidth: 150 },
	{ ...commonStyles, field: '매입 운송비 공급가', minWidth: 150 },
	{ ...commonStyles, field: '매입 운송비 부가세', minWidth: 150 },
	{ ...commonStyles, field: '매입 운반비', minWidth: 150 },
	{ ...commonStyles, field: '매출 운반비', minWidth: 150 },
	{ ...commonStyles, field: '재고 상태', minWidth: 100 },
	{ ...commonStyles, field: '상시 판매 번호', minWidth: 100 },
	{ ...commonStyles, field: '상시 판매가', minWidth: 100 },
	{ ...commonStyles, field: '상시 판매 상태', minWidth: 100 },
	{ ...commonStyles, field: '상시 판매 주문일자', minWidth: 200 },
	{ ...commonStyles, field: '패키지명', minWidth: 150 },
	{ ...commonStyles, field: '패키지 번호', minWidth: 150 },
	{ ...commonStyles, field: '카스코 낙찰가', minWidth: 100 },
	{ ...commonStyles, field: '회차 여부', minWidth: 100 },
	{ ...commonStyles, field: '회차 일자', minWidth: 100 },
	{ ...commonStyles, field: '고객사 반품일', minWidth: 200 },
	{ ...commonStyles, field: '카스코 반품일', minWidth: 200 },
	{ ...commonStyles, field: '판매 제외 사유', minWidth: 100 },
]

export const InvertoryFields = {
	'제품 고유 번호': 'uid',
	'제품 번호': 'productNumber',
	창고: 'storageName',
	'입고 상태': 'receiptStatus',
	입고일자: 'receiptDate',
	매입처: 'supplier',
	제조사: 'maker',
	'경매 등록 상태': 'registrationStatus',
	'경매 상태': 'auctionStatus',
	'경매 번호': 'auctionNumber',
	'판매 구분': 'saleCategory',
	'판매 유형': 'saleType',
	'판매가 유형': 'salePriceType',
	제품군: 'spart',
	등급: 'grade',
	'정척 여부': 'preferThickness',
	'유찰 횟수': 'failCount',
	매입가: 'price',
	'낙찰 상태': 'biddingStatus',
	낙찰가: 'biddingPrice',
	고객사명: 'customerName',
	고객코드: 'customerCode',
	두께: 'thickness',
	폭: 'width',
	길이: 'length',
	중량: 'weight',
	'규격 약호': 'spec',
	yp: 'yp',
	ts: 'ts',
	c: 'c',
	p: 'p',
	s: 's',
	si: 'si',
	el: 'el',
	mn: 'mn',
	'여재 원인': 'causeCode',
	'여재 원인명': 'causeCodeName',
	'용도 코드': 'usageCode',
	용도명: 'usageCodeName',
	메모: 'memo',
	'제품 낙찰 단가': 'productBiddingPrice',
	'기본 운임단가': 'freightFee',
	'할증 운임단가': 'extraUnitPrice',
	'낙찰 총 단가': 'totalBiddingPrice',
	'제품 공급가': 'orderPrice',
	'운송비 공급가': 'freightCost',
	'총 공급가': 'totalSupplyPrice',
	'제품대 부가세': 'orderPriceVat',
	'운송비 부가세': 'freightCostVat',
	'총 부가세': 'totalVat',
	'제품 금액 (VAT)': 'totalOrderPrice',
	'운반비 금액 (VAT)': 'totalFreightCost',
	'고객사 목적지 고유 번호': 'customerDestinationUid',
	목적지명: 'destinationName',
	'목적지 코드': 'destinationCode',
	'목적지 주소': 'customerDestinationAddress',
	'목적지 연락처': 'customerDestinationPhone',
	'목적지 담당자 연락처': 'customerDestinationManagerPhone',
	하차지명: 'customerDestinationName',
	'등록 일자': 'createDate',
	'확정 전송일': 'sendDate',
	'주문 상태': 'orderStatus',
	'주문 번호': 'hsOrderNo',
	'출하 상태': 'shippingStatus',
	'출하지시 일자': 'shippingDate',
	'배차 차량번호': 'carNumber',
	'배차 운전기사명': 'driverName',
	'배차 운전기사 연락처': 'driverPhone',
	'배차 차량종류': 'carType',
	비고: 'note',
	'매입 기본 운임단가': 'inboundFreightFee',
	'매입 할증 운임단가': 'inboundExtraUnitPrice',
	'매입 운송비 공급가': 'inboundFreightCost',
	'매입 운송비 부가세': 'inboundFreightCostVat',
	'매입 운반비': 'inboundFreightAmount',
	'매출 운반비': 'outboundFreightAmount',
	'재고 상태': 'stockStatus',
	'상시 판매 번호': 'orderNumber',
	'상시 판매가': 'salePrice',
	'상시 판매 상태': 'saleStatus',
	'상시 판매 주문일자': 'orderCreateDate',
	패키지명: 'packageName',
	'패키지 번호': 'packageNumber',
	'카스코 낙찰가': 'confirmPrice',
	'회차 여부': 'outCancelStatus',
	'회차 일자': 'outCancelDate',
	'고객사 반품일': 'hsReturnDate',
	'카스코 반품일': 'kaskoReturnDate',
	'판매 제외 사유': 'excludeSaleReason',
}
