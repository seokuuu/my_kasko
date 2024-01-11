import { DoubleWrap } from '../../modal/External/ExternalFilter'
import React from 'react'

/**
 * TODO 제품 번호 검색 components
 * @param value 제품번호
 * @param onChange 제품번호 change 이벤트
 */
const ProductNumberListSearch = ({ value, onChange }) => {
  return (
    <DoubleWrap>
      <h6>제품 번호</h6>
      <textarea
        value={value}
        onChange={onChange}
        placeholder='복수 조회 진행 &#13;&#10;  제품 번호 "," 혹은 enter로 &#13;&#10;  구분하여 작성해주세요.'
      />
    </DoubleWrap>
  )
}

export default ProductNumberListSearch
