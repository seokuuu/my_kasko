import { MainSelect } from '../../common/Option/Main'
import React from 'react'
import useReactQuery from '../../hooks/useReactQuery'
import { getStorageList } from '../../api/search'

// TODO 창고 검색 components
const StorageSelect = ({ value, onChange }) => {
  const { data: storageList } = useReactQuery('', 'getStorageList', getStorageList)

  return (
    <MainSelect
      name="storage"
      value={storageList?.filter(({ label }) => label === value)}
      options={storageList ? [{ label: '전체' }, ...storageList] : []}
      onChange={onChange}
    />
  )
}

export default StorageSelect
