import React, { useState } from 'react'
import styled from 'styled-components'
import { CheckBox } from './Checkbox'

export const RadioMainDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
`

// Filter 전용 라디오
export const RadioCircleDiv = styled.div`
  background-color: ${({ isChecked, isWhite }) => (isChecked ? '#cedcf2' : isWhite ? 'white' : '#dbe2f0')};
  border-radius: 100%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${({ isChecked }) => (isChecked ? '2px solid #4c83d6' : '1px solid #b9b9b9')};

  cursor: pointer;
`

// Filter 전용 라디오
export const RadioInnerCircleDiv = styled.div`
  background-color: ${({ isChecked, isWhite }) => (isChecked ? '#4c83d6' : isWhite ? 'white' : '')};
  border-radius: 100%;
  width: 12px;
  height: 12px;
  justify-content: center;
  align-items: center;
  display: flex;
`

// const [checkRadio, setCheckRadio] = useState(
//   Array.from({ length: 3 }, () => false)
// ); // 라디오 박스

// const [selectedRadio, setSelectedRadio] = useState('');
