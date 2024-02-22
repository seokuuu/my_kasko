/* ==============================
    운영 관리 - 공지사항
============================== */

import { checkboxSelection, headerCheckboxSelection } from '../../pages/Table/util'
import { commonStyles } from './Auction'

// 공지사항 관리 목록 헤더
export const NoticeListFieldCols = [
	{ ...commonStyles, field: '', checkboxSelection, headerCheckboxSelection, maxWidth: 50 },
	{ ...commonStyles, field: '순번', maxWidth: 100 },
	{ ...commonStyles, field: '제목', minWidth: 350 },
	{ ...commonStyles, field: '상단노출여부', maxWidth: 150 },
	{ ...commonStyles, field: '작성일자', maxWidth: 200 },
	{ ...commonStyles, field: '작성자', maxWidth: 200 },
	{ ...commonStyles, field: '조회수', maxWidth: 100 },
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
	조회수: 'count',
}
