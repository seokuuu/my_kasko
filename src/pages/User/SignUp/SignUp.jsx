import React, { useCallback, useState, useEffect, useContext } from 'react'
import { HeadFootLeftSwitch } from '../../../Router'
import styled, { createGlobalStyle } from 'styled-components'
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
} from './SignUp.Styled'
import { TxtInput, TxtCheckInput, TxtDropInput, SInput } from '../../../common/Input/Input'
import { idRegex, pwRegex, busIdRegex, phoneRegex } from '../../../common/Regex/Regex'
import DaumPostcode from 'react-daum-postcode'
import Select from 'react-select'
import {
  StyledCheckMainDiv,
  StyledCheckSubSquDiv,
  StyledCheckSubDiv,
  CheckImg,
  CheckImg2,
} from '../../../common/Check/CheckImg'
import { CheckBox } from '../../../common/Check/Checkbox'
import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../../common/Check/RadioImg'
import {
  ModalOverlay,
  ModalSubContainer,
  ModalRadioWrap,
  ModalCloseBtn,
  ModalContainer,
} from '../../../modal/Common/Common.Styled'

import SignUpPost from '../../../modal/SignUp/SignUpPost'

import {
  depositOptions,
  auctionOptions,
  emailOptions,
  releaseOptions,
  accountOptions,
  DepositSelect,
  EmailSelect,
  AccountSelect,
} from '../../../common/Option/SignUp'

import LoginModal from '../../../modal/Login/LoginModal'

import { useAtom } from 'jotai'

import { headerAtom, accordionAtom, subHeaderAtom } from '../../../store/Layout/Layout'
import { Height } from '@mui/icons-material'
import { useValidation } from '../../../hooks/useValidation'
import { signup } from '../../../api/auth'
import axios from 'axios'

