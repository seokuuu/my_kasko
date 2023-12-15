import { OverAllMain, OverAllSub, OverAllTable } from '../../../../common/Overall/Overall.styled'

import Header from '../../../../components/Header/Header'
import SubHeader from '../../../../components/Header/SubHeader'
import SideBar from '../../../../components/Left/SideBar'
import PopupPost from './PopupPost'

import { useState } from 'react'

/**
 * @description
 * 팝업 등록&수정 페이지
 * @param isRegister 등록 / 수정 페이지 여부
 */
const PopupPostPage = ({ isRegister }) => {
  const [expanded, setExpanded] = useState('운영 관리')
  const [depth2Color, setDepth2Color] = useState('노출 관리')
  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <PopupPost isRegister={isRegister} />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  )
}

export default PopupPostPage
