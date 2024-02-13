import React, { useEffect, useState } from 'react'
import { MainTabs, MainTabTitle, RightSub } from './MainPageStyled'
import { add_element_field } from '../../lib/tableHelpers'
import { MainProductFields, MainProductFieldsCols } from './MainProductFields'
import Table from '../../pages/Table/Table'

const FavoriteProduct = ({ list = null }) => {
	const [tabList, setTabList] = useState([])
	const [rows, setRows] = useState([])

	const tabHandler = (checkedName) => {
		const newTabList = tabList.map((item) =>
			item.name === checkedName ? { ...item, isCheck: true } : { ...item, isCheck: false },
		)
		setTabList(newTabList)
	}

	useEffect(() => {
		if (list && Array.isArray(list)) {
			const checkedTab = tabList.find((item) => item.isCheck)
			const products = list.filter((item) => item.favoriteName === checkedTab?.name).flatMap((item) => item.products)
			setRows(add_element_field(products, MainProductFields))
		}
	}, [tabList])

	useEffect(() => {
		if (list && Array.isArray(list)) {
			const tabs = list?.map((item, i) => ({
				name: item?.favoriteName,
				isCheck: i === 0,
			}))
			setTabList(tabs)
		}
	}, [list])

	return (
		<>
			<h1>선호하는 제품</h1>
			<RightSub>
				{tabList && (
					<MainTabs>
						{tabList?.map((item, i) => (
							<MainTabTitle key={i} isColor={!!item.isCheck} onClick={() => tabHandler(item.name)}>
								{item.name}
							</MainTabTitle>
						))}
					</MainTabs>
				)}
				<div>
					<Table getRow={rows} getCol={MainProductFieldsCols} />
				</div>
			</RightSub>
		</>
	)
}

export default FavoriteProduct
