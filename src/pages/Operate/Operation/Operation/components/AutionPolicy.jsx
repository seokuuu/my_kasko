import React, { useEffect, useState } from 'react'
import { BtnContainer, Container } from '../styles/StyledAutcion'
import { BlackBtn, WhiteBtn } from '../../../../../common/Button/Button'
import AuctionTopContents from './AuctionTopContents'
import AuctionBottomContents from './AuctionBottomContents'
import { useAutionPolicyMutation, useAutionPolicyQuery } from '../../../../../api/operate/autionPolicy'
import moment from 'moment'
import useConfirmMoal from '../../../hook/useConfirmMoal'
import AlertPopup from '../../../../../modal/Alert/AlertPopup'

/**
 * @description
 * 정책 관리
 */
const AutionPolicy = () => {
  // 상세 조회 API
  const { data } = useAutionPolicyQuery()

  // 등록/수정 API
  const { mutate } = useAutionPolicyMutation()

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

  // 확인 모달 관련 값들
  const { popupSwitch, setPopupSwitch, setNowPopupType, nowPopup, setNowPopup, initConfirmModal } = useConfirmMoal()

  // 등록 및 수정
  function submit() {
    setPopupSwitch(true)
    setNowPopupType(2)
    setNowPopup({
      num: '2-1',
      title: '저장하시겠습니까?',
      next: '1-12',
      func() {},
    })
  }

  // 저장
  useEffect(() => {
    if (nowPopup.num === '1-12') {
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
      })
    }
  }, [nowPopup])
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
      {popupSwitch && <AlertPopup setPopupSwitch={setPopupSwitch} />}
    </Container>
  )
}

export default AutionPolicy
