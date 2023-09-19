var checkboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0
}

export const 사용자관리_고객사관리_fieds = {
  순번: 'uid',
  '고객 구분': 'memberUid',
  '회원 상태': 'status',
  '고객 코드': 'code',
  '고객사 명': 'name',
  사업자번호: 'businessNumber',
  연락처: 'phone',
  '승인 여부': 'approvalStatus',
  '회원 제한 상태': 'auctionStatus',
}
export const 사용자관리_고객사관리_fieds_Cols = [
  {
    field: '순번',
    minWidth: 100,
    checkboxSelection: checkboxSelection,
    headerCheckboxSelection: headerCheckboxSelection,
  },
  { field: '고객 구분', minWidth: 100 }, //숫자
  { field: '회원 상태', minWidth: 100 },
  { field: '고객 코드', minWidth: 100 },
  {
    field: '고객사 명',
    minWidth: 200,
  },
  {
    field: '사업자번호',
    minWidth: 100,
  },
  { field: '연락처', minWidth: 100 },
  { field: '승인 여부', minWidth: 100 },
  { field: '회원 제한 상태', minWidth: 100 },
]

export const 사용자관리_고객사목적지관리_fieds = {
  uid: 'uid',
  '고객 코드': 'code',
  대표: 'represent',
  '목적지 코드': 'destinationCode',
  '목적지 명': 'destinationName',
  '담당자 연락처': 'managerPhone',
  '도착지 연락처': 'phone',
  '하차지 명': 'name',
  '상세 주소': 'address',
  비고란: 'memo',
}
export const 사용자관리_고객사목적지관리_fieds_Cols = [
  { field: '', maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  {
    field: '고객 코드',
  },
  { field: '대표', minWidth: 100 }, //숫자
  { field: '목적지 코드', minWidth: 100 },
  { field: '목적지 명', minWidth: 100 },
  {
    field: '담당자 연락처',
    minWidth: 200,
  },
  {
    field: '도착지 연락처',
    minWidth: 100,
  },
  { field: '하차지 명', minWidth: 100 },
  { field: '상세 주소', minWidth: 100 },
  { field: '비고란' },
]
