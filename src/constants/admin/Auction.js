import BtnCellRenderer from '../../pages/Table/BtnCellRenderer'

var checkboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0
}

// 경매 관리 - 단가 등록
export const AuctionUnitPricePost = {
  제품군: 'dropdown',
  정척여부: 'dropdown2',
  유찰횟수: 'input',
  제품등급: 'dropdown3',
  적용일자: 'auto',
  '적용 단가': 'input',
}

// 해당 값 쓰일 컴포넌트 -> Upload로 props로 전달
// const dropdownProps = [
//   { options: AuctionUnitPricePostDropOptions, defaultValue: AuctionUnitPricePostDropOptions[0] },
//   { options: AuctionUnitPricePostDropOptions2, defaultValue: AuctionUnitPricePostDropOptions2[0] },
// ]

//dropdown
export const AuctionUnitPricePostDropOptions = [
  { value: 'ask0', label: '제품군 ' },
  { value: 'ask1', label: '1' },
  { value: 'ask2', label: '2' },
  { value: 'ask3', label: '3' },
  { value: 'ask4', label: '4' },
]

//dropdown2
export const AuctionUnitPricePostDropOptions2 = [
  { value: 'ask0', label: '정척여부 ' },
  { value: 'ask1', label: '1' },
  { value: 'ask2', label: '2' },
  { value: 'ask3', label: '3' },
  { value: 'ask4', label: '4' },
]

//dropdown3
export const AuctionUnitPricePostDropOptions3 = [
  { value: 'ask0', label: '제품등급 ' },
  { value: 'ask1', label: '1' },
  { value: 'ask2', label: '2' },
  { value: 'ask3', label: '3' },
  { value: 'ask4', label: '4' },
]

// !! 영역이 좁으므로 Upload props에 width값 1000 주고 쓰기 !!!

/* ============================================
    경매 관리 - 경매 회차 관리 "전체 TABLE" (round)
============================================ */
export const AuctionRoundFields = {
  '고유 번호': 'uid',
  '판매 구분': 'saleType',
  '경매 번호': 'number',
  시작일: 'startDate',
  종료일: 'endDate',
  '경매 상태': 'status',
  '경매 수량': 'productCount',
  '낙찰 수량': 'successfulBidCount',
  '유찰 수량': 'failBidCount',
  비고: 'memo',
  수정일: 'updateDate',
  수정자: 'updateMemberName',
}

