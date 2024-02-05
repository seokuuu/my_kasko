import { useCustomerMainPageQuery } from '../../api/mainPage/mainPage'
import Test3 from '../../pages/Test/Test3'
import { Bar } from '../../common/OnePage/OnePage.Styled'
import { useLoading } from '../../store/Loading/loadingAtom'
import { useEffect, useState } from 'react'
import { add_element_field } from '../../lib/tableHelpers'
import { ShippingRegisterFields } from '../../constants/admin/Shipping'
import { Left, LeftSub1, MainWrap, Title, RightSub, Right } from './MainPageStyled'
import MainNotice from './MainNotice'
import FavoriteProduct from './FavoriteProduct'
import MainProductComponent from './MainProductComponent'

const MainPageComponent = () => {
	const { data, isLoading } = useCustomerMainPageQuery()
	useLoading(isLoading)
	return (
		<MainWrap>
			<Left>
				<MainProductComponent products={data?.productList} packageList={data?.packageList} />
				<MainNotice notices={data?.notices} docs={data?.docs} />
			</Left>
			<Right>
				<FavoriteProduct list={data?.favoriteProductList} />
			</Right>
		</MainWrap>
	)
}

export default MainPageComponent
