import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useShipmentDispatchDetailsQuery } from '../../../api/shipment'
import { WhiteBtn } from '../../../common/Button/Button'
import { GlobalFilterHeader } from '../../../components/Filter'
import Excel from '../../../components/TableInner/Excel'
import Hidden from '../../../components/TableInner/Hidden'
import { ShippingDispatchDetailsFields, ShippingDispatchDetailsFieldsCols } from '../../../constants/admin/Shipping'
import { add_element_field } from '../../../lib/tableHelpers'
import { BlueBarBtnWrap } from '../../../modal/Common/Common.Styled'
import { FilterContianer, TCSubContainer, TableContianer } from '../../../modal/External/ExternalFilter'
import Table from '../../Table/Table'
import StausDetailHeader from './StausDetailHeader'

const DisRegisterDetail = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	const [getRow, setGetRow] = useState([])
	const [list, setList] = useState([])

	const { data, isLoading } = useShipmentDispatchDetailsQuery(id)

	const backTo = () => navigate(-1)

	useEffect(() => {
		if (list && Array.isArray(list)) {
			setGetRow(add_element_field(list, ShippingDispatchDetailsFields))
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
					<div style={{ display: 'flex' }}>
						조회 목록 (<span>{data?.length}개</span>)
						<Hidden />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<Excel getRow={getRow} sheetName="출고 현황 상세 리스트" />
					</div>
				</TCSubContainer>
				<Table getCol={ShippingDispatchDetailsFieldsCols} getRow={getRow} loading={isLoading} />
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
