import styled from 'styled-components';

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
  width: 100%;
  margin-top: 50px;
  padding-left: 50px;
  padding-right: 50px;
`;

export const Left = styled.div`
  float: left;
  width: 50%;
  margin-left: 50px;

  .div {
    display: flex;
  }
`;

export const Right = styled.div`
  float: right;
  width: 34.5%;
  margin-right: 50px;
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
  width: 320px;
  height: 40px;
  border: 1px solid red;
  background-color: aliceblue;
  cursor: pointer;
`;

export const SDropDown = styled.div`
  width: 100px;
  height: 40px;
  border: 1px solid magenta;
`;

export const BottomP = styled.div`
  margin-top: 5px;
  display: flex;
  margin-left: 170px;
`;

export const CheckBtn = styled.button`
  width: 95px;
  height: 40px;
  background-color: white;
  border: 1px solid black;
  margin-left: 5px;
`;