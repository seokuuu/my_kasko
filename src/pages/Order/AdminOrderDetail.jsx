import { useAtom, useAtomValue } from 'jotai/index'
import { isEqual } from 'lodash'
import React, { Fragment, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getDetailOrderList } from '../../api/orderList'
import { NewBottomBtnWrap, SkyBtn, WhiteBtn, WhiteRedBtn } from '../../common/Button/Button'
import GlobalProductSearch from '../../components/GlobalProductSearch/GlobalProductSearch'
import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle, TableWrap } from '../../components/MapTable/MapTable'
import Excel from '../../components/TableInner/Excel'
import Hidden from '../../components/TableInner/Hidden'
import PageDropdown from '../../components/TableInner/PageDropdown'
import { AdminOrderManageFieldsCols, DetailOrderFieldsManage } from '../../constants/admin/AdminOrderDetail'
import useReactQuery from '../../hooks/useReactQuery'
import { add_element_field } from '../../lib/tableHelpers'
import {
	FilterContianer,
	FilterHeader,
	FilterTCTop,
	TCSubContainer,
	TableContianer,
} from '../../modal/External/ExternalFilter'
import useAlert from '../../store/Alert/useAlert'
import { onClickCheckAtom, selectedRowsAtom, toggleAtom } from '../../store/Layout/Layout'
import { KilogramSum } from '../../utils/KilogramSum'
import Table from '../Table/Table'
import OrderDetailSearchFields from './OrderDetailSearchFields'
import ProNoPage from './ProNoPage'
import useOrder from './useOrder'
import { onSizeChange } from '../Operate/utils'
import TableV2HiddenSection from '../Table/TableV2HiddenSection'