const SignUp = () => {
  const [showHeader, setShowHeader] = useAtom(headerAtom)
  const [showAccordion, setShowAccordion] = useAtom(accordionAtom)
  const [showSubHeader, setShowSubHeader] = useAtom(subHeaderAtom)
  setShowHeader(false)
  setShowAccordion(false)
  setShowSubHeader(false)
  //radioBox
  const radioDummy = ['개인', '법인(주)', '법인(유)']
  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, () => false))
  const [savedRadioValue, setSavedRadioValue] = useState('')

  useEffect(() => {
    const checkedIndex = checkRadio.findIndex((isChecked, index) => isChecked && index < radioDummy.length)
    if (checkedIndex !== -1) {
      const selectedValue = radioDummy[checkedIndex]
      setSavedRadioValue(selectedValue)
      setInput({ ...input, type: selectedValue })
      console.log(input)
    }
  }, [checkRadio])

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

    // 전송용 input에 담을 때
    setInput({
      ...input,
      businessType: updatedCheck.filter((item) => item !== ''),
    })
    console.log(input)
  }, [check])

  const dummy = {
    userId: ['test1', 'wkdqaz'],
    busId: ['1234512345'],
  }

  //modal
  const [modalIsOpen, setModalIsOpen] = useState(false)

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
    setInput({ ...input, address: '', addressDetail: '' })
  }

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
    setAddress('')
    setDetailAddress('')
    setInput({ ...input, address: '', addressDetail: '' })
  }

  const comfirmPost = () => {
    setModalIsOpen(false)
    setInput({ ...input, address: address, addressDetail: detailAddress })
  }

  // 가입하기 grey 버튼
  const [greyBtn, setGreyBtn] = useState(false)

  useEffect(() => {
    if (input.value === '') {
      console.log('빈값이 있숩니다')
    }
  }, [greyBtn])
  //daum post code
  const [isDaumPostOpen, setIsDaumPostOpen] = useState(false)

  const [address, setAddress] = useState('')
  const [detailAddress, setDetailAddress] = useState('')

  const daumPostHandleBtn = () => {
    setIsDaumPostOpen(true)
  }

  const daumPostHandleComplete = (data) => {
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

  const isPwValid = pwRegex.test(pw)
  const [pwFocused, setPwFocused] = useState(false)

  // PW Duple
  const [pwDuple, setPwDuple] = useState('')
  const [pwDupMsg, setDupMsg] = useState('')
  const [pwDupleFocused, setDuplePwFocused] = useState(false)

  // Company
  const [company, setCompany] = useState('')
  const [companyFocused, setCompanyFocused] = useState(false)
  const [companyMsg, setCompanyMsg] = useState('')

  // Represent
  const [rep, setRep] = useState('')
  const [repFocused, setRepFocused] = useState(false)
  const [repMsg, setRepMsg] = useState('')

  //Business Number
  const [busId, setBusId] = useState('')
  const [busIdMsg, setBusIdMsg] = useState('')
  const [busIdMsgColor, setBusIdMsgColor] = useState('')

  const busIdValid = busIdRegex.test(busId)

  //Phone Number
  //deposit
  //account
  //release

  const init = {
    id: '',
    password: '',
    memberTitle: '',
    memberName: '',
    memberEmail: '',
    memberPhone: '',
    type: '',
    name: '',
    ceoName: '',
    phone: '',
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
  }

  //total input
  const [input, setInput] = useState(init)

  /// Common ///
  //Color
  const [statusColor, setStatusColor] = useState('')

  // option

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

  const handleSelectChange = (selectedOption, name) => {
    console.log(name)
    setInput((prevState) => ({
      ...prevState,
      name: selectedOption.label,
    }))
  }

  const emailHandler = useCallback((e) => {
    const value = e.target.value
    setEmailFirst(value)
  })

  useEffect(() => {
    if (emailFirst && emailDomain) {
      setInput({ ...input, email: emailFirst + '@' + emailDomain })
    }
  }, [emailFirst, emailDomain])

  // ID 관련
  // ID Focus & Blur 스위치
  const handleIdFocus = useCallback(() => {
    setIsFocused(true)
  }, [])
  const handleIdBlur = useCallback(() => {
    setIsFocused(false)
  }, [])

  // ID event 및 정규식 체크
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

  // ID 중복 확인
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
      setInput({ ...input, id: id })
      // console.log(input)
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
      setInput({ ...input, password: pw })
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
      setInput({ ...input, businessNumber: busId })
      setTimeout(() => {
        setBusIdMsg('')
      }, 3000)
    }
  }

  /// 휴대폰 번호 (경매 / 입금 / 출고)
  const phoneHandler = useCallback(
    (e) => {
      const { name, value } = e.target
      const isValid = phoneRegex.test(value)
      if (!isValid) {
        setMsg({ ...msg, [name]: '10 ~ 11자리의 숫자를 입력해주세요.' })
        setTxtColor('red')
      } else if (isValid) {
        setMsg({ ...msg, [name]: '' })
        setInput({ ...input, [name]: value })
        // console.log(input)
        setTxtColor('')
      }
    },
    [input],
  )

  //회사 명, 대표자 성명, 대표 연락처, 팩스 번호, 휴대폰 번호, 계좌 번호 ... 등 그 외 handler
  const commonHandler = useCallback(
    (e) => {
      const { name, value } = e.target
      setInput({ ...input, [name]: value })
    },
    [input],
  )

  // const checkSubmitWithSchema = {
  //   id: 'customerName',
  //   password: 'password',
  //   //경매 담당자
  //   memberTitle: '', //input
  //   memberName: 'depositManagerName',
  //   memberEmail: '', //input
  //   memberPhone: 'depositPhoneNum',
  //   type: '', //input
  //   name: 'customerName',
  //   ceoName: 'ceoName',
  //   phone: 'customerPhone',
  //   fax: 'fax',
  //   address: '', //input
  //   addressDetail: 'address',
  //   businessType: [''], //input
  //   businessNumber: 'businessNumber',
  //   bank: 'businessBankAddress',
  //   accountNumber: 'accountNumber',
  //   depositManagerTitle: '', //input
  //   depositManagerName: 'depositManagerName',
  //   depositManagerPhone: 'depositPhoneNum',
  //   releaseManagerTitle: '', //input
  //   releaseManagerName: 'releaseManagerName',
  //   releaseManagerPhone: 'releasePhoneNum',
  //
  const test = {
    id: 'test2',
    password: '1234',
    memberTitle: '직함2',
    memberName: '이름2',
    memberEmail: '이메일2',
    memberPhone: '연락처2',
    type: '법인사업자',
    name: '회사명2',
    ceoName: '대표자명2',
    phone: '대표연락처2',
    fax: '팩스번호2',
    address: '주소2',
    addressDetail: '상세주소2',
    businessType: ['유통', '제조'],
    businessNumber: '사업자번호2',
    bank: '은행2',
    accountNumber: '계좌번호2',
    depositManagerTitle: '입금담당자 직함2',
    depositManagerName: '입금담당자 이름2',
    depositManagerPhone: '입금담당자 연락처2',
    releaseManagerTitle: '출고담당자 직함2',
    releaseManagerName: '출고담당자 이름2',
    releaseManagerPhone: '출고담당자 연락처2',
  }

  // 폼 제출 로직 (form태그를 추가해서 진행 및 체크박스,email는 기존 input STATE를 활용)
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      console.log('input', input)
      const data = input
      const response = await signup({ data })
      console.log(response.data)
    },
    [input],
  )

  // 예외처리 - useValidation으로 조건문 관리
  const [inputObj, setInputObj] = useState({ name: '', text: '' })
  const [inputObj2, setInputObj2] = useState({ name: '', text: '' })
  const [inputObj3, setInputObj3] = useState({ name: '', text: '' })
  const [inputObj4, setInputObj4] = useState({ name: '', text: '' })
  const [inputObj5, setInputObj5] = useState({ name: '', text: '' })
  const [inputObj6, setInputObj6] = useState({ name: '', text: '' })
  const [inputObj7, setInputObj7] = useState({ name: '', text: '' })
  const [inputObj8, setInputObj8] = useState({ name: '', text: '' })
  const [inputObj9, setInputObj9] = useState({ name: '', text: '' })
  const [inputObj10, setInputObj10] = useState({ name: '', text: '' })
  const [inputObj11, setInputObj11] = useState({ name: '', text: '' })
  const [inputObj12, setInputObj12] = useState({ name: '', text: '' })

  const commonChange = (e) => {
    const { name, value } = e.target
    const file = e.target.files ? e.target.files : null

    if (name === 'name') {
      setInputObj({ name: name, text: value })
    }
    if (name === 'ceoName') {
      setInputObj2({ name: name, text: value })
    }
    if (name === 'phone') {
      setInputObj3({ name: name, text: value })
    }
    if (name === 'fax') {
      setInputObj4({ name: name, text: value })
    }
    if (name === 'addressDetail') {
      setInputObj5({ name: name, text: value })
    }
    if (name === 'depositManagerName') {
      setInputObj6({ name: name, text: value })
    }
    if (name === 'memberName') {
      setInputObj7({ name: name, text: value })
    }
    if (name === 'memberEmail') {
      setInputObj8({ name: name, text: value })
    }
    if (name === 'businessfile' && file) {
      setInputObj9({ name: name, text: value })
    }
    if (name === 'businessBankAddress' && file) {
      setInputObj10({ name: name, text: value })
    }
    if (name === 'accountNumber') {
      setInputObj11({ name: name, text: value })
    }
    if (name === 'releaseManagerName') {
      setInputObj12({ name: name, text: value })
    }
    setInput({ ...input, [name]: value }) //***submit form***
    // businessfile, businessBankAddress는 file Object 일단 주석처리 하였음
  }

  const customerNameValidate = useValidation(inputObj)
  const ceoNameValidate = useValidation(inputObj2)
  const customerPhoneValidate = useValidation(inputObj3)
  const faxValidate = useValidation(inputObj4)
  const addressValidate = useValidation(inputObj5)
  const depositManagerNameValidate = useValidation(inputObj6)
  const depositManagerValidate = useValidation(inputObj7)
  const depositManagerEmailValidate = useValidation(inputObj8)
  const businessfileValidate = useValidation(inputObj9)
  const businessBankAddressValidate = useValidation(inputObj10)
  const accountNumberValidate = useValidation(inputObj11)
  const releaseManagerNameValidate = useValidation(inputObj12)

  return (
    <Container>
      <SignupContainer>
        <form onSubmit={handleSubmit}>
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
                    <p style={{ color: 'red' }}>{customerNameValidate || ''}</p>
                    <p></p>
                  </Title>
                  <div>
                    {/* <TxtInput type="text" name="customerName" value={input.customerName} onChange={commonHandler} /> */}
                    <TxtInput type="text" name="name" value={inputObj.value} onChange={commonChange} />
                  </div>
                </Part>
                <Part>
                  <Title>
                    <h4>대표자 성명</h4>
                    <p style={{ color: 'red' }}>{ceoNameValidate || ''}</p>
                  </Title>

                  <div>
                    {/* <TxtInput type="text" name="ceoName" value={input.ceoName} onChange={commonHandler} /> */}
                    <TxtInput type="text" name="ceoName" value={inputObj.value} onChange={commonChange} />
                  </div>
                </Part>
                <Part>
                  <Title>
                    <h4>대표 연락처</h4>
                    <p style={{ color: 'red' }}>{customerPhoneValidate || ''}</p>
                  </Title>
                  <div>
                    <TxtInput
                      name="phone"
                      value={inputObj.customerPhone}
                      onChange={commonChange}
                      placeholder="연락처 입력('-' 제외)"
                    />
                  </div>
                </Part>
                <Part>
                  <Title>
                    <h4>팩스 번호</h4>
                    <p style={{ color: 'red' }}>{faxValidate || ''}</p>
                  </Title>

                  <div>
                    <TxtInput
                      type="text"
                      name="fax"
                      value={inputObj.fax}
                      onChange={commonChange}
                      placeholder="팩스번호 입력('-' 제외)"
                    />
                  </div>
                </Part>
                <Part>
                  <Title>
                    <h4>주소</h4>
                    <p style={{ color: 'red' }}>{addressValidate || ''}</p>
                  </Title>
                  <div>
                    <TxtCheckInput type="text" value={address} placeholder="찾기 버튼 클릭" readOnly />
                    <CheckBtn style={{ backgroundColor: 'black', color: 'white' }} onClick={openModal}>
                      찾기
                    </CheckBtn>
                    <TxtInput
                      placeholder="상세 주소를 입력해 주세요."
                      name="addressDetail"
                      // value={detailAddress}
                      value={inputObj.address}
                      style={{ marginTop: '5px' }}
                      onChange={commonChange}
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
                    <p style={{ color: 'red' }}>{depositManagerNameValidate || ''}</p>
                  </Title>
                  <DropWrap>
                    <DepositSelect
                      options={depositOptions}
                      defaultValue={depositOptions[0]}
                      onChange={(selectedOption) => handleSelectChange(selectedOption, 'depositManagerTitle')}
                    />
                    <TxtDropInput
                      name="depositManagerName"
                      value={inputObj.depositManagerName}
                      onChange={commonChange}
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
                    <p style={{ color: 'red' }}>{depositManagerValidate || ''}</p>
                  </Title>
                  <DropWrap>
                    <DepositSelect
                      options={auctionOptions}
                      defaultValue={auctionOptions[0]}
                      onChange={(selectedOption) => handleSelectChange(selectedOption, 'memberTitle')}
                    />
                    <TxtDropInput
                      type="text"
                      name="memberName"
                      value={inputObj.depositManagerName}
                      onChange={commonChange}
                      placeholder="담당자 성함 입력"
                    />
                  </DropWrap>
                </Part>
                <Part>
                  <Title>
                    <h4>이메일</h4>
                    <p style={{ color: 'red' }}>{depositManagerEmailValidate || ''}</p>
                  </Title>
                  <div
                    style={{
                      display: 'flex',
                      lineHeight: '40px',
                      width: '320px',
                    }}
                  >
                    <SInput
                      onChange={(e) => {
                        emailHandler(e)
                        commonChange(e)
                      }}
                      name="memberEmail"
                    />{' '}
                    <p style={{ margin: '0 5px' }}>@</p>
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
                    <p style={{ color: txtColor }}>{msg.actionPhoneNum}</p>
                  </Title>
                  <TxtInput
                    placeholder="연락처 입력('-' 제외)"
                    name="memberPhone"
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
                    <CheckBtn onClick={handleBusIdDupleCheck}>중복 확인</CheckBtn>
                  </div>
                </Part>
                <Part>
                  <h4>사업자 등록증</h4>
                  <p style={{ color: 'red' }}>{businessfileValidate || ''}</p>
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
                      onChange={commonChange}
                      // name="businessfile"
                    ></input>
                  </TxtDiv>
                </Part>
                <Part>
                  <h4>통장 사본</h4>
                  <p style={{ color: 'red' }}>{businessBankAddressValidate || ''}</p>
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
                      onChange={commonChange}
                      // name="businessBankAddress"
                    ></input>
                  </TxtDiv>
                </Part>
                <Part>
                  <Title>
                    <h4>계좌번호</h4>
                    <p style={{ color: 'red' }}>{accountNumberValidate || ''}</p>
                  </Title>
                  <AccountSelect
                    options={accountOptions}
                    defaultValue={accountOptions[0]}
                    onChange={(selectedOption) => handleSelectChange(selectedOption, 'bank')}
                  />
                  <TxtInput
                    style={{ marginTop: '5px' }}
                    placeholder="(계좌번호 입력('-' 제외)"
                    name="accountNumber"
                    value={inputObj.accountNumber}
                    onChange={commonChange}
                  />
                </Part>
              </PartBlock>
              <PartBlock style={{ marginTop: '138px' }}>
                <Part>
                  <Title>
                    <h4>출고 담당자 정보</h4>
                    <p style={{ color: 'red' }}>{releaseManagerNameValidate || ''}</p>
                  </Title>
                  <DropWrap>
                    <DepositSelect
                      options={releaseOptions}
                      defaultValue={releaseOptions[0]}
                      onChange={(selectedOption) => handleSelectChange(selectedOption, 'releaseManagerTitle ')}
                    />
                    <TxtDropInput
                      name="releaseManagerName"
                      value={inputObj.releaseManagerName}
                      onChange={commonChange}
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
              {/* {console.log('input =>', input)} */}
            </BottomItem>
          </Bottom>
        </form>
      </SignupContainer>
    </Container>
  )
}

export default SignUp

const ModalTitle = styled.h2`
  color: black;
`

const ModalContent = styled.p`
  color: black;
`

const CloseButton = styled.button`
  background-color: black;
  color: white;
`

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
`

export const RadioContainer = styled.div`
  width: 320px;
  display: flex;
  gap: 50px;
  margin-left: 5px;
  margin-top: 10px;
`
