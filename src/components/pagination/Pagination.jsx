import React from 'react'
import { useState } from 'react'
import { styled, css } from 'styled-components'

const Pagination = ({ getRow }) => {
  // console.log(getRow)
  const [clickedItem, setClickedItem] = useState(null)

  const handleClick = (e) => {
    const value = e.target.getAttribute('data-value')
    console.log('Clicked value:', value)
    setClickedItem(value)
  }
  return (
    <Container>
      <Paginations>
        <ArrowImage src="/img/arrow_L2.png" data-value="arrow_L2" onClick={handleClick}></ArrowImage>
        <ArrowImage src="/img/arrow_L.png" data-value="arrow_L" onClick={handleClick}></ArrowImage>
        <Text data-value="1" onClick={handleClick} clicked={clickedItem === '1'}>
          1{' '}
        </Text>
        <Text data-value="2" onClick={handleClick} clicked={clickedItem === '2'}>
          2{' '}
        </Text>
        <Text data-value="3" onClick={handleClick} clicked={clickedItem === '3'}>
          3{' '}
        </Text>
        <Text data-value="4" onClick={handleClick} clicked={clickedItem === '4'}>
          4{' '}
        </Text>
        <Text data-value="5" onClick={handleClick} clicked={clickedItem === '5'}>
          5{' '}
        </Text>
        <ArrowImage src="/img/arrow_R.png" data-value="arrow_R" onClick={handleClick}></ArrowImage>
        <ArrowImage src="/img/arrow_R2.png" data-value="arrow_R2" onClick={handleClick}></ArrowImage>
      </Paginations>
    </Container>
  )
}

export default Pagination

const Container = styled.div`
  width: 100%;
  padding: 5px 0;
`

const Paginations = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const Text = styled.span`
  transition: all 0.1s ease;
  cursor: pointer;
  font-size: 15px;
  font-family: SUIT;
  padding: 0 5px;

  ${(props) =>
    props.clicked &&
    css`
      font-size: 1.5em;
    `}
`
const ArrowImage = styled.img`
  cursor: pointer;
  // 기타 스타일 설정
`
