import { styled, css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  font-size: 12px;
  color: #6b6b6b;
  font-size: 14px;
`;
export const SubContainer = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  width: 27%;
  min-width: 500px;
  height: 35vw;
`;
export const Title = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  height: 70px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const LoginContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
  max-height: 4000px;
  border: 1px solid #d7d7d7;
  padding: 20px;
  span {
    color: #4c83d6;
  }
`;

export const LoginSubContainer = styled.div`
  width: 100%;
  height: 90%;
  margin-left: auto;
  margin-right: auto;
`;

export const InputWrap = styled.div`
  display: flex;

  img {
    position: absolute;
    margin-top: 17px;
    margin-left: 5px;
    z-index: 100;
  }
`;

export const Input = styled.input`
  outline: none;
  width: 98%;
  height: 50px;
  border-bottom: 1px solid black;
  margin: 5px;
  padding-left: 30px;

  &:focus {
    border-bottom-color: #4ca9ff;
    ${props =>
      props.borderColor &&
      css`
        border-bottom-color: ${props.borderColor};
      `}
    &::placeholder {
      color: #d92f2f;
    }
  }
`;

export const InputBottomWrap = styled.div`
  width: 90%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  margin-top: 10px;

  p {
    margin-top: 10px;

    &:hover {
      font-weight: 900;
    }
  }
`;

export const IbwWrap = styled.div`
  display: flex;

  justify-content: space-between;
`;

export const IbwLeft = styled.div`
  display: flex;
  line-height: 14px;
  font-weight: 600;
  color: black;
`;
export const IbwRight = styled.div`
  line-height: 14px;
  a {
    color: #6b6b6b;
    cursor: pointer;
  }
`;

export const IbwTxt = styled.div`
  text-align: center;
  margin-top: 20px;
  span {
    text-decoration: underline;
    color: black;
    cursor: pointer;
    &:hover {
      font-weight: 900;
    }
  }

  a {
    color: #6b6b6b;
    cursor: pointer;
  }
`;

export const LoginBtnWrap = styled.div`
  float: none;
  clear: both;
  text-align: center;
`;

export const LoginBtn = styled.button`
  font-size: large;
  width: 100%;
  height: 45px;
  margin-top: 30px;
  background-color: ${props => (props.disabled ? 'gray' : '#061737')};
  color: white;
  border: none;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
`;

export const LoginBottom = styled.div`
  text-align: center;
  font-size: 13px;
  margin-left: 50px;
  margin-right: 50px;
  margin-top: 10px;
`;

export const LoginBottom2 = styled.div`
  text-align: center;
  justify-content: center;
  margin-top: 10px;
  display: flex;

  p {
    margin: 10px;
  }
`;
export const ImgWrap = styled.div`
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 30px;

  p {
    margin-top: 30px;
  }
`;

export const InputBtmWrap = styled.div`
  display: flex;
  margin-left: 30px;
  margin-bottom: 5px;
  color: ${props => props.bottomColor};
`;
