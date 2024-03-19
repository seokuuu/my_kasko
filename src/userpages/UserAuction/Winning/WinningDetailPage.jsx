import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'

import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import UserSideBar from '../../../components/Left/UserSideBar'
import Winning from './Winning'
import WinningDetail from './WinningDetail'

import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { doubleClickedRowAtom, winningDetailAucNumAtom, winningDetailModal } from '../../../store/Layout/Layout'

const WinningPage = () => {
	const [detailRow, setDetailRow] = useAtom(doubleClickedRowAtom)
	const [expanded, setExpanded] = useState('경매')
	const [depth2Color, setDepth2Color] = useState('낙찰 확인')
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
				<UserSideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
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

export default WinningPage
