import React from 'react'
import { styled } from 'styled-components'
import { FadeOverlay, ModalContainer } from '../Common/Common.Styled'

const TableTest = () => {
  return (
    <>
      <FadeOverlay />
      <ModalContainer>
        <TestModal>바보</TestModal>
      </ModalContainer>
    </>
  )
}

export default TableTest

const TestModal = styled.div`
  border: 5px solid black;
  background-color: magenta;
  width: 500px;
  height: 500px;
  z-index: 9999;
`
