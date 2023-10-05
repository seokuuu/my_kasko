import React from 'react'
import { ModalContainer, FadeOverlay, ModalSubContainer, ModalTitle, ModalText } from '../Common/Common.Styled'
import { ModalPart, Title } from '../../pages/User/SignUp/SignUp.Styled'
import { BlackBtn, RedBtn, WhiteBtn } from '../../common/Button/Button'

import { useAtom } from 'jotai'
import { alertAtom } from '../../store/Layout/Layout'
const Alert = ({ type, title, content }) => {
  return (
    <>
      {/* 1 : title + content 검정버튼(확인) */}
      {/* 2 : title + content 검정버튼(확인) + 흰색버튼(취소) */}
      {/* 3 : title + content 빨강버튼(삭제) + 흰색버튼(취소) */}
      <FadeOverlay />
      <ModalContainer width={400}>
        <ModalSubContainer>
          {type === 1 && (
            <>
              <ModalPart>
                <ModalTitle>{title}</ModalTitle>
                <ModalText>{content}</ModalText>
              </ModalPart>
              <BlackBtn width={100} height={50}>
                확인
              </BlackBtn>
            </>
          )}
          {type === 2 && (
            <>
              <ModalPart>
                <ModalTitle>{title}</ModalTitle>
                <ModalText>{content}</ModalText>
              </ModalPart>
              <BlackBtn width={100} height={50}>
                확인
              </BlackBtn>
              <WhiteBtn width={100} height={50}>
                취소
              </WhiteBtn>
            </>
          )}
          {type === 3 && (
            <>
              <ModalPart>
                <ModalTitle>{title}</ModalTitle>
                <ModalText>{content}</ModalText>
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

export default Alert
