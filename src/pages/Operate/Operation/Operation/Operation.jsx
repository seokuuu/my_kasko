import { useState } from 'react'
import { FilterContianer } from '../../../../modal/External/ExternalFilter'
import AutionPolicy from './components/AutionPolicy'
import CategoryTab from './components/CategoryTab'
import ProductRange from './components/ProductRange'
import Storage from './components/Storage'

const Operation = () => {
  // 카테고리
  const [types, setTypes] = useState('product')

  /**
   * @description
   * 카테고리에 따른 컴포넌트 맵핑
   */
  function mappingComponent() {
    switch (types) {
      case 'product':
        return <ProductRange />
      case 'policy':
        return <AutionPolicy />
      case 'storage':
        return <Storage />
      default:
        return <></>
    }
  }

  return (
    <FilterContianer>
      {/* 카테고리 탭 */}
      <CategoryTab types={types} setTypes={setTypes} />

      {mappingComponent()}
    </FilterContianer>
  )
}

export default Operation
