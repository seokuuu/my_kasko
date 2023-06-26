import React, { useState, useCallback, useEffect } from 'react';
import styled, { css } from 'styled-components';
import CheckImg from '../../common/check/CheckImg';
import { Link } from 'react-router-dom';

const Login = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [idPlaceholder, setIdPlaceholder] = useState('아이디');
  const [idPlaceholderColor, setIdPlaceholderColor] = useState('');
  const [pwPlaceholder, setPwPlaceholder] = useState('비밀번호');
  const [pwPlaceholderColor, setPwPlaceholderColor] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [check, setCheck] = useState(Array.from({ length: 1 }, () => false)); // 체크 박스
  const [idBottom, setIdBottom] = useState('');
  const [bottomColor, setBottomColor] = useState('');
  const [pwBottom, setPwBottom] = useState('');

  const idRegex = /^[a-z0-9]{4,12}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{8,12}$/;

  const idDummy = {
    userId: ['wkdqaz', 'solskjaer73', 'asd123'],
  };

  const handleIdChange = useCallback(e => {
    const value = e.target.value;
    setId(value);
  }, []);

  const handlePwChange = useCallback(e => {
    const value = e.target.value;
    setPw(value);
  }, []);

  const isIdValid = idRegex.test(id);
  const isPasswordValid = passwordRegex.test(pw);

  useEffect(() => {
    setButtonDisabled(!isIdValid || !isPasswordValid);

    if (id.length > 1 && !isIdValid) {
      setIdBottom('올바른 내용이 아닙니다.');
      setBottomColor('#d92f2f');
      setIdPlaceholderColor('#d92f2f');
    } else if (pw.length > 1 && isIdValid) {
      setIdBottom('');
    }

    if (pw.length > 1 && !isPasswordValid) {
      setPwBottom('영문, 숫자 조합 4~12자리로 입력해 주세요');
      setBottomColor('#d92f2f');
      setPwPlaceholderColor('#d92f2f');
    } else if (pw.length > 1 && isPasswordValid) {
      setIdBottom('');
    }
  }, [id, pw]);

  const handleIdArea = useCallback(() => {});

  const handlePwArea = useCallback(() => {});

  useEffect(() => {
    if (id && isIdValid) {
      setIdPlaceholderColor('#4ca9ff');
    } else {
      setIdPlaceholderColor('#d92f2f');
    }
  }, [id]);

  useEffect(() => {
    if (pw) {
      setPwPlaceholderColor('#4ca9ff');
    } else {
      setPwPlaceholderColor('#d92f2f');
    }
  }, [pw]);

  const handleIdFocus = useCallback(
    e => {
      if (id === '') {
        setIdPlaceholderColor('#d92f2f');
        setIdPlaceholder('아이디를 입력해 주세요');
      }
    },
    [id]
  );

  const handleIdBlur = useCallback(e => {
    setIdPlaceholderColor('#d92f2f');
    setIdPlaceholder('아이디');
  }, []);

  const handlePwFocus = useCallback(() => {
    if (pw === '') {
      setPwPlaceholderColor('#d92f2f');
      // setPwPlaceholder('영문, 숫자 조합 8~12자리로 입력해 주세요');
    }
  }, [pw]);

  const handlePwBlur = useCallback(() => {
    setPwPlaceholderColor('black');
    setPwPlaceholder('비밀번호');
  }, []);

  const handleSubmit = useCallback(e => {
    e.preventDefault();
    // 폼 제출 로직
  }, []);

  return (
    <Container>
      <SubContainer>
        <Title>
          <img src="/img/login_logo.png" alt="" />
        </Title>
        <LoginContainer>
          <LoginSubContainer>
            <InputWrap>
              <img src="/svg/Login_id_icon.svg" style={{ marginLeft: '2px' }} />
              <Input
                type="text"
                value={id}
                onChange={handleIdChange}
                onFocus={handleIdFocus}
                onBlur={handleIdBlur}
                placeholder={idPlaceholder}
                borderColor={idPlaceholderColor}
                style={{ color: id === '' ? idPlaceholderColor : 'black' }}
              />
            </InputWrap>
            <InputBtmWrap bottomColor={bottomColor}>{idBottom}</InputBtmWrap>
            <InputWrap>
              <img src="/svg/Login_pw_icon.svg" />
              <Input
                type="password"
                value={pw}
                onChange={handlePwChange}
                onFocus={handlePwFocus}
                onBlur={handlePwBlur}
                placeholder={pwPlaceholder}
                borderColor={pwPlaceholderColor}
                style={{ color: pw === '' ? pwPlaceholderColor : 'black' }}
              />
            </InputWrap>
            <InputBtmWrap bottomColor={bottomColor}>{pwBottom}</InputBtmWrap>
            <InputBottomWrap>
              <CheckImg />
              <IbwLeft>아이디 저장</IbwLeft>
              <IbwRight>
                <a>아이디 찾기</a> / <a>비밀번호 재발급</a>
              </IbwRight>
              <LoginBtnWrap>
                {buttonDisabled ? (
                  <LoginBtn disabled>로그인</LoginBtn>
                ) : (
                  <LoginBtn>로그인</LoginBtn>
                )}
              </LoginBtnWrap>
              <IbwTxt>
                아직 회원이 아니세요?
                <Link to={`/signup`}>
                  <span style={{ marginLeft: '5px' }}>회원가입</span>
                </Link>
              </IbwTxt>
            </InputBottomWrap>
          </LoginSubContainer>
        </LoginContainer>
        <LoginBottom>
          2023년 1월 이후 공인인증서 로그인이 폐지되었습니다. 회원가입 후
          이용해주세요. 계정 분실 등의 문의는 업무 담당자(
          <span style={{ color: 'black' }}>070-8889-3456~9</span>)로 문의해
          주세요.
          <LoginBottom2>
            <p>Email: kasko@kasko.co.kr </p> <p>Fax: 031-719-6540</p>
          </LoginBottom2>
        </LoginBottom>
        <ImgWrap>
          <img src="/img/login_kasko.png" />
          <p>Copyright 2023 카스코철강. All Rights Reserved.</p>
        </ImgWrap>
      </SubContainer>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  width: 100%;
  font-size: 12px;
  color: #6b6b6b;
  font-size: 14px;
`;
const SubContainer = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  width: 27vw;
  height: 35vw;
`;
const Title = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  height: 70px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const LoginContainer = styled.div`
  max-width: 100%;
  height: 320px;
  border: 1px solid #d7d7d7;
  padding: 20px;
`;

const LoginSubContainer = styled.div`
  width: 100%;
  height: 90%;
`;

const InputWrap = styled.div`
  display: flex;

  img {
    position: absolute;
    margin-top: 17px;
    margin-left: 5px;
    z-index: 100;
  }
`;

const Input = styled.input`
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

const InputBottomWrap = styled.div`
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
const IbwLeft = styled.div`
  float: left;
  margin-left: 15px;
  font-weight: 600;
  color: black;
`;
const IbwRight = styled.div`
  float: right;

  a {
    color: #6b6b6b;
    cursor: pointer;
  }
`;

const IbwTxt = styled.div`
  margin-top: 20px;
  span {
    text-decoration: underline;
    color: black;
    cursor: pointer;
    &:hover {
      font-weight: 900;
    }
  }
`;

const LoginBtnWrap = styled.div`
  float: none;
  clear: both;
  text-align: center;
`;

const LoginBtn = styled.button`
  font-size: large;
  width: 100%;
  height: 45px;
  margin-top: 30px;
  background-color: ${props => (props.disabled ? 'gray' : '#061737')};
  color: white;
  border: none;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
`;

const LoginBottom = styled.div`
  text-align: center;
  font-size: 13px;
  margin-left: 50px;
  margin-right: 50px;
  margin-top: 10px;
`;

const LoginBottom2 = styled.div`
  text-align: center;
  justify-content: center;
  margin-top: 10px;
  display: flex;

  p {
    margin: 10px;
  }
`;
const ImgWrap = styled.div`
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 30px;

  p {
    margin-top: 30px;
  }
`;

const InputBtmWrap = styled.div`
  display: flex;
  margin-left: 30px;
  margin-bottom: 5px;
  color: ${props => props.bottomColor};
`;
