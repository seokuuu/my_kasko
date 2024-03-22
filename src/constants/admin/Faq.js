/* ==============================
    운영 관리 - FAQ
============================== */

import { checkboxSelection, headerCheckboxSelection } from '../../pages/Table/util'
import { commonStyles } from './Auction'

// FAQ 관리 목록 헤더
export const FaqListFieldCols = [
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
	{ field: '카테고리', maxWidth: 150, ...commonStyles },
	{ field: '제목', ...commonStyles, minWidth: 200 },
	{ field: '작성일자', ...commonStyles, maxWidth: 150 },
]

// FAQ 관리 목록 키값 맵핑
export const FaqListFields = {
	카테고리: 'category',
	제목: 'title',
	작성일자: 'createDate',
	순번: 'id',
	고유값: 'uid',
}
