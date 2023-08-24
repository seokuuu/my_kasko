import { useState, useCallback, useEffect } from 'react';
import { styled } from 'styled-components';
import {
  Container,
  SubContainer,
  Title,
  LoginContainer,
  LoginSubContainer,
} from '../Login/Login.Styled';
import { FindMsg, FindContainer, FindTitleMsg } from '../FindId/FindId';
import { BlueBtn } from '../../../common/Button/Button';
import { IbwTxt } from '../Login/Login.Styled';
import {Link, useNavigate} from 'react-router-dom';
import Select from 'react-select';
import { emailOptions } from '../../../common/Option/SignUp';
import { SInput } from '../../../common/Input/Input';

import { useAtom } from 'jotai';

import {
  headerAtom,
  accordionAtom,
  subHeaderAtom,
} from '../../../store/Layout/Layout';
import {busIdRegex} from "../../../common/Regex/Regex";
import {resetPw} from "../../../api/auth";

const init = {
  id: '',
  name: '',
  businessNumber: '',
  email: '',
};

const ReissuePw = () => {
  const [showHeader, setShowHeader] = useAtom(headerAtom);
  const [showAccordion, setShowAccordion] = useAtom(accordionAtom);
  const [showSubHeader, setShowSubHeader] = useAtom(subHeaderAtom);
  setShowHeader(false);
  setShowAccordion(false);
  setShowSubHeader(false);

  const navigate = useNavigate();

  const [input, setInput] = useState(init);
  const [validErrorMassage, setValidErrorMessage] = useState(init);
  const [emailFirst, setEmailFirst] = useState('');
  const [emailDomain, setEmailDomain] = useState('');

  const reissueHandler = useCallback(e => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  });

  const emailHandler = useCallback(e => {
    const value = e.target.value;
    setEmailFirst(value);
  });

  useEffect(() => {
    if (emailFirst && emailDomain) {
      setInput({ ...input, email: emailFirst + '@' + emailDomain });
    }
  }, [emailFirst, emailDomain]);

  const onSubmit = async () => {
    const isValid = isValidation();
    if(!isValid) return false;

    try {
      await resetPw(input);
      alert("임시 비밀번호 발송 완료");
      navigate("/");
    } catch (e) {
      alert("일치하는 계정이 없습니다.");
    }
  }

  const isValidation = () => {
    if (!input.id) {
      validErrorMessageHandler('id')
      return false;
    }
    if (!input.name) {
      validErrorMessageHandler('name')
      return false;
    }
    if (!input.businessNumber || !busIdRegex.test(input.businessNumber)) {
      validErrorMessageHandler('businessNumber')
      return false;
    }
    if (!input.email) {
      validErrorMessageHandler('email')
      return false;
    }

    setValidErrorMessage(init);
    return true;
  }

  const validErrorMessageHandler = (name) => {
    setValidErrorMessage({...init, [name]: true});
  }

  return (
    <Container>
      <SubContainer>
        <Title style={{ marginTop: '10px', marginBottom: '20px' }}>
          <img src="/img/login_logo.png" alt="" />
          <FindMsg style={{ left: '-65px' }}>
            회원가입 시 등록한 정보를 입력해 주세요.
          </FindMsg>
        </Title>
        <LoginContainer style={{ width: '500px' }}>
          <LoginSubContainer style={{ width: '90%', marginTop: '20px' }}>
            <FindContainer>
              <FindTitleMsg>
                <h5>아이디</h5>
                {validErrorMassage.id && <p>내용을 확인해 주세요.</p>}
                <p></p>
              </FindTitleMsg>
              <input
                onChange={reissueHandler}
                name="id"
                value={input.id}
              ></input>
            </FindContainer>
            <FindContainer>
              <FindTitleMsg>
                <h5>대표자 성명</h5>
                {validErrorMassage.name && <p>내용을 확인해 주세요.</p>}
              </FindTitleMsg>
              <input
                onChange={reissueHandler}
                name="name"
                value={input.name}
              ></input>
            </FindContainer>
            <FindContainer>
              <FindTitleMsg>
                <h5>사업자 번호</h5>
                {validErrorMassage.businessNumber && <p>올바른 번호가 아닙니다.</p>}
              </FindTitleMsg>
              <input
                onChange={reissueHandler}
                name="businessNumber"
                value={input.businessNumber}
              ></input>
            </FindContainer>
            <EmailContainer>
              <FindTitleMsg>
                <h5>이메일 인증</h5>
                {validErrorMassage.email && <p>내용을 확인해 주세요.</p>}
              </FindTitleMsg>
              <div
                style={{
                  display: 'flex',
                  lineHeight: '40px',
                }}
              >
                <SInput style={{ width: '180px' }} onChange={emailHandler} />
                <p style={{ margin: '0 5px' }}>@</p>
                <EmailSelect
                  options={emailOptions}
                  defaultValue={emailOptions[0]}
                  onChange={selectedOption => {
                    setEmailDomain(selectedOption.label);
                  }}
                />
              </div>
            </EmailContainer>
          </LoginSubContainer>
          <div style={{ textAlign: 'center' }}>
            <BlueBtn type={"button"} width={90} height={40} fontSize={16} onClick={onSubmit}>
              비밀번호 재발급
            </BlueBtn>
            <IbwTxt>
              아이디가 기억 안나시나요?
              <Link to={`/findid`}>
                <span> 아이디 찾기</span>
              </Link>
            </IbwTxt>
          </div>
        </LoginContainer>
      </SubContainer>
    </Container>
  );
};

export default ReissuePw;

const Wrap = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid black;
`;

const EmailSelect = styled(Select)`
  text-align: center;
  line-height: 26.5px;
  width: 210px;
`;

const EmailContainer = styled.div`
  color: black;
  text-align: left;
  margin-bottom: 15px;
  h5 {
    font-size: 16px;
  }
`;
