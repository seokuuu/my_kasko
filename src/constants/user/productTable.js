import MarkerCellRenderer from '../../pages/Table/MarkerCellRenderer'
import { checkboxSelection, headerCheckboxSelection } from '../../pages/Table/util'
import { getNormalTableRows } from '../../utils/table'
import { PROD_COL_NAME } from './constantKey'
import { ProNoCellRenderer } from '../../pages/Table/ProNoCellRenderer'

/**
 * @constant 테이블컬럼 라벨 - 변수명 바인딩 객체
 * @description 사용자 주문확인 > 단일 테이블에서 사용합니다.
 */
export const userSingleProductField = {
	[PROD_COL_NAME.productUid]: 'uid',
	'상시판매 번호': 'orderNumber',
	'상시판매 주문일자': 'saleOrderDate',
	[PROD_COL_NAME.productNumber]: 'number',
	'프로넘(ProNo)': 'productNoNumber',
	창고: 'storageName',
	'상시판매 상태': 'saleStatus',
	승인상태: 'approvalStatus',
	판매유형: 'saleType',
	판매가유형: 'salePriceType',
	제품군: 'spart',
	'제품 등급': 'grade',
	[PROD_COL_NAME.salePrice]: 'salePrice',
	'목적지 코드': 'destinationCode',
	'목적지 명': 'destinationName',
	'목적지 주소': 'customerDestinationAddress',
	'목적지 연락처(사무실)': 'customerDestinationPhone',
	'목적지담당자 연락처(휴대폰)': 'customerDestinationManagerPhone',
	'하차지 명': 'customerDestinationName',
	두께: 'thickness',
	폭: 'width',
	길이: 'length',
	중량: 'weight',
	'규격 약호': 'spec',
	TS: 'ts',
	YP: 'yp',
	'C%': 'c',
	EL: 'el',
	Si: 'si',
	MN: 'mn',
	P: 'p',
	S: 's',
	여재원인: 'causeCode',
	여재원인명1: 'causeCodeName',
	'용도 코드': 'usageCode',
	용도명: 'usageCodeName',
	메모: 'productMemo',
}

/**
 * @constant 테이블컬럼 라벨 - 변수명 바인딩 객체
 * @description 사용자 주문확인 > 패키지 테이블에서 사용합니다.
 */
export const userPackageProductField = {
	[PROD_COL_NAME.packageUid]: 'uid',
	'상시판매 번호': 'auctionNumber',
	'상시판매 주문일자': 'orderDate',
	패키지명: 'name',
	[PROD_COL_NAME.packageNumber]: 'number',
	'상시판매 상태': 'saleStatus',
	판매유형: 'saleType',
	[PROD_COL_NAME.salePrice]: 'price',
	'제품 수량': 'quantity',
	'중량 합계': 'totalWeight',
	'목적지 코드': 'destinationCode',
	'목적지 명': 'destinationName',
	'목적지 주소': 'customerDestinationAddress',
	'목적지 연락처(사무실)': 'customerDestinationPhone',
	'목적지담당자 연락처(휴대폰)': 'customerDestinationManagerPhone',
	'하차지 명': 'customerDestinationName',
	메모: 'memo',
}

/**
 * @constant 테이블컬럼 라벨 - 변수명 바인딩 객체
 * @description 사용자 주문확인 > 패키지 상세보기 테이블에서 사용합니다.
 */
export const userPackageDetailsField = {
	[PROD_COL_NAME.packageUid]: 'packageUid',
	'패키지 명': 'packageName',
	[PROD_COL_NAME.packageNumber]: 'packageNumber',
	수량: 'quantity',
	중량: 'totalWeight',
	'제품 번호': 'productNumber',
	'제품 고유 번호': 'productUid',
	'제품 창고 명': 'storage',
	'제품 매입처': 'supplier',
	'제품 제조사': 'maker',
	'제품 경매 번호': 'auctionNumber',
	'판매 유형': 'saleType',
	'판매 구분': 'saleCategory',
	'판매가 유형': 'saleTypePrice',
	제품군: 'spart',
	'제품 중량': 'weight',
	메모: 'memo',
	비고: 'note',
	'제품 단가(원/톤)': 'productBiddingPrice',
	'낙찰 총 단가(원/톤)': 'totalBiddingPrice',
	'제품 공급가(원/톤)': 'orderPrice',
	'제품 부가세(원/톤)': 'orderPriceVat',
	'경매 시작가': 'auctionStartPrice',
	'최종 수정자': 'updater',
	'최종 수정일자': 'updateDate',
	'상시판매 시작가': 'packagePrice',
}

/**
 * @constant 테이블컬럼
 * @description 사용자 주문확인 > 단일 테이블에서 사용합니다.
 */
