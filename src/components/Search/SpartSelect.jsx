import useReactQuery from '../../hooks/useReactQuery'
import { getSPartList } from '../../api/search'
import { MainSelect } from '../../common/Option/Main'
import React from 'react'
import { PartWrap, PWRight } from '../../modal/External/ExternalFilter'

/**
 * TODO 제품군 (구분) 검색 components
 * @param value 제품군(구분) 값
 * @param onChange 제품군(구분) change 이벤트
 */
const SpartSelect = ({ value, onChange }) => {
  const { data: spartList } = useReactQuery('', 'getSpartList', getSPartList)
  return (
    <PartWrap first>
      <h6>구분</h6>
      <PWRight>
        <MainSelect
          name="spart"
          value={spartList?.filter(({ label }) => label === value)}
          options={spartList ? [{ label: '전체' }, ...spartList] : []}
          onChange={onChange}
        />
      </PWRight>
    </PartWrap>
  )
}

export default SpartSelect
