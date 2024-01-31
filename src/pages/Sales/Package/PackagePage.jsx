import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'

import SideBar from '../../../components/Left/SideBar'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import Package from './Package'

import { useState } from 'react'
import UserSalesWrapper from '../../../userpages/UserSales/_layouts/UserSalesWrapper'

const PackagePage = () => {
	const [expanded, setExpanded] = useState('상시 판매 관리')
	const [depth2Color, setDepth2Color] = useState('패키지')
	return (
		<UserSalesWrapper>
			<Header />
			<OverAllMain>
				<SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
				<OverAllSub>
					<SubHeader />
					<OverAllTable>
						<Package />
					</OverAllTable>
				</OverAllSub>
			</OverAllMain>
		</UserSalesWrapper>
	)
}

export default PackagePage
