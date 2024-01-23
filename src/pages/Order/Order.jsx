import { useEffect, useState } from 'react'
import { BlackBtn, GreyBtn, SkyBtn, WhiteRedBtn } from '../../common/Button/Button'
import { MainSelect } from '../../common/Option/Main'
import DateGrid from '../../components/DateGrid/DateGrid'
import Excel from '../../components/TableInner/Excel'
import HeaderToggle from '../../components/Toggle/HeaderToggle'
import { invenCustomer, invenCustomerData, pageSort, toggleAtom } from '../../store/Layout/Layout'
import { selectedRowsAtom } from '../../store/Layout/Layout'

import {
	DoubleWrap,
	ExCheckWrap,
	FilterContianer,
	FilterFooter,
	FilterHeader,
	FilterLeft,
	FilterRight,
	FilterSubcontianer,
	GridWrap,
	Input,
	PartWrap,
	PWRight,
	ResetImg,
	RowWrap,
	TableContianer,
	TCSubContainer,
	Tilde,
} from '../../modal/External/ExternalFilter'

import { useAtom, useAtomValue } from 'jotai'
import Hidden from '../../components/TableInner/Hidden'
import PageDropdown from '../../components/TableInner/PageDropdown'
import useReactQuery from '../../hooks/useReactQuery'
import { add_element_field } from '../../lib/tableHelpers'
import { CheckImg2, StyledCheckSubSquDiv } from '../../common/Check/CheckImg'
import { CheckBox } from '../../common/Check/Checkbox'
import axios from 'axios'
import InventoryFind from '../../modal/Multi/InventoryFind'
import { getCustomerFind } from '../../service/admin/Auction'
import { getSPartList } from '../../api/search'
import Table from '../Table/Table'
import { orderFieldData, OrderManageFieldsCols } from '../../constants/admin/OrderManage'
import { KilogramSum } from '../../utils/KilogramSum'
import { getOrderList } from '../../api/orderList'
import GlobalProductSearch from '../../components/GlobalProductSearch/GlobalProductSearch'
import OrderSearchFields from './OrderSearchFields'
import { isEqual } from 'lodash'

