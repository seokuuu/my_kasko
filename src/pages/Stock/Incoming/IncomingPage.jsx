import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'

import SideBar from '../../../components/Left/SideBar'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import Incoming from './Incoming'

import { useState } from 'react'
import { styled } from 'styled-components'

import { useAtom } from 'jotai'
import { rightArray } from '../../../store/Layout/Layout'
import Right from '../../../components/Right/Right'

const IncomingPage = () => {
	const [expanded, setExpanded] = useState('재고 관리')
	const [depth2Color, setDepth2Color] = useState('입고 관리')
	const [imageStates, setImageStates] = useAtom(rightArray)

	console.log('imageStates =>', imageStates)

	return (
		<>
			{(imageStates[0] || imageStates[1] || imageStates[3]) && <Header />}
			<OverAllMain>
				{(imageStates[0] || imageStates[2] || imageStates[3]) && (
					<SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
				)}
				<OverAllSub>
					<SubHeader />
					<OverAllTable>
						<Incoming />
					</OverAllTable>
					{/* <Right /> */}
				</OverAllSub>
			</OverAllMain>
		</>
	)
}

export default IncomingPage
