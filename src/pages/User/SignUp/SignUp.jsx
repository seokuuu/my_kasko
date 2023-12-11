import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { CheckImg2, StyledCheckMainDiv, StyledCheckSubSquDiv } from '../../../common/Check/CheckImg'
import { CheckBox } from '../../../common/Check/Checkbox'
import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../../common/Check/RadioImg'
import { SInput, TxtCheckInput, TxtDropInput, TxtInput } from '../../../common/Input/Input'
import { busIdRegex, idRegex, phoneRegex, pwRegex } from '../../../common/Regex/Regex'
import {
  Bottom,
  BottomItem,
  BottomP,
  CheckBtn,
  Container,
  DropWrap,
  Left,
  Main,
  Part,
  PartBlock,
  Right,
  SignupContainer,
  Title,
  Top,
  TxtDiv,
} from './SignUp.Styled'

import SignUpPost from '../../../modal/SignUp/SignUpPost'

import {
  AccountSelect,
  DepositSelect,
  EmailSelect,
  accountOptions,
  auctionOptions,
  depositOptions,
  emailOptions,
  releaseOptions,
} from '../../../common/Option/SignUp'

import { useAtom } from 'jotai'

import { signup } from '../../../api/auth'
import { useValidation } from '../../../hooks/useValidation'
import { accordionAtom, headerAtom, subHeaderAtom } from '../../../store/Layout/Layout'
import { useForm } from 'react-hook-form'
import { CheckWrap, RadioContainer } from './style'

