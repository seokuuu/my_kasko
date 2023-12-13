import React from 'react'
import { styled } from 'styled-components'
import { FadeOverlay, ModalSubContainer, ModalRadioWrap, ModalCloseBtn, ModalContainer } from '../Common/Common.Styled'
import { TxtCheckInput, TxtInput } from '../../common/Input/Input'

import { CheckBtn, Part, Title, SubmitBtn } from '../../pages/User/SignUp/SignUp.Styled'
import DaumPostcode from 'react-daum-postcode'

const SignUpPost = ({
  postCheck,
  directCheck,
  postFind,
  address,
  daumPostHandleBtn,
  detailAddress,
  setDetailAddress,
  comfirmPost,
  closeModal,
  isDaumPostOpen,
  daumPosthandleClose,
  detailAddressHandler,
  daumPostHandleComplete,
}) => {
  return (
    <>
      <FadeOverlay />
      <ModalContainer width={400} height={280}>
        <ModalSubContainer style={{ padding: '30px 10%' }}>
          <Part>
            <ModalCloseBtn onClick={closeModal} src="/svg/btn_close.svg" />
            <Title>
              <h4>주소</h4>
              <ModalRadioWrap>
                <input type="radio" name="post" onChange={postCheck} defaultChecked />
                <p style={{ fontSize: '15px' }}>찾기</p>
              </ModalRadioWrap>
              <ModalRadioWrap>
                <input type="radio" name="post" onChange={directCheck} />
                <p style={{ fontSize: '15px' }}>직접 입력</p>
              </ModalRadioWrap>
            </Title>
            {!postFind ? (
              <>
                <div style={{ width: '320px', marginBottom: '5px' }}>
                  <TxtCheckInput type="text" value={address} readOnly />
                  <CheckBtn
                    type="button"
                    style={{
                      backgroundColor: 'black',
                      color: 'white',
                    }}
                    onClick={daumPostHandleBtn}
                  >
                    찾기
                  </CheckBtn>
                </div>

                <TxtInput
                  placeholder="상세 주소를 입력해 주세요."
                  type="text"
                  value={detailAddress}
                  onChange={detailAddressHandler}
                />
              </>
            ) : (
              <div>
                <TxtInput placeholder="주소를 입력해 주세요." value={detailAddress} onChange={detailAddressHandler} />
              </div>
            )}
          </Part>

          <SubmitBtn onClick={comfirmPost}>확인</SubmitBtn>
        </ModalSubContainer>
        {isDaumPostOpen && (
          <div>
            <PostContainer>
              <PostWrap>
                <DaumPostcode onComplete={daumPostHandleComplete} />
                <PostModalCloseBtn onClick={daumPosthandleClose} src="/svg/btn_close.svg" />
              </PostWrap>
            </PostContainer>
          </div>
        )}
      </ModalContainer>
    </>
  )
}

export default SignUpPost

export const PostWrap = styled.div`
  position: relative;
  top: -150px;
`

export const PostModalCloseBtn = styled.img`
  width: 6%;
  position: relative;
  top: -440px;
  left: 510px;
  bottom: 30px;
  cursor: pointer;
`
const PostContainer = styled.div`
  position: absolute;
  width: 500px;
  top: 100px;
`
