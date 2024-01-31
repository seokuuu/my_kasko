import Note from '../../pages/Shipping/Request/Note'
import BtnCellRenderer from '../../pages/Table/BtnCellRenderer'

var checkboxSelection = function (params) {
	// we put checkbox on the name if we are not doing grouping
	return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
	// we put checkbox on the name if we are not doing grouping
	return params.columnApi.getRowGroupColumns().length === 0
}

export const commonStyles = {
	headerClass: 'custom-header-style',
	flex: 1,
	cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
}

export const DispatchFields = {
	'고유 번호': 'uid',
	이름: 'name',
	'차량 번호': 'carNumber',
	연락처: 'phone',
	'차량 종류': 'carType',
	비고: 'memo',
}

export const DispatchFieldsCols = [
	{ ...commonStyles, field: '', maxWidth: 50, checkboxSelection, headerCheckboxSelection },
	{
		...commonStyles,
		field: '수정',
		maxWidth: 90,
		cellRenderer: BtnCellRenderer,
		cellRendererParams: {
			uidFieldName: '고유 번호', // 해당 get의 uid (필수수)
			editType: 'dispatch', // modal의 띄울 종류 (선택)
		},
	},
	{
		...commonStyles,
		field: '고유 번호',
		minWidth: 100,
	},
	{ ...commonStyles, field: '이름', minWidth: 100 },
	{ ...commonStyles, field: '차량 번호', minWidth: 100 },
	{ ...commonStyles, field: '연락처', minWidth: 100 },
	{ ...commonStyles, field: '차량 종류', minWidth: 100 },
	{ ...commonStyles, field: '비고', minWidth: 100 },
]

/**
 * 출하 지시 항목 필드
 */
export const ShippingRegisterFields = {
	'주문 고유 번호': 'orderUid',
	경매번호: 'auctionNumber',
	'상시판매 번호': 'orderNumber',
	'상시판매 주문일자': 'createDate',
	패키지명: 'packageName',
	패키지번호: 'packageNumber',
	'등록 일자': 'createDate',
	경매일자: 'auctionStartDate',
	입고일자: 'receiptDate',
	주문상태: 'orderStatus',
	'확정전송 일자': 'sendDate',
	주문번호: 'orderNumber',
	출하지시일자: 'shippingDate',
	'출하 상태': 'shipmentStatus',
	고객사명: 'customerName',
	고객코드: 'customerCode',
	'제품 고유 번호': 'productUid',
	제품번호: 'productNumber',
	창고: 'storageName',
	'판매 구분': 'saleCategory',
	'판매 유형': 'saleType',
	'판매가 유형': 'salePriceType',
	제품군: 'spart',
	제품등급: 'grade',
	상시판매가: 'salePrice',
	'제품 낙찰 단가(원/톤)': 'productBiddingPrice',
	'낙찰 총 단가(원/톤)': 'totalBiddingPrice',
	'제품 공급가(원/톤)': 'orderPrice',
	'제품 부가세(원/톤)': 'orderPriceVat',
	'제품 금액 (VAT 포함)': 'totalOrderPrice',
	'기본 운임 단가(원/톤)': 'freightFee',
	'할증 운임 단가(원/톤)': 'extraUnitPrice',
	'운임 총단가': 'totalFreightPrice',
	'운반비 공급가(원/톤)': 'freightCost',
	'운반비 부가세(원/톤)': 'freightCostVat',
	'운반비 금액 (VAT 포함)': 'totalFreightCost',
	'총 공급가(원/톤)': 'totalSupplyPrice',
	'총 부가세(원/톤)': 'totalVat',
	'합계 금액(원/톤)': 'totalPrice',
	'목적지 코드': 'destinationCode',
	'목적지 명': 'destinationName',
	'목적지 주소': 'customerDestinationAddress',
	'목적지 연락처(사무실)': 'customerDestinationPhone',
	'목적지담당자 연락처 (휴대폰)': 'customerDestinationManagerPhone',
	하차지명: 'customerDestinationName',
	'매입 기본 운임 단가(원/톤)': 'inboundFreightFee',
	'매입 할증 운임 단가(원/톤)': 'inboundExtraUnitPrice',
	'매입 운임 총 단가': 'inboundFreightCost',
	'매입 운반비 공급가(원/톤)': 'inboundFreightTotalCost',
	'매입 운반비 부가세(원/톤)': 'inboundFreightCostVat',
	'매입 운반비 금액 (VAT포함)': '',
	'매입 운반비': 'inboundFreightAmount',
	'매출 운반비': 'outboundFreightAmount',
	두께: 'thickness',
	폭: 'weight',
	길이: 'length',
	중량: 'width',
	규격약호: 'spec',
	TS: 'ts',
	YP: 'yp',
	'C%': 'c',
	EL: 'el',
	SI: 'si',
	MN: 'mn',
	P: 'p',
	S: 's',
	여제원인명1: 'causeCodeName',
	용도명: 'usageCodeName',
	메모: 'productMemo',
	비고: 'productNote',
	재고상태: 'stockStatus',
	최종수정자: 'updateMemberName',
	최종수정일시: 'updateDate',

	'제품추가 일자': 'productOutCreateDate',
	'합짐 여부': 'productOutStatus',
	'배차 여부': 'driverStatus',
	'제품 수량': 'productQuantity',
	'제품 총 중량': 'productTotalWeight',
	운전기사명: 'driverName',
	'운전기사 연락처': 'driverPhone',
	차량번호: 'carNumber',
	'차량 종류': 'carType',
	'추가 타입': 'extraType',
	추가비: 'extraCost',
	공차비: 'extraFreightCost',
	출고번호: 'outNumber',
}

