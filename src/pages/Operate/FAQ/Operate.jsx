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
import { emailOptions } from '../../../common/Option/SignUp';

const Operate = () => {
  return (
    <OnePageContainer>
      <MainTitle>FAQ 등록</MainTitle>
      <OnePageSubContainer>
        <FullWrap2>
          <div style={{ display: 'flex', margin: '10px auto' }}>
            <CustomSelect
              width={200}
              options={emailOptions}
              defaultValue={emailOptions[0]}
            />
            <CustomInput
              placeholder="질문 내용을 입력해주세요."
              style={{ marginLeft: '10px' }}
              width={550}
            />
          </div>
        </FullWrap2>
        <FullWrap2>
          <CustomTextArea />
        </FullWrap2>
      </OnePageSubContainer>
    </OnePageContainer>
  );
};

export default Operate;
