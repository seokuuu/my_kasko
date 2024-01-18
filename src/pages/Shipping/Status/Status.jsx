import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import { WhiteBlackBtn, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { doubleClickedRowAtom, selectedRowsAtom } from '../../../store/Layout/Layout'

import {
	FilterContianer,
	FilterLeft,
	FilterSubcontianer,
	RowWrap,
	TableContianer,
	TCSubContainer,
} from '../../../modal/External/ExternalFilter'

import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle } from '../Claim/ClaimRegister'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { useShipmentDispatchListQuery, useShipmentStatusUpdateMutation } from '../../../api/shipment'
import { useAtomValue } from 'jotai'
import { ShippingDispatchFields, ShippingDispatchFieldsCols } from '../../../constants/admin/Shipping'
import { GlobalFilterContainer, GlobalFilterFooter, GlobalFilterHeader } from '../../../components/Filter'
import { CustomerSearch, DateSearchSelect, DestinationSearch, StorageSelect } from '../../../components/Search'
import Table from '../../Table/Table'
import { add_element_field } from '../../../lib/tableHelpers'
import { useAtom } from 'jotai/index'
import { useNavigate } from 'react-router-dom'

const initData = {
	pageNum: 1,
	pageSize: 50,
	shipmentStatus: '출고 등록',
	storage: '',
	customerCode: '',
	customerName: '',
	destinationCode: '',
	destinationName: '',
	shipmentRequestStartDate: '',
	shipmentRequestEndDate: '',
	shippingStartDate: '',
	shippingEndDate: '',
	shipmentStartDate: '',
	shipmentEndDate: '',
}

const Status = () => {
	const navigate = useNavigate()
	// Table
	const tableField = useRef(ShippingDispatchFieldsCols)
	const getCol = tableField.current
	const [getRow, setGetRow] = useState('')
	const rowChecked = useAtomValue(selectedRowsAtom)
	const [detailRow, setDetailRow] = useAtom(doubleClickedRowAtom)

	// data fetch
	const [param, setParam] = useState(initData)
	const { isLoading, data, refetch } = useShipmentDispatchListQuery(param)
	const { mutate: shipmentStatusUpdate } = useShipmentStatusUpdateMutation() // 출고 상태 변경

	// param change
	const onChange = (key, value) => setParam((prev) => ({ ...prev, [key]: value, pageNum: 1 }))

	// reset event
	const onReset = async () => {
		await setParam(initData)
		await refetch()
	}

	// 출고 취소
	const onShipmentCancel = () => {
		if (!rowChecked || rowChecked?.length === 0) {
			return window.alert('출고 취소할 제품을 선택해주세요.')
		}
		const shipmentStatus = '출고 취소'
		const uids = rowChecked.map((item) => item['출고 고유번호'])
		if (window.confirm('출고 취소하시겠습니까?')) {
			shipmentStatusUpdate({ shipmentStatus, uids })
		}
	}

	// 운송 완료
	const onShipmentCompletion = () => {
		if (!rowChecked || rowChecked?.length === 0) {
			return window.alert('출고 취소할 제품을 선택해주세요.')
		}
		const shipmentStatus = '운송 완료'
		const uids = rowChecked.map((item) => item['출고 고유번호'])
		if (window.confirm('운송 완료 처리하시겠습니까?')) {
			shipmentStatusUpdate({ shipmentStatus, uids })
		}
	}

	useEffect(() => {
		const getData = data?.list
		if (getData && Array.isArray(getData)) {
			setGetRow(add_element_field(getData, ShippingDispatchFields))
		}
	}, [data])

	useEffect(() => {
		refetch()
	}, [param.pageNum, param.pageSize])

	useEffect(() => {
		if (detailRow && detailRow['출고 고유번호']) {
			navigate(`/shipping/status/${detailRow['출고 고유번호']}`)
		}
		return () => setDetailRow(false)
	}, [detailRow])

	return (
		<FilterContianer>
			<GlobalFilterHeader title={'출고 현황'} />

			<GlobalFilterContainer>
				<FilterSubcontianer>
					<FilterLeft>
						<RowWrap>
							<StorageSelect value={param.storage} onChange={(e) => onChange('storage', e.label)} />
							<DestinationSearch
								name={param.destinationName}
								code={param.destinationCode}
								setName={(value) => onChange('destinationName', value)}
								setCode={(value) => onChange('destinationCode', value)}
							/>
							<CustomerSearch
								name={param.customerName}
								code={param.customerCode}
								setName={(value) => onChange('customerName', value)}
								setCode={(value) => onChange('customerCode', value)}
							/>
						</RowWrap>

						<RowWrap none>
							<DateSearchSelect
								title={'출하 지시 일자'}
								startInitDate={param.shippingStartDate}
								endInitDate={param.shippingEndDate}
								startDateChange={(value) => onChange('shippingStartDate', value)}
								endDateChange={(value) => onChange('shippingEndDate', value)}
							/>

							<DateSearchSelect
								title={'출고 요청 일자'}
								startInitDate={param.shipmentRequestStartDate}
								endInitDate={param.shipmentRequestEndDate}
								startDateChange={(value) => onChange('shipmentRequestStartDate', value)}
								endDateChange={(value) => onChange('shipmentRequestEndDate', value)}
							/>
						</RowWrap>
						<RowWrap none>
							<DateSearchSelect
								title={'출고 일자'}
								startInitDate={param.shipmentStartDate}
								endInitDate={param.shipmentEndDate}
								startDateChange={(value) => onChange('shipmentStartDate', value)}
								endDateChange={(value) => onChange('shipmentEndDate', value)}
							/>
						</RowWrap>
					</FilterLeft>
				</FilterSubcontianer>
			</GlobalFilterContainer>
			{/* footer */}
			<GlobalFilterFooter reset={onReset} onSearch={refetch} />

			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>2</span> / {param.pageSize}개 )
						<Hidden />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={(e) => onChange('pageSize', Number(e.target.value))} />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div></div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteRedBtn onClick={onShipmentCancel}>출고 취소</WhiteRedBtn>
					</div>
				</TCSubContainer>
				<Table
					getCol={getCol}
					getRow={getRow}
					loading={isLoading}
					tablePagination={data?.pagination}
					onPageChange={(value) => onChange('pageNum', value)}
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
