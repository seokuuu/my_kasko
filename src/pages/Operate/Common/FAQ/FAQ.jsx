import { useAtom, useAtomValue } from 'jotai'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFaqListQuery } from '../../../../api/operate/faq'
import { FaqListFieldCols, FaqListFields } from '../../../../constants/admin/Faq'
import useTablePaginationPageChange from '../../../../hooks/useTablePaginationPageChange'
import { add_element_field } from '../../../../lib/tableHelpers'
import { FilterContianer, TableContianer } from '../../../../modal/External/ExternalFilter'
import { doubleClickedRowAtom, selectedRowsAtom } from '../../../../store/Layout/Layout'
import Table from '../../../Table/Table'
import { searchCategoryOptions } from '../../constants'
import Header from './components/faq/Header'
import TableHeader from './components/faq/TableHeader'

/**
 * @description
 * FAQ 목록 컴포넌트
 */
const FAQ = ({}) => {
	const navigate = useNavigate()

	// 서버 옵션(요청 변수)
	const [search, setSearch] = useState({
		pageNum: 1,
		pageSize: 10,
		category: searchCategoryOptions[0],
		keyword: '',
	})
	// 셀 클릭시 테이블 상세 데이터 조회
	const [detailRow, setDetailsRow] = useAtom(doubleClickedRowAtom)
	// 테이블에서 선택된 값
	const selected = useAtomValue(selectedRowsAtom)
	// 목록 리스트
	const [rows, setRows] = useState([])
	// 목록 API
	const { data, refetch } = useFaqListQuery({ ...search, category: search.category.label })

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
						createDate: d.createDate ? moment(d.createDate).format('YYYY-MM-DD') : '-',
						id: data.list.length - (index + (search.pageNum - 1) * search.pageSize), // 순번 내림차순
						uid: d.uid,
				  }))
				: [],
		[data],
	)

	// 테이블 데이터 리스트 값 설정
	useEffect(() => {
		if (mappingData) {
			setRows(add_element_field(mappingData, FaqListFields))
		}
	}, [mappingData])

	// 상세 페이지 이동
	useEffect(() => {
		// 상세 페이지 이동시 상세 데이터 값 초기화
		if (detailRow && detailRow['고유값']) {
			navigate(`/operate/faq/${detailRow['고유값']}`)
			setDetailsRow([])
		}
	}, [detailRow])

	const { pagination, onPageChanage } = useTablePaginationPageChange(data, setSearch)
	return (
		<FilterContianer>
			{/* 헤더(카테고리탭 & 검색) */}
			<Header search={search} setSearch={setSearch} refetch={refetch} />
			{/* 테이블 */}
			<TableContianer>
				{/* 테이블 헤더 (목록 갯수 & 선택 갯수 * 삭제,등록 버튼) */}
				<TableHeader totalLength={data ? data.list.length : 0} selected={selected} refetch={refetch} />
				{/* 테이블 목록 */}
				<Table
					getCol={FaqListFieldCols}
					getRow={rows}
					setChoiceComponent={() => {}}
					tablePagination={pagination}
					onPageChange={onPageChanage}
				/>
			</TableContianer>
		</FilterContianer>
	)
}

export default FAQ
