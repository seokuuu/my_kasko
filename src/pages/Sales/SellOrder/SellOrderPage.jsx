import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'

import SideBar from '../../../components/Left/SideBar'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import SellOrder from './SellOrder'
import SellOrderDetail from './SellOrderDetail'

import { useState } from 'react'

const SellOrderPage = () => {
	const depth2Color = '상시 판매 주문 확인'
	const [expanded, setExpanded] = useState('상시 판매 관리')
	const [choiceComponent, setChoiceComponent] = useState('리스트')

	const renderChoiceComponent = () => {
		switch (choiceComponent) {
			case '리스트':
				return <SellOrder setChoiceComponent={setChoiceComponent} />
			case 'cell':
				return <SellOrderDetail setChoiceComponent={setChoiceComponent} />
			default:
				return <SellOrder setChoiceComponent={setChoiceComponent} />
		}
	}

	return (
		<>
			<Header />
			<OverAllMain>
				<SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
				<OverAllSub>
					<SubHeader />
					<OverAllTable>{renderChoiceComponent()}</OverAllTable>
				</OverAllSub>
			</OverAllMain>
		</>
	)
}

export default SellOrderPage
