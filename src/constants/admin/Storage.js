/* ==============================
    운영 관리 - 창고 관리
============================== */
import BtnCellRenderer from '../../pages/Table/BtnCellRenderer'
import { checkboxSelection, headerCheckboxSelection } from '../../pages/Table/util'

// 전광판 관리 목록 헤더
export const StorageFieldCols = [
  { field: '', checkboxSelection, headerCheckboxSelection, maxWidth: 50 },
  {
    field: '수정',
    maxWidth: 90,
    cellRenderer: BtnCellRenderer,
    cellRendererParams: {
      uidFieldName: '고유값',
      editType: 'productRange',
    },
  },
  { field: '순번', maxWidth: 100 },
  { field: '창고' },
  { field: '상세주소' },
]

// 전광판 관리 목록 키값 맵핑
export const StorageFields = {
  순번: 'id',
  창고: 'storage',
  상세주소: 'address',
  고유값: 'uid',
}
