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
  Titles,
  TitleChild,
  FullWrap,
  FWTitle,
} from '../../../common/OnePage/OnePage.Styled';

import { CustomInput } from '../../../common/Input/Input';
import { CustomSelect } from '../../../common/Option/Main';
import { emailOptions } from '../../../common/Option/SignUp';

import { BtnWrap, BlackBtn, WhiteBtn } from '../../../common/Button/Button';

const Terms = () => {
  return (
    <OnePageContainer>
      <Titles>
        <TitleChild bor>이용 약관</TitleChild>
        <TitleChild>개인정보 처리 방침</TitleChild>
        <TitleChild>개인정보 수집 동의</TitleChild>
      </Titles>
      <OnePageSubContainer>
        <FWTitle>
          <h5>서비스 이용약관</h5>
          <h6>최근 수정일 : 2023.06.12</h6>
        </FWTitle>
        <FullWrap style={{ marginTop: '30px', height: '30vw' }}>
          <textarea></textarea>
        </FullWrap>
      </OnePageSubContainer>
      <BtnWrap bottom={-30}>
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

export default Terms;
