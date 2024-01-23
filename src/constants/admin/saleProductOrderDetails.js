// 상시 판매 관리 > 주문 확인 상세

var checkboxSelection = function (params) {
	// we put checkbox on the name if we are not doing grouping
	return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
	// we put checkbox on the name if we are not doing grouping
	return params.columnApi.getRowGroupColumns().length === 0
}

export const saleProductOrderDetailsCols = [
	{
		field: '',
		maxWidth: 50,
		checkboxSelection: checkboxSelection,
		headerCheckboxSelection: headerCheckboxSelection,
		cellStyle: { textAlign: 'center' },
	},
	{ field: '순번', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '경매번호', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '상시판매 번호', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '상시판매 주문일자', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '고객사명', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '고객코드', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '제품번호', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '프로넘 (ProNo.)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '창고', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '상시판매 상태', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '상시판매가', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '승인상태', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '목적지 코드', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '목적지 명', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '목적지 주소', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '목적지 연락처(사무실)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '목적지담당자 연락처 (휴대폰)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '하차지명', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '변경요청 목적지명', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '변경요청 목적지 주소', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '변경요청 목적지 연락처', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '판매구분', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '판매유형', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '판매가유형', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '제품군', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '제품등급', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '정척여부', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '유찰횟수', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '제품 낙찰단가(원/톤)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '낙찰총단가(원/톤)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '제품공급가(원/톤)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '제품부가세(원/톤)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '제품금액 (VAT포함)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '기본 운임단가(원/톤)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '할증 운임단가(원/톤)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '운임 총단가 운반비공급가(원/톤)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '운반비부가세(원/톤)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '운반비 금액 (VAT포함)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '총공급가(원/톤)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '총부가세(원/톤)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '합계금액(원/톤)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '두께', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '폭', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '길이', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '중량', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '규격약호', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: 'TS', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: 'YP', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: 'C%', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: 'EL', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: 'SI', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: 'MN', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: 'P', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: 'S', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '여재원인', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '여제원인명1', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '용도코드', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '용도명', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '메모', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '주문상태', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '확정전송 일자', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '주문번호', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '비고', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '매입 기본운임단가(원/톤)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '매입 할증운임단가(원/톤)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '매입 운임총단가', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '매입 운반비공급가(원/톤)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '매입 운반비부가세(원/톤)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '매입 운반비 금액 (VAT포함)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '매입운반비', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '매출운반비', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '재고상태', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '카스코 낙찰가', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '최종수정자', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '최종수정일시', minWidth: 100, cellStyle: { textAlign: 'center' } },
]

export const saleProductOrderDetailsTableRowMap = {
	순번: '', // Not directly available in the response
	경매번호: 'auctionNumber', // Maps to auctionNumber
	'상시판매 번호': '', // Not directly available in the response
	'상시판매 주문일자': '', // Not directly available in the response
	고객사명: 'customerName', // Maps to customerName
	고객코드: 'customerCode', // Maps to customerCode
	제품번호: 'productNumber', // Maps to productNumber
	'프로넘 (ProNo.)': 'productProNumber', // Maps to productProNumber, if null, field might be absent
	창고: 'storageName', // Maps to storageName
	'상시판매 상태': 'saleStatus', // Maps to saleStatus
	상시판매가: 'salePrice', // Maps to salePrice
	승인상태: 'approvalStatus', // Maps to approvalStatus
	'목적지 코드': 'destinationCode', // Maps to destinationCode
	'목적지 명': 'destinationName', // Maps to destinationName
	'목적지 주소': 'customerDestinationAddress', // Maps to customerDestinationAddress
	'목적지 연락처(사무실)': 'customerDestinationPhone', // Maps to customerDestinationPhone
	'목적지담당자 연락처 (휴대폰)': 'customerDestinationManagerPhone', // Maps to customerDestinationManagerPhone
	하차지명: '', // Not directly available in the response
	'변경요청 목적지명': 'requestDestinationName', // Maps to requestDestinationName
	'변경요청 목적지 주소': 'requestCustomerDestinationAddress', // Maps to requestCustomerDestinationAddress
	'변경요청 목적지 연락처': 'requestCustomerDestinationPhone', // Maps to requestCustomerDestinationPhone
	판매구분: 'saleCategory', // Maps to saleCategory
	판매유형: 'saleType', // Maps to saleType
	판매가유형: 'salePriceType', // Maps to salePriceType
	제품군: 'spart', // Maps to spart
	제품등급: 'grade', // Maps to grade
	정척여부: '', // Not directly available in the response
	유찰횟수: '', // Not directly available in the response
	'제품 낙찰단가(원/톤)': 'productBiddingPrice', // Maps to productBiddingPrice
	'낙찰총단가(원/톤)': 'totalBiddingPrice', // Maps to totalBiddingPrice
	'제품공급가(원/톤)': 'orderPrice', // Maps to orderPrice
	'제품부가세(원/톤)': 'orderPriceVat', // Maps to orderPriceVat
	'제품금액 (VAT포함)': '', // Not directly available in the response
	'기본 운임단가(원/톤)': 'freightFee', // Maps to freightFee
	'할증 운임단가(원/톤)': 'extraUnitPrice', // Maps to extraUnitPrice
	'운임 총단가 운반비공급가(원/톤)': 'freightCost', // Maps to freightCost
	'운반비부가세(원/톤)': 'freightCostVat', // Maps to freightCostVat
	'운반비 금액 (VAT포함)': '', // Not directly available in the response
	'총공급가(원/톤)': '', // Not directly available in the response
	'총부가세(원/톤)': '', // Not directly available in the response
	'합계금액(원/톤)': '', // Not directly available in the response
	두께: 'thickness', // Maps to thickness
	폭: 'width', // Maps to width
	길이: 'length', // Maps to length
	중량: 'totalWeight', // Maps to totalWeight
	규격약호: 'spec', // Maps to spec
	TS: 'ts', // Maps to ts
	YP: 'yp', // Maps to yp
	'C%': 'c', // Maps to c
	EL: 'el', // Maps to el
	SI: 'si', // Maps to si
	MN: 'mn', // Maps to mn
	P: 'p', // Maps to p
	S: 's', // Maps to s
	여재원인: 'causeCode', // Maps to causeCode
	여제원인명1: 'causeCodeName', // Maps to causeCodeName
	용도코드: 'usageCode', // Maps to usageCode
	용도명: 'usageCodeName', // Maps to usageCodeName
	메모: 'productMemo', // Maps to productMemo
	주문상태: 'orderStatus', // Maps to orderStatus
	'확정전송 일자': '', // Not directly available in the response
	주문번호: 'orderUid', // Maps to orderUid
	비고: '', // Not directly available in the response
	'매입 기본운임단가(원/톤)': '', // Not directly available in the response
	'매입 할증운임단가(원/톤)': '', // Not directly available in the response
	'매입 운임총단가': '', // Not directly available in the response
	'매입 운반비공급가(원/톤)': '', // Not directly available in the response
	'매입 운반비부가세(원/톤)': '', // Not directly available in the response
	'매입 운반비 금액 (VAT포함)': '', // Not directly available in the response
	매입운반비: '', // Not directly available in the response
	매출운반비: '', // Not directly available in the response
	재고상태: '', // Not directly available in the response
	'카스코 낙찰가': '', // Not directly available in the response
	최종수정자: 'updateMemberName', // Maps to updateMemberName
	최종수정일시: 'updateDate', // Maps to updateDate
}
