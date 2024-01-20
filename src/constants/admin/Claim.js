import BtnCellRenderer from '../../pages/Table/BtnCellRenderer'
import { checkboxSelection, headerCheckboxSelection } from '../../pages/Table/util'
/* ==============================
    운영 관리 - 클레임 관리
============================== */

// 클레임 관리 목록 헤더
export const ClaimListFieldCols = [
	{ field: '', checkboxSelection, headerCheckboxSelection, maxWidth: 50, headerClass: 'custom-header-style' },
	{ field: '순번', headerClass: 'custom-header-style', maxWidth: 90 },
	{
		field: '수정',
		maxWidth: 90,
		cellRenderer: BtnCellRenderer,
		cellRendererParams: {
			uidFieldName: '고유값',
			editType: 'claimUpdate',
		},
		headerClass: 'custom-header-style',
	},
	{
		field: '경매일자',
		headerClass: 'custom-header-style',
	},
	{
		field: '입고일자',
		headerClass: 'custom-header-style',
	},
	{
		field: '매입처',
		headerClass: 'custom-header-style',
	},
	{
		field: '제조사',
		headerClass: 'custom-header-style',
	},
	{
		field: '창고',
		headerClass: 'custom-header-style',
	},
	{
		field: '판매구분',
		headerClass: 'custom-header-style',
	},
	{
		field: '판매유형',
		headerClass: 'custom-header-style',
	},
	{
		field: '판매가유형',
		headerClass: 'custom-header-style',
	},
	{
		field: '확정전송일자',
		headerClass: 'custom-header-style',
	},
	{ field: '경매번호', headerClass: 'custom-header-style' },
	{ field: '입고일', headerClass: 'custom-header-style' },
	{ field: '매입처', headerClass: 'custom-header-style' },
	{ field: '제조사', headerClass: 'custom-header-style' },
	{ field: '창고', headerClass: 'custom-header-style' },
	{ field: '판매구분', headerClass: 'custom-header-style' },
	{ field: '판매유형', headerClass: 'custom-header-style' },
	{ field: '판매가유형', headerClass: 'custom-header-style' },
	{ field: '주문상태', headerClass: 'custom-header-style' },
	{ field: '확정전송일자', headerClass: 'custom-header-style' },
	{ field: '출하 상태', headerClass: 'custom-header-style' },
	{ field: '고객사명', headerClass: 'custom-header-style' },
	{ field: '고객코드', headerClass: 'custom-header-style' },
	{ field: '제품번호', headerClass: 'custom-header-style' },
	{ field: '제품군', headerClass: 'custom-header-style' },
	{ field: '정척여부', headerClass: 'custom-header-style' },
	{ field: '유찰횟수', headerClass: 'custom-header-style' },
	{ field: '규격약호', headerClass: 'custom-header-style' },
	{ field: '여재원인', headerClass: 'custom-header-style' },
	{ field: '여재원인명', headerClass: 'custom-header-style' },
	{ field: '용도코드', headerClass: 'custom-header-style' },
	{ field: '용도명', headerClass: 'custom-header-style' },
	{ field: '메모', headerClass: 'custom-header-style' },
	{ field: '재고상태', headerClass: 'custom-header-style' },
	{ field: '등록일', headerClass: 'custom-header-style' },
	{ field: '고객사반품일', headerClass: 'custom-header-style' },
	{ field: '카스코반품일', headerClass: 'custom-header-style' },
	{ field: '종료일', headerClass: 'custom-header-style' },
	{ field: '최종수정자', headerClass: 'custom-header-style' },
	{ field: '최종수정일', headerClass: 'custom-header-style' },
]

// 클레임 관리 목록 키값 맵핑
export const ClaimListFields = {
	순번: 'id',
	고유값: 'uid',
	경매일자: 'auctionStartDate',
	입고일자: 'receiptDate',
	매입처: 'supplier',
	제조사: 'maker',
	창고: 'storageName',
	판매구분: 'saleCategory',
	판매유형: 'saleType',
	판매가유형: 'salePriceType',
	주문상태: 'orderStatus',
	확정전송일자: 'sendDate',
	경매번호: 'auctionNumber',
	입고일: 'receiptDate',
	출하상태: 'shipmentStatus',
	고객사명: 'customerName',
	고객코드: 'customerCode',
	제품번호: 'productNumber',
	제품군: 'spart',
	정척여부: 'preferThickness',
	유찰횟수: 'failCount',
	규격약호: 'spec',
	여재원인: 'causeCode',
	여재원인명: 'causeCodeName',
	용도코드: 'usageCode',
	용도명: 'usageCodeName',
	메모: 'memo',
	재고상태: 'stockStatus',
	등록일: 'createDate',
	고객사반품일: 'hsReturnDate',
	카스코반품일: 'kaskoReturnDate',
	종료일: 'endDate',
	최종수정자: 'updateMember',
	최종수정일: 'updateDate',
}

