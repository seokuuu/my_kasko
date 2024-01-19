import { useSetAtom } from 'jotai'
import { kyuModalAtom } from '../../store/Layout/GlobalProductSearch'

//TODO 재사용하는 핸들러를 여기에 업데이트 해주세요
const ProductSearchFields = ({ search, setSearch, renderCustomSearchFields }) => {
	// 드롭다운 버튼 핸들러
	function commonDropdownButtonHandler(e, name) {
		setSearch((p) => ({ ...p, [name]: e }))
	}

	// 숫자 인풋 핸들러
	function commonNumInputHandler(e) {
		const { name, value } = e.target
		setSearch((p) => ({ ...p, [name]: value }))
	}

	// 규격 약호 모달
	const setIsKyuModal = useSetAtom(kyuModalAtom)

	// 규격 약호 핸들러
	function onSpecHandler(e, text) {
		const { tagName } = e.target
		if (tagName === 'IMG') {
			setIsKyuModal(false)
		} else {
			setSearch((p) => ({ ...p, spec: text }))
			setIsKyuModal(false)
		}
	}

	return renderCustomSearchFields ? (
		renderCustomSearchFields({
			search,
			setSearch,
			commonDropdownButtonHandler,
			commonNumInputHandler,
			onSpecHandler,
		})
	) : (
		<></>
	)
}

export default ProductSearchFields
