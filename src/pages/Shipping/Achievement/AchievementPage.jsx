import { useState } from 'react'
import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'
import SideBar from '../../../components/Left/SideBar'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import Achievement from './Achievement'

const AchievementPage = () => {
	const depth2Color = '출고 실적'
	const [expanded, setExpanded] = useState('출고 관리')
	return (
		<>
			<Header />
			<OverAllMain>
				<SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
				<OverAllSub>
					<SubHeader />
					<OverAllTable>
						<Achievement />
					</OverAllTable>
				</OverAllSub>
			</OverAllMain>
		</>
	)
}

export default AchievementPage
