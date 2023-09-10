import React from 'react'
import { styled } from 'styled-components'
import Countdown from '../Countdown/Countdown'

const SubHeader = () => {
  return (
    <SubHeaderContainer>
      <SubHeadLeft>[알림] 1회차 14:00시 경매 진행 중 입니다.</SubHeadLeft>
      <SubHeadRight>
        <Countdown />
      </SubHeadRight>
    </SubHeaderContainer>
  )
}

export default SubHeader

const SubHeaderContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0px 50px;
  justify-content: space-between;
  border: 1px solid #bfbfbf;
  background-color: white;
`

const SubHeadLeft = styled.div`
  color: red;
`

const SubHeadRight = styled.div`
  color: blue;
`
