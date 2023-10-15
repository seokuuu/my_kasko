import React from 'react'
import { styled } from 'styled-components'

const TableTest = () => {
  return (
    <>
      <TestModal>바보</TestModal>
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
