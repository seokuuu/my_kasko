import React, { Fragment, useEffect, useState } from 'react'
import { styled } from 'styled-components'

import { BlackBtn, WhiteBtn } from '../../../common/Button/Button'
import { CenterRectangleWrap } from '../../../common/OnePage/OnePage.Styled'
import { claimOngoingStatus, ClaimSelect } from '../../../common/Option/ClaimPost'
import DateGrid from '../../../components/DateGrid/DateGrid'
import TextEditor from '../../../components/Editor/TextEditor'

import { StyledCheckMainDiv, StyledCheckSubSquDiv } from '../../../common/Check/CheckImg'

import { CheckBox } from '../../../common/Check/Checkbox'

import { CheckImg2 } from '../../../common/Check/CheckImg'

import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle, DateTitle } from '../../../components/MapTable/MapTable'
import { MainSelect } from '../../../common/Option/Main'

// 클레임 등록
const ClaimRegister = () => {
  const titleData = [
    '제품 번호',
    '클레임 등록 일자',
    '클레임 수정 일자',
    '두께(mm)',
    '폭(mm)',
    '길이(mm)',
    '규격약호',
    '중량(kg)',
    '매입처',
  ]
  const contentData = ['가', '나', '다', '라', '마', '바', '사', '아', '자']
  const checkDummy = ['카스코 반품', '현대제철 반품']

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
          <h5>클레임 등록</h5>
          <ClaimRow>
            <ClaimTitle style={{ width: '50%' }}>업체명</ClaimTitle>
            <ClaimContent style={{ width: '50%' }}>A</ClaimContent                             >
          </ClaimRow>
          <ClaimTable>
            {[0, 1, 2].map((index) => (
              <ClaimRow key={index}>
                {titleData.slice(index * 3, index * 3 + 3).map((title, idx) => (
                  <Fragment agmentkey={title}>
                    <ClaimTitle>{title}</ClaimTitle>
                    <ClaimContent>{contentData[index * 3 + idx]}</ClaimContent>
                  </Fragment>
                ))}
              </ClaimRow>
            ))}
          </ClaimTable>
          <h4>내용</h4>
          <TextEditor />
          <CRWMainBottom>
            <CMBLeft>
              <div>
                <DateTitle>클레임 요청 일자</DateTitle>
                <DateGrid width={130} left={-30} fontSize={17} />
              </div>
              <div>
                <DateTitle>현대 재철 클레임 등록 일자</DateTitle>
                <DateGrid width={130} left={-30} fontSize={17} />
              </div>
              <div>
                <DateTitle>클레임 완료 일자</DateTitle>
                <DateGrid width={130} left={-30} fontSize={17} />
              </div>
            </CMBLeft>
            <CMBLeft>
              <SelectWrap>
                <DateTitle style={{ width: '150px' }}>클레임 진행 상태</DateTitle>
                <MainSelect options={claimOngoingStatus} defaultValue={claimOngoingStatus[0]} />
              </SelectWrap>
              <div>
                <DateTitle small>반품 진행</DateTitle>
                <CheckWrap>
                  {checkDummy.map((x, index) => (
                    <StyledCheckMainDiv>
                      <StyledCheckSubSquDiv
                        onClick={() => setCheck(CheckBox(check, check.length, index, true))}
                        isChecked={check[index]}
                      >
                        <CheckImg2 src="/svg/check.svg" />
                      </StyledCheckSubSquDiv>
                      <p>{x}</p>
                    </StyledCheckMainDiv>
                  ))}
                </CheckWrap>
              </div>
              <div>
                <DateTitle small>카스코 반품일자</DateTitle>
                <DateGrid width={130} left={-45} fontSize={17} />
              </div>
              <div>
                <DateTitle small>현대제철 반품일자</DateTitle>
                <DateGrid width={130} left={-45} fontSize={17} />
              </div>
            </CMBLeft>
          </CRWMainBottom>
          <CRWSub>
            <BtnWrap>
              <WhiteBtn width={40} height={40} style={{ marginRight: '10px' }}>
                돌아가기
              </WhiteBtn>
              <BlackBtn width={40} height={40}>
                저장
              </BlackBtn>
            </BtnWrap>
          </CRWSub>
        </CRWMain>
      </CenterRectangleWrap>
    </>
  )
}

export default ClaimRegister

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

const SelectWrap = styled.div`
  display: flex;
  gap: 25px;
`

const BtnWrap = styled.div`
  display: flex;
  width: 500px;
  justify-content: space-evenly;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
`

const CheckWrap = styled.div`
  display: flex;
  font-size: 16px;
  align-items: center;
  min-width: 250px;
  gap: 15px;
  position: relative;
  left: 25px;
`
