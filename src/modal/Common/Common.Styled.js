import { styled } from 'styled-components'

// 모달 오버레이
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
`

// 찐 모달
export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: ${(props) => props.width}px;
  /* height: ${(props) => props.height}px; */
  height: max-content;
  z-index: 9999;
  border: 1px solid black;
`

export const ModalSubContainer = styled.div`
  padding: 30px 20px 15px 20px;
`

export const ModalRadioWrap = styled.div`
  display: flex;

  input {
    margin-bottom: 5px;
    margin-left: 10px;
  }
`

export const ModalCloseBtn = styled.img`
  width: 5%;
  position: absolute;
  left: 365px;
  bottom: 210px;
  cursor: pointer;
`

// -------BlueBar--------
export const NonFadeOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9998;
`

export const BlueBarHeader = styled.div`
  width: 100%;
  height: 70px;
  background-color: ${(props) => props.theme.colors.PriHeavy};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  color: white;
`

export const Agreement = styled.div`
  background-color: #eef3fb;
  width: 100%;

  > h6 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: 600;
    height: 80px;
  }
`

export const AgreementTop = styled.div`
  padding: 15px;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  background-color: white;
  font-size: 16px;

  > div {
    display: flex;
    margin: 25px;

    h6 {
      font-weight: 600;
      width: 110px;
      font-size: 18px;
    }

    p {
      margin-bottom: 3px;
    }

    span {
      color: ${(props) => props.theme.colors.StatAlert};
      font-size: 14px;
      display: block;
      margin-top: 3px;
    }

    h5 {
      color: ${(props) => props.theme.colors.TxtAlter};
      margin-left: 17px;
      font-size: 14px;
    }

    > div {
      display: block;
      position: relative;
      top: 1px;
    }
  }
`

export const AgreementBottom = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.colors.PriStrong};
`

export const BlueSubContainer = styled.div`
  /* width: 90%;
  height: 100%; */
`

export const BSCSubContainer = styled.div``

export const BSCSWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 50px;
  /* height: 100%; */
  margin-bottom: 10px;

  > input {
    border: 1px solid #c8c8c8;
    height: 40px;
  }
`

export const WhiteCloseBtn = styled.img`
  cursor: pointer;
`

export const BlueBarBtnWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 60px 0px 20px 0px;
`

export const BlueMainDiv = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  margin: 20px auto;
  border: 1px solid magenta;
`

// 단순 alert 창
export const ModalTitle = styled.h1`
  text-align: center;
  white-space: pre-line;
  line-height: 1.4;
`

export const ModalText = styled.p`
  text-align: center;
  font-size: 16px;
  color: #6b6b6b;
  font-weight: 100;
  margin-top: 20px;
  white-space: pre-line;
  line-height: 1.4;
`
