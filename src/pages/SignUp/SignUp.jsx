import React, { useCallback, useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
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
  SubmitBtn,
  DropWrap,
} from './SignUp.Styled';
import {
  TxtInput,
  TxtCheckInput,
  TxtDropInput,
  SInput,
} from '../../common/Input/Input';
import {
  idRegex,
  pwRegex,
  busIdRegex,
  phoneRegex,
} from '../../common/Regex/Regex';
import DaumPostcode from 'react-daum-postcode';
import Select from 'react-select';
import {
  StyledCheckMainDiv,
  StyledCheckSubSquDiv,
  StyledCheckSubDiv,
  CheckImg,
  CheckImg2,
} from '../../common/Check/CheckImg';
import { CheckBox } from '../../common/Check/Checkbox';

const SignUp = () => {
  //checkBox
  const [radio, setRadio] = useState(Array.from({ length: 3 }, () => false));
  const [check, setCheck] = useState(Array.from({ length: 2 }, () => false));
  const dummy = {
    userId: ['test1', 'wkdqaz'],
    busId: ['1231212345'],
  };

  //modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //post
  const [postFind, setPostFind] = useState(false);

  console.log('postFind', postFind);

  const postCheck = () => {
    setPostFind(false);
  };

  const directCheck = () => {
    setPostFind(true);
    setAddress('');
    setDetailAddress('');
    setInput({ ...input, address: '', addressDetail: '' });
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setAddress('');
    setDetailAddress('');
    setInput({ ...input, address: '', addressDetail: '' });
  };

  const comfirmPost = () => {
    setModalIsOpen(false);
    setInput({ ...input, address: address, addressDetail: detailAddress });
  };

  // 가입하기 grey 버튼
  const [greyBtn, setGreyBtn] = useState(false);

  useEffect(() => {
    if (input.value === '') {
      console.log('빈값이 있숩니다');
    }
  }, [greyBtn]);
  //daum post code
  const [isDaumPostOpen, setIsDaumPostOpen] = useState(false);

  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  const daumPostHandleBtn = () => {
    setIsDaumPostOpen(true);
  };

  const daumPostHandleComplete = data => {
    const { address } = data;
    setAddress(address);
    setIsDaumPostOpen(false);
  };

  const daumPosthandleClose = () => {
    setIsDaumPostOpen(false);
  };

  const detailAddressHandler = e => {
    const value = e.target.value;
    setDetailAddress(value);
  };

  //total msg
  const [msg, setMsg] = useState({});

  //total color
  const [txtColor, setTxtColor] = useState('');
  console.log('msg !!!', msg);

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

  const isPwValid = pwRegex.test(pw);
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

  //Business Number
  const [busId, setBusId] = useState('');
  const [busIdMsg, setBusIdMsg] = useState('');
  const [busIdMsgColor, setBusIdMsgColor] = useState('');

  const busIdValid = busIdRegex.test(busId);
  const [busIdFocused, setBusIdFocused] = useState(false);
  const [busIdDupleCheck, setBusIdDupleCheck] = useState(false);

  //Phone Number
  //deposit
  //account
  //release

  const [auctionPhone, setAuctionPhone] = useState(''); //경매
  const [depositPhone, setDepositPhone] = useState(''); //입금
  const [releasePhone, setReleasePhone] = useState(''); //출고
  const [phoneMsg, setPhoneMsg] = useState('');

  const init = {
    id: '',
    password: '',
    title: '',
    name: '',
    email: '',
    phone: '',
    type: '',
    customerName: '',
    ceoName: '',
    customerPhone: '',
    fax: '',
    address: '',
    addressDetail: '',
    businessType: [],
    businessNumber: '',
    bank: '',
    accountNumber: '',
    depositManagerTitle: '',
    depositManagerName: '',
    depositManagerPhone: '',
    releaseManagerTitle: '',
    releaseManagerName: '',
    releaseManagerPhone: '',
  };

  //total input
  const [input, setInput] = useState(init);

  /// Common ///
  //Color
  const [statusColor, setStatusColor] = useState('');

  // option
  const depositOptions = [
    { value: 'ask0', label: '직함 선택 ' },
    { value: 'ask1', label: '1' },
    { value: 'ask2', label: '2' },
    { value: 'ask3', label: '3' },
    { value: 'ask4', label: '4' },
  ];

  console.log('depositOptions', depositOptions);
  const auctionOptions = [
    { value: 'ask0', label: '직함 선택 ' },
    { value: 'ask1', label: '1' },
    { value: 'ask2', label: '2' },
    { value: 'ask3', label: '3' },
    { value: 'ask4', label: '4' },
  ];

  console.log('@@', auctionOptions);
  const releaseOptions = [
    { value: 'ask0', label: '직함 선택 ' },
    { value: 'ask1', label: '1' },
    { value: 'ask2', label: '2' },
    { value: 'ask3', label: '3' },
    { value: 'ask4', label: '4' },
  ];
  const accountOptions = [
    { value: 'ask0', label: '은행 선택 ' },
    { value: 'ask1', label: '1' },
    { value: 'ask2', label: '2' },
    { value: 'ask3', label: '3' },
    { value: 'ask4', label: '4' },
  ];
  const emailOptions = [
    { value: 'ask0', label: '도메인 선택' },
    { value: 'ask1', label: 'naver.com' },
    { value: 'ask2', label: 'gmail.com' },
    { value: 'ask3', label: 'kakao.com' },
    { value: 'ask4', label: 'nate.com' },
  ];

  const handleSelectChange = (selectedOption, name) => {
    setInput(prevState => ({
      ...prevState,
      [name]: selectedOption.label,
    }));
  };

  console.log('input.email', input.email);

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
    const isDuplicate = dummy.userId.includes(id);
    if (isDuplicate) {
      setIdDupleCheck(false);
      setIdMsgColor('red');
      setIdMsg('이미 사용중인 아이디 입니다.');
    } else {
      setIdDupleCheck(true);
      setIdMsgColor('blue');
      setIdMsg('사용 가능한 아이디입니다.');
      setInput({ ...input, id: id });
      setTimeout(() => {
        setIdMsg('');
      }, 3000);
      //  +++ 여기에 중복체크 상태와 data에 아이디도 넣기 +++
    }
  };

  /// PW 관련

  // PW 핸들러
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

  //
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
      setInput({ ...input, password: pw });
    }
  }, [pw, pwDuple, pwDupleFocused]);

  const handleCompanyChange = useCallback(
    e => {
      const value = e.target.value;
      setCompany(value);
    },
    [companyFocused]
  );

  const handleRepChange = useCallback(
    e => {
      const value = e.target.value;
      setRep(value);
    },
    [repFocused]
  );

  // 사업자 번호 handler
  const handleBusIdChange = useCallback(e => {
    const value = e.target.value;
    setBusId(value);
    const isValid = busIdRegex.test(value);
    if (!isValid) {
      setBusIdMsgColor('red');
      setBusIdMsg('10자리의 숫자를 입력해주세요.');
    } else if (isValid && !idDupleCheck) {
      setBusIdMsgColor('red');
      setBusIdMsg('중복 확인이 필요해요.');
    } else if (isValid && idDupleCheck) {
      setIdMsg('');
    }
  });

  // 사업자 번호 중복 체크
  const handleBusIdDupleCheck = () => {
    const isDuplicate = dummy.busId.includes(busId);

    console.log('isDuplicate', isDuplicate);
    if (busId && isDuplicate) {
      setBusIdMsgColor('red');
      setBusIdMsg('이미 등록된 사업자 번호입니다.');
    } else if (busId && !isDuplicate) {
      setBusIdMsgColor('blue');
      setBusIdMsg('사용 가능한 사업자 번호입니다.');
      setTimeout(() => {
        setBusIdMsg('');
      }, 3000);
    }
  };

  /// 휴대폰 번호 (경매 / 입금 / 출고)
  const phoneHandler = useCallback(
    e => {
      const { name, value } = e.target;
      setInput({ ...input, [name]: value });
      const isValid = phoneRegex.test(value);
      if (!isValid) {
        setMsg({ ...msg, [name]: '10 ~ 11자리의 숫자를 입력해주세요.' });
        setTxtColor('red');
      } else if (isValid) {
        setMsg({ ...msg, [name]: '' });
        setTxtColor('');
      }
    },
    [input]
  );

  //회사 명, 대표자 성명, 대표 연락처, 팩스 번호 handler
  const companyHandler = useCallback(e => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  });

  // 폼 제출 로직
  const handleSubmit = useCallback(e => {
    e.preventDefault();
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
                <h4>업태 선택</h4>
                {/* <CheckWrap>
                  <StyledCheckMainDiv>
                    <StyledCheckSubDiv
                      onClick={() =>
                        setCheck(CheckBox(check, check.length, 1, true))
                      }
                      isChecked={check[1]}
                    >
                      <CheckImg2 src="/svg/check.svg" />
                    </StyledCheckSubDiv>
                    <p>유통</p>
                  </StyledCheckMainDiv>

                  <StyledCheckMainDiv>
                    <StyledCheckSubSquDiv
                      onClick={() =>
                        setCheck(CheckBox(check, check.length, 2, true))
                      }
                      isChecked={check[2]}
                    >
                      <CheckImg2 src="/svg/check.svg" />
                    </StyledCheckSubSquDiv>
                    <p>제조</p>
                  </StyledCheckMainDiv>
                </CheckWrap> */}
              </Part>
              <Part>
                <Title>
                  <h4>회사 명</h4>
                  <p>ㅋㅋ</p>
                </Title>
                <div>
                  <TxtInput
                    type="text"
                    name="customerName"
                    value={input.customerName}
                    onChange={companyHandler}
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
                    name="ceoName"
                    value={input.ceoName}
                    onChange={companyHandler}
                  />
                </div>
              </Part>
              <Part>
                <Title>
                  <h4>대표 연락처</h4>
                  <p>ㅋㅋ</p>
                </Title>
                <div>
                  <TxtInput
                    type="text"
                    name="customerPhone"
                    value={input.customerPhone}
                    onChange={companyHandler}
                    placeholder="연락처 입력('-' 제외)"
                  />
                </div>
              </Part>
              <Part>
                <Title>
                  <h4>팩스 번호</h4>
                  <p>ㅋㅋ</p>
                </Title>

                <div>
                  <TxtInput
                    type="text"
                    name="fax"
                    value={input.fax}
                    onChange={companyHandler}
                    placeholder="팩스번호 입력('-' 제외)"
                  />
                </div>
              </Part>
              <Part>
                <Title>
                  <h4>주소</h4>
                  <p>ㅋㅋ</p>
                </Title>
                {console.log('address', address)}
                <div>
                  <TxtCheckInput
                    type="text"
                    value={address}
                    placeholder="찾기 버튼 클릭"
                    readOnly
                  />
                  <CheckBtn
                    style={{ backgroundColor: 'black', color: 'white' }}
                    onClick={openModal}
                  >
                    찾기
                  </CheckBtn>
                  <TxtInput
                    placeholder="상세 주소를 입력해 주세요."
                    value={detailAddress}
                  />
                </div>
              </Part>
              {modalIsOpen && (
                <>
                  <ModalOverlay />
                  <ModalContainer>
                    <ModalSubContainer>
                      <Part>
                        <Title>
                          <h4>주소</h4>
                          <ModalRadioWrap>
                            <input
                              type="radio"
                              name="post"
                              onChange={postCheck}
                              defaultChecked
                            />
                            <p>찾기</p>
                          </ModalRadioWrap>
                          <ModalRadioWrap>
                            <input
                              type="radio"
                              name="post"
                              onChange={directCheck}
                            />
                            <p>직접 입력</p>
                          </ModalRadioWrap>
                        </Title>
                        {!postFind ? (
                          <>
                            <TxtCheckInput
                              type="text"
                              value={address}
                              readOnly
                            />

                            <CheckBtn
                              style={{
                                backgroundColor: 'black',
                                color: 'white',
                              }}
                              onClick={daumPostHandleBtn}
                            >
                              찾기
                            </CheckBtn>
                            <TxtInput
                              placeholder="상세 주소를 입력해 주세요."
                              type="text"
                              value={detailAddress}
                              onChange={detailAddressHandler}
                            />
                          </>
                        ) : (
                          <div>
                            <TxtInput
                              placeholder="주소를 입력해 주세요."
                              value={detailAddress}
                              onChange={detailAddressHandler}
                            />
                          </div>
                        )}
                      </Part>

                      <SubmitBtn onClick={comfirmPost}>확인</SubmitBtn>
                      <ModalCloseBtn
                        onClick={closeModal}
                        src="/svg/btn_close.svg"
                      />
                    </ModalSubContainer>
                    {isDaumPostOpen && (
                      <PostWrap>
                        <DaumPostcode onComplete={daumPostHandleComplete} />
                        <PostModalCloseBtn
                          onClick={daumPosthandleClose}
                          src="/svg/btn_close.svg"
                        />
                      </PostWrap>
                    )}
                  </ModalContainer>
                </>
              )}
            </PartBlock>
            <PartBlock>
              <Part>
                <Title>
                  <h4>입금 담당자 정보</h4>
                  <p>ㅋㅋ</p>
                </Title>
                <DropWrap>
                  <DepositSelect
                    options={depositOptions}
                    defaultValue={depositOptions[0]}
                    onChange={selectedOption =>
                      handleSelectChange(selectedOption, 'depositManagerTitle')
                    }
                  />
                  <TxtDropInput placeholder="담당자 성함 입력" />
                </DropWrap>
              </Part>
              <Part>
                <Title>
                  <h4>휴대폰 번호</h4>
                  <p style={{ color: txtColor }}>{msg.depositPhoneNum}</p>
                </Title>
                <TxtInput
                  placeholder="연락처 입력('-' 제외)"
                  name="depositPhoneNum"
                  value={input.depositPhoneNum}
                  onChange={phoneHandler}
                />
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
                  <h4>경매 담당자 정보</h4>
                  <p>ㅋㅋ</p>
                </Title>
                <DropWrap>
                  <DepositSelect
                    options={auctionOptions}
                    defaultValue={auctionOptions[0]}
                    onChange={selectedOption =>
                      handleSelectChange(selectedOption, 'title')
                    }
                  />
                  <TxtDropInput placeholder="담당자 성함 입력" />
                </DropWrap>
              </Part>
              <Part>
                <h4>이메일</h4>
                <div
                  style={{
                    display: 'flex',
                    lineHeight: '40px',
                    width: '320px',
                  }}
                >
                  <SInput /> <p style={{ margin: '0 5px' }}>@</p>
                  <EmailSelect
                    options={emailOptions}
                    defaultValue={emailOptions[0]}
                    onChange={selectedOption =>
                      handleSelectChange(selectedOption, 'email')
                    }
                  />
                </div>
              </Part>
              <Part>
                <Title>
                  <h4>휴대폰 번호</h4>
                  <p style={{ color: txtColor }}>{msg.actionPhoneNum}</p>
                </Title>
                <TxtInput
                  placeholder="연락처 입력('-' 제외)"
                  name="actionPhoneNum"
                  value={input.actionPhoneNum}
                  onChange={phoneHandler}
                />
              </Part>
            </PartBlock>
            <PartBlock>
              <Part>
                <h4>업태 선택</h4>
                <CheckWrap>
                  <StyledCheckMainDiv>
                    <StyledCheckSubSquDiv
                      onClick={() =>
                        setCheck(CheckBox(check, check.length, 1, true))
                      }
                      isChecked={check[1]}
                    >
                      <CheckImg2 src="/svg/check.svg" />
                    </StyledCheckSubSquDiv>
                    <p>유통</p>
                  </StyledCheckMainDiv>

                  <StyledCheckMainDiv>
                    <StyledCheckSubSquDiv
                      onClick={() =>
                        setCheck(CheckBox(check, check.length, 2, true))
                      }
                      isChecked={check[2]}
                    >
                      <CheckImg2 src="/svg/check.svg" />
                    </StyledCheckSubSquDiv>
                    <p>제조</p>
                  </StyledCheckMainDiv>
                </CheckWrap>
              </Part>
              <Part>
                <Title>
                  <h4>사업자 번호</h4>
                  <p style={{ color: busIdMsgColor }}>{busIdMsg}</p>
                  {console.log('busIdMsg', busIdMsg)}
                </Title>
                <div>
                  <TxtCheckInput
                    onChange={handleBusIdChange}
                    placeholder="사업자 번호 입력('-' 제외)"
                  />
                  <CheckBtn onClick={handleBusIdDupleCheck}>중복확인</CheckBtn>
                </div>
              </Part>
              <Part>
                <h4>사업자 등록증</h4>
                <TxtDiv>
                  <img src="/svg/Upload.svg" />
                  <p>파일 첨부</p>
                </TxtDiv>
              </Part>
              <Part>
                <h4>통장 사본</h4>
                <TxtDiv>
                  <img src="/svg/Upload.svg" />
                  <p>파일 첨부</p>
                </TxtDiv>
              </Part>
              <Part>
                <h4>계좌번호</h4>
                <AccountSelect
                  options={accountOptions}
                  defaultValue={accountOptions[0]}
                  onChange={selectedOption =>
                    handleSelectChange(selectedOption, 'bank')
                  }
                />
                <TxtInput
                  style={{ marginTop: '5px' }}
                  placeholder="(계좌번호 입력('-' 제외)"
                />
              </Part>
            </PartBlock>
            <PartBlock style={{ marginTop: '138px' }}>
              <Part>
                <h4>출고 담당자 정보</h4>
                <DropWrap>
                  <DepositSelect
                    options={releaseOptions}
                    defaultValue={releaseOptions[0]}
                    onChange={selectedOption =>
                      handleSelectChange(selectedOption, 'releaseManagerTitle ')
                    }
                  />
                  <TxtDropInput placeholder="담당자 성함 입력" />
                </DropWrap>
              </Part>
              <Part>
                <Title>
                  <h4>휴대폰 번호</h4>

                  <p style={{ color: txtColor }}>{msg.releasePhoneNum}</p>
                </Title>
                <TxtInput
                  placeholder="연락처 입력('-' 제외)"
                  name="releasePhoneNum"
                  value={input.releasePhoneNum}
                  onChange={phoneHandler}
                />
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
            <button
              type="button"
              onClick={() => {
                setGreyBtn(true);
              }}
            >
              가입하기
            </button>
            {console.log('input =>', input)}
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

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 400px;
  height: 280px;
  z-index: 9999;
`;

const ModalTitle = styled.h2`
  color: black;
`;

const ModalContent = styled.p`
  color: black;
`;

const CloseButton = styled.button`
  background-color: black;
  color: white;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
`;

const ModalSubContainer = styled.div`
  padding: 10%;
`;

const ModalRadioWrap = styled.div`
  display: flex;

  input {
    margin-bottom: 5px;
    margin-left: 10px;
  }
`;

const ModalCloseBtn = styled.img`
  width: 6%;
  position: absolute;
  left: 365px;
  bottom: 240px;
  cursor: pointer;
`;

const PostModalCloseBtn = styled.img`
  width: 6%;
  position: relative;
  left: 340px;
  bottom: 30px;
  cursor: pointer;
`;

const PostWrap = styled.div`
  position: relative;
  top: -300px;
`;

const DepositSelect = styled(Select)`
  width: 120px;
  text-align: center;
  line-height: 26px;
  margin-right: 5px;
`;

const EmailSelect = styled(Select)`
  width: 200px;
  text-align: center;
  line-height: 26.5px;
`;

const AccountSelect = styled(Select)`
  width: 320px;
  text-align: center;
  line-height: 26.5px;
`;

const CheckWrap = styled.div`
  display: flex;
  justify-content: space-around;
`;