export const AuctionRoundFieldsCols = [
  { field: '', maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  {
    field: '수정',
    maxWidth: 90,
    cellRenderer: BtnCellRenderer,
    cellRendererParams: {
      uidFieldName: '고유 번호',
      editType: 'auctionroundedit',
    },
  },
  { field: '판매 구분', minWidth: 100 },
  { field: '경매 번호', minWidth: 100 },
  { field: '시작일', minWidth: 100 },
  { field: '종료일', minWidth: 100 },
  { field: '경매 상태', minWidth: 100 },
  { field: '경매 수량', minWidth: 100 },
  { field: '낙찰 수량', minWidth: 100 },
  { field: '유찰 수량', minWidth: 100 },
  { field: '비고', minWidth: 100 },
  { field: '수정일', minWidth: 100 },
  { field: '수정자', minWidth: 100 },
]

/* ============================================
    경매 관리 - 경매 회차 관리 "상세 TABLE" (round)
=============================================== */

export const AuctionRoundDetailFields = {
  '경매 제품 고유 번호': 'auctionProductUid',
  '제품 고유 번호': 'productUid',
  창고: 'storageName',
  제품군: 'spart',
  '재고 상태': 'stockStatus',
  매입처: 'supplier',
  제조사: 'maker',
  '판매 구분': 'saleCategory',
  '판매 유형': 'saleType',
  '판매가 유형': 'salePriceType',
  '경매 번호': 'auctionNumber',
  '제품 번호': 'productNumber',
  등급: 'grade',
  '정척 여부': 'preferThickness',
  '유찰 횟수': 'faliCount',
  '경매 시작가': 'auctionStartPrice',
  두께: 'thickness',
  폭: 'width',
  길이: 'length',
  중량: 'weight',
  '규격 약호': 'spec',
  yp: 'yp',
  ts: 'ts',
  c: 'c',
  p: 'p',
  s: 's',
  si: 'si',
  el: 'el',
  mn: 'mn',
  '여재 원인 코드': 'causeCode',
  '여재 원인명': 'causeCodeName',
  '용도 코드': 'usageCode',
  용도명: 'usageCodeName',
  '경매 등록 상태': 'registrationStatus',
  '판매 제외 사유': 'excludeSaleReason',
  등록일: 'createDate',
  매입가: 'price',
}

/* ===================================================================
    경매 관리 - 경매 회차 관리 - 경매 목록 수정 (단일) - 제품 추가 Table (round)
====================================================================== */

export const AuctionRoundExtraProductFields = {
  '고유 번호': 'uid',
  '제품 번호': 'number',
  '규격 약호': 'spec',
  창고: 'storageName',
  두께: 'thickness',
  폭: 'width',
  길이: 'length',
  중량: 'weight',
  등급: 'grade',
  '용도 코드': 'usageCode',
  용도명: 'usageCodeName',
  c: 'c',
  si: 'si',
  mn: 'mn',
  p: 'p',
  s: 's',
  ts: 'ts',
  yp: 'yp',
  el: 'el',
  제품군: 'spart',
  품명명: 'name',
  '정척 여부': 'preferThickness', // (Y / N)
  '여재 원인 코드': 'causeCode',
  '여재 원인명': 'causeCodeName',
  '유찰 횟수': 'failCount',
  '경매 등록 상태': 'registrationStatus', // (경매 등록 / 경매 등록 대기)
  매입처: 'supplier', // (현대제철 / 카스코 철강)
  제조사: 'maker', // (현대제철 / 동은스틸)
  '판매 구분': 'saleCategory', // (판매재 / 판매 제외재 / 판매 완료재)
  '판매 제외 사유': 'excludeSaleReason',
  '재고 상태': 'stockStatus', // (타사 재고 / 자사 재고)
  '판매 유형': 'saleType', // (경매 대상재 / 상시 판매 대상재)
  '판매가 유형': 'salePriceType', // (특가 / 일반)
  생성일: 'createDate',
  시작가: 'auctionStartPrice',
  패키지명: 'packageName',
  '패키지 번호': 'packageNumber',
  'Pro.No 번호': 'productNoNumber',
  매입가: 'price',
}

export const AuctionRoundExtraProductFieldsCols = [
  { field: '', maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },

  { field: '고유 번호', minWidth: 150 },
  { field: '제품 번호', minWidth: 150 },
  { field: '규격 약호', minWidth: 150 },
  { field: '창고', minWidth: 100 },
  { field: '두께', minWidth: 100 },
  { field: '폭', minWidth: 100 },
  { field: '길이', minWidth: 100 },
  { field: '중량', minWidth: 100 },
  { field: '등급', minWidth: 100 },
  { field: '용도 코드', minWidth: 100 },
  { field: '용도명', minWidth: 100 },
  { field: 'c', minWidth: 100 },
  { field: 'si', minWidth: 100 },
  { field: 'mn', minWidth: 100 },
  { field: 'p', minWidth: 100 },
  { field: 's', minWidth: 100 },
  { field: 'ts', minWidth: 100 },
  { field: 'yp', minWidth: 100 },
  { field: 'el', minWidth: 100 },
  { field: '제품군', minWidth: 100 },
  { field: '품명명', minWidth: 100 },
  { field: '정척 여부', minWidth: 150 },
  { field: '여재 원인 코드', minWidth: 150 },
  { field: '여재 원인명', minWidth: 150 },
  { field: '유찰 횟수', minWidth: 100 },
  { field: '경매 등록 상태', minWidth: 250 },
  { field: '매입처', minWidth: 200 },
  { field: '제조사', minWidth: 200 },
  { field: '판매 구분', minWidth: 250 },
  { field: '판매 제외 사유', minWidth: 200 },
  { field: '재고 상태', minWidth: 200 },
  { field: '판매 유형', minWidth: 200 },
  { field: '판매가 유형', minWidth: 150 },
  { field: '생성일', minWidth: 150 },
  { field: '시작가', minWidth: 100 },
  { field: '패키지명', minWidth: 100 },
  { field: '패키지 번호', minWidth: 100 },
  { field: 'Pro.No 번호', minWidth: 150 },
  { field: '매입가', minWidth: 100 },
]

export const AuctionRoundDetailFieldsCols = [
  { field: '', maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  // {
  //   field: '수정',
  //   maxWidth: 90,
  //   cellRenderer: BtnCellRenderer,
  //   cellRendererParams: {
  //     uidFieldName: '경매 제품 고유 번호',
  //     editType: 'auctionroundedit',
  //   },
  // },
  { field: '경매 제품 고유 번호', minWidth: 100 },
  { field: '제품 고유 번호', minWidth: 100 },
  { field: '창고', minWidth: 100 },
  { field: '제품군', minWidth: 100 },
  { field: '재고 상태', minWidth: 100 },
  { field: '매입처', minWidth: 100 },
  { field: '제조사', minWidth: 100 },
  { field: '판매 구분', minWidth: 100 },
  { field: '판매 유형', minWidth: 100 },
  { field: '판매가 유형', minWidth: 100 },
  { field: '경매 번호', minWidth: 100 },
  { field: '제품 번호', minWidth: 100 },
  { field: '등급', minWidth: 100 },
  { field: '정척 여부', minWidth: 100 },
  { field: '유찰 횟수', minWidth: 100 },
  { field: '경매 시작가', minWidth: 100 },
  { field: '두께', minWidth: 100 },
  { field: '폭', minWidth: 100 },
  { field: '길이', minWidth: 100 },
  { field: '중량', minWidth: 100 },
  { field: '규격 약호', minWidth: 100 },
  { field: 'yp', minWidth: 100 },
  { field: 'ts', minWidth: 100 },
  { field: 'c', minWidth: 100 },
  { field: 'p', minWidth: 100 },
  { field: 's', minWidth: 100 },
  { field: 'si', minWidth: 100 },
  { field: 'el', minWidth: 100 },
  { field: 'mn', minWidth: 100 },
  { field: '여재 원인 코드', minWidth: 100 },
  { field: '여재 원인명', minWidth: 100 },
  { field: '용도 코드', minWidth: 100 },
  { field: '용도명', minWidth: 100 },
  { field: '경매 등록 상태', minWidth: 100 },
  { field: '판매 제외 사유', minWidth: 100 },
  { field: '등록일', minWidth: 100 },
  { field: '매입가', minWidth: 100 },
]

/* ==============================
    경매 관리 - 경매 응찰 (bidding)
================================= */

export const AuctionBiddingFields = {
  '경매 제품 고유 번호': 'uid',
  '경매 고유 번호': 'auctionUid',
  '제품 고유 번호': 'productUid',
  창고: 'storageName',
  제품군: 'spart',
  '판매 유형': 'saleType',
  '경매 번호': 'auctionNumber',
  '제품 번호': 'productNumber',
  '프로넘 번호': 'productNoNumber',
  '패키지 번호': 'packageNumber',
  시작가: 'auctionStartPrice',
  응찰가: 'biddingPrice',
  '규격 약호': 'spec',
  '여재 원인 코드': 'causeCode',
  '여재 원인명': 'causeCodeName',
  '용도 코드': 'usageCode',
  용도명: 'usageCodeName',
  패키지명: 'packageName',
  '추천 여부': 'bestStatus',
  등록일: 'createDate',
  '경매 상태': 'auctionStatus',
  '판매 구분': 'saleCategory',
  '판매가 유형': 'salePriceType',
  '정척 여부': 'preferThickness',
  '유찰 횟수': 'failCount',
  매입가: 'price',
  '재고 상태': 'stockStatus',
  '판매 제외 사유': 'excludeSaleReason',
  수정일일: 'updateDate',
  메모: 'memo',
  비고: 'note',
  '나의 최고 응찰 가격': 'memberBestBiddingPrice',
  '현재 최고 가격': 'bestBiddingPrice',
  등급: 'grade',
  중량: 'weight',
  두께: 'thickness',
  폭: 'width',
  길이: 'length',
  yp: 'yp',
  ts: 'ts',
  c: 'c',
  p: 'p',
  s: 's',
  si: 'si',
  el: 'el',
  mn: 'mn',
}

export const AuctionBiddingFieldsCols = [
  { field: '', maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  {
    field: '수정',
    maxWidth: 90,
    cellRenderer: BtnCellRenderer,
    cellRendererParams: {
      uidFieldName: '경매 제품 고유 번호',
      editType: 'auctionbidding',
    },
  },
  { field: '경매 제품 고유 번호', minWidth: 100 },
  { field: '경매 고유 번호', minWidth: 100 },
  { field: '제품 고유 번호', minWidth: 100 },
  { field: '창고', minWidth: 100 },
  { field: '제품군', minWidth: 100 },
  { field: '판매 유형', minWidth: 100 },
  { field: '경매 번호', minWidth: 100 },
  { field: '제품 번호', minWidth: 100 },
  { field: '프로넘 번호', minWidth: 100 },
  { field: '패키지 번호', minWidth: 100 },
  { field: '시작가', minWidth: 100 },
  { field: '응찰가', minWidth: 100 },
  { field: '규격 약호', minWidth: 100 },
  { field: '여재 원인 코드', minWidth: 100 },
  { field: '여재 원인명', minWidth: 100 },
  { field: '용도 코드', minWidth: 100 },
  { field: '용도명', minWidth: 100 },
  { field: '패키지명', minWidth: 100 },
  { field: '추천 여부', minWidth: 100 },
  { field: '등록일', minWidth: 100 },
  { field: '경매 상태', minWidth: 100 },
  { field: '판매 구분', minWidth: 100 },
  { field: '판매가 유형', minWidth: 100 },
  { field: '정척 여부', minWidth: 100 },
  { field: '유찰 횟수', minWidth: 100 },
  { field: '매입가', minWidth: 100 },
  { field: '재고 상태', minWidth: 100 },
  { field: '판매 제외 사유', minWidth: 100 },
  { field: '수정일일', minWidth: 100 },
  { field: '메모', minWidth: 100 },
  { field: '비고', minWidth: 100 },
  { field: '나의 최고 응찰 가격', minWidth: 100 },
  { field: '현재 최고 가격', minWidth: 100 },
  { field: '등급', minWidth: 100 },
  { field: '중량', minWidth: 100 },
  { field: '두께', minWidth: 100 },
  { field: '폭', minWidth: 100 },
  { field: '길이', minWidth: 100 },
  { field: 'yp', minWidth: 100 },
  { field: 'ts', minWidth: 100 },
  { field: 'c', minWidth: 100 },
  { field: 'p', minWidth: 100 },
  { field: 's', minWidth: 100 },
  { field: 'si', minWidth: 100 },
  { field: 'el', minWidth: 100 },
  { field: 'mn', minWidth: 100 },
]

/* ==============================
    경매 관리 - 경매 진행 조회 (progress)
============================== */

export const AuctionProgressFields = {
  '경매 제품 고유 번호': 'uid',
  '고객 코드': 'code',
  회사명: 'customerName',
  '회원 이름': 'memberName',
  창고: 'storageName',
  제품군: 'spart',
  '판매 유형': 'saleType', // (경매 대상재 / 상시 판매 대상재)
  '경매 번호': 'auctionNumber',
  '제품 번호': 'productNumber',
  'Pro.No 번호': 'productNoNumber',
  등급: 'grade',
  '정척 여부': 'preferThickness', //  (Y / N)
  '유찰 횟수': 'failCount',
  시작가: 'auctionStartPrice',
  응찰가가: 'biddingPrice',
  두께: 'thickness',
  폭: 'width',
  길이: 'length',
  중량: 'weight',
  '규격 약호': 'spec',
  yp: 'yp',
  ts: 'ts',
  c: 'c',
  p: 'p',
  s: 's',
  si: 'si',
  el: 'el',
  mn: 'mn',
  '여재 원인 코드': 'causeCode',
  '여재 원인명': 'causeCodeName',
  '용도 코드': 'usageCode',
  용도명: 'usageCodeName',
  패키지명: 'packageName',
  '패키지 번호': 'packageNumber',
  '낙찰 상태': 'biddingStatus', //(응찰 대기 / 응찰 / 최고가 입찰 / 낙찰 / 낙찰 확정 / 낙찰 취소 / 유찰 / 패찰)
  목적지명: 'destinationName',
  '목적지 코드': 'destinationCode',
  '목적지 주소': 'customerDestinationAddress',
  '목적지 연락처': 'customerDestinationPhone',
  하차지명: 'customerDestinationName',
  '입찰 순번': 'biddingRank',
  '입찰 고객명': 'biddingCustomerName',
  '입찰 고객 코드': 'biddingCustomerCode',
  '입찰자 ID': 'biddingMemberId',
  입찰일시: 'biddingTime',
}

export const AuctionProgressFieldsCols = [
  { field: '', maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  {
    field: '수정',
    maxWidth: 90,
    cellRenderer: BtnCellRenderer,
    cellRendererParams: {
      uidFieldName: '경매 제품 고유 번호',
      editType: 'auctionprogress',
    },
  },
  { field: '경매 제품 고유 번호', minWidth: 100 },
  { field: '고객 코드', minWidth: 100 },
  { field: '회사명', minWidth: 100 },
  { field: '회원 이름', minWidth: 100 },
  { field: '창고', minWidth: 100 },
  { field: '제품군', minWidth: 100 },
  { field: '판매 유형 (경매 대상재 / 상시 판매 대상재)', minWidth: 100 },
  { field: '경매 번호', minWidth: 100 },
  { field: '제품 번호', minWidth: 100 },
  { field: 'Pro.No 번호', minWidth: 100 },
  { field: '등급', minWidth: 100 },
  { field: '정척 여부 (Y / N)', minWidth: 100 },
  { field: '유찰 횟수', minWidth: 100 },
  { field: '시작가', minWidth: 100 },
  { field: '응찰가가', minWidth: 100 },
  { field: '두께', minWidth: 100 },
  { field: '폭', minWidth: 100 },
  { field: '길이', minWidth: 100 },
  { field: '중량', minWidth: 100 },
  { field: '규격 약호', minWidth: 100 },
  { field: 'yp', minWidth: 100 },
  { field: 'ts', minWidth: 100 },
  { field: 'c', minWidth: 100 },
  { field: 'p', minWidth: 100 },
  { field: 's', minWidth: 100 },
  { field: 'si', minWidth: 100 },
  { field: 'el', minWidth: 100 },
  { field: 'mn', minWidth: 100 },
  { field: '여재 원인 코드', minWidth: 100 },
  { field: '여재 원인명', minWidth: 100 },
  { field: '용도 코드', minWidth: 100 },
  { field: '용도명', minWidth: 100 },
  { field: '패키지명', minWidth: 100 },
  { field: '패키지 번호', minWidth: 100 },
  { field: '낙찰 상태', minWidth: 100 },
  { field: '목적지명', minWidth: 100 },
  { field: '목적지 코드', minWidth: 100 },
  { field: '목적지 주소', minWidth: 100 },
  { field: '목적지 연락처', minWidth: 100 },
  { field: '하차지명', minWidth: 100 },
  { field: '입찰 순번', minWidth: 100 },
  { field: '입찰 고객명', minWidth: 100 },
  { field: '입찰 고객 코드', minWidth: 100 },
  { field: '입찰자 ID', minWidth: 100 },
  { field: '입찰일시', minWidth: 100 },
]

/* ===============================================
    경매 관리 - 경매 진행 상세 조회 (detailprogress)
================================================= */

export const AuctionDetailProgressFields = {
  '응찰 고유 번호': 'auctionBidUid',
  '경매 상태': 'auctionStatus',
  '고객 코드': 'code',
  회사명: 'customerName',
  '회원 이름': 'memberName',
  창고: 'storageName',
  제품군: 'spart',
  '판매 유형': 'saleType',
  '경매 번호': 'auctionNumber',
  '제품 번호': 'productNumber',
  'Pro.No 번호': 'productNoNumber',
  등급: 'grade',
  응찰가: 'biddingPrice',
  최고가: 'bestBiddingPrice',
  두께: 'thickness',
  폭: 'width',
  길이: 'length',
  중량: 'weight',
  '규격 약호': 'spec',
  패키지명: 'packageName',
  '패키지 번호': 'packageNumber',
  '낙찰 상태': 'biddingStatus',
  목적지명: 'destinationName',
  '목적지 코드': 'destinationCode',
  '목적지 주소': 'customerDestinationAddress',
  '목적지 연락처': 'customerDestinationPhone',
  하차지명: 'customerDestinationName',
  '입찰 순번': 'biddingRank',
  '입찰 고객명': 'biddingCustomerName',
  '입찰 고객 코드': 'biddingCustomerCode',
  '입찰자 ID': 'biddingMemberId',
  입찰일시: 'biddingTime',
  '취소 사유': 'failReason',
  yp: 'yp',
  ts: 'ts',
  c: 'c',
  p: 'p',
  s: 's',
  si: 'si',
  el: 'el',
  mn: 'mn',
  '판매가 유형': 'salePriceType',
  '정척 여부': 'preferThickness', //  (Y / N)
  '유찰 횟수': 'failCount',
  '여재 원인 코드': 'causeCode',
  '여재 원인명': 'causeCodeName',
  '용도 코드': 'usageCode',
  용도명: 'usageCodeName',
}

export const AuctionDetailProgressFieldsCols = [
  { field: '', maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  {
    field: '수정',
    maxWidth: 90,
    cellRenderer: BtnCellRenderer,
    cellRendererParams: {
      uidFieldName: '응찰 고유 번호',
      editType: 'auctiondetailprogress',
    },
  },
  { field: '응찰 고유 번호', minWidth: 150 },
  { field: '경매 상태', minWidth: 120 },
  { field: '고객 코드', minWidth: 100 },
  { field: '회사명', minWidth: 150 },
  { field: '회원 이름', minWidth: 120 },
  { field: '창고', minWidth: 100 },
  { field: '제품군', minWidth: 100 },
  { field: '판매 유형', minWidth: 120 },
  { field: '경매 번호', minWidth: 120 },
  { field: '제품 번호', minWidth: 120 },
  { field: 'Pro.No 번호', minWidth: 120 },
  { field: '등급', minWidth: 100 },
  { field: '응찰가', minWidth: 100 },
  { field: '최고가', minWidth: 100 },
  { field: '두께', minWidth: 100 },
  { field: '폭', minWidth: 100 },
  { field: '길이', minWidth: 100 },
  { field: '중량', minWidth: 100 },
  { field: '규격 약호', minWidth: 120 },
  { field: '패키지명', minWidth: 120 },
  { field: '패키지 번호', minWidth: 120 },
  { field: '낙찰 상태', minWidth: 120 },
  { field: '목적지명', minWidth: 120 },
  { field: '목적지 코드', minWidth: 120 },
  { field: '목적지 주소', minWidth: 150 },
  { field: '목적지 연락처', minWidth: 150 },
  { field: '하차지명', minWidth: 120 },
  { field: '입찰 순번', minWidth: 100 },
  { field: '입찰 고객명', minWidth: 150 },
  { field: '입찰 고객 코드', minWidth: 120 },
  { field: '입찰자 ID', minWidth: 120 },
  { field: '입찰일시', minWidth: 150 },
  { field: 'yp', minWidth: 150 },
  { field: 'ts', minWidth: 150 },
  { field: 'c', minWidth: 150 },
  { field: 'p', minWidth: 150 },
  { field: 's', minWidth: 150 },
  { field: 'si', minWidth: 150 },
  { field: 'el', minWidth: 150 },
  { field: 'mn', minWidth: 150 },
  { field: '판매가 유형', minWidth: 150 },
  { field: '정척 여부', minWidth: 150 },
  { field: '유찰 횟수', minWidth: 150 },
  { field: '여재 원인 코드', minWidth: 150 },
  { field: '여재 원인명', minWidth: 150 },
  { field: '용도 코드', minWidth: 150 },
  { field: '용도명', minWidth: 150 },
]

/* ====================================
    경매 관리 - 경매 낙찰 관리 (winning)
======================================= */

export const AuctionWinningFields = {
  'Pro.No 번호': 'productNoNumber',
  '경매 번호': 'auctionNumber',
  '고객 코드': 'code',
  고객사명: 'customerName',
  창고: 'storage',
  '고객사 목적지 고유 번호': 'customerDestinationUid',
  제품군: 'spart',
  '판매 구분': 'saleCategory',
  '판매 유형': 'saleType',
  '판매가 유형': 'salePriceType',
  수량: 'productCount',
  중량: 'weight',
  '제품 금액 (VAT 포함)': 'orderAmount',
  '운반비 (VAT 포함)': 'freightAmount',
  '목적지 고유 번호': 'destinationUid',
  목적지명: 'destinationName',
  '목적지 주소': 'destinationAddress',
  '목적지 연락처': 'destinationPhone',
  '목적지 담당자 연락처': 'destinationManagerPhone',
  '변경 요청 상태': 'requestStatus',
  수정자: 'updateMemberName',
  수정일: 'updateDate',
  '주문 상태': 'orderStatus',
  '입금 요청액': 'amount',
  '낙찰 상태': 'biddingStatus',
  패키지명: 'packageName',
  '패키지 번호': 'packageNumber',
  '카스코 낙찰가': 'confirmPrice',
  '매입 운반비': 'inboundFreightAmount',
  '매출 운반비': 'outboundFreightAmount',
}

export const AuctionWinningFieldsCols = [
  { field: 'Pro.No 번호', minWidth: 150 },
  { field: '경매 번호', minWidth: 120 },
  { field: '고객 코드', minWidth: 100 },
  { field: '고객사명', minWidth: 150 },
  { field: '창고', minWidth: 100 },
  { field: '고객사 목적지 고유 번호', minWidth: 200 },
  { field: '제품군', minWidth: 100 },
  { field: '판매 구분', minWidth: 120 },
  { field: '판매 유형', minWidth: 120 },
  { field: '판매가 유형', minWidth: 120 },
  { field: '수량', minWidth: 100 },
  { field: '중량', minWidth: 100 },
  { field: '제품 금액 (VAT 포함)', minWidth: 120 },
  { field: '운반비 (VAT 포함)', minWidth: 120 },
  { field: '목적지 고유 번호', minWidth: 120 },
  { field: '목적지명', minWidth: 120 },
  { field: '목적지 주소', minWidth: 150 },
  { field: '목적지 연락처', minWidth: 150 },
  { field: '목적지 담당자 연락처', minWidth: 150 },
  { field: '변경 요청 상태', minWidth: 120 },
  { field: '수정자', minWidth: 120 },
  { field: '수정일', minWidth: 120 },
  { field: '주문 상태', minWidth: 120 },
  { field: '입금 요청액', minWidth: 120 },
  { field: '낙찰 상태', minWidth: 120 },
  { field: '패키지명', minWidth: 120 },
  { field: '패키지 번호', minWidth: 120 },
  { field: '카스코 낙찰가', minWidth: 120 },
  { field: '매입 운반비', minWidth: 120 },
  { field: '매출 운반비', minWidth: 120 },
]

/* ===========================================
    경매 관리 - 경매 시작 단가 관리 (startprice)
============================================== */

export const AuctionStartPriceFields = {
  '고유 번호': 'uid',
  제품군: 'spart',
  '정척 여부': 'preferThickness',
  '유찰 횟수': 'failCount',
  등급: 'grade',
  적용일: 'effectDate',
  '적용전 단가': 'originalPrice',
  '적용 단가': 'effectPrice',
}

export const AuctionStartPriceFieldsCols = [
  { field: '고유 번호', minWidth: 150 },
  { field: '제품군', minWidth: 120 },
  { field: '정척 여부', minWidth: 120 },
  { field: '유찰 횟수', minWidth: 120 },
  { field: '등급', minWidth: 100 },
  { field: '적용일', minWidth: 120 },
  { field: '적용전 단가', minWidth: 150 },
  { field: '적용 단가', minWidth: 150 },
]

const uniqueKeys = new Set([...Object.keys(AuctionRoundExtraProductFields), ...Object.keys(AuctionRoundDetailFields)])

const uniqueObject = {}

uniqueKeys.forEach((key) => {
  if (AuctionRoundExtraProductFields.hasOwnProperty(key) && !AuctionRoundDetailFields.hasOwnProperty(key)) {
    uniqueObject[key] = AuctionRoundExtraProductFields[key]
  } else if (!AuctionRoundExtraProductFields.hasOwnProperty(key) && AuctionRoundDetailFields.hasOwnProperty(key)) {
    uniqueObject[key] = AuctionRoundDetailFields[key]
  }
})

console.log('uniqueObject', uniqueObject)
