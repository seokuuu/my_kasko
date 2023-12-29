import { useEffect, useState } from 'react'
import { CustomInput, FlexInput } from '../../../common/Input/Input'
import {
  AddBtn,
  Bar,
  FlexContent,
  FlexPart,
  FlexTitle,
  Left,
  OnePageFlexSubContainer,
  Right,
} from '../../../common/OnePage/OnePage.Styled'
import { AccountSelect, EditSelect, accountOptions, depositOptions } from '../../../common/Option/SignUp'

import { BlackBtn, BtnWrap } from '../../../common/Button/Button'

import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../../common/Check/RadioImg'

import { CheckBox } from '../../../common/Check/Checkbox'
import { CheckBtn } from '../../User/SignUp/SignUp.Styled'

import { styled } from 'styled-components'
import { checkBusinessNumber, updateCustomer } from '../../../api/myPage'
import { getCustomerDetail, get_userDetail, resetCustomer } from '../../../api/userManage'
import { CheckImg2, StyledCheckMainDiv, StyledCheckSubSquDiv } from '../../../common/Check/CheckImg'
import useReactQuery from '../../../hooks/useReactQuery'
import { WhiteCloseBtn } from '../../../modal/Common/Common.Styled'
import SignUpPost from '../../../modal/SignUp/SignUpPost'
import { GreyDiv, IncomeImgDiv } from '../../../userpages/UserMyPage/Profile/Profile'
import DownloadButton from '../../../utils/DownloadButton'
import { UserCheckDiv } from '../UserManage/UserPost'

