import BtnCellRenderer from '../../pages/Table/BtnCellRenderer'
import { commonStyles } from './Auction'

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
	'사용자 구분': 'role',
	'회원 상태': 'status',
	'고객사 아이디': 'id',
	'고객 코드': 'code',
	'고객사 명': 'name',
	사업자번호: 'businessNumber',
	대표자: 'ceoName',
	고객사유형: 'businessType',
	연락처: 'phone',
	'승인 여부': 'approvalStatus',
	'회원 제한 상태': 'auctionStatus',
}
//고객사 관리 cols
export const UserManageCustomerManageFieldsCols = [
	{
		...commonStyles,
		field: '',
		minWidth: 50,
		checkboxSelection: checkboxSelection,
		headerCheckboxSelection: headerCheckboxSelection,
		lockVisible: true,
		lockPinned: true,
	},
	{
		...commonStyles,
		field: '수정',
		minWidth: 90,
		cellRenderer: BtnCellRenderer,
		cellRendererParams: {
			uidFieldName: '고객 구분',
			editType: 'client',
		},
	},

	{
		...commonStyles,
		field: '순번',
		minWidth: 100,
	}, //숫자
	{
		...commonStyles,
		field: '사용자 구분',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '회원 상태',
		minWidth: 100,
	},
	{
		...commonStyles,
		field: '고객사 아이디',
		minWidth: 200,
	},
	{
		...commonStyles,
		field: '고객사 명',
		minWidth: 200,
	},
	{
		...commonStyles,
		field: '고객 코드',
		minWidth: 100,
	},
	{
		...commonStyles,
		field: '사업자번호',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '대표자',
		minWidth: 100,
	},
	{
		...commonStyles,
		field: '고객사유형',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '연락처',
		minWidth: 100,
	},
	{
		...commonStyles,
		field: '승인 여부',
		minWidth: 100,
	},
	{
		...commonStyles,
		field: '회원 제한 상태',
		minWidth: 150,
	},
]

// 사용자 목적지 관리 fields
export const UserManageCustomerDestinationManageFields = {
	'목적지 고유 번호': 'uid',
	대표여부: 'represent',
	고객명: 'customerName',
	'고객 코드': 'customerCode',
	'목적지 명': 'destinationName',
	'목적지 코드': 'destinationCode',
	주소: 'address',
	'상세 주소': 'addressDetail',
	'하차지 명': 'name',
	'하차지 특이사항(비고)': 'memo',
	'하차지 연락처': 'phone',
	하차지담당자: 'managerName',
	'하차지담당자 연락처': 'managerPhone',
	승인여부: 'status',
	최종수정자: 'updater',
	최종수정일자: 'updateDate',
}

