import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'

import SideBar from '../../../components/Left/SideBar'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import SellOrderDetail from './SellOrderDetail'

import { useState } from 'react'

const SellOrderDetailPage = () => {
	const depth2Color = '상시 판매 주문 확인 상세'
	const [expanded, setExpanded] = useState('상시 판매 관리')
	return (
		<>
			<Header />
			<OverAllMain>
				<SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
				<OverAllSub>
					<SubHeader />
					<OverAllTable>
						<SellOrderDetail />
					</OverAllTable>
				</OverAllSub>
			</OverAllMain>
		</>
	)
}

export default SellOrderDetailPage
