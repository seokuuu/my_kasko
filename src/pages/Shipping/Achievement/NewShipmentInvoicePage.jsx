import { useState } from 'react'
import Header from '../../../components/Header/Header'
import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'
import SideBar from '../../../components/Left/SideBar'
import SubHeader from '../../../components/Header/SubHeader'
import NewShipmentInvoice from './NewShipmentInvoice'

const NewShipmentInvoicePage = () => {
	const depth2Color = '출고 실적'
	const [expanded, setExpanded] = useState('출고 관리')
	return (
		<>
			<Header />
			<OverAllMain>
				<SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
				<OverAllSub>
					<SubHeader />
					<OverAllTable>
						<NewShipmentInvoice />
					</OverAllTable>
				</OverAllSub>
			</OverAllMain>
		</>
	)
}

export default NewShipmentInvoicePage
