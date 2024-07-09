const commonStyles = {
	headerClass: 'custom-header-style',
	flex: 1,
	cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
}

const checkboxSelection = function (params) {
	// we put checkbox on the name if we are not doing grouping
	return params.columnApi.getRowGroupColumns().length === 0
}

const headerCheckboxSelection = function (params) {
	// we put checkbox on the name if we are not doing grouping
	return params.columnApi.getRowGroupColumns().length === 0
}

export const AchievementFields = (auth) => {
	return auth?.role === '카스코철강'
		? {
				순번: 'index',
				출고요청일자: 'shipmentRequestDate',
				'출고 번호': 'outNumber',
				'출하 상태': 'shipmentStatus',
				'출고 일자': 'outDate',
				출고완료일시: 'outEndDate',
				출고완료처리자: 'outEndMemberName',
				출고번호: 'outNumber',
				운송진행: 'outEndStatus',
				고객사명: 'customerName',
				고객코드: 'customerCode',
				창고: 'storageName',
				제품수량: 'productCount',
				'제품 총중량': 'totalWeight',
				상차도여부: 'dockStatus',
				합짐여부: 'combineStatus',
				운송사명: 'transportName',
				운전기사명: 'driverName',
				'운전기사 연락처': 'driverPhone',
				차량번호: 'carNumber',
				'차량 종류': 'carType',
				'판매 구분': 'saleCategory',
				'판매 유형': 'saleType',
				'판매가 유형': 'salePriceType',
				제품군: 'spart',
				'목적지 코드': 'destinationCode',
				'목적지 명': 'destinationName',
				'목적지 주소': 'customerDestinationAddress',
				'목적지 연락처(사무실)': 'customerDestinationPhone',
				'목적지담당자 연락처 (휴대폰)': 'customerDestinationManagerPhone',
				하차지명: 'customerDestinationName',
				메모: 'productMemo',
				'제품 낙찰 단가(원/톤)': 'productBiddingPrice',
				'낙찰 총 단가(원/톤)': 'totalBiddingPrice',
				'제품 공급가(원/톤)': 'orderPrice',
				'제품 부가세(원/톤)': 'orderPriceVat',
				'제품 금액 (VAT 포함)': 'totalOrderPrice',
				'기본 운임 단가(원/톤)': 'freightFee',
				'할증 운임 단가(원/톤)': 'extraUnitPrice',
				'운임 총단가': 'totalFreightCost',
				'운반비 공급가(원/톤)': 'freightCost',
				'운반비 부가세(원/톤)': 'freightCostVat',
				'운반비 금액 (VAT 포함)': 'totalFreightCost',
				추가타입: 'extraType', // 신규 추가
				추가비: 'extraCost', // 신규 추가
				공차비: 'extraFreightCost', // 신규 추가
				'총 공급가(원/톤)': 'totalSupplyPrice',
				'총 부가세(원/톤)': 'totalVat',
				'합계 금액(원/톤)': 'totalPrice',
				비고: 'productNote',
				'매입 기본운임단가(원/톤)': 'inboundFreightFee',
				'매입 할증운임단가(원/톤)': 'inboundExtraUnitPrice',
				'매입 운임총단가': 'inboundFreightCost',
				'매입 운반비공급가(원/톤)': 'inboundFreightTotalCost',
				'매입 운반비부가세(원/톤)': 'inboundFreightCostVat',
				'매입 운반비금액 (VAT포함)': 'totalInboundFreightTotalCost',
				'매입 운반비': 'inboundFreightAmount',
				'매출 운반비': 'outboundFreightAmount',
				재고상태: 'stockStatus',
				'상시판매 번호': 'saleNumber',
				상시판매가: 'salePrice',
				'상시판매 주문일자': 'saleOrderDate',
				패키지명: 'packageName',
				패키지번호: 'packageNumber',
				'카스코 낙찰가': 'confirmPrice',
				'회차 여부': 'outCancelStatus',
				'회차 일자': 'outCancelDate', //(출고 취소된 일자)
				'고객사 반품일자': 'customerReturnDate',
				'카스코 반품일자': 'kaskoReturnDate',
				최종수정자: 'updateMemberName',
				최종수정일시: 'updateDate',

				// 출고요청일자
				// 출하요청번호
				// 출하상태
				// 출고일자
				// 출고완료일시
				// 출고완료처리자
				// 출고
				// 출하지시일자: 'shippingDate',
				// 경매일자: 'auctionStartDate',
				// 경매번호: 'auctionNumber',
				// 입고일자: 'receiptDate',
				// 매입처: 'supplier',
				// 제조사: 'maker',
				// '확정전송 일자': 'sendDate',
				// '주문 고유 번호': 'orderUid',
				// 주문번호: 'orderNumber',
				// '상차도 여부': 'dockStatus',
				// 운송진행일자: 'outEndDate',
				// 운송진행: 'outEndStatus',
				// 운송완료처리자: 'outEndMemberName',
				// '추가 타입': 'extraType',
				// 추가비: 'extraCost',
				// 공차비: 'extraFreightCost',
				// 고객사명: 'customerName',
				// 고객코드: 'customerCode',
				// '제품 고유 번호': 'productUid',
				// 제품번호: 'productNumber',
				// 창고: 'storageName',
				// '상차도 구분': 'dockStatus',

				// 매입가: 'price',

				// '고객사 목적지 고유 번호': 'customerDestinationUid',

				// 제품등급: 'grade',
				// 정척여부: 'preferThickness',
				// 유찰횟수: 'failCount',
				// 두께: 'thickness',
				// 폭: 'width',
				// 길이: 'length',
				// 중량: 'weight',
				// 규격약호: 'spec',
				// TS: 'ts',
				// YP: 'yp',
				// 'C%': 'c',
				// EL: 'el',
				// SI: 'si',
				// MN: 'mn',
				// P: 'p',
				// S: 's',
				// 여재원인: 'causeCode',
				// 여제원인명1: 'causeCodeName',
				// 용도코드: 'usageCode',
				// 용도명: 'usageCodeName',

				// '총 공급가(원/톤)': 'totalSupplyPrice',
				// '총 부가세(원/톤)': 'totalVat',
				// '합계 금액(원/톤)': 'totalPrice',
				// 비고: 'productNote',

				// '클레임 여부': 'isClaim',
				// '클레임 상태': 'claimStatus',
				// '현대제철 반품일자': 'hsReturnDate',
		  }
		: {
				순번: 'index',
				'출고 번호': 'outNumber',
				'출하 상태': 'shipmentStatus',
				출하지시일자: 'shippingDate',
				출고요청일자: 'shipmentRequestDate',
				'출고 일자': 'outDate',
				경매일자: 'auctionStartDate',
				경매번호: 'auctionNumber',
				입고일자: 'receiptDate',
				매입처: 'supplier',
				제조사: 'maker',
				'확정전송 일자': 'sendDate',
				'주문 고유 번호': 'orderUid',
				주문번호: 'orderNumber',
				'상차도 여부': 'dockStatus',
				운송진행일자: 'outEndDate',
				운송진행: 'outEndStatus',
				운송완료처리자: 'outEndMemberName',
				고객사명: 'customerName',
				고객코드: 'customerCode',
				'제품 고유 번호': 'productUid',
				제품번호: 'productNumber',
				창고: 'storageName',
				'상차도 구분': 'dockStatus',
				운전기사명: 'driverName',
				'운전기사 연락처': 'driverPhone',
				차량번호: 'carNumber',
				'차량 종류': 'carType',
				운송사명: 'transportName',
				'판매 구분': 'saleCategory',
				'판매 유형': 'saleType',
				'판매가 유형': 'salePriceType',
				제품군: 'spart',
				'목적지 코드': 'destinationCode',
				'목적지 명': 'destinationName',
				'고객사 목적지 고유 번호': 'customerDestinationUid',
				'목적지 주소': 'customerDestinationAddress',
				'목적지 연락처(사무실)': 'customerDestinationPhone',
				'목적지담당자 연락처 (휴대폰)': 'customerDestinationManagerPhone',
				하차지명: 'customerDestinationName',
				제품등급: 'grade',
				정척여부: 'preferThickness',
				유찰횟수: 'failCount',
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
				여재원인: 'causeCode',
				여제원인명1: 'causeCodeName',
				용도코드: 'usageCode',
				용도명: 'usageCodeName',
				메모: 'productMemo',
				비고: 'productNote',
				재고상태: 'stockStatus',
				'상시판매 번호': 'saleNumber',
				'상시판매 주문일자': 'saleOrderDate',
				패키지명: 'packageName',
				패키지번호: 'packageNumber',
				'회차 여부': 'outCancelStatus',
				'회차 일자': 'outCancelDate', //(출고 취소된 일자)
				'클레임 여부': 'isClaim',
				'클레임 상태': 'claimStatus',
				'현대제철 반품일자': 'hsReturnDate',
				'카스코 반품일자': 'kaskoReturnDate',
				최종수정자: 'updateMemberName',
				최종수정일시: 'updateDate',
		  }
}

