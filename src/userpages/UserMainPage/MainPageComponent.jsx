import { useCustomerMainPageQuery } from '../../api/mainPage/mainPage'
import { useLoading } from '../../store/Loading/loadingAtom'
import FavoriteProduct from './FavoriteProduct'
import MainNotice from './MainNotice'
import { Left, MainWrap, Right } from './MainPageStyled'
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
