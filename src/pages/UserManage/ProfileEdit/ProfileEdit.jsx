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

const ProfileEdit = () => {
  return (
    <OnePageContainer>
      <MainTitle>개인정보 수정</MainTitle>
      <OnePageSubContainer>
        <HalfWrap>
          <Left>
            <Part>
              <Title>
                <h4>아이디</h4>
                <p></p>
              </Title>
              <CustomInput disabled width={340} />
            </Part>
            <Part>
              <Title>
                <h4>사용자 정보</h4>
                <p></p>
              </Title>
              <CustomInput placeholder="직함 입력" width={135} />
              <CustomInput
                placeholder=" 성함 입력"
                width={200}
                style={{ marginLeft: '5px' }}
              />
            </Part>
            <Part>
              <Title>
                <h4>새 비밀번호</h4>
                <p></p>
              </Title>
              <CustomInput
                placeholder="영문, 숫자 조합 8 ~ 12자리"
                width={340}
              />
            </Part>
            <Part>
              <Title>
                <h4>새 비밀번호 확인</h4>
                <p></p>
              </Title>
              <CustomInput placeholder="새 비밀번호 재입력" width={340} />
            </Part>
          </Left>
          <Right>
            <Part>
              <Title>
                <h4>연락처</h4>
                <p></p>
              </Title>
              <CustomInput placeholder="01012341234" width={340} />
            </Part>
            <Part>
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
            <Part>
              <Title>
                <h4>사업자 번호</h4>
                <p></p>
              </Title>
              <CustomInput placeholder="'-'제외한 숫자 입력" width={340} />
            </Part>
          </Right>
        </HalfWrap>
      </OnePageSubContainer>
    </OnePageContainer>
  );
};

export default ProfileEdit;
