/* ==============================
    운영 관리 - 제품군 관리
============================== */
import BtnCellRenderer from '../../pages/Table/BtnCellRenderer'
import { checkboxSelection, headerCheckboxSelection } from '../../pages/Table/util'

// 전광판 관리 목록 헤더
export const ProductRangeFieldCols = [
	{ field: '', checkboxSelection, headerCheckboxSelection, maxWidth: 50, headerClass: 'custom-header-style' },
	{
		field: '수정',
		maxWidth: 90,
		cellRenderer: BtnCellRenderer,
		cellRendererParams: {
			uidFieldName: '고유값',
			editType: 'productRange',
		},
		headerClass: 'custom-header-style',
	},
	{ field: '순번', maxWidth: 100, headerClass: 'custom-header-style' },
	{ field: '제품군', minWidth: 1210, headerClass: 'custom-header-style' },
]

// 전광판 관리 목록 키값 맵핑
export const ProductRangeFields = {
	순번: 'id',
	제품군: 'spart',
	고유값: 'uid',
}
