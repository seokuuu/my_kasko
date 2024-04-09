import MarkerCellRenderer from '../../pages/Table/MarkerCellRenderer'
import { checkboxSelection, headerCheckboxSelection } from '../../pages/Table/util'
import { getNormalTableRows } from '../../utils/table'
import { PROD_COL_NAME } from './constantKey'

/**
 * @constant 테이블컬럼 라벨 - 변수명 바인딩 객체
 * @description 사용자 장바구니 > 단일 테이블에서 사용합니다.
 */
export const userCartListSingleField = {
	[PROD_COL_NAME.cartUid]: 'cartUid',
	[PROD_COL_NAME.productUid]: 'productUid',
	[PROD_COL_NAME.productNumber]: 'number',
	'규격 약호': 'spec',
	창고: 'storage',
	창고명: 'storageName',
	'제품 사양': 'wdh',
	길이: 'thickness',
	폭: 'width',
	규격약호: 'length',
	중량: 'weight',
	등급: 'grade',
	'c%': 'c',
	si: 'si',
	mn: 'mn',
	p: 'p',
	s: 's',
	ts: 'ts',
	yp: 'yp',
	el: 'el',
	'용도 코드': 'usageCode',
	용도명: 'usageCodeName',
	'제품군 코드': 'spartCode',
	제품군: 'spart',
	제품명: 'name',
	정척여부: 'preferThickness',
	여재원인코드: 'causeCode',
	여재원인명: 'causeCodeName',
	입고일: 'receiptDate',
	'제품 상태': 'productStatus',
	'경매 등록 상태': 'registrationStatus',
	매입처: 'supplier',
	제조사: 'maker',
	판매구분: 'saleCategory',
	'판매 제외재 사유': 'excludeSaleReason',
	'재고 상태': 'stockStatus',
	'입고 상태': 'receiptStatus',
	'상시판매 주문 상태': 'saleStatus',
	'판매 유형': 'saleType',
	'판매가 구분': 'salePriceType',
	[PROD_COL_NAME.salePrice]: 'salePrice',
}

/**
 * @constant 테이블컬럼 라벨 - 변수명 바인딩 객체
 * @description 사용자 장바구니 > 패키지 테이블에서 사용합니다.
 */
export const userCartListPackageField = {
	[PROD_COL_NAME.packageUid]: 'packageUid',
	'패키지 이름': 'packageName',
	[PROD_COL_NAME.packageNumber]: 'packageNumber',
	'패지키 판매 유형': 'packageSaleType',
	'패키지 판매 구분': 'packageSaleCategory',
	'패키지 상시 판매가': 'packageSalePrice',
	'패키지 상품 총 개수': 'packageQuantity',
	'패키지 상품 총 중량': 'packageTotalWeight',
}

/**
 * @constant 테이블컬럼
 * @description 사용자 장바구니 > 단일 테이블에서 사용합니다.
 */
export const userCartListSingleFieldsCols = getNormalTableRows([
	{ field: '', maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
	{
		field: PROD_COL_NAME.productNumber,
		minWidth: 250,
		cellRenderer: MarkerCellRenderer,
		cellRendererParams: (params) => params.data[params.column.colId],
		valueGetter: (v) => v.data[v.column.colId]?.value || '',
	},
	{ field: '규격 약호' },
	{ field: '창고' },
	{ field: '창고명' },
	{ field: '제품 사양', minWidth: 180 },
	{ field: '길이' },
	{ field: '폭' },
	{ field: '규격약호' },
	{ field: '중량' },
	{ field: '등급' },
	{ field: 'c%' },
	{ field: 'si' },
	{ field: 'mn' },
	{ field: 'p' },
	{ field: 's' },
	{ field: 'ts' },
	{ field: 'yp' },
	{ field: 'el' },
	{ field: '용도 코드' },
	{ field: '용도명', minWidth: 130 },
	{ field: '제품군 코드' },
	{ field: '제품군' },
	{ field: '제품명' },
	{ field: '정척여부' },
	{ field: '여재원인코드' },
	{ field: '여재원인명' },
	{ field: '입고일' },
	{ field: '제품 상태' },
	{ field: '경매 등록 상태', minWidth: 130 },
	{ field: '매입처' },
	{ field: '제조사' },
	{ field: '판매구분' },
	{ field: '판매 제외재 사유', minWidth: 130 },
	{ field: '재고 상태' },
	{ field: '입고 상태' },
	{ field: '상시판매 주문 상태', minWidth: 160 },
	{ field: '판매 유형', minWidth: 130 },
	{ field: '판매가 구분' },
	{ field: PROD_COL_NAME.salePrice },
])

/**
 * @constant 테이블컬럼
 * @description 사용자 장바구니 > 패키지 테이블에서 사용합니다.
 */
export const userCartListPackageFieldCols = (numberClickHandler = undefined) =>
	getNormalTableRows([
		{ field: '', maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
		{ field: '패키지 이름' },
		{
			field: PROD_COL_NAME.packageNumber,
			minWidth: 100,
			cellRenderer: MarkerCellRenderer,
			cellRendererParams: (params) => ({ ...params.data[params.column.colId], clickHandler: numberClickHandler }),
			valueGetter: (v) => v.data[v.column.colId]?.value || '',
		},
		{ field: '패지키 판매 유형', minWidth: 130 },
		{ field: '패키지 판매 구분', minWidth: 130 },
		{ field: '패키지 상시 판매가', minWidth: 150 },
		{ field: '패키지 상품 총 개수', minWidth: 150 },
		{ field: '패키지 상품 총 중량', minWidth: 150 },
	])
