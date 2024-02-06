import { useState } from 'react'
import { OverAllMain, OverAllSub, OverAllTable } from '../common/Overall/Overall.styled'
import UserSideBar from '../components/Left/UserSideBar'
import Header from '../components/Header/Header'
import SubHeader from '../components/Header/SubHeader'
import MainPageComponent from './UserMainPage/MainPageComponent'

const MainPage = () => {
	const depth2Color = ''
	const [expanded, setExpanded] = useState('')
	return (
		<>
			<Header />
			<OverAllMain>
				<UserSideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
				<OverAllSub>
					<SubHeader />
					<OverAllTable>
						<MainPageComponent />
					</OverAllTable>
				</OverAllSub>
			</OverAllMain>
		</>
	)
}

export default MainPage
