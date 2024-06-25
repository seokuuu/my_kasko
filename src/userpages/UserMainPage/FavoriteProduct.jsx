import React, { useEffect, useState } from 'react'
import { MainTabs, MainTabTitle, RightSub } from './MainPageStyled'
import { add_element_field } from '../../lib/tableHelpers'
import { MainProductFields, MainProductFieldsCols } from './MainProductFields'
import Table from '../../pages/Table/Table'
import { FadeLoader } from 'react-spinners'
import { useCustomerMainPageFavoriteProductsQuery } from '../../api/mainPage/mainPage'

const FavoriteProduct = () => {
	const { data, isLoading } = useCustomerMainPageFavoriteProductsQuery()
	const [tabList, setTabList] = useState([])
	const [rows, setRows] = useState([])

	const tabHandler = (checkedName) => {
		const newTabList = tabList.map((item) =>
			item.name === checkedName ? { ...item, isCheck: true } : { ...item, isCheck: false },
		)
		setTabList(newTabList)
	}

	useEffect(() => {
		const list = data?.favoriteProductList
		if (list && Array.isArray(list)) {
			const checkedTab = tabList.find((item) => item.isCheck)
			const products = list.filter((item) => item.favoriteName === checkedTab?.name).flatMap((item) => item.products)
			setRows(add_element_field(products, MainProductFields))
		}
	}, [tabList])

	useEffect(() => {
		if (data) {
			const list = data?.favoriteNameList
			if (list && Array.isArray(list)) {
				const tabs = list?.map((item, i) => ({
					name: item,
					isCheck: i === 0,
				}))
				setTabList(tabs)
			}
		}
	}, [data])

	return (
		<>
			<h1>선호 제품 관리</h1>
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
				<div style={{ position: 'relative' }}>
					<Table getRow={rows} getCol={MainProductFieldsCols} />
					{isLoading && (
						<div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
							<FadeLoader color="#4C83D6" size={20} />
						</div>
					)}
				</div>
			</RightSub>
		</>
	)
}

export default FavoriteProduct
