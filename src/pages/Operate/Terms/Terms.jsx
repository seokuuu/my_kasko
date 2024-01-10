import React, {useEffect, useState} from 'react'
import {
  FullWrap,
  FWTitle,
  OnePageContainer,
  OnePageSubContainer,
  TitleChild,
  Titles,
} from '../../../common/OnePage/OnePage.Styled'

import {useAtom} from 'jotai'
import {isObject} from 'lodash'
import {usePolicyMutation, usePolicyQuery} from '../../../api/operate'
import {BlackBtn, BtnWrap} from '../../../common/Button/Button'
import AlertPopup from '../../../modal/Alert/AlertPopup'
import {popupAtom, popupObject, popupTypeAtom} from '../../../store/Layout/Layout'
import {formatDateString} from '../../../utils/utils'
import {useSetAtom} from "jotai/index";

const Terms = () => {
  const [popupSwitch, setPopupSwitch] = useAtom(popupAtom) // 팝업 스위치
  const setNowPopupType = useSetAtom(popupTypeAtom) // 팝업 타입
  const setNowPopup = useSetAtom(popupObject) // 팝업 객체

  // 약관 데이터
  const [resData, setResData] = useState('')
  // 약관 타입
  const [type, setType] = useState('이용 약관') // (이용약관 / 개인정보 처리방침 / 개인정보 수집 동의)
  // 약관 조회 API
  const { data, isSuccess, refetch } = usePolicyQuery(type)
  // 약관 등록 API
  const { mutate } = usePolicyMutation(type, refetch)

  const responseData = data?.data?.data

  // data  바인딩
  useEffect(() => {
    if (isSuccess && isObject(responseData)) {
      setResData(responseData)
    }
  }, [data, type, isSuccess])

  const handleSubmit = () => {
    setResData((prev) => ({ ...prev, uid: prev.uid }))
    setPopupSwitch(true)
    setNowPopupType(2)
    setNowPopup({
      num: '2-1',
      title: '저장하시겠습니까?',
      next: '1-12',
      func: save
    })
  }

  const save = () => {
    mutate({
      uid: resData.uid,
      type: resData.type,
      content: resData.content,
    })
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
