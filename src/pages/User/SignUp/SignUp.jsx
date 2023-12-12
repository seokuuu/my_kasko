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
import { accordionAtom, headerAtom, subHeaderAtom } from '../../../store/Layout/Layout'
import { Controller, useForm } from 'react-hook-form'
import { CheckWrap, ErrorMsg, RadioContainer } from './style'
import DropField from '../../../components/DropField/DropField'

const SignUp = () => {
  /** React-Hook-Form 추가하기 */
  const {
    register,
    handleSubmit,
    getValues,
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

  /** Daum post code - 주소 입력하는 부분 */
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

  // ID
  const [id, setId] = useState('')
  const [idMsg, setIdMsg] = useState('')
  const [idMsgColor, setIdMsgColor] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const isIdValid = idRegex.test(id)
  const [isFocused, setIsFocused] = useState(false)
  const [idDupleCheck, setIdDupleCheck] = useState(false)

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
  /**  사업자 번호 중복 체크 -- Api처리 필요 */
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
    try {
      const response = await signup()
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

  const validFile = (checkFileList) => {
    if (!checkFileList || checkFileList.length === 0) return '파일을 첨부해주세요.'
    else return true
  }

  const handleListChange = (setter, list) => {
    setter(list)
    console.log('리스트', list)
  }
  const password = watch('password')
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
                        required: '비밀번호 확인을 입력해주세요.',
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
                  </Title>
                  <div style={{ width: '320px' }}>
                    <TxtCheckInput type="text" value={address} placeholder="찾기 버튼 클릭" readOnly />
                    <CheckBtn style={{ backgroundColor: 'black', color: 'white' }} onClick={openModal} type="button">
                      찾기
                    </CheckBtn>
                    <Controller
                      name="addressDetail"
                      control={control}
                      value={detailAddress}
                      rules={{ required: '상세 주소를 입력해 주세요.' }} // 필수 입력 필드로 설정
                      render={({ field }) => (
                        <TxtInput
                          placeholder="상세 주소를 입력해 주세요."
                          style={{ marginTop: '5px' }}
                          value={detailAddress}
                        />
                      )}
                    />
                    {errors.addressDetail && <ErrorMsg>{errors.addressDetail.message}</ErrorMsg>}
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
                    {errors.bizFiles && <ErrorMsg>{errors.bizFiles.message}</ErrorMsg>}
                  </Title>
                  <Controller
                    name="bizFiles"
                    control={control}
                    defaultValue={[]}
                    rules={{ validate: () => validFile(fileList) }}
                    render={({ field }) => (
                      <DropField
                        {...field}
                        height="48px"
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
                        id="bizFiles"
                        htmlFor="bizFiles"
                        fileList={fileList}
                        filesData={filesData}
                        setFilesData={setFilesData}
                        onFileListChange={(reFileList) => {
                          handleListChange(setFileList, reFileList)
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
                    <h4>통장 사본</h4>
                    {errors.bankBook && <ErrorMsg>{errors.bankBook.message}</ErrorMsg>}
                  </Title>
                  <Controller
                    name="bankBook"
                    control={control}
                    defaultValue={[]}
                    rules={{ validate: () => validFile(fileList) }}
                    render={({ field }) => (
                      <DropField
                        {...field}
                        height="48px"
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
                        fileList={fileList}
                        filesData={filesData}
                        setFilesData={setFilesData}
                        onFileListChange={(reFileList) => {
                          handleListChange(setFileList, reFileList)
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
                  <AccountSelect options={accountOptions} defaultValue={accountOptions[0]} onChange={() => {}} />
                  <TxtInput
                    style={{ marginTop: '5px' }}
                    placeholder="(계좌번호 입력('-' 제외)"
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
            <BottomItem>
              <button type="onSubmit">가입하기</button>
            </BottomItem>
          </Bottom>
        </form>
      </SignupContainer>
    </Container>
  )
}

export default SignUp
