import Note from '../../pages/Shipping/Request/Note'
import BtnCellRenderer from '../../pages/Table/BtnCellRenderer'

const checkboxSelection = (params) => {
	return params.columnApi.getRowGroupColumns().length === 0
}

const headerCheckboxSelection = (params) => {
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
	운송사명: 'transportName',
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
	{ ...commonStyles, field: '운송사명', minWidth: 100 },
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
	순번: 'index',
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
	폭: 'width',
	길이: 'length',
	중량: 'weight',
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
	...Object.keys(ShippingRegisterFields).map((item) => {
		if (item === '비고') {
			return {
				field: '비고',
				...commonStyles,
				minWidth: 300,
				cellRenderer: Note,
			}
		}

		if (item === '순번') {
			return {
				...commonStyles,
				field: item,
				minWidth: 80,
			}
		}

		return {
			...commonStyles,
			field: item,
			minWidth: 200,
		}
	}),
]

// 배차/출고 등록 페이지 목록 필드
export const ShippingDispatchFields = {
	순번: 'index',
	출고요청일자: 'shipmentRequestDate',
	'제품추가 일자': 'outCreateDate',
	'승인 상태': 'outStatus',
	'상차도 여부': 'dockStatus',
	'배차 여부': 'driverStatus',
	'출하 상태': 'shipmentStatus',
	고객사명: 'customerName',
	고객코드: 'customerCode',
	창고: 'storageName',
	운전기사명: 'driverName',
	'운전기사 연락처': 'driverPhone',
	차량번호: 'carNumber',
	'차량 종류': 'carType',
	운송사명: 'transportName',
	'제품 수량': 'quantity',
	'중량 합계': 'totalWeight',
	'목적지 코드': 'destinationCode',
	'목적지 1/2/3': 'destinationName',
	'목적지 주소 1/2/3': 'customerDestinationAddress',
	'목적지 연락처(사무실) 1/2/3': 'customerDestinationPhone',
	'목적지담당자 연락처 (휴대폰) 1/2/3': 'customerDestinationManagerPhone',
	'하차지명 1/2/3': 'customerDestinationName',
	비고: 'outNote',
	'회차 여부': 'outCancelStatus',
	'회차 일자': 'outCancelDate', //(출고 취소된 일자)
	'출고 고유번호': 'outUid',
	최종수정자: 'updater',
	최종수정일시자: 'updateDate',
	// 출하지시일자: 'shippingDate',
	// '출고 번호': 'outNumber',
	// '출고 일자': 'outDate',
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
	{ ...commonStyles, field: '순번', minWidth: 80 },
	{ ...commonStyles, field: '출고요청일자', minWidth: 180 },
	{ ...commonStyles, field: '출하요청번호', minWidth: 180 }, // 누락 추가
	{ ...commonStyles, field: '제품추가 일자', minWidth: 180 },
	{ ...commonStyles, field: '승인 상태', minWidth: 100 },
	{ ...commonStyles, field: '출하 상태', minWidth: 100 },
	{ ...commonStyles, field: '출고 일자', minWidth: 100 }, // 누락 추가
	{ ...commonStyles, field: '출고 번호', minWidth: 100 }, // 누락 추가
	{ ...commonStyles, field: '배차 여부', minWidth: 100 },
	{ ...commonStyles, field: '상차도 여부', minWidth: 100 },
	{ ...commonStyles, field: '운송 진행', minWidth: 100 }, // 누락 추가
	{ ...commonStyles, field: '고객사명', minWidth: 150 },
	{ ...commonStyles, field: '고객코드', minWidth: 150 },
	{ ...commonStyles, field: '창고', minWidth: 100 },
	{ ...commonStyles, field: '운전기사명', minWidth: 100 },
	{ ...commonStyles, field: '운전기사 연락처', minWidth: 150 },
	{ ...commonStyles, field: '차량번호', minWidth: 100 },
	{ ...commonStyles, field: '차량 종류', minWidth: 100 },
	{ ...commonStyles, field: '운송사명', minWidth: 100 },
	{ ...commonStyles, field: '제품 수량', minWidth: 100 },
	{ ...commonStyles, field: '중량 합계', minWidth: 100 },
	{ ...commonStyles, field: '목적지 코드', minWidth: 100 },
	{ ...commonStyles, field: '목적지 1/2/3', minWidth: 250 },
	{ ...commonStyles, field: '목적지 주소 1/2/3', minWidth: 250 },
	{ ...commonStyles, field: '목적지 연락처(사무실) 1/2/3', minWidth: 180 },
	{ ...commonStyles, field: '목적지담당자 연락처 (휴대폰) 1/2/3', minWidth: 180 },
	{ ...commonStyles, field: '하차지명 1/2/3', minWidth: 180 },
	{ ...commonStyles, field: '비고', minWidth: 100, cellRenderer: Note },
	{ ...commonStyles, field: '회차 여부', minWidth: 100 },
	{ ...commonStyles, field: '회차 일자', minWidth: 180 },
	{ ...commonStyles, field: '최종수정자', minWidth: 100 },
	{ ...commonStyles, field: '최종수정일시', minWidth: 180 },
	{ ...commonStyles, field: '출고 고유번호', minWidth: 100 },
	// ...Object.keys(ShippingDispatchFields).map((item) => ({
	// 	...commonStyles,
	// 	field: item,
	// 	minWidth: 180,
	// })),
]

