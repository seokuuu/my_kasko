import styled, { css } from 'styled-components'

export const TxtInput = styled.input`
  width: 320px;
  height: 40px;
  border: 1px solid #c1c1c1c5;
  font-size: 16px;

  &[disabled] {
    background: #c8c8c8;
  }
`

export const TxtCheckInput = styled.input`
  outline: none;
  width: 220px;
  height: 40px;
  border: 1px solid #c1c1c1c5;

  &:focus {
    border: 1px solid #c1c1c1c5;
    ${(props) =>
      props.borderColor &&
      css`
        border: 1px solid ${props.borderColor};
      `}
    &::placeholder {
      color: #d92f2f;
    }
  }
`

export const TxtDropInput = styled.input`
  width: 195px;
  height: 40px;
  border: 1px solid #c1c1c1c5;
`
export const ManagerInput = styled.input`
  width: 120px;
  height: 40px;
  border: 1px solid #c1c1c1c5;
`

export const SInput = styled.input`
  width: 100px;
  height: 40px;
  border: 1px solid #c1c1c1c5;
`

export const Inputa = styled.input`
  width: 120px;
  height: 40px;
  border: 1px solid #c1c1c1c5;
  font-size: 16px;
`

export const InputA = styled.input`
  width: 195px;
  height: 40px;
  border: 1px solid #c1c1c1c5;
  font-size: 16px;
`

export const CustomInput = styled.input`
  font-size: 16px;
  width: ${(props) => props.width}px;
  height: 40px;
  border: 1px solid #c1c1c1c5;
`

export const FlexInput = styled.input`
  font-size: 16px;
  width: 100%;
  height: 40px;
  border: 1px solid #c1c1c1c5;
`

export const CustomTextArea = styled.textarea`
  display: flex;
  width: 100%;
  height: 50vh;
  resize: none;
  padding: 20px;
  border: 1px solid black;
`

// 끝 단위 Input
export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  width: 200px; /* 원하는 너비로 조절 */
`

export const NoOutInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  width: 100%; /* flex 아이템의 너비를 100%로 설정 */
  height: 25px;
`

export const Unit = styled.span`
  position: relative;
  font-size: 16px;
  margin-left: 5px;
  margin-right: 5px;
`

export const PropsInput = styled.input`
  font-size: 16px;
  width: ${(props) => (props.per ? `${props.per}%` : props.px ? `${props.px}px` : '100%')};
  height: 40px;
  border: 1px solid #c1c1c1c5;
`
export const PropsTextArea = styled.textarea`
  font-size: 16px;
  width: ${(props) => (props.per ? `${props.per}%` : props.px ? `${props.px}px` : '100%')};
  height: ${(props) => props.height}px;
  border: 1px solid #c1c1c1c5;
  padding: 12px 24px 12px 24px;
`
