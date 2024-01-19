export const categories = ['경매', '상시판매', '입금', '약관', '출고', '기타']

export const corLabels = [
	{ headerClass: 'custom-header-style', field: '순번', maxWidth: 100 },
	{ headerClass: 'custom-header-style', field: '카테고리', minWidth: 100 },
	{ headerClass: 'custom-header-style', field: '제목', minWidth: 100, flex: 1 },
	{ headerClass: 'custom-header-style', field: '작성일자', minWidth: 100 },
]

export const responseToTableRowMap = {
	uid: 'uid',
	순번: 'uid',
	카테고리: 'category',
	제목: 'title',
	작성일자: 'createDate',
}
