import React, { useState } from 'react'
import { commonStyles } from './Auction'

var checkboxSelection = function (params) {
	return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
	return params.columnApi.getRowGroupColumns().length === 0
}

const onCellClicked = (params) => {}

const LinkRenderer = (props) => {
	const { data } = props

	const queryParams = new URLSearchParams({
		productNoNumber: data['ProNo'],
	})

	const url = `admin/order/detail?${queryParams}`

	return (
		<a style={{ color: 'blue', textDecoration: 'underline' }} rel="noreferrer">
			{props.value}
		</a>
	)
}

/* ==============================
    주문 관리 - 주문 관리 (Order)
============================== */

export const AdminOrderManageFieldsCols = (toggleModal) => [
	{
		field: '',
		minWidth: 50,
		...commonStyles,
		checkboxSelection: checkboxSelection,
		headerCheckboxSelection: headerCheckboxSelection,
	},
	{
		field: '순번',
		minWidth: 100,
		...commonStyles,
		onCellClicked: onCellClicked,
	},
	{
		...commonStyles,
		field: '경매 번호',
		minWidth: 120,
	},
	{
		...commonStyles,
		field: '패키지명',
		minWidth: 100,
	},
	{
		...commonStyles,
		field: '패키지 번호',
		minWidth: 100,
	},
	{
		...commonStyles,
		field: '주문 상태',
		minWidth: 90,
	},
	{
		...commonStyles,
		field: '확정 전송일',
		minWidth: 107,
	},
	{
		...commonStyles,
		field: '입금 확인일',
		minWidth: 107,
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
		field: '제품 번호',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: 'ProNo',
		minWidth: 150,
		cellRenderer: LinkRenderer,
		onCellClicked: (params) => toggleModal(params),
	},
	{
		...commonStyles,
		field: '창고',
		minWidth: 150,
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
		field: '등급',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '정척 여부',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '유찰 횟수',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '제품 낙찰 단가(원/톤)',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '낙찰 총 단가(원/톤)',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '제품 공급가(원/톤)',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '제품 부가세',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '제품 금액 (VAT포함)',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '기본 운임단가(원/톤)',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '할증 운임단가(원/톤)',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '운반비 공급가',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '운반비 부가세',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '운반비 금액 (VAT포함)',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '총 공급가(원/톤)',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '총 부가세(원/톤)',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '합계 금액',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '목적지 코드',
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
		field: '두께',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '폭',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '길이',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '중량',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '규격 약호',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: 'TS',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: 'YP',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: 'C',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: 'EL',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: 'SI',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: 'MN',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: 'P',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: 'S',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '여재 원인명',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '용도명',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '메모',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '비고',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '재고 상태',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '입고 상태',
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

export const DetailOrderFieldsManage = {
	순번: 'index',
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
	ProNo: 'productNoNumber',
	낙찰가: 'biddingPrice',
	'확정 전송가': 'confirmPrice',
	'규격 약호': 'spec',
	'여재 원인명': 'causeCodeName',
	용도명: 'usageCodeName',
	'제품 낙찰 단가(원/톤)': 'productBiddingPrice',
	'기본 운임단가(원/톤)': 'freightFee',
	'할증 운임단가(원/톤)': 'extraUnitPrice',
	'낙찰 총 단가(원/톤)': 'totalBiddingPrice',
	'제품 공급가(원/톤)': 'orderPrice',
	'운반비 공급가': 'freightCost',
	'총 공급가(원/톤)': 'totalSupplyPrice',
	'제품 부가세': 'orderPriceVat',
	'운반비 부가세': 'freightCostVat',
	'총 부가세(원/톤)': 'totalVat',
	'제품 금액 (VAT포함)': 'totalOrderPrice',
	'운반비 금액 (VAT포함)': 'totalFreightCost',
	'합계 금액': 'totalPrice',
	'목적지 코드': 'destinationCode',
	목적지명: 'destinationName',
	'목적지 주소': 'customerDestinationAddress',
	'목적지 연락처(사무실)': 'customerDestinationPhone',
	'목적지 담당자 연락처(휴대폰)': 'customerDestinationManagerPhone',
	하차지명: 'customerDestinationName',
	'목적지 변경 요청 상태': 'requestStatus',
	'변경 요청 목적지명': 'requestDestinationName',
	'변경 요청 목적지 주소': 'requestCustomerDestinationAddress',
	'변경 요청 목적지 연락처': 'requestCustomerDestinationPhone',
	'최종 수정자': 'updateMemberName',
	'최종 수정일': 'updateDate',
	'주문 상태': 'status',
	'확정 전송일': 'sendDate',
	'입금 확인일': 'depositDate',
	메모: 'memo',
	비고: 'note',
	'입고 상태': 'receiptStatus',
	패키지명: 'packageName',
	'패키지 번호': 'packageNumber',
	'판매 구분': 'saleCategory',
	'현대제철 주문번호': 'hsOrderNo',
	등급: 'grade',
	중량: 'weight',
	두께: 'thickness',
	폭: 'width',
	길이: 'length',
	'정척 여부': 'preferThickness',
	'유찰 횟수': 'failCount',
	YP: 'yp',
	TS: 'ts',
	C: 'c',
	P: 'p',
	S: 's',
	SI: 'si',
	EL: 'el',
	MN: 'mn',
}
// 순번 - 차례대로 순번 1,2,3,4,5 처리하기