export const userSingleProductFieldsCols = getNormalTableRows([
	{ field: '', maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
	{ field: PROD_COL_NAME.productUid },
	// { field: '상시판매 번호' },
	// { field: '상시판매 주문일자' },
	{
		field: PROD_COL_NAME.productNumber,
		minWidth: 200,
		cellRenderer: MarkerCellRenderer,
		cellRendererParams: (params) => params.data[params.column.colId],
		valueGetter: (v) => v.data[v.column.colId]?.value || '',
	},

	{
		field: '프로넘(ProNo)',
		minWidth: 180,
		cellRenderer: ProNoCellRenderer,
	},
	{ field: '창고' },
	// { field: '상시판매 상태' },
	{ field: '승인상태' },
	{ field: '판매유형', minWidth: 150 },
	{ field: '판매가유형' },
	{ field: '제품군' },
	{ field: '제품 등급' },
	{ field: PROD_COL_NAME.salePrice },
	{ field: '목적지 코드' },
	{ field: '목적지 명' },
	{ field: '목적지 주소' },
	{ field: '목적지 연락처(사무실)' },
	{ field: '목적지담당자 연락처(휴대폰)' },
	{ field: '하차지 명' },
	{ field: '두께' },
	{ field: '폭' },
	{ field: '길이' },
	{ field: '중량' },
	{ field: '규격 약호' },
	{ field: 'TS' },
	{ field: 'YP' },
	{ field: 'C%' },
	{ field: 'EL' },
	{ field: 'Si' },
	{ field: 'MN' },
	{ field: 'P' },
	{ field: 'S' },
	{ field: '여재원인' },
	{ field: '여재원인명1' },
	{ field: '용도 코드' },
	{ field: '용도명' },
	{ field: '메모' },
])

/**
 * @constant 테이블컬럼
 * @description 사용자 주문확인 > 패키지 테이블에서 사용합니다.
 */
export const getUserPackageProductFieldsCols = (numberClickHandler = undefined) =>
	getNormalTableRows([
		{
			field: '',
			maxWidth: 50,
			checkboxSelection: checkboxSelection,
			headerCheckboxSelection: headerCheckboxSelection,
		},
		{ field: PROD_COL_NAME.packageUid },
		// { field: '상시판매 번호' },
		// { field: '상시판매 주문일자' },
		{ field: '패키지명' },
		{
			field: PROD_COL_NAME.packageNumber,
			minWidth: 100,
			cellRenderer: MarkerCellRenderer,
			cellRendererParams: (params) => ({ ...params.data[params.column.colId], clickHandler: numberClickHandler }),
			valueGetter: (v) => v.data[v.column.colId]?.value || '',
		},
		// { field: '상시판매 상태' },
		{ field: '판매유형' },
		{ field: PROD_COL_NAME.salePrice },
		{ field: '제품 수량' },
		{ field: '중량 합계' },
		{ field: '목적지 코드' },
		{ field: '목적지 명' },
		{ field: '목적지 주소' },
		{ field: '목적지 연락처(사무실)' },
		{ field: '목적지담당자 연락처(휴대폰)' },
		{ field: '하차지 명' },
		{ field: '메모' },
	])

export const userPackageDetailsFieldsCols = () =>
	getNormalTableRows([
		{ field: '', maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
		{ field: PROD_COL_NAME.packageUid },
		{ field: '패키지 명' },
		{
			field: PROD_COL_NAME.packageNumber,
			cellRenderer: MarkerCellRenderer,
			cellRendererParams: (params) => params.data[params.column.colId],
			valueGetter: (v) => v.data[v.column.colId].value,
		},
		{ field: '제품 번호' },
		{ field: '프로넘 (ProNo.)' }, // 누락 추가
		{ field: '창고' }, // 누락 추가
		{ field: '매입처' }, // 누락 추가
		{ field: '제조사' }, // 누락 추가
		{ field: '상시판매 상태' }, // 누락 추가
		{ field: '상시판매가' }, // 누락 추가
		{ field: '판매 구분' },
		{ field: '판매 유형' },
		{ field: '판매가 유형' },
		{ field: '제품군' },
		{ field: '제품 등급' }, // 누락 추가
		{ field: '정척 여부' }, // 누락 추가
		{ field: '유찰 횟수' }, // 누락 추가
		{ field: '두께' }, // 누락 추가
		{ field: '폭' }, // 누락 추가
		{ field: '길이' }, // 누락 추가
		{ field: '중량' },
		{ field: '규격 약호' }, // 누락 추가
		{ field: 'TS' }, // 누락 추가
		{ field: 'YP' }, // 누락 추가
		{ field: 'C%' }, // 누락 추가
		{ field: 'EL' }, // 누락 추가
		{ field: 'SI' }, // 누락 추가
		{ field: 'MN' }, // 누락 추가
		{ field: 'P' }, // 누락 추가
		{ field: 'S' }, // 누락 추가
		{ field: '여재원인' }, // 누락 추가
		{ field: '여재원인명' }, // 누락 추가
		{ field: '용도코드' }, // 누락
		{ field: '용도명' }, // 누락 추가
		{ field: '제품 단가(원/톤)' },
		{ field: '제품 공급가(원/톤)' },
		{ field: '제품 부가세(원/톤)' },
		{ field: '제품 금액(VAT포함)' }, // 누락 추가
		{ field: '메모' },
		{ field: '비고' },
		{ field: '최종 수정자' },
		{ field: '최종 수정일자' },

		// { field: '수량' },
		// { field: '제품 고유 번호' },
		// { field: '제품 창고 명' },
		// { field: '제품 매입처' },
		// { field: '제품 제조사' },
		// { field: '제품 경매 번호' },
		// { field: '제품 중량' },
		// { field: '낙찰 총 단가(원/톤)' },
		// { field: '경매 시작가' },
	])
