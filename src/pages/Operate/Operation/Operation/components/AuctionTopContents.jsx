import React, { useEffect, useState } from 'react'
import {
  AutionInput,
  FieldContainer,
  InnerContainer,
  InputContainer,
  TopContentsContainer,
} from '../styles/StyledAutcion'
import DateGrid from '../../../../../components/DateGrid/DateGrid'
import moment from 'moment'

/**
 * @description
 * @param 상세 데이터
 * 정책 관리 윗 컨텐츠
 */
const AuctionTopContents = ({ data, getValue }) => {
  const [weightForm, setWeightForm] = useState({
    weight: 0,
    date: '',
  })

  // 낙찰 중량 핸들러
  function commonInputHandler(e) {
    setWeightForm((p) => ({ ...p, weight: e.target.value }))
  }

  //적용 일자 핸들러
  function dateHandler(date) {
    setWeightForm((p) => ({ ...p, date }))
  }

  // 데이터 초깃값 바인딩
  useEffect(() => {
    if (data) {
      setWeightForm({
        weight: data.weight,
        date: moment(data.weightEffectDate).toDate(),
      })
    }
  }, [data])

  useEffect(() => {
    getValue(weightForm)
  }, [weightForm])

  return (
    <InnerContainer height={200}>
      <TopContentsContainer>
        {/* 낙찰 중량 */}
        <FieldContainer>
          <h2>낙찰 중량</h2>
          <InputContainer>
            <AutionInput type="number" width={290} value={weightForm.weight} onChange={commonInputHandler} />
            <span>(Kg)</span>
          </InputContainer>
        </FieldContainer>
        {/* 적용 일자 */}
        <FieldContainer>
          <h2>적용 일자</h2>
          <InputContainer>
            <DateGrid width={260} setStartDate={dateHandler} startDate={weightForm.date} />
          </InputContainer>
        </FieldContainer>
      </TopContentsContainer>
    </InnerContainer>
  )
}

export default AuctionTopContents
