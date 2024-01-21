import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'

import SideBar from '../../../components/Left/SideBar'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import DisRegisterDetail from './DisRegisterDetail'

import { useState } from 'react'
import { useParams } from 'react-router-dom'

const DisRegisterDetailPage = () => {
	const { id } = useParams()
	const depth2Color = '배차/출고 등록'
	const [expanded, setExpanded] = useState('출고 관리')
	return (
		<>
			<Header />
			<OverAllMain>
				<SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
				<OverAllSub>
					<SubHeader />
					<OverAllTable>
						<DisRegisterDetail id={id} />
					</OverAllTable>
				</OverAllSub>
			</OverAllMain>
		</>
	)
}

export default DisRegisterDetailPage
