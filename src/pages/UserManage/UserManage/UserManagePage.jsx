import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'

import SideBar from '../../../components/Left/SideBar'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import UserManage from './UserManage'
import { useState } from 'react'
import UserPostPage from './UserPostPage'
import UserEditPage from './UserEditPage'
import UserPost from './UserPost'
import UserEdit from './UserEdit'

const UserManagePage = () => {
  const [expanded, setExpanded] = useState('사용자 관리')
  const [depth2Color, setDepth2Color] = useState('사용자 관리')
  const [choiceComponent, setChoiceComponent] = useState('리스트')

  const renderChoiceComponent = () => {
    switch (choiceComponent) {
      case '리스트':
        return <UserManage setChoiceComponent={setChoiceComponent} />
      case '등록':
        return <UserPost setChoiceComponent={setChoiceComponent} />
      case '수정':
        return <UserEdit setChoiceComponent={setChoiceComponent} />
      default:
        return <UserManage setChoiceComponent={setChoiceComponent} />
    }
  }
  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            {renderChoiceComponent()}
            {/* <UserManage /> */}
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  )
}

export default UserManagePage
