import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'

import UserSideBar from '../../../components/Left/UserSideBar'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import DestinationEdit from './DestinationEdit'

import { useState } from 'react'

const DestinationEditPage = () => {
	const depth2Color = '목적지 관리'
	const [expanded, setExpanded] = useState('마이페이지')

	return (
		<>
			<Header />
			<OverAllMain>
				<UserSideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
				<OverAllSub>
					<SubHeader />
					<OverAllTable>
						<DestinationEdit />
					</OverAllTable>
				</OverAllSub>
			</OverAllMain>
		</>
	)
}

export default DestinationEditPage
