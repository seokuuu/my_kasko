import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 30vw;
  font-size: 14px;
  text-align: left;

  h4 {
    font-size: 17px;
    margin-bottom: 5px;
  }
`;

export const Title = styled.div`
  display: flex;
  p {
    position: relative;
    top: 1px;
    margin-left: 4px;
  }
`;

export const SignupContainer = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 55vw;
  height: 90vw;
`;

export const PartBlock = styled.div`
  margin-bottom: 50px;
`;

export const Part = styled.div`
  margin-bottom: 20px;
  border: 1px solid black;
`;

export const Top = styled.div`
  font-size: 40px;
  font-weight: 500;
  text-align: left;
  width: 80%;
  height: 180px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 50px;
  border-bottom: 1px solid black;
`;

export const Main = styled.div`
  position: relative;
  width: 80%;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
`;

export const Left = styled.div`
  float: left;
  width: 320px;
  margin-left: 30px;

  .div {
    display: flex;
  }
`;

export const Right = styled.div`
  float: right;
  width: 320px;
  margin-right: 30px;
`;

export const Init = styled.div`
  float: none;
  clear: both;
`;

export const Bottom = styled.div`
  width: 80%;
  height: 200px;
  margin-left: auto;
  margin-right: auto;
  border-top: 2px solid #d7d7d7;
  padding-top: 30px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

export const BottomItem = styled.div`
  flex-grow: 1;
  width: 200px;
  height: 150px;
  padding: 10px;
  font-size: 16px;

  > div {
    display: flex;
    margin-bottom: 10px;
  }

  a {
    margin-left: 10px;
    text-decoration: underline;
    cursor: pointer;
    color: #6b6b6b;
  }

  h4,
  p {
    margin-left: 5px;
  }

  span {
    color: #d92f2f;
  }

  button {
    margin-top: 20px;
    margin-left: 20px;
    width: 200px;
    height: 50px;
    background-color: #6b6b6b;
    color: white;
  }
`;

export const TxtDiv = styled.div`
  display: flex;
  width: 320px;
  height: 40px;
  border: 1px solid #c1c1c1c5;

  align-items: center;
  justify-content: center;
  cursor: pointer;

  p {
    margin-left: 10px;
  }
`;

export const SDropDown = styled.div`
  width: 100px;
  height: 40px;
  border: 1px solid magenta;
`;

export const BottomP = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: flex-end;
  width: 320px;
`;

export const CheckBtn = styled.button`
  width: 95px;
  height: 40px;
  background-color: ${props => (props.disabled ? 'grey' : 'white')};
  border: 1px solid ${props => (props.disabled ? 'grey' : '#6b6b6b')};
  margin-left: 5px;
`;

export const SubmitBtn = styled.button`
  width: 320px;
  height: 40px;
  background-color: ${props => (props.disabled ? 'grey' : 'white')};
  border: 1px solid ${props => (props.disabled ? 'grey' : '#6b6b6b')};
`;

export const DropWrap = styled.div`
  display: flex;
  width: 320px;
`;
