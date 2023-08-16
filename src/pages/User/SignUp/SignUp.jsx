import React, { useCallback, useState, useEffect, useContext } from 'react';
import { HeadFootLeftSwitch } from '../../../Router';
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
  Title,
} from './SignUp.Styled';
import {
  TxtInput,
  TxtCheckInput,
  TxtDropInput,
  SInput,
} from '../../../common/Input/Input';
import {
  idRegex,
  pwRegex,
  busIdRegex,
  phoneRegex,
} from '../../../common/Regex/Regex';
import DaumPostcode from 'react-daum-postcode';
import Select from 'react-select';
import {
  StyledCheckMainDiv,
  StyledCheckSubSquDiv,
  StyledCheckSubDiv,
  CheckImg,
  CheckImg2,
} from '../../../common/Check/CheckImg';
import { CheckBox } from '../../../common/Check/Checkbox';
import {
  RadioCircleDiv,
  RadioInnerCircleDiv,
  RadioMainDiv,
} from '../../../common/Check/RadioImg';
import {
  ModalOverlay,
  ModalSubContainer,
  ModalRadioWrap,
  ModalCloseBtn,
  ModalContainer,
} from '../../../modal/Common/Common.Styled';

import SignUpPost from '../../../modal/SignUp/SignUpPost';

import {
  depositOptions,
  auctionOptions,
  emailOptions,
  releaseOptions,
  accountOptions,
  DepositSelect,
  EmailSelect,
  AccountSelect,
} from '../../../common/Option/SignUp';

import LoginModal from '../../../modal/Login/LoginModal';

import { useAtom } from 'jotai';

import {
  headerAtom,
  accordionAtom,
  subHeaderAtom,
} from '../../../store/Layout/Layout';
import { Height } from '@mui/icons-material';

