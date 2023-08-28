import styled, { css } from 'styled-components';

export const TxtInput = styled.input`
  width: 320px;
  height: 40px;
  border: 1px solid #c1c1c1c5;
  font-size: 16px;
`;

export const TxtCheckInput = styled.input`
  outline: none;
  width: 220px;
  height: 40px;
  border: 1px solid #c1c1c1c5;

  &:focus {
    border: 1px solid #c1c1c1c5;
    ${props =>
      props.borderColor &&
      css`
        border: 1px solid ${props.borderColor};
      `}
    &::placeholder {
      color: #d92f2f;
    }
  }
`;

export const TxtDropInput = styled.input`
  width: 195px;
  height: 40px;
  border: 1px solid #c1c1c1c5;
`;

export const SInput = styled.input`
  width: 100px;
  height: 40px;
  border: 1px solid #c1c1c1c5;
`;

export const Inputa = styled.input`
  width: 120px;
  height: 40px;
  border: 1px solid #c1c1c1c5;
  font-size: 16px;
`;

export const InputA = styled.input`
  width: 195px;
  height: 40px;
  border: 1px solid #c1c1c1c5;
  font-size: 16px;
`;

export const CustomInput = styled.input`
  font-size: 16px;
  width: ${props => props.width}px;
  height: 40px;
  border: 1px solid #c1c1c1c5;
`;

export const FlexInput = styled.input`
  font-size: 16px;
  width: 100%;
  height: 40px;
  border: 1px solid #c1c1c1c5;
`;

export const CustomTextArea = styled.textarea`
  display: flex;
  width: 100%;
  height: 50vh;
  resize: none;
  padding: 20px;
  border: 1px solid black;
`;
