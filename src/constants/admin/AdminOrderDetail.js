import React, { useState } from 'react'

var checkboxSelection = function (params) {
	return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
	return params.columnApi.getRowGroupColumns().length === 0
}

const onCellClicked = (params) => {
	console.log('클릭 발생')
}

const LinkRenderer = (props) => {
	const { data } = props

	const queryParams = new URLSearchParams({
		productNoNumber: data['ProNo.'],
	})

	const url = `admin/order/detail?${queryParams}`

	return (
		<a style={{ color: 'blue', textDecoration: 'underline' }} rel="noreferrer">
			{props.value || 'N'}
		</a>
	)
}

/* ==============================
    주문 관리 - 주문 관리 (Order)
============================== */

export const AdminOrderManageFieldsCols = (toggleModal) => [
	{
		field: '',
		width: 50,
		headerClass: 'custom-header-style',
		checkboxSelection: checkboxSelection,
		cellStyle: { borderRight: '1px solid #c8c8c8' },
		headerCheckboxSelection: headerCheckboxSelection,
	},
	{
		field: '순번',
		width: 100,
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		onCellClicked: onCellClicked,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '경매 번호',
		field: ['경매 번호'],
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 120,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '상시 판매 번호',
		field: ['상시판매 주문번호'],
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 120,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '주문 일자',
		field: ['상시판매 주문일자'],
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 107,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '패키지 명',
		field: '패키지명',
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 100,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '패키지 번호',
		field: ['패키지 번호'],
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 100,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '주문 상태',
		field: ['주문 상태'],
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 90,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '확정전송 일자',
		field: ['확정 전송일'],
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 107,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '주문 번호',
		field: ['주문 고유 번호'],
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 110,
		cellRenderer: (params) => params.value || '-',
	},
	{
		headerName: '고객사 명',
		field: '고객사명',
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 110,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '고객 코드',
		field: ['고객 코드'],
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 110,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '제품 번호',
		field: ['제품 번호'],
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 90,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: 'ProNo.',
		field: ['Pro.No 번호'],
		headerClass: 'custom-header-style',
		cellStyle: { textAlign: 'center' },
		width: 150,
		cellRenderer: LinkRenderer,
		onCellClicked: (params) => toggleModal(params.value),
	},
]

export const DetailOrderFieldsManage = {
	'주문 고유 번호': 'orderUid',
	'제품 고유 번호': 'productUid',
	'고객 코드': 'customerCode',
	고객사명: 'customerName',
	창고: 'storageName',
	제품군: 'spart',
	'재고 상태': 'stockStatus',
	'판매 유형': 'saleType',
	'판매가 유형': 'salePriceType',
	'경매 번호': 'auctionNumber',
	'제품 번호': 'productNumber',
	'Pro.No 번호': 'productNoNumber',
	낙찰가: 'biddingPrice',
	'확정 전송가': 'confirmPrice',
	'규격 약호': 'spec',
	'여재 원인명': 'causeCodeName',
	용도명: 'usageCodeName',
	'제품 낙찰 단가': 'productBiddingPrice',
	'기본 운임단가': 'freightFee',
	'할증 운임단가': 'extraUnitPrice',
	'낙찰 총 단가': 'totalBiddingPrice',
	'제품 공급가': 'orderPrice',
	'운송비 공급가': 'freightCost',
	'총 공급가': 'totalSupplyPrice',
	'제품대 부가세': 'orderPriceVat',
	'운송비 부가세': 'freightCostVat',
	'총 부가세': 'totalVat',
	'제품 금액': 'totalOrderPrice',
	'운반비 금액': 'totalFreightCost',
	'목적지 코드': 'destinationCode',
	목적지명: 'destinationName',
	'목적지 주소': 'customerDestinationAddress',
	'목적지 연락처': 'customerDestinationPhone',
	'목적지 담당자 연락처': 'customerDestinationManagerPhone',
	'목적지 변경 요청 상태': 'requestStatus',
	'변경 요청 목적지명': 'requestDestinationName',
	'변경 요청 목적지 주소': 'requestCustomerDestinationAddress',
	'변경 요청 목적지 연락처': 'requestCustomerDestinationPhone',
	'최종 수정자': 'updateMemberName',
	'최종 수정일': 'updateDate',
	'주문 상태': 'status',
	'확정 전송일': 'sendDate',
	메모: 'memo',
	비고: 'note',
	'입고 상태': 'receiptStatus',
	패키지명: 'packageName',
	'패키지 번호': 'packageNumber',
	'판매 구분': 'saleCategory',
	'상시판매 주문번호': 'orderNumber',
	'현대제철 주문번호': 'hsOrderNo',
	'상시판매 주문일자': 'createDate',
	등급: 'grade',
	중량: 'weight',
	두께: 'thickness',
	폭: 'width',
	길이: 'length',
}
// 순번 - 차례대로 순번 1,2,3,4,5 처리하기
