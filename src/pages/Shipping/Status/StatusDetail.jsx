import React, { useEffect, useRef, useState } from 'react'
import { WhiteBtn } from '../../../common/Button/Button'
import { FilterContianer, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'
import Hidden from '../../../components/TableInner/Hidden'
import { useShipmentDispatchDetailsQuery } from '../../../api/shipment'
import { ShippingDispatchDetailsFields, ShippingDispatchDetailsFieldsCols } from '../../../constants/admin/Shipping'
import { add_element_field } from '../../../lib/tableHelpers'
import { GlobalFilterHeader } from '../../../components/Filter'
import Table from '../../Table/Table'
import { BlueBarBtnWrap } from '../../../modal/Common/Common.Styled'
import { useNavigate, useParams } from 'react-router-dom'
import StausDetailHeader from './StausDetailHeader'

const DisRegisterDetail = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	// Table
	const tableField = useRef(ShippingDispatchDetailsFieldsCols)
	const getCol = tableField.current
	const [getRow, setGetRow] = useState('')

	// data fetch
	const { data, isLoading } = useShipmentDispatchDetailsQuery(id)
	const [list, setList] = useState([])

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
					<div>
						조회 목록 (<span>{data?.length}개</span>)
						<Hidden />
					</div>
				</TCSubContainer>
				<Table getCol={getCol} getRow={getRow} loading={isLoading} />
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
