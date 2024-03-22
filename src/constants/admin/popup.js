/* ==============================
    운영 관리 - 팝업 관리
============================== */

import { checkboxSelection, headerCheckboxSelection } from '../../pages/Table/util'
import { commonStyles } from './Auction'

// 팝업 목록 헤더
export const PopupListFieldCols = [
	{
		field: '',
		checkboxSelection,
		headerCheckboxSelection,
		maxWidth: 50,
		...commonStyles,
		lockVisible: true,
		lockPinned: true,
	},
	{ field: '순번', maxWidth: 100, ...commonStyles },
	{ field: '제목', minWidth: 300, ...commonStyles },
	{ field: '노출 유/무', maxWidth: 200, ...commonStyles },
	{ field: '작성자', maxWidth: 200, ...commonStyles },
	{ field: '노출기간', ...commonStyles },
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
