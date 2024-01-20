import React, { useState } from 'react'
import { FilterHeader, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'
import { WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { ShippingRegisterFieldsCols } from '../../../constants/admin/Shipping'
import Table from '../../Table/Table'
import { useShipmentMergeMutation } from '../../../api/shipment'
import MergeHeader from './MergeHeader'
import { calculateTotal } from './utils'
import useAlert from '../../../store/Alert/useAlert'

const RequestSelector = ({ list, destinations, removeSelector }) => {
	const { simpleAlert, simpleConfirm } = useAlert()
	const [dockStatus, setDockStatus] = useState(false) // 상차도 여부
	const [mergeCost, setMergeCost] = useState(0) // 합짐비

	const { mutate: onCreateMerge } = useShipmentMergeMutation()

	// 선별 등록
	const onRegister = () => {
		const orderUids = list?.map((item) => item['주문 고유 번호'])
		if (orderUids.length === 0) {
			return simpleAlert('선별 목록에 제품을 추가해주세요.')
		}
		simpleConfirm('선별 등록하시겠습니까?', () => onCreateMerge({ dockStatus, orderUids }))
	}

	return (
		<>
			<FilterHeader style={{ marginTop: '30px' }}>
				<h1>선별 등록</h1>
			</FilterHeader>
			<MergeHeader
				list={list}
				destinations={destinations}
				mergeCost={mergeCost}
				setMergeCost={setMergeCost}
				dockStatus={dockStatus}
				setDockStatus={setDockStatus}
			/>
			<TableContianer>
				<TCSubContainer bor>
					<div>목록 총 ({list?.length}개 )</div>
					<div style={{ display: 'flex', gap: '10px' }}></div>
				</TCSubContainer>
				<TCSubContainer>
					<div>총 중량 {calculateTotal(list, '중량')} kg</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteRedBtn onClick={removeSelector}>목록 제거</WhiteRedBtn>
						<WhiteSkyBtn onClick={onRegister}>선별 등록</WhiteSkyBtn>
					</div>
				</TCSubContainer>
				<Table getCol={ShippingRegisterFieldsCols} getRow={list} />
			</TableContianer>
		</>
	)
}

export default RequestSelector
