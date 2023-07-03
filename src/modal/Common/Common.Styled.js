import { styled } from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 400px;
  height: 280px;
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
