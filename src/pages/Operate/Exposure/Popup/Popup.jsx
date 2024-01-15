import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePopupListQuery, usePopupRemoveMutation } from '../../../../api/operate/popup'
import { PopupListFieldCols, PopupListFields } from '../../../../constants/admin/popup'
import { add_element_field } from '../../../../lib/tableHelpers'
import { FilterContianer, FilterHeader, TableContianer } from '../../../../modal/External/ExternalFilter'
import {
	doubleClickedRowAtom,
	popupAtom,
	popupObject,
	popupTypeAtom,
	selectedRowsAtom,
} from '../../../../store/Layout/Layout'
import Table from '../../../Table/Table'
import CategoryTab from '../../UI/CategoryTab'
import CommonTableHeader from '../../UI/CommonTableHeader'
import { commonListSearchInitValue, exposureTabOptions } from '../../constants'
import useTablePagination from '../../hook/useTablePaging'

/**
 * @description
 * 팝업 관리
 * @param {*} param0
 * @returns
 */
const Popup = ({}) => {
	const navigate = useNavigate()
	// 서버 옵션(요청 변수)
	const [search, setSearch] = useState(commonListSearchInitValue)
	// 셀 클릭시 테이블 상세 데이터 조회
	const [detailRow, setDetailsRow] = useAtom(doubleClickedRowAtom)
	// 테이블에서 선택된 값
	const selected = useAtomValue(selectedRowsAtom)
	// 목록 리스트
	const [rows, setRows] = useState([])
	// 팝업 모달 여닫이 여부 & 팝업 타입 설정(보내는 값에 따라 팝업 내용이 달라짐.)
	const [popupSwitch, setPopupSwitch] = useAtom(popupAtom)
	const setNowPopupType = useSetAtom(popupTypeAtom) // 팝업 타입
	const setNowPopup = useSetAtom(popupObject) // 팝업 객체

	// 팝업 목록 API
	const { data, refetch, isLoading } = usePopupListQuery(search)

	// 팝업 삭제 API
	const { mutate } = usePopupRemoveMutation()
	// 선택된 데이터 갯수
	const selectedLength = useMemo(() => (selected ? selected.length : 0), [selected])

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
						date:
							d.startDate && d.endDate
								? `${moment(d.startDate).format('YYYY-MM-DD')} ~ ${moment(d.endDate).format('YYYY-MM-DD')}`
								: '-',
						id: data.list.length - (index + (search.pageNum - 1) * search.pageSize), // 순번 내림차순
						uid: d.uid,
						status: d.status ? '노출' : '미노출',
				  }))
				: [],
		[data],
	)

	// 등록 핸들러
	function toRegister() {
		navigate(`/operate/exposure/register`)
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
					mutate(selected.map((s) => s['고유값']))
					refetch()
				}
			},
		})
	}
	// 테이블 데이터 리스트 값 설정
	useEffect(() => {
		if (mappingData) {
			setRows(add_element_field(mappingData, PopupListFields))
		}
	}, [mappingData])

	// 상세 페이지 이동
	useEffect(() => {
		// 상세 페이지 이동시 상세 데이터 값 초기화
		if (detailRow && detailRow['고유값']) {
			navigate(`/operate/exposure/${detailRow['고유값']}`)

			setDetailsRow([])
		}
	}, [detailRow])

	const { pagination, onPageChanage } = useTablePagination(data, setSearch)

	return (
		<FilterContianer>
			{/* 헤더(카테고리탭 & 검색) */}
			<FilterHeader>
				<div style={{ display: 'flex' }}>
					<h1>일반 관리</h1>
					<CategoryTab options={exposureTabOptions} highLightValue={'exposure'} />
				</div>
			</FilterHeader>

			<TableContianer>
				{/* 테이블 헤더 */}
				<CommonTableHeader
					totalLength={data ? data.list.length : 0}
					selected={selected}
					removeEventHandler={removeEventHandler}
					toRegister={toRegister}
					title={'팝업'}
					selectedLength={selectedLength}
				/>
				{/* 테이블 */}
				<Table
					getCol={PopupListFieldCols}
					loading={isLoading}
					getRow={rows}
					setChoiceComponent={() => {}}
					tablePagination={pagination}
					onPageChange={onPageChanage}
				/>
			</TableContianer>
		</FilterContianer>
	)
}

export default Popup
