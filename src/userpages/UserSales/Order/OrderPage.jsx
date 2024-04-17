import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import UserSideBar from '../../../components/Left/UserSideBar'
import UserSalesWrapper from '../_layouts/UserSalesWrapper'
import Order from './Order'
import OrderDetail from './OrderDetail'

const OrderPage = () => {
	const [expanded, setExpanded] = useState('상시판매')
	const [depth2Color, setDepth2Color] = useState('주문확인')
	const { salesNumber, status, packageNumber } = useParams()

	return (
		<UserSalesWrapper>
			<Header />
			<OverAllMain>
				<UserSideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
				<OverAllSub>
					<SubHeader />
					<OverAllTable>
						{salesNumber ? (
							<OrderDetail salesNumber={salesNumber} status={status} packageNumber={packageNumber} />
						) : (
							<Order />
						)}
					</OverAllTable>
				</OverAllSub>
			</OverAllMain>
		</UserSalesWrapper>
	)
}

export default OrderPage
