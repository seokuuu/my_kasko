import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import {
  Container,
  SubContainer,
  Title,
  LoginContainer,
  LoginSubContainer,
} from './Login.Styled';

import { IbwTxt } from './Login.Styled';

const Find = () => {
  const dummy = [
    {
      name: '장석원',
      busId: '1234512345',
      contact: '01012341234',
    },
  ];

  const normalAlert = {
    // 내용 1 버튼 1
    open: false,
    content: [],
    isReload: null,
  };

  const [alert, setAlert] = useState(normalAlert);

  const findHadler = () => {
    if (!info.id) {
      return setAlert(prevState => ({
        ...prevState,
        open: true,
        content: '아이디를 입력해 주세요.',
        isReload: false,
      }));
    }
    if (!info.password) {
      return setAlert(prevState => ({
        ...prevState,
        open: true,
        content: '비밀번호를 정확히 입력해 주세요.',
        isReload: false,
      }));
    }
  };
  return (
    <Container>
      <SubContainer>
        <Title style={{ marginTop: '10px', marginBottom: '20px' }}>
          <img src="/img/login_logo.png" alt="" />
          <FindMsg>회원가입 시 등록한 정보를 입력해 주세요.</FindMsg>
        </Title>
        <LoginContainer>
          <LoginSubContainer>
            <FindContainer>
              <h4>대표자 성명</h4>
              <input placeholder="홍길동"></input>
            </FindContainer>
            <FindContainer>
              <h4>사업자 번호</h4>
              <input placeholder=""></input>
            </FindContainer>
            <FindContainer>
              <h4>대표 연락처</h4>
              <input placeholder=""></input>
            </FindContainer>
            <IdFindBtn type="button">아이디 찾기</IdFindBtn>
            <IbwTxt>
              아이디가 기억나셨나요? <Link to={`/`}>비밀번호 재발급</Link>
            </IbwTxt>
          </LoginSubContainer>
        </LoginContainer>
      </SubContainer>
    </Container>
  );
};

export default Find;

const FindContainer = styled.div`
  color: black;
  text-align: left;
  margin-bottom: 15px;

  h4 {
    font-size: 18px;
  }
  input {
    margin-top: 5px;
    border: 1px solid #e1e1e1;
    width: 100%;
    height: 40px;
  }
`;

const FindMsg = styled.div`
  margin: 20px 0px 20px 0px;
  font-size: 16px;
  width: 300px;
  position: relative;
  left: -15px;
`;

const IdFindBtn = styled.button`
  font-size: 19px;
  margin-top: 30px;
  width: 100%;
  height: 50px;
  background-color: #061737;
  color: white;
  cursor: pointer;
`;
