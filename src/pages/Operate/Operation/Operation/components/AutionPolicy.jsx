import moment from 'moment'
import React, { useState } from 'react'
import { useAutionPolicyMutation, useAutionPolicyQuery } from '../../../../../api/operate/autionPolicy'
import { BlackBtn, WhiteBtn } from '../../../../../common/Button/Button'
import useAlert from '../../../../../store/Alert/useAlert'
import { BtnContainer, Container } from '../styles/StyledAutcion'
import AuctionBottomContents from './AuctionBottomContents'
import AuctionTopContents from './AuctionTopContents'

/**
 * @description
 * 정책 관리
 */
const AutionPolicy = () => {
	// 상세 조회 API
	const { data } = useAutionPolicyQuery()

	// 등록/수정 API
	const { mutate } = useAutionPolicyMutation()

	// 확인 모달
	const { simpleConfirm } = useAlert()

	//FORM
	const [form, setForm] = useState({
		weight: 0,
		weightEffectDate: '',
		amStartHour: 0,
		amStartMinute: 0,
		amEndHour: 0,
		amEndMinute: 0,
		amEffectDate: '',
		pmStartHour: 0,
		pmStartMinute: 0,
		pmEndHour: 0,
		pmEndMinute: 0,
		pmEffectDate: '',
	})

	// 등록 및 수정
	function submit() {
		simpleConfirm('저장하시겠습니까?', () =>
			mutate({
				uid: data.uid,
				weight: Number(form.weight),
				weightEffectDate: moment(form.weightEffectDate).format('YYYY-MM-DD'),
				amStartTime: `${form.amStartHour}:${form.amStartMinute}:00`,
				amEndTime: `${form.amEndHour}:${form.amEndMinute}:00`,
				amEffectDate: moment(form.amEffectDate).format('YYYY-MM-DD'),
				pmStartTime: `${form.pmStartHour}:${form.pmStartMinute}:00`,
				pmEndTime: `${form.pmEndHour}:${form.pmEndMinute}:00`,
				pmEffectDate: moment(form.pmEffectDate).format('YYYY-MM-DD'),
			}),
		)
	}

	return (
		<Container>
			{/* 낙찰 중량 & 적용 일자 */}
			<AuctionTopContents
				data={data}
				getValue={(v) => setForm((p) => ({ ...p, weight: v.weight, weightEffectDate: v.date }))}
			/>
			{/* 경매 시간 정책 */}
			<AuctionBottomContents
				data={data}
				getMorningValue={(v) =>
					setForm((p) => ({
						...p,
						amEffectDate: v.effectDate,
						amStartHour: v.startHour,
						amStartMinute: v.startMinute,
						amEndHour: v.endHour,
						amEndMinute: v.endMinute,
					}))
				}
				getAfternoonValue={(v) =>
					setForm((p) => ({
						...p,
						pmEffectDate: v.effectDate,
						pmStartHour: v.startHour,
						pmStartMinute: v.startMinute,
						pmEndHour: v.endHour,
						pmEndMinute: v.endMinute,
					}))
				}
			/>
			{/* 버튼 */}
			<BtnContainer>
				<WhiteBtn height={35} width={10}>
					취소
				</WhiteBtn>
				<BlackBtn height={35} width={10} onClick={submit}>
					수정 완료
				</BlackBtn>
			</BtnContainer>
		</Container>
	)
}

export default AutionPolicy
