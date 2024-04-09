import { useAtomValue } from 'jotai'
import { isEqual } from 'lodash'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cancelAllOrderList } from '../../../api/orderList'
import { getSaleProductList, usePostSaleProductOrderConfirm } from '../../../api/saleProduct'
import { SkyBtn, WhiteRedBtn } from '../../../common/Button/Button'
import { CAUTION_CATEGORY, CautionBox } from '../../../components/CautionBox'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { saleProductListFieldsCols, saleProductListResponseToTableRowMap } from '../../../constants/admin/saleProduct'
import useMutationQuery from '../../../hooks/useMutationQuery'
import useReactQuery from '../../../hooks/useReactQuery'
import { FilterContianer, FilterHeader, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'
import useAlert from '../../../store/Alert/useAlert'
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'
import PrintDepositRequestButton from '../../../userpages/UserSales/_components/PrintDepositRequestButton'
import SellOrderSearchFields from './SellOrderSearchFields'
import TableV2 from '../../Table/TableV2'
import useTableData from '../../../hooks/useTableData'
import useTableSelection from '../../../hooks/useTableSelection'
import TableV2HiddenSection from '../../Table/TableV2HiddenSection'
import { USER_URL } from '../../../api/user'
import TableV2ExcelDownloader from '../../Table/TableV2ExcelDownloader'

const paramData = {
	pageNum: 1,
	pageSize: 50,
}

const SellOrder = () => {
	const navigate = useNavigate()
	const { simpleConfirm, simpleAlert } = useAlert()
	const { mutate: cancelAllOrder, loading: loadingOrderCancel } = useMutationQuery(
		'cancelAllOrderList',
		cancelAllOrderList,
	)
	const { mutate: mutateDepositOrderConfirm, loading: loadingOrderConfirm } = usePostSaleProductOrderConfirm()

	const [param, setParam] = useState(paramData)
	const [serverData, setServerData] = useState({ list: [], pagination: {} })
	const checkBoxSelect = useAtomValue(selectedRowsAtom)

	const {
		isLoading,
		data: getSaleProductListRes,
		isSuccess,
		refetch,
	} = useReactQuery(param, 'getSaleProductList', getSaleProductList)

	// 테이블 데이터, 페이지 데이터, 총 중량
	const { tableRowData, paginationData, totalWeightStr, totalCountStr, totalCount } = useTableData({
		tableField: saleProductListResponseToTableRowMap,
		serverData,
		wish: { display: true, key: ['productNumber', 'packageNumber'] },
		best: { display: true },
	})

	// 선택 항목
	const { selectedWeightStr, selectedCountStr } = useTableSelection({ weightKey: '총 중량' })

	useEffect(() => {
		if (getSaleProductListRes?.data?.data) {
			const data = getSaleProductListRes.data.data
			setServerData({ list: data.list, pagination: data.pagination })
		}
	}, [isSuccess, getSaleProductListRes])

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
		setParam(paramData)
	}

	const globalProductSearchOnClick = (userSearchParam) => {
		setParam((prevParam) => {
			if (isEqual(prevParam, { ...prevParam, ...userSearchParam })) {
				return prevParam
			}
			return {
				...prevParam,
				...userSearchParam,
				pageNum: 1,
			}
		})
	}

	useEffect(() => {
		refetch()
	}, [param])

	const handleOnRowClicked = (row) => {
		const uid = row.data.uid
		const saleStatus = row.data['상시판매 상태']
		console.log('row data', row.data)

		navigate(`/sales/order/${uid}/${saleStatus}`)
	}

	const orderCancelButtonOnClickHandler = () => {
		if (!checkBoxSelect || checkBoxSelect?.length === 0) {
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
		if (!checkBoxSelect || checkBoxSelect?.length === 0) {
			return simpleAlert('입금 확인할 제품을 선택해 주세요.')
		}

		const auctionNumbers = checkBoxSelect.map((value) => value['상시판매 번호'])
		const saleStatus = checkBoxSelect.map((value) => value['상시판매 상태'])

		if (saleStatus.includes('주문 취소')) {
			return simpleAlert('주문 취소된 주문건입니다.')
		}

		if (saleStatus.includes('주문 확정')) {
			return simpleAlert('이미 입금확인된 주문건입니다.')
		}

		simpleConfirm('입금확인 하시겠습니까?', () => {
			mutateDepositOrderConfirm({ auctionNumbers })
		})
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
					<div style={{ flex: 1 }}>
						조회 목록 (선택 <span>{selectedCountStr}</span> / {totalCountStr}개 )
						<TableV2HiddenSection />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={handleTablePageSize} />
						<TableV2ExcelDownloader
							requestUrl={USER_URL.orderList}
							requestCount={totalCount}
							field={saleProductListResponseToTableRowMap}
						/>
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택중량 <span> {selectedWeightStr} </span> (kg) / 총 중량 {totalWeightStr} (kg)
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteRedBtn onClick={orderCancelButtonOnClickHandler} disabled={loadingOrderCancel}>
							주문 취소
						</WhiteRedBtn>
					</div>
				</TCSubContainer>
				<TableV2
					getRow={tableRowData}
					getCol={saleProductListFieldsCols}
					loading={isLoading}
					isRowClickable
					handleOnRowClicked={handleOnRowClicked}
					tablePagination={paginationData}
					onPageChange={onPageChange}
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
							saleStatus={
								Array.isArray(checkBoxSelect)
									? checkBoxSelect.map((v) => v['상시판매 상태'])
									: checkBoxSelect
									? checkBoxSelect['상시판매 상태']
									: []
							}
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
