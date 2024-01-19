import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useClaimDeleteMutation, useClaimListQuery } from '../../../../api/operate/claim'
import { ClaimListFieldCols, ClaimListFields } from '../../../../constants/admin/Claim'
import useTablePaginationPageChange from '../../../../hooks/useTablePaginationPageChange'
import useTableSelection from '../../../../hooks/useTableSelection'
import { add_element_field } from '../../../../lib/tableHelpers'
import { FilterContianer, TableContianer } from '../../../../modal/External/ExternalFilter'
import useAlert from '../../../../store/Alert/useAlert'
import Table from '../../../Table/Table'
import CommonTableHeader from '../../UI/CommonTableHeader'
import { claimInitState } from '../../constants'
import ClaimHeader from './components/ClaimHeader'

/**
 * @description
 * 클레임 관리 페이지 컴포넌트
 */
const Claim = () => {
	const navigate = useNavigate()

	// 테이블에서 선택된 값,선택된 데이터 갯수
	const { selectedData, selectedCount } = useTableSelection()

	// 목록 API(REQUEST PARAMETER)
	const [search, setSearch] = useState(claimInitState)

	// 삭제 API
	const { mutate: remove } = useClaimDeleteMutation()

	// 목록 리스트
	const [row, setRow] = useState([])

	// 팝업 모달 여닫이 여부 & 팝업 타입 설정(보내는 값에 따라 팝업 내용이 달라짐.)
	const { simpleConfirm } = useAlert()
	// 목록 API
	const { data, refetch } = useClaimListQuery(search)
	const { pagination, onPageChanage } = useTablePaginationPageChange(data, setSearch)

	console.log('data :', data)

	// 등록 핸들러
	function toRegister() {
		navigate(`/operate/common/product`)
	}

	// 삭제 핸들러
	function removeEventHandler() {
		if (!selectedCount && selectedCount === 0) return alert('삭제할 목록을 선택해주세요.')
		simpleConfirm('삭제하시겠습니까?', () => remove(selectedData.map((s) => s['고유값'])))
	}

	const mappingData = useMemo(
		() =>
			data
				? data.list.map((d, index) => ({
						...d,
						id: data.pagination.listCount - (index + (search.pageNum - 1) * search.pageSize), // 순번 내림차순
				  }))
				: [],
		[data],
	)

	useEffect(() => {
		if (mappingData) {
			setRow(add_element_field(mappingData, ClaimListFields))
		}
	}, [mappingData])

	return (
		<FilterContianer>
			{/* 카테고리탭 & 검색필터 on & 검색 */}
			<ClaimHeader search={search} setSearch={setSearch} refetch={refetch} />
			<TableContianer>
				<CommonTableHeader
					totalLength={data && data.list.length}
					selectedLength={selectedCount}
					toRegister={toRegister}
					removeEventHandler={removeEventHandler}
					setState={setSearch}
				/>
				<Table
					getCol={ClaimListFieldCols}
					getRow={row}
					setChoiceComponent={() => {}}
					tablePagination={pagination}
					onPageChange={onPageChanage}
				/>
				{/* <Test3 title={'규격 약호 찾기'} /> */}
			</TableContianer>
		</FilterContianer>
	)
}

export default Claim
