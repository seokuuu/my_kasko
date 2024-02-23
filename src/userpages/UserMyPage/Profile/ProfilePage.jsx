import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'

import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import UserSideBar from '../../../components/Left/UserSideBar'

import { useState } from 'react'
import ProfileEdit from './Profile'

const ProfilePage = () => {
	const depth2Color = '개인정보수정'
	const [expanded, setExpanded] = useState('마이페이지')
	return (
		<>
			<Header />
			<OverAllMain>
				<UserSideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
				<OverAllSub>
					<SubHeader />
					<OverAllTable>
						<ProfileEdit />
					</OverAllTable>
				</OverAllSub>
			</OverAllMain>
		</>
	)
}

export default ProfilePage
