import React, { useState } from 'react'
import HeaderToggle from '../../../../../components/Toggle/HeaderToggle'
import { FilterHeader, StyledHeading, SubTitle } from '../../../../../modal/External/ExternalFilter'
import { toggleAtom } from '../../../../../store/Layout/Layout'

const CategoryTab = ({ types, setTypes }) => {
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
    <div>
      <FilterHeader>
        <div style={{ display: 'flex' }}>
          <h1>운영 관리</h1>
          <SubTitle>
            <StyledHeading isActive={types === 'product'} onClick={() => setTypes('product')}>
              제품군 관리
            </StyledHeading>
            <StyledHeading isActive={types === 'policy'} onClick={() => setTypes('policy')}>
              정책 관리
            </StyledHeading>
            <StyledHeading isActive={types === 'storage'} onClick={() => setTypes('storage')}>
              창고 관리
            </StyledHeading>
          </SubTitle>
        </div>
        {/* 토글 쓰기 */}
        <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
      </FilterHeader>
    </div>
  )
}

export default CategoryTab
