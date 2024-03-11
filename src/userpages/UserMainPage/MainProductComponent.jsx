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

const MainProductComponent = ({ products = null, packageList = null }) => {
	const [tab, setTap] = useState(true)
	const [productRows, setProductRows] = useState([])
	const [packageProductRows, setPackageProductRows] = useState([])

	useEffect(() => {
		if (products && Array.isArray(products)) {
			setProductRows(add_element_field(products, MainProductFields))
		}
		if (packageList && Array.isArray(packageList)) {
			setPackageProductRows(add_element_field(packageList, MainPackageProductFields))
		}
	}, [products, packageList])

	return (
		<>
			<h1>카스코 추천 제품</h1>
			<LeftSub1>
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
			</LeftSub1>
		</>
	)
}

export default MainProductComponent
