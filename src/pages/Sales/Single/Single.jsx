import { useEffect, useState } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { isEqual } from 'lodash'
import { urls, getSingleProducts, useSingleProductViewStatusUpdate } from '../../../api/SellProduct'
import useReactQuery from '../../../hooks/useReactQuery'
import useAlert from '../../../store/Alert/useAlert'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import SingleProductSearchFields from './SingleProductSearchFields'
import TableV2ExcelDownloader from '../../Table/TableV2ExcelDownloader'
import { CautionBox, CAUTION_CATEGORY } from '../../../components/CautionBox'
import SalesPackage from '../../../modal/Multi/SalesPackage'
import Table from '../../../pages/Table/Table'
import { BlackBtn, WhiteBlackBtn } from '../../../common/Button/Button'
import { responseToTableRowMap, singleProductListFieldCols } from '../../../constants/admin/singleProduct'
import { add_element_field, formatBooleanFields } from '../../../lib/tableHelpers'
import { KilogramSum } from '../../../utils/KilogramSum'
import { formatWeight } from '../../../utils/utils'
import { salesPackageModal, selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'
import {
	FilterContianer,
	FilterHeader,
	TCSubContainer,
	TableBottomWrap,
	TableContianer,
} from '../../../modal/External/ExternalFilter'

const Single = () => {
	const { simpleAlert } = useAlert()

	const initialParamState = {
		pageNum: 1,
		pageSize: 50,
		type: '단일',
		saleType: '상시판매 대상재',
	}

	const checkBoxSelect = useAtomValue(selectedRowsAtom)
	const [isEditStatusModal, setIsEditStatusModal] = useAtom(salesPackageModal)

	const [checkRadio, setCheckRadio] = useState(null)
	const [exFilterToggle, setExfilterToggle] = useState(toggleAtom)
	const [param, setParam] = useState(initialParamState)
	const [singleProductListData, setSingleProductListData] = useState(null)
	const [singleProductPagination, setSingleProductPagination] = useState([])
	const [toggleMsg, setToggleMsg] = useState('On')

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

	useEffect(() => {
		if (getSingleProductsRes) {
			setSingleProductListData(formatTableRowData(getSingleProductsRes.r))
			setSingleProductPagination(getSingleProductsRes.pagination)
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

	const formatTableRowData = (singleProductListData) => {
		const processedData = add_element_field(singleProductListData, responseToTableRowMap)
		return formatBooleanFields(processedData, [{ fieldName: '노출여부', trueValue: '노출', falseValue: '비노출' }])
	}

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
		setIsEditStatusModal(true)
	}

	// 노출 상태 변경 모달 > 확인 버튼
	const editStatusModalConfirmButtonOnClickHandler = (checkRadio) => {
		setCheckRadio(checkRadio[0])
		setIsEditStatusModal(false)
	}

	const globalProductResetOnClick = () => {
		// if resetting the search field shouldn't rerender table
		// then we need to create paramData object to reset the search fields.
		setParam(initialParamState)
	}

	const globalProductSearchOnClick = (userSearchParam) => {
		console.log('SingleUserSearchParam---', userSearchParam)
		setParam((prevParam) => {
			if (isEqual(prevParam, { ...prevParam, ...userSearchParam })) {
				refetch()
				return prevParam
			}
			return {
				...prevParam,
				...userSearchParam,
			}
		})
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
						조회 목록 (선택 <span>{checkBoxSelect?.length > 0 ? checkBoxSelect?.length : '0'}</span> /{' '}
						{singleProductPagination?.listCount}개 )
						<Hidden />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={handleTablePageSize} />
						<TableV2ExcelDownloader
							requestUrl={urls.single}
							requestCount={singleProductPagination?.listCount}
							field={responseToTableRowMap}
						/>
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택 중량
						<span> {formatWeight(KilogramSum(checkBoxSelect))} </span>
						kg / 총 중량 {formatWeight(singleProductPagination.totalWeight)} kg
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteBlackBtn onClick={(checkRadio) => editStatusButtonOnClickHandler(checkRadio)}>
							노출 상태 변경
						</WhiteBlackBtn>
					</div>
				</TCSubContainer>
				<Table
					getCol={singleProductListFieldCols}
					getRow={singleProductListData}
					loading={isLoading}
					tablePagination={singleProductPagination}
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
