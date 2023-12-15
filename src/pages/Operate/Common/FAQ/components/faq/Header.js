import React, { useState } from 'react'
import { BlackBtn } from '../../../../../../common/Button/Button'
import { MainSelect } from '../../../../../../common/Option/Main'
import HeaderToggle from '../../../../../../components/Toggle/HeaderToggle'
import {
  FilterFooter,
  FilterHeader,
  FilterLeft,
  FilterSubcontianer,
  FilterWrap,
  Input,
  PartWrap,
  ResetImg,
  RowWrap,
} from '../../../../../../modal/External/ExternalFilter'
import { toggleAtom } from '../../../../../../store/Layout/Layout'
import CategoryTab from '../../../../UI/CategoryTab'
import { faqListSearchInitValue, normalTabOptions, searchCategoryOptions } from '../../../../constants'

/**
 * @description
 * faq 목록 헤더에서 사용되는 컴포넌트입니다.
 * @returns
 */
const Header = ({ search, setSearch, refetch }) => {
  const [exFilterToggle, setExfilterToggle] = useState(toggleAtom)
  const [toggleMsg, setToggleMsg] = useState('On')
  const [isRotated, setIsRotated] = useState(false)
  // const [isModal, setIsModal] = useAtom(blueModalAtom)

  const toggleBtnClick = () => {
    setExfilterToggle((prev) => !prev)
    if (exFilterToggle === true) {
      setToggleMsg('Off')
    } else {
      setToggleMsg('On')
    }
  }

  // 초기화
  const handleImageClick = () => {
    setIsRotated((prevIsRotated) => !prevIsRotated)
    refetch()
  }

  // 검색
  function searchHandler() {
    refetch()
    setSearch(faqListSearchInitValue)
  }

  // const modalOpen = () => {
  //   setIsModal(true)
  // }

  return (
    <div>
      <FilterHeader>
        <div style={{ display: 'flex' }}>
          <h1>일반 관리</h1>
          <CategoryTab options={normalTabOptions} highLightValue="faq" />
        </div>
        <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
      </FilterHeader>
      {exFilterToggle && (
        <FilterWrap>
          <FilterSubcontianer>
            <FilterLeft>
              <RowWrap>
                <PartWrap>
                  <h6>검색</h6>
                  <MainSelect
                    options={searchCategoryOptions}
                    defaultValue={searchCategoryOptions[0]}
                    value={search.category}
                    onChange={(e) => {
                      setSearch((p) => ({ ...p, category: e }))
                    }}
                  />
                  <Input
                    value={search.keyword}
                    onChange={(e) => setSearch((p) => ({ ...p, keyword: e.target.value }))}
                  />
                  {/* <GreyBtn style={{ width: '70px' }} height={35} margin={10} onClick={modalOpen}>
                    찾기
                  </GreyBtn> */}
                </PartWrap>
              </RowWrap>
            </FilterLeft>
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
              <BlackBtn width={100} height={40} onClick={searchHandler}>
                검색
              </BlackBtn>
            </div>
          </FilterFooter>
        </FilterWrap>
      )}
    </div>
  )
}

export default Header
