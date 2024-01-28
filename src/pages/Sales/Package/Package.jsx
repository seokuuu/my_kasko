import { useEffect, useState } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import Excel from '../../../components/TableInner/Excel'
import { BlackBtn, WhiteBlackBtn } from '../../../common/Button/Button'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { toggleAtom, selectedRowsAtom, salesPackageModal } from '../../../store/Layout/Layout'
import { FilterWrap } from '../../../modal/External/ExternalFilter'
import {
	FilterContianer,
	FilterHeader,
	TCSubContainer,
	TableBottomWrap,
	TableContianer,
	FilterHeaderAlert,
} from '../../../modal/External/ExternalFilter'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import Hidden from '../../../components/TableInner/Hidden'
import Table from '../../../pages/Table/Table'
import { add_element_field, formatBooleanFields } from '../../../lib/tableHelpers'
import useReactQuery from '../../../hooks/useReactQuery'
import { packageProductEndpoint, getPackageProductList } from '../../../api/packageProduct.js'
import { packageFieldsCols, packageResponseToTableRowMap } from '../../../constants/admin/packageProducts.js'
import { KilogramSum } from '../../../utils/KilogramSum'
import { formatWeight } from '../../../utils/utils'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import PackageProductSearchFields from './PackageProductSearchFields'
import { isEqual } from 'lodash'
import useAlert from '../../../store/Alert/useAlert.js'
import { usePackageProductViewStatusUpdate } from '../../../api/SellProduct.js'
import SalesPackage from '../../../modal/Multi/SalesPackage.jsx'
import TableV2ExcelDownloader from '../../Table/TableV2ExcelDownloader.jsx'
import CautionBox from '../../../components/CautionBox/CautionBox.jsx'
import { CAUTION_CATEGORY } from '../../../components/CautionBox/constants.js'

const Package = () => {
	const { simpleAlert } = useAlert()

	const initialParamState = {
		pageNum: 1,
		pageSize: 50,
	}

	const checkBoxSelect = useAtomValue(selectedRowsAtom)
	const [isEditStatusModal, setIsEditStatusModal] = useAtom(salesPackageModal)

	const [checkRadio, setCheckRadio] = useState(null)
	const [exFilterToggle, setExfilterToggle] = useState(toggleAtom)
	const [param, setParam] = useState(initialParamState)
	const [packageProductListData, setPackageProductListData] = useState(null)
	const [packageProductPagination, setPackageProductPagination] = useState([])
	const [toggleMsg, setToggleMsg] = useState('On')

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

	useEffect(() => {
		if (getPackageProductListRes?.data?.data) {
			setPackageProductListData(formatTableRowData(getPackageProductListRes.data.data.list))
			setPackageProductPagination(getPackageProductListRes.data.data.pagination)
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

	const formatTableRowData = (packageProductListData) => {
		const processedData = add_element_field(packageProductListData, packageResponseToTableRowMap)
		return formatBooleanFields(processedData, [{ fieldName: '노출상태', trueValue: '노출', falseValue: '비노출' }])
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
		// then we need to create paramData object to reset the search field
		setParam(initialParamState)
	}

	const globalProductSearchOnClick = (userSearchParam) => {
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

		const productNumbers = checkBoxSelect.map((item) => item['순번'])

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
						조회 목록 (선택 <span>{checkBoxSelect?.length > 0 ? checkBoxSelect?.length : '0'}</span> /{' '}
						{packageProductPagination?.listCount}개 )
						<Hidden />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={handleTablePageSize} />
						<TableV2ExcelDownloader
							requestUrl={packageProductEndpoint}
							requestCount={packageProductPagination?.listCount}
							field={packageResponseToTableRowMap}
						/>
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택 중량
						<span> {formatWeight(KilogramSum(checkBoxSelect))} </span>
						kg / 총 중량 {formatWeight(packageProductPagination.totalWeight)} kg
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteBlackBtn onClick={(checkRadio) => editStatusButtonOnClickHandler(checkRadio)}>
							노출 상태 변경
						</WhiteBlackBtn>
					</div>
				</TCSubContainer>
				<Table
					getCol={packageFieldsCols}
					getRow={packageProductListData}
					loading={isLoading}
					tablePagination={packageProductPagination}
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
