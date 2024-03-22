import { useAtom, useAtomValue } from 'jotai'
import { winningDetailAucNumAtom, winningDetailModal } from '../../store/Layout/Layout'
import { Link } from 'react-router-dom'
import { authAtom } from '../../store/Auth/auth'

var checkboxSelection = function (params) {
	// we put checkbox on the name if we are not doing grouping
	return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
	// we put checkbox on the name if we are not doing grouping
	return params.columnApi.getRowGroupColumns().length === 0
}

export const commonStyles = {
	headerClass: 'custom-header-style',
	flex: 1,
	cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
}

const LinkRenderer = (props) => {
	const auth = useAtomValue(authAtom)
	const url = auth.role === '카스코철강' ? '/auction/winning/detail' : '/userpage/auctionwinning/detail'

	const { data } = props
	const [aucDetail, setAucDetail] = useAtom(winningDetailAucNumAtom) // 해당 row 값 저장

	const [aucDetailModal, setAucDetailModal] = useAtom(winningDetailModal) // 패키지 모달

	return (
		<>
			{aucDetailModal ? (
				<>{props.value || ''}</>
			) : (
				<Link
					to={url}
					onClick={() => {
						setAucDetailModal(true)
						setAucDetail(data)
					}}
					style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bolder' }}
					rel="noreferrer"
				>
					{props.value || ''}
				</Link>
			)}
		</>
	)
}

/* ====================================
    경매 관리 - 경매 낙찰 관리 (winning
======================================= */

export const AuctionWinningFields = {
	'Pro.No 번호': 'productNoNumber',
	'경매 번호': 'auctionNumber',
	'고객 코드': 'code',
	고객사명: 'customerName',
	창고: 'storage',
	'고객사 목적지 고유 번호': 'customerDestinationUid',
	제품군: 'spart',
	'판매 구분': 'saleCategory',
	'판매 유형': 'saleType',
	'판매가 유형': 'salePriceType',
	수량: 'productCount',
	중량: 'weight',
	'제품 금액 (VAT 포함)': 'orderAmount',
	'운반비 (VAT 포함)': 'freightAmount',
	'목적지 고유 번호': 'destinationUid',
	'목적지 명': 'destinationName',
	'목적지 주소': 'destinationAddress',
	'목적지 연락처': 'destinationPhone',
	'목적지 담당자 연락처': 'destinationManagerPhone',
	'하차지 명': 'customerDestinationName',
	'승인 상태': 'requestStatus',
	수정자: 'updateMemberName',
	수정일: 'updateDate',
	'주문 상태': 'orderStatus',
	'입금 요청액': 'amount',
	'낙찰 상태': 'biddingStatus',
	패키지명: 'packageName',
	'패키지 번호': 'packageNumber',
	'카스코 낙찰가': 'confirmPrice',
	'매입 운반비': 'inboundFreightAmount',
	'매출 운반비': 'outboundFreightAmount',
}

export const AuctionWinningFieldsCols = [
	{
		...commonStyles,
		field: '',
		maxWidth: 50,
		checkboxSelection,
		headerCheckboxSelection,
		lockVisible: true,
		lockPinned: true,
	},
	{
		headerName: '경매 번호',
		field: '경매 번호',
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 150,
		cellRenderer: LinkRenderer,
	},
	{ ...commonStyles, field: '패키지명', minWidth: 120 },
	{ ...commonStyles, field: '패키지 번호', minWidth: 120 },
	{ ...commonStyles, field: '고객사명', minWidth: 150 },
	{ ...commonStyles, field: '고객 코드', minWidth: 100 },
	{ ...commonStyles, field: '창고', minWidth: 100 },
	{ ...commonStyles, field: '낙찰 상태', minWidth: 120 },
	{ ...commonStyles, field: '승인 상태', minWidth: 120 },
	{ ...commonStyles, field: '판매 구분', minWidth: 120 },
	{ ...commonStyles, field: '판매 유형', minWidth: 120 },
	{ ...commonStyles, field: '판매가 유형', minWidth: 120 },
	{ ...commonStyles, field: '제품군', minWidth: 100 },
	{ ...commonStyles, field: '수량', minWidth: 100 },
	{ ...commonStyles, field: '중량', minWidth: 100 },
	{ ...commonStyles, field: '제품 금액 (VAT 포함)', minWidth: 120 },
	{ ...commonStyles, field: '운반비 (VAT 포함)', minWidth: 120 },
	{ ...commonStyles, field: '입금 요청액', minWidth: 120 },
	{ ...commonStyles, field: '목적지 명', minWidth: 120 },
	{ ...commonStyles, field: '목적지 주소', minWidth: 150 },
	{ ...commonStyles, field: '목적지 연락처', minWidth: 150 },
	{ ...commonStyles, field: '목적지 담당자 연락처', minWidth: 150 },
	{ ...commonStyles, field: '하차지 명', minWidth: 150 },
	{ ...commonStyles, field: '주문 상태', minWidth: 120 },
	// 비고
	{ ...commonStyles, field: '매입 운반비', minWidth: 120 },
	{ ...commonStyles, field: '매출 운반비', minWidth: 120 },
	{ ...commonStyles, field: '카스코 낙찰가', minWidth: 120 },
	{ ...commonStyles, field: '수정자', minWidth: 120 },
	{ ...commonStyles, field: '수정일', minWidth: 120 },
]

export const UserAuctionWinningFieldsCols = [
	{
		...commonStyles,
		field: '',
		maxWidth: 50,
		checkboxSelection,
		headerCheckboxSelection,
		lockVisible: true,
		lockPinned: true,
	},
	{
		headerName: '경매 번호',
		field: '경매 번호',
		headerClass: 'custom-header-style',
		cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
		width: 150,
		cellRenderer: LinkRenderer,
	},
	{ ...commonStyles, field: '패키지명', minWidth: 120 },
	{ ...commonStyles, field: '패키지 번호', minWidth: 120 },
	{ ...commonStyles, field: '고객사명', minWidth: 150 },
	{ ...commonStyles, field: '고객 코드', minWidth: 100 },
	{ ...commonStyles, field: '창고', minWidth: 100 },
	{ ...commonStyles, field: '낙찰 상태', minWidth: 120 },
	{ ...commonStyles, field: '승인 상태', minWidth: 120 },
	{ ...commonStyles, field: '판매 유형', minWidth: 120 },
	{ ...commonStyles, field: '판매가 유형', minWidth: 120 },
	{ ...commonStyles, field: '제품군', minWidth: 100 },
	{ ...commonStyles, field: '수량', minWidth: 100 },
	{ ...commonStyles, field: '중량', minWidth: 100 },
	{ ...commonStyles, field: '제품 금액 (VAT 포함)', minWidth: 120 },
	{ ...commonStyles, field: '운반비 (VAT 포함)', minWidth: 120 },
	{ ...commonStyles, field: '입금 요청액', minWidth: 120 },
	{ ...commonStyles, field: '목적지 명', minWidth: 120 },
	{ ...commonStyles, field: '목적지 주소', minWidth: 150 },
	{ ...commonStyles, field: '목적지 연락처', minWidth: 150 },
	{ ...commonStyles, field: '목적지 담당자 연락처', minWidth: 150 },
	{ ...commonStyles, field: '하차지 명', minWidth: 150 },
	// 메모
	{ ...commonStyles, field: '수정자', minWidth: 120 },
	{ ...commonStyles, field: '수정일', minWidth: 120 },
]
