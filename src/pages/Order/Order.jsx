import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SkyBtn, WhiteRedBtn } from '../../common/Button/Button'
import Excel from '../../components/TableInner/Excel'
import HeaderToggle from '../../components/Toggle/HeaderToggle'
import { invenCustomer, selectedRowsAtom, toggleAtom } from '../../store/Layout/Layout'

import { FilterContianer, FilterHeader, TableContianer, TCSubContainer } from '../../modal/External/ExternalFilter'

import { useAtom, useAtomValue } from 'jotai'
import PageDropdown from '../../components/TableInner/PageDropdown'
import useReactQuery from '../../hooks/useReactQuery'
import { add_element_field } from '../../lib/tableHelpers'
import InventoryFind from '../../modal/Multi/InventoryFind'
import { getCustomerFind } from '../../service/admin/Auction'
import Table from '../Table/Table'
import { orderFieldData, OrderManageFieldsCols } from '../../constants/admin/OrderManage'
import { KilogramSum } from '../../utils/KilogramSum'
import { getOrderList } from '../../api/orderList'
import GlobalProductSearch from '../../components/GlobalProductSearch/GlobalProductSearch'
import OrderSearchFields from './OrderSearchFields'
import { isEqual } from 'lodash'
import useAlert from '../../store/Alert/useAlert'
import useOrder from './useOrder'
import { onSizeChange } from '../Operate/utils'
import TableV2HiddenSection from '../Table/TableV2HiddenSection'
import moment from 'moment/moment'

const paramData = {
	pageNum: 1,
	pageSize: 50,
	// orderStartDate: moment(new Date()).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
	// orderEndDate: moment(new Date()).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
}

const Order = () => {
	const { simpleAlert } = useAlert()
	const { postCancelOrderAll, postDepositCancelOrderAll, postSuccessfulOrderAll } = useOrder()
	const checkBoxSelect = useAtomValue(selectedRowsAtom)
	const [customerPopUp, setCustomerPopUp] = useAtom(invenCustomer) // 고객사 팝업 상태,객체

	const [param, setParam] = useState(paramData)
	const [orderPagination, setOrderPagination] = useState([])
	const [orderListData, setOrderListData] = useState(null)

	const { data: getOrderRes, isSuccess, refetch } = useReactQuery(param, 'getOrderList', getOrderList)
	const { data: inventoryCustomer } = useReactQuery('', 'getCustomerFind', getCustomerFind)

	/** 데이터 가져오는 부분 React-Query로 변경 */
	const formatTableRowData = (list) => {
		return add_element_field(
			list.map((item, index) => ({ index: index + 1, ...item })),
			orderFieldData,
		)
	}

	useEffect(() => {
		if (getOrderRes && getOrderRes.data && getOrderRes.data.list) {
			setOrderListData(formatTableRowData(getOrderRes.data.list))
			setOrderPagination(getOrderRes.data.pagination)
		}
	}, [getOrderRes, isSuccess])

	const totalWeight = getOrderRes?.data.pagination.totalWeight
	const formattedTotalWeight = totalWeight && totalWeight?.toLocaleString()

	const makeRequest = (selectedRows) => {
		if (!selectedRows) return []

		return selectedRows.map((row) => ({
			auctionNumber: row['경매 번호'],
			customerCode: row['고객 코드'],
			storage: row['창고'],
			customerDestinationUid: row['고객사 목적지 고유 번호'],
			saleType: row['판매 유형'],
			sendDate: row['확정 전송일'],
			packageNumber: row['패키지 번호'] || null,
		}))
	}

	/**
	 * @description 주문 취소 핸들러
	 */
	const handleOrderCancel = () => {
		const requestList = makeRequest(checkBoxSelect) // checkBoxSelect를 makeRequest 함수에 전달하여 데이터 가공

		if (requestList.length === 0) {
			simpleAlert('선택된 항목이 없습니다.')
			return // 함수 실행 중단
		}
		postCancelOrderAll(requestList, 'getOrderList')
	}

	/**
	 * @description 입금 취소 핸들러
	 */
	const handleDepositCancel = () => {
		const requestList = makeRequest(checkBoxSelect)

		if (requestList.length === 0) {
			simpleAlert('선택된 항목이 없습니다.')
			return // 함수 실행 중단
		}
		postDepositCancelOrderAll(requestList, 'getOrderList')
	}

	/**
	 * @description 전체 확정 전송
	 */
	const handleSuccessfulOrder = () => {
		const requestList = makeRequest(checkBoxSelect)
		if (requestList.length === 0) {
			simpleAlert('선택된 항목이 없습니다.')
			return // 함수 실행 중단
		}
		postSuccessfulOrderAll(requestList, 'getOrderList')
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

	const onPageChange = (value) => {
		setParam((prevParam) => ({
			...prevParam,
			pageNum: Number(value),
		}))
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
	const globalProductResetOnClick = () => {
		setParam(paramData)
	}

	useEffect(() => {
		refetch()
	}, [param])

	useLayoutEffect(() => {
		refetch()
	}, [])

	return (
		<FilterContianer>
			<FilterHeader>
				<div style={{ display: 'flex' }}>
					<h1>주문 관리</h1>
				</div>
				{/* 토글 쓰기 */}
				<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
			</FilterHeader>

			{exFilterToggle && (
				<GlobalProductSearch
					param={param}
					setParam={setParam}
					isToggleSeparate={true}
					renderCustomSearchFields={(props) => <OrderSearchFields {...props} />}
					globalProductSearchOnClick={globalProductSearchOnClick}
					globalProductResetOnClick={globalProductResetOnClick}
				/>
			)}
			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>{checkBoxSelect?.length > 0 ? checkBoxSelect?.length : '0'}</span> /
						{orderPagination?.listCount}개 )<TableV2HiddenSection />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={(e) => onSizeChange(e, setParam)} />
						<Excel getRow={orderListData} sheetName={'주문 관리'} />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택 중량<span>{KilogramSum(checkBoxSelect)}</span>kg / 총 {formattedTotalWeight}kg
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteRedBtn type="button" onClick={handleOrderCancel}>
							주문 취소
						</WhiteRedBtn>
						<SkyBtn type="button" onClick={handleSuccessfulOrder}>
							확정 전송
						</SkyBtn>
					</div>
				</TCSubContainer>
				<Table
					getCol={OrderManageFieldsCols}
					getRow={orderListData}
					tablePagination={orderPagination}
					onPageChange={onPageChange}
				/>
				<TCSubContainer style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<div>
						<WhiteRedBtn type="button" onClick={handleDepositCancel}>
							입금 취소
						</WhiteRedBtn>
					</div>
				</TCSubContainer>
			</TableContianer>
			{customerPopUp && <InventoryFind title={'고객사 찾기'} setSwitch={setCustomerPopUp} data={inventoryCustomer} />}
		</FilterContianer>
	)
}

export default Order
