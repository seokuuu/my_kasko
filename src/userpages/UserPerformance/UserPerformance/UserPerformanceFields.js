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

export const UserPerformanceFields = {
	순번: 'index',
	경매일자: 'auctionStartDate',
	경매번호: 'auctionNumber',
	'상시판매 번호': 'saleNumber',
	'상시판매 주문일자': 'saleOrderDate',
	패키지명: 'packageName',
	패키지번호: 'packageNumber',
	주문번호: 'orderNumber',
	'출고 일자': 'outDate',
	'출고 번호': 'outNumber',
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
	상시판매가: 'salePrice',
	제품등급: 'grade',
	'목적지 코드': 'destinationCode',
	'목적지 명': 'destinationName',
	'목적지 주소': 'customerDestinationAddress',
	'목적지 연락처(사무실)': 'customerDestinationPhone',
	'목적지담당자 연락처 (휴대폰)': 'customerDestinationManagerPhone',
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
}

export const UserPerformanceFieldsCols = [
	{ field: '', ...commonStyles, minWidth: 50, checkboxSelection, headerCheckboxSelection },
	...Object.keys(UserPerformanceFields).map((item) => {
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