// 배차/출고 등록 상세페이지 목록
export const ShippingDispatchDetailsFields = {
	순번: 'index',
	경매번호: 'auctionNumber',
	'확정전송 일자': 'sendDate',
	주문번호: 'orderNumber',
	출하지시일자: 'shippingDate',
	출고요청일자: 'shipmentRequestDate',
	'출고 고유번호': 'outUid',
	'제품추가 일자': 'outCreateDate',
	'출하 상태': 'shipmentStatus',
	'출고 일자': 'outDate',
	'출고 번호': 'outNumber',
	'승인 상태': 'outStatus',
	'배차 여부': 'driverStatus',
	운전기사명: 'driverName',
	'운전기사 연락처': 'driverPhone',
	차량번호: 'carNumber',
	'차량 종류': 'carType',
	운송사명: 'transportName',
	고객사명: 'customerName',
	고객코드: 'customerCode',
	제품번호: 'productNumber',
	창고: 'storageName',
	'판매 구분': 'saleCategory',
	'판매 유형': 'saleType',
	제품군: 'spart',
	'목적지 코드': 'destinationCode',
	'목적지 명': 'destinationName',
	'목적지 주소': 'customerDestinationAddress',
	'목적지 연락처(사무실)': 'customerDestinationPhone',
	'목적지담당자 연락처 (휴대폰)': 'customerDestinationManagerPhone',
	하차지명: 'customerDestinationName',
	'제품 등급': 'grade',
	두께: 'thickness',
	폭: 'width',
	길이: 'length',
	중량: 'weight',
	규격약호: 'spec',
	'제품 비고': 'productNote',
	'주문 고유 번호': 'orderUid',
	'회차 여부': 'outCancelStatus',
	'회차 일자': 'outCancelDate', //(출고 취소된 일자)
	최종수정자: 'updater',
	최종수정일시자: 'updateDate',

	// 경매일자: 'auctionStartDate',
	// 비고: 'outNote',
	// '제품 수량': 'quantity',
	// '제품 총 중량': 'totalWeight',
}

// 배차/출고 등록 페이지 상세 필드
export const ShippingDispatchDetailsFieldsCols = [
	{ ...commonStyles, field: '', minWidth: 50, checkboxSelection, headerCheckboxSelection },
	...Object.keys(ShippingDispatchDetailsFields).map((item) => ({
		...commonStyles,
		field: item,
		minWidth: 180,
	})),
]

