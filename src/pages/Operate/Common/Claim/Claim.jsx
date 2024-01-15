import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useClaimDeleteMutation, useClaimListQuery } from '../../../../api/operate/claim'
import { ClaimListFieldCols, ClaimListFields } from '../../../../constants/admin/Claim'
import { add_element_field } from '../../../../lib/tableHelpers'
import { FilterContianer, TableContianer } from '../../../../modal/External/ExternalFilter'
import {
	doubleClickedRowAtom,
	popupAtom,
	popupObject,
	popupTypeAtom,
	selectedRowsAtom,
} from '../../../../store/Layout/Layout'
import Table from '../../../Table/Table'
import CommonTableHeader from '../../UI/CommonTableHeader'
import { claimInitState } from '../../constants'
import ClaimHeader from './components/ClaimHeader'
import useTablePaginationPageChange from '../../../../hooks/useTablePaginationPageChange'

/**
 * @description
 * 클레임 관리 페이지 컴포넌트
 * @param {*} param0
 * @returns
 */
const Claim = () => {
	const navigate = useNavigate()

	// 테이블에서 선택된 값
	const selected = useAtomValue(selectedRowsAtom)
	// 선택된 데이터 갯수
	const selectedLength = useMemo(() => (selected ? selected.length : 0), [selected])

	// 목록 API(REQUEST PARAMETER)
	const [search, setSearch] = useState(claimInitState)

	// 셀 클릭시 테이블 상세 데이터 조회
	const [detailRow, setDetailsRow] = useAtom(doubleClickedRowAtom)

	// 삭제 API
	const { mutate: remove } = useClaimDeleteMutation()

	// 목록 리스트
	const [row, setRow] = useState([])

	// 팝업 모달 여닫이 여부 & 팝업 타입 설정(보내는 값에 따라 팝업 내용이 달라짐.)
	const [popupSwitch, setPopupSwitch] = useAtom(popupAtom)
	const setNowPopupType = useSetAtom(popupTypeAtom) // 팝업 타입
	const setNowPopup = useSetAtom(popupObject) // 팝업 객체

	// 목록 API
	const { data, refetch } = useClaimListQuery({ ...search, claimStatus: search.claimStatus.value })

	console.log('data :', data)

	// 등록 핸들러
	function toRegister() {
		navigate(`/operate/common/product`)
	}

	// 삭제 핸들러
	function removeEventHandler() {
		if (!selectedLength && selectedLength === 0) return alert('삭제할 목록을 선택해주세요.')
		setPopupSwitch(true)
		setNowPopupType(2)
		setNowPopup({
			num: '2-1',
			title: '삭제하시겠습니까?',
			next: '1-14',
			func() {
				if (selected && selected.length !== 0) {
					remove(selected.map((s) => s['고유값']))
					refetch()
				}
			},
		})
	}

	useEffect(() => {
		if (data) {
			setRow(add_element_field(data.list, ClaimListFields))
		}
	}, [data])
	// 상세 페이지 이동
	useEffect(() => {
		// 상세 페이지 이동시 상세 데이터 값 초기화
		if (detailRow && detailRow['고유값']) {
			navigate(`/operate/common/product/${detailRow['고유값']}`)

			setDetailsRow([])
		}
	}, [detailRow])

	const { pagination, onPageChanage } = useTablePaginationPageChange(data, setSearch)
	return (
		<FilterContianer>
			{/* 카테고리탭 & 검색필터 on & 검색 */}
			<ClaimHeader search={search} setSearch={setSearch} refetch={refetch} />
			<TableContianer>
				<CommonTableHeader
					totalLength={data && data.list.length}
					selectedLength={selectedLength}
					toRegister={toRegister}
					removeEventHandler={removeEventHandler}
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
