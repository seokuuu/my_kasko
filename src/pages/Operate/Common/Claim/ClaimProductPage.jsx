import React from 'react'
import CommonLayout from '../../UI/CommonLayout'
import ClaimProduct from './ClaimProduct'

/**
 * @description
 * 클레임 등록할 제품 찾기
 */
const ClaimProductPage = () => {
  return (
    <CommonLayout sidebarTitle={'운영 관리'} sidebarSubTitle={'일반 관리'}>
      <ClaimProduct />
    </CommonLayout>
  )
}

export default ClaimProductPage