const useQuery = () => {
	return new URLSearchParams(useLocation().search)
}
const AdminOrderDetail = () => {
	const query = useQuery()
	const { simpleAlert } = useAlert()
	const {
		postCancelOrder,
		postCancelOrderAll,
		postDepositCancelOrder,
		postDepositCancelOrderAll,
		postSuccessfulOrder,
	} = useOrder()
	const navigate = useNavigate()
	const [getRow, setGetRow] = useState([])
	const [productNumberOut, setProductNumberOut] = useState([])

	// 쿼리 스트링에서 값 추출
	const auctionNumber = query.get('auctionNumber')
	const customerCode = query.get('customerCode')
	const storage = query.get('storage')
	const customerDestinationUid = query.get('customerDestinationUid')
	const sendDate = query.get('sendDate')

	const saleType = query.get('saleType')
	const weight = query.get('weight')
	const customerDestinationAddress = query.get('customerDestinationAddress')
	const customerDestinationName = query.get('customerDestinationName')
	const customerName = query.get('customerName')
	const totalPrice = query.get('totalPrice')
	const customerDestinationPhone = query.get('customerDestinationPhone')
	const checkSales = ['전체', '확정 전송', '확정 전송 대기']
	const paramData = {
		pageNum: 1,
		pageSize: 50,
		auctionNumber: auctionNumber,
		customerCode: customerCode,
		storage: storage,
		customerDestinationUid: customerDestinationUid,
		sendDate: sendDate,

		saleType: saleType,
		weight: weight,
		customerDestinationAddress: customerDestinationAddress,
		customerDestinationName: customerDestinationName,
		customerName: customerName,
		customerDestinationPhone: customerDestinationPhone,
		totalPrice: totalPrice,
	}
	const [isPackage, setIsPackage] = useState(false)
	const [param, setParam] = useState(paramData)
	const [detailOrderPagination, setDetailOrderPagination] = useState([])
	const [detailOrderListData, setDetailOrderListData] = useState(null)
	const formatTableRowData = (orderDetail) => {
		return add_element_field(orderDetail, DetailOrderFieldsManage)
	}
	const { data: detailRes, isSuccess, refetch } = useReactQuery(param, 'getDetailOrderList', getDetailOrderList)
	useEffect(() => {
		if (detailRes && detailRes.data && detailRes.data.list) {
			if (detailRes.data.list.length === 0) {
				navigate(-1)
			} else {
				setDetailOrderListData(formatTableRowData(detailRes.data.list))
				setDetailOrderPagination(detailRes.data.pagination)
				// 패키지 여부 체크
				setIsPackage(!!detailRes.data.list[0].packageNumber)
			}
		}
	}, [isSuccess, detailRes])
	const totalWeight = detailRes?.data.pagination.totalWeight
	const formattedTotalWeight = totalWeight && totalWeight?.toLocaleString()
	const onPageChange = (value) => {
		setParam((prevParam) => ({
			...prevParam,
			pageNum: Number(value),
		}))
	}
	//checkSales
	const [check1, setCheck1] = useState(Array.from({ length: checkSales.length }, () => false))

	//checkShips
	const [checkData1, setCheckData1] = useState(Array.from({ length: checkSales.length }, () => ''))

	useEffect(() => {
		// true에 해당되면, value를, false면 빈값을 반환
		const updatedCheck = checkSales.map((value, index) => {
			return check1[index] ? value : ''
		})
		// 빈값을 제외한 진짜배기 값이 filteredCheck에 담긴다.
		const filteredCheck = updatedCheck.filter((item) => item !== '')
		setCheckData1(filteredCheck)
	}, [check1])

	const [isRotated, setIsRotated] = useState(false)

	// Function to handle image click and toggle rotation
	const handleImageClick = () => {
		setIsRotated((prevIsRotated) => !prevIsRotated)
	}
	// 토글 쓰기
	const titleData = [
		'판매 유형',
		'고객 코드',
		'고객사',
		'총 중량',
		'입금 요청 금액',
		'목적지 명',
		'하차지 주소',
		'하차지 연락처',
		'',
	]
	const contentData = [
		saleType,
		customerCode,
		customerName,
		weight,
		totalPrice,
		customerDestinationName,
		customerDestinationAddress,
		customerDestinationPhone,
		'',
	]

	const [exFilterToggle, setExfilterToggle] = useState(toggleAtom)

	/**
	 * @description 모달 테이블 테스트
	 */
	const [isTableModal, setIsTableModal] = useAtom(onClickCheckAtom)
	const [selectedCellData, setSelectedCellData] = useState([])
	const [orderId, setOrderId] = useState(0)
	const toggleModal = (data) => {
		setIsTableModal((prev) => !prev)
		setSelectedCellData(data.data['ProNo'])
		setOrderId(data.data['주문 고유 번호'])
	}
	const checkBoxSelect = useAtomValue(selectedRowsAtom)

	/**
	 * @description 부분 주문 취소
	 */
	const handleOrderCancel = () => {
		if (!checkBoxSelect || checkBoxSelect.length === 0) {
			simpleAlert('선택된 항목이 없습니다.')
			return
		}
		const requestList = checkBoxSelect.map((row) => ({
			uid: row['주문 고유 번호'],
			saleType: row['판매 유형'],
		}))
		postCancelOrder(requestList, 'getDetailOrderList')
	}

	/**
	 * @description 전체 주문 취소
	 */
	const handleOrderAllCancel = async () => {
		const requestList = [{ auctionNumber, saleType, customerCode, storage, customerDestinationUid }]
		await postCancelOrderAll(requestList, 'getOrderList', true)
	}

	/**
	 * @description 부분 입금 취소
	 */
	const handleDepositCancel = () => {
		if (!checkBoxSelect || checkBoxSelect.length === 0) {
			simpleAlert('선택된 항목이 없습니다.')
			return
		}
		const requestList = checkBoxSelect.map((row) => ({
			uid: row['주문 고유 번호'],
			saleType: row['판매 유형'],
		}))
		postDepositCancelOrder(requestList, 'getDetailOrderList')
	}

	/**
	 * @description 전체 입금 취소
	 */
	const handleDepositAllCancel = async () => {
		const requestList = [{ auctionNumber, saleType, customerCode, storage, customerDestinationUid }]
		await postDepositCancelOrderAll(requestList, 'getOrderList', true)
	}

	/**
	 * @description 부분 확정 전송
	 */
	const handleSuccessfulOrder = () => {
		if (!checkBoxSelect || checkBoxSelect.length === 0) {
			simpleAlert('선택된 항목이 없습니다.')
			return
		}
		const requestList = checkBoxSelect.map((row) => row['주문 고유 번호'])
		postSuccessfulOrder(requestList, 'getOrderList')
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
	const globalProductResetOnClick = () => {
		setParam(paramData)
	}

	/**
	 * @description
	 * : 현재 테이블의 제품 번호 다 가져가기 detailOrderListData['제품 번호']
	 */
	useEffect(() => {
		const productNumbers = detailOrderListData?.map((item) => item['제품 번호'])
		setProductNumberOut(productNumbers)
	}, [detailOrderListData])

	return (
		<>
			<FilterContianer>
				<FilterHeader>
					<div style={{ display: 'flex' }}>
						<h1>주문 관리 상세</h1>
					</div>
					{/* 토글 쓰기 */}
				</FilterHeader>
				<FilterTCTop>
					<h6>경매 번호</h6>
					<p>{auctionNumber}</p>
				</FilterTCTop>
				<TableWrap>
					<ClaimTable>
						{[0, 1, 2].map((index) => (
							<ClaimRow key={index}>
								{titleData.slice(index * 3, index * 3 + 3).map((title, idx) => (
									<Fragment agmentkey={title}>
										<ClaimTitle>{title}</ClaimTitle>
										<ClaimContent>{contentData[index * 3 + idx]}</ClaimContent>
									</Fragment>
								))}
							</ClaimRow>
						))}
					</ClaimTable>
				</TableWrap>

				{exFilterToggle && (
					<>
						<GlobalProductSearch
							param={param}
							setParam={setParam}
							isToggleSeparate={true}
							renderCustomSearchFields={(props) => <OrderDetailSearchFields {...props} />}
							globalProductSearchOnClick={globalProductSearchOnClick}
							globalProductResetOnClick={globalProductResetOnClick}
						/>
					</>
				)}
				<TableContianer>
					<TCSubContainer bor>
						<div>
							조회 목록 (선택 <span>{checkBoxSelect?.length > 0 ? checkBoxSelect?.length : '0'}</span> /
							{detailOrderPagination?.listCount}개 )
							<TableV2HiddenSection />
						</div>
						<div style={{ display: 'flex', gap: '10px' }}>
							{/*<PageDropdown />*/}
							<PageDropdown handleDropdown={(e) => onSizeChange(e, setParam)} />
							<Excel getRow={getRow} sheetName="주문 관리 상세" />
						</div>
					</TCSubContainer>
					<TCSubContainer>
						<div>
							선택 중량<span>{KilogramSum(checkBoxSelect)}</span>kg / 총 {formattedTotalWeight}kg
						</div>
						<div style={{ display: 'flex', gap: '10px' }}>
							{isPackage ? (
								<WhiteRedBtn onClick={handleOrderAllCancel}>주문 취소</WhiteRedBtn>
							) : (
								<WhiteRedBtn onClick={handleOrderCancel}>부분 주문 취소</WhiteRedBtn>
							)}
							<SkyBtn onClick={handleSuccessfulOrder}>부분 확정 전송</SkyBtn>
						</div>
					</TCSubContainer>

					<Table
						getCol={AdminOrderManageFieldsCols(toggleModal)}
						getRow={detailOrderListData}
						tablePagination={detailOrderPagination}
						onPageChange={onPageChange}
					/>
					<TCSubContainer style={{ display: 'flex', justifyContent: 'flex-end' }}>
						<div>
							{isPackage ? (
								<WhiteRedBtn onClick={handleDepositAllCancel}>입금 취소</WhiteRedBtn>
							) : (
								<WhiteRedBtn onClick={handleDepositCancel}>부분 입금 취소</WhiteRedBtn>
							)}
						</div>
					</TCSubContainer>
					<NewBottomBtnWrap bottom={-5} borderTop={'none'}>
						<WhiteBtn width={13} height={40} onClick={() => navigate('/order')}>
							돌아가기
						</WhiteBtn>
					</NewBottomBtnWrap>
				</TableContianer>
			</FilterContianer>
			{isTableModal && (
				<ProNoPage
					title={'Pro.No 제품 선택'}
					proNoNumber={selectedCellData}
					orderId={orderId}
					productNumberOut={productNumberOut}
				/>
			)}
		</>
	)
}

export default AdminOrderDetail
