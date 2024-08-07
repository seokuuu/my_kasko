import { useAtom } from 'jotai'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNoticeBoardListQuery, useNoticeBoardRemoveMutation } from '../../../../api/operate/noticeBoard'
import { NoticeBoardListFieldCols, NoticeBoardListFields } from '../../../../constants/admin/NoticeBoard'
import useTablePaginationPageChange from '../../../../hooks/useTablePaginationPageChange'
import useTableSelection from '../../../../hooks/useTableSelection'
import { add_element_field } from '../../../../lib/tableHelpers'
import { FilterContianer, TableContianer } from '../../../../modal/External/ExternalFilter'
import useAlert from '../../../../store/Alert/useAlert'
import { doubleClickedRowAtom } from '../../../../store/Layout/Layout'
import Table from '../../../Table/Table'
import CommonHeader from '../../UI/CommonHeader'
import CommonTableHeader from '../../UI/CommonTableHeader'
import { exposureTabOptions, noticeBoardListSearchInitValue, noticeBoardSearchCategoryOptions } from '../../constants'

/**
 * @description
 * 전광판 관리 목록 내부 컴포넌트입니다.
 */
const NoticeBoard = () => {
	const navigate = useNavigate()

	// 서버 옵션(요청 변수)
	const [search, setSearch] = useState(noticeBoardListSearchInitValue)
	// 셀 클릭시 테이블 상세 데이터 조회
	const [detailRow, setDetailsRow] = useAtom(doubleClickedRowAtom)
	// 테이블에서 선택된 값,선택된 데이터 갯수
	const { selectedData, selectedCount } = useTableSelection()
	// 목록 리스트
	const [rows, setRows] = useState([])
	// 팝업 모달 여닫이 여부 & 팝업 타입 설정(보내는 값에 따라 팝업 내용이 달라짐.)
	const { simpleConfirm, simpleAlert } = useAlert()

	// 전광판 목록 API
	const { data, refetch } = useNoticeBoardListQuery({
		...search,
		// category: search.category.label,
	})

	// 전광판 삭제 API
	const { mutate } = useNoticeBoardRemoveMutation()

	// 등록 핸들러
	function toRegister() {
		navigate(`/operate/noticeBoard/register`)
	}

	// 삭제 핸들러
	function removeEventHandler() {
		if (!selectedCount && selectedCount === 0) return simpleAlert('삭제할 목록을 선택해주세요.')

		simpleConfirm('삭제하시겠습니까?', () => mutate(selectedData.map((s) => s['고유값'])))
	}
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
						id: data.pagination.listCount - (index + (search.pageNum - 1) * search.pageSize), // 순번 내림차순
						uid: d.uid,
						status: d.status ? 'Y' : 'N',
				  }))
				: [],
		[data],
	)

	// 테이블 데이터 리스트 값 설정
	useEffect(() => {
		if (mappingData) {
			setRows(add_element_field(mappingData, NoticeBoardListFields))
		}
	}, [mappingData])

	// 상세 페이지 이동
	useEffect(() => {
		// 상세 페이지 이동시 상세 데이터 값 초기화
		if (detailRow && detailRow['고유값']) {
			navigate(`/operate/noticeBoard/${detailRow['고유값']}`)

			setDetailsRow([])
		}
	}, [detailRow])

	const { pagination, onPageChanage } = useTablePaginationPageChange(data, setSearch)
	return (
		<FilterContianer>
			{/* 헤더(카테고리탭 & 검색) */}
			<CommonHeader
				search={search}
				setSearch={setSearch}
				refetch={refetch}
				searchInitValue={noticeBoardListSearchInitValue}
				tabHighlightValue={'noticeboard'}
				searchCategoryOptions={noticeBoardSearchCategoryOptions}
				categoryTabOptions={exposureTabOptions}
			/>

			<TableContianer>
				{/* 테이블 헤더 */}
				<CommonTableHeader
					totalLength={data ? data.list.length : 0}
					selected={selectedData}
					removeEventHandler={removeEventHandler}
					toRegister={toRegister}
					title={'전광판'}
					selectedLength={selectedCount}
					setState={setSearch}
				/>
				{/* 테이블 */}
				<Table
					getCol={NoticeBoardListFieldCols}
					getRow={rows}
					setChoiceComponent={() => {}}
					tablePagination={pagination}
					onPageChange={onPageChanage}
				/>
			</TableContianer>
		</FilterContianer>
	)
}

export default NoticeBoard
