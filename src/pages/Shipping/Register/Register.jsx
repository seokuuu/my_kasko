import React, { useEffect, useState } from 'react'
import { WhiteSkyBtn } from '../../../common/Button/Button'
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'
import { FilterContianer, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'
import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle, TableWrap } from '../../../components/MapTable/MapTable'
import Hidden from '../../../components/TableInner/Hidden'
import { useShipmentListQuery, useShipmentStatusUpdateMutation } from '../../../api/shipment'
import { GlobalFilterHeader } from '../../../components/Filter'
import Table from '../../Table/Table'
import { ShippingRegisterFields, ShippingRegisterFieldsCols } from '../../../constants/admin/Shipping'
import { add_element_field } from '../../../lib/tableHelpers'
import { formatWeight } from '../../../utils/utils'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import Excel from '../../../components/TableInner/Excel'
import { calculateTotal } from '../Request/utils'
import { isEqual } from 'lodash'
import useAlert from '../../../store/Alert/useAlert'
import { useAtom, useAtomValue } from 'jotai'
import { KilogramSum } from '../../../utils/KilogramSum'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import RegisterSearchFilter from './RegisterSearchFilter'

const initData = {
	pageNum: 1,
	pageSize: 50,
	shipmentStatus: '출하 대기',
}

const Register = () => {
	const { simpleAlert, simpleConfirm } = useAlert()
	const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom)
	const exFilterToggle = useAtomValue(toggleAtom)

	const [param, setParam] = useState(initData)
	const [rows, setRows] = useState([])
	const [pagination, setPagination] = useState(null)

	const { data, isLoading, refetch } = useShipmentListQuery(param)
	const { mutate: shipmentStatusUpdate } = useShipmentStatusUpdateMutation()

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
			setRows(add_element_field(list, ShippingRegisterFields))
			setPagination(data?.pagination)
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
			<TableWrap>
				<ClaimTable>
					<ClaimRow>
						<ClaimTitle>제품 중량(kg)</ClaimTitle>
						<ClaimContent>{formatWeight(pagination?.totalWeight)}</ClaimContent>
						<ClaimTitle>제품 공급가액</ClaimTitle>
						<ClaimContent>{calculateTotal(rows, 'orderPrice')}</ClaimContent>
						<ClaimTitle>운반비 공급가액</ClaimTitle>
						<ClaimContent>{calculateTotal(rows, 'freightCost')}</ClaimContent>
					</ClaimRow>
				</ClaimTable>
			</TableWrap>

			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>{selectedRows?.length > 0 ? selectedRows?.length : '0'}</span> /{' '}
						{pagination?.listCount}개 )
						<Hidden />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={handleTablePageSize} />
						<Excel getRow={rows} sheetName={'출하지시등록'} />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택 중량
						<span> {formatWeight(KilogramSum(selectedRows))} </span>
						kg / 총 중량 {formatWeight(pagination?.totalWeight)} kg
					</div>
					<div>
						<WhiteSkyBtn onClick={onRegister}>출하 지시</WhiteSkyBtn>
					</div>
				</TCSubContainer>
				<Table
					getRow={rows}
					loading={isLoading}
					getCol={ShippingRegisterFieldsCols}
					tablePagination={pagination}
					onPageChange={onPageChange}
				/>
			</TableContianer>
		</FilterContianer>
	)
}

export default Register
