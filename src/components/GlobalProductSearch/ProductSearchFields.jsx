const ProductSearchFields = ({ search, setSearch, customRenderProp }) => {
	//TODO Refactor this component to either have reusable logic or use hooks.

	return customRenderProp ? customRenderProp({ search, setSearch }) : <></>
}

export default ProductSearchFields
