import React, { useContext, useEffect, useState } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { BlackBtn, WhiteBlackBtn } from '../../../common/Button/Button'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { salesPackageModal, selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'
import {
	FilterContianer,
	FilterHeader,
	FilterWrap,
	TableBottomWrap,
	TableContianer,
	TCSubContainer,
} from '../../../modal/External/ExternalFilter'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import useReactQuery from '../../../hooks/useReactQuery'
import { getPackageProductList, packageProductEndpoint } from '../../../api/packageProduct.js'
import { packageFieldsCols, packageResponseToTableRowMap } from '../../../constants/admin/packageProducts.js'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import PackageProductSearchFields from './PackageProductSearchFields'
import { isEqual } from 'lodash'
import useAlert from '../../../store/Alert/useAlert.js'
import { usePackageProductViewStatusUpdate } from '../../../api/SellProduct.js'
import SalesPackage from '../../../modal/Multi/SalesPackage.jsx'
import TableV2ExcelDownloader from '../../Table/TableV2ExcelDownloader.jsx'
import CautionBox from '../../../components/CautionBox/CautionBox.jsx'
import { CAUTION_CATEGORY } from '../../../components/CautionBox/constants.js'
import { PackageViewerDispatchContext } from '../../../userpages/UserSales/_layouts/UserSalesWrapper'
import useTableData from '../../../hooks/useTableData'
import useTableSelection from '../../../hooks/useTableSelection'
import TableV2 from '../../Table/TableV2'
import TableV2HiddenSection from '../../Table/TableV2HiddenSection'
import Excel from '../../../components/TableInner/Excel'

const Package = () => {
	const { simpleAlert } = useAlert()

	const initialParamState = {
		pageNum: 1,
		pageSize: 50,
		saleType: '상시판매 대상재',
	}

	const checkBoxSelect = useAtomValue(selectedRowsAtom)
	const [isEditStatusModal, setIsEditStatusModal] = useAtom(salesPackageModal)

	const { setPackageReadOnlyViewer } = useContext(PackageViewerDispatchContext)

	const [checkRadio, setCheckRadio] = useState(null)
	const [exFilterToggle, setExfilterToggle] = useState(toggleAtom)
	const [toggleMsg, setToggleMsg] = useState('On')

	const [param, setParam] = useState(initialParamState)
	const [serverData, setServerData] = useState({ list: [], pagination: {} })

	const {
		isLoading,
		isError,
		data: getPackageProductListRes,
		isSuccess,
		refetch,
	} = useReactQuery(param, 'getPackageProductList', getPackageProductList)

	const {
		// prettier-ignore
		mutate: mutatePackageProductViewStatusUpdate,
		isSuccess: isSuccessPackageProductViewStatusUpdate,
	} = usePackageProductViewStatusUpdate()

	const { tableRowData, paginationData, totalWeightStr, totalCountStr } = useTableData({
		tableField: packageResponseToTableRowMap,
		serverData,
		wish: false,
		best: true,
	})

	// 선택 항목
	const { selectedWeightStr, selectedCountStr } = useTableSelection({
		weightKey: '중량',
	})

	useEffect(() => {
		if (getPackageProductListRes?.data?.data) {
			const data = getPackageProductListRes.data.data
			const list = data.list
			const pagination = data.pagination
			setServerData({ list, pagination })
		}

		if (isError) {
			simpleAlert('요청중 오류가 발생했습니다.\n다시 시도해 주세요.')
		}
	}, [isSuccess, getPackageProductListRes, isError])

	useEffect(() => {
		if (isSuccessPackageProductViewStatusUpdate) {
			refetch()
		}
	}, [isSuccessPackageProductViewStatusUpdate])

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

		const productNumbers = checkBoxSelect.map((item) => item['패키지 고유번호'])

		setServerData({
			list: serverData.list.map((item) => {
				if (productNumbers.includes(item.uid)) {
					return { ...item, viewStatus: checkRadio[0] }
				}
				return item
			}),
			pagination: serverData.pagination,
		})
		setIsEditStatusModal(false)
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
			}
		})
	}

	useEffect(() => {
		refetch()
	}, [param])

	// 노출 저장 버튼
	const saveButtonOnClickHandler = () => {
		if (checkBoxSelect === null || checkBoxSelect.length === 0) {
			return simpleAlert('노출상태를 변경할 제품을 선택해 주세요.')
		}

		const productNumbers = checkBoxSelect.map((item) => item['패키지 고유번호'])

		const viewStatusData = {
			status: checkRadio,
			uids: productNumbers,
		}

		const { status, uids } = viewStatusData

		mutatePackageProductViewStatusUpdate({ status, uids })
	}

	return (
		<FilterContianer>
			<div>
				<FilterHeader>
					<h1>상시 판매 패키지</h1>
					{/* 토글 쓰기 */}
					<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
				</FilterHeader>
				{/* 공지사항 */}
				<CautionBox category={CAUTION_CATEGORY.packageProduct} />
				{exFilterToggle && (
					<FilterWrap>
						<GlobalProductSearch
							// prettier-ignore
							param={param}
							setParam={setParam}
							isToggleSeparate={true}
							renderCustomSearchFields={(props) => <PackageProductSearchFields {...props} />}
							globalProductSearchOnClick={globalProductSearchOnClick}
							globalProductResetOnClick={globalProductResetOnClick}
						/>
					</FilterWrap>
				)}
			</div>
			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>{selectedCountStr}</span> / {totalCountStr}개 )
						<TableV2HiddenSection />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={handleTablePageSize} />
						<Excel getRow={tableRowData} sheetName="상시판매_패키지관리" />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택중량 <span> {selectedWeightStr} </span> kg / 총 중량 {totalWeightStr} kg
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteBlackBtn onClick={(checkRadio) => editStatusButtonOnClickHandler(checkRadio)}>
							노출 상태 변경
						</WhiteBlackBtn>
					</div>
				</TCSubContainer>
				<TableV2
					getCol={packageFieldsCols(setPackageReadOnlyViewer)}
					getRow={tableRowData}
					loading={isLoading}
					tablePagination={paginationData}
					onPageChange={onPageChange}
				/>
				<TableBottomWrap>
					<BlackBtn width={15} height={40} onClick={saveButtonOnClickHandler}>
						저장
					</BlackBtn>
				</TableBottomWrap>
			</TableContianer>
			{isEditStatusModal && <SalesPackage onClick={editStatusModalConfirmButtonOnClickHandler} />}
		</FilterContianer>
	)
}

export default Package
