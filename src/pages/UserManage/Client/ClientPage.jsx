import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'

import { useAtom } from 'jotai'
import { useState } from 'react'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import SideBar from '../../../components/Left/SideBar'
import { clientEditModalAtom, clientPostModalAtom } from '../../../store/Layout/Layout'
import Client from './Client'

const ClientPage = () => {
  const [expanded, setExpanded] = useState('사용자 관리')
  const [depth2Color, setDepth2Color] = useState('고객사 관리')
  const [modal, setModal] = useAtom(clientEditModalAtom) // 수정 모달
  const [postModal, setPostModal] = useAtom(clientPostModalAtom)

  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <Client setModal={setModal} setPostModal={setPostModal} postModal={postModal} />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  )
}

export default ClientPage
