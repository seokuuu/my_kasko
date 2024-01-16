import NoticeBoard from './NoticeBoard'

import CommonLayout from '../../UI/CommonLayout'

/**
 * @description
 * 관리자 > 운영 관리 > 노출 관리 > 전광판 관리 페이지입니다.
 * @returns
 */
const NoticeBoardPage = () => {
  return (
    <CommonLayout sidebarTitle={'운영 관리'} sidebarSubTitle={'노출 관리'}>
      <NoticeBoard />
    </CommonLayout>
  )
}

export default NoticeBoardPage
