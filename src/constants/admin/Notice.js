/* ==============================
    운영 관리 - 공지사항
============================== */

import { checkboxSelection, headerCheckboxSelection } from '../../pages/Table/util'

// 공지사항 관리 목록 헤더
export const NoticeListFieldCols = [
  { field: '', checkboxSelection, headerCheckboxSelection, maxWidth: 50 },
  { field: '순번', maxWidth: 100 },
  { field: '제목' },
  { field: '상단노출여부' },
  { field: '작성일자', maxWidth: 150 },
  { field: '작성자', maxWidth: 150 },
  { field: '조회수', maxWidth: 150 },
]

// 공지사항 관리 목록 키값 맵핑
export const NoticeListFields = {
  카테고리: 'category',
  제목: 'title',
  작성일자: 'createDate',
  상단노출여부: 'status',
  작성자: 'name',
  순번: 'id',
  고유값: 'uid',
}