// 클레임 등록할 제품 찾기 목록 헤더
export const ClaimProductListFieldCols = [
	{ field: '', checkboxSelection, headerCheckboxSelection, maxWidth: 50 },
	{ field: '순번', maxWidth: 100 },
	{ field: '제품 번호' },
	{ field: '창고' },
	{ field: 'Pro. No 번호' },
	{ field: '경매 번호' },
	{ field: '등록일자' },
	{ field: '입고 상태' },
	{ field: '주문 상태' },
	{ field: '입고일' },
	{ field: '매입처' },
	{ field: '제조사' },
	{ field: '제품군' },
	{ field: '정척 여부' },
	{ field: '유찰 횟수' },
	{ field: '매입가' },
	{ field: '경매 등록 상태' },
	{ field: '경매 시작 단가' },
	{ field: '판매 구분' },
	{ field: '판매 제외 사유' },
	{ field: '판매 유형' },
	{ field: '판매가 유형' },
	{ field: '제품등급' },
	{ field: '두께' },
	{ field: '폭' },
	{ field: '길이' },
	{ field: '중량' },
	{ field: 'ts' },
	{ field: 'yp' },
	{ field: 'c' },
	{ field: 'el' },
	{ field: 'si' },
	{ field: 'mn' },
	{ field: 'p' },
	{ field: 's' },
	{ field: '여재 원인명' },
	{ field: '여재 원인 코드' },
	{ field: '용도 코드' },
	{ field: '용도명' },
	{ field: '재고 상태' },
	{ field: '확정전송일' },
	{ field: '클레임 진행상태' },
	{ field: '수정일' },
	{ field: '최종수정자' },
	{ field: '메모' }, // memo
	{ field: '제품 고유 번호' }, // number
	{ field: '여재 원인 코드' },
	{ field: '현대제철 반품일자' },
	{ field: '카스코 반품일자' },
	{ field: '규격 약호' },
	{ field: '낙찰 상태' },
	{ field: '상시판매가' },
	{ field: '상시 판매 상태' },
	{ field: '제품 낙찰 단가' },
	{ field: '낙찰 총 단가' },
	{ field: '기본 운임 단가' },
	{ field: '할증 운임 단가' },
	{ field: '제품 공급가' },
	{ field: '제품 부가세' },
	{ field: '운반비 공급가' },
	{ field: '운반비 부가세' },
	{ field: '제품 금액' },
	{ field: '운반비금액' },
	{ field: '총 공급가' },
	{ field: '총 부가세' },
	{ field: '합계 금액' },
	{ field: '목적지명' },
	{ field: '패키지명' },
	{ field: '패키지 번호' },
	{ field: '비고' },
]

/**
 * @ddescription
 * 없는 값
 * 운임총단가
 * 운반비금액
 * 총공급가
 * 총부가세
 * 합계금액

 * spec
 */

// 클레임 등록할 제품 찾기 목록 키값 맵핑
export const ClaimProductListFields = {
	순번: 'id',
	고유값: 'uid',
	제품등급: 'grade',
	중량: 'weight',
	두께: 'thickness',
	폭: 'width',
	길이: 'length',
	yp: 'yp',
	ts: 'ts',
	c: 'c',
	p: 'p',
	s: 's',
	si: 'si',
	el: 'el',
	mn: 'mn',
	'제품 고유 번호': 'uid',
	창고: 'storageName',
	입고일: 'receiptDate',
	제품군: 'spart',
	'재고 상태': 'stockStatus',
	매입처: 'supplier',
	제조사: 'maker',
	'제품 번호': 'number',
	'정척 여부': 'preferThickness',
	'유찰 횟수': 'failCount',
	'용도 코드': 'usageCode',
	용도명: 'usageCodeName',
	'여재 원인 코드': 'causeCode',
	'여재 원인명': 'causeCodeName',
	수정일: 'updateDate',
	'클레임 진행상태': 'claimStatus',
	'입고 상태': 'receiptStatus',
	'현대제철 반품일자': 'hsReturnDate',
	'카스코 반품일자': 'kaskoReturnDate',
	등록일자: 'createDate',
	확정전송일: 'sendDate',
	매입가: 'price',
	메모: 'memo',
	'규격 약호': 'spec',
	패키지명: 'packageName',
	'패키지 번호': 'packageNumber',
	목적지명: 'destinationName',
	'운반비 공급가': 'freightCost',
	'운반비 부가세': 'freightCostVat',
	'제품 금액': 'totalOrderProductPrice',
	운반비금액: 'totalFreightCost',
	'총 공급가': 'totalSupplyCost',
	'총 부가세': 'totalVatCost',
	'합계 금액': 'totalCost',
	'제품 공급가': 'orderPrice',
	'제품 부가세': 'orderPriceVat',
	'기본 운임 단가': 'freightFee',
	'할증 운임 단가': 'extraUnitPrice',
	'낙찰 총 단가': 'totalBiddingPrice',
	'제품 낙찰 단가': 'productBiddingPrice',
	'상시 판매 상태': 'saleStatus',
	상시판매가: 'salePrice',
	'낙찰 상태': 'biddingStatus',
	'최종 수정자': 'lastedUpdater',
	비고: 'note',
	'Pro. No 번호': 'productNoNumber',
	'경매 번호': 'auctionNumber',
	'주문 상태': 'orderStatus',
	'경매 등록 상태': 'registrationStatus',
	'경매 시작 단가': 'auctionStartPrice',
	'판매 구분': 'saleCategory',
	'판매 제외 사유': 'excludeSaleReason',
	'판매 유형': 'saleType',
	'판매가 유형': 'salePriceType',
}
