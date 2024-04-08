var checkboxSelection = function (params) {
	return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
	return params.columnApi.getRowGroupColumns().length === 0
}

const onCellClicked = (params) => {}

const LinkRenderer = ({ value }) => {
	return value ? (
		<a href={`detail/${value}`} style={{ color: 'blue', textDecoration: 'underline' }} rel="noreferrer">
			{value}
		</a>
	) : (
		'N'
	)
}

/* ==============================
    주문 관리 - 주문 관리 (Order)
============================== */

export const proNoFieldCols = [
	{
		field: '',
		width: 50,
		headerClass: 'custom-header-style',
		checkboxSelection: checkboxSelection,
		cellStyle: { borderRight: '1px solid #c8c8c8' },
		headerCheckboxSelection: headerCheckboxSelection,
	},
	{
		headerName: '순번',
		width: 100,
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '제품 번호',
		field: ['제품 번호'],
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 120,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '창고',
		field: ['창고'],
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 120,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: 'ProNo.',
		field: ['Pro.No 번호'],
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 107,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '등록 일자',
		field: ['등록 일자'],
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 100,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '입고 상태',
		field: ['입고 상태'],
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 100,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '매입 구분',
		field: ['매입 구분'],
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 90,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '매입처',
		field: ['매입처'],
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 107,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '제조사',
		field: ['제조사'],
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 110,
		cellRenderer: (params) => params.value || '-',
	},
	{
		headerName: '경매 등록 상태',
		field: ['경매 등록 상태'],
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 110,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '경매 번호',
		field: ['경매 번호'],
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 110,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '판매 구분',
		field: ['판매 구분'],
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 90,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '판매 유형',
		field: ['판매 유형'],
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 150,
		cellRenderer: LinkRenderer,
	},
	{
		headerName: '판매가 유형',
		field: ['판매가 유형'],
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 90,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '창고',
		field: ['창고'],
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 90,
		cellRenderer: (params) => params.value || 'N',
	},
]

export const proNoFieldManage = {
	'제품 고유 번호': 'uid',
	'제품 번호': 'number',
	창고: 'storageName',
	'Pro.No 번호': 'productNoNumber',
	'등록 일자': 'createDate',
	'입고 상태': 'receiptStatus',
	매입처: 'supplier',
	제조사: 'maker',
	'경매 등록 상태': 'registrationStatus',
	'경매 번호': 'auctionNumber',
	'판매 구분': 'saleCategory',
	'판매가 유형': 'salePriceType',
	제품군: 'spart',
	'정척 여부': 'preferThickness',
	'유찰 횟수': 'failCount',
	매입가: 'price',
	시작가: 'auctionStartPrice',
	'낙찰 상태': 'biddingStatus',
	'규격 약호': 'spec',
	'여재 원인': 'causeCode',
	'여재 원인명1': 'causeCodeName',
	'용도 코드': 'usageCode',
	용도명: 'usageCodeName',
	메모: 'memo',
	'제품 낙찰단가': 'productBiddingPrice',
	'기본 운임단가(원/톤)': 'freightFee',
	'할증 운임단가(원/톤)': 'extraUnitPrice',
	'낙찰 총 단가(원/톤)': 'totalBiddingPrice',
	'제품 공급가(원/톤)': 'orderPrice',
	'운반비 공급가(원/톤)': 'freightCost',
	'총 공급가(원/톤)': 'totalSupplyPrice',
	'제품 부가세(원/톤)': 'orderPriceVat',
	'운반비 부가세(원/톤)': 'freightCostVat',
	'총 부가세(원/톤)': 'totalVat',
	'제품 금액': 'totalOrderPrice',
	'운반비 금액': 'totalFreightCost',
	비고: 'note',
	'재고 상태': 'stockStatus',
	'주문 상태': 'orderStatus',
	'상시 판매가': 'salePrice',
	'상시 판매 상태': 'saleStatus',
	'확정 전송일': 'sendDate',
	패키지명: 'packageName',
	'패키지 번호': 'packageNumber',
	'판매 제외 사유': 'excludeSaleReason',
	'클레임 진행 상태': 'claimStatus',
	'최종 수정자': 'lastedUpdater',
	등급: 'grade',
	중량: 'weight',
	두께: 'thickness',
	폭: 'width',
	길이: 'length',
}
