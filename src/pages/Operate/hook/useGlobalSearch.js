import { isEqual } from 'lodash'

/**
 * @description
 * 글로벌 검색 컴포넌트의 검색&초기화 함수
 * @param setSearch setState
 * @param refetch
 * @param initParams 페이지 번호와 페이지 사이즈이외에 초기화할 값들
 */
const useGlobalSearch = ({ setSearch, refetch, initParams = {} }) => {
	const paramData = {
		pageNum: 1,
		pageSize: 50,
		...initParams,
	}

	const globalProductResetOnClick = () => {
		// if resetting the search field shouldn't rerender table
		// then we need to create paramData object to reset the search fields.
		setSearch(paramData)
	}

	const globalProductSearchOnClick = (userSearchParam) => {
		setSearch((prevParam) => {
			if (isEqual(prevParam, { ...prevParam, ...userSearchParam })) {
				refetch()
				return prevParam
			}
			return {
				...prevParam,
				...userSearchParam,
			}
		})
	}

	return { globalProductSearchOnClick, globalProductResetOnClick }
}

export default useGlobalSearch
