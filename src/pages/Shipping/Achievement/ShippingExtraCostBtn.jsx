import { WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import React from 'react'
import { useAtom } from 'jotai/index'
import { achievementAddedAtom } from '../../../store/Layout/Layout'
import useAlert from '../../../store/Alert/useAlert'
import AchievementModal from '../../../modal/Multi/Achievement'
import { useShipmentRemoveExtraCostMutation } from '../../../api/shipment'

const ShippingExtraCostBtn = ({ data }) => {
	const { simpleAlert, redAlert } = useAlert()

	const [addedModal, setAddedModal] = useAtom(achievementAddedAtom)

	const { mutate: removeExtraCost } = useShipmentRemoveExtraCostMutation() // 추가비 및 공차비 삭제

	const openExtraCostModal = () => {
		setAddedModal(true)
	}

	const onRemoveExtraCost = () => {
		const copiedData = data.list[0]

		if (!copiedData.extraCost && !copiedData.extraFreightCost) {
			return simpleAlert('등록된 추가비 및 공차비가 존재하지 않습니다.')
		}
		redAlert('등록된 추가 및 공차비를 삭제하시겠습니까?', () => {
			removeExtraCost({ outNumber: copiedData.outNumber, customerDestinationUid: copiedData.customerDestinationUid })
		})
	}

	const totalWeight = data?.list.map((item) => item.weight).reduce((acc, cur) => Number(acc) + Number(cur), 0)

	return (
		<>
			<WhiteRedBtn onClick={onRemoveExtraCost}>추가비 및 공차비 삭제</WhiteRedBtn>
			<WhiteSkyBtn onClick={openExtraCostModal}>추가비 및 공차비 추가</WhiteSkyBtn>
			{addedModal && <AchievementModal setAddedModal={setAddedModal} data={data?.list[0]} totalWeight={totalWeight} />}
		</>
	)
}

export default ShippingExtraCostBtn