const Order = ({}) => {
	const checkBoxSelect = useAtomValue(selectedRowsAtom)
	const paramData = {
		pageNum: 1,
		pageSize: 3,
	}
	const [param, setParam] = useState(paramData)
	const [orderPagination, setOrderPagination] = useState([])
	const [orderListData, setOrderListData] = useState(null)
	const [checkSalesStart, setCheckSalesStart] = useState('') // 경매일자 시작
	const [checkSalesEnd, setCheckSalesEnd] = useState('') // 경매일자 끝
	const [checkConfirmStart, setCheckConfirmStart] = useState('') // 확정 전송 시작
	const [checkConfirmEnd, setCheckConfirmEnd] = useState('') // 확정 전송 끝
	const [checkAllTimeStart, setCheckAllTimeStart] = useState('') // 경매일자 시작
	const [checkAllTimeEnd, setCheckAllTimeEnd] = useState('') // 경매일자 끝

	const { data: spartList } = useReactQuery('', 'getSPartList', getSPartList)

	const checkSales = ['전체', '확정 전송', '확정 전송 대기']

	//checkSales
	const [check1, setCheck1] = useState(Array.from({ length: checkSales.length }, () => false))

	//checkShips
	const [checkData1, setCheckData1] = useState(Array.from({ length: checkSales.length }, () => ''))

	useEffect(() => {
		// true에 해당되면, value를, false면 빈값을 반환
		const updatedCheck = checkSales.map((value, index) => {
			return check1[index] ? value : ''
		})
		// 빈값을 제외한 값이 filteredCheck에 담긴다.
		const filteredCheck = updatedCheck.filter((item) => item !== '')
		setCheckData1(filteredCheck)

		// 전송용 input에 담을 때
		// setInput({
		//   ...input,
		//   businessType: updatedCheck.filter(item => item !== ''),
		// });
	}, [check1])

	const [isRotated, setIsRotated] = useState(false)

	// Function to handle image click and toggle rotation
	const handleImageClick = () => {
		setIsRotated((prevIsRotated) => !prevIsRotated)
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
	// const gridRef = useRef()
	const [sortNum, setSortNum] = useAtom(pageSort)

	const handleDropdown = (e) => {
		setSortNum(e.target.value)
	}

	const [getRow, setGetRow] = useState('')

	const onPageChange = (value) => {
		setParam((prevParam) => ({
			...prevParam,
			pageNum: Number(value),
		}))
	}

	/** 데이터 가져오는 부분 React-Query로 변경 */
	const formatTableRowData = (orderRes) => {
		return add_element_field(orderRes, orderFieldData)
	}
	const { data: getOrderRes, isSuccess, refetch } = useReactQuery(param, 'getOrderList', getOrderList)
	useEffect(() => {
		if (getOrderRes && getOrderRes.data && getOrderRes.data.list) {
			setOrderListData(formatTableRowData(getOrderRes.data.list))
			setOrderPagination(getOrderRes.data.pagination)
		}
	}, [getOrderRes, isSuccess])

	const totalWeight = getOrderRes?.data.pagination.totalWeight
	const formattedTotalWeight = totalWeight && totalWeight.toLocaleString()
	const [selected, setSelected] = useState({ sPart: '' })

	// 고객사 팝업 상태,객체
	const [customerPopUp, setCustomerPopUp] = useAtom(invenCustomer)
	const [customerData, setCustomerData] = useAtom(invenCustomerData)

	const { data: inventoryCustomer } = useReactQuery('', 'getCustomerFind', getCustomerFind)

	const makeRequest = (selectedRows) => {
		return selectedRows.map((row) => ({
			auctionNumber: row['경매 번호'],
			customerCode: row['고객 코드'],
			storage: row['창고'],
			customerDestinationUid: row['고객사 목적지 고유 번호'],
			saleType: row['판매 유형'],
			sendDate: row['확정 전송일'],
		}))
	}
	// 주문 취소 버튼 클릭 핸들러
	const handleOrderCancel = () => {
		const requestList = makeRequest(checkBoxSelect)
		console.log('요청List', requestList)
		axios
			.post(`${process.env.REACT_APP_API_URL}/admin/order/cancel-all`, requestList,{})
			.then((response) => {
				console.log('Order cancelled successfully:', response.data)
				refetch()
			})
			.catch((error) => {
				console.error('Error cancelling order:', error)
			})
	}

	// 입금 취소 버튼 클릭 핸들러
	const handleDepositCancel = () => {
		const requestList = makeRequest(checkBoxSelect)
		axios
			.post(`${process.env.REACT_APP_API_URL}/admin/order/deposit-all`, requestList, {})
			.then((response) => {
				console.log('Deposit cancelled successfully:', response.data)
				refetch()
			})
			.catch((error) => {
				console.error('Error cancelling deposit:', error)
			})
	}

	/**
	 * 검색하는 부분
	 */
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
	const globalProductResetOnClick = () => {
		// if resetting the search field shouldn't rerender table
		// then we need to create paramData object to reset the search fields.
		setParam(paramData)
	}
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
				<>
					<GlobalProductSearch
						param={param}
						isToggleSeparate={true}
						renderCustomSearchFields={(props) => <OrderSearchFields {...props} />}
						globalProductSearchOnClick={globalProductSearchOnClick}
						globalProductResetOnClick={globalProductResetOnClick}
					/>
				</>
			)}
			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>{checkBoxSelect?.length > 0 ? checkBoxSelect?.length : '0'}</span> /
						{orderPagination?.listCount}개 )<Hidden />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={handleDropdown} />
						<Excel getRow={getRow} />
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
						<SkyBtn>확정 전송</SkyBtn>
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
