import { styled } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useCallback } from 'react';
import {
  Container,
  SubContainer,
  Title,
  LoginContainer,
  LoginSubContainer,
} from '../Login/Login.Styled';

import { IbwTxt } from '../Login/Login.Styled';
import { busIdRegex, phoneRegex } from '../../../common/Regex/Regex';
// import { BlueBtn, WhiteBtn } from '../../common/Button/Button';
import { BlueBtn, WhiteBtn } from '../../../common/Button/Button';
import { useAtom } from 'jotai';
import {
  headerAtom,
  accordionAtom,
  subHeaderAtom,
} from '../../../store/Layout/Layout';

const FindId = () => {
  const [showHeader, setShowHeader] = useAtom(headerAtom);
  const [showAccordion, setShowAccordion] = useAtom(accordionAtom);
  const [showSubHeader, setShowSubHeader] = useAtom(subHeaderAtom);
  setShowHeader(false);
  setShowAccordion(false);
  setShowSubHeader(false);
  const navigate = useNavigate();

  const [findPageNum, setFindPageNum] = useState(0);

  const dummy = [
    {
      name: '장석원',
      busId: '1234512345',
      contact: '01012341234',
    },
  ];

  const info = {
    name: '',
    busNum: '',
    contact: '',
  };

  const [input, setInput] = useState(info);

  console.log(input);

  const normalAlert = {
    alertColor: '',
    nameMsg: '',
    busNumMsg: '',
    contactMsg: '',
  };

  const [alert, setAlert] = useState(normalAlert);

  const commonHandler = useCallback(
    e => {
      const { name, value } = e.target;
      setInput({ ...input, [name]: value });

      if (name === 'name') {
        if (!value) {
          setAlert(prevState => ({
            ...prevState,
            alertColor: 'red',
            nameMsg: '내용을 확인해 주세요',
            busNumMsg: '',
            contactMsg: '',
          }));
        } else {
          setAlert(prevState => ({
            ...prevState,
            alertColor: '',
            nameMsg: '',
            busNumMsg: '',
            contactMsg: '',
          }));
        }
      } else if (name === 'busNum') {
        if (!value || !busIdRegex.test(value)) {
          setAlert(prevState => ({
            ...prevState,
            alertColor: 'red',
            nameMsg: '',
            busNumMsg: '올바른 사업자 번호가 아닙니다',
            contactMsg: '',
          }));
        } else {
          setAlert(prevState => ({
            ...prevState,
            alertColor: '',
            nameMsg: '',
            busNumMsg: '',
            contactMsg: '',
          }));
        }
      } else if (name === 'contact') {
        if (!value || !phoneRegex.test(value)) {
          setAlert(prevState => ({
            ...prevState,
            alertColor: 'red',
            nameMsg: '',
            busNumMsg: '',
            contactMsg: '올바른 번호가 아닙니다',
          }));
        } else {
          setAlert(prevState => ({
            ...prevState,
            alertColor: '',
            nameMsg: '',
            busNumMsg: '',
            contactMsg: '',
          }));
        }
      }
    },
    [input, info]
  );

  return (
    <>
      {findPageNum === 0 && (
        <Container>
          <SubContainer>
            <Title style={{ marginTop: '10px', marginBottom: '20px' }}>
              <img src="/img/login_logo.png" alt="" />
              <FindMsg style={{ left: '-60px' }}>
                회원가입 시 등록한 정보를 입력해 주세요.
              </FindMsg>
            </Title>
            <LoginContainer>
              <LoginSubContainer>
                <FindContainer>
                  <FindTitleMsg>
                    <h4>대표자 성명</h4>
                    <p>{alert.nameMsg}</p>
                  </FindTitleMsg>

                  <input
                    placeholder=""
                    onChange={commonHandler}
                    name="name"
                    value={input.name}
                  ></input>
                </FindContainer>
                <FindContainer>
                  <FindTitleMsg>
                    <h4>사업자 번호</h4>
                    <p>{alert.busNumMsg}</p>
                  </FindTitleMsg>
                  <input
                    placeholder="사업자 번호 입력('-' 제외)"
                    onChange={commonHandler}
                    name="busNum"
                    value={input.busNum}
                  ></input>
                </FindContainer>
                <FindContainer>
                  <FindTitleMsg>
                    <h4>대표 연락처</h4>
                    <p>{alert.contactMsg}</p>
                  </FindTitleMsg>
                  <input
                    placeholder="'-' 제외"
                    onChange={commonHandler}
                    name="contact"
                    value={input.contact}
                  ></input>
                </FindContainer>
                <BlueBtn
                  type="button"
                  onClick={() => {
                    setFindPageNum(1);
                  }}
                  width={100}
                  height={40}
                  fontSize={16}
                >
                  아이디 찾기
                </BlueBtn>
                <IbwTxt>
                  아이디가 기억나셨나요?{' '}
                  <Link to={`/reissuepw`}>비밀번호 재발급</Link>
                </IbwTxt>
              </LoginSubContainer>
            </LoginContainer>
          </SubContainer>
        </Container>
      )}
      {findPageNum === 1 && (
        <>
          <Container>
            <SubContainer>
              <Title style={{ marginTop: '10px', marginBottom: '20px' }}>
                <img src="/img/login_logo.png" alt="" />
                <FindMsg style={{ left: '-60px' }}>
                  아이디 찾기 결과입니다. 아래 정보를 확인해 주세요.
                </FindMsg>
              </Title>
              <LoginContainer style={{ width: '450px' }}>
                <FindIdResult>
                  아이디 : <span> www</span>
                </FindIdResult>
                <BtnWrap>
                  <BlueBtn height={40} width={90} fontSize={16} type="button">
                    로그인
                  </BlueBtn>
                  <WhiteBtn
                    onClick={() => {
                      navigate('/reissue');
                    }}
                    type="button"
                    height={40}
                    width={90}
                    fontSize={16}
                  >
                    비밀번호 재발급
                  </WhiteBtn>
                </BtnWrap>
              </LoginContainer>
            </SubContainer>
          </Container>
        </>
      )}
    </>
  );
};

export default FindId;

export const FindContainer = styled.div`
  color: black;
  text-align: left;
  margin-bottom: 15px;

  h4 {
    font-size: 18px;
  }

  h5 {
    font-size: 16px;
  }
  input {
    margin-top: 5px;
    border: 1px solid #e1e1e1;
    width: 100%;
    height: 40px;
  }
`;

export const FindMsg = styled.div`
  margin: 20px 0px 20px 0px;
  font-size: 16px;
  width: 400px;
  position: relative;
  left: -15px;
`;

export const FindTitleMsg = styled.div`
  display: flex;
  height: 20px;
  p {
    margin-left: 6px;
    margin-top: 3px;
    color: red;
  }
`;

const FindIdResult = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  width: 90%;
  height: 100px;
  border: 1px solid black;
  font-size: 18px;
`;

const BtnWrap = styled.div`
  position: relative;
  left: 20px;

  button {
    margin-bottom: 10px;
  }
`;
