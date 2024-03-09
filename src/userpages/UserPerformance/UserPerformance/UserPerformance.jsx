import React, { useEffect, useState } from 'react'
import Excel from '../../../components/TableInner/Excel'
import { toggleAtom } from '../../../store/Layout/Layout'
import { FilterContianer, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { ShippingRegisterFields } from '../../../constants/admin/Shipping'
import { useAtomValue } from 'jotai'
import { add_element_field } from '../../../lib/tableHelpers'
import { GlobalFilterHeader } from '../../../components/Filter'
import { useShipmentListQuery } from '../../../api/shipment'
import UserPerformanceFilter from './UserPerformanceFilter'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import { isEqual } from 'lodash'
import useTableData from '../../../hooks/useTableData'
import useTableSelection from '../../../hooks/useTableSelection'
import { authAtom } from '../../../store/Auth/auth'
import TableV2 from '../../../pages/Table/TableV2'
import TableV2HiddenSection from '../../../pages/Table/TableV2HiddenSection'
import { UserPerformanceFields, UserPerformanceFieldsCols } from './UserPerformanceFields'

const initData = {
	pageNum: 1,
	pageSize: 50,
	shipmentStatus: '운송 완료',
}

const UserPerformance = () => {
	const auth = useAtomValue(authAtom)
	const exFilterToggle = useAtomValue(toggleAtom)

	const [rows, setRows] = useState([])

	const [param, setParam] = useState(initData)
	const { data, refetch, isLoading } = useShipmentListQuery(param)

	const { tableRowData, paginationData, totalWeight, totalCount } = useTableData({
		tableField: UserPerformanceFields,
		serverData: data,
	})

	// 선택 항목
	const { selectedWeightStr, selectedCountStr } = useTableSelection({
		weightKey: '중량',
	})

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
			setRows(add_element_field(list, ShippingRegisterFields))
		}
	}, [data])

	return (
		<FilterContianer>
			<GlobalFilterHeader title={'출고 실적 조회'} />
			{exFilterToggle && (
				<GlobalProductSearch
					param={param}
					isToggleSeparate={true}
					globalProductSearchOnClick={searchOnClick}
					globalProductResetOnClick={resetOnClick}
					renderCustomSearchFields={(props) => <UserPerformanceFilter {...props} />}
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
						<Excel getRow={rows} sheetName={'출고 실적'} />
					</div>
				</TCSubContainer>
				<TCSubContainer bor>
					<div>
						선택중량 <span> {selectedWeightStr} </span> kg / 총 중량 {totalWeight?.toLocaleString()} kg
					</div>
					<div></div>
				</TCSubContainer>
				<TableV2
					getRow={tableRowData}
					loading={isLoading}
					getCol={UserPerformanceFieldsCols}
					tablePagination={paginationData}
					onPageChange={onPageChange}
				/>
			</TableContianer>
		</FilterContianer>
	)
}

export default UserPerformance
