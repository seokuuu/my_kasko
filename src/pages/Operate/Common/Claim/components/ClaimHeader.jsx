import React, { useState } from 'react'
import { BlackBtn } from '../../../../../common/Button/Button'
import { MainSelect } from '../../../../../common/Option/Main'
import DateGrid from '../../../../../components/DateGrid/DateGrid'
import ProductNumber from '../../../../../components/ProductNumber/ProductNumber'
import HeaderToggle from '../../../../../components/Toggle/HeaderToggle'
import {
  FilterFooter,
  FilterHeader,
  FilterLeft,
  FilterRight,
  FilterSubcontianer,
  FilterWrap,
  GridWrap,
  PartWrap,
  ResetImg,
  RowWrap,
  Tilde,
} from '../../../../../modal/External/ExternalFilter'
import { toggleAtom } from '../../../../../store/Layout/Layout'
import CategoryTab from '../../../UI/CategoryTab'
import { claimInitState, claimSearchCategoryOptions, normalTabOptions } from '../../../constants'

const ClaimHeader = ({ search, setSearch, refetch }) => {
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

  const [isRotated, setIsRotated] = useState(false)

  // Function to handle image click and toggle rotation
  const handleImageClick = () => {
    setIsRotated((prevIsRotated) => !prevIsRotated)
    refetch()
  }

  // 검색 필터 날짜 핸들러
  function dateHandler(date, name) {
    setSearch((p) => ({ ...p, [name]: date }))
  }
  return (
    <div>
      <FilterHeader>
        <div style={{ display: 'flex' }}>
          <h1>일반 관리</h1>
          <CategoryTab options={normalTabOptions} highLightValue="claim" />
        </div>
        <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
      </FilterHeader>
      {exFilterToggle && (
        <FilterWrap>
          <FilterSubcontianer>
            <FilterLeft>
              <RowWrap>
                <PartWrap>
                  <h6>작성 일자</h6>
                  <GridWrap>
                    <DateGrid
                      bgColor={'white'}
                      fontSize={17}
                      startDate={search.startDate}
                      setStartDate={(date) => dateHandler(date, 'startDate')}
                    />
                    <Tilde>~</Tilde>
                    <DateGrid
                      bgColor={'white'}
                      fontSize={17}
                      startDate={search.endDate}
                      setStartDate={(date) => dateHandler(date, 'endDate')}
                    />
                  </GridWrap>
                </PartWrap>

                <PartWrap style={{ marginLeft: '20px' }}>
                  <h6>제품 상태</h6>
                  <MainSelect
                    options={claimSearchCategoryOptions}
                    defaultValue={claimSearchCategoryOptions[0]}
                    value={search.claimStatus}
                    onChange={(e) => setSearch((p) => ({ ...p, claimStatus: e }))}
                  />
                </PartWrap>
                <PartWrap />
              </RowWrap>
            </FilterLeft>
            <FilterRight>
              {/* 제품 번호 */}
              <ProductNumber setState={setSearch} valueName={'productNumberList'} />
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
                  setSearch(claimInitState)
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

export default ClaimHeader
