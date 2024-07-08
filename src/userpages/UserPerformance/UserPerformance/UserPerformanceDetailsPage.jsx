import { useState } from 'react'
import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import UserPerformanceDetails from './UserPerformanceDetails'
import UserSideBar from '../../../components/Left/UserSideBar'

const UserPerformanceDetailsPage = () => {
	const depth2Color = '출고 실적 조회'
	const [expanded, setExpanded] = useState('출고 실적 조회')
	return (
		<>
			<Header />
			<OverAllMain>
				<UserSideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
				<OverAllSub>
					<SubHeader />
					<OverAllTable>
						<UserPerformanceDetails />
					</OverAllTable>
				</OverAllSub>
			</OverAllMain>
		</>
	)
}

export default UserPerformanceDetailsPage