const SignUp = () => {
  const [showHeader, setShowHeader] = useAtom(headerAtom);
  const [showAccordion, setShowAccordion] = useAtom(accordionAtom);
  const [showSubHeader, setShowSubHeader] = useAtom(subHeaderAtom);
  setShowHeader(false);
  setShowAccordion(false);
  setShowSubHeader(false);
  //radioBox
  const radioDummy = ['개인', '법인(주)', '법인(유)'];
  const [checkRadio, setCheckRadio] = useState(
    Array.from({ length: radioDummy.length }, () => false)
  );
  const [savedRadioValue, setSavedRadioValue] = useState('');

  useEffect(() => {
    const checkedIndex = checkRadio.findIndex(
      (isChecked, index) => isChecked && index < radioDummy.length
    );
    if (checkedIndex !== -1) {
      const selectedValue = radioDummy[checkedIndex];
      setSavedRadioValue(selectedValue);
      setInput({ ...input, type: selectedValue });
    }
  }, [checkRadio]);

  //checkBox
  const checkDummy = ['유통', '제조'];
  const [check, setCheck] = useState(
    Array.from({ length: checkDummy.length }, () => false)
  );
  const [checkData, setCheckData] = useState(
    Array.from({ length: checkDummy.length }, () => '')
  );

  useEffect(() => {
    const updatedCheck = checkDummy.map((value, index) => {
      return check[index] ? value : '';
    });
    // 그냥 배열에 담을 때
    const filteredCheck = updatedCheck.filter(item => item !== '');
    setCheckData(filteredCheck);

    // 전송용 input에 담을 때
    setInput({
      ...input,
      businessType: updatedCheck.filter(item => item !== ''),
    });
  }, [check]);

  const dummy = {
    userId: ['test1', 'wkdqaz'],
    busId: ['1234512345'],
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

  //Phone Number
  //deposit
  //account
  //release

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

  //이메일 & 도메인
  const [emailFirst, setEmailFirst] = useState('');
  const [emailDomain, setEmailDomain] = useState('');

  console.log('check', check);
  useEffect(() => {
    const checkIndex = check.findIndex(
      (isChecked, index) => isChecked && index < checkDummy.length
    );

    console.log('checkIndex', checkIndex);
    if (checkIndex !== -1) {
      const selectedValue = checkDummy[checkIndex];

      console.log('selectedValue', selectedValue);
    }
  }, [check]);

  const handleSelectChange = (selectedOption, name) => {
    setInput(prevState => ({
      ...prevState,
      [name]: selectedOption.label,
    }));
  };

  const emailHandler = useCallback(e => {
    const value = e.target.value;
    setEmailFirst(value);
  });

  useEffect(() => {
    if (emailFirst && emailDomain) {
      setInput({ ...input, email: emailFirst + '@' + emailDomain });
    }
  }, [emailFirst, emailDomain]);

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
  }, []);

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
      setInput({ ...input, businessNumber: busId });
      setTimeout(() => {
        setBusIdMsg('');
      }, 3000);
    }
  };

  /// 휴대폰 번호 (경매 / 입금 / 출고)
  const phoneHandler = useCallback(
    e => {
      const { name, value } = e.target;
      const isValid = phoneRegex.test(value);
      if (!isValid) {
        setMsg({ ...msg, [name]: '10 ~ 11자리의 숫자를 입력해주세요.' });
        setTxtColor('red');
      } else if (isValid) {
        setMsg({ ...msg, [name]: '' });
        setInput({ ...input, [name]: value });
        setTxtColor('');
      }
    },
    [input]
  );

  //회사 명, 대표자 성명, 대표 연락처, 팩스 번호, 휴대폰 번호, 계좌 번호 ... 등 그 외 handler
  const commonHandler = useCallback(
    e => {
      const { name, value } = e.target;
      setInput({ ...input, [name]: value });
    },
    [input]
  );

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

                  <CheckBtn onClick={handleDuplicateCheck} type="button">
                    중복 확인
                  </CheckBtn>
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
                <RadioContainer>
                  {radioDummy.map((text, index) => (
                    <RadioMainDiv key={index}>
                      <RadioCircleDiv
                        isChecked={checkRadio[index]}
                        onClick={() => {
                          setCheckRadio(
                            CheckBox(checkRadio, checkRadio.length, index)
                          );
                        }}
                      >
                        <RadioInnerCircleDiv />
                      </RadioCircleDiv>
                      <div style={{ display: 'flex', marginLeft: '3px' }}>
                        <p>{text}</p>
                      </div>
                    </RadioMainDiv>
                  ))}
                </RadioContainer>
              </Part>
              <Part>
                <Title>
                  <h4>회사 명</h4>
                  <p></p>
                </Title>
                <div>
                  <TxtInput
                    type="text"
                    name="customerName"
                    value={input.customerName}
                    onChange={commonHandler}
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
                    onChange={commonHandler}
                  />
                </div>
              </Part>
              <Part>
                <Title>
                  <h4>대표 연락처</h4>
                  <p></p>
                </Title>
                <div>
                  <TxtInput
                    name="customerPhone"
                    value={input.customerPhone}
                    onChange={commonHandler}
                    placeholder="연락처 입력('-' 제외)"
                  />
                </div>
              </Part>
              <Part>
                <Title>
                  <h4>팩스 번호</h4>
                  <p></p>
                </Title>

                <div>
                  <TxtInput
                    type="text"
                    name="fax"
                    value={input.fax}
                    onChange={commonHandler}
                    placeholder="팩스번호 입력('-' 제외)"
                  />
                </div>
              </Part>
              <Part>
                <Title>
                  <h4>주소</h4>
                  <p></p>
                </Title>
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
                    style={{ marginTop: '5px' }}
                  />
                </div>
              </Part>
              {modalIsOpen && (
                <SignUpPost
                  postCheck={postCheck}
                  directCheck={directCheck}
                  postFind={postFind}
                  address={address}
                  daumPostHandleBtn={daumPostHandleBtn}
                  detailAddress={detailAddress}
                  detailAddressHandler={detailAddressHandler}
                  comfirmPost={comfirmPost}
                  closeModal={closeModal}
                  isDaumPostOpen={isDaumPostOpen}
                  daumPosthandleClose={daumPosthandleClose}
                />
              )}
            </PartBlock>
            <PartBlock>
              <Part>
                <Title>
                  <h4>입금 담당자 정보</h4>
                  <p></p>
                </Title>
                <DropWrap>
                  <DepositSelect
                    options={depositOptions}
                    defaultValue={depositOptions[0]}
                    onChange={selectedOption =>
                      handleSelectChange(selectedOption, 'depositManagerTitle')
                    }
                  />
                  <TxtDropInput
                    name="depositManagerName"
                    value={input.depositManagerName}
                    onChange={commonHandler}
                    placeholder="담당자 성함 입력"
                  />
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
                  maxLength="11"
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
                  <p></p>
                </Title>
                <DropWrap>
                  <DepositSelect
                    options={auctionOptions}
                    defaultValue={auctionOptions[0]}
                    onChange={selectedOption =>
                      handleSelectChange(selectedOption, 'title')
                    }
                  />
                  <TxtDropInput
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={commonHandler}
                    placeholder="담당자 성함 입력"
                  />
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
                  <SInput onChange={emailHandler} />{' '}
                  <p style={{ margin: '0 5px' }}>@</p>
                  <EmailSelect
                    options={emailOptions}
                    defaultValue={emailOptions[0]}
                    onChange={selectedOption => {
                      setEmailDomain(selectedOption.label);
                    }}
                  />
                  {console.log('emailDomain', emailDomain)}
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
                  maxLength="11"
                />
              </Part>
            </PartBlock>
            <PartBlock>
              <Part>
                <h4>업태 선택</h4>
                <CheckWrap>
                  {checkDummy.map((x, index) => (
                    <StyledCheckMainDiv>
                      <StyledCheckSubSquDiv
                        onClick={() =>
                          setCheck(CheckBox(check, check.length, index, true))
                        }
                        isChecked={check[index]}
                      >
                        <CheckImg2 src="/svg/check.svg" />
                      </StyledCheckSubSquDiv>
                      <p>{x}</p>
                    </StyledCheckMainDiv>
                  ))}
                </CheckWrap>
              </Part>
              <Part>
                <Title>
                  <h4>사업자 번호</h4>
                  <p style={{ color: busIdMsgColor }}>{busIdMsg}</p>
                  {console.log('busIdMsg', busIdMsg)}
                </Title>
                <div style={{ width: '320px' }}>
                  <TxtCheckInput
                    onChange={handleBusIdChange}
                    placeholder="사업자 번호 입력('-' 제외)"
                  />
                  <CheckBtn onClick={handleBusIdDupleCheck}>중복 확인</CheckBtn>
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
                  name="accountNumber"
                  value={input.accountNumber}
                  onChange={commonHandler}
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
                  <TxtDropInput
                    name="releaseManagerName"
                    value={input.releaseManagerName}
                    onChange={commonHandler}
                    placeholder="담당자 성함 입력"
                  />
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
                  maxLength="11"
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

const CheckWrap = styled.div`
  margin-top: 10px;
  width: 320px;
  display: flex;
  gap: 50px;

  p {
    font-size: 18px;
    line-height: 15px;
    margin-top: 1px;
  }
`;

export const RadioContainer = styled.div`
  width: 320px;
  display: flex;
  gap: 50px;
  margin-left: 5px;
  margin-top: 10px;
`;