const init = {
  id: '',
  password: '',
  memberTitle: '',
  memberName: '',
  memberEmail: '',
  memberPhone: '',
  type: '', //(법인사업자 / 개인사업자)
  name: '',
  ceoName: '',
  phone: '',
  fax: '',
  addressDetail: '',
  businessType: [], // (유통 / 제조)
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

// id: 아이디
// password: 비밀번호
// memberTitle: 직함
// memberName: 이름
// memberEmail: 이메일
// memberPhone: 연락처
// type: 사업자 구분 (법인사업자 / 개인사업자)
// name: 회사명
// ceoName: 대표자명
// phone: 대표연락처
// fax: 팩스번호
// address: 주소
// addressDetail: 상세주소2
// businessType: 업태 목록 (유통 / 제조)
// businessNumber: 사업자번호
// bank: 은행
// accountNumber: 계좌번호
// depositManagerTitle: 입금담당자 직함
// depositManagerName: 입금담당자 이름
// depositManagerPhone: 입금담당자 연락처
// releaseManagerTitle: 출고담당자 직함
// releaseManagerName: 출고담당자 이름
// releaseManagerPhone: 출고담당자 연락처

const UserEdit = ({ setEditModal, uidAtom }) => {
  const [selectSwitch, setSelectSwitch] = useState({
    A: false,
    deposit: false,
    release: false,
  })
  const [modalSwitch, setModalSwitch] = useState(false)
  const [input, setInput] = useState(init)
  console.log('input', input)
  const [isUser, setIsUser] = useState(false)
  const [shouldUpdateCustomer, setShouldUpdateCustomer] = useState(false)
  const [renderFileName, setRenderFileName] = useState({ businessNumberFile: '', bankbookFile: ' ' })
  const [checkFileName, setCheckFileName] = useState({ deleteBusinessNumberFile: '', deleteBankbookFile: '' })
  const [fileForms, setFileForms] = useState({ registration: '', bankBook: '' })
  const [businessNumber, setBusinessNumber] = useState('')
  const [dropdownNames, setDropdownNames] = useState({
    depositManagerTitle: '',
    releaseManagerTitle: '',
    bank: '',
  })

  // TODO : 중복체크 response 없음
  // const { isError, isSuccess, data } = useReactQuery('getCustomerPrivacy', {}, getCustomerPrivacy)

  // get 상세

  console.log('uidAtom', uidAtom)
  const { isError, isSuccess, data } = useReactQuery(uidAtom, 'getUserDetail', get_userDetail)

  const [user, setUser] = useState('')
  const resData = data?.data?.data

  console.log('resData', resData)

  // const resData2 = data2?.data?.data

  // console.log('resData2', resData2)

  const checkBusiness = () => {
    try {
      checkBusinessNumber(businessNumber)
      console.log('done')
    } catch (err) {
      console.log(err)
    }

    // if (isBusinessNumberSuccess) {
    //   alert('확인되셨습니다.')
    // }
    // if (isBusinessNumberError) {
    //   alert('중복되었습니다.')
    // }
  }
  const handleCheck = (e) => {
    setBusinessNumber(e.target.value)
    console.log(businessNumber)
  }

  if (isError) console.log('ERROR')

  useEffect(() => {
    if (isSuccess) {
      setUser(resData)
      setAddress(resData?.address)
      setDetailAddress(resData?.addressDetail)
      setDropdownNames({
        ...dropdownNames,
        bank: resData?.bank,
        depositManagerTitle: resData?.depositManagerTitle,
        releaseManagerTitle: resData?.releaseManagerTitle,
      })
      setRenderFileName({
        ...renderFileName,
        businessNumberFile: resData?.businessNumberOriginalName,
        bankbookFile: resData?.bankbookOriginalName,
      })

      const userCustomerTypeIndex = radioDummy.indexOf(resData?.type)

      if (userCustomerTypeIndex !== -1) {
        // 일치하는 값이 있다면 해당 인덱스의 checkRadio를 true로 설정
        const newCheckRadio = Array.from({ length: radioDummy.length }, (_, index) => index === userCustomerTypeIndex)
        setCheckRadio(newCheckRadio)
      }

      const newCheck = check.map((_, index) => resData?.businessType?.includes(checkDummy[index]))
      setCheck(newCheck)
    }
  }, [isSuccess, resData])

  // const handleFiles = (e) => {
  //   const name = e.target.name
  //   const file = e.target.files[0]
  //   const fileName = e.target.files[0].name
  //   if (checkFileName.hasOwnProperty(name)) {
  //     setCheckFileName((prev) => ({
  //       ...prev,
  //       [name]: fileName,
  //     }))
  //     if (name === 'businessNumberFile') {
  //       setFileForms((prev) => ({
  //         ...prev,
  //         registration: file,
  //       }))
  //     }
  //     if (name === 'bankbookFile') {
  //       setFileForms((prev) => ({
  //         ...prev,
  //         bankBook: file,
  //       }))
  //     }
  //   }
  // }

  const handleSelectChange = (selectedOption, name) => {
    // const isCheck = selectedOption.label
    // if (isCheck === '직함 선택') return

    setInput((prevState) => ({
      ...prevState,
      [name]: selectedOption.label,
    }))
  }

  // checked,file 빼고 submit하기 (checkbox는 따로 useState로 하였음)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const checkboxType = ['bank', 'depositManagerTitle', 'releaseManagerTitle']
    const fileType = ['deleteBusinessNumberFile', 'deleteBankbookFile']
    const formData = new FormData(e.target)
    const updatedInput = { ...input }

    formData.forEach((value, key) => {
      if (input.hasOwnProperty(key) && value && !checkboxType.includes(key) && !fileType.includes(key)) {
        updatedInput[key] = value
      }
    })

    for (let i in updatedInput) {
      if (updatedInput.hasOwnProperty(i)) {
        console.log(`Input 체크 안되었습니다 ***${i}***`)
        // return
      }
    }

    setInput({ ...input, ...updatedInput, ...checkFileName })
    console.log('input <3', input)
    console.log('updatedInput <3', updatedInput)
    console.log('checkFileName <3', checkFileName)
    setShouldUpdateCustomer(true)
  }

  //TODO: 파일 추가 후에 왜 test1만 바뀌는지
  useEffect(() => {
    const updateCustomerData = async () => {
      if (shouldUpdateCustomer) {
        try {
          const response = await updateCustomer(input, fileForms)
          console.log(response.data)
          alert('고객사 상세 정보가 수정되었습니다.')
        } catch (err) {
          console.log(err)
          alert('ERROR:', err.data)
        }
        setShouldUpdateCustomer(false)
      }
    }
    updateCustomerData()
  }, [shouldUpdateCustomer])
  // -------------------------------------------------------------------------------
  const [postFind, setPostFind] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [address, setAddress] = useState('')
  const [detailAddress, setDetailAddress] = useState('')
  const [isDaumPostOpen, setIsDaumPostOpen] = useState(false)
  const postCheck = () => {
    setPostFind(false)
  }

  const directCheck = () => {
    setPostFind(true)
    setAddress('')
    setDetailAddress('')
    setInput({ ...input, address: '', addressDetail: '' })
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

  const openModal = () => {
    setModalIsOpen(true)
  }
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
  const radioDummy = ['법인사업자', '개인사업자']
  const radioDummy2 = ['승인', '대기', '미승인']
  const radioDummy3 = ['경매 시작가 제한', '경매 제한']
  const radioDummy4 = ['창고', '운송사', '현대제철', '카스코철강', '고객사']
  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, () => false))
  const [checkRadio2, setCheckRadio2] = useState(Array.from({ length: radioDummy2.length }, () => false))
  const [checkRadio3, setCheckRadio3] = useState(Array.from({ length: radioDummy3.length }, () => false))
  const [checkRadio4, setCheckRadio4] = useState(Array.from({ length: radioDummy4.length }, () => false))

  const [savedRadioValue, setSavedRadioValue] = useState('')

  console.log('checkRadio2', checkRadio2)
  useEffect(() => {
    const checkedIndex = checkRadio.findIndex((isChecked, index) => isChecked && index < radioDummy.length)
    if (checkedIndex !== -1) {
      const selectedValue = radioDummy[checkedIndex]
      setSavedRadioValue(selectedValue)
      setInput({ ...input, type: selectedValue })
    }
  }, [checkRadio])

  const checkDummy2 = ['재고관리', '경매관리', '상시판매', '주문관리', '판매제품 관리', '출고관리', '운영관리']

  const checkDummy = ['유통', '제조']

  const [check, setCheck] = useState(Array.from({ length: checkDummy.length }, () => false))
  const [check2, setCheck2] = useState(Array.from({ length: checkDummy2.length }, () => false))
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
  }, [check])

  console.log('ㅋㅋㅋ')

  // 비밀번호 초기화 버튼
  const resetPw = async () => {
    const userConfirmed = window.confirm('비밀번호를 초기화하시겠습니까?')
    const req = {
      id: input.id,
    }
    if (userConfirmed) {
      try {
        const response = await resetCustomer(req)
        if (response) {
          setInput((prev) => ({ ...prev, password: response.data.data }))
          alert(`비밀번호가 초기화되었습니다. 비밀번호 : ${response.data.data}`)
        }
      } catch (err) {
        console.error(err)
        alert(`Error : ${err.data.message}`)
      }
    } else {
      // alert('비밀번호 초기화가 취소되었습니다.')
    }
  }

  const handleSubmitForm = (e) => {
    const value = e.target.value
    const name = e.target.name
    setInput((prev) => ({ ...prev, [name]: value }))
    console.log(input)
  }

  const modalOFF = () => {
    setEditModal(false)
  }

  return (
    <div>
      <ModalOverlayC />
      <ModalContainerC width={1350}>
        {/* <ModalSubContainer> */}
        {/* <OnePageFlexContainerC> */}
        <MainTitleC style={{ fontSize: '18px' }}>
          <div>고객사 상세 정보</div>

          <WhiteCloseBtn onClick={modalOFF} src="/svg/white_btn_close.svg" />
        </MainTitleC>
        <form onSubmit={handleSubmit}>
          <ModalContainerSubC width={1400}>
            {' '}
            <OnePageFlexSubContainer>
              <Left>
                <h1>회원정보</h1>
                <Bar />

                <FlexPart>
                  <FlexTitle>
                    아이디<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    <FlexInput name={init.id} value={user && user.id} />
                  </FlexContent>
                </FlexPart>

                <FlexPart>
                  <FlexTitle>
                    비밀번호 초기화<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    <FlexInputBtn type="password" onClick={resetPw}>
                      비밀번호 초기화
                    </FlexInputBtn>
                  </FlexContent>
                </FlexPart>
                <FlexPart>
                  <FlexTitle>
                    경매 담당자 정보<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    <CustomInput
                      name="memberTitle"
                      placeholder="직함 입력"
                      width={130}
                      defaultValue={user && user.memberTitle}
                    />
                    <CustomInput
                      name="memberName"
                      placeholder=" 성함 입력"
                      width={188}
                      style={{ marginLeft: '5px' }}
                      defaultValue={user && user.memberName}
                    />
                  </FlexContent>
                </FlexPart>

                <FlexPart>
                  <FlexTitle>
                    이메일<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    <FlexInput name="memberEmail" defaultValue={(user && user.memberEmail) || ''} />
                  </FlexContent>
                </FlexPart>

                <FlexPart>
                  <FlexTitle>
                    휴대폰 번호<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    <FlexInput name="memberPhone" defaultValue={user && user.memberPhone} />
                  </FlexContent>
                </FlexPart>
                <FlexPart>
                  <FlexTitle>
                    승인 여부<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    <div
                      style={{
                        display: 'flex',
                        gap: '60px',
                      }}
                    >
                      {radioDummy2.map((text, index) => (
                        <RadioMainDiv key={index}>
                          <RadioCircleDiv
                            name="type"
                            isChecked={checkRadio2[index]}
                            onClick={() => {
                              setCheckRadio2(CheckBox(checkRadio2, checkRadio2.length, index))
                            }}
                          >
                            <RadioInnerCircleDiv isChecked={checkRadio2[index]} />
                          </RadioCircleDiv>
                          <div style={{ display: 'flex', paddingLeft: '5px' }}>{text}</div>
                        </RadioMainDiv>
                      ))}
                    </div>
                  </FlexContent>
                </FlexPart>
                <FlexPart>
                  <FlexTitle>
                    회원 제한<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    <div
                      style={{
                        display: 'flex',
                        gap: '80px',
                        width: '100%',
                      }}
                    >
                      {radioDummy3.map((text, index) => (
                        <RadioMainDiv key={index}>
                          <RadioCircleDiv
                            name="type"
                            isChecked={checkRadio3[index]}
                            onClick={() => {
                              setCheckRadio3(CheckBox(checkRadio3, checkRadio3.length, index))
                            }}
                          >
                            <RadioInnerCircleDiv isChecked={checkRadio3[index]} />
                          </RadioCircleDiv>
                          <div style={{ display: 'flex', marginLeft: '5px' }}>{text}</div>
                        </RadioMainDiv>
                      ))}
                    </div>
                  </FlexContent>
                </FlexPart>
                <FlexPart>
                  <FlexTitle>
                    사용자 구분<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    <div
                      style={{
                        display: 'flex',
                        gap: '20px',
                        minWidth: '450px',
                      }}
                    >
                      {radioDummy4.map((text, index) => (
                        <RadioMainDiv key={index}>
                          <RadioCircleDiv
                            name="type"
                            isChecked={checkRadio4[index]}
                            onClick={() => {
                              setCheckRadio4(CheckBox(checkRadio4, checkRadio4.length, index))
                            }}
                          >
                            <RadioInnerCircleDiv isChecked={checkRadio4[index]} />
                          </RadioCircleDiv>
                          <div style={{ display: 'flex', marginLeft: '5px' }}>{text}</div>
                        </RadioMainDiv>
                      ))}
                    </div>
                  </FlexContent>
                </FlexPart>
                <FlexPart>
                  <FlexTitle>
                    창고 구분<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    <EditSelect
                      name="storage"
                      options={depositOptions}
                      defaultValue={depositOptions[0]}
                      onChange={(selectedOption) => handleSelectChange(selectedOption, 'storage')}
                    />
                  </FlexContent>
                </FlexPart>
                <FlexPart>
                  <FlexTitle style={{ minWidth: '170px' }}>권한 설정</FlexTitle>
                  <FlexContent2>
                    {checkDummy2.map((x, index) => (
                      <UserCheckDiv style={{ width: '130px' }}>
                        <StyledCheckSubSquDiv
                          onClick={() => setCheck(CheckBox(check, check.length, index, true))}
                          isChecked={check[index]}
                        >
                          <CheckImg2 src="/svg/check.svg" isChecked={check[index]} />
                        </StyledCheckSubSquDiv>
                        <CheckTxt2 style={{ marginLeft: '5px' }}>{x}</CheckTxt2>
                      </UserCheckDiv>
                    ))}
                  </FlexContent2>
                </FlexPart>
                <Bar />

                <FlexPart>
                  <FlexTitle>
                    입금 담당자 정보<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    {selectSwitch.deposit ? (
                      <EditSelect
                        name="depositManagerTitle"
                        options={depositOptions}
                        defaultValue={depositOptions[0]}
                        onChange={(selectedOption) => handleSelectChange(selectedOption, 'depositManagerTitle')}
                      />
                    ) : (
                      <GreyDiv
                        onClick={() => {
                          setSelectSwitch((prev) => ({
                            ...prev,
                            deposit: !prev.deposit,
                          }))
                        }}
                      >
                        {user && user.depositManagerTitle}
                      </GreyDiv>
                    )}

                    <CustomInput
                      name="depositManagerName"
                      placeholder="담당자 성함 입력"
                      width={190}
                      defaultValue={user && user.depositManagerName}
                    />
                  </FlexContent>
                </FlexPart>

                <FlexPart>
                  <FlexTitle>
                    휴대폰 번호<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    <FlexInput
                      name="depositManagerPhone"
                      placeholder="연락처 입력 ('-' 제외)"
                      defaultValue={user && user.depositManagerPhone}
                    />
                  </FlexContent>
                </FlexPart>

                <FlexPart>
                  <FlexTitle>
                    출고 담당자 정보<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    {selectSwitch.release ? (
                      <EditSelect
                        name="releaseManagerTitle"
                        options={depositOptions}
                        defaultValue={depositOptions[0]}
                        onChange={(selectedOption) => handleSelectChange(selectedOption, 'releaseManagerTitle')}
                      />
                    ) : (
                      <GreyDiv
                        onClick={() => {
                          setSelectSwitch((prev) => ({
                            ...prev,
                            release: !prev.release,
                          }))
                        }}
                      >
                        {user && user.releaseManagerTitle}
                      </GreyDiv>
                    )}

                    <CustomInput
                      name="releaseManagerName"
                      placeholder=" 담당자 성함 입력"
                      width={190}
                      defaultValue={user && user.releaseManagerName}
                    />
                  </FlexContent>
                </FlexPart>

                <FlexPart>
                  <FlexTitle>
                    휴대폰 번호<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    <FlexInput
                      name="releaseManagerPhone"
                      placeholder="연락처 입력 ('-' 제외)"
                      defaultValue={user && user.releaseManagerPhone}
                    />
                  </FlexContent>
                </FlexPart>

                {/* <FlexPart>
                  <FlexTitle>담당자 추가</FlexTitle>
                  <FlexContent>
                    <AddBtn>추가하기</AddBtn>
                  </FlexContent>
                </FlexPart> */}
                <FlexPart>
                  {/* <FlexContent>
                  <FlexInput name="releaseManagerPhone" placeholder="연락처 입력 ('-' 제외)" />
                </FlexContent> */}
                </FlexPart>
              </Left>
              {/* -------------------------------------------------------------- */}
              <Right>
                <h1>비즈니스 정보</h1>
                <Bar />
                <FlexPart>
                  <FlexTitle>
                    사업자 구분<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    <div
                      style={{
                        display: 'flex',
                        gap: '80px',
                        width: '100%',
                      }}
                    >
                      {radioDummy.map((text, index) => (
                        <RadioMainDiv key={index}>
                          <RadioCircleDiv
                            name="type"
                            isChecked={checkRadio[index]}
                            onClick={() => {
                              setCheckRadio(CheckBox(checkRadio, checkRadio.length, index))
                            }}
                          >
                            <RadioInnerCircleDiv isChecked={checkRadio[index]} />
                          </RadioCircleDiv>
                          <div style={{ display: 'flex', marginLeft: '5px' }}>{text}</div>
                        </RadioMainDiv>
                      ))}
                    </div>
                  </FlexContent>
                </FlexPart>

                <FlexPart>
                  <FlexTitle>
                    회사 명<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    <FlexInput name="name" defaultValue={user && user.name} />
                  </FlexContent>
                </FlexPart>

                <FlexPart>
                  <FlexTitle>
                    대표자 성명<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    <FlexInput name="ceoName" defaultValue={user && user.ceoName} />
                  </FlexContent>
                </FlexPart>

                <FlexPart>
                  <FlexTitle>
                    대표 연락처<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    <FlexInput name="phone" defaultValue={user && user.phone} />
                  </FlexContent>
                </FlexPart>

                <FlexPart>
                  <FlexTitle>
                    팩스번호<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    <FlexInput name="fax" defaultValue={user && user.fax} />
                  </FlexContent>
                </FlexPart>

                <FlexPart style={{ marginBottom: '5px' }}>
                  <FlexTitle>
                    주소<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    <CustomInput name="address" width={223} value={address} defaultValue={user && user.address} />
                    <CheckBtn
                      type="button"
                      style={{
                        backgroundColor: 'black',
                        color: 'white',
                        fontSize: '16px',
                      }}
                      onClick={openModal}
                    >
                      찾기
                    </CheckBtn>
                  </FlexContent>
                </FlexPart>
                <FlexPart>
                  <FlexTitle></FlexTitle>
                  <FlexContent>
                    <FlexInput name="addressDetail" defaultValue={user && user.addressDetail} />
                  </FlexContent>
                </FlexPart>

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

                <FlexPart>
                  <FlexTitle>
                    업태 선택<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    <div
                      style={{
                        display: 'flex',
                        gap: '120px',
                        width: '100%',
                      }}
                    >
                      {checkDummy.map((x, index) => (
                        <StyledCheckMainDiv>
                          <StyledCheckSubSquDiv
                            name="businessType"
                            onClick={() => setCheck(CheckBox(check, check.length, index, true))}
                            isChecked={check[index]}
                          >
                            <CheckImg2 src="/svg/check.svg" isChecked={check[index]} />
                          </StyledCheckSubSquDiv>
                          <p>{x}</p>
                        </StyledCheckMainDiv>
                      ))}
                    </div>
                  </FlexContent>
                </FlexPart>

                <FlexPart>
                  <FlexTitle>
                    사업자 번호<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    {/* input데이터 넣기 value={resData && resData.customer.businessNumber} */}
                    <CustomInput
                      name="businessNumber"
                      width={223}
                      onChange={handleCheck}
                      defaultValue={user && user.businessNumber}
                    />
                    <CheckBtn style={{ fontSize: '16px' }} type="button" onClick={checkBusiness}>
                      중복확인
                    </CheckBtn>
                  </FlexContent>
                </FlexPart>

                <FlexPart style={{ marginBottom: '5px' }}>
                  <FlexTitle>
                    사업자등록증<span>*</span>
                  </FlexTitle>

                  <DownloadButton
                    fileUrl={resData?.businessNumberFileUrl}
                    fileName={resData?.businessNumberOriginalName}
                  />
                </FlexPart>
                <FlexPart>
                  <FlexTitle></FlexTitle>
                  <FlexContent>
                    {renderFileName.businessNumberFile ? (
                      <IncomeImgDiv>
                        <div>{renderFileName.businessNumberFile}</div>
                      </IncomeImgDiv>
                    ) : (
                      <FlexInput style={{ width: '322px' }} disabled />
                    )}
                  </FlexContent>
                </FlexPart>

                <FlexPart style={{ marginBottom: '5px' }}>
                  <FlexTitle>
                    통장사본<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    <DownloadButton fileUrl={resData?.bankbookFileUrl} fileName={resData?.bankbookOriginalName} />
                  </FlexContent>
                </FlexPart>
                <FlexPart>
                  <FlexTitle></FlexTitle>
                  <FlexContent>
                    {renderFileName.bankbookFile ? (
                      <IncomeImgDiv>
                        <div>{renderFileName.bankbookFile}</div>
                      </IncomeImgDiv>
                    ) : (
                      <FlexInput style={{ width: '322px' }} disabled />
                    )}
                  </FlexContent>
                </FlexPart>

                <FlexPart style={{ marginBottom: '5px' }}>
                  <FlexTitle>
                    계좌번호<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    <AccountSelect
                      name="bank"
                      options={accountOptions}
                      defaultValue={accountOptions[0]}
                      onChange={(selectedOption) => handleSelectChange(selectedOption, 'bank')}
                    />
                  </FlexContent>
                </FlexPart>
                <FlexPart>
                  <FlexTitle></FlexTitle>
                  <FlexContent>
                    <FlexInput
                      name="accountNumber"
                      style={{ width: '320px' }}
                      defaultValue={user && user.accountNumber}
                    />
                  </FlexContent>
                </FlexPart>
              </Right>
            </OnePageFlexSubContainer>
          </ModalContainerSubC>
          <BtnWrap style={{ height: '60px' }}>
            {/* <WhiteBtn width={40} height={40}>
            돌아가기
          </WhiteBtn> */}
            <BlackBtn width={40} height={40} type="submit">
              저장
            </BlackBtn>
          </BtnWrap>
        </form>
        {/* </OnePageFlexContainerC> */}
        {/* </ModalSubContainer> */}
      </ModalContainerC>
    </div>
  )
}

