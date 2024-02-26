import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'

import SideBar from '../../../components/Left/SideBar'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import SingleProduct from './SingleProduct'

import { useState } from 'react'

const SingleProductPage = () => {
	const depth2Color = '단일 제품 관리'
	const [expanded, setExpanded] = useState('판매 제품 관리')
	return (
		<>
			<Header />
			<OverAllMain>
				<SideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
				<OverAllSub>
					<SubHeader />
					<OverAllTable>
						<SingleProduct />
					</OverAllTable>
				</OverAllSub>
			</OverAllMain>
		</>
	)
}

export default SingleProductPage
