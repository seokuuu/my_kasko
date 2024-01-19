import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'

import SideBar from '../../../components/Left/SideBar'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import { useState } from 'react'
import ShipmentInvoice from './ShipmentInvoice'

const ShipmentInvoicePage = () => {
	const [expanded, setExpanded] = useState('출고 관리')
	const [depth2Color, setDepth2Color] = useState('출고 실적')
	return (
		<>
			<Header />
			<OverAllMain>
				<SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
				<OverAllSub>
					<SubHeader />
					<OverAllTable>
						<ShipmentInvoice />
					</OverAllTable>
				</OverAllSub>
			</OverAllMain>
		</>
	)
}

export default ShipmentInvoicePage
