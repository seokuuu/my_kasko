/* ==============================
    운영 관리 - FAQ
============================== */

import { checkboxSelection, headerCheckboxSelection } from '../../pages/Table/util'

// FAQ 관리 목록 헤더
export const FaqListFieldCols = [
	{ field: '', checkboxSelection, headerCheckboxSelection, maxWidth: 50, headerClass: 'custom-header-style' },
	{ field: '순번', maxWidth: 100, headerClass: 'custom-header-style' },
	{ field: '카테고리', minWidth: 250, headerClass: 'custom-header-style' },
	{ field: '제목', headerClass: 'custom-header-style', minWidth: 550 },
	{ field: '작성일자', headerClass: 'custom-header-style', minWidth: 500 },
]

// FAQ 관리 목록 키값 맵핑
export const FaqListFields = {
	카테고리: 'category',
	제목: 'title',
	작성일자: 'createDate',
	순번: 'id',
	고유값: 'uid',
}
