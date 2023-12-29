import React, { useCallback, useEffect, useState } from 'react'
import { CheckImg2, StyledCheckMainDiv, StyledCheckSubSquDiv } from '../../../common/Check/CheckImg'
import { CheckBox } from '../../../common/Check/Checkbox'
import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../../common/Check/RadioImg'
import { SInput, TxtCheckInput, TxtDropInput, TxtInput } from '../../../common/Input/Input'
import { busIdRegex, idRegex, phoneRegex } from '../../../common/Regex/Regex'
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
  SignUpBtn,
  SignupContainer,
  Title,
  Top,
} from './SignUp.Styled'

import {
  AccountSelect,
  DepositSelect,
  EmailSelect,
  auctionOptions,
  depositOptions,
  emailOptions,
  releaseOptions,
} from '../../../common/Option/SignUp'

import { signup } from '../../../api/auth'
import { Controller, useForm } from 'react-hook-form'
import { CheckWrap, ErrorMsg, RadioContainer } from './style'
import DropField from '../../../components/DropField/DropField'
import axios from 'axios'
import { getBankNames } from '../../../constants/banks'
import AddressFinder from '../../../components/DaumPost/Address'

const SignUp = () => {
  /** React-Hook-Form 추가하기 */
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm({ mode: 'onBlur' })

  /** radioBox -- 어떤 API 사용해서 가져와야 하는지 */
  const radioDummy = ['개인', '법인(주)', '법인(유)']
  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))

  /** checkBox -- 어떤 API 사용해서 가져와야 하는지*/
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

  //modal
  const [modalSwitch, setModalSwitch] = useState(false)

  /**가입하기 grey 버튼 react-hook-form의 isValid로 처리하기 */
  const watchAllFields = watch()
  const [greyBtn, setGreyBtn] = useState(false)

  const [isNext, setIsNext] = useState(false)
  useEffect(() => {
    if (isValid) setIsNext(true)
    else setIsNext(false)
  }, [isValid, watchAllFields])

  //total msg
  const [msg, setMsg] = useState({})

  //total color
  const [txtColor, setTxtColor] = useState('')

  // ID
  const [id, setId] = useState('')
  const [idMsg, setIdMsg] = useState('')
  const [idMsgColor, setIdMsgColor] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const [isFocused, setIsFocused] = useState(false)
  const [idDupleCheck, setIdDupleCheck] = useState(false)

  //Business Number
  const [busId, setBusId] = useState('')
  const [busIdMsg, setBusIdMsg] = useState('')
  const [busIdMsgColor, setBusIdMsgColor] = useState('')

  const [statusColor, setStatusColor] = useState('')

  //이메일 & 도메인
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

  /**  ID 관련 */
  // ID Focus & Blur 스위치
  const handleIdFocus = useCallback(() => {
    setIsFocused(true)
  }, [])
  const handleIdBlur = useCallback(() => {
    setIsFocused(false)
  }, [])

  /** ID 중복 확인 해주는 로직 */
  const checkDuplicateId = async (id) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/main/id/${id}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('ID 중복체크 중 에러 발생:', error)
    }
  }
  const [isDuplicateCheckSuccessful, setIsDuplicateCheckSuccessful] = useState(false)
  const handleDuplicateCheck = async () => {
    const userId = watch('userId')
    const isDuplicate = await checkDuplicateId(userId)
    if (userId.length < 4) {
      setError('userId', {
        type: 'length',
        message: '아이디는 최소 4자 이상이어야 합니다.',
      })
      setTimeout(() => {
        clearErrors('userId')
      }, 2000)
      return
    }
    if (isDuplicate) {
      setError('userId', {
        type: 'duplicate',
        message: '이미 사용 중인 아이디입니다.',
      })
      setIdDupleCheck(false)
      setIdMsgColor('red')
    } else {
      setIdDupleCheck(true)
      setIdMsgColor('blue')
      clearErrors('userId')
      setIsDuplicateCheckSuccessful(true)
      const timer = setTimeout(() => {
        setIsDuplicateCheckSuccessful(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }
  useEffect(() => {
    return () => {
      if (isDuplicateCheckSuccessful) {
        setIsDuplicateCheckSuccessful(false)
      }
    }
  }, [])
  /**  사업자 번호 중복 체크 */
  const checkBusinessId = async (busId) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/main/${busId}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('API 중복체크 중 에러 발생:', error)
    }
  }
  const handleBusIdDupleCheck = async () => {
    const isDuplicate = await checkBusinessId(busId)

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
      setTxtColor('')
    }
  }, [])

  /** 체크박스: 두 개의 체크박스 체크될 시 전체 동의 체크박스 자동 true 처리*/
  const [allChecked, setAllChecked] = useState(false)
  const [privacyChecked, setPrivacyChecked] = useState(false)
  const [termsChecked, setTermsChecked] = useState(false)

  useEffect(() => {
    if (privacyChecked && termsChecked) {
      setAllChecked(true)
    } else {
      setAllChecked(false)
    }
  }, [privacyChecked, termsChecked])

  const handleAllChecked = (e) => {
    const isChecked = e.target.checked
    setAllChecked(isChecked)
    setPrivacyChecked(isChecked)
    setTermsChecked(isChecked)
  }

  const handleSingleCheck = (checkedStateSetter) => (e) => {
    checkedStateSetter(e.target.checked)
  }
  /**  폼 제출 로직 (form태그를 추가해서 진행 및 체크박스,email는 기존  STATE를 활용) */
  const onSignUpSubmit = async (e) => {
    const request = {
      id: 'test3235',
      password: '1234',
      memberTitle: '직함2',
      memberName: '이름2',
      memberEmail: '이메일2',
      memberPhone: '연락처2',
      type: '법인사업자',
      name: '회사명3',
      ceoName: '대표자명2',
      phone: '대표연락처2',
      fax: '팩스번호2',
      address: '주소2',
      addressDetail: '상세주소2',
      businessType: ['유통', '제조'],
      businessNumber: '사업자번호3522',
      bank: '은행2',
      accountNumber: '계좌번호2',
      depositManagerTitle: '입금담당자 직함2',
      depositManagerName: '입금담당자 이름2',
      depositManagerPhone: '입금담당자 연락처2',
      releaseManagerTitle: '출고담당자 직함2',
      releaseManagerName: '출고담당자 이름2',
      releaseManagerPhone: '출고담당자 연락처2',
    }
    const registration = filesData
    const bankBook = secondFilesData
    try {
      const response = await signup(request, registration, bankBook)
      console.log(response)
      alert('회원가입되었습니다!')
    } catch (err) {
      console.log(err)
    }
  }

  /** DropField 유효성 체크하는 부분 */
  const [fileList, setFileList] = useState([])
  const [secondFileList, setSecondFileList] = useState([])

  const [filesData, setFilesData] = useState([])
  const [secondFilesData, setSecondFilesData] = useState([])
  const validFile = (checkFileList) => {
    if (!checkFileList || checkFileList.length === 0) return '파일을 첨부해주세요.'
    else return true
  }

  const handleListChange = (setter, list) => {
    setter(list)
    console.log('리스트', list)
  }
  const password = watch('password')

  const bankList = getBankNames()

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
                    {errors.userId && <ErrorMsg>{errors.userId.message}</ErrorMsg>}
                    {isDuplicateCheckSuccessful && <p style={{ color: '#4CA9FF' }}>사용가능한 아이디입니다.</p>}
                  </Title>

                  <div>
                    <TxtCheckInput
                      type="text"
                      {...register('userId', {
                        required: '아이디를 입력해주세요.',
                        minLength: {
                          value: 4,
                          message: '아이디는 최소 4자 이상이어야 합니다.',
                        },
                      })}
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
                    {errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
                  </Title>
                  <div>
                    <Controller
                      name="password"
                      control={control}
                      rules={{
                        required: '비밀번호를 입력해주세요.',
                        minLength: {
                          value: 8,
                          message: '비밀번호는 최소 8자 이상이어야 합니다.',
                        },
                        maxLength: {
                          value: 12,
                          message: '비밀번호는 최대 12자까지 가능합니다.',
                        },
                        pattern: {
                          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/,
                          message: '영문과 숫자를 조합해주세요.',
                        },
                      }}
                      render={({ field }) => (
                        <TxtInput
                          {...field}
                          placeholder="영문, 숫자 조합 8~12자리"
                          type="password"
                          borderColor={statusColor}
                        />
                      )}
                    />
                  </div>
                </Part>
                <Part>
                  <Title>
                    <h4>비밀번호 확인</h4>
                    {errors.passwordCheck && <ErrorMsg>{errors.passwordCheck.message}</ErrorMsg>}
                  </Title>
                  <div>
                    <Controller
                      name="passwordCheck"
                      control={control}
                      rules={{
                        required: '비밀번호를 확인해주세요.',
                        validate: (value) => value === password || '비밀번호가 일치하지 않습니다.',
                      }}
                      render={({ field }) => (
                        <TxtInput {...field} placeholder="비밀번호 재입력" type="password" borderColor={statusColor} />
                      )}
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
                    {errors.name && <ErrorMsg>{errors.name.message}</ErrorMsg>}
                  </Title>
                  <div>
                    <TxtInput
                      type="text"
                      name="name"
                      onChange={() => {}}
                      {...register('name', { required: '내용을 확인해 주세요.' })}
                    />
                  </div>
                </Part>
                <Part>
                  <Title>
                    <h4>대표자 성명</h4>
                    {errors.ceoName && <ErrorMsg>{errors.ceoName.message}</ErrorMsg>}
                  </Title>

                  <div>
                    <TxtInput
                      type="text"
                      name="ceoName"
                      onChange={() => {}}
                      {...register('ceoName', { required: '내용을 확인해 주세요.' })}
                    />
                  </div>
                </Part>
                <Part>
                  <Title>
                    <h4>대표 연락처</h4>
                    {errors.phone && <ErrorMsg>{errors.phone.message}</ErrorMsg>}
                  </Title>
                  <div>
                    <TxtInput
                      name="phone"
                      onChange={() => {}}
                      placeholder="연락처 입력('-' 제외)"
                      {...register('phone', { required: '올바른 번호가 아닙니다.' })}
                    />
                  </div>
                </Part>
                <Part>
                  <Title>
                    <h4>팩스 번호</h4>
                    {errors.fax && <ErrorMsg>{errors.fax.message}</ErrorMsg>}
                  </Title>

                  <div>
                    <TxtInput
                      type="text"
                      name="fax"
                      onChange={() => {}}
                      placeholder="팩스번호 입력('-' 제외)"
                      {...register('fax', { required: '올바른 번호가 아닙니다.' })}
                    />
                  </div>
                </Part>
                <Part>
                  <Title>
                    <h4>주소</h4>
                    {errors.addressInfo && <ErrorMsg>{errors.addressInfo.message}</ErrorMsg>}
                  </Title>
                  <Controller
                    name="addressInfo"
                    control={control}
                    rules={{ required: '주소를 정확히 입력해주세요.' }}
                    render={({ field }) => (
                      <AddressFinder
                        {...field}
                        borderColor={errors.addressInfo ? 'red' : 'dodgerblue'}
                        onAddressChange={(address, detailAddress, sido, sigungu) => {
                          const newAddressInfo = {
                            address,
                            detailAddress,
                            siDoCode: sido,
                            siGunGuCode: sigungu,
                          }
                          field.onChange(newAddressInfo) // 여기서 field 객체의 onChange 메서드를 사용하여 값을 업데이트합니다.
                        }}
                      />
                    )}
                  />
                </Part>
              </PartBlock>
              <PartBlock>
                <Part>
                  <Title>
                    {/* 직함을 가져올 API 어떤 부분 사용하면 되는지 - 입금, 경매, 출고 */}
                    <h4>입금 담당자 정보</h4>
                    {errors.depositManagerName && <ErrorMsg>{errors.depositManagerName.message}</ErrorMsg>}
                  </Title>
                  <DropWrap>
                    <DepositSelect options={depositOptions} defaultValue={depositOptions[0]} onChange={() => {}} />
                    <TxtDropInput
                      name="depositManagerName"
                      onChange={() => {}}
                      placeholder="담당자 성함 입력"
                      {...register('depositManagerName', { required: '내용을 확인해 주세요.' })}
                    />
                  </DropWrap>
                </Part>
                <Part>
                  <Title>
                    <h4>휴대폰 번호</h4>
                    {errors.depositManagerPhone && <ErrorMsg>{errors.depositManagerPhone.message}</ErrorMsg>}
                  </Title>
                  <TxtInput
                    placeholder="연락처 입력('-' 제외)"
                    name="depositManagerPhone"
                    onChange={phoneHandler}
                    maxLength="11"
                    {...register('depositManagerPhone', { required: '올바른 번호가 아닙니다.' })}
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
                    {errors.memberName && <ErrorMsg>{errors.memberName.message}</ErrorMsg>}
                  </Title>
                  <DropWrap>
                    <DepositSelect options={auctionOptions} defaultValue={auctionOptions[0]} onChange={() => {}} />
                    <TxtDropInput
                      type="text"
                      name="memberName"
                      onChange={() => {}}
                      placeholder="담당자 성함 입력"
                      {...register('memberName', { required: '내용을 확인해 주세요.' })}
                    />
                  </DropWrap>
                </Part>
                <Part>
                  <Title>
                    <h4>이메일</h4>
                    {errors.memberEmail && <ErrorMsg>{errors.memberEmail.message}</ErrorMsg>}
                    {errors.emailDomain && <ErrorMsg>{errors.emailDomain.message}</ErrorMsg>}
                  </Title>
                  <div
                    style={{
                      display: 'flex',
                      lineHeight: '40px',
                      width: '320px',
                    }}
                  >
                    <SInput name="memberEmail" {...register('memberEmail', { required: '내용을 입력해 주세요.' })} />{' '}
                    <p style={{ margin: '0 5px' }}>@</p>
                    <Controller
                      name="emailDomain"
                      control={control}
                      rules={{ required: '도메인을 선택해 주세요.' }}
                      render={({ field }) => (
                        <EmailSelect
                          {...field}
                          options={emailOptions}
                          defaultValue={emailOptions[0]}
                          onChange={(selectedOption) => {
                            setEmailDomain(selectedOption)
                            field.onChange(selectedOption)
                          }}
                        />
                      )}
                    />
                  </div>
                </Part>
                <Part>
                  <Title>
                    <h4>휴대폰 번호</h4>
                    {errors.memberPhone && <ErrorMsg>{errors.memberPhone.message}</ErrorMsg>}
                  </Title>
                  <TxtInput
                    placeholder="연락처 입력('-' 제외)"
                    name="memberPhone"
                    onChange={phoneHandler}
                    maxLength="11"
                    {...register('memberPhone', { required: '올바른 번호가 아닙니다.' })}
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
                    {errors.businessNumber && <ErrorMsg>{errors.businessNumber.message}</ErrorMsg>}
                  </Title>
                  <div style={{ width: '320px' }}>
                    <TxtCheckInput
                      onChange={(e) => {
                        handleBusIdChange(e)
                        // commonChange(e)
                      }}
                      placeholder="사업자 번호 입력('-' 제외)"
                      name="businessNumber"
                      {...register('businessNumber', { required: '올바른 번호가 아닙니다.' })}
                    />
                    <CheckBtn onClick={handleBusIdDupleCheck} type="button">
                      중복 확인
                    </CheckBtn>
                  </div>
                </Part>
                <Part>
                  <Title>
                    <h4>사업자 등록증</h4>
                    {errors.registration && <ErrorMsg>{errors.registration.message}</ErrorMsg>}
                  </Title>
                  <Controller
                    name="registration"
                    control={control}
                    defaultValue={[]}
                    rules={{ validate: () => validFile(fileList) }}
                    render={({ field }) => (
                      <DropField
                        {...field}
                        height="44px"
                        pName={
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <svg width="20" height="30" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                              <g fill="currentColor">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                              </g>
                            </svg>
                            <span>파일첨부</span>
                          </div>
                        }
                        id="registration"
                        htmlFor="registration"
                        fileList={fileList}
                        filesData={filesData}
                        setFilesData={setFilesData}
                        onFileListChange={(reFileList) => {
                          handleListChange(setFileList, reFileList)
                          field.onChange(reFileList)
                          validFile(reFileList)
                        }}
                        error={errors.registration ? true : false}
                      />
                    )}
                  />
                </Part>
                <Part>
                  <Title>
                    <h4>통장 사본</h4>
                    {errors.bankBook && <ErrorMsg>{errors.bankBook.message}</ErrorMsg>}
                  </Title>
                  <Controller
                    name="bankBook"
                    control={control}
                    defaultValue={[]}
                    rules={{ validate: () => validFile(secondFileList) }}
                    render={({ field }) => (
                      <DropField
                        {...field}
                        height="44px"
                        pName={
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <svg width="20" height="30" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                              <g fill="currentColor">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                              </g>
                            </svg>
                            <span>파일첨부</span>
                          </div>
                        }
                        id="bankBook"
                        htmlFor="bankBook"
                        fileList={secondFileList}
                        filesData={secondFilesData}
                        setFilesData={setSecondFilesData}
                        onFileListChange={(reFileList) => {
                          handleListChange(setSecondFileList, reFileList)
                          field.onChange(reFileList)
                          validFile(reFileList)
                        }}
                        error={errors.bizFiles ? true : false}
                      />
                    )}
                  />
                </Part>
                <Part>
                  <Title>
                    <h4>계좌번호</h4>
                    {errors.accountNumber && <ErrorMsg>{errors.accountNumber.message}</ErrorMsg>}
                  </Title>
                  <AccountSelect options={bankList} defaultValue={bankList[0]} />
                  <TxtInput
                    style={{ marginTop: '5px' }}
                    placeholder="계좌번호 입력('-' 제외)"
                    name="accountNumber"
                    {...register('accountNumber', { required: '올바른 번호가 아닙니다.' })}
                  />
                </Part>
              </PartBlock>
              <PartBlock style={{ marginTop: '138px' }}>
                <Part>
                  <Title>
                    <h4>출고 담당자 정보</h4>
                    {errors.releaseManagerName && <ErrorMsg>{errors.releaseManagerName.message}</ErrorMsg>}
                  </Title>
                  <DropWrap>
                    <DepositSelect options={releaseOptions} defaultValue={releaseOptions[0]} onChange={() => {}} />
                    <TxtDropInput
                      name="releaseManagerName"
                      placeholder="담당자 성함 입력"
                      {...register('releaseManagerName', { required: '내용을 확인해 주세요.' })}
                    />
                  </DropWrap>
                </Part>
                <Part>
                  <Title>
                    <h4>휴대폰 번호</h4>
                    {errors.releaseManagerPhone && <ErrorMsg>{errors.releaseManagerPhone.message}</ErrorMsg>}
                  </Title>
                  <TxtInput
                    placeholder="연락처 입력('-' 제외)"
                    name="releaseManagerPhone"
                    onChange={phoneHandler}
                    maxLength="11"
                    {...register('releaseManagerPhone', { required: '올바른 번호가 아닙니다.' })}
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
                <input type="checkbox" checked={allChecked} onChange={handleAllChecked} />
                <h4>전체 동의합니다</h4>
              </div>
              <div>
                <input type="checkbox" checked={privacyChecked} onChange={handleSingleCheck(setPrivacyChecked)} />
                <p>
                  개인정보 활용에 동의 <span>(필수)</span>
                </p>
                <a>약관 보기</a>
              </div>
              <div>
                <input type="checkbox" checked={termsChecked} onChange={handleSingleCheck(setTermsChecked)} />
                <p>
                  이용약관 동의 <span>(필수)</span>
                </p>
                <a style={{ marginLeft: '55px' }}>약관 보기</a>
              </div>
            </BottomItem>
            {isNext ? <SignUpBtn isNext={true}>가입하기</SignUpBtn> : <SignUpBtn isNext={false}>가입하기</SignUpBtn>}
          </Bottom>
        </form>
      </SignupContainer>
    </Container>
  )
}

export default SignUp
