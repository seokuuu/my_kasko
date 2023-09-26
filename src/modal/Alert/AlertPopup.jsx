import { useState, useEffect } from 'react'
import { ModalContainer, FadeOverlay, ModalSubContainer, ModalTitle, ModalText } from '../Common/Common.Styled'
import { ModalPart, Title } from '../../pages/User/SignUp/SignUp.Styled'
import { BlackBtn, RedBtn, WhiteBtn } from '../../common/Button/Button'
import { popupDummy } from './PopupDummy'
import { useAtom } from 'jotai'
import { alertAtom } from '../../store/Layout/Layout'
import { popupObject, popupTypeAtom } from '../../store/Layout/Layout'
const AlertPopup = () => {
  const [nowPopup, setNowPopup] = useAtom(popupObject) // 팝업 객체
  console.log('nowPopup =>', nowPopup)
  const [nowPopupType, setNowPopupType] = useAtom(popupTypeAtom) // 팝업 타입
  console.log('nowPopupType =>', nowPopupType)

  // 처음 팝업 띄우는 컴포넌트의 onClickHandler
  const firstPopupClick = (num) => {
    const firstPopup = popupDummy.find((popup) => popup.num === num)
    setNowPopup(firstPopup)
  }

  // 팝업 그 자체 컴포넌트의 확인 버튼 onClickHandler
  const showNextPopup = () => {
    if (nowPopup && nowPopup?.next) {
      firstPopupClick(nowPopup?.next)
    }
  }

  // 팝업 타입 최신화
  useEffect(() => {
    const firstType = nowPopup.num?.split('-')[0]
    setNowPopupType(firstType)
  }, [])

  return (
    <>
      <FadeOverlay />
      <ModalContainer width={400}>
        <ModalSubContainer>
          {nowPopupType === 1 && (
            <>
              <ModalPart>
                <ModalTitle>{nowPopup.title}</ModalTitle>
                <ModalText>{nowPopup.content}</ModalText>
              </ModalPart>
              <BlackBtn width={100} height={50}>
                확인
              </BlackBtn>
            </>
          )}
          {nowPopupType === 2 && (
            <>
              <ModalPart>
                <ModalTitle>{nowPopup.title}</ModalTitle>
                <ModalText>{nowPopup.content}</ModalText>
              </ModalPart>
              <BlackBtn width={100} height={50}>
                확인
              </BlackBtn>
              <WhiteBtn width={100} height={50}>
                취소
              </WhiteBtn>
            </>
          )}
          {nowPopupType === 3 && (
            <>
              <ModalPart>
                <ModalTitle>{nowPopup.title}</ModalTitle>
                <ModalText>{nowPopup.content}</ModalText>
              </ModalPart>
              <RedBtn width={100} height={50}>
                확인
              </RedBtn>
              <WhiteBtn width={100} height={50}>
                취소
              </WhiteBtn>
            </>
          )}
        </ModalSubContainer>
      </ModalContainer>
    </>
  )
}

export default AlertPopup
