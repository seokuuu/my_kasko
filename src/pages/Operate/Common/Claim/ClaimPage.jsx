import CommonLayout from '../../UI/CommonLayout'
import Claim from './Claim'

/**
 * @description
 * 클레임 목록 패이지
 */
const ClaimPage = () => {
  return (
    <CommonLayout sidebarTitle={'운영 관리'} sidebarSubTitle={'일반 관리'}>
      <Claim />
    </CommonLayout>
  )
}

export default ClaimPage
