import React from 'react'
import { commonStyles } from './Auction'

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
		customerDestinationPhone: data['목적지 연락처(사무실)'],
		totalPrice: data['입금요청액'],
	})

	if (data['고객사 목적지 고유 번호'] !== null && data['고객사 목적지 고유 번호'] !== 'null') {
		queryParams.append('customerDestinationUid', data['고객사 목적지 고유 번호'])
	}
	if (data['확정 전송일'] !== null && data['확정 전송일'] !== 'null') {
		queryParams.append('sendDate', data['확정 전송일'])
	}
	if (data['패키지 번호'] !== null && data['패키지 번호'] !== 'null') {
		queryParams.append('packageNumber', data['패키지 번호'])
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
		minWidth: 50,
		...commonStyles,
		checkboxSelection: checkboxSelection,
		headerCheckboxSelection: headerCheckboxSelection,
		lockVisible: true,
		lockPinned: true,
	},
	{
		...commonStyles,
		field: '순번',
		minWidth: 100,
	},
	{
		...commonStyles,
		field: '경매 번호',
		minWidth: 150,
		cellRenderer: LinkRenderer,
	},
	{
		...commonStyles,
		field: '패키지명',
		minWidth: 90,
	},
	{
		...commonStyles,
		field: '패키지 번호',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '주문 상태',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '확정 전송일',
		minWidth: 107,
	},
	{
		...commonStyles,
		field: '주문 번호',
		minWidth: 110,
	},
	{
		...commonStyles,
		field: '고객사명',
		minWidth: 110,
	},
	{
		...commonStyles,
		field: '고객 코드',
		minWidth: 110,
	},
	{
		...commonStyles,
		field: '창고',
		minWidth: 90,
	},
	{
		...commonStyles,
		field: '판매 구분',
		minWidth: 100,
	},
	{
		...commonStyles,
		field: '판매 유형',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '판매가 유형',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '제품군',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '제품 수량',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '중량',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '제품금액 (VAT포함)',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '운반비금액 (VAT포함)',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '입금요청액',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '목적지명',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '목적지 주소',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '목적지 연락처(사무실)',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '목적지 담당자 연락처(휴대폰)',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '하차지명',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '메모',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '재고 상태',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '확정 전송가',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '최종 수정자',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '최종 수정일',
		minWidth: 150,
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
	'제품금액 (VAT포함)': 'orderPriceVat',
	'운반비금액 (VAT포함)': 'freightCostVat',
	'목적지 코드': 'destinationCode',
	목적지명: 'destinationName',
	'고객사 목적지 고유 번호': 'customerDestinationUid',
	'목적지 주소': 'customerDestinationAddress',
	'목적지 연락처(사무실)': 'customerDestinationPhone',
	'목적지 담당자 연락처(휴대폰)': 'customerDestinationManagerPhone',
	하차지명: 'customerDestinationName',
	'최종 수정자': 'updateMemberName',
	'최종 수정일': 'updateDate',
	'주문 상태': 'status',
	'확정 전송일': 'sendDate',
	메모: 'memo',
	'상시판매 주문번호': 'orderNumber',
	'현대제철 주문번호': 'hsOrderNo',
	'제품 수량': 'productCount',
	패키지명: 'packageName',
	'패키지 번호': 'packageNumber',
	'확정 전송가': 'confirmPrice',
	입금요청액: 'totalPrice',
}
