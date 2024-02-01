import React, { useEffect, useState } from 'react'
import { WhiteBlackBtn, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import {
	doubleClickedRowAtom,
	selectedRowsAtom,
	StandardDispatchDetailAtom,
	toggleAtom,
} from '../../../store/Layout/Layout'
import { FilterContianer, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'
import Hidden from '../../../components/TableInner/Hidden'
import { useAtom, useAtomValue } from 'jotai'
import DispatchDetail from '../../../modal/Multi/DispatchDetail'
import { GlobalFilterHeader } from '../../../components/Filter'
import { ShippingDispatchFields, ShippingDispatchFieldsCols } from '../../../constants/admin/Shipping'
import {
	useRemoveDispatchMutation,
	useShipmentDispatchListQuery,
	useShipmentStatusUpdateMutation,
} from '../../../api/shipment'
import { add_element_field } from '../../../lib/tableHelpers'
import Table from '../../Table/Table'
import useAlert from '../../../store/Alert/useAlert'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import { isEqual } from 'lodash'
import DisRegisterSearchFilter from './DisRegisterSearchFilter'
import { formatWeight } from '../../../utils/utils'
import { KilogramSum } from '../../../utils/KilogramSum'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import Excel from '../../../components/TableInner/Excel'
import { useNavigate } from 'react-router-dom'

const initData = {
	pageNum: 1,
	pageSize: 50,
	shipmentStatus: '출고 요청',
}

const DisRegister = () => {
	const navigate = useNavigate()
	const { simpleAlert, simpleConfirm } = useAlert()
	const selectedRows = useAtomValue(selectedRowsAtom)
	const exFilterToggle = useAtomValue(toggleAtom)
	const [isPostModal, setIsPostModal] = useAtom(StandardDispatchDetailAtom)
	const [detailRow, setDetailRow] = useAtom(doubleClickedRowAtom)

	const [id, setId] = useState(null) // 체크 박스 선택한 id 값
	const [param, setParam] = useState(initData)
	const [rows, setRows] = useState([])
	const [pagination, setPagination] = useState(null)

	const { data, isLoading, refetch } = useShipmentDispatchListQuery(param)
	const { mutate: removeDispatch } = useRemoveDispatchMutation() // 배차 취소
	const { mutate: shipmentStatusUpdate } = useShipmentStatusUpdateMutation() // 출고 상태 변경

	// 배차기사 취소
	const onRemoveDispatch = () => {
		if (!selectedRows || selectedRows?.length === 0) {
			return simpleAlert('배차 취소할 제품을 선택해주세요.')
		}
		const selectItem = selectedRows[0]
		const driverStatus = Boolean(selectItem['배차 여부'])

		if (!driverStatus) {
			return simpleAlert('취소하기 전 배차를 등록해주세요.')
		}
		simpleConfirm('배차 취소를 하시겠습니까?', () => removeDispatch(selectItem['출고 고유번호']))
	}

	// 배차기사 등록
	const onSetDispatch = () => {
		if (!selectedRows || selectedRows?.length === 0) {
			return simpleAlert('배차 등록할 제품을 선택해주세요.')
		}
		if (!selectedRows || selectedRows?.length > 1) {
			return simpleAlert('배차 등록은 하나만 가능합니다.')
		}
		const selectItem = selectedRows[0]
		setId(selectItem['출고 고유번호'])
		setIsPostModal(true)
	}

	// 출고 등록
	const onRegister = () => {
		if (!selectedRows || selectedRows?.length === 0) {
			return simpleAlert('출고 등록할 제품을 선택해주세요.')
		}
		const shipmentStatus = '출고 등록'
		const uids = selectedRows.map((item) => item['출고 고유번호'])
		const outStatusArray = selectedRows.map((item) => item['합짐 승인 상태'])
		const driverStatusArray = selectedRows.map((item) => item['배차 여부'])

		if (!outStatusArray.every((value) => value === '승인')) {
			return simpleAlert('출고 등록을 하려면 출고 상태를 승인 받아야 합니다.')
		}
		if (!driverStatusArray.every((value) => !!value)) {
			return simpleAlert('출고 등록을 하려면 배차 등록은 필수입니다.')
		}
		simpleConfirm('출고 등록하시겠습니까?', () => shipmentStatusUpdate({ shipmentStatus, uids }))
	}

	const handleTablePageSize = (event) => {
		setParam((prevParam) => ({
			...prevParam,
			pageSize: Number(event.target.value),
			pageNum: 1,
		}))
	}

	const onPageChange = (value) => {
		setParam((prevParam) => ({
			...prevParam,
			pageNum: Number(value),
		}))
	}

	const resetOnClick = () => setParam(initData)

	const searchOnClick = (userSearchParam) => {
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

	useEffect(() => {
		const list = data?.list
		if (list && Array.isArray(list)) {
			setRows(add_element_field(list, ShippingDispatchFields))
			setPagination(data?.pagination)
		}
	}, [data])

	useEffect(() => {
		const key = '출고 고유번호'
		if (detailRow && detailRow[key]) {
			navigate(`/shipping/dispatch/register/${detailRow[key]}`)
		}
		return () => setDetailRow(false)
	}, [detailRow])

	return (
		<FilterContianer>
			<GlobalFilterHeader title={'배차/출고 등록'} />
			{exFilterToggle && (
				<GlobalProductSearch
					param={param}
					isToggleSeparate={true}
					globalProductSearchOnClick={searchOnClick}
					globalProductResetOnClick={resetOnClick}
					renderCustomSearchFields={(props) => <DisRegisterSearchFilter {...props} />}
				/>
			)}
			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>{selectedRows?.length > 0 ? selectedRows?.length : '0'}</span> / )
						<Hidden />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={handleTablePageSize} />
						<Excel getRow={rows} sheetName={'배차출고 등록'} />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택 중량
						<span> {formatWeight(KilogramSum(selectedRows, '제품 총 중량'))} </span>
						kg / 총 중량 {formatWeight(pagination?.totalWeight)} kg
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteRedBtn onClick={onRemoveDispatch}>배차 취소</WhiteRedBtn>
						<WhiteSkyBtn onClick={onSetDispatch}>배차 등록</WhiteSkyBtn>
					</div>
				</TCSubContainer>
				<Table
					getRow={rows}
					loading={isLoading}
					getCol={ShippingDispatchFieldsCols}
					tablePagination={pagination}
					onPageChange={onPageChange}
				/>
				<TCSubContainer>
					<div></div>
					<div style={{ display: 'flex', gap: '10px' }}>
						{/*<WhiteBlackBtn onClick={getInvoicesHandler}>수취서 출력</WhiteBlackBtn>*/}
						{/*<ReceiptExcel />*/}
						<WhiteBlackBtn onClick={onRegister}>출고 등록</WhiteBlackBtn>
					</div>
				</TCSubContainer>
			</TableContianer>
			{isPostModal && <DispatchDetail id={id} setIsPostModal={setIsPostModal} />}
		</FilterContianer>
	)
}

export default DisRegister
