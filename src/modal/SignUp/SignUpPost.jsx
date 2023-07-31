import React from 'react';
import { styled } from 'styled-components';
import {
  ModalOverlay,
  ModalSubContainer,
  ModalRadioWrap,
  ModalCloseBtn,
  ModalContainer,
} from '../Common/Common.Styled';
import { TxtCheckInput, TxtInput } from '../../common/Input/Input';

import {
  CheckBtn,
  Part,
  Title,
  SubmitBtn,
} from '../../pages/User/SignUp/SignUp.Styled';
import DaumPostcode from 'react-daum-postcode';

const SignUpPost = ({
  postCheck,
  directCheck,
  postFind,
  address,
  daumPostHandleBtn,
  detailAddress,
  comfirmPost,
  closeModal,
  isDaumPostOpen,
  daumPosthandleClose,
  detailAddressHandler,
  daumPostHandleComplete,
}) => {
  return (
    <>
      <ModalOverlay />
      <ModalContainer width={400} height={280}>
        <ModalSubContainer>
          <Part>
            <Title>
              <h4>주소</h4>
              <ModalRadioWrap>
                <input
                  type="radio"
                  name="post"
                  onChange={postCheck}
                  defaultChecked
                />
                <p>찾기</p>
              </ModalRadioWrap>
              <ModalRadioWrap>
                <input type="radio" name="post" onChange={directCheck} />
                <p>직접 입력</p>
              </ModalRadioWrap>
            </Title>
            {!postFind ? (
              <>
                <TxtCheckInput type="text" value={address} readOnly />

                <CheckBtn
                  style={{
                    backgroundColor: 'black',
                    color: 'white',
                  }}
                  onClick={daumPostHandleBtn}
                >
                  찾기
                </CheckBtn>
                <TxtInput
                  placeholder="상세 주소를 입력해 주세요."
                  type="text"
                  value={detailAddress}
                  onChange={detailAddressHandler}
                />
              </>
            ) : (
              <div>
                <TxtInput
                  placeholder="주소를 입력해 주세요."
                  value={detailAddress}
                  onChange={detailAddressHandler}
                />
              </div>
            )}
          </Part>

          <SubmitBtn onClick={comfirmPost}>확인</SubmitBtn>
          <ModalCloseBtn onClick={closeModal} src="/svg/btn_close.svg" />
        </ModalSubContainer>
        {isDaumPostOpen && (
          <PostWrap>
            <DaumPostcode onComplete={daumPostHandleComplete} />
            <PostModalCloseBtn
              onClick={daumPosthandleClose}
              src="/svg/btn_close.svg"
            />
          </PostWrap>
        )}
      </ModalContainer>
    </>
  );
};

export default SignUpPost;

export const PostWrap = styled.div`
  position: relative;
  top: -300px;
`;

export const PostModalCloseBtn = styled.img`
  width: 6%;
  position: relative;
  left: 340px;
  bottom: 30px;
  cursor: pointer;
`;
