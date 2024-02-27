import { atom } from 'jotai'
import React, { useState } from 'react'

var checkboxSelection = function (params) {
	return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
	return params.columnApi.getRowGroupColumns().length === 0
}

const LinkRenderer = (props) => {
	const { data } = props

	const queryParams = new URLSearchParams({
		auctionNumber: data['경매 번호'],
		customerCode: data['고객 코드'],
		storage: data['창고'],

		saleType: data['판매 유형'],
		weight: data['중량'],
		customerDestinationAddress: data['목적지 주소'],
		customerDestinationName: data['하차지명'],
		customerName: data['고객사명'],
		customerDestinationPhone: data['목적지 연락처'],
		totalPrice: data['입금요청액'],
	})

	if (data['고객사 목적지 고유 번호'] !== null && data['고객사 목적지 고유 번호'] !== 'null') {
		queryParams.append('customerDestinationUid', data['고객사 목적지 고유 번호'])
	}
	if (data['확정 전송일'] !== null && data['확정 전송일'] !== 'null') {
		queryParams.append('sendDate', data['확정 전송일'])
	}

	const url = `admin/order/detail?${queryParams}`

	return (
		<a href={url} style={{ color: 'blue', textDecoration: 'underline' }} rel="noreferrer">
			{props.value || 'N'}
		</a>
	)
}

/* ==============================
    주문 관리 - 주문 관리 (Order)
============================== */

export const OrderManageFieldsCols = [
	{
		field: '',
		width: 50,
		headerClass: 'custom-header-style',
		checkboxSelection: checkboxSelection,
		headerCheckboxSelection: headerCheckboxSelection,
		cellStyle: { borderRight: '1px solid #c8c8c8' },
	},
	{
		headerName: '순번',
		field: '순번',
		width: 100,
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '경매 번호',
		field: '경매 번호',
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 150,
		cellRenderer: LinkRenderer,
	},
	{
		headerName: '주문 일자',
		field: '주문 일자',
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 107,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '패키지명',
		field: '패키지명',
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 90,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '패키지 번호',
		field: '패키지 번호',
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 100,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '주문 상태',
		field: '주문 상태',
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 90,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '확정전송 일자',
		field: '확정 전송일',
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 107,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '주문 번호',
		field: '주문 번호',
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
		field: '고객 코드',
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 110,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '창고',
		field: '창고',
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 90,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '판매 구분',
		field: '판매 구분',
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 100,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '판매 유형',
		field: '판매 유형',
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 100,
		cellRenderer: (params) => params.value || 'N',
	},
	{
		headerName: '판매가 유형',
		field: '판매가 유형',
		headerClass: 'custom-header-style',
		cellStyle: { textAlign: 'center' },
		width: 100,
		cellRenderer: (params) => params.value || 'N',
	},
]

export const orderFieldData = {
	'고객 코드': 'customerCode',
	고객사명: 'customerName',
	창고: 'storageName',
	제품군: 'spart',
	'재고 상태': 'stockStatus',
	'판매 구분': 'saleCategory',
	'판매 유형': 'saleType',
	'판매가 유형': 'salePriceType',
	'경매 번호': 'auctionNumber',
	중량: 'weight',
	'제품대 VAT': 'orderPriceVat',
	'운송비 VAT': 'freightCostVat',
	'목적지 코드': 'destinationCode',
	목적지명: 'destinationName',
	'고객사 목적지 고유 번호': 'customerDestinationUid',
	'목적지 주소': 'customerDestinationAddress',
	'목적지 연락처': 'customerDestinationPhone',
	'목적지 담당자 연락처': 'customerDestinationManagerPhone',
	하차지명: 'customerDestinationName',
	'최종 수정자': 'updateMemberName',
	'최종 수정일': 'updateDate',
	'주문 상태': 'status',
	'확정 전송일': 'sendDate',
	메모: 'memo',
	'상시판매 주문번호': 'orderNumber',
	'현대제철 주문번호': 'hsOrderNo',
	'제품 개수': 'productCount',
	'상시판매 주문일자': 'createDate',
	패키지명: 'packageName',
	'패키지 번호': 'packageNumber',
	'확정 전송가': 'confirmPrice',
	입금요청액: 'totalPrice',
}
