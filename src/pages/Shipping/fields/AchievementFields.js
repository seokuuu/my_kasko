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
	const role = auth?.role
	return role === '카스코철강'
		? {
				순번: 'index',
				경매일자: 'auctionStartDate',
				경매번호: 'auctionNumber',
				입고일자: 'receiptDate',
				매입처: 'supplier',
				제조사: 'maker',
				'확정전송 일자': 'sendDate',
				'주문 고유 번호': 'orderUid',
				주문번호: 'orderNumber',
				출하지시일자: 'shippingDate',
				출고요청일자: 'shipmentRequestDate',
				'출하 상태': 'shipmentStatus',
				'출고 일자': 'outDate',
				'출고 번호': 'outNumber',
				운송진행일자: 'outEndDate',
				운송진행: 'outEndStatus',
				고객사명: 'customerName',
				고객코드: 'customerCode',
				'제품 고유 번호': 'productUid',
				제품번호: 'productNumber',
				창고: 'storageName',
				운전기사명: 'driverName',
				'운전기사 연락처': 'driverPhone',
				차량번호: 'carNumber',
				'차량 종류': 'carType',
				'판매 구분': 'saleCategory',
				'판매 유형': 'saleType',
				'판매가 유형': 'salePriceType',
				제품군: 'spart',
				매입가: 'price',
				'목적지 코드': 'destinationCode',
				'목적지 명': 'destinationName',
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
				'현대제철 반품일자': 'hsReturnDate',
				'카스코 반품일자': 'kaskoReturnDate',
				최종수정자: 'updateMemberName',
				최종수정일시: 'updateDate',
		  }
		: {
				순번: 'index',
				경매일자: 'auctionStartDate',
				경매번호: 'auctionNumber',
				입고일자: 'receiptDate',
				매입처: 'supplier',
				제조사: 'maker',
				'확정전송 일자': 'sendDate',
				'주문 고유 번호': 'orderUid',
				주문번호: 'orderNumber',
				출하지시일자: 'shippingDate',
				출고요청일자: 'shipmentRequestDate',
				'출하 상태': 'shipmentStatus',
				'출고 일자': 'outDate',
				'출고 번호': 'outNumber',
				운송진행일자: 'outEndDate',
				운송진행: 'outEndStatus',
				고객사명: 'customerName',
				고객코드: 'customerCode',
				'제품 고유 번호': 'productUid',
				제품번호: 'productNumber',
				창고: 'storageName',
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
				'현대제철 반품일자': 'hsReturnDate',
				'카스코 반품일자': 'kaskoReturnDate',
				최종수정자: 'updateMemberName',
				최종수정일시: 'updateDate',
		  }
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
