import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import Excel from '../../../components/TableInner/Excel'
import { BlackBtn, WhiteBlackBtn } from '../../../common/Button/Button'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { toggleAtom, selectedRowsAtom } from '../../../store/Layout/Layout'
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
import { add_element_field } from '../../../lib/tableHelpers'
import useReactQuery from '../../../hooks/useReactQuery'
import { getPackageProductList } from '../../../api/packageProduct.js'
import { packageFieldsCols, packageResponseToTableRowMap } from '../../../constants/admin/packageProducts.js'
import { KilogramSum } from '../../../utils/KilogramSum'
import { formatWeight } from '../../../utils/utils'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import PackageProductSearchFields from './PackageProductSearchFields'
import { isEqual } from 'lodash'

const Package = () => {
	const paramData = {
		pageNum: 1,
		pageSize: 50,
	}
	const [param, setParam] = useState(paramData)
	const [packageProductListData, setPackageProductListData] = useState(null)
	const [packageProductPagination, setPackageProductPagination] = useState([])
	const checkBoxSelect = useAtomValue(selectedRowsAtom)
	const {
		isLoading,
		isError,
		data: getPackageProductListRes,
		isSuccess,
		refetch,
	} = useReactQuery(param, 'getPackageProductList', getPackageProductList)

	useEffect(() => {
		if (getPackageProductListRes && getPackageProductListRes.data && getPackageProductListRes.data.data) {
			setPackageProductListData(formatTableRowData(getPackageProductListRes.data.data.list))
			setPackageProductPagination(getPackageProductListRes.data.data.pagination)
		}
	}, [isSuccess, getPackageProductListRes])

	const formatTableRowData = (packageProductListData) => {
		return add_element_field(packageProductListData, packageResponseToTableRowMap)
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
		// then we need to create paramData object to reset the search field
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
					<h1>상시 판매 패키지</h1>
					{/* 토글 쓰기 */}
					<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
				</FilterHeader>
				<FilterHeaderAlert>
					<div style={{ display: 'flex' }}>
						<div style={{ marginRight: '20px' }}>
							<img src="/img/notice.png" />
						</div>
						<div style={{ marginTop: '6px' }}>
							<div>· 주의사항 영역</div>
							<div style={{ marginTop: '6px' }}>· 주의사항 영역</div>
						</div>
					</div>
					<div>
						수정
						<img style={{ marginLeft: '10px' }} src="/img/setting.png" />
					</div>
				</FilterHeaderAlert>
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
						<Excel getRow={packageProductListData} />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택 중량
						<span> {formatWeight(KilogramSum(checkBoxSelect))} </span>
						kg / 총 중량 {formatWeight(packageProductPagination.totalWeight)} kg
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteBlackBtn>노출 상태 변경</WhiteBlackBtn>
					</div>
				</TCSubContainer>
				<Table
					getCol={packageFieldsCols}
					getRow={packageProductListData}
					tablePagination={packageProductPagination}
					onPageChange={onPageChange}
				/>
				<TableBottomWrap>
					<BlackBtn width={15} height={40}>
						등록
					</BlackBtn>
				</TableBottomWrap>
			</TableContianer>
		</FilterContianer>
	)
}

export default Package
