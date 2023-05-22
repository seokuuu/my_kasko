import styled, { css } from 'styled-components';

export const TxtInput = styled.input`
  width: 320px;
  height: 40px;
  border: 1px solid #c1c1c1c5;
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
  width: 220px;
  height: 40px;
  border: 1px solid #c1c1c1c5;
`;

export const SInput = styled.input`
  width: 100px;
  height: 40px;
  border: 1px solid #c1c1c1c5;
`;
