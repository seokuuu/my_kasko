import PackageNumberRecommendCell from '../../pages/Product/PackageManage/cellRender/packageNumberRender'
import BtnCellRenderer from '../../pages/Table/BtnCellRenderer.jsx'
import LinkCellRenderer from '../../pages/Table/LinkCellRenderer.jsx'
import { commonStyles } from '../commonCellStyle.js'
var checkboxSelection = function (params) {
	// we put checkbox on the name if we are not doing grouping
	return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
	// we put checkbox on the name if we are not doing grouping
	return params.columnApi.getRowGroupColumns().length === 0
}
export const packageDispatchFields = {
	순번: 'index',
	'고유 번호': 'uid',
	패키지명: 'name',
	'패키지 번호': 'number',
	'경매 번호': 'auctionNumber',
	'판매 구분': 'saleCategory',
	'판매 유형': 'saleType',
	'경매시작단가(시작가)': 'price',
	중량: 'totalWeight',
	메모: 'memo',
	비고: 'note',
	// '경매 상태': 'auctionStatus',
	'최종 수정자': 'updater',
	'최종 수정 일자': 'updateDate',
	'추천 제품 여부': 'bestStatus',
}

export const packageProductsDispatchFields = {
	순번: 'index',
	패키지명: 'packageName',
	'패키지 번호': 'packageNumber',
	'제품 번호': 'productNumber',
	'프로넘 (ProNo)': 'productNoNumber',
	창고: 'storage',
	매입처: 'supplier',
	제조사: 'maker',
	'경매 번호': 'auctionNumber',
	판매구분: 'saleCategory',
	판매유형: 'saleType',
	판매가유형: 'saleTypePrice',
	제품군: 'spart',
	제품등급: 'grade',
	정척여부: 'preferThickness',
	유찰횟수: 'failCount',
	매입가: 'price',
	// '경매 시작가': 'auctionStartPrice',
	'경매 시작가': 'packagePrice',
	두께: 'thickness',
	폭: 'width',
	길이: 'length',
	'제품 중량': 'weight',
	규격약호: 'spec',
	TS: 'ts',
	YP: 'yp',
	'C%': 'c',
	EL: 'el',
	SI: 'si',
	MN: 'mn',
	P: 'p',
	s: 's',
	여재원인: 'causeCode',
	여재원인명: 'causeCodeName',
	용도코드: 'usageCode',
	용도명: 'usageCodeName',
	메모: 'memo',
	재고상태: 'stockStatus',
	// 상시판매가: 'salePrice',
	상시판매가: 'packagePrice',
	상시판매번호: 'saleNumber',
	'제품 고유 번호': 'productUid',
	// '낙찰 단가': 'productBiddingPrice',
	// '낙찰 총 단가(원/톤)': 'totalBiddingPrice',
	// 공급가: 'orderPrice',
	// 부가세: 'orderPriceVat',
	// '최종 수정자': 'updater',
	// '최종 수정 일자': 'updateDate',
	// 수량: 'quantity',
	// '총 중량': 'totalWeight',
}

// 패키지 관리 컬럼들
export const packageDispatchFieldsCols = [
	{
		headerClass: 'custom-header-style',
		flex: 1,
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		field: '',
		minWidth: 50,
		checkboxSelection: checkboxSelection,
		headerCheckboxSelection: headerCheckboxSelection,
	},
	{
		headerClass: 'custom-header-style',
		flex: 1,
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		field: '순번',
		minWidth: 60,
	},
	{
		headerClass: 'custom-header-style',
		field: '수정',
		flex: 1,
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		minWidth: 90,
		cellRenderer: BtnCellRenderer,
		cellRendererParams: {
			uidFieldName: '패키지 번호', // 해당 get의 uid (필수수)
			editType: 'packageUpdate', // modal의 띄울 종류 (선택)
			moveUrl: '/product/packageedit', // link로 보내려면 (선택)
		},
	},
	...Object.keys(packageDispatchFields)
		.slice(1)
		.map((item) => ({
			...commonStyles,
			field: item,
			editable: item === '메모' || item === '비고' ? true : false,
			minWidth: item === '메모' || item === '비고' ? 200 : 150,
			// cellRenderer: item === '패키지 번호' && LinkCellRenderer && recommendCell,
			cellRenderer: item === '패키지 번호' && PackageNumberRecommendCell,
			cellRendererParams: {
				uidFieldName: '패키지 번호', // 해당 get의 uid (필수수)
				editType: 'openDetailModal',
				moveUrl: '/product/packageedit', // modal의 띄울 종류 (선택)
			},
		})),
]

// 패키지 관리
export const packageProductsDispatchFieldsCols = [
	{
		headerClass: 'custom-header-style',
		flex: 1,
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		field: '',
		minWidth: 50,
		checkboxSelection: checkboxSelection,
		headerCheckboxSelection: headerCheckboxSelection,
	},
	...Object.keys(packageProductsDispatchFields).map((item) => ({
		...commonStyles,
		field: item,
		editable: false,
		minWidth: item === '순번' ? 80 : 150,
	})),
]

export const packageDetailDispatchFieldsCols = [
	{
		headerClass: 'custom-header-style',
		flex: 1,
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		field: '',
		minWidth: 50,
		checkboxSelection: checkboxSelection,
		headerCheckboxSelection: headerCheckboxSelection,
	},
	...Object.keys(packageProductsDispatchFields).map((item) => ({
		...commonStyles,
		field: item,
		editable: false,
		minWidth: item === '순번' ? 80 : 150,
		cellRenderer: item === '패키지 번호' && LinkCellRenderer,
		cellRendererParams: {
			uidFieldName: '패키지 번호', // 해당 get의 uid (필수수)
			editType: 'openDetailModal',
			moveUrl: '/product/packageedit', // modal의 띄울 종류 (선택)
		},
	})),
]
