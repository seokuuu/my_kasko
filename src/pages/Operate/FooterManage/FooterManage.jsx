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

import { BtnWrap, BlackBtn, WhiteBtn } from '../../../common/Button/Button';

const FooterManage = () => {
  return (
    <OnePageContainer>
      <MainTitle>푸터 관리</MainTitle>
      <OnePageSubContainer>
        <HalfWrap>
          <Left>
            <Part>
              <Title>
                <h4>상호명</h4>
                <p></p>
              </Title>
              <CustomInput placeholder="" width={340} />
            </Part>
            <Part>
              <Title>
                <h4>주소</h4>
                <p></p>
              </Title>
              <CustomInput placeholder="" width={340} />
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
          </Left>
          <Right>
            <Part>
              <Title>
                <h4>대표명</h4>
                <p></p>
              </Title>
              <CustomInput placeholder="" width={340} />
            </Part>

            <Part>
              <Title>
                <h4>대표 번호</h4>
                <p></p>
              </Title>
              <CustomInput placeholder="'-'제외한 숫자 입력" width={340} />
            </Part>
            <Part>
              <Title>
                <h4>팩스 번호</h4>
                <p></p>
              </Title>
              <CustomInput placeholder="'-'제외한 숫자 입력" width={340} />
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
      <BtnWrap bottom={-200}>
        <WhiteBtn width={40} height={40}>
          돌아가기
        </WhiteBtn>
        <BlackBtn width={40} height={40}>
          저장
        </BlackBtn>
      </BtnWrap>
    </OnePageContainer>
  );
};

export default FooterManage;
