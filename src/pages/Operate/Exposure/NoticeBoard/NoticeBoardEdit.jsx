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
import { CustomInput, InputA, PropsInput, PropsTextArea } from '../../../../common/Input/Input'
import { ExCheckWrap } from '../../../../modal/External/ExternalFilter'
import { Input } from '../../../User/Login/Login.Styled'
import { CustomSelect } from '../../../../common/Option/Main'
import { ExRadioWrap } from '../../../../modal/External/ExternalFilter'
import { RadioMainDiv, RadioInnerCircleDiv, RadioCircleDiv } from '../../../../common/Check/RadioImg'
// 클레임 등록
const NoticeBoardEdit = () => {
  const checkDummy = ['노출 안함']

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
    // setInput({
    //   ...input,
    //   businessType: updatedCheck.filter(item => item !== ''),
    // });
  }, [check])

  const radioDummy = ['노출', '미노출']
  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))

  return (
    <>
      <CenterRectangleWrap>
        <CRWMain>
          <h5>전광판 수정</h5>
          <div style={{ marginBottom: '10px', display: 'flex' }}>
            <PropsTextArea
              style={{ marginLeft: 'auto', marginRight: 'auto' }}
              per={90}
              height={260}
              placeholder="질문 내용을 입력해주세요. 띄어쓰기 포함하여 최대 80자까지 가능합니다."
              maxLength={80}
            />
          </div>

          <BottomWrap style={{ width: '100%', display: 'flex', height: '450px' }}>
            <BottomOne
              style={{
                width: '90%',

                marginLeft: 'auto',
                marginRight: 'auto',
                alignItems: 'normal',
                paddingTop: '50px',
                display: 'block',
              }}
            >
              <div style={{ fontSize: '18px' }}>전광판 노출 여부</div>
              <div style={{ display: 'flex' }}>
                <ExRadioWrap style={{ padding: '0', marginTop: '10px', gap: '300px' }}>
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

export default NoticeBoardEdit

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
