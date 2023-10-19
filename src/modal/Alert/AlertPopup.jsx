import { useState, useEffect } from 'react'
import { ModalContainer, FadeOverlay, ModalSubContainer, ModalTitle, ModalText } from '../Common/Common.Styled'
import { ModalPart, Title } from '../../pages/User/SignUp/SignUp.Styled'
import { BlackBtn, RedBtn, WhiteBtn } from '../../common/Button/Button'
import { popupDummy } from './PopupDummy'
import { useAtom } from 'jotai'
import { alertAtom, modalObject } from '../../store/Layout/Layout'
import { popupObject, popupTypeAtom, popupAtom, modalAtom } from '../../store/Layout/Layout'
const AlertPopup = ({ propsRemove, setPopupSwitch }) => {
  const [modalSwitch, setModalSwitch] = useAtom(modalAtom) // 모달 스위치
  // const [popupSwitch, setPopupSwitch] = useAtom(popupAtom) // 팝업 스위치
  const [nowPopup, setNowPopup] = useAtom(popupObject) // 팝업 객체
  const [nowModal, setNowModal] = useAtom(modalObject) // 모달 객체

  console.log('nowPopup !!!', nowPopup)

  const [nowPopupType, setNowPopupType] = useAtom(popupTypeAtom) // 팝업 타입
  const [checkNext, setCheckNext] = useState(false) //임시 next 작동시 reload

  // num / next을 받아 팝업 띄우는 컴포넌트의 onClickHandler

  const firstPopupClick = (num) => {
    const firstPopup = popupDummy.find((popup) => popup.num === num)
    setNowPopup(firstPopup)
  }

  // 기존 modalPopup이 아닌, 다수의 modal로 인해 해당 props는 propsPopup, setPopupSwitch으로 명함.
  const closePopup = () => {
    setPopupSwitch(false)
    setModalSwitch(false)
  }

  // 팝업 확인 버튼 onClickHandler
  // popupDummy에 next가 있으면, firstPopupClick이 실행되고
  // next가 없으면, 팝업과 해당 모달이 종료된다
  const showNextPopup = () => {
    const nextType = nowPopup.next?.split('-')[0]

    if (nowPopup && nowPopup?.next) {
      nowPopup.func()
      firstPopupClick(nowPopup?.next)
      setNowPopupType(nextType)
      setCheckNext(true)
    } else {

      closePopup()

    }
  }

  useEffect(() => {
    const firstType = nowPopup.num?.split('-')[0]
    setNowPopupType(firstType)
  }, [])

  const closePopup = () => {
    setPopupSwitch(false)
    // setModalIsOpen(false)
  }

  return (
    <>
      <FadeOverlay />
      <ModalContainer width={400}>
        <ModalSubContainer>
          {nowPopupType === '1' && (
            <>
              <ModalPart>
                <ModalTitle>{nowPopup?.title}</ModalTitle>
                <ModalText>{nowPopup?.content}</ModalText>
              </ModalPart>
              <BlackBtn onClick={showNextPopup} width={100} height={50}>
                확인
              </BlackBtn>
            </>
          )}
          {nowPopupType === '2' && (
            <>
              <ModalPart>
                <ModalTitle>{nowPopup?.title}</ModalTitle>
                <ModalText>{nowPopup?.content}</ModalText>
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
                <ModalTitle>{nowPopup?.title}</ModalTitle>
                <ModalText>{nowPopup?.content}</ModalText>
              </ModalPart>
              <RedBtn onClick={showNextPopup} width={100} height={50}>
                확인
              </RedBtn>
              <WhiteBtn onClick={closePopup} width={100} height={50}>
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
