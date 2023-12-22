import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'

import { BlackBtn, WhiteBtn } from '../../../../common/Button/Button'
import { CenterRectangleWrap } from '../../../../common/OnePage/OnePage.Styled'
import DateGrid from '../../../../components/DateGrid/DateGrid'
import TextEditor from '../../../../components/Editor/TextEditor'

import { StyledCheckMainDiv, StyledCheckSubSquDiv } from '../../../../common/Check/CheckImg'

import { CheckBox } from '../../../../common/Check/Checkbox'

import { CheckImg2 } from '../../../../common/Check/CheckImg'

import { useNavigate } from 'react-router-dom'
import { InputA, PropsInput } from '../../../../common/Input/Input'
import { CustomSelect } from '../../../../common/Option/Main'
import { ExCheckWrap } from '../../../../modal/External/ExternalFilter'
const PopupPost = () => {
  const navigate = useNavigate()

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

  return (
    <>
      <CenterRectangleWrap>
        <CRWMain>
          <h5>팝업 수정</h5>
          <div style={{ marginBottom: '10px' }}>
            <PropsInput placeholder="제목을 입력해 주세요." />
          </div>

          <TextEditor />
          <BottomWrap>
            <BottomOne style={{ marginTop: '20px' }}>
              <div>노출 기간</div>
              <div>
                <ExCheckWrap>
                  {checkDummy.map((x, index) => (
                    <StyledCheckMainDiv>
                      <StyledCheckSubSquDiv
                        onClick={() => setCheck(CheckBox(check, check.length, index, true))}
                        isChecked={check[index]}
                      >
                        <CheckImg2 src="/svg/check.svg" isChecked={check[index]} />
                      </StyledCheckSubSquDiv>
                      <p style={{ fontSize: '16px' }}>{x}</p>
                    </StyledCheckMainDiv>
                  ))}
                </ExCheckWrap>
              </div>
            </BottomOne>
            <BottomOne>
              <div style={{ width: '48%' }}>
                <DateGrid />
              </div>
              <div style={{ width: '48%' }}>
                <DateGrid />
              </div>
            </BottomOne>
            <BottomOne style={{ margin: '20px 0px' }}>
              <div style={{ width: '48%' }}>
                <p style={{ marginBottom: '5px' }}>메인 팝업</p>
                <div>
                  <CustomSelect style={{ width: '100%' }} />
                </div>
              </div>
              <div style={{ width: '48%' }}>
                <p style={{ marginBottom: '5px' }}>팝업 링크</p>
                <div style={{ width: '48%' }}>
                  <InputA style={{ width: '209%' }} placeholder="http://kasco.co.kr" />
                </div>
              </div>
            </BottomOne>
          </BottomWrap>

          <CRWSub>
            <BtnWrap>
              <WhiteBtn
                width={90}
                height={50}
                style={{ marginRight: '10px' }}
                onClick={() => navigate('/operate/exposure')}
              >
                돌아가기
              </WhiteBtn>
              <BlackBtn width={90} height={50}>
                수정 완료
              </BlackBtn>
            </BtnWrap>
          </CRWSub>
        </CRWMain>
      </CenterRectangleWrap>
    </>
  )
}

export default PopupPost

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
