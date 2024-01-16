import React, { useState } from 'react'
import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import SideBar from '../../../components/Left/SideBar'

/**
 * @description
 * 사이드바와 헤더 레이아웃 UI입니다.
 * @param sidebarTitle 큰 카테고리 텍스트입니다.
 * @param sidebarSubTitle 작은 카테고리 텍스트입니다.
 * @param children 내부 컴포넌트입니다.
 */
const CommonLayout = ({ sidebarTitle, sidebarSubTitle, children }) => {
  const [expanded, setExpanded] = useState(sidebarTitle)
  const [depth2Color, setDepth2Color] = useState(sidebarSubTitle)
  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>{children}</OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  )
}

export default CommonLayout
