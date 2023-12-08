import { styled } from 'styled-components'

// 모달 오버레이 (배경 fade)
export const FadeOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
`
// 모달 오버레이 (배경 Non - fade)
export const NonFadeOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9998;
`

// 찐 모달
export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 53%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: ${(props) => props.width}px;
  /* height: ${(props) => props.height}px; */
  height: max-content;
  z-index: 9999;
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
  position: relative;
  left: 330px;
  top: -15px;
  cursor: pointer;
`

// -------BlueBar--------

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

export const AgreementMain = styled.div`
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
  padding: 30px 0px;
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

// 모달 전체 큰 테두리 및 div
export const BlueMainDiv = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  padding: 7px 5px 7px 10px;
  margin: 20px auto;
  border: 1px solid #c8c8c8;
  align-items: center;
`
export const ResultContainer = styled.div`
  width: 100%;
  max-height: 350px;
  overflow-y: auto;
  font-size: 17px;
`

export const ResultHead = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 50px;
  justify-content: space-evenly;
  border-bottom: 1px solid #ddd;
  gap: 30px;
  background-color: #f1f1f1;
`

export const ResultRow = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 50px;
  justify-content: space-evenly;
  border-bottom: 1px solid #ddd;
  gap: 30px;

  &:hover {
    background-color: #f5f5f5;
  }
`

export const ResultCell = styled.div`
  display: flex;
  width: ${({ wid }) => (wid ? `${wid}px` : '100px')};
  align-items: center;
  justify-content: center;
`

// 모달 한 줄
export const BlueSubDiv = styled.div`
  width: 100%;
  height: 60px;
  border-top: ${({ bor }) => (bor ? '1px solid #c8c8c8' : 'none')};
  display: flex;
  align-items: center;
  padding: 0px 10px;
  margin-top: ${({ bor }) => (bor ? 'none' : '5px')};

  h6 {
    font-size: 18px;
    width: 120px;
  }
`

//모달 인풋
export const BlueInput = styled.input`
  width: 60%;
  height: 35px;
  border: 1px solid #c8c8c8;
  font-size: 16px;
`

// 모달 라디오 div
export const BlueRadioWrap = styled.div`
  display: flex;
  gap: 20px;
  padding-left: 15px;
`
// 모달 하단 Black 버튼
export const BlueBtnWrap = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`

//datePicker div
export const BlueDateDiv = styled.div`
  display: flex;
  align-items: center;

  p {
    margin: 0px 5px;
  }
`

//
export const BlueOneDiv = styled.div`
  display: block;
  padding: 10px;
  border-bottom: ${({ bor }) => (bor ? '1px solid #e1e1e1' : 'none')};
  margin-bottom: 10px;

  h6 {
    margin-bottom: 5px;
  }
`

export const BlueHalfDiv = styled.div`
  display: flex;
  padding: 10px;
  gap: 15px;

  input {
    width: 100%;
  }

  > div {
    width: 100%;
  }

  h6 {
    margin-bottom: 5px;
  }
`

export const BlueBlackBtn = styled.button`
  width: 200px;
  height: 40px;
  background-color: black;
  color: white;
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

export const Bar = styled.div`
  display: flex;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: ${(props) => props.width}%;
  border-bottom: 1px solid ${(props) => props.color || 'black'};
  top: ${(props) => props.top}px;
`
