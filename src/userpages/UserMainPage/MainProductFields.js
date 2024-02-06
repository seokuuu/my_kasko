import { commonStyles } from '../../constants/admin/Shipping'

export const MainProductFields = {
	제품번호: 'productNumber',
	'Pro.no': 'productNoNumber',
	'판매 유형': 'saleType',
	'판매 구분': 'saleCategory',
	규격약호: 'spec',
	두께: 'thickness',
	폭: 'weight',
	길이: 'length',
	중량: 'width',
	제품군: 'spart',
	TS: 'ts',
	YP: 'yp',
	'C%': 'c',
	EL: 'el',
}

export const MainProductFieldsCols = [
	...Object.keys(MainProductFields).map((item) => ({
		...commonStyles,
		field: item,
		minWidth: 120,
	})),
]

export const MainPackageProductFields = {
	제품번호: 'productNumber',
	'Pro.no': 'productNoNumber',
	패키지번호: 'packageNumber',
	패키지명: 'packageName',
	'판매 유형': 'saleType',
	'판매 구분': 'saleCategory',
	규격약호: 'spec',
	두께: 'thickness',
	폭: 'weight',
	길이: 'length',
	중량: 'width',
	제품군: 'spart',
	TS: 'ts',
	YP: 'yp',
	'C%': 'c',
	EL: 'el',
}

export const MainPackageProductFieldsCols = [
	...Object.keys(MainPackageProductFields).map((item) => ({
		...commonStyles,
		field: item,
		minWidth: 200,
	})),
]
