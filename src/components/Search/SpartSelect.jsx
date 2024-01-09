import useReactQuery from '../../hooks/useReactQuery'
import { getSPartList } from '../../api/search'
import { MainSelect } from '../../common/Option/Main'
import React from 'react'

// TODO 제품군 (구분) 검색 components
const SpartSelect = ({ value, onChange }) => {
  const { data: spartList } = useReactQuery('', 'getSpartList', getSPartList)
  return (
    <MainSelect
      name="spart"
      value={spartList?.filter(({ label }) => label === value)}
      options={spartList ? [{ label: '전체' }, ...spartList] : []}
      onChange={onChange}
    />
  )
}

export default SpartSelect
