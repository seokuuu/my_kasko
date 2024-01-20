import React, { useEffect, useState } from 'react'
import Excel from '../../../components/TableInner/Excel'
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'

import Hidden from '../../../components/TableInner/Hidden'
import { FilterContianer, FilterWrap, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'

import PageDropdown from '../../../components/TableInner/PageDropdown'
import { ShippingRegisterFields, ShippingRegisterFieldsCols } from '../../../constants/admin/Shipping'
import { useAtomValue } from 'jotai'
import { add_element_field } from '../../../lib/tableHelpers'
import { GlobalFilterHeader } from '../../../components/Filter'
import { useShipmentListQuery } from '../../../api/shipment'
import Table from '../../../pages/Table/Table'
import UserPerformanceFilter from './UserPerformanceFilter'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import { isEqual } from 'lodash'
import { formatWeight } from '../../../utils/utils'
import { KilogramSum } from '../../../utils/KilogramSum'

const initData = {
	pageNum: 1,
	pageSize: 50,
	shipmentStatus: '운송 완료',
}

const UserPerformance = ({}) => {
	const selectedRows = useAtomValue(selectedRowsAtom)
	const exFilterToggle = useAtomValue(toggleAtom)

	const [rows, setRows] = useState([])
	const [pagination, setPagination] = useState(null)

	const [param, setParam] = useState(initData)
	const { data, refetch, isLoading } = useShipmentListQuery(param)

	console.log('param ::::::::: ', param)

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

	const resetOnClick = () => {
		setParam(initData)
	}

	const searchOnClick = (userSearchParam) => {
		setParam((prevParam) => {
			if (isEqual(prevParam, { ...prevParam, ...userSearchParam })) {
				return prevParam
			}
			return {
				...prevParam,
				...userSearchParam,
			}
		})
	}

	useEffect(() => {
		refetch()
	}, [param])

	useEffect(() => {
		const list = data?.list
		if (list && Array.isArray(list)) {
			setRows(add_element_field(list, ShippingRegisterFields))
			setPagination(data?.pagination)
		}
	}, [data])

	return (
		<FilterContianer>
			<GlobalFilterHeader title={'출고 실적 조회'} />
			{exFilterToggle && (
				<FilterWrap>
					<GlobalProductSearch
						param={param}
						isToggleSeparate={true}
						globalProductSearchOnClick={searchOnClick}
						globalProductResetOnClick={resetOnClick}
						renderCustomSearchFields={(props) => <UserPerformanceFilter {...props} />}
					/>
				</FilterWrap>
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
						<Excel getRow={rows} />
					</div>
				</TCSubContainer>
				<TCSubContainer bor>
					<div>
						선택 중량
						<span> {formatWeight(KilogramSum(selectedRows))} </span>
						kg / 총 중량 {formatWeight(pagination?.totalWeight)} kg
					</div>
					<div></div>
				</TCSubContainer>
				<Table
					getCol={ShippingRegisterFieldsCols}
					getRow={rows}
					loading={isLoading}
					tablePagination={pagination}
					onPageChange={onPageChange}
				/>
			</TableContianer>
		</FilterContianer>
	)
}

export default UserPerformance
