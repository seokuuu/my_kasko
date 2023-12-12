import styled from 'styled-components'

export const ModalTitle = styled.h2`
  color: black;
`

export const ModalContent = styled.p`
  color: black;
`

export const CloseButton = styled.button`
  background-color: black;
  color: white;
`

export const CheckWrap = styled.div`
  margin-top: 10px;
  width: 320px;
  display: flex;
  gap: 50px;

  p {
    font-size: 18px;
    line-height: 15px;
    margin-top: 1px;
  }
`

export const RadioContainer = styled.div`
  width: 320px;
  display: flex;
  gap: 50px;
  margin-left: 5px;
  margin-top: 10px;
`
export const ErrorMsg = styled.p`
  font-size: 13px;
  color: #b02525;
`
