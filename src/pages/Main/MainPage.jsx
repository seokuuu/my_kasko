import { OverAllMain, OverAllSub, OverAllTable } from '../../common/Overall/Overall.styled'

import SideBar from '../../components/Left/SideBar'
import Header from '../../components/Header/Header'
import SubHeader from '../../components/Header/SubHeader'

import { useState } from 'react'

const MainPage = () => {
	const depth2Color = ''
	const [expanded, setExpanded] = useState('')

	return (
		<>
			<Header />
			<OverAllMain>
				<SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
				<OverAllSub>
					<SubHeader />
					<OverAllTable>
						<div>메인 페이지입니다</div>
					</OverAllTable>
				</OverAllSub>
			</OverAllMain>
		</>
	)
}

export default MainPage
