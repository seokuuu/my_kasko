import React, { useEffect, useMemo, useState } from 'react'
import { WhiteSkyBtn } from '../../../common/Button/Button'
import { doubleClickedRowAtom, toggleAtom } from '../../../store/Layout/Layout'
import { useNavigate } from 'react-router-dom'
import { FilterContianer, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'
import { useAtom, useAtomValue } from 'jotai'
import { useShipmentListQuery } from '../../../api/shipment'
import { ShippingRegisterFields } from '../../../constants/admin/Shipping'
import { add_element_field } from '../../../lib/tableHelpers'
import { GlobalFilterHeader } from '../../../components/Filter'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import Excel from '../../../components/TableInner/Excel'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import AchievementSearchFilter from './AchievementSearchFilter'
import { isEqual } from 'lodash'
import useTableData from '../../../hooks/useTableData'
import useTableSelection from '../../../hooks/useTableSelection'
import { AchievementFields, AchievementFieldsCols } from '../fields/AchievementFields'
import { authAtom } from '../../../store/Auth/auth'
import TableV2 from '../../Table/TableV2'
import TableV2HiddenSection from '../../Table/TableV2HiddenSection'

const initData = {
	pageNum: 1,
	pageSize: 50,
	shipmentStatus: '운송 완료',
}

const Achievement = () => {
	const auth = useAtomValue(authAtom)
	const navigate = useNavigate()
	const exFilterToggle = useAtomValue(toggleAtom)
	const [detailRow, setDetailRow] = useAtom(doubleClickedRowAtom)

	const [getRow, setGetRow] = useState([])
	const getCols = useMemo(() => AchievementFieldsCols(AchievementFields(auth)), [auth])
	const [param, setParam] = useState(initData)

	const { data, refetch, isLoading } = useShipmentListQuery(param)

	const { tableRowData, paginationData, totalWeight, totalCount } = useTableData({
		tableField: AchievementFields(auth),
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
			setGetRow(add_element_field(list, ShippingRegisterFields))
		}
	}, [data])

	useEffect(() => {
		if (detailRow && detailRow['출고 번호']) {
			navigate(`/shipping/achievement/${detailRow['출고 번호']}`)
		}
		return () => setDetailRow(false)
	}, [detailRow])

	return (
		<FilterContianer>
			<GlobalFilterHeader title={'출고 실적'} />
			{exFilterToggle && (
				<GlobalProductSearch
					param={param}
					setParam={setParam}
					isToggleSeparate={true}
					globalProductSearchOnClick={searchOnClick}
					globalProductResetOnClick={resetOnClick}
					renderCustomSearchFields={(props) => <AchievementSearchFilter {...props} />}
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
						<Excel getRow={getRow} sheetName={'출고실적'} />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택중량 <span> {selectedWeightStr} </span> kg / 총 중량 {totalWeight?.toLocaleString()} kg
					</div>
				</TCSubContainer>
				<TableV2
					getRow={tableRowData}
					loading={isLoading}
					getCol={getCols}
					tablePagination={paginationData}
					onPageChange={onPageChange}
				/>
				<TCSubContainer>
					<div></div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteSkyBtn
							onClick={() => {
								navigate(`/shipping/achievement/invoice`)
							}}
						>
							거래 명세서 보기
						</WhiteSkyBtn>
					</div>
				</TCSubContainer>
			</TableContianer>
		</FilterContianer>
	)
}

export default Achievement
