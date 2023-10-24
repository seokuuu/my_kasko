import BtnCellRenderer from '../../pages/Table/BtnCellRenderer'

var checkboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0
}

/* ==============================
    기준 관리 - 목적지 관리 (Destination)
============================== */

// 기준관리 - 목적지관리 fields
export const StandardDestinaionFields = {
  '목적지 고유 번호': 'uid',
  '목적지 코드': 'code',
  '목적지 명': 'name',
  작성자: 'createMember',
  작성일: 'createDate',
  수정자: 'updateMember',
  수정일: 'updateDate',
}

// 기준관리 - 목적지관리 post
export const StandardDestinationPost = {
  '목적지 코드': 'dropdown',
  '목적지 명': 'input',
  작성자: 'auto',
  작성일: 'auto',
}

// 기준관리 - 목적지관리 Edit
export const StandardDestinationEdit = {
  '목적지 코드': 'auto',
  '목적지 명': 'input',
  작성자: 'auto',
  작성일: 'auto',
  수정자: 'auto',
  수정일: 'auto',
}

// {
//     "uid": 15,
//     "storage": "창고2",
//     "destinationCode": "A",
//     "destinationName": "인천",
//     "spart": "후판",
//     "effectDate": "2023-06-21",
//     "previousCost": 0,
//     "effectCost": 200000
// },

// 기준관리 - 목적지관리 fieldsCols
//  주석 처리 : cell 내 버튼 기능
export const StandardDestinaionFieldsCols = [
  { field: '', maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  {
    field: '수정',
    maxWidth: 90,
    cellRenderer: BtnCellRenderer,
    cellRendererParams: {
      uidFieldName: '목적지 고유 번호',
      editType: 'table',
    },
  },
  {
    field: '목적지 고유 번호',
    minWidth: 160,
  },
  { field: '목적지 코드', minWidth: 100 }, //숫자
  { field: '목적지 명', minWidth: 100 },
  { field: '작성자', minWidth: 100 },
  {
    field: '작성일',
    minWidth: 200,
  },
  {
    field: '수정자',
    minWidth: 100,
  },
  { field: '수정일', minWidth: 100 },
]

/* ==============================
    기준 관리 - 운반비 관리 (Transportation)
============================== */

// 기준관리 - 운반비 관리 fields
export const StandardTransportationFields = {
  '운반비 고유 번호': 'uid',
  창고: 'storage',
  '목적지 코드': 'destinationCode',
  목적지명: 'destinationName',
  제품군: 'spart',
  적용일: 'effectDate',
  이전단가: 'previousCost',
  적용단가: 'effectCost',
}

// 기준 관리 - 운반비 관리 post
export const StandardTransportationPost = {
  출발지: 'auto',
  '목적지 코드': 'auto',
  '목적지 명': 'input',
  '제품 구분': 'auto',
  '단가 적용 일자': 'auto',
  '적용 단가': 'input',
}

// 기준 관리 - 운반비 관리 Edit
export const StandardTransportationEdit = {
  창고: 'auto',
  '목적지 코드': 'auto',
  목적지명: 'input',
  제품군: 'auto',
  적용일: 'auto',
  적용단가: 'input',
}

// 기준관리 - 운반비 관리 fieldsCols
export const StandardTransportationFieldsCols = [
  { field: '', maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  {
    field: '수정',
    maxWidth: 90,
    cellRenderer: BtnCellRenderer,
    cellRendererParams: {
      uidFieldName: '운반비 고유 번호',
      editType: 'table',
    },
  },
  {
    field: '운반비 고유 번호',
    minWidth: 160,
  },
  { field: '창고', minWidth: 100 },
  { field: '목적지 코드', minWidth: 100 },
  { field: '목적지명', minWidth: 100 },
  {
    field: '제품군',
    minWidth: 100,
  },
  {
    field: '적용일',
    minWidth: 100,
  },
  { field: '이전단가', minWidth: 100 },
  { field: '적용단가', minWidth: 100 },
]

/* ==============================
    기준 관리 - 할증 관리 (Surcharge)
============================== */

export const StandardSurchargeFields = {
  '할증 고유 번호': 'uid',
  '최소 길이': 'lengthMin',
  '최대 길이': 'lengthMax',
  '최소 폭': 'widthMin',
  '최대 폭': 'widthMax',
  '할증 (%)': 'percent',
}

export const StandardSurchargeFieldsCols = [
  { field: '', maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },

  {
    field: '할증 고유 번호',
    minWidth: 100,
  },
  { field: '최소 길이', minWidth: 100 },
  { field: '최대 길이', minWidth: 100 },
  { field: '최소 폭', minWidth: 100 },
  {
    field: '최대 폭',
    minWidth: 100,
  },
  {
    field: '할증 (%)',
    minWidth: 100,
  },
]

/* ==============================
    기준 관리 - 합짐비 관리 (Consolidation)
============================== */

export const StandardConsolidationFields = {
  '합짐비 고유 번호': 'uid',
  착: 'land',
  '동일 시군 가격': 'inAreaPrice',
  '타 시군 가격': 'outAreaPrice',
}

export const StandardConsolidationFieldsCols = [
  { field: '', maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  {
    field: '합짐비 고유 번호',
    minWidth: 100,
  },
  { field: '착', minWidth: 100 },
  { field: '동일 시군 가격', minWidth: 100 },
  { field: '타 시군 가격', minWidth: 100 },
]
