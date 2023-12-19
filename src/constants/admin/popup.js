/* ==============================
    운영 관리 - 팝업 관리
============================== */

import { checkboxSelection, headerCheckboxSelection } from '../../pages/Table/util'

// 팝업 목록 헤더
export const PopupListFieldCols = [
  { field: '', checkboxSelection, headerCheckboxSelection, maxWidth: 50 },
  { field: '순번', maxWidth: 100 },
  { field: '제목' },
  { field: '노출 유/무', maxWidth: 150 },
  { field: '작성자', maxWidth: 150 },
  { field: '노출기간', maxWidth: 200 },
]

// 팝업 목록 키값 맵핑
export const PopupListFields = {
  카테고리: 'category',
  제목: 'title',
  노출기간: 'date',
  '노출 유/무': 'status',
  작성자: 'name',
  순번: 'id',
  고유값: 'uid',
}