import { useAtom } from 'jotai'
import React, { useEffect, useMemo, useState } from 'react'
import {
	useStorageDetailsQuery,
	useStorageListQuery,
	useStorageRegisterMutation,
	useStorageRemoveMutation,
	useStorageUpdateMutation,
} from '../../../../../api/operate/storage'
import { StorageFieldCols, StorageFields } from '../../../../../constants/admin/Storage'
import useTablePaginationPageChange from '../../../../../hooks/useTablePaginationPageChange'
import useTableSelection from '../../../../../hooks/useTableSelection'
import { add_element_field } from '../../../../../lib/tableHelpers'
import { TableContianer } from '../../../../../modal/External/ExternalFilter'
import AddProduct from '../../../../../modal/Operate/AddProduct'
import useAlert from '../../../../../store/Alert/useAlert'
import { btnCellUidAtom, operateAddAtom } from '../../../../../store/Layout/Layout'
import Table from '../../../../Table/Table'
import CommonTableHeader from '../../../UI/CommonTableHeader'
import { commonListSearchInitValue } from '../../../constants'

/**
 * @description
 * 창고 관리
 */
const Storage = () => {
	// 창고명(등록/수정)
	const [storage, setStorage] = useState('')

	// 서버 옵션(요청 변수)
	const [search, setSearch] = useState(commonListSearchInitValue)
	// 목록 리스트
	const [rows, setRows] = useState([])

	// 상세 ID
	// 상세 고유 번호
	const [uid, setUid] = useAtom(btnCellUidAtom)
	// 창고 관리 목록 API
	const { data, isLoading } = useStorageListQuery(search)
	// 창고 상세 API
	const { data: detailsData } = useStorageDetailsQuery(uid)
	// 창고 등록 API
	const { mutate: register } = useStorageRegisterMutation()
	// 창고 수정 API
	const { mutate: update } = useStorageUpdateMutation()
	// 창고 삭제 API
	const { mutate: remove } = useStorageRemoveMutation()
	// 테이블에서 선택된 값,선택된 데이터 갯수
	const { selectedData, selectedCount } = useTableSelection()
	// 모달
	const [modal, setModal] = useAtom(operateAddAtom)
	// 팝업 모달 여닫이 여부 & 팝업 타입 설정(보내는 값에 따라 팝업 내용이 달라짐.)
	const { simpleConfirm, simpleAlert } = useAlert()

	/**
	 * @constant
	 * @description
	 * 테이블 목록 데이터입니다.
	 * 순번 데이터 생성을 위해 기존 데이터를 원하는 방식으로 맵핑합니다.
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

	// 등록
	function productRegister() {
		register({ storage, address: '' })
		setStorage('')
		setModal(false)
	}

	// 수정
	function productUpdate() {
		update({ uid: detailsData.uid, storage, address: '' })
		setStorage('')
		setModal(false)
		setUid('')
	}
	// 삭제 핸들러
	function removeEventHandler() {
		if (!selectedCount && selectedCount === 0) return simpleAlert('삭제할 목록을 선택해주세요.')

		simpleConfirm('삭제하시겠습니까?', () => remove(selectedData.map((s) => s['고유값'])))
	}

	// 테이블 데이터 리스트 값 설정
	useEffect(() => {
		if (mappingData) {
			setRows(add_element_field(mappingData, StorageFields))
		}
	}, [mappingData])

	// 상세 데이터값 조회 및 모달 창 오픈
	useEffect(() => {
		if (Boolean(uid)) {
			setModal(true)
		}
	}, [uid])

	const { pagination, onPageChanage } = useTablePaginationPageChange(data, setSearch)
	return (
		<TableContianer>
			<CommonTableHeader
				title={'창고'}
				selectedLength={selectedCount}
				totalLength={data ? data.list.length : 0}
				toRegister={() => setModal(true)}
				removeEventHandler={removeEventHandler}
				setState={setSearch}
			/>
			<Table
				getCol={StorageFieldCols}
				getRow={rows}
				setChoiceComponent={() => {}}
				tablePagination={pagination}
				onPageChange={onPageChanage}
				noRowsMessage="고객 정보 목록이 비어있습니다."
				loading={isLoading}
			/>
			{modal && (
				<AddProduct
					initValue={detailsData && Boolean(uid) ? detailsData.storage : ''}
					title={detailsData ? '창고 수정' : '창고 추가'}
					contentTitle={'창고명 입력'}
					deliveryHandler={(v) => setStorage(v)}
					register={uid ? productUpdate : productRegister}
					// 등록과 수정을 구분하기 위해 => 초기화 해주지 않으면 등록을 눌렀을 때, detailsId 값으로 인해 수정이 되는 경우가 있을 수 있습니다.
					closeHandler={() => setUid('')}
				/>
			)}
		</TableContianer>
	)
}

export default Storage
