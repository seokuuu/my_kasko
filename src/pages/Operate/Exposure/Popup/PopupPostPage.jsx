import CommonLayout from '../../UI/CommonLayout'
import PopupPost from './PopupPost'

/**
 * @description
 * 팝업 등록&수정 페이지
 * @param isRegister 등록 / 수정 페이지 여부
 */
const PopupPostPage = ({ isRegister }) => {
  return (
    <CommonLayout sidebarTitle={'운영 관리'} sidebarSubTitle={'노출 관리'}>
      <PopupPost isRegister={isRegister} />
    </CommonLayout>
  )
}

export default PopupPostPage
