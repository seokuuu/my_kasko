import { useState } from 'react'
import Header from '../../../components/Header/Header'
import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'
import UserSideBar from '../../../components/Left/UserSideBar'
import SubHeader from '../../../components/Header/SubHeader'
import UserInvoice from './UserInvoice'

const UserInvoicePage = () => {
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
						<UserInvoice />
					</OverAllTable>
				</OverAllSub>
			</OverAllMain>
		</>
	)
}

export default UserInvoicePage
