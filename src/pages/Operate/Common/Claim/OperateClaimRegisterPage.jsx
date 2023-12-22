import React, { useState } from 'react'
import { OverAllMain, OverAllSub } from '../../../../common/Overall/Overall.styled'
import Header from '../../../../components/Header/Header'
import SubHeader from '../../../../components/Header/SubHeader'
import SideBar from '../../../../components/Left/SideBar'
import OperateClaimRegister from './OperateClaimRegister'

/**
 * @description
 * 클레임 등록 페이지
 */
const OperateClaimRegisterPage = ({ pageType }) => {
  const [expanded, setExpanded] = useState('운영 관리')
  const [depth2Color, setDepth2Color] = useState('일반 관리')
  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
        <OverAllSub>
          <SubHeader />
          <OperateClaimRegister pageType={pageType} />
        </OverAllSub>
      </OverAllMain>
    </>
  )
}

export default OperateClaimRegisterPage
