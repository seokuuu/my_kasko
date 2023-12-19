import React, { useEffect, useState } from 'react'
import { DoubleWrap } from '../../modal/External/ExternalFilter'

/**
 * @description
 * 제품 번호
 * 목록 검색 필터에 주로 사용되는 UI
 * @param setState 상태값의 setState
 * @param valueName 상태값의 제품 번호 필터링한 배열 관련 키값
 */
const ProductNumber = ({ setState, valueName }) => {
  const [value, setValue] = useState('')

  function onChange(e) {
    setValue(e.target.value)
  }

  useEffect(() => {
    // 쉼표와 엔터를 기준으로 구분
    const splitValues = value.split(/,|\n/).map((item) => item.trim())

    setState((p) => ({ ...p, [valueName]: splitValues }))
  }, [value])

  return (
    <DoubleWrap>
      <h6>제품 번호 </h6>
      <textarea
        value={value}
        onChange={onChange}
        placeholder='복수 조회 진행 &#13;&#10;  제품 번호 "," 혹은 enter로 &#13;&#10;  구분하여 작성해주세요.'
        style={{ height: '100px' }}
      />
    </DoubleWrap>
  )
}

export default ProductNumber
