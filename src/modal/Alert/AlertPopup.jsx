import { useState, useEffect } from 'react'
import { ModalContainer, FadeOverlay, ModalSubContainer, ModalTitle, ModalText } from '../Common/Common.Styled'
import { ModalPart, Title } from '../../pages/User/SignUp/SignUp.Styled'
import { BlackBtn, RedBtn, WhiteBtn } from '../../common/Button/Button'
import { popupDummy } from './PopupDummy'
import { useAtom } from 'jotai'
import { alertAtom } from '../../store/Layout/Layout'
import { popupObject, popupTypeAtom, popupAtom, modalAtom } from '../../store/Layout/Layout'
const AlertPopup = () => {
  const [modalIsOpen, setModalIsOpen] = useAtom(modalAtom) // 모달 스위치
  const [popupSwitch, setPopupSwitch] = useAtom(popupAtom) // 팝업 스위치
  const [nowPopup, setNowPopup] = useAtom(popupObject) // 팝업 객체
  const [nowPopupType, setNowPopupType] = useAtom(popupTypeAtom) // 팝업 타입

  const [checkNext, setCheckNext] = useState(false)
  const [init, setInit] = useState({ now: '', type: '' })

  // 처음 팝업 띄우는 컴포넌트의 onClickHandler
  const firstPopupClick = (num) => {
    const firstPopup = popupDummy.find((popup) => popup.num === num)
    setNowPopup(firstPopup)
    // setCheckNext(true)
  }

  // 팝업 그 자체 컴포넌트의 확인 버튼 onClickHandler
  const showNextPopup = () => {
    const nextType = nowPopup.next?.split('-')[0]

    if (nowPopup && nowPopup?.next) {
      firstPopupClick(nowPopup?.next)
      setNowPopupType(nextType)
    } else {
      setPopupSwitch(false)
      setModalIsOpen(false)
    }
  }

  useEffect(() => {
    setInit({ now: nowPopup, type: nowPopupType })
    const firstType = nowPopup.num?.split('-')[0]
    setNowPopupType(firstType)
  }, [])

  // 팝업 타입 최신화
  useEffect(() => {
    // setNowPopupType(init.type)
    // setNowPopup(init.now)
    // console.log('nowPopupType', nowPopupType)
    // console.log('check', nowPopup)
  }, [checkNext])

  const closePopup = () => {
    setPopupSwitch(false)
    setModalIsOpen(false)
  }

  return (
    <>
      <FadeOverlay />
      <ModalContainer width={400}>
        <ModalSubContainer>
          {nowPopupType === '1' && (
            <>
              <ModalPart>
                <ModalTitle>{nowPopup.title}</ModalTitle>
                <ModalText>{nowPopup.content}</ModalText>
              </ModalPart>
              <BlackBtn onClick={showNextPopup} width={100} height={50}>
                확인
              </BlackBtn>
            </>
          )}
          {nowPopupType === '2' && (
            <>
              <ModalPart>
                <ModalTitle>{nowPopup.title}</ModalTitle>
                <ModalText>{nowPopup.content}</ModalText>
              </ModalPart>
              <BlackBtn onClick={showNextPopup} width={100} height={50}>
                확인
              </BlackBtn>
              <WhiteBtn onClick={closePopup} width={100} height={50}>
                취소
              </WhiteBtn>
            </>
          )}
          {nowPopupType === '3' && (
            <>
              <ModalPart>
                <ModalTitle>{nowPopup.title}</ModalTitle>
                <ModalText>{nowPopup.content}</ModalText>
              </ModalPart>
              <RedBtn onClick={showNextPopup} width={100} height={50}>
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
