// 상시 판매 관리 > 단일
import { commonStyles } from '../commonCellStyle'

var checkboxSelection = function (params) {
	// we put checkbox on the name if we are not doing grouping
	return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
	// we put checkbox on the name if we are not doing grouping
	return params.columnApi.getRowGroupColumns().length === 0
}

export const responseToTableRowMap = {
	순번: 'index',
	'고유 번호': 'uid', // 고유 번호
	제품번호: 'number', // 제품 번호
	ProNo: 'productNoNumber', // 프로넘
	'등록 일자': 'createDate', // 등록 일자
	창고: 'storageName', // 창고
	매입처: 'supplier', // 매입처
	제조사: 'maker', // 제조사
	판매구분: 'saleCategory', // 판매 구분
	판매유형: 'saleType', // 판매 유형
	판매가유형: 'salePriceType', // 판매가 유형
	제품군: 'spart', // 제품군명
	제품명: 'productName', // 제품명
	제품등급: 'grade', // 제품 등급
	정척여부: 'preferThickness', // 정척 여부
	매입가: 'price', // 매입가
	'상시판매 번호': 'orderNumber', // 상시 판매 번호
	'상시판매 주문일자': 'saleOrderDate', // 상시 판매 주문 일자
	두께: 'thickness', // 두께
	폭: 'width', // 폭
	길이: 'length', // 길이
	중량: 'weight', // 중량
	규격약호: 'spec', // 규격 약호
	TS: 'ts', // TS
	YP: 'yp', // YP
	'C%': 'c', // C%
	EL: 'el', // EL
	SI: 'si', // Si
	MN: 'mn', // Mn
	P: 'p', // P
	S: 's', // S
	여재원인: 'causeCode', // 여재 원인 코드
	여제원인명1: 'causeCodeName', // 여재 원인명
	용도코드: 'usageCode', // 용도 코드
	용도명: 'usageCodeName', // 용도명
	메모: 'memo', // 메모
	비고: 'note', // 비고 (창고 비고란)
	재고상태: 'stockStatus', // 재고 상태
	제품상태: 'productStatus', // 제품 상태
	판매제외사유: 'excludeSaleReason', // 판매 제외 사유
	상시판매가: 'salePrice', // 상시 판매가
	'상시판매 상태': 'saleStatus', // 상시 판매 상태
	주문상태: 'orderStatus', // 주문 상태
	'클레임 진행상태': 'claimStatus', // 클레임 진행 상태
	추천제품여부: 'bestStatus', // 추천 제품 여부
	노출여부: 'viewStatus', // 노출 상태
	최종수정일시: 'updateDate', // 최종 수정 일자
	최종수정자: 'lastedUpdater', // 최종 수정자

	// 경매번호: 'auctionNumber', // 경매 번호
	// 입고일: 'receiptDate', // 입고일
	// 유찰횟수: 'failCount', // 유찰 횟수
	// 경매등록상태: 'registrationStatus', // 경매 등록 상태
	// 입고상태: 'receiptStatus', // 입고 상태
	// '경매시작단가 (시작가)': 'auctionStartPrice', // 경매 시작 단가
	// 확정전송일자: 'sendDate', // 확정 전송 일자
	// 패키지명: 'packageName', // 패키지명
	// 패키지번호: 'packageNumber', // 패키지번호
	// '제품 낙찰단가(원/톤)': 'productBiddingPrice', // 제품 낙찰 단가 (원/톤)
	// '낙찰총단가(원/톤)': 'totalBiddingPrice', // 낙찰 총 단가 (원/톤)
	// '기본 운임단가(원/톤)': 'freightFee', // 기본 운임 단가
	// '할증 운임단가(원/톤)': 'extraUnitPrice', // 할증 운임 단가
	// '제품공급가(원/톤)': 'orderPrice', // 제품 공급가 (원/톤)
	// '제품부가세(원/톤)': 'orderPriceVat', // 제품 부가세 (원/톤)
	// '운반비공급가(원/톤)': 'freightCost', // 운반비 공급가 (원/톤)
	// '운반비부가세(원/톤)': 'freightCostVat', // 운반비 부가세 (원/톤)
	// 목적지명: 'destinationName', // 목적지명
	// '낙찰 상태': 'biddingStatus', // 낙찰 상태
}

export const singleProductListFieldCols = [
	{
		...commonStyles,
		maxWidth: 50,
		minWidth: 100,
		checkboxSelection: checkboxSelection,
		headerCheckboxSelection: headerCheckboxSelection,
	},
	{ ...commonStyles, field: '순번', minWidth: 80 },
	...Object.keys(responseToTableRowMap)
		.slice(1)
		.map((item) => ({
			...commonStyles,
			field: item,
			minWidth: item === '메모' || item === '비고' ? 200 : 150,
			cellRenderer: (params) => {
				if (item === '메모' || item === '비고') {
					return params.value
				}
				if (typeof params.value === 'boolean') {
					return params.value ? 'Y' : 'N'
				} else {
					return params.value
				}
			},
		})),
]
