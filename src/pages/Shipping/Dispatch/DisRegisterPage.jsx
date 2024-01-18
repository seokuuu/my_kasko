import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'

import SideBar from '../../../components/Left/SideBar'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import DisRegister from './DisRegister'
import { useEffect, useState } from 'react'
import { useAtom } from 'jotai/index'
import { doubleClickedRowAtom } from '../../../store/Layout/Layout'
import DisRegisterDetail from './DisRegisterDetail'

const DisRegisterPage = () => {
	const [expanded, setExpanded] = useState('출고 관리')
	const [depth2Color, setDepth2Color] = useState('배차/출고 등록')
	const [detailRow, setDetailRow] = useAtom(doubleClickedRowAtom)

	useEffect(() => {
		return () => {
			setDetailRow(false)
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
						{detailRow && detailRow['출고 고유번호'] ? (
							<DisRegisterDetail id={detailRow['출고 고유번호']} />
						) : (
							<DisRegister />
						)}
						{/*<DisRegisterStorage />*/}
					</OverAllTable>
				</OverAllSub>
			</OverAllMain>
		</>
	)
}

export default DisRegisterPage
