const ProductSearchFields = ({ search, setSearch, customRenderProp }) => {
	//TODO Update this component to either have reusable logic or hooks.

	return customRenderProp ? customRenderProp({ search, setSearch }) : <></>
}

export default ProductSearchFields
