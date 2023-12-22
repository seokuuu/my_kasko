import React from 'react'
import { Link } from 'react-router-dom'
import { SubTitle } from '../../../modal/External/ExternalFilter'

/**
 * @description
 * 운영관리 목록에서 카테고리를 구분하는 탭 컴포넌트입니다.
 * 여러 페이지에서 중복되어 컴포넌트로 구분해놓았습니다.
 * @param options 카테고리 옵션값
 * @param highLightValue 선택된 카테고리
 */

function CategoryTab({ options = [], highLightValue = '' }) {
  return (
    <SubTitle>
      {options.map((o, i) => (
        <Link key={i} to={o.link}>
          {o.value === highLightValue ? <h5>{o.text}</h5> : <h6>{o.text}</h6>}
        </Link>
      ))}
    </SubTitle>
  )
}

export default CategoryTab
