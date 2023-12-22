import { useSetAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { BlackBtn } from '../../common/Button/Button'
import { operateAddAtom } from '../../store/Layout/Layout'
import {
  BlueBarHeader,
  BlueInput,
  BlueMainDiv,
  BlueSubContainer,
  FadeOverlay,
  ModalContainer,
  WhiteCloseBtn,
} from '../Common/Common.Styled'

/**
 * @description
 * 사용처 : 제품군 추가 및 창고 추가
 * @param title 모달 타이틀(헤더 텍스트)
 * @param contentTitle 내용 라벨
 * @param register 버튼 이벤트 핸들러
 * @param initValue 초깃 데이터값
 * @param closeHandler 모달 닫을 시 부모 컴포넌트에서 추가적으로 해줘야하는 핸들러

 */
const AddProduct = ({ title, contentTitle, deliveryHandler, register, initValue, closeHandler }) => {
  const setModal = useSetAtom(operateAddAtom)

  // 인풋
  const [value, setValue] = useState('')
  // 모달 닫기
  function closeModal() {
    setValue('')
    setModal(false)
    closeHandler()
  }

  useEffect(() => {
    if (deliveryHandler) deliveryHandler(value)
  }, [value])

  // 초기 데이터값 바인딩
  useEffect(() => {
    setValue(initValue)
  }, [initValue])

  //  모달 컴포넌트가 사라지면 값 초기화
  useEffect(() => {
    return () => setValue('')
  }, [])

  console.log('value :', value)
  return (
    <>
      <FadeOverlay />
      <ModalContainer width={500}>
        <BlueBarHeader>
          <div>{title}</div>
          <div>
            <WhiteCloseBtn onClick={closeModal} src="/svg/white_btn_close.svg" />
          </div>
        </BlueBarHeader>

        <BlueSubContainer>
          <BlueMainDiv
            style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '50px' }}
          >
            <h1>{contentTitle}</h1>
            <BlueInput placeholder="" value={value} onChange={(e) => setValue(e.target.value)} />
          </BlueMainDiv>
        </BlueSubContainer>
        <BtnContainer>
          <BlackBtn width={30} height={40} onClick={register}>
            적용
          </BlackBtn>
        </BtnContainer>
      </ModalContainer>
    </>
  )
}

export default AddProduct

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
`
