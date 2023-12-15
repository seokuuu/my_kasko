/* ==============================
    운영 관리 - 전광판 관리
============================== */

import { checkboxSelection, headerCheckboxSelection } from '../../pages/Table/util'

// 전광판 관리 목록 헤더
export const NoticeBoardListFieldCols = [
  { field: '', checkboxSelection, headerCheckboxSelection, maxWidth: 50 },
  { field: '순번', maxWidth: 100 },
  { field: '제목' },
  { field: '노출여부', maxWidth: 100 },
  { field: '작성일자', maxWidth: 150 },
  { field: '작성자', maxWidth: 150 },
]

// 전광판 관리 목록 키값 맵핑
export const NoticeBoardListFields = {
  카테고리: 'category',
  제목: 'title',
  작성일자: 'createDate',
  노출여부: 'status',
  작성자: 'name',
  순번: 'id',
  고유값: 'uid',
}
