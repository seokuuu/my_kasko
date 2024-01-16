import React from 'react'
import CommonLayout from '../UI/CommonLayout'
import FooterManage from './FooterManage'
const FooterManagePage = () => {
  return (
    <CommonLayout sidebarTitle={'운영 관리'} sidebarSubTitle={'푸터 관리'}>
      <FooterManage />
    </CommonLayout>
  )
}

export default FooterManagePage
