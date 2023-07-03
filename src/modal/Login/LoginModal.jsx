import { useState } from 'react';
import {
  ModalOverlay,
  ModalSubContainer,
  ModalRadioWrap,
  ModalContainer,
} from '../Common/Common.Styled';
import { Part, Title } from '../../pages/SignUp/SignUp.Styled';
import { styled } from 'styled-components';
import { IbwTxt } from '../../pages/Login/Login.Styled';

const LoginModal = ({ closeModal }) => {
  const [modalTest, setModalTest] = useState(1);

  return (
    <>
      <ModalOverlay />
      <ModalContainer>
        <ModalSubContainer>
          {modalTest === 1 && (
            <>
              <ModalTitle>비밀번호를 변경해 주세요.</ModalTitle>
              <ModalContent>
                임시 비밀번호를 사용하고 있습니다. 비밀번호를 변경해 주세요.
              </ModalContent>
              <IbwTxt onClick={closeModal}>확인</IbwTxt>
            </>
          )}
        </ModalSubContainer>
      </ModalContainer>
    </>
  );
};

export default LoginModal;

const ModalTitle = styled.div`
  width: 100%;

  justify-content: center;
  text-align: center;
  font-size: 20px;
`;

const ModalContent = styled.div`
  width: 100%;
  margin-top: 20px;

  justify-content: center;
  text-align: center;
  font-size: 16px;
  color: #6b6b6b;
`;

const ModalConFirmBtn = styled.div`
  text-align: center;
  font-size: 18px;
  line-height: 38px;
  position: relative;
  bottom: -50px;
  width: 100%;
  height: 40px;
  border: 1px solid black;
  cursor: pointer;
  background-color: black;
  color: white;
`;
