import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'

import UserSideBar from '../../../components/Left/UserSideBar'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import Winning from './Winning'
import WinningDetail from './WinningDetail'

import { useState } from 'react'
import { doubleClickedRowAtom } from '../../../store/Layout/Layout'
import { useAtom } from 'jotai'

const SinglePage = () => {
	const [detailRow, setDetailRow] = useAtom(doubleClickedRowAtom)
	const [expanded, setExpanded] = useState('경매')
	const [depth2Color, setDepth2Color] = useState('낙찰 확인')
	return (
		<>
			<Header />
			<OverAllMain>
				<UserSideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
				<OverAllSub>
					<SubHeader />
					<OverAllTable>
						{detailRow && detailRow['경매 번호'] ? (
							<WinningDetail detailRow={detailRow} />
						) : (
							<Winning detailRow={detailRow} />
						)}
					</OverAllTable>
				</OverAllSub>
			</OverAllMain>
		</>
	)
}

export default SinglePage
