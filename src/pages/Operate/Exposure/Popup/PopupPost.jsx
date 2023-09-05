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
import { CustomInput, PropsInput } from '../../../../common/Input/Input'

// 클레임 등록
const PopupPost = () => {
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
          <h5>팝업 등록</h5>
          <div style={{ marginBottom: '10px' }}>
            <PropsInput placeholder="제목을 입력해 주세요." />
          </div>

          <TextEditor />
          <CRWMainBottom>
            <div>ㅋㅋ</div>
          </CRWMainBottom>
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

const BtnWrap = styled.div`
  display: flex;
  width: 500px;
  justify-content: space-evenly;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
`
