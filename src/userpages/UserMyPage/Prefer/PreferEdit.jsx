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
import { Tilde } from '../../../modal/External/ExternalFilter'
import { CustomSelect } from '../../../common/Option/Main'

const PreferEdit = () => {
  const radioDummy = ['지정', '미지정'] // 더미 데이터

  return (
    <OnePageContainer>
      <MainTitle>선호제품 등록</MainTitle>
      <OnePageSubContainer>
        <HalfWrap>
          <Left>
            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>선호제품 명</h4>
                <p></p>
              </Title>
              <CustomInput placeholder="선호제품 명 입력" width={340} />
            </Part>

            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>규격 약호</h4>
                <p></p>
              </Title>
              <CustomSelect width={340} />
            </Part>

            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>두께</h4>
                <p></p>
              </Title>
              <CustomInput width={160} />
              <span style={{ padding: '0px 5px' }}>~</span>
              <CustomInput width={160} />
            </Part>

            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>폭</h4>
                <p></p>
              </Title>
              <CustomInput width={160} />
              <span style={{ padding: '0px 5px' }}>~</span>
              <CustomInput width={160} />
            </Part>

            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>길이</h4>
                <p></p>
              </Title>
              <CustomInput width={160} />
              <span style={{ padding: '0px 5px' }}>~</span>
              <CustomInput width={160} />
            </Part>
          </Left>
          <Right>
            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>TS</h4>
                <p></p>
              </Title>
              <CustomInput width={160} />
              <span style={{ padding: '0px 5px' }}>~</span>
              <CustomInput width={160} />
            </Part>

            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>YP</h4>
                <p></p>
              </Title>
              <CustomInput width={160} />
              <span style={{ padding: '0px 5px' }}>~</span>
              <CustomInput width={160} />
            </Part>
            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>C%</h4>
                <p></p>
              </Title>
              <CustomInput width={160} />
              <span style={{ padding: '0px 5px' }}>~</span>
              <CustomInput width={160} />
            </Part>

            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>EL</h4>
                <p></p>
              </Title>
              <CustomInput width={160} />
              <span style={{ padding: '0px 5px' }}>~</span>
              <CustomInput width={160} />
            </Part>
          </Right>
        </HalfWrap>
      </OnePageSubContainer>
      <BtnWrap bottom={-130}>
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

export default PreferEdit

const RadioContainer = styled.div`
  display: flex;
  width: 250px;
  justify-content: space-between;
`
