// 상시 판매 관리 > 단일

var checkboxSelection = function (params) {
	// we put checkbox on the name if we are not doing grouping
	return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
	// we put checkbox on the name if we are not doing grouping
	return params.columnApi.getRowGroupColumns().length === 0
}

export const singleProductListFieldCols = [
	{
		maxWidth: 50,
		checkboxSelection: checkboxSelection,
		headerCheckboxSelection: headerCheckboxSelection,
		minWidth: 100,
		cellStyle: { textAlign: 'center' },
	},
	{ field: '순번', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '경매번호', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '상시판매 번호', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '상시판매 주문 일자', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '제품번호', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '창고', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '상시판매가', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '상시판매 상태', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '프로넘 (ProNo.)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '등록 일자', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '입고상태', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '매입 처', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '제조사', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '경매등록상태', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '판매구분', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '판매유형', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '판매가유형', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '제품군', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '제품등급', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '정척여부', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '유찰횟수', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '매입가', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '경매시작단가 (시작가)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '낙찰 상태', minWidth: 100, cellStyle: { textAlign: 'center' } },
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
	{ field: '제품 낙찰단가(원/톤)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '낙찰총단가(원/톤)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '제품공급가(원/톤)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '제품부가세(원/톤)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '제품금액 (VAT포함)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '기본 운임단가(원/톤)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '할증 운임단가(원/톤)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '운임 총단가', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '운반비공급가(원/톤)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '운반비부가세(원/톤)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '운반비 금액 (VAT포함)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '총공급가(원/톤)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '총부가세(원/톤)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '합계금액(원/톤)', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '목적지 명', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '비고', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '재고상태', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '주문상태', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '확정전송 일자', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '패키지명', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '패키지번호', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '판매제외 사유', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '클레임 진행상태', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '최종수정자', minWidth: 100, cellStyle: { textAlign: 'center' } },
	{ field: '최종수정일시', minWidth: 100, cellStyle: { textAlign: 'center' } },
]

// Mapping from API response to table row data
export const responseToTableRowMap = {
	순번: 'uid', // 고유 번호
	경매번호: 'auctionNumber', // 경매 번호
	제품번호: 'number', // 제품 번호
	규격약호: 'spec', // 규격 약호
	창고: 'storageName', // 창고
	두께: 'thickness', // 두께
	폭: 'width', // 폭
	길이: 'length', // 길이
	중량: 'weight', // 중량
	제품등급: 'grade', // 제품 등급
	용도코드: 'usageCode', // 용도 코드
	용도명: 'usageCodeName', // 용도명
	'C%': 'c', // C%
	SI: 'si', // Si
	MN: 'mn', // Mn
	P: 'p', // P
	S: 's', // S
	TS: 'ts', // TS
	YP: 'yp', // YP
	EL: 'el', // EL
	제품군: 'spart', // 제품군명
	제품명: 'productName', // 제품명
	정척여부: 'preferThickness', // 정척 여부
	여재원인: 'causeCode', // 여재 원인 코드
	여재원인명: 'causeCodeName', // 여재 원인명
	입고일: 'receiptDate', // 입고일
	유찰횟수: 'failCount', // 유찰 횟수
	제품상태: 'productStatus', // 제품 상태
	경매등록상태: 'registrationStatus', // 경매 등록 상태
	매입처: 'supplier', // 매입처
	제조사: 'maker', // 제조사
	판매구분: 'saleCategory', // 판매 구분
	판매제외사유: 'excludeSaleReason', // 판매 제외 사유
	재고상태: 'stockStatus', // 재고 상태
	판매유형: 'saleType', // 판매 유형
	입고상태: 'receiptStatus', // 입고 상태
	상시판매상태: 'saleStatus', // 상시 판매 상태
	판매가유형: 'salePriceType', // 판매가 유형
	추천제품여부: 'bestStatus', // 추천 제품 여부
	등록일자: 'createDate', // 등록 일자
	최종수정일시: 'updateDate', // 최종 수정 일자
	최종수정자: 'lastedUpdater', // 최종 수정자
	매입가: 'price', // 매입가
	노출상태: 'viewStatus', // 노출 상태
	경매시작단가: 'auctionStartPrice', // 경매 시작 단가
	주문상태: 'orderStatus', // 주문 상태
	클레임진행상태: 'claimStatus', // 클레임 진행 상태
	확정전송일자: 'sendDate', // 확정 전송 일자
	패키지명: 'packageName', // 패키지명
	패키지번호: 'packageNumber', // 패키지번호
	프로넘: 'productNoNumber', // Pro.No
	제품낙찰단가: 'productBiddingPrice', // 제품 낙찰 단가
	낙찰총단가: 'totalBiddingPrice', // 낙찰 총 단가
	기본운임단가: 'freightFee', // 기본 운임 단가
	할증운임단가: 'extraUnitPrice', // 할증 운임 단가
	제품공급가: 'orderPrice', // 제품 공급가
	제품부가세: 'orderPriceVat', // 제품 부가세
	운반비공급가: 'freightCost', // 운반비 공급가
	운반비부가세: 'freightCostVat', // 운반비 부가세
	목적지명: 'destinationName', // 목적지명
	낙찰상태: 'biddingStatus', // 낙찰 상태
	메모: 'memo', // 메모
	비고: 'note', // 비고 (창고 비고란)
	상시판매가: 'salePrice', // 상시 판매가
}
