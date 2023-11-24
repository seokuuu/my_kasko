import BtnCellRenderer from '../../pages/Table/BtnCellRenderer'

var checkboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0
}

export const ShippingDispatchFields = {
  '고유 번호': 'uid',
  이름: 'name',
  '차량 번호': 'carNumber',
  연락처: 'phone',
  '차량 종류': 'carType',
  비고: 'memo',
}

export const ShippingDispatchFieldsCols = [
  { field: '', maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  {
    field: '수정',
    maxWidth: 90,
    cellRenderer: BtnCellRenderer,
    cellRendererParams: {
      uidFieldName: '고유 번호', // 해당 get의 uid (필수수)
      editType: 'dispatch', // modal의 띄울 종류 (선택)
    },
  },
  {
    field: '고유 번호',
    minWidth: 100,
  },
  { field: '이름', minWidth: 100 },
  { field: '차량 번호', minWidth: 100 },
  { field: '연락처', minWidth: 100 },
  { field: '차량 종류', minWidth: 100 },
  { field: '비고', minWidth: 100 },
]
