import { LeftSub1, MainTabs, MainTabTitle } from './MainPageStyled'
import React, { useEffect, useState } from 'react'
import {
	MainPackageProductFields,
	MainPackageProductFieldsCols,
	MainProductFields,
	MainProductFieldsCols,
} from './MainProductFields'
import Table from '../../pages/Table/Table'
import { add_element_field } from '../../lib/tableHelpers'
import { useCustomerMainPageRecommendProductsQuery } from '../../api/mainPage/mainPage'
import { FadeLoader } from 'react-spinners'

const MainProductComponent = () => {
	const { data, isLoading } = useCustomerMainPageRecommendProductsQuery()
	const [tab, setTap] = useState(true)
	const [productRows, setProductRows] = useState([])
	const [packageProductRows, setPackageProductRows] = useState([])

	useEffect(() => {
		if (!data) return

		const products = data?.productList
		const packageList = data?.packageList
		if (products && Array.isArray(products)) {
			setProductRows(add_element_field(products, MainProductFields))
		}
		if (packageList && Array.isArray(packageList)) {
			setPackageProductRows(add_element_field(packageList, MainPackageProductFields))
		}
	}, [data])

	return (
		<>
			<h1>카스코 추천 제품</h1>
			<LeftSub1 style={{ position: 'relative' }}>
				<MainTabs>
					<MainTabTitle isColor={!!tab} onClick={() => setTap(true)}>
						단일
					</MainTabTitle>
					<MainTabTitle isColor={!tab} onClick={() => setTap(false)}>
						패키지
					</MainTabTitle>
				</MainTabs>
				<div>
					{tab ? (
						<Table hei={60} getRow={productRows} getCol={MainProductFieldsCols} />
					) : (
						<Table hei={60} getRow={packageProductRows} getCol={MainPackageProductFieldsCols} />
					)}
				</div>
				{isLoading && (
					<div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
						<FadeLoader color="#4C83D6" size={20} />
					</div>
				)}
			</LeftSub1>
		</>
	)
}

export default MainProductComponent
