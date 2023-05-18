import styled from 'styled-components';
import { CheckBox } from './Checkbox';
import { useState } from 'react';

const StyledDiv = styled.div`
  position: absolute;
  display: flex;
  margin-left: -10px;
  align-items: center;
`;

const StyledCheckDiv = styled.div`
  width: 12.5%;
  display: flex;
  justify-content: center;
  border-radius: 100%;
  width: 0.9rem;
  height: 0.9rem;
  background-color: ${({ isChecked }) => (isChecked ? '#4c83d6' : '#E6E6E6')};
`;

const StyledImg = styled.img`
  width: 0.6rem;
  height: 0.6rem;
  margin-top: 3px;
`;

const CheckImg = () => {
  const [check, setCheck] = useState(Array.from({ length: 1 }, () => false)); // 체크 박스

  return (
    <StyledDiv>
      <StyledCheckDiv
        onClick={() => setCheck(CheckBox(check, check.length, 1, true))}
        isChecked={check[1]}
      >
        <StyledImg src="/svg/check.svg" />
      </StyledCheckDiv>
    </StyledDiv>
  );
};

export default CheckImg;
