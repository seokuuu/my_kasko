import React, { Fragment, useEffect, useState } from 'react'
import { BlackBtn, SkyBtn, WhiteRedBtn } from '../../common/Button/Button'
import DateGrid from '../../components/DateGrid/DateGrid'
import Excel from '../../components/TableInner/Excel'
import { onClickCheckAtom, selectedRowsAtom, toggleAtom } from '../../store/Layout/Layout'

import { CheckBox } from '../../common/Check/Checkbox'
import { CheckImg2, StyledCheckSubSquDiv } from '../../common/Check/CheckImg'

import {
	DoubleWrap,
	ExCheckDiv,
	ExCheckWrap,
	FilterContianer,
	FilterFooter,
	FilterHeader,
	FilterLeft,
	FilterRight,
	FilterSubcontianer,
	FilterTCTop,
	GridWrap,
	PartWrap,
	ResetImg,
	RowWrap,
	TableContianer,
	TCSubContainer,
	Tilde,
} from '../../modal/External/ExternalFilter'

import Hidden from '../../components/TableInner/Hidden'
import PageDropdown from '../../components/TableInner/PageDropdown'

import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle, TableWrap } from '../../components/MapTable/MapTable'
import Table from '../Table/Table'
import { AdminOrderManageFieldsCols, DetailOrderFieldsManage } from '../../constants/admin/AdminOrderDetail'
import useReactQuery from '../../hooks/useReactQuery'
import { getDetailOrderList, getOrderList } from '../../api/orderList'
import { useLocation } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useAtom, useAtomValue } from 'jotai/index'
import ProNoPage from './ProNoPage'
import axios from 'axios'
import { add_element_field } from '../../lib/tableHelpers'
import { orderFieldData } from '../../constants/admin/OrderManage'
import { KilogramSum } from '../../utils/KilogramSum'
const useQuery = () => {
	return new URLSearchParams(useLocation().search)
}
const AdminOrderDetail = ({}) => {
	const query = useQuery()

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
		pageSize: 3,
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
	const [param, setParam] = useState(paramData)
	const [detailOrderPagination, setDetailOrderPagination] = useState([])
	const [detailOrderListData, setDetailOrderListData] = useState(null)
	const [checkOrderStart, setCheckOrderStart] = useState('') // 경매일자 시작
	const [checkOrderEnd, setCheckOrderEnd] = useState('') // 경매일자 끝
	const formatTableRowData = (orderDetail) => {
		return add_element_field(orderDetail, DetailOrderFieldsManage)
	}
	const { data: detailRes, isSuccess } = useReactQuery(param, 'getDetailOrderList', getDetailOrderList)
	useEffect(() => {
		if (detailRes && detailRes.data && detailRes.data.list) {
			setDetailOrderListData(formatTableRowData(detailRes.data.list))
			setDetailOrderPagination(detailRes.data.pagination)
		}
	}, [isSuccess, detailRes])
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
		'판매 구분',
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

	const queryClient = useQueryClient()
	const { data: getOrderRes } = useReactQuery(param, 'getOrderList', getOrderList, {
		initialData: () => {
			// React Query 캐시에서 초기 데이터를 가져옵니다.
			return queryClient.getQueryData('getOrderList')
		},
	})

	const [exFilterToggle, setExfilterToggle] = useState(toggleAtom)

	/**
	 * 모달 테이블 테스트
	 */
	const [isTableModal, setIsTableModal] = useAtom(onClickCheckAtom)
	const [selectedCellData, setSelectedCellData] = useState(null)
	const toggleModal = (proNoNumber) => {
		setIsTableModal((prev) => !prev)
		setSelectedCellData(proNoNumber)
	}
	const checkBoxSelect = useAtomValue(selectedRowsAtom)
	const makeRequest = (selectedRows) => {
		return selectedRows.map((row) => ({
			orderUid: row['주문 고유 번호'],
			saleType: row['판매 유형'],
		}))
	}
	const handleOrderCancel = () => {
		const requestList = makeRequest(checkBoxSelect)
		console.log('요청List', requestList)

		axios
			.post(`${process.env.REACT_APP_API_URL}/admin/order/cancel-all`, requestList, {})
			.then((response) => {
				console.log('Order cancelled successfully:', response.data)
			})
			.catch((error) => {
				console.error('Error cancelling order:', error)
			})
	}
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
						<div>검색 컴포넌트</div>
					</>
				)}
				<TableContianer>
					<TCSubContainer bor>
						<div>
							조회 목록 (선택 <span>{checkBoxSelect?.length > 0 ? checkBoxSelect?.length : '0'}</span> /
							{detailOrderPagination?.listCount}개 )<Hidden />
							<Hidden />
						</div>
						<div style={{ display: 'flex', gap: '10px' }}>
							<PageDropdown />
							<Excel />
						</div>
					</TCSubContainer>
					<TCSubContainer>
						<div>
							선택 중량<span>{KilogramSum(checkBoxSelect)}</span>kg / 총 {}kg
						</div>
						<div style={{ display: 'flex', gap: '10px' }}>
							<WhiteRedBtn onClick={handleOrderCancel}>부분 주문 취소</WhiteRedBtn>
							<SkyBtn>부분 확정 전송</SkyBtn>
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
							<WhiteRedBtn>부분 입금 취소</WhiteRedBtn>
						</div>
					</TCSubContainer>
				</TableContianer>
			</FilterContianer>
			{isTableModal && <ProNoPage title={'Pro.No 제품 선택'} proNoNumber={selectedCellData} />}
		</>
	)
}

export default AdminOrderDetail
