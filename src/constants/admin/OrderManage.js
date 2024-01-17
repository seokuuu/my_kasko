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
  console.log('데이터확인', data)
  const queryParams = new URLSearchParams({
    auctionNumber: data.auctionNumber,
    customerCode: data.customerCode,
    storage: data.storageName,
    customerDestinationUid: data.customerDestinationUid,
    sendDate: data.sendDate,

    saleType: data.saleType,
    weight: data.weight,
    customerDestinationAddress: data.customerDestinationAddress,
    customerDestinationName: data.customerDestinationName,
    customerName: data.customerName,
    customerDestinationPhone: data.customerDestinationPhone,
    totalPrice: data.totalPrice,
  })

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
    headerName: '중량',
    field: 'weight',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
    width: 120,
    cellRenderer: (params) => params.value || 'N',
  },
  {
    headerName: '경매 / 상시 판매 번호',
    field: 'auctionNumber',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
    width: 150,
    cellRenderer: LinkRenderer,
  },
  {
    headerName: '주문 일자',
    field: 'orderDate',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
    width: 107,
    cellRenderer: (params) => params.value || 'N',
  },
  {
    headerName: '패키지 명',
    field: 'packageName',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
    width: 90,
    cellRenderer: (params) => params.value || 'N',
  },
  {
    headerName: '패키지 번호',
    field: 'packageNumber',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
    width: 100,
    cellRenderer: (params) => params.value || 'N',
  },
  {
    headerName: '주문 상태',
    field: 'title',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
    width: 90,
    cellRenderer: (params) => params.value || 'N',
  },
  {
    headerName: '확정전송 일자',
    field: 'sendDate',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
    width: 107,
    cellRenderer: (params) => params.value || 'N',
  },
  {
    headerName: '주문 번호',
    field: 'orderNumber',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
    width: 110,
    cellRenderer: (params) => params.value || '-',
  },
  {
    headerName: '고객사 명',
    field: 'customerName',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
    width: 110,
    cellRenderer: (params) => params.value || 'N',
  },
  {
    headerName: '고객 코드',
    field: 'customerCode',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
    width: 110,
    cellRenderer: (params) => params.value || 'N',
  },
  {
    headerName: '창고',
    field: 'storageName',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
    width: 90,
    cellRenderer: (params) => params.value || 'N',
  },
  {
    headerName: '판매 구분',
    field: 'title',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
    width: 100,
    cellRenderer: (params) => params.value || 'N',
  },
  {
    headerName: '판매 유형',
    field: 'saleType',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
    width: 100,
    cellRenderer: (params) => params.value || 'N',
  },
  {
    headerName: '판매가 유형',
    field: 'salePriceType',
    headerClass: 'custom-header-style',
    cellStyle: { textAlign: 'center' },
    width: 100,
    cellRenderer: (params) => params.value || 'N',
  },
]

export const OrderFieldsManage = {
  '고객 코드': 'customerCode',
  고객사명: 'customerName',
  '창고 이름': 'storageName',
  '판매 유형': 'saleType',
  '판매가 유형': 'salePriceType',
  '경매 번호': 'auctionNumber',
  중량: 'weight',
  '상시판매 주문번호': 'orderNumber',
  '현대제철 주문번호': 'hsOrderNo',
  '제품 개수': 'productCount',
  '상시판매 주문일자': 'createDate',
  패키지명: 'packageName',
  '패키지 번호': 'packageNumber',
  '확정 전송가': 'confirmPrice',
  '확정전송 일자': 'sendDate',
  입금요청액: 'totalPrice',
}