// 사용자 목적지 관리 Cols
export const UserManageCustomerDestinationManageFieldsCols = [
	{
		...commonStyles,
		field: '',
		minWidth: 50,
		checkboxSelection: checkboxSelection,
		headerCheckboxSelection: headerCheckboxSelection,
		lockVisible: true,
		lockPinned: true,
	},
	{
		...commonStyles,
		field: '수정',
		minWidth: 90,
		cellRenderer: BtnCellRenderer,
		cellRendererParams: {
			uidFieldName: '목적지 고유 번호',
			editType: 'userPageDestination',
		},
	},
	{ ...commonStyles, field: '대표여부', minWidth: 100 }, //숫자
	{
		...commonStyles,
		field: '고객명',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '고객 코드',
		minWidth: 150,
	},
	{ ...commonStyles, field: '목적지 명', minWidth: 250 },
	{ ...commonStyles, field: '목적지 코드', minWidth: 150 },
	{ ...commonStyles, field: '주소', minWidth: 300 },
	{ ...commonStyles, field: '상세 주소', minWidth: 150 },
	{ ...commonStyles, field: '하차지 명', minWidth: 150 },
	{ ...commonStyles, field: '하차지 특이사항(비고)', minWidth: 200 },
	{
		...commonStyles,
		field: '하차지 연락처',
		minWidth: 200,
	},
	{
		...commonStyles,
		field: '하차지담당자',
		minWidth: 200,
	},
	{
		...commonStyles,
		field: '하차지담당자 연락처',
		minWidth: 200,
	},
	{ ...commonStyles, field: '최종수정자', minWidth: 150 },
	{ ...commonStyles, field: '최종수정일자', minWidth: 150 },
]
export const adminCustomerDestinationManageFieldsCols = [
	{
		...commonStyles,
		field: '',
		minWidth: 50,
		checkboxSelection: checkboxSelection,
		headerCheckboxSelection: headerCheckboxSelection,
		lockVisible: true,
		lockPinned: true,
	},
	{
		...commonStyles,
		field: '수정',
		minWidth: 90,
		cellRenderer: BtnCellRenderer,
		cellRendererParams: {
			uidFieldName: '목적지 고유 번호',
			editType: 'adminPageDestination',
		},
	},

	{ ...commonStyles, field: '승인여부', minWidth: 100 }, //숫자
	{ ...commonStyles, field: '대표여부', minWidth: 100 }, //숫자
	{
		...commonStyles,
		field: '고객명',
		minWidth: 150,
	},
	{
		...commonStyles,
		field: '고객 코드',
		minWidth: 150,
	},
	{ ...commonStyles, field: '목적지 명', minWidth: 200 },
	{ ...commonStyles, field: '목적지 코드', minWidth: 100 },
	{ ...commonStyles, field: '주소', minWidth: 300 },
	{ ...commonStyles, field: '상세 주소', minWidth: 100 },
	{ ...commonStyles, field: '하차지 명', minWidth: 100 },
	{ ...commonStyles, field: '하차지 특이사항(비고)', minWidth: 100 },
	{
		...commonStyles,
		field: '하차지 연락처',
		minWidth: 200,
	},
	{
		...commonStyles,
		field: '하차지담당자',
		minWidth: 200,
	},
	{
		...commonStyles,
		field: '하차지담당자 연락처',
		minWidth: 200,
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
		...commonStyles,
		checkboxSelection: checkboxSelection,
		headerCheckboxSelection: headerCheckboxSelection,
		lockVisible: true,
		lockPinned: true,
	},
	{
		field: '수정',
		maxWidth: 90,
		...commonStyles,
		cellRenderer: BtnCellRenderer,
		cellRendererParams: {
			uidFieldName: '순번',
			editType: 'usermanagemanage',
		},
	},
	{
		field: '순번',
		maxWidth: 100,
		...commonStyles,
	},
	{
		field: '이름',
		minWidth: 100,
		...commonStyles,
	}, //숫자
	{
		field: '아이디',
		minWidth: 100,
		...commonStyles,
	},
	{
		field: '관리자 분류',
		minWidth: 100,
		...commonStyles,
	},
	{
		field: '가입 일시',
		minWidth: 200,
		...commonStyles,
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
	{
		field: '',
		maxWidth: 50,
		checkboxSelection,
		headerCheckboxSelection,
		...commonStyles,
		lockVisible: true,
		lockPinned: true,
	},
	{
		...commonStyles,
		field: '수정',
		maxWidth: 90,
		cellRenderer: BtnCellRenderer,
		cellRendererParams: {
			uidFieldName: 'uid',
			editType: 'userprefer',
		},
	},
	{ field: '선호제품 명', minWidth: 200, ...commonStyles },
	{ field: '두께(mm)', minWidth: 100, ...commonStyles }, //숫자
	{ field: '폭(mm)', minWidth: 100, ...commonStyles },
	{ field: '길이(mm)', minWidth: 100, ...commonStyles },
	{ field: '규격약호', minWidth: 150, ...commonStyles }, //숫자
	{ field: 'TS', minWidth: 50, ...commonStyles },
	{ field: 'C%', minWidth: 50, ...commonStyles },
	{ field: 'EL', minWidth: 50, ...commonStyles },
	{ field: 'YP', minWidth: 50, ...commonStyles },
	{ field: '비고', minWidth: 300, ...commonStyles },
]
