import FavoriteProduct from './FavoriteProduct'
import MainNotice from './MainNotice'
import { Left, MainWrap, Right } from './MainPageStyled'
import MainProductComponent from './MainProductComponent'

const MainPageComponent = () => {
	return (
		<MainWrap>
			<Left>
				<MainProductComponent />
				<MainNotice />
			</Left>
			<Right>
				<FavoriteProduct />
			</Right>
		</MainWrap>
	)
}

export default MainPageComponent
