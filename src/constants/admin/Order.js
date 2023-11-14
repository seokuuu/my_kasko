import BtnCellRenderer from '../../pages/Table/BtnCellRenderer'
import React from 'react'
import { Link } from 'react-router-dom'
import { OrderCellAtom } from '../../store/Layout/Layout'
import { useAtom } from 'jotai'

var checkboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0
}

const onCellClicked = (params) => {
  // params.data는 해당 행의 데이터를 나타냄

  console.log('params', params.data['경매 번호'])
}

/* ==============================
    주문 관리 - 주문 관리 (Order)
============================== */

// auctionNumber를 클릭하면, 해당 auctionNumber, customerCode, storage, customerDestinationUid가 전부 Params로 들어가게끔 하자

export const OrderFieldsCols = [
  { field: '', maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  {
    field: '수정',
    maxWidth: 90,
    cellRenderer: BtnCellRenderer,
    cellRendererParams: {
      uidFieldName: '경매 번호',
      editType: 'table',
    },
  },
  { field: '경매 번호', minWidth: 100, cellStyle: { color: 'red', cursor: 'pointer' }, onCellClicked: onCellClicked },
  {
    field: '고객 코드',
    minWidth: 160,
  },
  { field: '고객사명', minWidth: 100 }, //숫자
  { field: '창고', minWidth: 100 },
  { field: '제품군', minWidth: 100 },
  {
    field: '재고 상태',
    minWidth: 200,
  },
  {
    field: '수정자',
    minWidth: 100,
  },
  { field: '판매 구분', minWidth: 100 },
  { field: '판매 유형', minWidth: 100 },
  { field: '판매가 유형', minWidth: 100 },

  { field: '중량', minWidth: 100 },
  { field: '제품대 VAT', minWidth: 100 },
  { field: '운송비 VAT', minWidth: 100 },
  { field: '목적지 코드', minWidth: 100 },
  { field: '목적지명', minWidth: 100 },
  { field: '고객사 목적지 고유 번호', minWidth: 100 },
  { field: '목적지 주소', minWidth: 100 },
  { field: '목적지 연락처', minWidth: 100 },
  { field: '목적지 담당자 연락처', minWidth: 100 },
  { field: '최종 수정자', minWidth: 100 },
  { field: '최종 수정일', minWidth: 100 },
  { field: '주문 상태', minWidth: 100 },
  { field: '확정 전송일', minWidth: 100 },
  { field: '메모', minWidth: 100 },
  { field: '상시판매 주문번호', minWidth: 100 },
  { field: '현대제철 주문번호', minWidth: 100 },
  { field: '제품 개수', minWidth: 100 },
  { field: '상시판매 주문일자', minWidth: 100 },
  { field: '패키지명', minWidth: 100 },
  { field: '패키지 번호', minWidth: 100 },
  { field: '확정 전송가', minWidth: 100 },
]

export const OrderFields = {
  '경매 번호': 'auctionNumber',
  '고객 코드': 'customerCode',
  고객사명: 'customerName',
  창고: 'storageName',
  제품군: 'spart',
  '재고 상태': 'stockStatus', //(타사 재고 / 자사 재고)
  '판매 구분': 'saleCategory', // (판매재 / 판매 제외재 / 판매 완료재)
  '판매 유형': 'saleType', // (경매 대상재 / 상시 판매 대상재)
  '판매가 유형': 'salePriceType', //  (일반 / 특가)
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
  '주문 상태': 'status', // (확정 전송 / 확정 전송 대기)
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
