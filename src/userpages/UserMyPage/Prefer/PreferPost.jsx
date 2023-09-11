import { useState, useEffect } from 'react'
import {
  OnePageContainer,
  MainTitle,
  OnePageSubContainer,
  HalfWrap,
  Left,
  Right,
  Title,
  Part,
  Alert,
} from '../../../common/OnePage/OnePage.Styled'

import { TxtInput, CustomInput } from '../../../common/Input/Input'

import { styled } from 'styled-components'
import { RadioMainDiv, RadioCircleDiv, RadioInnerCircleDiv } from '../../../common/Check/RadioImg'

import { CheckBox } from '../../../common/Check/Checkbox'

import { BtnWrap, BlackBtn, WhiteBtn } from '../../../common/Button/Button'

const PreferPost = () => {
  const radioDummy = ['지정', '미지정'] // 더미 데이터
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
  return (
    <OnePageContainer>
      <MainTitle>선호제품 등록</MainTitle>
      <OnePageSubContainer>
        <HalfWrap>
          <Left>
            <Part>
              <Title>
                <h4>대표 주소 지정</h4>
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

            <Part>
              <Title>
                <h4>목적지</h4>
                <p></p>
              </Title>
              <CustomInput width={120} />
              <span style={{ margin: 'auto 5px' }}>-</span>
              <CustomInput width={120} />
              <BlackBtn width={20} height={40} style={{ marginLeft: '10px' }}>
                조회
              </BlackBtn>
            </Part>
            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>전체 주소</h4>
                <p></p>
              </Title>
              <CustomInput placeholder="전체 주소 입력" width={340} />
            </Part>
          </Left>
          <Right>
            <Part>
              <Title>
                <h4>하차지 명</h4>
                <p></p>
              </Title>
              <CustomInput placeholder="전체 주소 입력" width={340} />
            </Part>
            <Part>
              <Title>
                <h4>하차지 담당자 정보</h4>
                <p></p>
              </Title>
              <CustomInput placeholder="직함 입력" width={135} />
              <CustomInput placeholder="담당자 성함 입력" width={200} style={{ marginLeft: '5px' }} />
              <CustomInput placeholder="담당자 휴대폰 번호 입력 ('-' 제외)" width={340} style={{ marginTop: '5px' }} />

              <Alert style={{ margin: '5px auto' }}>*하차지 연락처 미입력 시 토요일 하차 불가</Alert>
              <CustomInput placeholder="하차지 연락처 입력 ('-' 제외)" width={340} />
            </Part>

            <Part>
              <Title>
                <h4>비고</h4>
                <p></p>
              </Title>
              <CustomInput placeholder="비고 작성" width={340} />
            </Part>
          </Right>
        </HalfWrap>
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

export default PreferPost

const RadioContainer = styled.div`
  display: flex;
  width: 250px;
  justify-content: space-between;
`
