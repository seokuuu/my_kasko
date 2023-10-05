import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'

import TextEditor from '../../../../components/Editor/TextEditor'
import DateGrid from '../../../../components/DateGrid/DateGrid'
import { claimOngoingStatus, ClaimSelect } from '../../../../common/Option/ClaimPost'
import { BlackBtn, WhiteBtn } from '../../../../common/Button/Button'
import { CenterRectangleWrap } from '../../../../common/OnePage/OnePage.Styled'

import { StyledCheckMainDiv, StyledCheckSubSquDiv } from '../../../../common/Check/CheckImg'

import { CheckBox } from '../../../../common/Check/Checkbox'

import { CheckImg2 } from '../../../../common/Check/CheckImg'

import { DateTitle, ClaimTable, ClaimRow, ClaimTitle, ClaimContent } from '../../../../components/MapTable/MapTable'
import { CustomInput, InputA, PropsInput } from '../../../../common/Input/Input'
import { ExRadioWrap } from '../../../../modal/External/ExternalFilter'
import { RadioMainDiv, RadioInnerCircleDiv, RadioCircleDiv } from '../../../../common/Check/RadioImg'

import { TxtDiv } from '../../../User/SignUp/SignUp.Styled'
// 클레임 등록
const NoticeEdit = () => {
  const radioDummy = ['노출', '미노출']
  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))

  return (
    <>
      <CenterRectangleWrap>
        <CRWMain>
          <h5>공지 수정</h5>
          <div style={{ marginBottom: '10px' }}>
            <PropsInput placeholder="제목을 입력해 주세요." />
          </div>

          <TextEditor />
          <BottomWrap>
            <BottomOne style={{ margin: '20px 0px' }}>
              <div style={{ width: '50%' }}>
                <p style={{ marginBottom: '5px' }}>상단 노출 여부</p>
                <ExRadioWrap style={{ padding: '0', marginTop: '10px', gap: '150px', marginLeft: '-150px' }}>
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
                      <div style={{ display: 'flex', marginLeft: '5px', color: 'black' }}>{text}</div>
                    </RadioMainDiv>
                  ))}
                </ExRadioWrap>
              </div>
              <div style={{ width: '48%' }}>
                <p style={{ marginBottom: '5px' }}>첨부 파일</p>
                <div style={{ width: '48%' }}>
                  <TxtDiv style={{ width: '200%' }}>
                    <img src="/svg/Upload.svg" />
                    <p>파일 첨부</p>
                  </TxtDiv>
                </div>
              </div>
            </BottomOne>
          </BottomWrap>

          <CRWSub>
            <BtnWrap>
              <WhiteBtn width={90} height={50} style={{ marginRight: '10px' }}>
                돌아가기
              </WhiteBtn>
              <BlackBtn width={90} height={50}>
                저장
              </BlackBtn>
            </BtnWrap>
          </CRWSub>
        </CRWMain>
      </CenterRectangleWrap>
    </>
  )
}

export default NoticeEdit

export const CRWMain = styled.div`
  width: 100%;

  h4 {
    margin-top: 20px;
  }

  h5 {
    margin: 30px auto;
    text-align: center;
    font-size: 24px;
  }

  h6 {
    margin-bottom: 30px;
    text-align: center;
    font-size: 16px;
  }
`

export const CRWMainBottom = styled.div`
  width: 100%;
  height: fit-content;
  margin: 10px 0px;
  display: flex;
  justify-content: space-around;
`

export const CMBLeft = styled.div`
  width: 50%;

  > div {
    width: 400px;
    display: flex;
    margin: 10px auto;
    justify-content: space-between;
  }
  height: fit-content;
`

export const CMBRight = styled.div`
  max-width: 50%;

  > div {
    width: 300px;
    display: flex;
    justify-content: space-between;
  }
  height: fit-content;
`

export const CRWSub = styled.div`
  display: flex;
`

const BottomWrap = styled.div`
  display: block;
  justify-content: left;
  font-size: 16px;
  height: 200px;
`

const BtnWrap = styled.div`
  display: flex;
  width: 500px;
  justify-content: space-evenly;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
`

const BottomOne = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0px;
  align-items: center;
`