export default UserEdit

export const ModalContainerC = styled.div`
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  // width: ${(props) => props.width}px;
  // height: 1000px;
  /* height: ${(props) => props.height}px; */
  // height: max-content;
  z-index: 9999;
  border: 1px solid black;
  // overflow-y: auto;
`
export const ModalContainerSubC = styled.div`
  // margin: 50px 0 0 0;
  width: ${(props) => props.width}px;
  height: 850px;

  overflow-y: auto;
  border-bottom: 1px solid #c8c8c8;
  padding: 56px 24px;
`
export const OnePageFlexContainerC = styled.div`
  width: 1200px;
  font-size: 18px;
  background-color: white;
  margin-left: auto;
  margin-right: auto;
  // border: 1px solid black;
  min-height: 88vh;
  height: fit-content;
`
export const ModalOverlayC = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
`
export const MainTitleC = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  // margin: 40px auto;
  padding: 20px 24px;
  background: var(--primary-heavy, #061737);
  color: white;
`
const TransparentButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  /* 다른 스타일 */
`
export const FlexInputBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  border: 1px solid #b02525;
  color: var(--status-alert, #b02525);
  font-family: SUIT;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 133.333% */
  cursor: pointer;

  &:active {
    background-color: #b02525;
    color: white;
  }
`

const EqualCheckWrap2 = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 99%;
  font-size: 16px;
  margin-bottom: 5px;
  position: relative;
  right: 120px;
`

const CheckTxt2 = styled.p`
  min-width: 100px;
  font-size: 16px;
`

const FlexContent2 = styled.div`
  display: flex;
  min-width: 600px;
  flex-wrap: wrap;
`
