import { useEffect, useState } from 'react'
import { FilterContianer } from '../../../../modal/External/ExternalFilter'
import AutionPolicy from './components/AutionPolicy'
import CategoryTab from './components/CategoryTab'
import ProductRange from './components/ProductRange'
import Storage from './components/Storage'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Operation = () => {
  // 쿼리 스트링 조회
  const [searchParams, setSearchParams] = useSearchParams()

  const category = searchParams.get('category')
  console.log('searchParams :', searchParams.get('category'))
  /**
   * @description
   * 카테고리에 따른 컴포넌트 맵핑
   */
  function mappingComponent() {
    switch (category) {
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

  // 처음 렌더링될 때, 제품군 관리 탭으로 이동할 수 있도록 쿼리스트링을 변경해줍니다.
  useEffect(() => {
    searchParams.set('category', 'product')
    setSearchParams(searchParams)
  }, [])

  return (
    <FilterContianer>
      {/* 카테고리 탭 */}
      <CategoryTab />

      {mappingComponent()}
    </FilterContianer>
  )
}

export default Operation
