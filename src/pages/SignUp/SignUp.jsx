import React from 'react';
import styled from 'styled-components';

const SignUp = () => {
  return (
    <Container>
      <SignupContainer>
        <Top>회원가입</Top>
        <Main>
          <Left></Left>
          <Right></Right>
        </Main>
        <Bottom>밑</Bottom>
      </SignupContainer>
    </Container>
  );
};

export default SignUp;

const Container = styled.div`
  width: 100%;
  height: 35vw;
  font-size: 14px;
  border: 1px solid black;
`;

const SignupContainer = styled.div`
  border: 1px solid black;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 55vw;
  height: 100vw;
`;

const Top = styled.div`
  font-size: 40px;
  font-weight: 500;
  text-align: left;
  width: 90%;
  height: 200px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 50px;
  border-bottom: 1px solid black;
`;

const Main = styled.div`
  border-bottom: 1px solid black;
  width: 100%;
  height: 80vw;
  margin-top: 50px;
`;

const Left = styled.div`
  float: left;
  border: 1px solid magenta;
  width: 50%;
  height: 100%;
`;

const Right = styled.div`
  float: right;
  border: 1px solid cyan;
  width: 50%;
  height: 100%;
`;

const Bottom = styled.div`
  float: none;
  clear: both;
`;
