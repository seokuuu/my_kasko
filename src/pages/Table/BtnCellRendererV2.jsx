import React from 'react'
import { useSetAtom } from 'jotai'
import { SkyBtn } from '../../common/Button/Button'
import { weightAtom, weightObj } from '../../store/Layout/Layout'

const BtnCellRendererV2 = ({ data, uidFieldName }) => {
	// const uid = data[uidFieldName]
	const setWeight = useSetAtom(weightAtom)
	const setObj = useSetAtom(weightObj)

	const btnClickedHandler = () => {
		setWeight(true)
		setObj(data)
	}

	return (
		<SkyBtn style={{ marginLeft: 'auto', marginRight: 'auto' }} onClick={btnClickedHandler}>
			{data['중량 판매 개수'] === 0 ? '중량 판매' : '수정'}
		</SkyBtn>
	)
}

export default BtnCellRendererV2
