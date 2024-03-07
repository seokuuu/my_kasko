import React, { useEffect, useState } from 'react'
import { WhiteSkyBtn } from '../../../common/Button/Button'
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'
import { FilterContianer, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'
import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle, TableWrap } from '../../../components/MapTable/MapTable'
import { useShipmentListQuery, useShipmentStatusUpdateMutation } from '../../../api/shipment'
import { GlobalFilterHeader } from '../../../components/Filter'
import { add_element_field } from '../../../lib/tableHelpers'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import Excel from '../../../components/TableInner/Excel'
import { calculateTotal } from '../Request/utils'
import { isEqual } from 'lodash'
import useAlert from '../../../store/Alert/useAlert'
import { useAtom, useAtomValue } from 'jotai'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import RegisterSearchFilter from './RegisterSearchFilter'
import TableV2 from '../../Table/TableV2'
import useTableData from '../../../hooks/useTableData'
import useTableSelection from '../../../hooks/useTableSelection'
import TableV2HiddenSection from '../../Table/TableV2HiddenSection'
import { authAtom } from '../../../store/Auth/auth'
import { RegisterFields, RegisterFieldsCols } from '../fields/RegisterFields'

const initData = {
	pageNum: 1,
	pageSize: 50,
	shipmentStatus: '출하 대기',
}

const Register = () => {
	const auth = useAtomValue(authAtom)
	const { simpleAlert, simpleConfirm } = useAlert()

	const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom)
	const exFilterToggle = useAtomValue(toggleAtom)

	const [param, setParam] = useState(initData)
	const [rows, setRows] = useState([])

	const { data, isLoading, refetch } = useShipmentListQuery(param)
	const { mutate: shipmentStatusUpdate } = useShipmentStatusUpdateMutation()

	const { tableRowData, paginationData, totalWeight, totalCount } = useTableData({
		tableField: RegisterFields(auth),
		serverData: data,
	})

	// 선택 항목
	const { selectedWeightStr, selectedCountStr } = useTableSelection({
		weightKey: '중량',
	})

	// 출하 지시
	const onRegister = () => {
		if (!selectedRows || selectedRows?.length === 0) {
			return simpleAlert('제품을 선택해주세요.')
		}
		const uids = selectedRows.map((item) => item['주문 고유 번호'])
		const shipmentStatus = '출하 지시'
		simpleConfirm('출하 지시 등록하시겠습니까?', () => {
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
		refetch()
	}, [param])

	useEffect(() => {
		const list = data?.list
		if (list && Array.isArray(list)) {
			const newList = list.map((item, index) => ({ index: index + 1, ...item }))
			setRows(add_element_field(newList, RegisterFields(auth)))
		}
	}, [data])

	return (
		<FilterContianer>
			<GlobalFilterHeader title={'출하지시 등록'} />
			{exFilterToggle && (
				<GlobalProductSearch
					param={param}
					isToggleSeparate={true}
					globalProductSearchOnClick={searchOnClick}
					globalProductResetOnClick={resetOnClick}
					renderCustomSearchFields={(props) => <RegisterSearchFilter {...props} />}
				/>
			)}
			{auth.role === '카스코철강' && (
				<TableWrap>
					<ClaimTable>
						<ClaimRow>
							<ClaimTitle>제품 중량(kg)</ClaimTitle>
							<ClaimContent>{totalWeight.toLocaleString()}</ClaimContent>
							<ClaimTitle>제품 공급가액</ClaimTitle>
							<ClaimContent>{calculateTotal(data?.list, 'orderPrice')}</ClaimContent>
							<ClaimTitle>운반비 공급가액</ClaimTitle>
							<ClaimContent>{calculateTotal(data?.list, 'freightCost')}</ClaimContent>
						</ClaimRow>
					</ClaimTable>
				</TableWrap>
			)}

			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>{selectedCountStr}</span> / {totalCount.toLocaleString()}개 )
						<TableV2HiddenSection />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={handleTablePageSize} />
						<Excel getRow={rows} sheetName={'출하_지시_등록'} />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택중량 <span> {selectedWeightStr} </span> kg / 총 중량 {totalWeight.toLocaleString()} kg
					</div>
					<div>
						<WhiteSkyBtn onClick={onRegister}>출하 지시</WhiteSkyBtn>
					</div>
				</TCSubContainer>
				<TableV2
					getRow={tableRowData}
					loading={isLoading}
					getCol={RegisterFieldsCols(RegisterFields(auth))}
					tablePagination={paginationData}
					onPageChange={onPageChange}
				/>
			</TableContianer>
		</FilterContianer>
	)
}

export default Register
