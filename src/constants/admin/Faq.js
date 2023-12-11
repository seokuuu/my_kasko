/* ==============================
    운영 관리 - FAQ
============================== */

import { checkboxSelection, headerCheckboxSelection } from '../../pages/Table/util'

// FAQ 관리 목록 헤더
export const FaqListFieldCols = [
  { field: '', checkboxSelection, headerCheckboxSelection, maxWidth: 50 },
  { field: '순번', maxWidth: 100 },
  { field: '카테고리', maxWidth: 150 },
  { field: '제목' },
  { field: '작성일자', maxWidth: 150 },
]

// FAQ 관리 목록 키값 맵핑
export const FaqListFields = {
  카테고리: 'category',
  제목: 'title',
  작성일자: 'createDate',
}
