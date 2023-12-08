import { useEffect, useState } from 'react'
import { CustomInput, FlexInput } from '../../../common/Input/Input'
import {
  AddBtn,
  Bar,
  EqualCheckWrap,
  FlexContent,
  FlexPart,
  FlexTitle,
  Left,
  MainTitle,
  OnePageFlexContainer,
  OnePageFlexSubContainer,
  Right,
} from '../../../common/OnePage/OnePage.Styled'
import { AccountSelect, EditSelect, accountOptions, depositOptions } from '../../../common/Option/SignUp'

import { BlackBtn, BtnWrap, WhiteBtn } from '../../../common/Button/Button'
import { TxtDivNoborder } from '../../../pages/User/SignUp/SignUp.Styled'

import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../../common/Check/RadioImg'

import { CheckBox } from '../../../common/Check/Checkbox'
import { CheckBtn } from '../../../pages/User/SignUp/SignUp.Styled'

import styled from 'styled-components'
import { checkBusinessNumber, getCustomerPrivacy, updateCustomer } from '../../../api/myPage'
import { CheckImg2, StyledCheckMainDiv, StyledCheckSubSquDiv } from '../../../common/Check/CheckImg'
import useReactQuery from '../../../hooks/useReactQuery'
import SignUpPost from '../../../modal/SignUp/SignUpPost'
import useMutationQuery from '../../../hooks/useMutationQuery'

//비밀번호 / 비밀번호 확인 제한
// 담당자 추가 정책 X
// 사진 용량 제한

const init = {
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
  deleteBusinessNumberFile: '',
  deleteBankbookFile: '',
}

