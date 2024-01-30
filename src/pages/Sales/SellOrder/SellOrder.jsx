import { useAtom, useAtomValue } from 'jotai'
import { isEqual } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cancelAllOrderList } from '../../../api/orderList'
import { getSaleProductList, usePostSaleProductOrderConfirm } from '../../../api/saleProduct'
import { SkyBtn, WhiteRedBtn } from '../../../common/Button/Button'
import { CAUTION_CATEGORY, CautionBox } from '../../../components/CautionBox'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import Excel from '../../../components/TableInner/Excel'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { UserPageUserPreferFieldsCols } from '../../../constants/admin/UserManage'
import { saleProductListFieldsCols, saleProductListResponseToTableRowMap } from '../../../constants/admin/saleProduct'
import useMutationQuery from '../../../hooks/useMutationQuery'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import { FilterContianer, FilterHeader, TCSubContainer, TableContianer } from '../../../modal/External/ExternalFilter'
import useAlert from '../../../store/Alert/useAlert'
import { blueModalAtom, selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'
import PrintDepositRequestButton from '../../../userpages/UserSales/_components/PrintDepositRequestButton'
import { KilogramSum } from '../../../utils/KilogramSum'
import { formatWeight } from '../../../utils/utils'
import Table from '../../Table/Table'
import SellOrderSearchFields from './SellOrderSearchFields'

const SellOrder = () => {
	const { simpleConfirm, simpleAlert } = useAlert()
	const { mutate: cancelAllOrder, loading: loadingOrderCancel } = useMutationQuery(
		'cancelAllOrderList',
		cancelAllOrderList,
	)
	const { mutate: mutateDepositOrderConfirm, loading: loadingOrderConfirm } = usePostSaleProductOrderConfirm()
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

	const orderCancelButtonOnClickHandler = () => {
		if (checkBoxSelect.length === 0) {
			return simpleAlert('주문 취소할 제품을 선택해 주세요.')
		}

		// 주문 번호 , orderUid is null from server response.
		const requestList = checkBoxSelect.map((value) => ({
			auctionNumber: value['상시판매 번호'],
			saleType: '상시판매 대상재',
		}))

		simpleConfirm('주문 취소하시겠습니까?', () => {
			cancelAllOrder(requestList, {
				onSuccess: () => {
					simpleAlert('주문 취소 성공하였습니다.')
					refetch() // 성공 시 데이터 새로고침
				},
				onError: () => {
					simpleAlert('주문 취소 중 오류가 발생했습니다.')
				},
			})
		})
	}

	const orderCompletionHandler = () => {
		if (checkBoxSelect.length === 0) {
			return simpleAlert('주문 취소할 제품을 선택해 주세요.')
		}

		const auctionNumbers = checkBoxSelect.map((value) => value['상시판매 번호'])

		simpleConfirm('입금확인 하시겠습니까?', () => {
			mutateDepositOrderConfirm({ auctionNumbers })
		})
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
						<WhiteRedBtn onClick={orderCancelButtonOnClickHandler} disabled={loadingOrderCancel}>
							주문 취소
						</WhiteRedBtn>
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
					{/* 입금 확인 요청서 - uid 배열 전달*/}
					<div style={{ display: 'flex', gap: '8px' }}>
						<PrintDepositRequestButton
							auctionNumber={
								Array.isArray(checkBoxSelect)
									? checkBoxSelect.map((v) => v.uid)
									: checkBoxSelect
									? checkBoxSelect.uid
									: []
							}
							salesDeposit
						/>
						<SkyBtn onClick={orderCompletionHandler} disabled={loadingOrderConfirm}>
							입금 확인
						</SkyBtn>
					</div>
				</TCSubContainer>
			</TableContianer>
		</FilterContianer>
	)
}

export default SellOrder
