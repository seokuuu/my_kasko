import React, { useEffect, useState } from 'react'
import {
  FWTitle,
  FullWrap,
  OnePageContainer,
  OnePageSubContainer,
  TitleChild,
  Titles,
} from '../../../common/OnePage/OnePage.Styled'

import { useAtom } from 'jotai'
import { isObject } from 'lodash'
import { getPolicy, usePolicyMutation } from '../../../api/operate'
import { BlackBtn, BtnWrap } from '../../../common/Button/Button'
import AlertPopup from '../../../modal/Alert/AlertPopup'
import { popupAtom, popupObject, popupTypeAtom } from '../../../store/Layout/Layout'
import { formatDateString } from '../../../utils/utils'
import useReactQuery from './../../../hooks/useReactQuery'

const Terms = () => {
  const [popupSwitch, setPopupSwitch] = useAtom(popupAtom) // 팝업 스위치
  const [nowPopup, setNowPopup] = useAtom(popupObject) // 팝업 객체
  const [nowPopupType, setNowPopupType] = useAtom(popupTypeAtom) // 팝업 타입

  // 약관 데이터
  const [resData, setResData] = useState('')
  // 약관 타입
  const [type, setType] = useState('이용 약관') // (이용약관 / 개인정보 처리방침 / 개인정보 수집 동의)
  // ⚠️TODO : 개인정보 수집 동의 post에러

  // 약관 조회 API
  const { isError, isSuccess, data } = useReactQuery(type, 'getPolicy', getPolicy)
  // 약관 등록 API
  const { mutate } = usePolicyMutation()

  if (isError) console.error('ERROR : 데이터패치 에러')

  // data  바인딩
  useEffect(() => {
    const resData = data?.data?.data
    if (isSuccess && isObject(resData)) return setResData(resData)
  }, [data, type, isSuccess])

  // 팝업 초기 설정
  useEffect(() => {
    setNowPopupType(2)
    setNowPopup({
      num: '2-1',
      title: '저장하시겠습니까?',
      next: '1-12',
      func() {},
    })
  }, [])

  // 그 다음 팝업 설정
  useEffect(() => {
    if (nowPopup.num === '1-12') {
      mutate({
        uid: resData.uid,
        type: resData.type,
        content: resData.content,
      })
    }
  }, [nowPopup])

  const handleSubmit = () => {
    setResData((prev) => ({ ...prev, uid: prev.uid }))
    setPopupSwitch(true)
  }

  return (
    <OnePageContainer style={{ width: '55%' }}>
      {/* 약관 타입 탭 */}
      <Titles style={{ width: '90%' }}>
        <TitleChild active={type === '이용 약관'} onClick={() => setType('이용 약관')}>
          이용 약관
        </TitleChild>
        <TitleChild active={type === '개인정보 처리 방침'} onClick={() => setType('개인정보 처리 방침')}>
          개인정보 처리 방침
        </TitleChild>
        <TitleChild active={type === '개인정보 수집 동의'} onClick={() => setType('개인정보 수집 동의')}>
          개인정보 수집 동의
        </TitleChild>
      </Titles>
      <OnePageSubContainer>
        <FWTitle>
          <h5>서비스 이용약관</h5>
          {/* ⚠️TODO : Date객체 필요 */}
          <h6>최근 수정일 : {resData ? formatDateString(resData.updateDate) : ''}</h6>
        </FWTitle>
        <FullWrap style={{ marginTop: '30px', height: '30vw' }}>
          <textarea
            value={resData ? resData.content : '입력해주세요.'}
            onChange={(e) => setResData((prev) => ({ ...prev, content: e.target.value }))}
          ></textarea>
        </FullWrap>
      </OnePageSubContainer>
      <BtnWrap bottom={-30}>
        <BlackBtn width={40} height={40} onClick={handleSubmit}>
          저장
        </BlackBtn>
      </BtnWrap>

      {popupSwitch && <AlertPopup setPopupSwitch={setPopupSwitch} />}
    </OnePageContainer>
  )
}

export default Terms
