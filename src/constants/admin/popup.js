/* ==============================
    운영 관리 - 팝업 관리
============================== */

import { checkboxSelection, headerCheckboxSelection } from '../../pages/Table/util'

// 팝업 목록 헤더
export const PopupListFieldCols = [
	{ field: '', checkboxSelection, headerCheckboxSelection, maxWidth: 50, headerClass: 'custom-header-style' },
	{ field: '순번', maxWidth: 100, headerClass: 'custom-header-style' },
	{ field: '제목', minWidth: 300, headerClass: 'custom-header-style' },
	{ field: '노출 유/무', maxWidth: 200, headerClass: 'custom-header-style' },
	{ field: '작성자', minWidth: 450, headerClass: 'custom-header-style' },
	{ field: '노출기간', minWidth: 400, headerClass: 'custom-header-style' },
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
