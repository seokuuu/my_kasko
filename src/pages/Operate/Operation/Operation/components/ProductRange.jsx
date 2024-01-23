import { useAtom } from 'jotai'
import React from 'react'
import { ProductRangeFieldCols } from '../../../../../constants/admin/ProductRange'
import useTableSelection from '../../../../../hooks/useTableSelection'
import { TableContianer } from '../../../../../modal/External/ExternalFilter'
import AddProduct from '../../../../../modal/Operate/AddProduct'
import useAlert from '../../../../../store/Alert/useAlert'
import { operateAddAtom } from '../../../../../store/Layout/Layout'
import Table from '../../../../Table/Table'
import CommonTableHeader from '../../../UI/CommonTableHeader'
import useProductRange from '../../../hook/useProductRange'
import useProductRangeList from '../../../hook/useProductRangeList'

/**
 * @description
 * 제품군 관리
 */
const ProductRange = () => {
	// 목록 관련 데이터 훅입니다.
	const { mappingData, rows, isLoading, setSearch, pagination, onPageChanage } = useProductRangeList()
	// 수정,등록,삭제,상세 관련 데이터 훅입니다.
	const { remove, detailsData, onSpartChange, initUid, onDetermineFunction } = useProductRange()
	// 모달(등록,수정 모달 & 확인 모달)
	const [modal, setModal] = useAtom(operateAddAtom)
	const { simpleConfirm, simpleAlert } = useAlert()
	// 테이블에서 선택된 값,선택된 데이터 갯수
	const { selectedData, selectedCount } = useTableSelection()
	// 삭제 핸들러
	function removeEventHandler() {
		if (!selectedCount && selectedCount === 0) return simpleAlert('삭제할 목록을 선택해주세요.')

		simpleConfirm('삭제하시겠습니까?', () => remove(selectedData.map((s) => s['고유값'])))
	}
	return (
		<TableContianer>
			<CommonTableHeader
				title={detailsData ? '제품군 수정' : '제품군 추가'}
				selectedLength={selectedCount}
				totalLength={mappingData ? mappingData.length : 0}
				toRegister={() => setModal(true)}
				removeEventHandler={removeEventHandler}
				setState={setSearch}
			/>
			<Table
				getCol={ProductRangeFieldCols}
				getRow={rows}
				setChoiceComponent={() => {}}
				tablePagination={pagination}
				onPageChange={onPageChanage}
				noRowsMessage="제품군 목록이 비어있습니다."
				loading={isLoading}
			/>
			{modal && (
				<AddProduct
					initValue={detailsData ? detailsData.spart : ''}
					title={'제품군 추가'}
					contentTitle={'제품군 입력'}
					deliveryHandler={onSpartChange}
					register={onDetermineFunction}
					// 등록과 수정을 구분하기 위해 => 초기화 해주지 않으면 등록을 눌렀을 때, detailsId 값으로 인해 수정이 되는 경우가 있을 수 있습니다.
					closeHandler={initUid}
				/>
			)}
		</TableContianer>
	)
}

export default ProductRange
