import React, { useState } from 'react'
import { BlackBtn } from '../../../../../common/Button/Button'
import ProductNumber from '../../../../../components/ProductNumber/ProductNumber'
import HeaderToggle from '../../../../../components/Toggle/HeaderToggle'
import {
  FilterFooter,
  FilterHeader,
  FilterRight,
  FilterSubcontianer,
  FilterWrap,
  ResetImg,
} from '../../../../../modal/External/ExternalFilter'
import { toggleAtom } from '../../../../../store/Layout/Layout'
import { claimProductInitState } from '../../../constants'
import ClaimProductSearchFilter from './ClaimProductSearchFilter'

/**
 * @description
 * 클레임 상품 목록 헤더
 */
const ClaimProductHeader = ({ search, setSearch, refetch }) => {
  // 토글 쓰기
  const [exFilterToggle, setExfilterToggle] = useState(toggleAtom)
  const [toggleMsg, setToggleMsg] = useState('On')
  const [isRotated, setIsRotated] = useState(false)

  const toggleBtnClick = () => {
    setExfilterToggle((prev) => !prev)
    if (exFilterToggle === true) {
      setToggleMsg('Off')
    } else {
      setToggleMsg('On')
    }
  }

  // Function to handle image click and toggle rotation
  const handleImageClick = () => {
    setIsRotated((prevIsRotated) => !prevIsRotated)
    refetch()
  }

  return (
    <div>
      <FilterHeader>
        <div>
          <h1>클레임 등록할 제품 찾기</h1>
        </div>
        <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
      </FilterHeader>
      {exFilterToggle && (
        <FilterWrap>
          {/* 검색 필터 */}
          <FilterSubcontianer>
            {/* 좌 */}
            <ClaimProductSearchFilter search={search} setSearch={setSearch} />
            {/* 우 */}
            <FilterRight>
              {/* 제품 번호 */}
              <ProductNumber setState={setSearch} valueName={'productNumberList'} height="100%" />
            </FilterRight>
          </FilterSubcontianer>
          <FilterFooter>
            <div style={{ display: 'flex' }}>
              <p>초기화</p>
              <ResetImg
                src="/img/reset.png"
                style={{ marginLeft: '10px', marginRight: '20px' }}
                onClick={handleImageClick}
                className={isRotated ? 'rotate' : ''}
              />
            </div>
            <div style={{ width: '180px' }}>
              <BlackBtn
                width={100}
                height={40}
                onClick={() => {
                  refetch()
                  setSearch(claimProductInitState)
                }}
              >
                검색
              </BlackBtn>
            </div>
          </FilterFooter>
        </FilterWrap>
      )}
    </div>
  )
}

export default ClaimProductHeader