export const AcivementDetailFields = {
	순번: 'index',
	경매일자: 'auctionStartDate',
	경매번호: 'auctionNumber',
	등록일자: 'registerDate',
	입고일자: 'receiptDate',
	매입처: 'supplier',
	제조사: 'maker',
	주문상태: 'status',
	확정전송일자: 'sendDate',
	주문번호: 'orderNumber',
	출하지시일자: 'shippingDate', // 변경 예정으로 쓰여있음.
	출고요청일자: 'shipmentRequestDate',
	'출하요청 번호': 'shipmentRequestNumber',
	'출하 상태': 'shipmentStatus',
	출고일자: 'outDate',
	출고완료일시: 'outEndDate',
	출고완료처리자: 'outEndMemberName',
	출고번호: 'outNumber',
	운송진행: 'outEndStatus',
	고객사명: 'customerName',
	고객코드: 'customerCode',
	제품번호: 'productNumber',
	창고: 'storageName',
	제품수량: 'productCount',
	'제품 총중량': 'totalWeight',
	상차도여부: 'dockStatus',
	합짐여부: 'combineStatus',
	운송사명: 'transportName',
	운전기사명: 'driverName',
	운전기사연락처: 'driverPhone',
	차량번호: 'carNumber',
	차량종류: 'carType',
	판매구분: 'saleCategory',
	판매유형: 'saleType',
	판매가유형: 'salePriceType',
	제품군: 'spart',
	매입가: 'price',
	목적지코드: 'destinationCode',
	목적지명: 'destinationName',
	목적지주소: 'customerDestinationAddress',
	목적지연락처: 'customerDestinationPhone',
	목적지담당자연락처: 'customerDestinationManagerPhone',
	하차지명: 'customerDestinationName',
	제품등급: 'grade',
	정척여부: 'preferThickness',
	유찰횟수: 'failCount',
	두께: 'thickness',
	폭: 'width',
	길이: 'length',
	중량: 'weight',
	규격약호: 'spec',
	TS: 'ts',
	YP: 'yp',
	C: 'c',
	EL: 'el',
	SI: 'si',
	MN: 'mn',
	P: 'p',
	S: 's',
	여재원인: 'causeCode',
	여재원인명: 'causeCodeName',
	용도코드: 'usageCode',
	용도명: 'usageCodeName',
	메모: 'productMemo',
	'제품 낙찰 단가(원/톤)': 'productBiddingPrice',
	'낙찰 총 단가(원/톤)': 'totalBiddingPrice',
	'제품 공급가(원/톤)': 'orderPrice',
	'제품 부가세': 'orderPriceVat',
	'제품 금액': 'totalOrderPrice',
	'기본 운임 단가(원/톤)': 'freightFee',
	'할증 운임 단가(원/톤)': 'extraUnitPrice',
	'매출 할증율': 'extraRate',
	'운임 총 단가(원/톤)': 'totalFreightCost',
	'운반비 공급가(원/톤)': 'freightCost',
	'운반비 부가세(원/톤)': 'freightCostVat',
	'운반비 금액(VAT 포함)': 'totalFreightCost',
	'추가 타입': 'extraType',
	추가비: 'extraCost',
	공차비: 'extraFreightCost',
	'총 공급가(원/톤)': 'totalSupplyPrice',
	'총 부가세(원/톤)': 'totalVat',
	'합계 금액(원/톤)': 'totalPrice',
	비고: 'productNote',
	'매입 기본 운임 단가(원/톤)': 'inboundFreightFee',
	'매입 할증 운임 단가(원/톤)': 'inboundExtraUnitPrice',
	'매입 할중율': 'inboundExtraRate',
	'매입 운임 총 단가(원/톤)': 'inboundFreightCost',
	'매입 운반비 공급가(원/톤)': 'inboundFreightAmount',
	'매입 운반비 부가세(원/톤)': 'inboundFreightCostVat',
	'매입 운반비 금액(VAT포함)': 'totalInboundFreightTotalCost',
	'매입 운반비': 'inboundFreightAmount',
	'매출 운반비': 'outboundFreightAmount',
	재고상태: 'stockStatus',
	'상시판매 번호': 'saleNumber',
	상시판매가: 'salePrice',
	'상시판매 주문일자': 'saleOrderDate',
	패키지명: 'packageName',
	패키지번호: 'packageNumber',
	'카스코 낙찰가': 'confirmPrice',
	'회차 여부': 'outCancelStatus',
	'회차 일자': 'outCancelDate',
	'고객사 반품일자': 'customerReturnDate',
	'카스코 반품 일자': 'kaskoReturnDate',
	최종수정자: 'updateMemberName',
	최종수정일시: 'updateDate',
}

export const AchievementFieldsCols = (fields) => [
	{ field: '', ...commonStyles, minWidth: 50, checkboxSelection, headerCheckboxSelection },
	...Object.keys(fields).map((item) => {
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

export const AchievementDetailFieldsCols = (fields) => [
	{ field: '', ...commonStyles, minWidth: 50, checkboxSelection, headerCheckboxSelection },
	...Object.keys(fields).map((item) => {
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
