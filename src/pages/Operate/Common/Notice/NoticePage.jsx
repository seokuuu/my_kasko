import CommonLayout from '../../UI/CommonLayout'
import Notice from './Notice'

/**
 * @description
 * 관리자 > 운영 관리 > 일반 관리 > 공지사항,자료실 관리 입니다.
 */
const NoticePage = ({ title, detailsUrl }) => {
  return (
    <CommonLayout sidebarTitle={'운영 관리'} sidebarSubTitle={'일반 관리'}>
      <Notice title={title} detailsUrl={detailsUrl} />
    </CommonLayout>
  )
}

export default NoticePage
