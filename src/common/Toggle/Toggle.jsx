import { styled, css } from 'styled-components'

export const ToggleBtn = styled.button`
  width: 45px;
  height: 18px;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (!props.toggle ? '#e6e6e6' : '#64B5FF')};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.15);
`
export const Circle = styled.div`
  background-color: white;
  width: 25px;
  height: 25px;
  border-radius: 50px;
  position: absolute;
  left: -15%;
  transition: all 0.5s ease-in-out;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.15);
  ${(props) =>
    props.toggle &&
    css`
      transform: translate(28px, 0);
      transition: all 0.5s ease-in-out;
    `}
`

export const Wrapper = styled.div`
  position: relative;
  margin-left: 10px;
`

// 사용 예시
{
  /* <Wrapper>
  <ToggleBtn onClick={kakaoBtnCLick} toggle={kakaoToggle}>
    <Circle toggle={kakaoToggle} />
  </ToggleBtn>
</Wrapper>; */
}
