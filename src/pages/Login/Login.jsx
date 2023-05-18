import React from "react";
import styled from "styled-components"

const login = () => {
    return (
        <Container>
            <SubContainer>
                <Title><img src='/img/login_logo.png' /></Title>
                <LoginContainer>
                    <LoginSubContainer>
                        <Input placeholder="아이디" />
                        <Input placeholder="비밀번호" />
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
                <LoginBottom>2023년 1월 이후 공인인증서 로그인이 폐지되었습니다. 회원가입 후 이용해주세요. 계정 분실 등의 문의는 업무 담당자(<span style={{color:"black"}}>070-8889-3456~9</span>)로 문의해 주세요.
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

export default login;


const Container = styled.div`
    width: 100%;
    height: 45vw;   
    font-size: 12px;
		color: #6B6B6B;
		font-size: 14px;
`
const SubContainer = styled.div`
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
    width: 27vw;
    height: 35vw;
`
const Title = styled.div`
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    height: 70px;
    justify-content: center;
    align-items: center;
    text-align: center;
`

const LoginContainer = styled.div`
    max-width: 100%;
    height: 300px;
    border: 1px solid #D7D7D7;
    padding: 20px;
    
`

const LoginSubContainer = styled.div`
    width: 100%;
    height: 90%;
`

const Input = styled.input`
    width: 98%;
    height: 50px;
    border: 1px solid black;
		margin: 5px;
		padding-left: 10px;
`

const InputBottomWrap = styled.div`
    width: 90%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
		margin-top: 10px;
    span {
        text-decoration: underline;
				color: #000000;
    }

		p { 
			margin-top: 10px;
		}
`
const IbwLeft = styled.div`
    float: left;
    
`
const IbwRight = styled.div`
    float: right;
		
		a {
			color: #6B6B6B;
		}
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
    font-size: 12px;
    margin-left: 60px;
    margin-right: 60px;
		margin-top: 10px;
`

const LoginBottom2 = styled.div`
    text-align: center;
    justify-content: center;
    margin-top: 10px;
    display: flex;

    p {
				margin: 10px;
    }
`
const ImgWrap = styled.div`
    justify-content: center;
    align-items: center;
    text-align: center;
		margin-top: 30px;

		p {
			margin-top: 30px;
		}
`