const SignUp = () => {
  /** React-Hook-Form 추가하기 */
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    trigger,
    control,
    formState: { errors, isValid },
  } = useForm({ mode: 'onBlue' })

  const [showHeader, setShowHeader] = useAtom(headerAtom)
  const [showAccordion, setShowAccordion] = useAtom(accordionAtom)
  const [showSubHeader, setShowSubHeader] = useAtom(subHeaderAtom)
  setShowHeader(false)
  setShowAccordion(false)
  setShowSubHeader(false)
  //radioBox
  const radioDummy = ['개인', '법인(주)', '법인(유)']
  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))
  const [savedRadioValue, setSavedRadioValue] = useState('')

  //checkBox
  const checkDummy = ['유통', '제조']
  const [check, setCheck] = useState(Array.from({ length: checkDummy.length }, () => false))
  const [checkData, setCheckData] = useState(Array.from({ length: checkDummy.length }, () => ''))

  useEffect(() => {
    const updatedCheck = checkDummy.map((value, index) => {
      return check[index] ? value : ''
    })
    // 그냥 배열에 담을 때
    const filteredCheck = updatedCheck.filter((item) => item !== '')
    setCheckData(filteredCheck)

    console.log()
  }, [check])

  const dummy = {
    userId: ['test1', 'wkdqaz'],
    busId: ['1234512345'],
  }

  //modal
  const [modalSwitch, setModalSwitch] = useState(false)

  //post
  const [postFind, setPostFind] = useState(false)

  // console.log('postFind', postFind)

  const postCheck = () => {
    setPostFind(false)
  }

  const directCheck = () => {
    setPostFind(true)
    setAddress('')
    setDetailAddress('')
  }

  const openModal = () => {
    setModalSwitch(true)
  }

  const closeModal = () => {
    setModalSwitch(false)
    setAddress('')
    setDetailAddress('')
  }

  const comfirmPost = () => {
    setModalSwitch(false)
  }

  /**가입하기 grey 버튼 react-hook-form의 isValid로 처리하기 */
  const watchAllFields = watch()
  const [greyBtn, setGreyBtn] = useState(false)

  useEffect(() => {
    if (!isValid) {
      console.log('빈값이 있습니다')
    }
  }, [isValid, watchAllFields])

  /** Daum post code - 우편코드 */
  const [isDaumPostOpen, setIsDaumPostOpen] = useState(false)

  const [address, setAddress] = useState('')
  const [detailAddress, setDetailAddress] = useState('')

  const daumPostHandleBtn = () => {
    setIsDaumPostOpen(true)
  }

  const daumPostHandleComplete = (data) => {
    console.log('data =>', data)
    const { address } = data
    setAddress(address)
    setIsDaumPostOpen(false)
  }

  const daumPosthandleClose = () => {
    setIsDaumPostOpen(false)
  }

  const detailAddressHandler = (e) => {
    const value = e.target.value
    setDetailAddress(value)
  }
  /** Daum post code */

  //total msg
  const [msg, setMsg] = useState({})

  //total color
  const [txtColor, setTxtColor] = useState('')
  // console.log('msg !!!', msg)

  // ID
  const [id, setId] = useState('')
  const [idMsg, setIdMsg] = useState('')
  const [idMsgColor, setIdMsgColor] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const isIdValid = idRegex.test(id)
  const [isFocused, setIsFocused] = useState(false)
  const [idDupleCheck, setIdDupleCheck] = useState(false)

  // PW
  const [pw, setPw] = useState('')
  const [pwMsg, setPwMsg] = useState('')
  const [pwMsgColor, setPwMsgColor] = useState('')

  const [pwFocused, setPwFocused] = useState(false)

  // PW Duple
  const [pwDuple, setPwDuple] = useState('')
  const [pwDupMsg, setDupMsg] = useState('')
  const [pwDupleFocused, setDuplePwFocused] = useState(false)

  //Business Number
  const [busId, setBusId] = useState('')
  const [busIdMsg, setBusIdMsg] = useState('')
  const [busIdMsgColor, setBusIdMsgColor] = useState('')

  const [statusColor, setStatusColor] = useState('')

  //이메일 & 도메인
  const [emailFirst, setEmailFirst] = useState('')
  const [emailDomain, setEmailDomain] = useState('')

  // console.log('check', check)
  useEffect(() => {
    const checkIndex = check.findIndex((isChecked, index) => isChecked && index < checkDummy.length)

    console.log('checkIndex', checkIndex)
    if (checkIndex !== -1) {
      const selectedValue = checkDummy[checkIndex]

      console.log('selectedValue', selectedValue)
    }
  }, [check])

  const emailHandler = useCallback((e) => {
    const value = e.target.value
    setEmailFirst(value)
  })

  /**  ID 관련 */
  // ID Focus & Blur 스위치
  const handleIdFocus = useCallback(() => {
    setIsFocused(true)
  }, [])
  const handleIdBlur = useCallback(() => {
    setIsFocused(false)
  }, [])

  // ID event 및 정규식 체크 -- idRegex.test(value)
  const handleIdChange = useCallback(
    (e) => {
      const value = e.target.value
      setId(value)
      const isValid = idRegex.test(value) // 입력된 값의 유효성 검사
      if (!isValid) {
        setIdMsgColor('red')
        setIdMsg('4~12자리 소문자와 숫자 조합으로 입력해주세요.')
      } else if (isValid && !idDupleCheck) {
        setIdMsgColor('red')
        setIdMsg('중복 확인이 필요해요.')
      } else if (isValid && idDupleCheck) {
        setIdMsg('')
      }
    },
    [idDupleCheck],
  )

  /** ID 중복 확인 해주는 로직 - Api 호출에서 중복되는지 확인해야함 작업 필요 dummy 안됨  */
  const handleDuplicateCheck = () => {
    const isDuplicate = dummy.userId.includes(id)
    if (isDuplicate) {
      setIdDupleCheck(false)
      setIdMsgColor('red')
      setIdMsg('이미 사용중인 아이디 입니다.')
    } else {
      setIdDupleCheck(true)
      setIdMsgColor('blue')
      setIdMsg('사용 가능한 아이디입니다.')
      // console.log()
      setTimeout(() => {
        setIdMsg('')
      }, 3000)
      //  +++ 여기에 중복체크 상태와 data에 아이디도 넣기 +++
    }
  }

  /// PW 관련

  // PW 핸들러
  const handlePwChange = useCallback(
    (e) => {
      const value = e.target.value
      setPw(value)
      const pwValid = pwRegex.test(value) // 입력된 값의 유효성 검사
      if (pwFocused && !pw && !pwValid) {
        setPwMsgColor('red')
        setPwMsg('4~12자리 소문자와 숫자 조합으로 입력해주세요.')
      } else if (pwFocused && pwValid) {
        setPwMsg('')
      }
    },
    [pwFocused],
  )

  //
  const handlePwDupleCheck = useCallback((e) => {
    const value = e.target.value
    setPwDuple(value)
  }, [])
  useEffect(() => {
    const dupleValid = pw === pwDuple
    console.log('dupleValid', dupleValid)
    if (pwDupleFocused && pwDuple && !dupleValid) {
      setDupMsg('비밀번호가 일치하지 않습니다')
      setStatusColor('red')
    } else if (pwDupleFocused && dupleValid) {
      setDupMsg('')
    }
  }, [pw, pwDuple, pwDupleFocused])

  // 사업자 번호 handler
  const handleBusIdChange = useCallback((e) => {
    const value = e.target.value
    setBusId(value)
    // console.log(value)
    const isValid = busIdRegex.test(value)
    if (!isValid) {
      setBusIdMsgColor('red')
      setBusIdMsg('10자리의 숫자를 입력해주세요.')
    } else if (isValid && !idDupleCheck) {
      setBusIdMsgColor('red')
      setBusIdMsg('중복 확인이 필요해요.')
    } else if (isValid && idDupleCheck) {
      setIdMsg('')
    }
  }, [])

  // 사업자 번호 중복 체크
  const handleBusIdDupleCheck = () => {
    const isDuplicate = dummy.busId.includes(busId)

    console.log('isDuplicate', isDuplicate)
    if (busId && isDuplicate) {
      setBusIdMsgColor('red')
      setBusIdMsg('이미 등록된 사업자 번호입니다.')
    } else if (busId && !isDuplicate) {
      setBusIdMsgColor('blue')
      setBusIdMsg('사용 가능한 사업자 번호입니다.')
      setTimeout(() => {
        setBusIdMsg('')
      }, 3000)
    }
  }

  /**  휴대폰 번호 (경매 / 입금 / 출고) */
  const phoneHandler = useCallback((e) => {
    const { name, value } = e.target
    const isValid = phoneRegex.test(value)
    if (!isValid) {
      setMsg({ ...msg, [name]: '10 ~ 11자리의 숫자를 입력해주세요.' })
      setTxtColor('red')
    } else if (isValid) {
      setMsg({ ...msg, [name]: '' })
      // console.log()
      setTxtColor('')
    }
  }, [])

  //회사 명, 대표자 성명, 대표 연락처, 팩스 번호, 휴대폰 번호, 계좌 번호 ... 등 그 외 handler
  const commonHandler = useCallback((e) => {
    const { name, value } = e.target
  }, [])

  // 폼 제출 로직 (form태그를 추가해서 진행 및 체크박스,email는 기존  STATE를 활용)
  const onSignUpSubmit = async (e) => {
    const allKeysHaveValue = Object.keys().every((key) => {
      return null
    })

    if (allKeysHaveValue) console.log('✅모든 작성 완료')
    try {
      const response = await signup()
      console.log(response)
      alert('회원가입되었습니다!')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Container>
      <SignupContainer>
        <form onSubmit={handleSubmit(onSignUpSubmit)}>
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
                      name="password"
                      onFocus={() => {
                        setPwFocused(true)
                      }}
                      onBlur={() => {
                        setPwFocused(false)
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
                        setDuplePwFocused(true)
                      }}
                      onBlur={() => {
                        setDuplePwFocused(false)
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
                            setCheckRadio(CheckBox(checkRadio, checkRadio.length, index))
                          }}
                        >
                          <RadioInnerCircleDiv isChecked={checkRadio[index]} />
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
                    {/* <TxtInput type="text" name="customerName" value={input.customerName} onChange={commonHandler} /> */}
                    <TxtInput type="text" name="name" value="회사명" onChange={() => {}} />
                  </div>
                </Part>
                <Part>
                  <Title>
                    <h4>대표자 성명</h4>
                  </Title>

                  <div>
                    {/* <TxtInput type="text" name="ceoName" value={input.ceoName} onChange={commonHandler} /> */}
                    <TxtInput type="text" name="ceoName" value="대표자 이름" onChange={() => {}} />
                  </div>
                </Part>
                <Part>
                  <Title>
                    <h4>대표 연락처</h4>
                  </Title>
                  <div>
                    <TxtInput
                      name="phone"
                      value="휴대폰"
                      onChange={() => {}}
                      placeholder="연락처 입력('-' 제외)"
                      {...register('phone', { required: '* 내용을 확인해 주세요.' })}
                    />
                  </div>
                </Part>
                <Part>
                  <Title>
                    <h4>팩스 번호</h4>
                  </Title>

                  <div>
                    <TxtInput
                      type="text"
                      name="fax"
                      value="팩스번호"
                      onChange={() => {}}
                      placeholder="팩스번호 입력('-' 제외)"
                    />
                  </div>
                </Part>
                <Part>
                  <Title>
                    <h4>주소</h4>
                  </Title>
                  <div style={{ width: '320px' }}>
                    <TxtCheckInput type="text" value={address} placeholder="찾기 버튼 클릭" readOnly />
                    <CheckBtn style={{ backgroundColor: 'black', color: 'white' }} onClick={openModal} type="button">
                      찾기
                    </CheckBtn>
                    <TxtInput
                      placeholder="상세 주소를 입력해 주세요."
                      name="addressDetail"
                      value={detailAddress}
                      style={{ marginTop: '5px' }}
                      onChange={() => {}}
                    />
                  </div>
                </Part>
                {modalSwitch && (
                  <SignUpPost
                    postCheck={postCheck}
                    directCheck={directCheck}
                    postFind={postFind}
                    address={address}
                    daumPostHandleBtn={daumPostHandleBtn}
                    detailAddress={detailAddress}
                    setDetailAddress={setDetailAddress}
                    detailAddressHandler={detailAddressHandler}
                    comfirmPost={comfirmPost}
                    closeModal={closeModal}
                    isDaumPostOpen={isDaumPostOpen}
                    daumPosthandleClose={daumPosthandleClose}
                    daumPostHandleComplete={daumPostHandleComplete}
                  />
                )}
              </PartBlock>
              <PartBlock>
                <Part>
                  <Title>
                    <h4>입금 담당자 정보</h4>
                  </Title>
                  <DropWrap>
                    <DepositSelect options={depositOptions} defaultValue={depositOptions[0]} onChange={() => {}} />
                    <TxtDropInput
                      name="depositManagerName"
                      value="depositManagerName"
                      onChange={() => {}}
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
                    name="depositManagerPhone"
                    // name="depositPhoneNum"
                    value="depositManagerPhone"
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
                  </Title>
                  <DropWrap>
                    <DepositSelect options={auctionOptions} defaultValue={auctionOptions[0]} onChange={() => {}} />
                    <TxtDropInput
                      type="text"
                      name="memberName"
                      value="memberName"
                      onChange={() => {}}
                      placeholder="담당자 성함 입력"
                    />
                  </DropWrap>
                </Part>
                <Part>
                  <Title>
                    <h4>이메일</h4>
                  </Title>
                  <div
                    style={{
                      display: 'flex',
                      lineHeight: '40px',
                      width: '320px',
                    }}
                  >
                    <SInput onChange={() => {}} name="memberEmail" /> <p style={{ margin: '0 5px' }}>@</p>
                    <EmailSelect
                      options={emailOptions}
                      defaultValue={emailOptions[0]}
                      onChange={(selectedOption) => {
                        setEmailDomain(selectedOption.label)
                      }}
                    />
                    {/* {console.log('emailDomain', emailDomain)} */}
                  </div>
                </Part>
                <Part>
                  <Title>
                    <h4>휴대폰 번호</h4>
                  </Title>
                  <TxtInput
                    placeholder="연락처 입력('-' 제외)"
                    name="memberPhone"
                    value="memberPhone"
                    onChange={phoneHandler}
                    maxLength="11"
                  />
                </Part>
              </PartBlock>
              <PartBlock>
                <Part>
                  <h4>업체 선택</h4>
                  <CheckWrap>
                    {checkDummy.map((x, index) => (
                      <StyledCheckMainDiv key={index}>
                        <StyledCheckSubSquDiv
                          onClick={() => setCheck(CheckBox(check, check.length, index, true))}
                          isChecked={check[index]}
                          name="businessChoice"
                        >
                          <CheckImg2 src="/svg/check.svg" isChecked={check[index]} />
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
                  </Title>
                  <div style={{ width: '320px' }}>
                    <TxtCheckInput
                      onChange={(e) => {
                        handleBusIdChange(e)
                        // commonChange(e)
                      }}
                      placeholder="사업자 번호 입력('-' 제외)"
                      name="businessNumber"
                    />
                    <CheckBtn onClick={handleBusIdDupleCheck} type="button">
                      중복 확인
                    </CheckBtn>
                  </div>
                </Part>
                <Part>
                  <h4>사업자 등록증</h4>
                  <TxtDiv>
                    <label htmlFor="ex_file">
                      <div className="btnStart">
                        <img src="/svg/Upload.svg" alt="btnStart" />
                        <p htmlFor="ex_file">파일 첨부</p>
                      </div>
                    </label>
                    {/* <img src="/svg/Upload.svg" alt="Upload" /> */}
                    <input
                      id="ex_file"
                      type="file"
                      accept="image/jpg, image/png, image/jpeg"
                      style={{ display: 'none' }}
                      onChange={() => {}}
                      name="businessfile"
                    ></input>
                  </TxtDiv>
                </Part>
                <Part>
                  <h4>통장 사본</h4>
                  <TxtDiv>
                    <label htmlFor="ex_file2">
                      <div className="btnStart">
                        <img src="/svg/Upload.svg" alt="btnStart" />
                        <p htmlFor="ex_file2">파일 첨부</p>
                      </div>
                    </label>
                    {/* <img src="/svg/Upload.svg" alt="Upload" /> */}
                    <input
                      id="ex_file2"
                      type="file"
                      accept="image/jpg, image/png, image/jpeg"
                      style={{ display: 'none' }}
                      onChange={() => {}}
                      name="businessBankAddress"
                    ></input>
                  </TxtDiv>
                </Part>
                <Part>
                  <Title>
                    <h4>계좌번호</h4>
                  </Title>
                  <AccountSelect options={accountOptions} defaultValue={accountOptions[0]} onChange={() => {}} />
                  <TxtInput
                    style={{ marginTop: '5px' }}
                    placeholder="(계좌번호 입력('-' 제외)"
                    name="accountNumber"
                    value="accountNumber"
                    onChange={() => {}}
                  />
                </Part>
              </PartBlock>
              <PartBlock style={{ marginTop: '138px' }}>
                <Part>
                  <Title>
                    <h4>출고 담당자 정보</h4>
                  </Title>
                  <DropWrap>
                    <DepositSelect options={releaseOptions} defaultValue={releaseOptions[0]} onChange={() => {}} />
                    <TxtDropInput
                      name="releaseManagerName"
                      value="releaseManagerName"
                      onChange={() => {}}
                      placeholder="담당자 성함 입력"
                    />
                  </DropWrap>
                </Part>
                <Part>
                  <Title>
                    <h4>휴대폰 번호</h4>
                  </Title>
                  <TxtInput
                    placeholder="연락처 입력('-' 제외)"
                    name="releaseManagerPhone"
                    value="releaseManagerPhone"
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
                type="submit"
                onClick={() => {
                  setGreyBtn(true)
                }}
              >
                가입하기
              </button>
            </BottomItem>
          </Bottom>
        </form>
      </SignupContainer>
    </Container>
  )
}

export default SignUp