export const ShippingRegisterFieldsCols = [
	{ field: '', ...commonStyles, minWidth: 50, checkboxSelection, headerCheckboxSelection },
	...Object.keys(ShippingRegisterFields).map((item) =>
		item !== '비고'
			? {
					...commonStyles,
					field: item,
					minWidth: 200,
			  }
			: {
					field: '비고',
					...commonStyles,
					minWidth: 300,
					cellRenderer: Note,
			  },
	),
]

// 배차/출고 등록 페이지 목록 필드
export const ShippingDispatchFields = {
	'출고 고유번호': 'outUid',
	출고요청일자: 'shipmentRequestDate',
	// 출하지시일자: 'shippingDate',
	// '출고 번호': 'outNumber',
	// '출고 일자': 'outDate',
	'제품추가 일자': 'outCreateDate',
	'합짐 승인 상태': 'outStatus',
	'출하 상태': 'shipmentStatus',
	'배차 여부': 'driverStatus',
	'고객사명 1/2/3': 'customerName',
	'고객코드 1/2/3': 'customerCode',
	창고: 'storageName',
	운전기사명: 'driverName',
	'운전기사 연락처': 'driverPhone',
	차량번호: 'carNumber',
	'차량 종류': 'carType',
	'제품 수량': 'quantity',
	'제품 총 중량': 'totalWeight',
	'목적지 코드': 'destinationCode',
	'목적지 1/2/3': 'destinationName',
	'목적지 주소 1/2/3': 'customerDestinationAddress',
	'목적지 연락처(사무실) 1/2/3': 'customerDestinationPhone',
	'목적지담당자 연락처 (휴대폰) 1/2/3': 'customerDestinationManagerPhone',
	'하차지명 1/2/3': 'customerDestinationName',
	비고: 'outNote',
	'회차 여부': 'outCancelStatus',
	'회차 일자 (출고 취소된 일자)': 'outCancelDate',
	최종수정자: 'updater',
	최종수정일시자: 'updateDate',
	// 경매번호: 'auctionNumber',
	// 경매일자: 'auctionStartDate',
	// '주문 고유 번호': 'orderUid',
	// 주문번호: 'orderNumber',
	// '상시판매 번호': 'orderNumber',
	// '확정전송 일자': 'sendDate',
}

