import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'

import SideBar from '../../../components/Left/SideBar'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import Client from './Client'
import { useState } from 'react'
import ClientModal from './ClientModal'
import { useAtom } from 'jotai'
import { clientModalAtom } from '../../../store/Layout/Layout'

const ClientPage = () => {
  const [expanded, setExpanded] = useState('사용자 관리')
  const [depth2Color, setDepth2Color] = useState('고객사 관리')
  const [modal, setModal] = useAtom(clientModalAtom)

  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <Client setModal={setModal} />
            {modal && <ClientModal setModal={setModal} />}
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  )
}

export default ClientPage
