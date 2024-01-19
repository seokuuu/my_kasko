import React, { useEffect, useRef, useState } from 'react'
import Excel from '../../../components/TableInner/Excel'
import { selectedRowsAtom } from '../../../store/Layout/Layout'

import Hidden from '../../../components/TableInner/Hidden'
import { FilterContianer, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'

import PageDropdown from '../../../components/TableInner/PageDropdown'
import { ShippingRegisterFields, ShippingRegisterFieldsCols } from '../../../constants/admin/Shipping'
import { useAtom } from 'jotai'
import { add_element_field } from '../../../lib/tableHelpers'
import { GlobalFilterContainer, GlobalFilterFooter, GlobalFilterHeader } from '../../../components/Filter'
import { useShipmentListQuery } from '../../../api/shipment'
import Table from '../../../pages/Table/Table'
import UserPerformanceFilter from './UserPerformanceFilter'

const initData = {
	pageNum: 1,
	pageSize: 50,
	shipmentStatus: '운송 완료',
	auctionStartDate: '',
	auctionEndDate: '',
	shipmentStartDate: '',
	shipmentEndDate: '',
	storage: '',
	spec: '',
	spart: '',
	grade: '',
	customerCode: '',
	customerName: '',
	minThickness: 0, // 최소 두께 (Minimum thickness)
	maxThickness: 0, // 최대 두께 (Maximum thickness)
	minWidth: 0, // 최소 폭 (Minimum width)
	maxWidth: 0, // 최대 폭 (Maximum width)
	minLength: 0, // 최소 길이 (Minimum length)
	maxLength: 0, // 최대 길이 (Maximum length)
	productNumberList: '',
}

const UserPerformance = ({}) => {
	// Table
	const tableField = useRef(ShippingRegisterFieldsCols)
	const getCol = tableField.current
	const [getRow, setGetRow] = useState('')
	const selectedRows = useAtom(selectedRowsAtom)[0]

	// data fetch
	const [param, setParam] = useState(initData)
	const { data, refetch, isLoading } = useShipmentListQuery(param)

	// param change
	const onChange = (key, value) => setParam((prev) => ({ ...prev, [key]: value, pageNum: 1 }))

	// reset event
	const onReset = async () => {
		await setParam(initData)
		await refetch()
	}

	useEffect(() => {
		const getData = data?.list
		if (getData && Array.isArray(getData)) {
			setGetRow(add_element_field(getData, ShippingRegisterFields))
		}
	}, [data])

	useEffect(() => {
		refetch()
	}, [param.pageNum, param.pageSize])

	return (
		<FilterContianer>
			{/* header */}
			<GlobalFilterHeader title={'출고 실적 조회'} />
			<GlobalFilterContainer>
				<UserPerformanceFilter param={param} onChange={onChange} />
			</GlobalFilterContainer>
			{/* footer */}
			<GlobalFilterFooter reset={onReset} onSearch={refetch} />

			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>2</span> / 50개 )
						<Hidden />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown />
						<Excel />
					</div>
				</TCSubContainer>
				<TCSubContainer bor>
					<div>
						선택 중량<span> 2 </span>kg / 총 중량 kg
					</div>
					<div></div>
				</TCSubContainer>
				<Table
					getCol={getCol}
					getRow={getRow}
					loading={isLoading}
					tablePagination={data?.pagination}
					onPageChange={(value) => onChange('pageNum', value)}
				/>
			</TableContianer>
		</FilterContianer>
	)
}

export default UserPerformance
