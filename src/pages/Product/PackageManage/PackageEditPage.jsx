import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'
import { useAtom } from 'jotai'
import SideBar from '../../../components/Left/SideBar'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import PackageEdit from './PackageEdit'
import { useState } from 'react'

const PackageEditPage = () => {
  const [expanded, setExpanded] = useState('판매 제품 관리')
  const [depth2Color, setDepth2Color] = useState('패키지 관리')

  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <PackageEdit />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  )
}

export default PackageEditPage
