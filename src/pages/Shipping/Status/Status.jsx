import React, { useEffect, useState } from 'react'
import { WhiteBlackBtn, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { doubleClickedRowAtom, selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'

import { FilterContianer, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'

import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle } from '../Claim/ClaimRegister'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { useShipmentDispatchListQuery, useShipmentStatusUpdateMutation } from '../../../api/shipment'
import { useAtomValue } from 'jotai'
import { ShippingDispatchFields, ShippingDispatchFieldsCols } from '../../../constants/admin/Shipping'
import { GlobalFilterHeader } from '../../../components/Filter'
import Table from '../../Table/Table'
import { add_element_field } from '../../../lib/tableHelpers'
import { useAtom } from 'jotai/index'
import { useNavigate } from 'react-router-dom'
import useAlert from '../../../store/Alert/useAlert'
import { isEqual } from 'lodash'
import { formatWeight } from '../../../utils/utils'
import { KilogramSum } from '../../../utils/KilogramSum'
import Excel from '../../../components/TableInner/Excel'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import StatusSearchFilter from './StatusSearchFilter'

const initData = {
	pageNum: 1,
	pageSize: 50,
	shipmentStatus: '출고 등록',
}

const Status = () => {
	const { simpleAlert, simpleConfirm } = useAlert()
	const navigate = useNavigate()
	const selectedRows = useAtomValue(selectedRowsAtom)
	const exFilterToggle = useAtomValue(toggleAtom)
	const [detailRow, setDetailRow] = useAtom(doubleClickedRowAtom)

	const [param, setParam] = useState(initData)
	const [rows, setGetRow] = useState([])
	const [pagination, setPagination] = useState(null)

	const { isLoading, data, refetch } = useShipmentDispatchListQuery(param)
	const { mutate: shipmentStatusUpdate } = useShipmentStatusUpdateMutation() // 출고 상태 변경

	// 출고 취소
	const onShipmentCancel = () => {
		if (!selectedRows || selectedRows?.length === 0) {
			return simpleAlert('출고 취소할 제품을 선택해주세요.')
		}
		const shipmentStatus = '출고 취소'
		const uids = selectedRows.map((item) => item['출고 고유번호'])
		simpleConfirm('출고 취소하시겠습니까?', () => shipmentStatusUpdate({ shipmentStatus, uids }))
	}

	// 운송 완료
	const onShipmentCompletion = () => {
		if (!selectedRows || selectedRows?.length === 0) {
			return simpleAlert('출고 취소할 제품을 선택해주세요.')
		}
		const shipmentStatus = '운송 완료'
		const uids = selectedRows.map((item) => item['출고 고유번호'])
		simpleConfirm('운송 완료 처리하시겠습니까?', shipmentStatusUpdate({ shipmentStatus, uids }))
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
			setGetRow(add_element_field(list, ShippingDispatchFields))
			setPagination(data?.pagination)
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
		<FilterContianer>
			<GlobalFilterHeader title={'출고 현황'} />
			{exFilterToggle && (
				<GlobalProductSearch
					param={param}
					isToggleSeparate={true}
					globalProductSearchOnClick={searchOnClick}
					globalProductResetOnClick={resetOnClick}
					renderCustomSearchFields={(props) => <StatusSearchFilter {...props} />}
				/>
			)}
			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>{selectedRows?.length > 0 ? selectedRows?.length : '0'}</span> /{' '}
						{pagination?.listCount}개 )
						<Hidden />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={handleTablePageSize} />
						<Excel getRow={rows} sheetName={'출고 현황'} />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택 중량
						<span> {formatWeight(KilogramSum(selectedRows))} </span>
						kg / 총 중량 {formatWeight(pagination?.totalWeight)} kg
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteRedBtn onClick={onShipmentCancel}>출고 취소</WhiteRedBtn>
					</div>
				</TCSubContainer>
				<Table
					getCol={ShippingDispatchFieldsCols}
					getRow={rows}
					loading={isLoading}
					tablePagination={pagination}
					onPageChange={onPageChange}
				/>
				<TCSubContainer>
					<div></div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteBlackBtn onClick={onShipmentCompletion}>운송 완료</WhiteBlackBtn>
						<WhiteSkyBtn>수취서 출력</WhiteSkyBtn>
					</div>
				</TCSubContainer>
			</TableContianer>
		</FilterContianer>
	)
}

export default Status
