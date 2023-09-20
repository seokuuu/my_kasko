var checkboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0
}

// 기준관리 - 목적지관리 fields
export const StandardDestinaionFields = {
  '목적지 고유 번호': 'uid',
  '목적지 코드': 'code',
  목적지명: 'name',
  작성자: 'createMember',
  작성일: ' createDate:',
  수정자: 'updateMember',
  수정일: ' updateMember',
}

// 기준관리 - 목적지관리 fieldsCols
export const StandardDestinaionFieldsCols = [
  { field: '', maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  {
    field: '목적지 고유 번호',
    minWidth: 100,
  },
  { field: '목적지 코드', minWidth: 100 }, //숫자
  { field: '목적지명', minWidth: 100 },
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
