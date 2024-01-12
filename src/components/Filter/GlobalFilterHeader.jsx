import React from 'react'
import HeaderToggle from '../../components/Toggle/HeaderToggle'
import { FilterHeader } from '../../modal/External/ExternalFilter'
import { toggleAtom } from '../../store/Layout/Layout'
import { useAtom } from 'jotai'

/**
 * TODO 공통 Filter Header components
 * @param title 제목
 * @param enableSearchFilters 검색 필터 on/off 활성화 여부
 * @param subTitle null | components
 */
const GlobalFilterHeader = ({ title, enableSearchFilters = true, subTitle = null }) => {
  const [exFilterToggle, setExfilterToggle] = useAtom(toggleAtom)
  const toggleBtnClick = () => setExfilterToggle((prev) => !prev)

  return (
    <FilterHeader>
      <div style={{ display: 'flex' }}>
        <h1>{title}</h1>
        {subTitle && subTitle}
      </div>
      {enableSearchFilters && (
        <HeaderToggle
          exFilterToggle={exFilterToggle}
          toggleBtnClick={toggleBtnClick}
          toggleMsg={exFilterToggle ? 'On' : 'Off'}
        />
      )}
    </FilterHeader>
  )
}

export default GlobalFilterHeader