const ProfileEdit = () => {
  const [selectSwitch, setSelectSwitch] = useState({
    A: false,
    deposit: false,
    release: false,
  })

  const [input, setInput] = useState(init)

  const [isUser, setIsUser] = useState(false)
  const [shouldUpdateCustomer, setShouldUpdateCustomer] = useState(false)
  const [checkFileName, setCheckFileName] = useState({ deleteBusinessNumberFile: '', deleteBankbookFile: '' })
  const [renderFileName, setRenderFileName] = useState({ businessNumberFile: '', bankbookFile: ' ' })
  const [fileForms, setFileForms] = useState({ registration: '', bankBook: '' })
  const [dropdownNames, setDropdownNames] = useState({
    depositManagerTitle: '',
    releaseManagerTitle: '',
    bank: '',
  })

  console.log('dropdownNames', dropdownNames)

  console.log('checkFileName 삭제 <<<', checkFileName)
  console.log('renderFileName 렌더 <<<', renderFileName)

  const [businessNumber, setBusinessNumber] = useState('')

  const checkDummy = ['유통', '제조']
  const [check, setCheck] = useState(Array.from({ length: checkDummy.length }, () => false))
  const [checkData, setCheckData] = useState(Array.from({ length: checkDummy.length }, () => ''))

  console.log('businessNumber', businessNumber)

  // TODO : 중복체크 response 없음
  const { isError, isSuccess, data } = useReactQuery('getCustomerPrivacy', {}, getCustomerPrivacy)
  const {
    isError: isBusinessNumberError,
    isSuccess: isBusinessNumberSuccess,
    data: businessNumberData,
  } = useReactQuery('checkBusinessNumber', businessNumber, checkBusinessNumber, {
    enabled: false,
  })
  const [user, setUser] = useState('')
  const resData = data?.data?.data

  console.log('resData', resData)

  const postMutation = useMutationQuery('', checkBusinessNumber)
  const checkBusiness = async () => {
    try {
      const result = await postMutation.mutateAsync(businessNumber)
      const responseData = result.data
      if (responseData.status !== 409) {
        alert('사용 가능한 사업자 번호입니다.')
      }
    } catch (error) {
      alert(error.data.message)
    }
  }

  const handleCheck = (e) => {
    setBusinessNumber(e.target.value)
    console.log(businessNumber)
  }

  if (isError) console.log('ERROR')

  useEffect(() => {
    if (isSuccess) {
      setUser(resData)
      setAddress(resData?.customer?.address)
      setDetailAddress(resData?.customer?.addressDetail)
      setDropdownNames({
        ...dropdownNames,
        bank: resData?.customer?.bank,
        depositManagerTitle: resData?.customer?.depositManagerTitle,
        releaseManagerTitle: resData?.customer?.releaseManagerTitle,
      })
      setRenderFileName({
        ...renderFileName,
        businessNumberFile: resData?.customer?.businessNumberOriginalName,
        bankbookFile: resData?.customer?.bankbookOriginalName,
      })

      const userCustomerTypeIndex = radioDummy.indexOf(resData?.customer?.type)

      const newCheck = check.map((_, index) => resData?.customer?.businessType?.includes(checkDummy[index]))
      setCheck(newCheck)

      if (userCustomerTypeIndex !== -1) {
        // 일치하는 값이 있다면 해당 인덱스의 checkRadio를 true로 설정
        const newCheckRadio = Array.from({ length: radioDummy.length }, (_, index) => index === userCustomerTypeIndex)
        setCheckRadio(newCheckRadio)
      }
    }
  }, [isSuccess, resData])

  const handleFiles = (e) => {
    const name = e.target.name
    const file = e.target.files[0]
    console.log('')
    const fileName = e.target.files[0].name
    if (renderFileName.hasOwnProperty(name)) {
      setRenderFileName((prev) => ({
        ...prev,
        [name]: fileName,
      }))
      if (name === 'businessNumberFile') {
        setFileForms((prev) => ({
          ...prev,
          registration: file,
        }))
      }
      if (name === 'bankbookFile') {
        setFileForms((prev) => ({
          ...prev,
          bankBook: file,
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

    console.log('updatedInput', updatedInput)

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
    setInput({ ...input, ...updatedInput, ...checkFileName, ...dropdownNames })

    setShouldUpdateCustomer(true)
  }

  //TODO: 파일 추가 후에 왜 test1만 바뀌는지
  useEffect(() => {
    const updateCustomerData = async () => {
      if (shouldUpdateCustomer) {
        try {
          const response = await updateCustomer(input, fileForms)
          console.log('response !!! ', response)
          alert('수정되었습니다.')
        } catch (err) {
          console.log(err)
          alert('ERROR:', err)
        }
        setShouldUpdateCustomer(false)
      }
    }
    updateCustomerData()
  }, [shouldUpdateCustomer])

  console.log('shouldUpdateCustomer', shouldUpdateCustomer)

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
  // const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))
  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, () => false))

  const [savedRadioValue, setSavedRadioValue] = useState('')

  console.log(' >< input.type !!!', input.type)
  console.log(' >< savedRadioValue !!!', savedRadioValue)

  useEffect(() => {
    const checkedIndex = checkRadio.findIndex((isChecked, index) => isChecked && index < radioDummy.length)
    if (checkedIndex !== -1) {
      const selectedValue = radioDummy[checkedIndex]
      setSavedRadioValue(selectedValue)
      setInput({ ...input, type: savedRadioValue })
    }
  }, [checkRadio, savedRadioValue])

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

  console.log('checkData !!!!', input.businessType)
  console.log('input', input)

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
                  <FlexInput style={{ background: '#c8c8c8' }} disabled name={init.id} value={user && user.member.id} />
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
                  <CustomInput
                    name="title"
                    placeholder="직함 입력"
                    width={130}
                    defaultValue={user && user.member.title}
                  />
                  <CustomInput
                    name="name"
                    placeholder=" 성함 입력"
                    width={188}
                    style={{ marginLeft: '5px' }}
                    defaultValue={user && user.member.name}
                  />
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
                      {user && user.customer.depositManagerTitle}
                    </GreyDiv>
                  )}

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
                      {user && user.customer.releaseManagerTitle}
                    </GreyDiv>
                  )}

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
                    name="businessNumberFile"
                    // onChange={commonChange}
                    // name="businessfile"
                  ></input>
                </TxtDivNoborder>
              </FlexPart>
              <FlexPart>
                <FlexTitle></FlexTitle>
                <FlexContent>
                  {renderFileName.businessNumberFile ? (
                    <IncomeImgDiv>
                      <div>{renderFileName.businessNumberFile}</div>
                      <div>
                        <IIDImg
                          onClick={() => {
                            setRenderFileName({
                              ...renderFileName,
                              businessNumberFile: '',
                            })
                            setCheckFileName({
                              ...checkFileName,
                              deleteBusinessNumberFile: resData?.customer?.businessNumberSavedName,
                            })
                          }}
                          src="/svg/btn_close.svg"
                        />
                      </div>
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
                      name="bankbookFile"
                    ></input>
                  </TxtDivNoborder>
                </FlexContent>
              </FlexPart>
              <FlexPart>
                <FlexTitle></FlexTitle>
                <FlexContent>
                  {renderFileName.bankbookFile ? (
                    <IncomeImgDiv>
                      <div>{renderFileName.bankbookFile}</div>
                      <div>
                        <IIDImg
                          src="/svg/btn_close.svg"
                          onClick={() => {
                            setRenderFileName({
                              ...renderFileName,
                              bankbookFile: '',
                            })
                            setCheckFileName({
                              ...checkFileName,
                              deleteBankbookFile: resData?.customer?.bankbookSavedName,
                            })
                          }}
                        />
                      </div>
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
                    defaultValue={user && user.customer.accountNumber}
                  />
                </FlexContent>
              </FlexPart>
            </Right>
          </OnePageFlexSubContainer>
        </div>
        <BtnWrap style={{ height: '120px' }}>
          <WhiteBtn width={40} height={40} type="button">
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

const GreyDiv = styled.div`
  font-size: 16px;
  width: 130px;
  height: 40px;
  border: 1px solid #c1c1c1c5;
  background-color: #c8c8c8;
  margin-right: 5px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: gray;

    &::after {
      content: '클릭 시 수정';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
  }
`

const IncomeImgDiv = styled.div`
  display: flex;
  font-size: 14px;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  width: 99%;
  height: 40px;
  background-color: #f1f1f1;
  color: #6b6b6b;
`

const IIDImg = styled.img`
  width: 13px;
  cursor: pointer;
`
