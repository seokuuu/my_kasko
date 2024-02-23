import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'

import SideBar from '../../../components/Left/SideBar'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import ClientDestination from './ClientDestination'
import { useState } from 'react'
import DestinationPost from './DestinationPost'

const ClientDestinationPage = () => {
	const [expanded, setExpanded] = useState('사용자 관리')
	const [depth2Color, setDepth2Color] = useState('고객사 목적지 관리')
	const [choiceComponent, setChoiceComponent] = useState('리스트')

	const renderChoiceComponent = () => {
		switch (choiceComponent) {
			case '리스트':
				return <ClientDestination setChoiceComponent={setChoiceComponent} />
			case '등록':
				return <DestinationPost setChoiceComponent={setChoiceComponent} />
			// case '수정':
			//   return <DestinationEdit setChoiceComponent={setChoiceComponent} />
			default:
				return <ClientDestination setChoiceComponent={setChoiceComponent} />
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
						{/* <ClientDestination /> */}
					</OverAllTable>
				</OverAllSub>
			</OverAllMain>
		</>
	)
}

export default ClientDestinationPage
