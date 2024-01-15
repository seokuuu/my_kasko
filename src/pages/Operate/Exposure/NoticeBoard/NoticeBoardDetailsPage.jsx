import React from 'react'
import CommonLayout from '../../UI/CommonLayout'
import NoticeBoardPost from './NoticeBoardPost'

/**
 * @description
 * 전광판 등록,수정페이지입니다.
 */
const NoticeBoardDetailsPage = () => {
  return (
    <CommonLayout sidebarTitle={'운영 관리'} sidebarSubTitle={'노출 관리'}>
      <NoticeBoardPost />
    </CommonLayout>
  )
}

export default NoticeBoardDetailsPage
