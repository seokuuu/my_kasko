import React from 'react';
import {
  OnePageContainer,
  OnePageSubContainer,
  MainTitle,
  HalfWrap,
  Left,
  Right,
  Title,
  Part,
  At,
} from '../../../common/OnePage/OnePage.Styled';

import { CustomInput } from '../../../common/Input/Input';
import { CustomSelect } from '../../../common/Option/Main';
import { emailOptions } from '../../../common/Option/SignUp';
import { styled } from 'styled-components';

const CarrierPost = () => {
  return (
    <OnePageContainer>
      <MainTitle>운송사 등록</MainTitle>
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
              <CustomInput placeholder="상세 주소 입력" width={340} />
            </Part>
            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>비밀번호</h4>
                <p></p>
              </Title>
              <CustomInput placeholder="비밀번호를 입력해주세요." width={340} />
            </Part>
          </Left>
          <Right>
            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>사용자 정보</h4>
                <p></p>
              </Title>
              <CustomInput placeholder="직함 입력" width={120} />
              <CustomInput
                placeholder="성함 입력"
                width={210}
                style={{ marginLeft: '10px' }}
              />
            </Part>
            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>이메일</h4>
                <p></p>
              </Title>
              <div style={{ display: 'flex' }}>
                <CustomInput placeholder="아이디 입력" width={120} /> <At>@</At>
                <CustomSelect
                  width={200}
                  options={emailOptions}
                  defaultValue={emailOptions[0]}
                />
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
    </OnePageContainer>
  );
};

export default CarrierPost;
