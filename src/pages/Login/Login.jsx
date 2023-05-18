import React from "react";
import styled from "styled-components"

const login = () => {
    return (
        <Container>
            <SubContainer>
                <Title>(주)카스코철강</Title>
                <LoginContainer>
                    <LoginSubContainer>
                        <Input />
                        <Input />
                        <InputBottomWrap>
                            <IbwLeft>아이디 저장</IbwLeft>
                            <IbwRight><a>아이디 찾기</a> / <a>비밀번호 초기화</a></IbwRight>
                            <LoginBtnWrap>
                                <LoginBtn>로그인</LoginBtn>
                            </LoginBtnWrap>
                            <p>아직 회원이 아니세요? <span>회원가입</span></p>
                        </InputBottomWrap>
                    </LoginSubContainer>
                </LoginContainer>
                <LoginBottom>2023년 1월 이후 공인인증서 로그인이 폐지되었습니다. 회원가입 후 이용해주세요. 계정 분실 등의 문의는 업무 담당자(<span>070-8889-3456~9</span>)로 문의해 주세요.
                    <LoginBottom2>
                        <p>Email: kasko@kasko.co.kr </p> <p>Fax: 031-719-6540</p>
                    </LoginBottom2>
                </LoginBottom>
                <ImgWrap>
                    <img src="/img/login_kasko.png" />
                </ImgWrap>
            </SubContainer>
        </Container>
    );
};

export default login;


const Container = styled.div`
    width: 100%;
    height: 45vw;   
    border: 1px solid black;
    font-size: 12px;
`
const SubContainer = styled.div`
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
    width: 27vw;
    height: 35vw;
    border: 1px solid blue;
`
const Title = styled.div`
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    height: 70px;
    border: 1px solid black;
    justify-content: center;
    align-items: center;
    text-align: center;
`

const LoginContainer = styled.div`
    max-width: 100%;
    height: 250px;
    border: 1px solid orange;
    padding: 20px;
    
`

const LoginSubContainer = styled.div`
    width: 100%;
    height: 90%;
    border: 1px solid magenta;
`

const Input = styled.input`
    width: 98%;
    height: 50px;
    border: 1px solid black;
`

const InputBottomWrap = styled.div`
    width: 90%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;

    span {
        text-decoration: underline;
    }
`
const IbwLeft = styled.div`
    float: left;
    border: 1px solid red;
    
`
const IbwRight = styled.div`
    float: right;
`

const LoginBtnWrap = styled.div`
    float: none;
     clear: both;
     text-align: center;
`

const LoginBtn = styled.button`
    margin-top: 20px;
    width: 100%;
    height: 40px;
`

const LoginBottom = styled.div`
    text-align: center;
    font-size: 11px;
    margin-left: 10px;
    margin-right: 10px;
`

const LoginBottom2 = styled.div`
    text-align: center;
    justify-content: center;
    margin-top: 10px;
    display: flex;

    p {
        margin-left: 10px;
        margin-right: 10px;
    }
`
const ImgWrap = styled.div`
    justify-content: center;
    align-items: center;
    text-align: center;
`