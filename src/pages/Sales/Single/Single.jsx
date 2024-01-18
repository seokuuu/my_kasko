import { useEffect, useState } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { BlackBtn, GreyBtn, WhiteBlackBtn } from '../../../common/Button/Button'
import { MainSelect, storageOptions } from '../../../common/Option/Main'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import {
	DoubleWrap,
	EditGear,
	ExInputsWrap,
	FilterContianer,
	FilterFooter,
	FilterHeader,
	FilterHeaderAlert,
	FilterLeft,
	FilterRight,
	FilterSubcontianer,
	FilterWrap,
	Input,
	MiniInput,
	PWRight,
	PartWrap,
	ResetImg,
	RowWrap,
	TCSubContainer,
	TableBottomWrap,
	TableContianer,
	Tilde,
} from '../../../modal/External/ExternalFilter'
import { blueModalAtom, selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import useReactQuery from '../../../hooks/useReactQuery'
import { getSingleProducts } from '../../../api/SellProduct'
import Table from '../../../pages/Table/Table'
import { responseToTableRowMap, singleProductListFieldCols } from '../../../constants/admin/singleProduct'
import { add_element_field } from '../../../lib/tableHelpers'
import { KilogramSum } from '../../../utils/KilogramSum'
import { formatWeight } from '../../../utils/utils'
import { InputSearch, StorageSelect } from '../../../components/Search'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import SingleProductSearchFields from './SingleProductSearchFields'
import { isEqual } from 'lodash'

const Single = ({}) => {
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

	const [isModal, setIsModal] = useAtom(blueModalAtom)

	const [noticeEdit, setnoticeEdit] = useState(false)

	const noticeEditOnClickHandler = () => {
		setnoticeEdit((prev) => !prev)
	}

	const modalOpen = () => {
		setIsModal(true)
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
					<h1>상시 판매 단일</h1>
					<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
				</FilterHeader>
				<FilterHeaderAlert>
					<div style={{ display: 'flex' }}>
						<div style={{ marginRight: '20px' }}>
							<img src="/img/notice.png" />
						</div>
						{noticeEdit ? (
							<div style={{ marginTop: '6px' }}>
								<div>
									<input style={{ border: '1px solid' }} />
								</div>
								<div>
									<input style={{ marginTop: '6px', border: '1px solid' }} />
								</div>
							</div>
						) : (
							<div style={{ marginTop: '6px' }}>
								<div>· 주의사항 영역</div>
								<div style={{ marginTop: '6px' }}>· 주의사항 영역</div>
							</div>
						)}
					</div>
					{noticeEdit ? (
						<EditGear onClick={noticeEditOnClickHandler}>
							완료
							<img style={{ marginLeft: '10px' }} src="/img/setting.png" />
						</EditGear>
					) : (
						<EditGear onClick={noticeEditOnClickHandler}>
							수정
							<img style={{ marginLeft: '10px' }} src="/img/setting.png" />
						</EditGear>
					)}
				</FilterHeaderAlert>
				{exFilterToggle && (
					<FilterWrap>
						<GlobalProductSearch
							// prettier-ignore
							param={param}
							isToggleSeparate={true}
							customRenderProp={(props) => <SingleProductSearchFields {...props} />}
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
						{singleProductPagination?.listCount}개 )
						<Hidden />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={handleTablePageSize} />
						<Excel getRow={singleProductListData} />
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
