import { useEffect, useRef, useState } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { blueModalAtom, toggleAtom } from '../../../store/Layout/Layout'
import { selectedRowsAtom } from '../../../store/Layout/Layout'
import useReactQuery from '../../../hooks/useReactQuery'
import { getSaleProductList } from '../../../api/saleProduct'
import { saleProductListFieldsCols, saleProductListResponseToTableRowMap } from '../../../constants/admin/saleProduct'
import { add_element_field } from '../../../lib/tableHelpers'
import { KilogramSum } from '../../../utils/KilogramSum'
import { formatWeight } from '../../../utils/utils'
import { SkyBtn, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import Excel from '../../../components/TableInner/Excel'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import Hidden from '../../../components/TableInner/Hidden'
import Table from '../../Table/Table'
import {
	FilterContianer,
	FilterHeader,
	FilterHeaderAlert,
	TCSubContainer,
	TableContianer,
} from '../../../modal/External/ExternalFilter'
import { UserPageUserPreferFieldsCols } from '../../../constants/admin/UserManage'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import SellOrderSearchFields from './SellOrderSearchFields'
import { isEqual } from 'lodash'
import { useNavigate } from 'react-router-dom'
import useAlert from '../../../store/Alert/useAlert'
import { useUserOrderCancelMutation } from '../../../api/user'
import DepositRequestForm from '../../../modal/Docs/DepositRequestForm'
import { CautionBox, CAUTION_CATEGORY } from '../../../components/CautionBox'

const SellOrder = () => {
	const { mutate: mutateDepositOrderCancel, loading: loadingDepositOrderCancel } = useUserOrderCancelMutation()
	const paramData = {
		pageNum: 1,
		pageSize: 50,
	}
	const [param, setParam] = useState(paramData)
	const checkBoxSelect = useAtomValue(selectedRowsAtom)
	// 입금요청서 발행 모드
	const [receiptPrint, setReceiptPrint] = useState(false)
	const navigate = useNavigate()
	const checkSales = ['전체', '확정 전송', '확정전송 대기']
	const [check1, setCheck1] = useState(Array.from({ length: checkSales.length }, () => false))

	const {
		isLoading,
		isError,
		data: getSaleProductListRes,
		isSuccess,
		refetch,
	} = useReactQuery(param, 'getSaleProductList', getSaleProductList)

	const [saleProductListData, setSaleProductListData] = useState(null)
	const [saleProductPagination, setSaleProductPagination] = useState([])

	useEffect(() => {
		if (getSaleProductListRes?.data?.data) {
			setSaleProductListData(formatTableRowData(getSaleProductListRes.data.data.list))
			setSaleProductPagination(getSaleProductListRes.data.data.pagination)
		}
	}, [isSuccess, getSaleProductListRes])

	const formatTableRowData = (rowData) => {
		return add_element_field(rowData, saleProductListResponseToTableRowMap)
	}

	// 토글 쓰기
	const [exFilterToggle, setExfilterToggle] = useState(toggleAtom)
	const [toggleMsg, setToggleMsg] = useState('On')
	const toggleBtnClick = () => {
		setExfilterToggle((prev) => !prev)
		if (exFilterToggle === true) {
			setToggleMsg('Off')
		} else {
			setToggleMsg('On')
		}
	}

	const [isModal, setIsModal] = useAtom(blueModalAtom)

	console.log('isModal =>', isModal)

	const modalOpen = () => {
		setIsModal(true)
	}

	const tableField = useRef(UserPageUserPreferFieldsCols)
	const getCol = tableField.current
	const checkedArray = useAtom(selectedRowsAtom)[0]

	const handleTablePageSize = (event) => {
		setParam((prevParam) => ({
			...prevParam,
			pageSize: Number(event.target.value),
		}))
	}

	const onPageChange = (value) => {
		setParam((prevParam) => ({
			...prevParam,
			pageNum: Number(value),
		}))
	}

	const globalProductResetOnClick = () => {
		// if resetting the search field shouldn't rerender table
		// then we need to create paramData object to reset the search field
		setParam(paramData)
	}

	const globalProductSearchOnClick = (userSearchParam) => {
		setParam((prevParam) => {
			if (isEqual(prevParam, { ...prevParam, ...userSearchParam })) {
				refetch()
				return prevParam
			}
			return {
				...prevParam,
				...userSearchParam,
			}
		})
	}

	const handleOnRowClicked = (row) => {
		const uid = row.data.uid
		navigate(`/sales/order/${uid}`)
	}

	const { simpleAlert } = useAlert()

	const orderCancelButtonOnClickHandler = () => {
		console.log('checkBoxSelect =>', checkBoxSelect)
		if (checkBoxSelect.length === 0) {
			return simpleAlert('주문 취소할 제품을 선택해 주세요.')
		}

		// 주문 번호 , orderUid is null from server response.
		const cancelData = checkBoxSelect.map((value) => ({ uid: value['주문번호'], saleType: '상시판매 대상재' }))

		mutateDepositOrderCancel({ requestList: cancelData })
	}

	return (
		<FilterContianer>
			<div>
				<FilterHeader>
					<h1>상시 판매 주문 확인</h1>
					{/* 토글 쓰기 */}
					<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
				</FilterHeader>
				<CautionBox category={CAUTION_CATEGORY.order} />
				{exFilterToggle && (
					// <FilterSubcontianer>
					<GlobalProductSearch
						// prettier-ignore
						param={param}
						isToggleSeparate={true}
						renderCustomSearchFields={(props) => <SellOrderSearchFields {...props} />}
						globalProductSearchOnClick={globalProductSearchOnClick}
						globalProductResetOnClick={globalProductResetOnClick}
					/>
				)}
			</div>
			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>{checkBoxSelect?.length > 0 ? checkBoxSelect?.length : '0'}</span> /{' '}
						{saleProductPagination?.listCount}개 )
						<Hidden />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={handleTablePageSize} />
						<Excel />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택 중량
						<span> {formatWeight(KilogramSum(checkBoxSelect))} </span>
						kg / 총 중량 {formatWeight(saleProductPagination.totalWeight)} kg
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteRedBtn onClick={orderCancelButtonOnClickHandler}>주문 취소</WhiteRedBtn>
					</div>
				</TCSubContainer>
				<Table
					getCol={saleProductListFieldsCols}
					getRow={saleProductListData}
					handleOnRowClicked={handleOnRowClicked}
					loading={isLoading}
					onPageChange={onPageChange}
					tablePagination={saleProductPagination}
				/>
				<TCSubContainer>
					<div></div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteSkyBtn
							onClick={() => {
								setReceiptPrint(true)
							}}
						>
							입금 요청서 발행
						</WhiteSkyBtn>{' '}
						<SkyBtn>입금 확인</SkyBtn>
					</div>
				</TCSubContainer>
			</TableContianer>
			{/* 입금 요청서 모달 */}
			{receiptPrint && (
				<DepositRequestForm
					title="상시판매 입금요청서"
					auctionNumber={''}
					salesDeposit
					onClose={() => {
						setReceiptPrint(false)
					}}
				/>
			)}
		</FilterContianer>
	)
}

export default SellOrder
