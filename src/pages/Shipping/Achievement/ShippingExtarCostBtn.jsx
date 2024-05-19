import { WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import React, { useState } from 'react'
import { useAtom } from 'jotai/index'
import { achievementAddedAtom, selectedRowsAtom } from '../../../store/Layout/Layout'
import useAlert from '../../../store/Alert/useAlert'
import AchievementModal from '../../../modal/Multi/Achievement'
import { useShipmentRemoveExtraCostMutation } from '../../../api/shipment'

const ShippingExtarCostBtn = ({ data, outNumber }) => {
	const { simpleAlert, redAlert } = useAlert()
	const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom)

	const [addedModal, setAddedModal] = useAtom(achievementAddedAtom)
	const [selectedData, setSelectedData] = useState(null)

	const { mutate: removeExtarCost } = useShipmentRemoveExtraCostMutation() // 추가비 및 공차비 삭제

	const openExtarCostModal = () => {
		setSelectedData(data.list[0])
		setAddedModal(true)
	}

	const onRemoveExtraCost = () => {
		const selectedRow = selectedRows[0]
		const copiedData = data.list

		const findData = copiedData.find((item) => item.orderUid === selectedRow['주문 고유 번호'])

		if (!findData.extraCost && !findData.extraFreightCost) {
			return simpleAlert('등록된 추가비 및 공차비가 존재하지 않습니다.')
		}

		redAlert('등록된 추가 및 공차비를 삭제하시겠습니까?', () => {
			removeExtarCost(findData.orderUid)
			setSelectedRows([])
		})
	}

	return (
		<>
			<WhiteRedBtn onClick={onRemoveExtraCost}>추가비 및 공차비 삭제</WhiteRedBtn>
			<WhiteSkyBtn onClick={openExtarCostModal}>추가비 및 공차비 추가</WhiteSkyBtn>
			{addedModal && <AchievementModal setAddedModal={setAddedModal} data={selectedData} />}
		</>
	)
}

export default ShippingExtarCostBtn