// 출고현황 목록
export const ShippingStatusFields = {
	순번: 'index',
	경매번호: 'auctionNumber',
	'확정전송 일자': 'sendDate',
	// '주문 고유 번호': 'orderUid',
	주문번호: 'orderNumber',
	출하지시일자: 'shippingDate',
	출고요청일자: 'shipmentRequestDate',
	'출하 상태': 'shipmentStatus',
	'출고 고유번호': 'outUid',
	'출고 일자': 'outDate',
	'출고 번호': 'outNumber',
	'상차도 여부': 'dockStatus',
	운송진행일자: 'outEndDate',
	운송진행: 'outEndStatus',
	고객사명: 'customerName',
	고객코드: 'customerCode',
	창고: 'storageName',
	'배차 여부': 'driverStatus',
	운전기사명: 'driverName',
	'운전기사 연락처': 'driverPhone',
	차량번호: 'carNumber',
	'차량 종류': 'carType',
	운송사명: 'transportName',
	'제품 수량': 'quantity',
	'중량 합계': 'totalWeight',
	'목적지 코드': 'destinationCode',
	'목적지 명': 'destinationName',
	'목적지 주소': 'customerDestinationAddress',
	'목적지 연락처(사무실)': 'customerDestinationPhone',
	'목적지담당자 연락처 (휴대폰)': 'customerDestinationManagerPhone',
	하차지명: 'customerDestinationName',
	비고: 'productNote',
	'회차 여부': 'outCancelStatus',
	'회차 일자': 'outCancelDate', //(출고 취소된 일자)
	최종수정자: 'updater',
	최종수정일시자: 'updateDate',
}

export const ShippingStatusFieldsCols = [
	{ ...commonStyles, field: '', minWidth: 50, checkboxSelection, headerCheckboxSelection },
	{ ...commonStyles, field: '순번', minWidth: 80 },
	...Object.keys(ShippingStatusFields)
		.slice(1)
		.map((item) => {
			if (item === '비고') {
				return {
					...commonStyles,
					field: '비고',
					minWidth: 300,
					cellRenderer: Note,
				}
			}
			return {
				...commonStyles,
				field: item,
				minWidth: 180,
			}
		}),
]

// 출고현황 목록
export const ShippingStatusDetailsFields = {
	순번: 'index',
	경매번호: 'auctionNumber',
	'확정전송 일자': 'sendDate',
	주문번호: 'orderNumber',
	출하지시일자: 'shippingDate',
	출고요청일자: 'shipmentRequestDate',
	'출하 상태': 'shipmentStatus',
	'출고 고유번호': 'outUid',
	'출고 일자': 'outDate',
	'출고 번호': 'outNumber',
	운송진행일자: 'outEndDate',
	운송진행: 'outEndStatus',
	고객사명: 'customerName',
	고객코드: 'customerCode',
	운전기사명: 'driverName',
	'운전기사 연락처': 'driverPhone',
	차량번호: 'carNumber',
	'차량 종류': 'carType',
	운송사명: 'transportName',
	제품번호: 'productNumber',
	창고: 'storageName',
	'판매 구분': 'saleCategory',
	'판매 유형': 'saleType',
	제품군: 'spart',
	'목적지 코드': 'destinationCode',
	'목적지 명': 'destinationName',
	'목적지 주소': 'customerDestinationAddress',
	'목적지 연락처(사무실)': 'customerDestinationPhone',
	'목적지담당자 연락처 (휴대폰)': 'customerDestinationManagerPhone',
	하차지명: 'customerDestinationName',
	'제품 등급': 'grade',
	두께: 'thickness',
	폭: 'width',
	길이: 'length',
	중량: 'weight',
	규격약호: 'spec',
	비고: 'productNote',
	'클레임 진행상태': 'claimStatus',
	'회차 여부': 'outCancelStatus',
	'회차 일자': 'outCancelDate', //(출고 취소된 일자)
	최종수정자: 'updater',
	최종수정일시자: 'updateDate',
}

export const ShippingStatusDetailsFieldsCols = [
	{ ...commonStyles, field: '', minWidth: 50, checkboxSelection, headerCheckboxSelection },
	{ ...commonStyles, field: '순번', minWidth: 80 },
	...Object.keys(ShippingStatusDetailsFields)
		.slice(1)
		.map((item) => ({
			...commonStyles,
			field: item,
			minWidth: 180,
		})),
]

// 출고 거래명세서
export const ShippingInvoiceFields = {
	출고번호: 'outNumber',
	주문번호: 'orderNumber',
	고객사명: 'customerName',
	고객사코드: 'customerCode',
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