// 배차/출고 등록 페이지 목록 필드
export const ShippingDispatchFieldsCols = [
	{ ...commonStyles, field: '', minWidth: 50, checkboxSelection, headerCheckboxSelection },
	...Object.keys(ShippingDispatchFields).map((item) => ({
		...commonStyles,
		field: item,
		minWidth: 180,
	})),
]

// 배차/출고 등록 상세페이지 목록
export const ShippingDispatchDetailsFields = {
	경매번호: 'auctionNumber',
	경매일자: 'auctionStartDate',
	'주문 고유 번호': 'orderUid',
	'주문번호 & 상시판매 번호': 'orderNumber',
	'확정전송 일자': 'sendDate',
	출하지시일자: 'shippingDate',
	출고요청일자: 'shipmentRequestDate',
	'출하 상태': 'shipmentStatus',
	'출고 고유번호': 'outUid',
	'출고 번호': 'outNumber',
	'출고 일자': 'outDate',
	'제품추가 일자': 'outCreateDate',
	'합짐 승인 상태': 'outStatus',
	비고: 'outNote',
	'회차 여부': 'outCancelStatus',
	'회차 일자 (출고 취소된 일자)': 'outCancelDate',
	'배차 여부': 'driverStatus',
	'제품 수량': 'quantity',
	'제품 총 중량': 'totalWeight',
	최종수정자: 'updater',
	최종수정일시자: 'updateDate',
	제품번호: 'productNumber',
	창고: 'storageName',
	'판매 구분 (판매재 / 판매 제외재 / 판매 완료재)': 'saleCategory',
	'판매 유형 (경매 대상재 / 상시 판매 대상재)': 'saleType',
	제품군: 'spart',
	'제품 등급 (1 / 2 / 3 / 4/ 5)': 'grade',
	두께: 'thickness',
	폭: 'width',
	길이: 'length',
	중량: 'weight',
	규격약호: 'spec',
	'제품 비고': 'productNote',
	고객사명: 'customerName',
	고객코드: 'customerCode',
	'목적지 코드': 'destinationCode',
	'목적지 명': 'destinationName',
	'목적지 주소': 'customerDestinationAddress',
	'목적지 연락처(사무실)': 'customerDestinationPhone',
	'목적지담당자 연락처 (휴대폰)': 'customerDestinationManagerPhone',
	하차지명: 'customerDestinationName',
	운전기사명: 'driverName',
	'운전기사 연락처': 'driverPhone',
	차량번호: 'carNumber',
	'차량 종류': 'carType',
}

// 배차/출고 등록 페이지 상세 필드
export const ShippingDispatchDetailsFieldsCols = [
	{ ...commonStyles, field: '', minWidth: 50, checkboxSelection, headerCheckboxSelection },
	...Object.keys(ShippingDispatchDetailsFields).map((item) => ({
		...commonStyles,
		field: item,
		minWidth: 200,
	})),
]

// 출고 거래명세서
export const ShippingInvoiceFields = {
	경매번호: 'auctionNumber',
	상시판매번호: 'orderNumber',
	창고: 'storageName',
	제품번호: 'productNumber',
	등급: 'grade',
	중량: 'weight',
	두께: 'thickness',
	폭: 'width',
	길이: 'length',
	규격약호: 'spec',
	낙찰가: 'biddingPrice',
	제품공급가: 'orderPrice',
	제품부가세: 'orderPriceVat',
	운임비공급가: 'freightCost',
	운임비부가세: 'freightCostVat',
}

// 출고 거래명세서
export const ShippingInvoiceFieldsCols = [
	...Object.keys(ShippingInvoiceFields).map((item) => ({
		...commonStyles,
		field: item,
		minWidth: 120,
	})),
]
