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
import { BottomP } from '../../../pages/User/SignUp/SignUp.Styled'

import { RadioContainer } from '../../../pages/User/SignUp/SignUp'

import { TxtDiv } from '../../../pages/User/SignUp/SignUp.Styled'
import { RadioMainDiv, RadioCircleDiv, RadioInnerCircleDiv } from '../../../common/Check/RadioImg'

import { CheckBox } from '../../../common/Check/Checkbox'
import { CheckBtn } from '../../../pages/User/SignUp/SignUp.Styled'

import { StyledCheckMainDiv, StyledCheckSubSquDiv, CheckImg2 } from '../../../common/Check/CheckImg'

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

const ProfileEdit = () => {
  const [input, setInput] = useState(init)
  const [isUser, setIsUser] = useState(false)

  const test = useCallback((e) => {
    // console.log(e.target.name)
    // console.log(e.target.value)
  }, [])

  useEffect(() => {
    const token = {
      access: sessionStorage.getItem('accessToken'),
      refresh: localStorage.getItem('refreshToken'),
    }
    if (token.access) setIsUser(true)
    console.log('로그인여부:', isUser)
    // console.log(token.access)
  }, [isUser])

  const handleSelectChange = (selectedOption, name) => {
    // const isCheck = selectedOption.label
    // if (isCheck === '직함 선택') return

    setInput((prevState) => ({
      ...prevState,
      [name]: selectedOption.label,
    }))
  }

  // checked 빼고 submit하기 (checkbox는 따로 useState로 하였음)
  const handleSubmit = (e) => {
    e.preventDefault()
    const checkboxType = ['bank', 'depositManagerTitle', 'releaseManagerTitle']
    const formData = new FormData(e.target)
    const updatedInput = { ...input }

    formData.forEach((value, key) => {
      if (input.hasOwnProperty(key) && value && !checkboxType.includes(key)) {
        updatedInput[key] = value
      }
    })

    setInput({ ...input, ...updatedInput })
    console.log('input:', input) //두번 눌러야함
  }
  // TODO : 로그인 id 정보 읽어와야함

  // -------------------------------------------------------------------------------

  const radioDummy = ['법인사업자', '개인사업자']
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
                  <FlexInput disabled name={init.id} />
                </FlexContent>
              </FlexPart>

              <FlexPart>
                <FlexTitle>
                  새 비밀번호<span>*</span>
                </FlexTitle>
                <FlexContent>
                  <FlexInput />
                </FlexContent>
              </FlexPart>

              <FlexPart>
                <FlexTitle name="">
                  새 비밀번호 확인<span>*</span>
                </FlexTitle>
                <FlexContent>
                  <FlexInput name="password" onChange={test} />
                </FlexContent>
              </FlexPart>

              <FlexPart>
                <FlexTitle>
                  경매 담당자 정보<span>*</span>
                </FlexTitle>
                <FlexContent>
                  <CustomInput name="memberTitle" placeholder="직함 입력" width={130} />
                  <CustomInput name="memberName" placeholder=" 성함 입력" width={188} style={{ marginLeft: '5px' }} />
                </FlexContent>
              </FlexPart>

              <FlexPart>
                <FlexTitle>
                  이메일<span>*</span>
                </FlexTitle>
                <FlexContent>
                  <FlexInput name="memberEmail" />
                </FlexContent>
              </FlexPart>

              <FlexPart>
                <FlexTitle>
                  휴대폰 번호<span>*</span>
                </FlexTitle>
                <FlexContent>
                  <FlexInput name="memberPhone" />
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
                  <CustomInput name="depositManagerName" placeholder="담당자 성함 입력" width={190} />
                </FlexContent>
              </FlexPart>

              <FlexPart>
                <FlexTitle>
                  휴대폰 번호<span>*</span>
                </FlexTitle>
                <FlexContent>
                  <FlexInput name="depositManagerPhone" placeholder="연락처 입력 ('-' 제외)" />
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
                  <CustomInput name="releaseManagerName" placeholder=" 담당자 성함 입력" width={190} />
                </FlexContent>
              </FlexPart>

              <FlexPart>
                <FlexTitle>
                  휴대폰 번호<span>*</span>
                </FlexTitle>
                <FlexContent>
                  <FlexInput name="releaseManagerPhone" placeholder="연락처 입력 ('-' 제외)" />
                </FlexContent>
              </FlexPart>

              <FlexPart>
                <FlexTitle>담당자 추가</FlexTitle>
                <FlexContent>
                  <AddBtn>추가하기</AddBtn>
                </FlexContent>
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
                  <FlexInput name="name" />
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
                  <CustomInput name="address" width={223} />
                  <CheckBtn
                    style={{
                      backgroundColor: 'black',
                      color: 'white',
                      fontSize: '16px',
                    }}
                  >
                    찾기
                  </CheckBtn>
                </FlexContent>
              </FlexPart>
              <FlexPart>
                <FlexTitle></FlexTitle>
                <FlexContent>
                  <FlexInput name="addressDetail" />
                </FlexContent>
              </FlexPart>

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
                  <CustomInput name="businessNumber" width={223} />
                  <CheckBtn style={{ fontSize: '16px' }}>중복확인</CheckBtn>
                </FlexContent>
              </FlexPart>

              <FlexPart style={{ marginBottom: '5px' }}>
                <FlexTitle>
                  사업자등록증<span>*</span>
                </FlexTitle>
                <FlexContent>
                  <FlexInput />
                </FlexContent>
              </FlexPart>
              <FlexPart>
                <FlexTitle></FlexTitle>
                <FlexContent>
                  <TxtDiv style={{ width: '100%' }}>
                    <img src="/svg/Upload.svg" />
                    <p>파일 첨부</p>
                  </TxtDiv>
                </FlexContent>
              </FlexPart>

              <FlexPart style={{ marginBottom: '5px' }}>
                <FlexTitle>
                  통장사본<span>*</span>
                </FlexTitle>
                <FlexContent>
                  <FlexInput />
                </FlexContent>
              </FlexPart>
              <FlexPart>
                <FlexTitle></FlexTitle>
                <FlexContent>
                  <TxtDiv style={{ width: '100%' }}>
                    <img src="/svg/Upload.svg" />
                    <p>파일 첨부</p>
                  </TxtDiv>
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
