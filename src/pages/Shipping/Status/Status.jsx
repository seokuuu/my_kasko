import React, { useEffect, useState } from 'react'
import { WhiteBlackBtn, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import {
	doubleClickedRowAtom,
	selectedRowsAtom,
	StandardDispatchDetailAtom,
	toggleAtom,
} from '../../../store/Layout/Layout'

import { FilterContianer, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'

import { useAtomValue } from 'jotai'
import { useAtom } from 'jotai/index'
import { isEqual } from 'lodash'
import { useNavigate } from 'react-router-dom'
import {
	useRemoveDispatchMutation,
	useShipmentDispatchListQuery,
	useShipmentStatusUpdateMutation,
} from '../../../api/shipment'
import { GlobalFilterHeader } from '../../../components/Filter'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import Excel from '../../../components/TableInner/Excel'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { ShippingStatusFields, ShippingStatusFieldsCols } from '../../../constants/admin/Shipping'
import { add_element_field } from '../../../lib/tableHelpers'
import useAlert from '../../../store/Alert/useAlert'
import StatusSearchFilter from './StatusSearchFilter'
import useTableData from '../../../hooks/useTableData'
import useTableSelection from '../../../hooks/useTableSelection'
import TableV2 from '../../Table/TableV2'
import TableV2HiddenSection from '../../Table/TableV2HiddenSection'
import ReceiptExcelV2 from './ReceiptExcelV2'
import { authAtom } from '../../../store/Auth/auth'
import DispatchDetail from '../../../modal/Multi/DispatchDetail'
import OutCancelModel from './OutCancelModel'
import TransportationProgressModal from './TransportationProgressModal'

const initData = {
	pageNum: 1,
	pageSize: 50,
	shipmentStatus: '출고 등록',
}

const Status = () => {
	const auth = useAtomValue(authAtom)
	const { simpleAlert, simpleConfirm } = useAlert()
	const navigate = useNavigate()
	const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom)
	const exFilterToggle = useAtomValue(toggleAtom)
	const [detailRow, setDetailRow] = useAtom(doubleClickedRowAtom)
	const [isPostModal, setIsPostModal] = useAtom(StandardDispatchDetailAtom)

	const [id, setId] = useState(null) // 체크 박스 선택한 id 값
	const [param, setParam] = useState(initData)
	const [rows, setGetRow] = useState([])
	const [isCancelModal, setIsCancelModal] = useState(false)
	const [isTransportationProgressModal, setIsTransportationProgressModal] = useState(false)

	const { isLoading, data, refetch } = useShipmentDispatchListQuery(param)
	const { mutate: shipmentStatusUpdate } = useShipmentStatusUpdateMutation() // 출고 상태 변경
	const { mutate: removeDispatch } = useRemoveDispatchMutation() // 배차 취소

	const { tableRowData, paginationData, totalWeight, totalCount } = useTableData({
		tableField: ShippingStatusFields,
		serverData: data,
	})

	// 선택 항목
	const { selectedWeightStr, selectedCountStr } = useTableSelection({
		weightKey: '중량 합계',
	})

	// 출고 취소
	const onShipmentCancel = (value) => {
		if (!selectedRows || selectedRows?.length === 0) {
			return simpleAlert('출고 취소할 제품을 선택해주세요.')
		}
		const shipmentStatus = '출고 취소'
		const uids = selectedRows.map((item) => item['출고 고유번호'])

		simpleConfirm('출고 취소하시겠습니까?', () => {
			shipmentStatusUpdate({ shipmentStatus, uids, cancelReason: value })
			setSelectedRows([])
			setIsCancelModal(false)
		})
	}

	// 배차기사 취소
	const onRemoveDispatch = () => {
		if (!selectedRows || selectedRows?.length === 0) {
			return simpleAlert('배차 취소할 제품을 선택해주세요.')
		}
		if (!selectedRows || selectedRows?.length > 1) {
			return simpleAlert('배차 취소는 하나만 가능합니다.')
		}
		const selectItem = selectedRows[0]
		const driverStatus = selectItem['배차 여부']

		if (driverStatus === 'N') {
			return simpleAlert('취소하기 전 배차를 등록해주세요.')
		}
		simpleConfirm('배차 취소를 하시겠습니까?', () => {
			removeDispatch(selectItem['출고 고유번호'])
			setSelectedRows([])
		})
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

	// 운송 진행
	const onTransportationProgress = (outLoadDate, outUnLoadDate) => {
		if (!selectedRows || selectedRows?.length === 0) {
			return simpleAlert('제품을 선택해주세요.')
		}
		const shipmentStatus = '운송 진행'
		const uids = selectedRows.map((item) => item['출고 고유번호'])
		const driverStatusList = selectedRows.map((item) => item[['배차 여부']])

		if (!driverStatusList.every((value) => value === 'Y')) {
			return simpleAlert('운송 진행 전 배차 기사를 등록해주세요.')
		}

		simpleConfirm('운송 진행하시겠습니까?', () => {
			shipmentStatusUpdate({ shipmentStatus, uids, outLoadDate, outUnLoadDate })
			setSelectedRows([])
			setIsTransportationProgressModal(false)
		})
	}

	// 운송 완료
	const onShipmentCompletion = () => {
		if (!selectedRows || selectedRows?.length === 0) {
			return simpleAlert('제품을 선택해주세요.')
		}
		const shipmentStatus = '운송 완료'
		const uids = selectedRows.map((item) => item['출고 고유번호'])
		const driverStatusList = selectedRows.map((item) => item[['배차 여부']])

		if (!driverStatusList.every((value) => value === 'Y')) {
			return simpleAlert('운송 완료 전 배차 기사를 등록해주세요.')
		}

		simpleConfirm('운송 완료 처리하시겠습니까?', () => {
			shipmentStatusUpdate({ shipmentStatus, uids })
			setSelectedRows([])
		})
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
		const list = data?.list
		if (list && Array.isArray(list)) {
			setGetRow(add_element_field(list, ShippingStatusFields))
		}
	}, [data])

	useEffect(() => {
		refetch()
	}, [param])

	useEffect(() => {
		if (detailRow && detailRow['출고 고유번호']) {
			navigate(`/shipping/status/${detailRow['출고 고유번호']}`)
		}
		return () => setDetailRow(false)
	}, [detailRow])

	return (
		<FilterContianer style={{ minWidth: '1400px' }}>
			<GlobalFilterHeader title={'출고 현황'} />
			{exFilterToggle && (
				<GlobalProductSearch
					param={param}
					setParam={setParam}
					isToggleSeparate={true}
					globalProductSearchOnClick={searchOnClick}
					globalProductResetOnClick={resetOnClick}
					renderCustomSearchFields={(props) => <StatusSearchFilter {...props} />}
				/>
			)}
			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>{selectedCountStr}</span> / {totalCount?.toLocaleString()}개 )
						<TableV2HiddenSection />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={handleTablePageSize} />
						<Excel getRow={rows} sheetName={'출고 현황'} />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택중량 <span> {selectedWeightStr} </span> kg / 총 중량 {totalWeight?.toLocaleString()} kg
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteRedBtn onClick={onRemoveDispatch}>배차 취소</WhiteRedBtn>
						<WhiteSkyBtn onClick={onSetDispatch}>배차 등록</WhiteSkyBtn>
					</div>
				</TCSubContainer>
				<TableV2
					loading={isLoading}
					getRow={tableRowData}
					getCol={ShippingStatusFieldsCols}
					tablePagination={paginationData}
					onPageChange={onPageChange}
				/>
				<TCSubContainer>
					<div></div>
					<div style={{ display: 'flex', gap: '10px' }}>
						{['카스코철강', '창고'].includes(auth?.role) && (
							<WhiteRedBtn
								onClick={() => {
									if (!selectedRows || selectedRows?.length === 0) {
										return simpleAlert('출고 취소할 제품을 선택해주세요.')
									}
									setIsCancelModal(true)
								}}
							>
								출고 취소
							</WhiteRedBtn>
						)}
						{['카스코철강', '운송사'].includes(auth?.role) && (
							<WhiteBlackBtn
								onClick={() => {
									if (!selectedRows || selectedRows?.length === 0) {
										return simpleAlert('제품을 선택해주세요.')
									}
									const driverStatusList = selectedRows.map((item) => item[['배차 여부']])
									if (!driverStatusList.every((value) => value === 'Y')) {
										return simpleAlert('운송 진행 전 배차 기사를 등록해주세요.')
									}
									setIsTransportationProgressModal(true)
								}}
							>
								운송 진행
							</WhiteBlackBtn>
						)}
						{['카스코철강', '운송사'].includes(auth?.role) && (
							<WhiteBlackBtn onClick={onShipmentCompletion}>운송 완료</WhiteBlackBtn>
						)}
						<ReceiptExcelV2 />
					</div>
				</TCSubContainer>
			</TableContianer>
			{isPostModal && (
				<DispatchDetail
					id={id}
					setIsPostModal={setIsPostModal}
					modalClose={() => {
						setIsPostModal(false)
					}}
				/>
			)}
			{isCancelModal && (
				<OutCancelModel auctionFn={(value) => onShipmentCancel(value)} closeFn={() => setIsCancelModal(false)} />
			)}
			{isTransportationProgressModal && (
				<TransportationProgressModal
					auctionFn={(outLoadDate, outUnLoadDate) => onTransportationProgress(outLoadDate, outUnLoadDate)}
					closeFn={() => setIsTransportationProgressModal(false)}
				/>
			)}
		</FilterContianer>
	)
}

export default Status
