import React, { useState } from 'react'
import {
  AutionInput,
  BottomContentsContainer,
  BottomInnerContentsContainer,
  FieldContainer,
  InnerContainer,
  InputContainer,
  TimeInputContainer,
  VerticalBorder,
} from '../styles/StyledAutcion'
import DateGrid from '../../../../../components/DateGrid/DateGrid'
import AuctionTimeSection from './AuctionTimeSection'

/**
 * @description
 * 정책 관리 > 경매 시간 정책
 * @param  data 상세 데이터
 * @param getMorningValue 오전 경매 시각 상위 컴포넌트로 데이터 전달
 * @param getAfternoonValue 오전 경매 시각 상위 컴포넌트로 데이터 전달
 */
const AuctionBottomContents = ({ data, getMorningValue, getAfternoonValue }) => {
  return (
    <InnerContainer height={360}>
      <h1>경매 시간 정책</h1>
      <BottomContentsContainer>
        {/* 오전 경매 */}
        <AuctionTimeSection type={'morning'} data={data} getValue={(v) => getMorningValue(v)} />
        {/* 수직선 */}
        <VerticalBorder />
        {/* 오후 경매 */}
        <AuctionTimeSection type={'afternoon'} data={data} getValue={(v) => getAfternoonValue(v)} />
      </BottomContentsContainer>
    </InnerContainer>
  )
}

export default AuctionBottomContents
