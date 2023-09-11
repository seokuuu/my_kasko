import { useState, useEffect } from 'react'
import { styled } from 'styled-components'

import {
  OnePageContainer,
  OnePageSubContainer,
  Part,
  Title,
  MainTitle,
  FullWrap,
  HalfWrap,
  Left,
  Right,
  Contour,
  OnePageSelect,
} from '../../../common/OnePage/OnePage.Styled'
import { TxtInput, InputA, Inputa } from '../../../common/Input/Input'
import { emailOptions } from '../../../common/Option/SignUp'
import { CustomSelect } from '../../../common/Option/Main'

import { RadioMainDiv, RadioCircleDiv, RadioInnerCircleDiv } from '../../../common/Check/RadioImg'
import { CheckBox } from '../../../common/Check/Checkbox'

import { StyledCheckMainDiv, StyledCheckSubSquDiv } from '../../../common/Check/CheckImg'

import { CheckImg2 } from '../../../common/Check/CheckImg'

import { BtnWrap, BlackBtn, WhiteBtn, WhiteRedBtn } from '../../../common/Button/Button'

const UserEdit = () => {
  // Radio 관련
  const radioDummy = ['창고', '운송사', '현대제철', '카스코 철강'] // 더미 데이터
  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, () => false)) // 더미 데이터에 맞는 check 생성 (해당 false / true값 반환)
  const [savedRadioValue, setSavedRadioValue] = useState('')
  // checkRadio의 true값과 radioDummy를이용해 해당 부분을 반환할 공간
  useEffect(() => {
    const checkedIndex = checkRadio.findIndex((isChecked, index) => isChecked && index < radioDummy.length)

    // 찾지 못하면 -1을 반환하므로, -1이 아닌 경우(찾은 경우)
    if (checkedIndex !== -1) {
      const selectedValue = radioDummy[checkedIndex]
      setSavedRadioValue(selectedValue) //내 state에 반환
      // setInput({ ...input, type: selectedValue }); //서버 전송용 input에 반환
    }
  }, [checkRadio])

  // ------------------------------
  // Check 관련
  const checkDummy = [
    '재고관리',
    '경매관리',
    '상시판매',
    '주문관리',
    '판매제품 관리',
    '출고관리',
    '출고관리',
    '운영관리',
  ]

  const [check, setCheck] = useState(Array.from({ length: checkDummy.length }, () => false)) // 2. false , true 값 반환할 친구 생성

  const [checkData, setCheckData] = useState(Array.from({ length: checkDummy.length }, () => '')) // 1과 2를 대조하여 true에 해당하는 값 반환할 그릇!

  useEffect(() => {
    // true에 해당되면, value를, false면 빈값을 반환
    const updatedCheck = checkDummy.map((value, index) => {
      return check[index] ? value : ''
    })
    // 빈값을 제외한 진짜배기 값이 filteredCheck에 담긴다.
    const filteredCheck = updatedCheck.filter((item) => item !== '')
    setCheckData(filteredCheck)
  }, [check])

  return (
    <OnePageContainer>
      <MainTitle>사용자 수정</MainTitle>
      <OnePageSubContainer>
        <HalfWrap>
          <Left>
            <Part>
              <Title>
                <h4>아이디</h4>
                <p></p>
              </Title>
              <TxtInput disabled />
            </Part>
            <Part>
              <Title>
                <h4>비밀번호</h4>
                <p></p>
              </Title>
              <WhiteRedBtn style={{ width: '320px' }} height={40}>
                비밀번호 초기화
              </WhiteRedBtn>
            </Part>
          </Left>
          <Right>
            <Part>
              <Title>
                <h4>사용자 정보</h4>
                <p></p>
              </Title>
              <Inputa style={{ marginRight: '5px' }} />
              <InputA />
            </Part>
            <Part>
              <Title>
                <h4>이메일</h4>
                <p></p>
              </Title>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Inputa /> <span style={{ margin: '5px' }}>@</span>
                <div>
                  <CustomSelect width={180} options={emailOptions} defaultValue={emailOptions[0]} />
                </div>
              </div>
            </Part>
            <Part>
              <Title>
                <h4>연락처</h4>
                <p></p>
              </Title>
              <TxtInput />
            </Part>
          </Right>
        </HalfWrap>
        <Contour />
        <HalfWrap>
          <Left>
            <Part>
              <Title>
                <h4>사용자 구분</h4>
                <p></p>
              </Title>
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
                    <div style={{ display: 'flex', marginLeft: '5px' }}>{text}</div>
                  </RadioMainDiv>
                ))}
              </RadioContainer>
            </Part>
          </Left>
          <Right>
            <Part>
              <Title>
                <h4>창고 구분</h4>
                <p></p>
              </Title>
              <CustomSelect width={180} options={emailOptions} defaultValue={emailOptions[0]} />
            </Part>
          </Right>
        </HalfWrap>
        <CheckContainer>
          <h4 style={{ marginBottom: '10px' }}>권한 설정</h4>
          <CheckWrap>
            {checkDummy.map((x, index) => (
              <UserCheckDiv>
                <StyledCheckSubSquDiv
                  onClick={() => setCheck(CheckBox(check, check.length, index, true))}
                  isChecked={check[index]}
                >
                  <CheckImg2 src="/svg/check.svg" />
                </StyledCheckSubSquDiv>
                <CheckTxt style={{ marginLeft: '5px' }}>{x}</CheckTxt>
              </UserCheckDiv>
            ))}
          </CheckWrap>
        </CheckContainer>
      </OnePageSubContainer>
      <BtnWrap bottom={-200}>
        <WhiteBtn width={40} height={40}>
          돌아가기
        </WhiteBtn>
        <BlackBtn width={40} height={40}>
          저장
        </BlackBtn>
      </BtnWrap>
    </OnePageContainer>
  )
}

export default UserEdit

export const RadioContainer = styled.div`
  width: max-content;
  display: flex;
  gap: 20px;
  margin-left: 5px;
  margin-top: 10px;
`

const CheckWrap = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
`

const CheckTxt = styled.div`
  min-width: 100px;
  height: 200px;
`

const UserCheckDiv = styled.div`
  display: flex;
  width: 150px;
  height: 30px;
`

const CheckContainer = styled.div`
  width: 93%;
  margin-left: auto;
  margin-right: auto;
`
