import { styled, css } from 'styled-components';

export const ToggleBtn = styled.button`
  width: 55px;
  height: 23px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  background-color: ${props => (!props.toggle ? '#e6e6e6' : '#64B5FF')};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;
export const Circle = styled.div`
  background-color: white;
  width: 30px;
  height: 30px;
  border-radius: 50px;
  position: absolute;
  left: 0%;
  transition: all 0.5s ease-in-out;
  ${props =>
    props.toggle &&
    css`
      transform: translate(28px, 0);
      transition: all 0.5s ease-in-out;
    `}
`;

export const Wrapper = styled.div`
  position: relative;
  margin-left: 10px;
`;

// 사용 예시
{
  /* <Wrapper>
  <ToggleBtn onClick={kakaoBtnCLick} toggle={kakaoToggle}>
    <Circle toggle={kakaoToggle} />
  </ToggleBtn>
</Wrapper>; */
}
