import BtnCellRenderer from '../../pages/Table/BtnCellRenderer'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { OrderCellAtom } from '../../store/Layout/Layout'
import { useAtom } from 'jotai'

var checkboxSelection = function (params) {
  return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
  return params.columnApi.getRowGroupColumns().length === 0
}

const onCellClicked = (params) => {
  const finalData = params.data['경매 번호']
  console.log('params', finalData)
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
    cellStyle: { borderRight: '1px solid #c8c8c8' },
    headerCheckboxSelection: headerCheckboxSelection,
  },
  {
    field: '순번',
    width: 100,
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8' },
    onCellClicked: onCellClicked,
    cellRenderer: (params) => params.value || 'N',
  },
  {
    headerName: '중량',
    field: 'weight',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8' },
    width: 110,
    cellRenderer: (params) => params.value || 'N',
  },
  {
    headerName: '경매 / 상시 판매 번호',
    field: 'auctionNumber',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8' },
    width: 150,
    cellRenderer: (params) => params.value || 'N',
  },
  {
    headerName: '주문 일자',
    field: 'orderDate',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8' },
    width: 107,
    cellRenderer: (params) => params.value || 'N',
  },
  {
    headerName: '패키지 명',
    field: 'packageName',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8' },
    width: 90,
    cellRenderer: (params) => params.value || 'N',
  },
  {
    headerName: '패키지 번호',
    field: 'packageNumber',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8' },
    width: 100,
    cellRenderer: (params) => params.value || 'N',
  },
  {
    headerName: '주문 상태',
    field: 'title',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8' },
    width: 90,
    cellRenderer: (params) => params.value || 'N',
  },
  {
    headerName: '확정전송 일자',
    field: 'title',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8' },
    width: 107,
    cellRenderer: (params) => params.value || 'N',
  },
  {
    headerName: '주문 번호',
    field: 'orderNumber',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8' },
    width: 110,
    cellRenderer: (params) => params.value || '-',
  },
  {
    headerName: '고객사 명',
    field: 'customerName',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8' },
    width: 110,
    cellRenderer: (params) => params.value || 'N/A',
  },
  {
    headerName: '고객 코드',
    field: 'customerCode',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8' },
    width: 110,
    cellRenderer: (params) => params.value || 'N/A',
  },
  {
    headerName: '창고',
    field: 'storageName',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8' },
    width: 90,
    cellRenderer: (params) => params.value || 'N',
  },
  {
    headerName: '판매 구분',
    field: 'title',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8' },
    width: 100,
    cellRenderer: (params) => params.value || 'N',
  },
  {
    headerName: '판매 유형',
    field: 'saleType',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8' },
    width: 100,
    cellRenderer: (params) => params.value || 'N',
  },
  {
    headerName: '판매가 유형',
    field: 'salePriceType',
    headerClass: 'custom-header-style',
    // cellStyle: { borderRight: '1px solid #c8c8c8' },
    width: 100,
    cellRenderer: (params) => params.value || 'N',
  },
]

export const OrderFields = {
  '경매 번호': 'auctionNumber',
  '고객 코드': 'customerCode',
  고객사명: 'customerName',
  창고: 'storageName',
  제품군: 'spart',
  '재고 상태': 'stockStatus',
  '판매 구분': 'saleCategory',
  '판매 유형': 'saleType',
  '판매가 유형': 'salePriceType',
  중량: 'weight',
  '제품대 VAT': 'orderPriceVat',
  '운송비 VAT': 'freightCostVat',
  '목적지 코드': 'destinationCode',
  목적지명: 'destinationName',
  '고객사 목적지 고유 번호': 'customerDestinationUid',
  '목적지 주소': 'customerDestinationAddress',
  '목적지 연락처': 'customerDestinationPhone',
  '목적지 담당자 연락처': 'customerDestinationManagerPhone',
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
}
