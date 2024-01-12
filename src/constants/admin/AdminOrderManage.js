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

const LinkRenderer = ({ value }) => {
  return value ? (
    <a href={`detail/${value}`} target="_blank" style={{ color: 'blue', textDecoration: 'underline' }} rel="noreferrer">
      {value}
    </a>
  ) : (
    'N'
  )
}

/* ==============================
    주문 관리 - 주문 관리 (Order)
============================== */

export const AdminOrderManageFieldsCols = [
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
    field: 'auctionNumber',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
    width: 120,
    cellRenderer: (params) => params.value || 'N',
  },
  {
    headerName: '상시 판매 번호',
    field: 'orderDate',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
    width: 120,
    cellRenderer: (params) => params.value || 'N',
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
    width: 100,
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
    field: 'title',
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
    headerName: '제품 번호',
    field: 'storageName',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
    width: 90,
    cellRenderer: (params) => params.value || 'N',
  },
  {
    headerName: 'ProNo.',
    field: 'saleType',
    headerClass: 'custom-header-style',
    cellStyle: { textAlign: 'center' },
    width: 150,
    cellRenderer: LinkRenderer,
  },
]

export const DetailOrderFieldsManage = {
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
  입금요청액: 'totalPrice',
}
