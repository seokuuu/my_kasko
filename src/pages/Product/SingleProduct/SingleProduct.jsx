import { useAtomValue } from 'jotai'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getSingleProducts, patchBeBestRecommend } from '../../../api/SellProduct'
import { YellBtn } from '../../../common/Button/Button'
import Excel from '../../../components/TableInner/Excel'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { singleDispatchFields, SingleDispatchFieldsCols } from '../../../constants/admin/Single'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import { isEqual } from 'lodash'
import {
	FilterContianer,
	FilterHeader,
	SubTitle,
	TableContianer,
	TCSubContainer,
} from '../../../modal/External/ExternalFilter'
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'
import useMutationQuery from '../../../hooks/useMutationQuery'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import SingleSellProductSearchFields from './SingleProductSearchFields/SingleSellProductSearchFileds'
import useTableData from '../../../hooks/useTableData'
import useTableSelection from '../../../hooks/useTableSelection'
import TableV2 from '../../Table/TableV2'
import TableV2HiddenSection from '../../Table/TableV2HiddenSection'

const paramData = {
	pageNum: 1,
	pageSize: 50,
	type: '단일',
	category: '전체',
}

const SingleProduct = () => {
	// 토글 쓰기
	const [toggleMsg, setToggleMsg] = useState('On')
	const [exFilterToggle, setExfilterToggle] = useState(toggleAtom)
	const checkBoxSelect = useAtomValue(selectedRowsAtom)
	const [param, setParam] = useState(paramData)
	const [selectUid, setSelectUid] = useState([])

	const [filterData, setFilteredData] = useState([])
	console.log('filterData', filterData?.list)
	const [getRow, setGetRow] = useState('')
	const getCol = useRef(SingleDispatchFieldsCols())
	const { data, isSuccess, refetch, isLoading } = useReactQuery(param, 'product-list', getSingleProducts)
	const singleList = data?.r
	const singleProductPage = data?.pagination

	const { mutate: beRecommend } = useMutationQuery('beRecommend', patchBeBestRecommend)

	const { tableRowData, paginationData, totalWeight, totalCount } = useTableData({
		tableField: singleDispatchFields,
		serverData: filterData,
		best: true,
	})

	// 선택 항목
	const { selectedWeightStr, selectedCountStr } = useTableSelection({
		weightKey: '중량',
	})

	const toggleBtnClick = () => {
		setExfilterToggle((prev) => !prev)
		if (exFilterToggle === true) {
			setToggleMsg('Off')
		} else {
			setToggleMsg('On')
		}
	}

	const patchRecommend = () => {
		beRecommend(
			{
				status: true,
				numbers: selectUid,
			},
			{
				onSuccess: () => {
					setSelectUid([])
					window.location.reload()
				},
				onError: (e) => {
					if (e?.data?.status === 400) {
						alert(e.data?.message)
					}
				},
			},
		)
	}

	const globalProductResetOnClick = () => {
		setParam(paramData)
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

	const onPageChange = (value) => {
		setParam((prevParam) => ({
			...prevParam,
			pageNum: Number(value),
		}))
	}

	const handleTablePageSize = (event) => {
		setParam((prevParam) => ({
			...prevParam,
			pageSize: Number(event.target.value),
			pageNum: 1,
		}))
	}

	useEffect(() => {
		if (filterData && Array.isArray(filterData?.list)) {
			setGetRow(add_element_field(filterData.list, singleDispatchFields))
		}
	}, [isSuccess, filterData])

	useEffect(() => {
		const newFilterData = { list: singleList, pagination: singleProductPage }
		if (isSuccess) {
			setFilteredData(newFilterData)
		}
	}, [isSuccess, data])

	useEffect(() => {
		if (checkBoxSelect) return setSelectUid((p) => [...checkBoxSelect.map((i) => i['제품 번호'])])
	}, [checkBoxSelect])

	useEffect(() => {
		refetch()
	}, [param])

	return (
		<>
			<FilterContianer>
				<FilterHeader>
					<div style={{ display: 'flex' }}>
						<h1>단일 제품 관리</h1>
						<SubTitle>
							<h5>전체</h5>
							<Link to={`/product/hyundai`}>
								<h6>현대제철</h6>
							</Link>
							<Link to={`/product/salesproduct`}>
								<h6>판매제품</h6>
							</Link>
						</SubTitle>
					</div>
					<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
				</FilterHeader>
				{exFilterToggle && (
					<GlobalProductSearch
						param={param}
						isToggleSeparate={true}
						renderCustomSearchFields={(props) => <SingleSellProductSearchFields {...props} />}
						globalProductSearchOnClick={globalProductSearchOnClick}
						globalProductResetOnClick={globalProductResetOnClick}
					/>
				)}
				<TableContianer>
					<TCSubContainer bor>
						<div>
							조회 목록 (선택 <span>{selectedCountStr}</span> / {totalCount?.toLocaleString()}개 )
							<TableV2HiddenSection />
						</div>
						<div style={{ display: 'flex', gap: '10px' }}>
							<PageDropdown handleDropdown={handleTablePageSize} />
							<Excel getRow={getRow} sheetName="단일 판매 전체" />
						</div>
					</TCSubContainer>
					<TCSubContainer bor>
						<div>
							선택중량 <span> {selectedWeightStr} </span> kg / 총 중량 {totalWeight?.toLocaleString()} kg
						</div>
						<div style={{ display: 'flex', gap: '10px' }}>
							<YellBtn onClick={patchRecommend}>추천제품지정 ( {singleProductPage?.bestCount} / 10)</YellBtn>
						</div>
					</TCSubContainer>
					<TableV2
						getRow={tableRowData}
						loading={isLoading}
						getCol={getCol.current}
						tablePagination={paginationData}
						onPageChange={onPageChange}
					/>
				</TableContianer>
			</FilterContianer>
		</>
	)
}

export default SingleProduct
