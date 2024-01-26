import { useAtomValue } from 'jotai'
import { isEqual } from 'lodash'
import { useEffect, useState } from 'react'
import { getSingleProducts } from '../../../api/SellProduct'
import { BlackBtn, WhiteBlackBtn } from '../../../common/Button/Button'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { responseToTableRowMap, singleProductListFieldCols } from '../../../constants/admin/singleProduct'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import {
	EditGear,
	FilterContianer,
	FilterHeader,
	FilterHeaderAlert,
	FilterWrap,
	TCSubContainer,
	TableBottomWrap,
	TableContianer,
} from '../../../modal/External/ExternalFilter'
import Table from '../../../pages/Table/Table'
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'
import { KilogramSum } from '../../../utils/KilogramSum'
import { formatWeight } from '../../../utils/utils'
import SingleProductSearchFields from './SingleProductSearchFields'
import TableV2ExcelDownloader from '../../Table/TableV2ExcelDownloader'
import { CautionBox, CAUTION_CATEGORY } from '../../../components/CautionBox'

const Single = () => {
	const checkBoxSelect = useAtomValue(selectedRowsAtom)
	const [singleProductListData, setSingleProductListData] = useState(null)
	const [singleProductPagination, setSingleProductPagination] = useState([])
	const paramData = {
		pageNum: 1,
		pageSize: 50,
	}
	const [param, setParam] = useState(paramData)
	const {
		isLoading,
		isError,
		data: getSingleProductsRes,
		isSuccess,
		refetch,
	} = useReactQuery(param, 'getSingleProducts', getSingleProducts)

	// TODO: Check why the response object changed to pagination and r.
	useEffect(() => {
		console.log('getSingleProductsRes--', getSingleProductsRes)
		if (getSingleProductsRes) {
			setSingleProductListData(formatTableRowData(getSingleProductsRes.r))
			setSingleProductPagination(getSingleProductsRes.pagination)
		}
		// if (getSingleProductsRes && getSingleProductsRes.data && getSingleProductsRes.data.data) {
		//   setSingleProductListData(formatTableRowData(getSingleProductsRes.data.data.list))
		//   setSingleProductPagination(getSingleProductsRes.data.data.pagination)
		// }
	}, [isSuccess, getSingleProductsRes])

	const formatTableRowData = (singleProductListData) => {
		return add_element_field(singleProductListData, responseToTableRowMap)
	}

	// 토글 쓰기
	const [exFilterToggle, setExfilterToggle] = useState(toggleAtom)
	const [toggleMsg, setToggleMsg] = useState('On')
	const toggleBtnClick = () => {
		setExfilterToggle((prev) => !prev)
		if (exFilterToggle === true) {
			setToggleMsg('Off')
		} else {
			setToggleMsg('On')
		}
	}

	const [noticeEdit, setnoticeEdit] = useState(false)

	const noticeEditOnClickHandler = () => {
		setnoticeEdit((prev) => !prev)
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

	const globalProductResetOnClick = () => {
		// if resetting the search field shouldn't rerender table
		// then we need to create paramData object to reset the search fields.
		setParam(paramData)
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
							requestUrl={'/single-product'}
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
						<WhiteBlackBtn>노출 상태 변경</WhiteBlackBtn>
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
					<BlackBtn width={13} height={40} fontSize={17}>
						저장
					</BlackBtn>
				</TableBottomWrap>
			</TableContianer>
		</FilterContianer>
	)
}

export default Single
