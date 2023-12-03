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

const init = {
  password: '',
  title: '',
  name: '',
  email: '',
  phone: '',
  customerUid: '',
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
  deleteBusinessNumberFile: '',
  deleteBankbookFile: '',
}

const ProfileEdit = () => {
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

  console.log('resData =>', resData)

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
  const [modalSwitch, setModalSwitch] = useState(false)
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
    setModalSwitch(false)
    setAddress('')
    setDetailAddress('')
    setInput({ ...input, address: '', addressDetail: '' })
  }

  const comfirmPost = () => {
    setModalSwitch(false)
    setInput({ ...input, address: address, addressDetail: detailAddress })
  }

  const openModal = () => {
    setModalSwitch(true)
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
  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))
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

  return (
    <form onSubmit={handleSubmit}>
      <OnePageFlexContainer>
        <MainTitle>개인정보 수정</MainTitle>
        <div>
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
                  <FlexInput disabled name={init.id} value={user && user.member.id} />
                </FlexContent>
              </FlexPart>

              <FlexPart>
                <FlexTitle>
                  새 비밀번호<span>*</span>
                </FlexTitle>
                <FlexContent>
                  <FlexInput type="password" />
                </FlexContent>
              </FlexPart>

              <FlexPart>
                <FlexTitle name="">
                  새 비밀번호 확인<span>*</span>
                </FlexTitle>
                <FlexContent>
                  <FlexInput name="password" type="password" />
                </FlexContent>
              </FlexPart>

              <FlexPart>
                <FlexTitle>
                  경매 담당자 정보<span>*</span>
                </FlexTitle>
                <FlexContent>
                  <CustomInput name="title" placeholder="직함 입력" width={130} />
                  <CustomInput name="name" placeholder=" 성함 입력" width={188} style={{ marginLeft: '5px' }} />
                </FlexContent>
              </FlexPart>

              <FlexPart>
                <FlexTitle>
                  이메일<span>*</span>
                </FlexTitle>
                <FlexContent>
                  <FlexInput name="email" defaultValue={(user && user.member.email) || ''} />
                </FlexContent>
              </FlexPart>

              <FlexPart>
                <FlexTitle>
                  휴대폰 번호<span>*</span>
                </FlexTitle>
                <FlexContent>
                  <FlexInput name="customerPhone" defaultValue={user && user.member.phone} />
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
                  <CustomInput
                    name="depositManagerName"
                    placeholder="담당자 성함 입력"
                    width={190}
                    defaultValue={user && user.customer.depositManagerName}
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
                    defaultValue={user && user.customer.depositManagerPhone}
                  />
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
                  <CustomInput
                    name="releaseManagerName"
                    placeholder=" 담당자 성함 입력"
                    width={190}
                    defaultValue={user && user.customer.releaseManagerName}
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
                    defaultValue={user && user.customer.releaseManagerPhone}
                  />
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
                  <FlexInput name="customerName" defaultValue={user && user.customer.name} />
                </FlexContent>
              </FlexPart>

              <FlexPart>
                <FlexTitle>
                  대표자 성명<span>*</span>
                </FlexTitle>
                <FlexContent>
                  <FlexInput name="ceoName" defaultValue={user && user.customer.ceoName} />
                </FlexContent>
              </FlexPart>

              <FlexPart>
                <FlexTitle>
                  대표 연락처<span>*</span>
                </FlexTitle>
                <FlexContent>
                  <FlexInput name="phone" defaultValue={user && user.customer.phone} />
                </FlexContent>
              </FlexPart>

              <FlexPart>
                <FlexTitle>
                  팩스번호<span>*</span>
                </FlexTitle>
                <FlexContent>
                  <FlexInput name="fax" defaultValue={user && user.customer.fax} />
                </FlexContent>
              </FlexPart>

              <FlexPart style={{ marginBottom: '5px' }}>
                <FlexTitle>
                  주소<span>*</span>
                </FlexTitle>
                <FlexContent>
                  <CustomInput
                    name="address"
                    width={223}
                    value={address}
                    defaultValue={user && user.customer.address}
                  />
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
                  <FlexInput
                    name="addressDetail"
                    value={detailAddress}
                    defaultValue={user && user.customer.addressDetail}
                  />
                </FlexContent>
              </FlexPart>

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
                  <CustomInput
                    name="businessNumber"
                    width={223}
                    onChange={handleCheck}
                    defaultValue={user && user.customer.businessNumber}
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
                  {checkFileName.deleteBankbookFile ? (
                    checkFileName.deleteBankbookFile
                  ) : (
                    <FlexInput style={{ width: '322px' }}></FlexInput>
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
                    defaultValue={user && user.customer.accountNumber}
                  />
                </FlexContent>
              </FlexPart>
            </Right>
          </OnePageFlexSubContainer>
        </div>
        <BtnWrap style={{ height: '120px' }}>
          <WhiteBtn width={40} height={40}>
            돌아가기
          </WhiteBtn>
          <BlackBtn width={40} height={40} type="submit">
            저장
          </BlackBtn>
        </BtnWrap>
      </OnePageFlexContainer>
    </form>
  )
}

export default ProfileEdit
