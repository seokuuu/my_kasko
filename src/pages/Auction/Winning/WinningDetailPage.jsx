import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'
import { useEffect, useState } from 'react'

import SideBar from '../../../components/Left/SideBar'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import WinningDetail from './WinningDetail'
import { winningDetailAucNumAtom, winningDetailModal } from '../../../store/Layout/Layout'
import { useAtom } from 'jotai'

const WinningDetailPage = () => {
	const depth2Color = '경매 낙찰 관리'
	const [expanded, setExpanded] = useState('경매 관리')
	const [aucDetail, setAucDetail] = useAtom(winningDetailAucNumAtom) // 패키지 해당 row 값 저장

	const [aucDetailModal, setAucDetailModal] = useAtom(winningDetailModal) // 패키지 모달

	useEffect(() => {
		// 컴포넌트가 언마운트될 때 setDetailRow 재설정하는 정리 함수
		return () => {
			setAucDetailModal(false)
			setAucDetail('')
		}
	}, [])

	return (
		<>
			<Header />
			<OverAllMain>
				<SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
				<OverAllSub>
					<SubHeader />
					<OverAllTable>
						<WinningDetail detailRow={aucDetail} setAucDetail={setAucDetail} setDetailRow={setAucDetailModal} />
					</OverAllTable>
				</OverAllSub>
			</OverAllMain>
		</>
	)
}

export default WinningDetailPage
