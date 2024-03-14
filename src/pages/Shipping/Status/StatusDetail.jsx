import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useShipmentDispatchDetailsQuery } from '../../../api/shipment'
import { WhiteBtn } from '../../../common/Button/Button'
import { GlobalFilterHeader } from '../../../components/Filter'
import Excel from '../../../components/TableInner/Excel'
import { ShippingStatusDetailsFields, ShippingStatusDetailsFieldsCols } from '../../../constants/admin/Shipping'
import { add_element_field } from '../../../lib/tableHelpers'
import { BlueBarBtnWrap } from '../../../modal/Common/Common.Styled'
import { FilterContianer, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'
import StausDetailHeader from './StausDetailHeader'
import useTableData from '../../../hooks/useTableData'
import useTableSelection from '../../../hooks/useTableSelection'
import { calculateTotal } from '../Request/utils'
import TableV2HiddenSection from '../../Table/TableV2HiddenSection'
import TableV2 from '../../Table/TableV2'

const DisRegisterDetail = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	const [getRow, setGetRow] = useState([])
	const [list, setList] = useState([])
	const [serverData, setServerData] = useState([])

	const { data, isLoading } = useShipmentDispatchDetailsQuery(id)

	const { tableRowData } = useTableData({
		tableField: ShippingStatusDetailsFields,
		serverData: serverData,
	})

	// 선택 항목
	const { selectedWeightStr, selectedCountStr } = useTableSelection({
		weightKey: '중량',
	})

	const backTo = () => navigate(-1)

	useEffect(() => {
		if (list && Array.isArray(list)) {
			setGetRow(add_element_field(list, ShippingStatusDetailsFields))
			setServerData({ list })
		}
	}, [list])

	useEffect(() => {
		if (data && Array.isArray(data)) {
			setList(data)
		}
	}, [data])

	return (
		<FilterContianer>
			<GlobalFilterHeader title={'출고 현황 상세'} enableSearchFilters={false} />
			<StausDetailHeader data={list} />
			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>{selectedCountStr}</span> / {list?.length?.toLocaleString()}개 )
						<TableV2HiddenSection />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<Excel getRow={getRow} sheetName="출고 현황 상세 리스트" />
					</div>
				</TCSubContainer>
				<TCSubContainer bor>
					<div>
						선택중량 <span> {selectedWeightStr} </span> kg / 총 중량 {calculateTotal(list, 'weight')} kg
					</div>
				</TCSubContainer>
				<TableV2 loading={isLoading} getCol={ShippingStatusDetailsFieldsCols} getRow={tableRowData} />
				<BlueBarBtnWrap style={{ gap: '12px' }}>
					<WhiteBtn fontSize={17} width={10} height={35} onClick={backTo}>
						돌아가기
					</WhiteBtn>
				</BlueBarBtnWrap>
			</TableContianer>
		</FilterContianer>
	)
}

export default DisRegisterDetail
