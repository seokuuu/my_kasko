import { commonStyles } from '../admin/Auction'

export const categories = ['경매', '상시판매', '입금', '출고', '기타']

export const corLabels = [
	{ ...commonStyles, field: '순번', maxWidth: 100 },
	{ ...commonStyles, field: '카테고리', maxWidth: 100 },
	{ ...commonStyles, field: '제목', minWidth: 100 },
	{ ...commonStyles, field: '작성일자', maxWidth: 200 },
]

export const responseToTableRowMap = {
	uid: 'uid',
	순번: 'uid',
	카테고리: 'category',
	제목: 'title',
	작성일자: 'createDate',
}
