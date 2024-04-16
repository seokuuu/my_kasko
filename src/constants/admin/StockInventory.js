import BtnCellRendererV2 from '../../pages/Table/BtnCellRendererV2'

var checkboxSelection = function (params) {
	// we put checkbox on the name if we are not doing grouping
	return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
	// we put checkbox on the name if we are not doing grouping
	return params.columnApi.getRowGroupColumns().length === 0
}

export const StockInventoryFields = {
	순번: 'index',
	'제품 번호': 'productNumber',
	'출고 번호': 'outNumber',
	// 창고 - 누락 추가
	등록일자: 'createDate',
	'입고 상태': 'receiptStatus',
	입고일자: 'receiptDate',
	// 매입구분 - 누락 추가
	매입처: 'supplier',
	제조사: 'maker',
	'경매 번호': 'auctionNumber',
	'판매 구분': 'saleCategory',
	'판매 유형': 'saleType',
	'판매가 유형': 'salePriceType',
	제품군: 'spart',
	제품등급: 'grade',
	'정척 여부': 'preferThickness',
	'유찰 횟수': 'failCount',
	매입가: 'price',
	// 경매 시작 단가 - 누락 추가
	// 낙찰가 - 누락 추가
	고객사명: 'customerName',
	'고객 코드': 'customerCode',

	두께: 'thickness',
	폭: 'width',
	길이: 'length',
	중량: 'weight',
	'규격 약호': 'spec',
	ts: 'ts',
	yp: 'yp',

	'c%': 'c',

	el: 'el',
	si: 'si',
	mn: 'mn',
	p: 'p',
	s: 's',
	'여재 원인': 'causeCode',
	'여재 원인명': 'causeCodeName',
	'용도 코드': 'usageCode',
	용도명: 'usageCodeName',
	//메모 - 누락 추가
	'제품 낙찰 단가(원/톤)': 'productBiddingPrice',
	'낙찰 총 단가(원/톤)': 'totalBiddingPrice',
	'제품 공급가(원/톤)': 'orderPrice',
	'제품 부가세(원/톤)': 'orderPriceVat',
	'제품 금액(VAT 포함)': 'totalOrderPrice',
	'기본 운임 단가(원/톤)': 'freightFee',
	//할증율(%) - 누락 추가
	'할증 운임 단가(원/톤)': 'extraUnitPrice',
	//운임 총 단가 - 누락 추가
	'운반비 공급가(원/톤)': 'freightCost',

	'운반비 부가세(원/톤)': 'freightCostVat',
	'운반비 금액(원/톤)': 'totalFreightCost',
	'총 공급가(원/톤)': 'totalSupplyPrice',
	'총 부가세(원/톤)': 'totalVat',
	//합계금액(원/톤) - 누락 추가
	목적지명: 'destinationName',
	//확정전송 일자 - 누락 추가
	'상시판매 번호': 'orderNumber',
	//목적지 명 - 누락 추가
	'확정 전송일자': 'sendDate',
	//상시판매 번호 - 누락 추가
	//상시판매가 - 누락 추가
	//주문번호 - 누락 추가
	패키지명: 'packageName',
	'패키지 번호': 'packageNumber',
	출고일자: 'outDate',
	//출고번호 - 누락 추가
	'출하 상태': 'shipmentStatus',

	//비고 - 누락 추가
	'매입 운반비': 'inboundFreightAmount',
	'매출 운반비': 'outboundFreightAmount',
	'재고 상태': 'stockStatus',
	//입찰고객명 - 누락 추가
	//입찰고객코드 - 누락 추가
	'현대제철 반품일자': 'hsReturnDate', // 이게 고객사 반품 일자로 변경됨. 백엔드 확인 필요 0416
	'카스코 반품일자': 'kaskoReturnDate',
	'클레임 진행상태': 'claimStatus',
	//최종수정자 - 누락 추가
	//최종수정일자 - 누락 추가

	// ---- 밑에는 스프레드 시트 항목에 없는 것들. (기존 데이터) ---
	창고: 'storageName',
	수정일: 'updateDate',
	'현대제철 주문번호': 'hsOrderNo',
	'제품 고유 번호': 'uid',
	'중량 판매 개수': 'splitCount',
	시작가: 'auctionStartPrice',
}

export const StockInventoryFieldCols = [
	{
		field: '',
		headerClass: 'custom-header-style',
		flex: 1,
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		minWidth: 50,
		maxWidth: 50,
		checkboxSelection,
		headerCheckboxSelection,
	},

	{
		field: '중량 판매 등록',
		headerClass: 'custom-header-style',
		flex: 1,
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		minWidth: 120,
		cellRenderer: BtnCellRendererV2,
		cellRendererParams: {
			uidFieldName: '패키지 번호', // 해당 get의 uid (필수수)
			editType: 'weight',
		},
	},
	...Object.entries(StockInventoryFields).map(([k, v]) => ({
		headerClass: 'custom-header-style',
		flex: 1,
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		field: k,
		minWidth: 100,
	})),
]

export const StockDetailInventoryFields = {
	'중량 제품 번호': 'splitProductUid',
	'제품 번호': 'number',
	중량: 'weight',
	두께: 'thickness',
	폭: 'width',
	길이: 'length',
	제조사: 'maker',
	'판매 구분': 'saleCategory',
	'유찰 횟수': 'failCount',
	'제품 고유 번호': 'uid',
	수정자: 'updateMember',
	'수정 날짜': 'updateDate',
	'중량 판매 개수': 'splitCount',
}

export const StockInventoryDetailFieldCols = [
	{
		field: '',
		headerClass: 'custom-header-style',
		flex: 1,
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		minWidth: 50,
		maxWidth: 50,
		checkboxSelection,
		headerCheckboxSelection,
	},
	...Object.entries(StockDetailInventoryFields).map(([k, v]) => ({
		headerClass: 'custom-header-style',
		flex: 1,
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		field: k,
		minWidth: 100,
	})),
]
