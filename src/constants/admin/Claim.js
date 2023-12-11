import BtnCellRenderer from '../../pages/Table/BtnCellRenderer'
import { checkboxSelection, headerCheckboxSelection } from '../../pages/Table/util'
/* ==============================
    운영 관리 - 클레임 관리
============================== */

// 클레임 관리 목록 헤더
export const ClaimListFieldCols = [
  { field: '', checkboxSelection, headerCheckboxSelection, maxWidth: 50 },
  {
    field: '수정',
    maxWidth: 90,
    cellRenderer: BtnCellRenderer,
    cellRendererParams: {
      uidFieldName: 'uid',
      editType: 'claimUpdate',
    },
  },
  {
    field: '경매일자',
  },
  {
    field: '입고일자',
  },
  {
    field: '매입구분',
  },
  {
    field: '매입처',
  },
  {
    field: '제조사',
  },
  {
    field: '창고',
  },
  {
    field: '판매구분',
  },
  {
    field: '판매유형',
  },
  {
    field: '판매가유형',
  },
  {
    field: '확정전송일자',
  },
  { field: '경매번호' },
  { field: '입고일' },
  { field: '매입처' },
  { field: '제조사' },
  { field: '창고' },
  { field: '판매구분' },
  { field: '판매유형' },
  { field: '판매가유형' },
  { field: '주문상태' },
  { field: '확정전송일자' },
  { field: '출하 상태' },
  { field: '고객사명' },
  { field: '고객코드' },
  { field: '제품번호' },
  { field: '제품군' },
  { field: '정척여부' },
  { field: '유찰횟수' },
  { field: '규격약호' },
  { field: '여재원인' },
  { field: '여재원인명' },
  { field: '용도코드' },
  { field: '용도명' },
  { field: '메모' },
  { field: '재고상태' },
  { field: '등록일' },
  { field: '고객사반품일' },
  { field: '카스코반품일' },
  { field: '종료일' },
  { field: '최종수정자' },
  { field: '최종수정일' },
]

// 클레임 관리 목록 키값 맵핑
export const ClaimListFields = {
  경매일자: 'auctionStartDate',
  입고일자: 'receiptDate',
  매입구분: '', // 매입구분에 대한 키가 주어진 obj에서 누락되어 빈 문자열로 대체
  매입처: 'supplier',
  제조사: 'maker',
  창고: 'storageName',
  판매구분: 'saleCategory',
  판매유형: 'saleType',
  판매가유형: 'salePriceType',
  주문상태: 'orderStatus',
  확정전송일자: 'sendDate',
  경매번호: 'auctionNumber',
  입고일: 'receiptDate',
  출하상태: 'shipmentStatus',
  고객사명: 'customerName',
  고객코드: 'customerCode',
  제품번호: 'productNumber',
  제품군: 'spart',
  정척여부: 'preferThickness',
  유찰횟수: 'failCount',
  규격약호: 'spec',
  여재원인: 'causeCode',
  여재원인명: 'causeCodeName',
  용도코드: 'usageCode',
  용도명: 'usageCodeName',
  메모: 'memo',
  재고상태: 'stockStatus',
  등록일: 'createDate',
  고객사반품일: 'hsReturnDate',
  카스코반품일: 'kaskoReturnDate',
  종료일: 'endDate',
  최종수정자: 'updateMember',
  최종수정일: 'updateDate',
}
