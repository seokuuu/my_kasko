import BtnCellRenderer from '../../pages/Table/BtnCellRenderer'

var checkboxSelection = function (params) {
	// we put checkbox on the name if we are not doing grouping
	return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
	// we put checkbox on the name if we are not doing grouping
	return params.columnApi.getRowGroupColumns().length === 0
}

// 사용자 관리 (고객사 관리)
export const UserManageCustomerManageFields = {
	순번: 'uid',
	'고객 구분': 'memberUid',
	'회원 상태': 'status',
	'고객 코드': 'code',
	'고객사 명': 'name',
	사업자번호: 'businessNumber',
	연락처: 'phone',
	'승인 여부': 'approvalStatus',
	'회원 제한 상태': 'auctionStatus',
}
//고객사 관리 cols
export const UserManageCustomerManageFieldsCols = [
	{
		field: '',
		maxWidth: 50,
		headerClass: 'custom-header-style',
		checkboxSelection: checkboxSelection,
		headerCheckboxSelection: headerCheckboxSelection,
	},
	{
		field: '수정',
		maxWidth: 90,
		headerClass: 'custom-header-style',
		cellRenderer: BtnCellRenderer,
		cellRendererParams: {
			uidFieldName: '고객 구분',
			editType: 'client',
		},
	},

	{
		field: '순번',
		minWidth: 100,
		headerClass: 'custom-header-style',
	}, //숫자
	{
		field: '회원 상태',
		minWidth: 100,
		headerClass: 'custom-header-style',
	},
	{
		field: '고객 코드',
		minWidth: 100,
		headerClass: 'custom-header-style',
	},
	{
		field: '고객사 명',
		minWidth: 200,
		headerClass: 'custom-header-style',
	},
	{
		field: '사업자번호',
		minWidth: 100,
		headerClass: 'custom-header-style',
	},
	{
		field: '연락처',
		minWidth: 100,
		headerClass: 'custom-header-style',
	},
	{
		field: '승인 여부',
		minWidth: 100,
		headerClass: 'custom-header-style',
	},
	{
		field: '회원 제한 상태',
		minWidth: 100,
		headerClass: 'custom-header-style',
	},
]

// 사용자 목적지 관리 fields
export const UserManageCustomerDestinationManageFields = {
	'목적지 고유 번호': 'uid',
	'고객 코드': 'code',
	대표: 'represent',
	'목적지 코드': 'destinationCode',
	'목적지 명': 'destinationName',
	'담당자 연락처': 'managerPhone',
	'도착지 연락처': 'phone',
	'하차지 명': 'name',
	'상세 주소': 'addressDetail',
	비고란: 'memo',
}

