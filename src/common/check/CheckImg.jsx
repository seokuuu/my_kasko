import styled from 'styled-components';
import { CheckBox } from './Checkbox';
import { useState } from 'react';

export const StyledCheckMainDiv = styled.div`
  position: absolute;
  display: flex;
  margin-left: -10px;
  align-items: center;
`;

//원형 체크
export const StyledCheckSubDiv = styled.div`
  width: 12.5%;
  display: flex;
  justify-content: center;
  border-radius: 100%;
  width: 0.9rem;
  height: 0.9rem;
  background-color: ${({ isChecked }) => (isChecked ? '#4c83d6' : '#E6E6E6')};
`;

//사각 체크
export const StyledCheckSubSquDiv = styled.div`
  width: 12.5%;
  display: flex;
  justify-content: center;

  width: 1rem;
  height: 1rem;
  background-color: ${({ isChecked }) => (isChecked ? '#4c83d6' : '#E6E6E6')};
`;

//로그인 체크이미지
export const CheckImg = styled.img`
  width: 0.6rem;
  height: 0.6rem;
  margin-top: 3px;
`;

//회원가입 업태 선택 체크이미지
export const CheckImg2 = styled.img`
  width: 0.7rem;
  height: 0.7rem;
  margin-top: 3px;
`;

const LoginCheckImg = () => {
  const [check, setCheck] = useState(Array.from({ length: 1 }, () => false)); // 체크 박스

  return (
    <StyledCheckMainDiv>
      <StyledCheckSubDiv
        onClick={() => setCheck(CheckBox(check, check.length, 1, true))}
        isChecked={check[1]}
      >
        <CheckImg src="/svg/check.svg" />
      </StyledCheckSubDiv>
    </StyledCheckMainDiv>
  );
};

export default LoginCheckImg;
