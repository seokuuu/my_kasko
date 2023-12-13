import BtnCellRenderer from '../../pages/Table/BtnCellRenderer'



export const ShippingDispatchFields = {
  '순번': 'number',
  제목: 'title',
  '차량 번호': 'carNumber',
  연락처: 'phone',
  '차량 종류': 'carType',
  비고: 'memo',
}

export const ShippingDispatchFieldsCols = [

  { field: '이름', minWidth: 100 },
  {
    field: '수정',
    maxWidth: 90,
    cellRenderer: BtnCellRenderer,
    cellRendererParams: {
      uidFieldName: '고유 번호',
      editType: 'input',
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