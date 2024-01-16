import React from 'react'
import CommonLayout from '../../UI/CommonLayout'
import NoticePost from './NoticePost'

/**
 * @description
 *  * 관리자 > 운영 관리 > 일반 관리 > 공지사항,자료실 상세 페이지입니다.
 */
const NoticeDetailsPage = ({ isRegister, title }) => {
  return (
    <CommonLayout sidebarTitle={'운영 관리'} sidebarSubTitle={'일반 관리'}>
      <NoticePost title={title} isRegister={isRegister} />
    </CommonLayout>
  )
}

export default NoticeDetailsPage
