import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Container,
  SignupContainer,
  PartBlock,
  Part,
  Top,
  Main,
  Left,
  Right,
  Bottom,
  BottomItem,
  TxtDiv,
  SDropDown,
  BottomP,
  CheckBtn,
  Init,
} from './SignUp.Styled';
import {
  TxtInput,
  TxtCheckInput,
  TxtDropInput,
  SInput,
} from '../../common/Input/Input';
import { idRegex, pwRegex } from '../../common/Regex/Regex';

const SignUp = () => {
  const [inputs, setInputs] = useState({
    id: '',
    pw: '',
  });
  const dummy = {
    userID: ['test1', 'wkdqaz'],
  };

  // ID
  const [id, setId] = useState('');
  const [idMsg, setIdMsg] = useState('');
  const [idMsgColor, setIdMsgColor] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const isIdValid = idRegex.test(id);
  const [isFocused, setIsFocused] = useState(false);
  const [idDupleCheck, setIdDupleCheck] = useState(false);

  // PW
  const [pw, setPw] = useState('');
  const [pwMsg, setPwMsg] = useState('');
  const [pwMsgColor, setPwMsgColor] = useState('');

  const isPwValid = idRegex.test(id);
  const [pwFocused, setPwFocused] = useState(false);

  // PW Duple
  const [pwDuple, setPwDuple] = useState('');
  const [pwDupMsg, setDupMsg] = useState('');
  const [pwDupleFocused, setDuplePwFocused] = useState(false);

  // Company
  const [company, setCompany] = useState('');
  const [companyFocused, setCompanyFocused] = useState(false);
  const [companyMsg, setCompanyMsg] = useState('');

  // Represent
  const [rep, setRep] = useState('');
  const [repFocused, setRepFocused] = useState(false);
  const [repMsg, setRepMsg] = useState('');

  /// Common ///
  //Color
  const [statusColor, setStatusColor] = useState('');

  // ID 관련
  // ID Focus & Blur 스위치
  const handleIdFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  const handleIdBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  // ID event 및 정규식 체크
  const handleIdChange = useCallback(
    e => {
      const value = e.target.value;
      setId(value);
      const isValid = idRegex.test(value); // 입력된 값의 유효성 검사
      if (!isValid) {
        setIdMsgColor('red');
        setIdMsg('4~12자리 소문자와 숫자 조합으로 입력해주세요.');
      } else if (isValid && !idDupleCheck) {
        setIdMsgColor('red');
        setIdMsg('중복 확인이 필요해요.');
      } else if (isValid && idDupleCheck) {
        setIdMsg('');
      }
    },
    [idDupleCheck]
  );

  // ID 중복 확인
  const handleDuplicateCheck = () => {
    const isDuplicate = dummy.userID.includes(id);
    if (isDuplicate) {
      setIdDupleCheck(false);
      setIdMsgColor('red');
      setIdMsg('이미 사용중인 아이디 입니다.');
    } else {
      setIdDupleCheck(true);
      setIdMsgColor('blue');
      setIdMsg('사용 가능한 아이디입니다.');
      setTimeout(() => {
        setIdMsg('');
      }, 3000);
      //  +++ 여기에 중복체크 상태와 data에 아이디도 넣기 +++
    }
  };

  /// PW 관련

  // 1.정규식 맞는지 확인하기 2.비번확인은 단순히 비번과 같은지 확인하자
  const handlePwChange = useCallback(
    e => {
      const value = e.target.value;
      setPw(value);
      const pwValid = pwRegex.test(value); // 입력된 값의 유효성 검사
      if (pwFocused && !pw && !pwValid) {
        setPwMsgColor('red');
        setPwMsg('4~12자리 소문자와 숫자 조합으로 입력해주세요.');
      } else if (pwFocused && pwValid) {
        setPwMsg('');
      }
    },
    [pwFocused]
  );

  const handlePwDupleCheck = useCallback(e => {
    const value = e.target.value;
    setPwDuple(value);
  }, []);

  useEffect(() => {
    const dupleValid = pw === pwDuple;
    console.log('dupleValid', dupleValid);
    if (pwDupleFocused && pwDuple && !dupleValid) {
      setDupMsg('비밀번호가 일치하지 않습니다');
      setStatusColor('red');
    } else if (pwDupleFocused && dupleValid) {
      setDupMsg('');
    }
  }, [pw, pwDuple, pwDupleFocused]);

  const handleCompanyChange = useCallback(
    e => {
      const value = e.target.value;
      setCompany(value);
      const companyValid = companyFocused && !company; // 입력된 값의 유효성 검사
      if (companyValid) {
        setCompanyMsg('4~12자리 소문자와 숫자 조합으로 입력해주세요.');
      } else setCompanyMsg('');
    },
    [companyFocused, company]
  );

  const handleRepChange = useCallback(
    e => {
      const value = e.target.value;
      setRep(value);
      if (repFocused && !rep) {
        setRepMsg('유효한 값을 입력하세요');
      } else {
        setRepMsg('');
      }
    },
    [repFocused]
  );

  // const onFocusTest(()=> {

  // })

  const handleSubmit = useCallback(e => {
    e.preventDefault();
    // 폼 제출 로직
  }, []);

  return (
    <Container>
      <SignupContainer>
        <Top>회원가입</Top>
        <Main>
          <Left>
            <PartBlock>
              <Part>
                <Title>
                  <h4>아이디</h4>
                  <p>
                    {isFocused && idMsg && id ? (
                      <p style={{ color: idMsgColor }}>{idMsg}</p>
                    ) : idDupleCheck && idMsg && !isFocused && id ? (
                      <p style={{ color: idMsgColor }}>{idMsg}</p>
                    ) : !idDupleCheck && idMsg && !isFocused && id ? (
                      <p style={{ color: idMsgColor }}>{idMsg}</p>
                    ) : null}
                  </p>
                </Title>

                <div>
                  <TxtCheckInput
                    type="text"
                    value={id}
                    onChange={handleIdChange}
                    onFocus={handleIdFocus}
                    onBlur={handleIdBlur}
                    borderColor={idMsgColor}
                  />
                  {isIdValid === false ? (
                    <CheckBtn disabled>중복 확인</CheckBtn>
                  ) : (
                    <CheckBtn onClick={handleDuplicateCheck} type="button">
                      중복 확인
                    </CheckBtn>
                  )}
                </div>
              </Part>
              <Part>
                <Title>
                  <h4>비밀번호</h4>
                  <p style={{ color: pwMsgColor }}>{pwMsg}</p>
                </Title>
                <div>
                  <TxtInput
                    placeholder="영문, 숫자 조합 8~12자리"
                    type="password"
                    value={pw}
                    borderColor={statusColor}
                    onChange={handlePwChange}
                    onFocus={() => {
                      setPwFocused(true);
                    }}
                    onBlur={() => {
                      setPwFocused(false);
                    }}
                  />
                </div>
              </Part>
              <Part>
                <Title>
                  <h4>비밀번호 확인</h4>
                  <p style={{ color: statusColor }}>{pwDupMsg}</p>
                </Title>
                <div>
                  <TxtInput
                    placeholder="비밀번호 재입력"
                    type="password"
                    value={pwDuple}
                    borderColor={statusColor}
                    onChange={handlePwDupleCheck}
                    onFocus={() => {
                      setDuplePwFocused(true);
                    }}
                    onBlur={() => {
                      setDuplePwFocused(false);
                    }}
                  />
                </div>
              </Part>
            </PartBlock>
            <PartBlock>
              <Part>
                <h4>사업자 구분</h4>
                ㅋㅋ
                <input type="radio"></input>
                <input type="radio"></input>
                ㅋㅋ
                <input type="radio"></input>
              </Part>
              <Part>
                <Title>
                  <h4>회사 명</h4>
                  {companyFocused && !company ? (
                    <p style={{ color: 'red' }}>{companyMsg}</p>
                  ) : null}
                </Title>

                <div>
                  <TxtInput
                    type="text"
                    onClick={handleCompanyChange}
                    onFocus={() => {
                      setCompanyFocused(true);
                    }}
                    onBlur={() => {
                      setCompanyFocused(false);
                    }}
                  />
                </div>
              </Part>
              <Part>
                <Title>
                  <h4>대표자 성명</h4>
                  <p style={{ color: 'red' }}>{repMsg}</p>
                </Title>

                <div>
                  <TxtInput
                    type="text"
                    onChange={handleRepChange}
                    value={rep}
                    onFocus={() => {
                      setRepFocused(true);
                    }}
                    onBlur={() => {
                      setRepFocused(false);
                    }}
                  />
                </div>
              </Part>
              <Part>
                <Title>
                  <h4>대표 연락처</h4>
                  <p>ㅋㅋ</p>
                </Title>

                <div>
                  <TxtInput placeholder="연락처 입력('-' 제외)" />
                </div>
              </Part>
              <Part>
                <Title>
                  <h4>팩스 번호</h4>
                  <p>ㅋㅋ</p>
                </Title>

                <div>
                  <TxtInput placeholder="팩스번호 입력('-' 제외)" />
                </div>
              </Part>
              <Part>
                <Title>
                  <h4>주소</h4>
                  <p>ㅋㅋ</p>
                </Title>

                <div>
                  <TxtCheckInput />
                  <CheckBtn
                    style={{ backgroundColor: 'black', color: 'white' }}
                  >
                    찾기
                  </CheckBtn>
                  <TxtInput placeholder="상세 주소를 입력해 주세요." />
                </div>
              </Part>
            </PartBlock>
            <PartBlock>
              <Part>
                <Title>
                  <h4>입금 담당자 정보</h4>
                  <p>ㅋㅋ</p>
                </Title>

                <div style={{ display: 'flex' }}>
                  <SDropDown></SDropDown>
                  <TxtDropInput placeholder="담당자 성함 입력" />
                </div>
              </Part>
              <Part>
                <h4>휴대폰 번호</h4>
                <TxtInput placeholder="연락처 입력('-' 제외)" />
                <BottomP>
                  <input type="checkbox" style={{ marginRight: '5px' }} />
                  경매 담당자 정보와 동일
                </BottomP>
              </Part>
            </PartBlock>
          </Left>
          <Right>
            <PartBlock>
              <Part>
                <Title>
                  <h4>입금 담당자 정보</h4>
                  <p>ㅋㅋ</p>
                </Title>
                <div style={{ display: 'flex' }}>
                  <SDropDown></SDropDown>
                  <TxtDropInput placeholder="담당자 성함 입력" />
                </div>
              </Part>
              <Part>
                <h4>이메일</h4>
                <div style={{ display: 'flex' }}>
                  <SInput /> @ <SDropDown></SDropDown>
                </div>
              </Part>
              <Part>
                <h4>휴대폰 번호</h4>
                <TxtInput placeholder="연락처 입력('-' 제외)" />
              </Part>
            </PartBlock>
            <PartBlock>
              <Part>
                <h4>업태 선택</h4>
                ㅋㅋ
                <input type="radio"></input>
                ㅋㅋ
                <input type="radio"></input>
              </Part>
              <Part>
                <h4>사업자 번호</h4>
                <div>
                  <TxtCheckInput placeholder="사업자 번호 입력('-' 제외)" />
                  <CheckBtn>중복확인</CheckBtn>
                </div>
              </Part>
              <Part>
                <h4>사업자 등록증</h4>
                <TxtDiv></TxtDiv>
              </Part>
              <Part>
                <h4>통장 사본</h4>
                <TxtDiv></TxtDiv>
              </Part>
              <Part>
                <h4>계좌번호</h4>
                <SDropDown></SDropDown>
                <TxtInput placeholder="(계좌번호 입력('-' 제외)" />
              </Part>
            </PartBlock>
            <PartBlock style={{ marginTop: '138px' }}>
              <Part>
                <h4>출고 담당자 정보</h4>
                <div style={{ display: 'flex' }}>
                  <SDropDown></SDropDown>
                  <TxtDropInput placeholder="담당자 성함 입력" />
                </div>
              </Part>
              <Part>
                <h4>휴대폰 번호</h4>
                <TxtInput placeholder="연락처 입력('-' 제외)" />

                <BottomP>
                  <input type="checkbox" style={{ marginRight: '5px' }} />
                  경매 담당자 정보와 동일
                </BottomP>
              </Part>
            </PartBlock>
          </Right>
          <Init></Init>
        </Main>
        <Bottom>
          <BottomItem>
            <h4>약관 동의</h4>
          </BottomItem>
          <BottomItem style={{ flexGrow: '6' }}>
            <div>
              <input type="checkbox" />
              <h4>전체 동의합니다</h4>
            </div>
            <div>
              <input type="checkbox" />
              <p>
                개인정보 활용에 동의 <span>(필수)</span>
              </p>
              <a>약관 보기</a>
            </div>
            <div>
              <input type="checkbox" />
              <p>
                이용약관 동의 <span>(필수)</span>
              </p>
              <a style={{ marginLeft: '55px' }}>약관 보기</a>
            </div>
          </BottomItem>
          <BottomItem>
            <button>가입하기</button>
          </BottomItem>
        </Bottom>
      </SignupContainer>
    </Container>
  );
};

export default SignUp;

const Title = styled.div`
  display: flex;

  p {
    position: relative;
    top: 1px;
    margin-left: 4px;
  }
`;
