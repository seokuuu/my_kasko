import { useState, useEffect, useCallback } from 'react'
import {
  OnePageContainer,
  OnePageSubContainer,
  MainTitle,
  HalfWrap,
  Left,
  Right,
  Title,
  Part,
  At,
  FlexPart,
  FlexTitle,
  OnePageFlexContainer,
  OnePageFlexSubContainer,
  FlexContent,
  Bar,
  EqualCheckWrap,
  AddBtn,
} from '../../../common/OnePage/OnePage.Styled'
import { CustomInput, FlexInput } from '../../../common/Input/Input'
import { CustomSelect } from '../../../common/Option/Main'
import { emailOptions, accountOptions } from '../../../common/Option/SignUp'
import { AccountSelect } from '../../../common/Option/SignUp'
import { EditSelect, depositOptions } from '../../../common/Option/SignUp'

import { BtnWrap, BlackBtn, WhiteBtn } from '../../../common/Button/Button'
import { BottomP, TxtDivNoborder } from '../../../pages/User/SignUp/SignUp.Styled'

import { RadioContainer } from '../../../pages/User/SignUp/SignUp'

import { TxtDiv } from '../../../pages/User/SignUp/SignUp.Styled'
import { RadioMainDiv, RadioCircleDiv, RadioInnerCircleDiv } from '../../../common/Check/RadioImg'

import { CheckBox } from '../../../common/Check/Checkbox'
import { CheckBtn } from '../../../pages/User/SignUp/SignUp.Styled'

import { StyledCheckMainDiv, StyledCheckSubSquDiv, CheckImg2 } from '../../../common/Check/CheckImg'
import SignUpPost from '../../../modal/SignUp/SignUpPost'
import { checkBusinessNumber, getCustomerPrivacy, updateCustomer } from '../../../api/myPage'
import useReactQuery from '../../../hooks/useReactQuery'
import { ModalContainer, ModalOverlay, ModalSubContainer } from '../../../modal/Common/Common.Styled'
import { styled } from 'styled-components'
import { log } from '../../../lib'
import { resetCustomer } from '../../../api/userManage'

