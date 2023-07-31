import { styled } from 'styled-components';

// 모달 오버레이
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
`;

// 찐 모달
export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: ${props => props.width}px;
  /* height: ${props => props.height}px; */
  height: max-content;
  z-index: 9999;
`;

export const ModalSubContainer = styled.div`
  padding: 10%;
`;

export const ModalRadioWrap = styled.div`
  display: flex;

  input {
    margin-bottom: 5px;
    margin-left: 10px;
  }
`;

export const ModalCloseBtn = styled.img`
  width: 6%;
  position: absolute;
  left: 365px;
  bottom: 240px;
  cursor: pointer;
`;

// -------BlueBar--------
export const NonFadeOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9998;
`;

export const BlueBarHeader = styled.div`
  width: 100%;
  height: 70px;
  background-color: ${props => props.theme.colors.PriHeavy};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  color: white;
`;

export const BlueSubContainer = styled.div`
  margin: 10% auto;
  width: 90%;
  height: 100%;
`;

export const BSCSWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid magenta;
  /* height: 50px; */
  height: 100%;

  > input {
    border: 1px solid #c8c8c8;
    height: 40px;
  }
`;

export const WhiteCloseBtn = styled.img`
  cursor: pointer;
`;

export const BlueBarBtnWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 20px 0px;
`;
