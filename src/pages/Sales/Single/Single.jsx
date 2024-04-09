import React, { useEffect, useState } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { isEqual } from 'lodash'
import { getSingleProducts, urls, useSingleProductViewStatusUpdate } from '../../../api/SellProduct'
import useReactQuery from '../../../hooks/useReactQuery'
import useAlert from '../../../store/Alert/useAlert'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import SingleProductSearchFields from './SingleProductSearchFields'
import TableV2ExcelDownloader from '../../Table/TableV2ExcelDownloader'
import { CAUTION_CATEGORY, CautionBox } from '../../../components/CautionBox'
import SalesPackage from '../../../modal/Multi/SalesPackage'
import { BlackBtn, WhiteBlackBtn } from '../../../common/Button/Button'
import { responseToTableRowMap, singleProductListFieldCols } from '../../../constants/admin/singleProduct'
import { salesPackageModal, selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'
import {
	FilterContianer,
	FilterHeader,
	TableBottomWrap,
	TableContianer,
	TCSubContainer,
} from '../../../modal/External/ExternalFilter'
import useTableData from '../../../hooks/useTableData'
import useTableSelection from '../../../hooks/useTableSelection'
import TableV2 from '../../Table/TableV2'
import TableV2HiddenSection from '../../Table/TableV2HiddenSection'

const initialParamState = {
	pageNum: 1,
	pageSize: 50,
	type: '단일',
	saleType: '상시판매 대상재',
}

const Single = () => {
	const { simpleAlert } = useAlert()

	const checkBoxSelect = useAtomValue(selectedRowsAtom)
	const [isEditStatusModal, setIsEditStatusModal] = useAtom(salesPackageModal)

	const [checkRadio, setCheckRadio] = useState(null)
	const [exFilterToggle, setExfilterToggle] = useState(toggleAtom)
	const [toggleMsg, setToggleMsg] = useState('On')

	const [param, setParam] = useState(initialParamState)
	const [serverData, setServerData] = useState({ list: [], pagination: {} })

	const {
		isLoading,
		isError,
		data: getSingleProductsRes,
		isSuccess,
		refetch,
	} = useReactQuery(param, 'getSingleProducts', getSingleProducts)

	const {
		// prettier-ignore
		mutate: mutateSingleProductViewStatusUpdate,
		isSuccess: isSuccessSingleProductViewStatusUpdate,
	} = useSingleProductViewStatusUpdate()

	const { tableRowData, paginationData, totalWeight, totalCount } = useTableData({
		tableField: responseToTableRowMap,
		serverData,
	})

	// 선택 항목
	const { selectedWeightStr, selectedCountStr } = useTableSelection({
		weightKey: '중량',
	})

	// 토글 쓰기
	const toggleBtnClick = () => {
		setExfilterToggle((prev) => !prev)
		setToggleMsg(exFilterToggle ? 'Off' : 'On')
	}

	const handleTablePageSize = (event) => {
		setParam((prevParam) => ({
			...prevParam,
			pageSize: Number(event.target.value),
			pageNum: 1,
		}))
	}

	const onPageChange = (value) => {
		setParam((prevParam) => ({
			...prevParam,
			pageNum: Number(value),
		}))
	}

	// 노출 상태 변경 버튼
	const editStatusButtonOnClickHandler = () => {
		if (checkBoxSelect === null || checkBoxSelect.length === 0) {
			return simpleAlert('노출상태를 변경할 제품을 선택해 주세요.')
		}
		setIsEditStatusModal(true)
	}

	// 노출 상태 변경 모달 > 확인 버튼
	const editStatusModalConfirmButtonOnClickHandler = (checkRadio) => {
		setCheckRadio(checkRadio[0])

		const productNumbers = checkBoxSelect.map((item) => item['제품번호'])

		setServerData({
			list: serverData.list.map((item) => {
				if (productNumbers.includes(item.number)) {
					return { ...item, viewStatus: checkRadio[0] }
				}
				return item
			}),
			pagination: serverData.pagination,
		})

		setIsEditStatusModal(false)
	}

	// 노출 저장 버튼
	const saveButtonOnClickHandler = () => {
		if (checkBoxSelect === null || checkBoxSelect.length === 0) {
			return simpleAlert('노출상태를 변경할 제품을 선택해 주세요.')
		}

		const productNumbers = checkBoxSelect.map((item) => item['제품번호'])

		const viewStatusData = {
			status: checkRadio,
			numbers: productNumbers,
		}

		const { status, numbers } = viewStatusData

		mutateSingleProductViewStatusUpdate({ status, numbers })
	}

	const globalProductResetOnClick = () => {
		setParam(initialParamState)
	}

	const globalProductSearchOnClick = (userSearchParam) => {
		setParam((prevParam) => {
			if (isEqual(prevParam, { ...prevParam, ...userSearchParam })) {
				return prevParam
			}
			return {
				...prevParam,
				...userSearchParam,
				pageNum: 1,
			}
		})
	}

	useEffect(() => {
		if (getSingleProductsRes) {
			setServerData({ list: getSingleProductsRes.r, pagination: getSingleProductsRes.pagination })
		}

		if (isError) {
			simpleAlert('요청중 오류가 발생했습니다.\n다시 시도해 주세요.')
		}
	}, [isSuccess, getSingleProductsRes, isError])

	useEffect(() => {
		if (isSuccessSingleProductViewStatusUpdate) {
			refetch()
		}
	}, [isSuccessSingleProductViewStatusUpdate])

	useEffect(() => {
		refetch()
	}, [param])

	return (
		<FilterContianer>
			<div>
				<FilterHeader>
					<h1>상시 판매 단일</h1>
					<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
				</FilterHeader>
				{/* 공지사항 */}
				<CautionBox category={CAUTION_CATEGORY.singleProduct} />
				{exFilterToggle && (
					<GlobalProductSearch
						// prettier-ignore
						param={param}
						isToggleSeparate={true}
						renderCustomSearchFields={(props) => <SingleProductSearchFields {...props} />}
						globalProductSearchOnClick={globalProductSearchOnClick}
						globalProductResetOnClick={globalProductResetOnClick}
					/>
				)}
			</div>
			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>{selectedCountStr}</span> / {totalCount?.toLocaleString()}개 )
						<TableV2HiddenSection />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={handleTablePageSize} />
						<TableV2ExcelDownloader
							requestUrl={urls.single}
							requestCount={paginationData?.listCount}
							field={responseToTableRowMap}
						/>
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택중량 <span> {selectedWeightStr} </span> kg / 총 중량 {totalWeight?.toLocaleString()} kg
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteBlackBtn onClick={(checkRadio) => editStatusButtonOnClickHandler(checkRadio)}>
							노출 상태 변경
						</WhiteBlackBtn>
					</div>
				</TCSubContainer>
				<TableV2
					getCol={singleProductListFieldCols}
					getRow={tableRowData}
					loading={isLoading}
					tablePagination={paginationData}
					onPageChange={onPageChange}
				/>
				<TableBottomWrap>
					<BlackBtn onClick={saveButtonOnClickHandler} width={13} height={40} fontSize={17}>
						저장
					</BlackBtn>
				</TableBottomWrap>
			</TableContianer>
			{isEditStatusModal && <SalesPackage onClick={editStatusModalConfirmButtonOnClickHandler} />}
		</FilterContianer>
	)
}

export default Single
