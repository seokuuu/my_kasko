import React, { useState } from 'react'

import { OverAllMain, OverAllSub } from '../../../../common/Overall/Overall.styled'

import Header from '../../../../components/Header/Header'
import SubHeader from '../../../../components/Header/SubHeader'
import SideBar from '../../../../components/Left/SideBar'

import { useParams } from 'react-router-dom'
import FAQPost from './FAQPost'

const FAQPostPage = () => {
	const { id } = useParams()
	const [expanded, setExpanded] = useState('운영 관리')
	const [depth2Color, setDepth2Color] = useState('일반 관리')

	return (
		<>
			<Header />
			<OverAllMain>
				<SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
				<OverAllSub>
					<SubHeader />
					<FAQPost detailsId={id} />
				</OverAllSub>
			</OverAllMain>
		</>
	)
}

export default FAQPostPage
