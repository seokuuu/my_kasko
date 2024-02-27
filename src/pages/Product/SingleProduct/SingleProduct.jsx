import { useAtomValue } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getSingleProducts, patchBeBestRecommend } from '../../../api/SellProduct'

import { YellBtn } from '../../../common/Button/Button'
import Excel from '../../../components/TableInner/Excel'
import Hidden from '../../../components/TableInner/Hidden'
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
import { KilogramSum } from '../../../utils/KilogramSum'

import useTablePaginationPageChange from '../../../hooks/useTablePaginationPageChange'
import { onSizeChange } from '../../Operate/utils'
import Table from '../../Table/Table'

import useMutationQuery from '../../../hooks/useMutationQuery'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import SingleSellProductSearchFields from './SingleProductSearchFields/SingleSellProductSearchFileds'

const SingleProduct = () => {
	const paramData = {
		pageNum: 1,
		pageSize: 50,
		type: '일반',
		category: '전체',
	}

	const [param, setParam] = useState(paramData)

	const [getRow, setGetRow] = useState('')
	const { data, isSuccess, refetch, isLoading } = useReactQuery(param, 'product-list', getSingleProducts)
	const singleList = data?.r
	const singleProductPage = data?.pagination

	const tableField = useRef(SingleDispatchFieldsCols)
	const getCol = tableField.current

	const checkBoxSelect = useAtomValue(selectedRowsAtom)
	const [selectUid, setSelectUid] = useState([])

	const [filterData, setFilteredData] = useState([])

	const [pagiNation, setPagination] = useState({})

	// 테이블 연결하기
	useEffect(() => {
		// if (filterData === undefined) {
		//   singleList && setFilteredData(singleList)
		// }
		if (!isSuccess && !singleList) return
		if (Array.isArray(filterData)) {
			setGetRow(add_element_field(singleList, singleDispatchFields))
		}
		//타입, 리액트쿼리, 데이터 확인 후 실행
	}, [isSuccess, singleList])

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
	useEffect(() => {
		if (isSuccess) {
			setFilteredData(singleList)
			setPagination(singleProductPage)
		}
	}, [isSuccess])

	// console.log(bestProduct)
	const { pagination, onPageChanage } = useTablePaginationPageChange(data, setParam)
	const { mutate: beRecommend } = useMutationQuery('beRecommend', patchBeBestRecommend)

	useEffect(() => {
		if (checkBoxSelect) return setSelectUid((p) => [...checkBoxSelect.map((i) => i['제품 번호'])])
	}, [checkBoxSelect])
	// console.log(checkBoxSelect)
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
		// if resetting the search field shouldn't rerender table
		// then we need to create paramData object to reset the search fields.
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
							조회 목록 (선택 <span>{checkBoxSelect?.length > 0 ? checkBoxSelect?.length : '0'}</span> /{' '}
							{singleProductPage?.listCount}개 )
							<Hidden />
						</div>
						<div style={{ display: 'flex', gap: '10px' }}>
							<PageDropdown handleDropdown={(e) => onSizeChange(e, setParam)} />
							<Excel getRow={getRow} sheetName="단일 판매 전체" />
						</div>
					</TCSubContainer>
					<TCSubContainer bor>
						<div>
							선택 중량<span> {KilogramSum(checkBoxSelect)} </span>kg / 총{singleProductPage?.totalWeight} 중량 kg
						</div>
						<div style={{ display: 'flex', gap: '10px' }}>
							<YellBtn onClick={patchRecommend}>추천제품지정 ( {singleProductPage?.bestCount} / 10)</YellBtn>
						</div>
					</TCSubContainer>
					<Table
						getRow={getRow}
						getCol={getCol}
						tablePagination={pagination}
						onPageChange={onPageChanage}
						loading={isLoading}
					/>
				</TableContianer>
			</FilterContianer>
		</>
	)
}

export default SingleProduct