const init = {
  id: '아이디',
  password: '비밀번호',
  memberTitle: '직함',
  memberName: '이름',
  memberEmail: '이메일',
  memberPhone: '연락처',
  type: '사업자 구분', //(법인사업자 / 개인사업자)
  name: '회사명',
  ceoName: '대표자명',
  phone: '대표연락처',
  fax: '팩스번호',
  addressDetail: '상세주소2',
  businessType: '업태 목록', // (유통 / 제조)
  businessNumber: '사업자번호',
  bank: '은행',
  accountNumber: '계좌번호',
  depositManagerTitle: '입금담당자 직함',
  depositManagerName: '입금담당자 이름',
  depositManagerPhone: '입금담당자 연락처',
  releaseManagerTitle: '출고담당자 직함',
  releaseManagerName: '출고담당자 이름',
  releaseManagerPhone: '출고담당자 연락처',
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

const ClientModal = ({ setModal }) => {
  const [input, setInput] = useState(init)
  const [isUser, setIsUser] = useState(false)
  const [shouldUpdateCustomer, setShouldUpdateCustomer] = useState(false)
  const [checkFileName, setCheckFileName] = useState({ deleteBusinessNumberFile: '', deleteBankbookFile: '' })
  const [fileForms, setFileForms] = useState({ registration: '', bankbook: '' })
  const [businessNumber, setBusinessNumber] = useState('')

  // TODO : 중복체크 response 없음
  const { isError, isSuccess, data } = useReactQuery('getCustomerPrivacy', {}, getCustomerPrivacy)
  // const {
  //   isError: isBusinessNumberError,
  //   isSuccess: isBusinessNumberSuccess,
  //   data: businessNumberData,
  // } = useReactQuery('checkBusinessNumber', businessNumber, checkBusinessNumber, {
  //   enabled: false,
  // })
  const [user, setUser] = useState('')
  const resData = data?.data?.data

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
      // setBusinessNumber(resData.customer.businessNumber)
    }
  }, [resData])

  const handleFiles = (e) => {
    const name = e.target.name
    const file = e.target.files[0]
    const fileName = e.target.files[0].name
    if (checkFileName.hasOwnProperty(name)) {
      setCheckFileName((prev) => ({
        ...prev,
        [name]: fileName,
      }))
      if (name === 'deleteBusinessNumberFile') {
        setFileForms((prev) => ({
          ...prev,
          registration: file,
        }))
      }
      if (name === 'deleteBankbookFile') {
        setFileForms((prev) => ({
          ...prev,
          bankbook: file,
        }))
      }
    }
  }

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
    console.log('input', input)
    setShouldUpdateCustomer(true)
  }

  //TODO: 파일 추가 후에 왜 test1만 바뀌는지
  useEffect(() => {
    const updateCustomerData = async () => {
      if (shouldUpdateCustomer) {
        try {
          const response = await updateCustomer(input, fileForms)
          console.log(response.data)
          alert('회원가입이 수정되셨습니다.')
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
  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, () => false))
  const [savedRadioValue, setSavedRadioValue] = useState('')

  useEffect(() => {
    const checkedIndex = checkRadio.findIndex((isChecked, index) => isChecked && index < radioDummy.length)
    if (checkedIndex !== -1) {
      const selectedValue = radioDummy[checkedIndex]
      setSavedRadioValue(selectedValue)
      setInput({ ...input, type: selectedValue })
    }
  }, [checkRadio])

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
  }, [check])

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
    setModal(false)
  }

  return (
    <div>
      <ModalOverlayC />
      <ModalContainerC width={1250}>
        {/* <ModalSubContainer> */}
        {/* <OnePageFlexContainerC> */}
        <MainTitleC>
          <div>대표 상세 정보</div>
          <TransparentButton onClick={modalOFF}>x</TransparentButton>
        </MainTitleC>
        <form onSubmit={handleSubmit}>
          <ModalContainerSubC width={1250}>
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
                    <FlexInput name="id" onChange={handleSubmitForm} />
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

                {/* <FlexPart>
                  <FlexTitle name="">
                    새 비밀번호 확인<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    <FlexInput name="password" type="password" />
                  </FlexContent>
                </FlexPart> */}

                <FlexPart>
                  <FlexTitle>
                    경매 담당자 정보<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    <CustomInput name="memberTitle" placeholder="직함 입력" width={130} onChange={handleSubmitForm} />
                    <CustomInput
                      name="nmemberName"
                      placeholder=" 성함 입력"
                      width={188}
                      style={{ marginLeft: '5px' }}
                      onChange={handleSubmitForm}
                    />
                  </FlexContent>
                </FlexPart>

                <FlexPart>
                  <FlexTitle>
                    이메일<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    <FlexInput name="memberEmail" onChange={handleSubmitForm} />
                  </FlexContent>
                </FlexPart>

                <FlexPart>
                  <FlexTitle>
                    휴대폰 번호<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    <FlexInput name="memberPhone" onChange={handleSubmitForm} />
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
                        gap: '80px',
                        width: '100%',
                      }}
                    >
                      {radioDummy2.map((text, index) => (
                        <RadioMainDiv key={index}>
                          <RadioCircleDiv
                            name="type"
                            isChecked={checkRadio[index]}
                            onClick={() => {
                              setCheckRadio(CheckBox(checkRadio, checkRadio.length, index))
                            }}
                          >
                            <RadioInnerCircleDiv />
                          </RadioCircleDiv>
                          <div style={{ display: 'flex', marginLeft: '0px' }}>{text}</div>
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
                            isChecked={checkRadio[index]}
                            onClick={() => {
                              setCheckRadio(CheckBox(checkRadio, checkRadio.length, index))
                            }}
                          >
                            <RadioInnerCircleDiv />
                          </RadioCircleDiv>
                          <div style={{ display: 'flex', marginLeft: '5px' }}>{text}</div>
                        </RadioMainDiv>
                      ))}
                    </div>
                  </FlexContent>
                </FlexPart>
                <Bar />
                <EqualCheckWrap>
                  <input type="checkbox" style={{ marginRight: '5px' }} />
                  가입 정보와 동일
                </EqualCheckWrap>
                <FlexPart>
                  <FlexTitle>
                    입금 담당자 정보<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    <EditSelect
                      name="depositManagerTitle"
                      options={depositOptions}
                      defaultValue={depositOptions[0]}
                      onChange={(selectedOption) => handleSelectChange(selectedOption, 'depositManagerTitle')}
                    />
                    <CustomInput name="depositManagerName" placeholder="담당자 성함 입력" width={190} onChange={handleSubmitForm}/>
                  </FlexContent>
                </FlexPart>

                <FlexPart>
                  <FlexTitle>
                    휴대폰 번호<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    <FlexInput name="depositManagerPhone" placeholder="연락처 입력 ('-' 제외)" onChange={handleSubmitForm}/>
                  </FlexContent>
                </FlexPart>
                <EqualCheckWrap>
                  <input type="checkbox" style={{ marginRight: '5px' }} />
                  가입 정보와 동일
                </EqualCheckWrap>
                <FlexPart>
                  <FlexTitle>
                    출고 담당자 정보<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    <EditSelect
                      name="releaseManagerTitle"
                      options={depositOptions}
                      defaultValue={depositOptions[0]}
                      onChange={(selectedOption) => handleSelectChange(selectedOption, 'releaseManagerTitle')}
                    />
                    <CustomInput name="releaseManagerName" placeholder=" 담당자 성함 입력" width={190} onChange={handleSubmitForm}/>
                  </FlexContent>
                </FlexPart>

                <FlexPart>
                  <FlexTitle>
                    휴대폰 번호<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    <FlexInput name="releaseManagerPhone" placeholder="연락처 입력 ('-' 제외)" onChange={handleSubmitForm}/>
                  </FlexContent>
                </FlexPart>

                <FlexPart>
                  <FlexTitle>담당자 추가</FlexTitle>
                  <FlexContent>
                    <AddBtn>추가하기</AddBtn>
                  </FlexContent>
                </FlexPart>
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
                            <RadioInnerCircleDiv />
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
                    <FlexInput name="customerName" />
                  </FlexContent>
                </FlexPart>

                <FlexPart>
                  <FlexTitle>
                    대표자 성명<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    <FlexInput name="ceoName" />
                  </FlexContent>
                </FlexPart>

                <FlexPart>
                  <FlexTitle>
                    대표 연락처<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    <FlexInput name="phone" />
                  </FlexContent>
                </FlexPart>

                <FlexPart>
                  <FlexTitle>
                    팩스번호<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    <FlexInput name="fax" />
                  </FlexContent>
                </FlexPart>

                <FlexPart style={{ marginBottom: '5px' }}>
                  <FlexTitle>
                    주소<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    <CustomInput name="address" width={223} value={address} />
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
                    <FlexInput name="addressDetail" value={detailAddress} />
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
                            <CheckImg2 src="/svg/check.svg" />
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
                    <CustomInput name="businessNumber" width={223} onChange={handleCheck} />
                    <CheckBtn style={{ fontSize: '16px' }} type="button" onClick={checkBusiness}>
                      중복확인
                    </CheckBtn>
                  </FlexContent>
                </FlexPart>

                <FlexPart style={{ marginBottom: '5px' }}>
                  <FlexTitle>
                    사업자등록증<span>*</span>
                  </FlexTitle>
                  <TxtDivNoborder className="no-border" style={{ border: '1px solid #000000' }}>
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
                      onChange={handleFiles}
                      name="deleteBusinessNumberFile"
                      // onChange={commonChange}
                      // name="businessfile"
                    ></input>
                  </TxtDivNoborder>
                </FlexPart>
                <FlexPart>
                  <FlexTitle></FlexTitle>
                  <FlexContent>
                    {/* <FlexInput></FlexInput> */}
                    {checkFileName.deleteBusinessNumberFile ? (
                      checkFileName.deleteBusinessNumberFile
                    ) : (
                      <FlexInput></FlexInput>
                    )}
                  </FlexContent>
                </FlexPart>

                <FlexPart style={{ marginBottom: '5px' }}>
                  <FlexTitle>
                    통장사본<span>*</span>
                  </FlexTitle>
                  <FlexContent>
                    <TxtDivNoborder className="no-border" style={{ border: '1px solid #000000' }}>
                      <label htmlFor="ex_file2">
                        <div className="btnStart">
                          <img src="/svg/Upload.svg" alt="btnStart" />
                          <p htmlFor="ex_file">파일 첨부</p>
                        </div>
                      </label>
                      {/* <img src="/svg/Upload.svg" alt="Upload" /> */}
                      <input
                        id="ex_file2"
                        type="file"
                        accept="image/jpg, image/png, image/jpeg"
                        style={{ display: 'none' }}
                        onChange={handleFiles}
                        name="deleteBankbookFile"
                      ></input>
                    </TxtDivNoborder>
                    {/* <TxtDiv style={{ width: '100%' }}>
                    <img src="/svg/Upload.svg" />
                    <p>파일 첨부</p>
                  </TxtDiv> */}
                  </FlexContent>
                </FlexPart>
                <FlexPart>
                  <FlexTitle></FlexTitle>
                  <FlexContent>
                    {/* <FlexInput></FlexInput> */}
                    {checkFileName.deleteBankbookFile ? checkFileName.deleteBankbookFile : <FlexInput></FlexInput>}
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
                    <FlexInput name="accountNumber" style={{ width: '99%' }} />
                  </FlexContent>
                </FlexPart>
              </Right>
            </OnePageFlexSubContainer>
          </ModalContainerSubC>
          <BtnWrap style={{ height: '120px' }}>
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

export default ClientModal

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
  height: 900px;
  overflow-y: auto;
  border-bottom: 2px solid #000;
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