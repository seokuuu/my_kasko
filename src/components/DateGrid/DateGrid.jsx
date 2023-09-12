import React, { useState } from 'react'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { styled } from 'styled-components'

const DateGrid = ({ left, bgColor, fontSize, width, height }) => {
  const [startDate, setStartDate] = useState(new Date())
  return (
    <>
      <label>
        <PickerWrap height={height} width={width} left={left} bgColor={bgColor}>
          <SDatePicker
            fontSize={fontSize}
            dateFormat="yyyy년 MM월 dd일"
            selected={startDate}
            width={width}
            onChange={(date) => setStartDate(date)}
          />
          <PickerImg onChange={(date) => setStartDate(date)} src="/svg/Calender.svg" />
        </PickerWrap>
      </label>
    </>
  )
}

export default DateGrid

const PickerWrap = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  min-width: ${(props) => (props.width ? `${props.width}px` : '180px')};
  height: ${(props) => (props.height ? `${props.height}px` : '37px')};
  border: 1px solid #c8c8c8;
  left: ${(props) => props.left}px;
  background-color: ${(props) => props.bgColor};
  align-items: center;
`

const SDatePicker = styled(DatePicker)`
  width: ${(props) => (props.width ? `${props.width}px` : '140px')};
  height: 25px;
  align-items: center;
  position: relative;
  font-size: ${(props) => props.fontSize}px;
  outline: none;
  .react-datapicker-wrapper {
    display: flex;
  }
`

const PickerImg = styled.img`
  position: relative;
  right: 5px;
  width: 20px;

  cursor: pointer;
`