// 사용자 목적지 관리 Cols
export const UserManageCustomerDestinationManageFieldsCols = [
	{
		headerClass: 'custom-header-style',
		field: '',
		maxWidth: 50,
		checkboxSelection: checkboxSelection,
		headerCheckboxSelection: headerCheckboxSelection,
	},
	{
		headerClass: 'custom-header-style',

		field: '수정',
		maxWidth: 90,
		cellRenderer: BtnCellRenderer,
		cellRendererParams: {
			uidFieldName: '목적지 고유 번호',
			editType: 'userPageDestination',
		},
	},
	{
		headerClass: 'custom-header-style',
		field: '고객 코드',
		minWidth: 150,
	},
	{ headerClass: 'custom-header-style', field: '대표', minWidth: 100 }, //숫자
	{ headerClass: 'custom-header-style', field: '목적지 코드', minWidth: 100 },
	{ headerClass: 'custom-header-style', field: '목적지 명', minWidth: 100 },
	{
		headerClass: 'custom-header-style',
		field: '담당자 연락처',
		minWidth: 200,
	},
	{
		headerClass: 'custom-header-style',
		field: '도착지 연락처',
		minWidth: 100,
	},
	{ headerClass: 'custom-header-style', field: '하차지 명', minWidth: 100 },
	{ headerClass: 'custom-header-style', field: '상세 주소', minWidth: 100 },
	{ headerClass: 'custom-header-style', field: '비고란' },
]
export const adminCustomerDestinationManageFieldsCols = [
	{
		field: '',
		flex:1,
		maxWidth: 50,
		headerClass: 'custom-header-style',
		checkboxSelection: checkboxSelection,
		headerCheckboxSelection: headerCheckboxSelection,
	},
	{
		field: '수정',flex:1,
		maxWidth: 90,
		headerClass: 'custom-header-style',
		cellRenderer: BtnCellRenderer,
		cellRendererParams: {
			uidFieldName: '목적지 고유 번호',
			editType: 'adminPageDestination',
		},
	},
	{
		field: '고객 코드',flex:1,
		minWidth: 100,
		headerClass: 'custom-header-style',
	},
	{
		field: '대표',flex:1,
		minWidth: 100,
		headerClass: 'custom-header-style',
	}, //숫자
	{
		field: '목적지 코드',flex:1,
		minWidth: 100,
		headerClass: 'custom-header-style',
	},
	{
		field: '목적지 명',flex:1,
		minWidth: 100,
		headerClass: 'custom-header-style',
	},
	{
		field: '담당자 연락처',flex:1,
		minWidth: 200,
		headerClass: 'custom-header-style',
	},
	{
		field: '도착지 연락처',flex:1,
		minWidth: 100,
		headerClass: 'custom-header-style',
	},
	{
		field: '하차지 명',flex:1,
		minWidth: 100,
		headerClass: 'custom-header-style',
	},
	{
		field: '상세 주소',flex:1,
		minWidth: 100,
		headerClass: 'custom-header-style',
	},
	{
		field: '비고란',flex:1,
		headerClass: 'custom-header-style',
	},
]
export const UserManageFields = {
	순번: 'uid',
	이름: 'name',
	아이디: 'id',
	'관리자 분류': 'role',
	'가입 일시': 'createDate',
}
export const UserManageFieldsCols = [
	{
		field: '',
		maxWidth: 50,
		headerClass: 'custom-header-style',
		checkboxSelection: checkboxSelection,
		headerCheckboxSelection: headerCheckboxSelection,
	},
	{
		field: '수정',
		maxWidth: 90,
		headerClass: 'custom-header-style',
		cellRenderer: BtnCellRenderer,
		cellRendererParams: {
			uidFieldName: '순번',
			editType: 'usermanagemanage',
		},
	},
	{
		field: '순번',
		maxWidth: 100,
		headerClass: 'custom-header-style',
	},
	{
		field: '이름',
		minWidth: 100,
		headerClass: 'custom-header-style',
	}, //숫자
	{
		field: '아이디',
		minWidth: 100,
		headerClass: 'custom-header-style',
	},
	{
		field: '관리자 분류',
		minWidth: 100,
		headerClass: 'custom-header-style',
	},
	{
		field: '가입 일시',
		minWidth: 200,
		headerClass: 'custom-header-style',
	},
]

// 마이페이지 - 선호제품관리
//  ✅일단 최대 두께로 설정 && 비고 없음
export const UserPageUserPreferFields = {
	uid: 'uid',
	'선호제품 명': 'name',
	'두께(mm)': 'thicknessMax',
	'폭(mm)': 'widthMax',
	'길이(mm)': 'lengthMax',
	규격약호: 'spec',
	TS: 'tsMax',
	'C%': 'cmax',
	EL: 'elMax',
	YP: 'ypMax',
	비고: '',
}
export const UserPageUserPreferFieldsCols = [
	{ field: '', maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
	{
		field: '수정',
		maxWidth: 90,
		cellRenderer: BtnCellRenderer,
		cellRendererParams: {
			uidFieldName: 'uid',
			editType: 'userprefer',
		},
	},
	{
		field: '선호제품 명',
	},
	{ field: '두께(mm)', minWidth: 100, cellStyle: { textAlign: 'center' } }, //숫자
	{ field: '폭(mm)', minWidth: 100 },
	{ field: '길이(mm)', minWidth: 100 },
	{ field: '규격약호', minWidth: 100 }, //숫자
	{ field: 'TS', minWidth: 50 },
	{ field: 'C%', minWidth: 50 },
	{ field: 'EL', minWidth: 50 },
	{ field: 'YP', minWidth: 50 },
	{
		field: '비고',
		minWidth: 300,
		cellStyle: { textAlign: 'center' },
	},
]
