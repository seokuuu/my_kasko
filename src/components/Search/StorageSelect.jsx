import { MainSelect } from '../../common/Option/Main'
import React from 'react'
import useReactQuery from '../../hooks/useReactQuery'
import { getStorageList } from '../../api/search'
import { PartWrap, PWRight } from '../../modal/External/ExternalFilter'

/**
 * TODO 창고 검색 components
 * @param value 창고
 * @param onChange 창고 change 이벤트
 */
const StorageSelect = ({ value, onChange }) => {
  const { data: storageList } = useReactQuery('', 'getStorageList', getStorageList)

  return (
    <PartWrap>
      <h6>창고 구분</h6>
      <PWRight>
        <MainSelect
          name="storage"
          value={storageList?.filter(({ label }) => label === value)}
          options={storageList ? [{ label: '전체' }, ...storageList] : []}
          onChange={onChange}
        />
      </PWRight>
    </PartWrap>
  )
}

export default StorageSelect
