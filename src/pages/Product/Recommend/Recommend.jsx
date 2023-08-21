import React from 'react'
import { useState, useEffect } from 'react'

import Test3 from '../../Test/Test3'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { toggleAtom } from '../../../store/Layout/Layout'

import {
  FilterContianer,
  FilterHeader,
  TableContianer,
  SubTitle,
  TCSubContainer,
} from '../../../modal/External/ExternalFilter'
import { WhiteBlackBtn, WhiteRedBtn } from '../../../common/Button/Button'
import { Link } from 'react-router-dom'

import Hidden from '../../../components/TableInner/Hidden'

const Recommend = ({}) => {
  const handleSelectChange = (selectedOption, name) => {
    // setInput(prevState => ({
    //   ...prevState,
    //   [name]: selectedOption.label,
    // }));
  }
  const [isRotated, setIsRotated] = useState(false)

  // Function to handle image click and toggle rotation
  const handleImageClick = () => {
    setIsRotated((prevIsRotated) => !prevIsRotated)
  }

  // 토글 쓰기
  const [exFilterToggle, setExfilterToggle] = useState(toggleAtom)
  const [toggleMsg, setToggleMsg] = useState('On')
  const toggleBtnClick = () => {
    setExfilterToggle((prev) => !prev)
    if (exFilterToggle === true) {
      setToggleMsg('Off')
    } else {
      setToggleMsg('On')
    }
  }

  return (
    <FilterContianer>
      <FilterHeader>
        <div style={{ display: 'flex' }}>
          <h1>카스코 추천 제품 관리</h1>
          <SubTitle>
            <h5>단일</h5>
            <Link to={`/product/recommendpkg`}>
              <h6>패키지</h6>
            </Link>
          </SubTitle>
        </div>
      </FilterHeader>

      <TableContianer>
        <TCSubContainer bor>
          <div>
            조회 목록 (선택 <span>2</span> / 50개 )
            <Hidden />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}></div>
        </TCSubContainer>
        <TCSubContainer>
          <div>
            선택 중량<span> 2 </span>kg / 총 중량 kg
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteBlackBtn>
              <img src="/img/belly.png" /> 순서 변경
            </WhiteBlackBtn>
            <WhiteRedBtn>추천 상품 해제</WhiteRedBtn>
          </div>
        </TCSubContainer>
        <Test3 />
      </TableContianer>
    </FilterContianer>
  )
}

export default Recommend
