import React from 'react'
import {
  At,
  HalfWrap,
  Left,
  MainTitle,
  OnePageContainer,
  OnePageSubContainer,
  Part,
  Right,
  Title,
} from '../../../common/OnePage/OnePage.Styled'

import { CustomInput, TxtInput } from '../../../common/Input/Input'
import { CustomSelect } from '../../../common/Option/Main'
import { emailOptions } from '../../../common/Option/SignUp'

import { BlackBtn, BtnWrap, WhiteBtn, WhiteRedBtn } from '../../../common/Button/Button'
const CarrierEdit = () => {
  return (
    <OnePageContainer>
      <MainTitle>운송사 수정</MainTitle>
      <OnePageSubContainer>
        <HalfWrap>
          <Left>
            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>운송사 명</h4>
                <p></p>
              </Title>
              <CustomInput placeholder="" width={340} />
            </Part>
            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>아이디</h4>
                <p></p>
              </Title>
              <TxtInput style={{ width: '340px' }} disabled />
            </Part>
            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>비밀번호</h4>
                <p></p>
              </Title>
              <WhiteRedBtn style={{ width: '340px' }} height={40}>
                비밀번호 초기화
              </WhiteRedBtn>
            </Part>
          </Left>
          <Right>
            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>사용자 정보</h4>
                <p></p>
              </Title>
              <CustomInput placeholder="직함 입력" width={120} />
              <CustomInput placeholder="성함 입력" width={210} style={{ marginLeft: '10px' }} />
            </Part>
            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>이메일</h4>
                <p></p>
              </Title>
              <div style={{ display: 'flex' }}>
                <CustomInput placeholder="아이디 입력" width={120} /> <At>@</At>
                <CustomSelect width={200} options={emailOptions} defaultValue={emailOptions[0]} />
              </div>
            </Part>
            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>연락처</h4>
                <p></p>
              </Title>
              <CustomInput placeholder="연락처 입력 ('-'제외)" width={340} />
            </Part>
          </Right>
        </HalfWrap>
      </OnePageSubContainer>
      <BtnWrap bottom={-200}>
        <WhiteBtn width={40} height={40}>
          돌아가기
        </WhiteBtn>
        <BlackBtn width={40} height={40}>
          저장
        </BlackBtn>
      </BtnWrap>
    </OnePageContainer>
  )
}

export default CarrierEdit
