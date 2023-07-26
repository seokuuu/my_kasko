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
  FullWrap2,
} from '../../../common/OnePage/OnePage.Styled';

import { CustomInput, CustomTextArea } from '../../../common/Input/Input';
import { CustomSelect } from '../../../common/Option/Main';
import { faqOptions } from '../../../common/Option/SignUp';

import { BtnWrap, WhiteBtn, BlackBtn } from '../../../common/Button/Button';

const FAQPost = () => {
  return (
    <OnePageContainer>
      <MainTitle>FAQ 등록</MainTitle>
      <OnePageSubContainer>
        <FullWrap2>
          <div style={{ display: 'flex', margin: '10px auto' }}>
            <CustomSelect
              width={200}
              options={faqOptions}
              defaultValue={faqOptions[0]}
            />
            <CustomInput
              placeholder="질문 내용을 입력해주세요."
              style={{ marginLeft: '10px' }}
              width={630}
            />
          </div>
        </FullWrap2>
        <FullWrap2>
          <CustomTextArea placeholder="질문 상세 내용을 입력해주세요." />
        </FullWrap2>
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

export default FAQPost;
