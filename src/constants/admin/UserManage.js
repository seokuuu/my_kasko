import BtnCellRenderer from '../../pages/Table/BtnCellRenderer'

var checkboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0
}

// 사용자 관리 (고객사 관리)
export const UserManageCustomerManageFields = {
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
//고객사 관리 cols
export const UserManageCustomerManageFieldsCols = [
  {
    field: '',
    maxWidth: 50,
    checkboxSelection: checkboxSelection,
    headerCheckboxSelection: headerCheckboxSelection,
  },
  {
    field: '수정',
    maxWidth: 90,
    cellRenderer: BtnCellRenderer,
    cellRendererParams: {
      uidFieldName: 'uid',
      editType: 'usermanage',
    },
  },

  { field: '순번', minWidth: 100 }, //숫자
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

// 사용자 목적지 관리 fields
export const UserManageCustomerDestinationManageFields = {
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

// 사용자 목적지 관리 Cols
export const UserManageCustomerDestinationManageFieldsCols = [
  { field: '', maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  {
    field: '수정',
    maxWidth: 90,
    cellRenderer: BtnCellRenderer,
    cellRendererParams: {
      uidFieldName: 'uid',
      editType: 'userdestination',
    },
  },
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
export const UserManageFields = {
  순번: 'uid',
  이름: 'name',
  아이디: 'id',
  '관리자 분류': 'role',
  '가입 일시': 'createDate',
}
export const UserManageFieldsCols = [
  { field: '', maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  {
    field: '순번',
  },
  { field: '이름', minWidth: 100 }, //숫자
  { field: '아이디', minWidth: 100 },
  { field: '관리자 분류', minWidth: 100 },
  {
    field: '가입 일시',
    minWidth: 200,
  },
]

// 마이페이지 - 선호제품관리
//  ✅일단 최대 두께로 설정 && 비고 없음
export const UserPageUserPreferFields = {
  uid: 'uid',
  '선호제품 명': 'name',
  '두께(mm)': 'thicknessMax',
  '폭(mm)': 'widthMax',
  '길이(mm)': 'lengthMax',
  규격약호: 'spec',
  TS: 'tsMax',
  'C%': 'cmax',
  EL: 'elMax',
  YP: 'ypMax',
  비고: '',
}
export const UserPageUserPreferFieldsCols = [
  { field: '', maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  {
    field: '수정',
    maxWidth: 90,
    cellRenderer: BtnCellRenderer,
    cellRendererParams: {
      uidFieldName: 'uid',
      editType: 'userprefer',
    },
  },
  {
    field: '선호제품 명',
  },
  { field: '두께(mm)', minWidth: 100, cellStyle: { textAlign: 'center' } }, //숫자
  { field: '폭(mm)', minWidth: 100 },
  { field: '길이(mm)', minWidth: 100 },
  { field: '규격약호', minWidth: 100 }, //숫자
  { field: 'TS', minWidth: 50 },
  { field: 'C%', minWidth: 50 },
  { field: 'EL', minWidth: 50 },
  { field: 'YP', minWidth: 50 },
  {
    field: '비고',
    minWidth: 300,
    cellStyle: { textAlign: 'center' },
  },
]
