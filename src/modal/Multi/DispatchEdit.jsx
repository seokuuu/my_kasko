import React, { useState } from 'react'
import {
  BlueBarHeader,
  BlueBlackBtn,
  BlueBtnWrap,
  BlueHalfDiv,
  BlueInput,
  BlueMainDiv,
  BlueOneDiv,
  BlueSubContainer,
  FadeOverlay,
  ModalContainer,
  WhiteCloseBtn,
} from '../Common/Common.Styled'

import { useAtom } from 'jotai'
import { blueModalAtom } from '../../store/Layout/Layout'

import { CustomSelect } from '../../common/Option/Main'

import { storageOptions } from '../../common/Option/SignUp'

const DispatchEdit = ({ setIsModalEdit }) => {
  const [isModal, setIsModal] = useAtom(blueModalAtom)

  const modalClose = () => {
    setIsModalEdit(false)
  }

  const radioDummy = ['경매', '상시']

  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))

  console.log('checkRadio =>', checkRadio)

  return (
    // 판매 제품 관리 - 패키지 관리
    <>
      <FadeOverlay />
      <ModalContainer width={550}>
        <BlueBarHeader>
          <div>배차 기사 수정 </div>
          <div>
            <WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
          </div>
        </BlueBarHeader>
        <BlueSubContainer>
          <div>
            <BlueMainDiv style={{ border: 'none' }}>
              <BlueOneDiv bor>
                <h6>창고</h6>
                <CustomSelect options={storageOptions} defaultValue={storageOptions[0]} />
              </BlueOneDiv>
              <BlueHalfDiv>
                <div>
                  <h6>기사 명</h6>
                  <BlueInput placeholder="홍길동" />
                </div>
                <div>
                  <h6>연락처</h6>
                  <BlueInput placeholder="'-'제외한 숫자 입력" />
                </div>
              </BlueHalfDiv>
              <BlueHalfDiv>
                <div>
                  <h6>차량 번호</h6>
                  <div style={{ display: 'block', height: '50px' }}>
                    <BlueInput placeholder="예) 123가5678" />
                  </div>
                </div>
                <div>
                  <h6>차량 종류</h6>
                  <BlueInput placeholder="예) 카고 트럭" />
                </div>
              </BlueHalfDiv>
            </BlueMainDiv>
          </div>
          <BlueBtnWrap>
            <BlueBlackBtn>수정</BlueBlackBtn>
          </BlueBtnWrap>
        </BlueSubContainer>
      </ModalContainer>
    </>
  )
}

export default DispatchEdit
