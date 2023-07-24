import React, { useState, useCallback, useEffect, useContext } from 'react';
import styled, { css } from 'styled-components';

import { Link } from 'react-router-dom';

import {
  StyledCheckMainDiv,
  StyledCheckSubDiv,
  CheckImg,
} from '../../../common/Check/CheckImg';
import { CheckBox } from '../../../common/Check/Checkbox';
import {
  Container,
  SubContainer,
  Title,
  LoginContainer,
  LoginSubContainer,
  InputWrap,
  Input,
  InputBtmWrap,
  InputBottomWrap,
  IbwLeft,
  IbwRight,
  LoginBtnWrap,
  LoginBtn,
  IbwTxt,
  LoginBottom,
  LoginBottom2,
  ImgWrap,
  IbwWrap,
} from './Login.Styled';

import { useAtom } from 'jotai';
import { headerAtom, accordionAtom } from '../../../store/Layout/Layout';

const Login = () => {
  const [showHeader, setShowHeader] = useAtom(headerAtom);
  const [showAccordion, setShowAccordion] = useAtom(accordionAtom);
  setShowHeader(false);
  setShowAccordion(false);
  // // HeadFootLeftSwitch 막기

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [idPlaceholder, setIdPlaceholder] = useState('아이디');
  const [idPlaceholderColor, setIdPlaceholderColor] = useState('');
  const [pwPlaceholder, setPwPlaceholder] = useState('비밀번호');
  const [pwPlaceholderColor, setPwPlaceholderColor] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [check, setCheck] = useState(false);
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

  console.log('check', check);

  // 아이디 저장

  const saveIdToLocalStorage = id => {
    return localStorage.setItem('savedId', id);
  };

  const removeSavedIdFromLocalStorage = () => {
    return localStorage.removeItem('savedId');
  };

  const getSavedIdFromLocalStorage = () => {
    return localStorage.getItem('savedId');
  };

  useEffect(() => {
    const savedId = getSavedIdFromLocalStorage();
    if (savedId) {
      setId(savedId);
      setCheck(true);
    }
  }, []);

  const handleSaveId = () => {
    setCheck(prev => !prev);
    console.log('함수 안!!', check);
    if (!check) {
      saveIdToLocalStorage(id);
    } else {
      removeSavedIdFromLocalStorage();
    }
  };

  console.log('함수 밖', check);

  useEffect(() => {
    setButtonDisabled(!isIdValid || !isPasswordValid);

    if (id && !isIdValid) {
      setIdBottom('올바른 내용이 아닙니다.');
      setBottomColor('#d92f2f');
      setIdPlaceholderColor('#d92f2f');
    } else if (id && isIdValid) {
      setIdBottom('');
      setIdPlaceholderColor('#4ca9ff');
    }

    if (pw && !isPasswordValid) {
      setPwBottom('영문, 숫자 조합 4~12자리로 입력해 주세요');
      setBottomColor('#d92f2f');
      setPwPlaceholderColor('#d92f2f');
    } else if (pw && isPasswordValid) {
      setPwBottom('');
      setPwPlaceholderColor('#4ca9ff');
    }
  }, [id, pw, idBottom, pwBottom]);

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
              <IbwWrap>
                <IbwLeft>
                  <StyledCheckMainDiv>
                    <StyledCheckSubDiv
                      style={{
                        backgroundColor: check ? '#4c83d6' : '#E6E6E6',
                        marginTop: '-2px',
                      }}
                      onClick={() => {
                        handleSaveId();
                      }}
                      isChecked={check[0]}
                      id="rememberId"
                    >
                      <CheckImg src="/svg/check.svg" />
                    </StyledCheckSubDiv>
                  </StyledCheckMainDiv>
                  <div style={{ marginLeft: '5px' }}>아이디 저장</div>
                </IbwLeft>
                <IbwRight>
                  <Link to={`/find`}>아이디 찾기</Link> /
                  <Link to={`/reissue`}>비밀번호 재발급</Link>
                </IbwRight>
              </IbwWrap>

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
