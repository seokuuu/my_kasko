import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'
import { useEffect } from 'react'

import SideBar from '../../../components/Left/SideBar'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import Winning from './Winning'
import WinningDetail from './WinningDetail'
import { doubleClickedRowAtom } from '../../../store/Layout/Layout'

import { useState } from 'react'
import { useAtom } from 'jotai'

const WinningPage = () => {
	const [expanded, setExpanded] = useState('경매 관리')
	const [depth2Color, setDepth2Color] = useState('경매 낙찰 관리')
	const [detailRow, setDetailRow] = useAtom(doubleClickedRowAtom)

	useEffect(() => {
		// 컴포넌트가 언마운트될 때 setDetailRow 재설정하는 정리 함수
		return () => {
			setDetailRow(false)
		}
	}, [])

	console.log('detailRow', detailRow)
	return (
		<>
			<Header />
			<OverAllMain>
				<SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
				<OverAllSub>
					<SubHeader />
					<OverAllTable>
						{detailRow && detailRow['경매 번호'] ? (
							<WinningDetail detailRow={detailRow} setDetailRow={setDetailRow} />
						) : (
							<Winning detailRow={detailRow} />
						)}
					</OverAllTable>
				</OverAllSub>
			</OverAllMain>
		</>
	)
}

export default WinningPage
