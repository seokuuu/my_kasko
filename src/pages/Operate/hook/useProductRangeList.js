import { useEffect, useMemo, useState } from 'react'
import { useProductRangeListQuery } from '../../../api/operate/productRange'
import { ProductRangeFields } from '../../../constants/admin/ProductRange'
import useTablePaginationPageChange from '../../../hooks/useTablePaginationPageChange'
import { add_element_field } from '../../../lib/tableHelpers'
import { commonListSearchInitValue } from '../constants'

/**
 * @description
 * 제품군 관리 목록에 관련된 데이터들입니다.*
 */
const useProductRangeList = () => {
	// 서버 옵션(요청 변수)
	const [search, setSearch] = useState(commonListSearchInitValue)
	// 제품군 관리 목록 API
	const { data, refetch, isLoading } = useProductRangeListQuery(search)
	// 페이지네이션
	const { pagination, onPageChanage } = useTablePaginationPageChange(data, setSearch)
	// 목록 리스트
	const [rows, setRows] = useState([])

	/**
	 * @constant
	 * @description
	 * 테이블 목록 데이터입니다.
	 * 날짜 포멧과 순번 데이터 생성을 위해 기존 데이터를 원하는 방식으로 맵핑합니다.
	 */
	const mappingData = useMemo(
		() =>
			data
				? data.list.map((d, index) => ({
						...d,
						id: data.pagination.listCount - (index + (search.pageNum - 1) * search.pageSize), // 순번 내림차순
						uid: d.uid,
				  }))
				: [],
		[data],
	)

	// 테이블 데이터 리스트 값 설정
	useEffect(() => {
		if (mappingData) {
			setRows(add_element_field(mappingData, ProductRangeFields))
		}
	}, [mappingData])
	return { mappingData, refetch, isLoading, rows, setSearch, pagination, onPageChanage }
}

export default useProductRangeList
