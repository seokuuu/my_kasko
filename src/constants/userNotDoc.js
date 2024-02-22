import BtnCellRenderer from '../pages/Table/BtnCellRenderer'
import FixCellRenderer from '../pages/Table/FixCellRenderer'
import LinkCellRenderer from '../pages/Table/LinkCellRenderer'
import TextCellRenderer from '../pages/Table/TextCellRenderer'
import { commonStyles } from './admin/Auction'
/* ==============================
  사용자 페이지  운영 관리 - 공지사항
============================== */

// 공지사항 관리 목록 헤더
export const UserNoticeListFieldCols = [
	{
		...commonStyles,
		field: '순번',
		maxWidth: 100,
		cellRenderer: FixCellRenderer,
	},
	{ ...commonStyles, field: '제목', cellRenderer: TextCellRenderer },
	{ ...commonStyles, field: '작성일자', maxWidth: 200 },
	{ ...commonStyles, field: '작성자', maxWidth: 200 },
	{ ...commonStyles, field: '조회수', maxWidth: 100 },
]

// 공지사항 관리 목록 키값 맵핑
export const UserNoticeListFields = {
	카테고리: 'category',
	제목: 'title',
	작성일자: 'createDate',
	작성자: 'name',
	순번: 'uid',
	고유값: 'uid',
	조회수: 'count',
}
