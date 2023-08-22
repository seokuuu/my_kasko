import React, { useState } from 'react'
import styled from 'styled-components'
import { CheckBox } from './Checkbox'

export const RadioMainDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 17px;
`

export const RadioCircleDiv = styled.div`
  background-color: ${({ isChecked }) => (isChecked ? '#4c83d6' : '#cedcf2')};
  border-radius: 100%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #afc9f0;
`

export const RadioInnerCircleDiv = styled.div`
  background-color: #fff;
  border-radius: 100%;
  width: 10px;
  height: 10px;
`

// const [checkRadio, setCheckRadio] = useState(
//   Array.from({ length: 3 }, () => false)
// ); // 라디오 박스

// const [selectedRadio, setSelectedRadio] = useState('');
