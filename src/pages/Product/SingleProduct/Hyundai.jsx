import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BlackBtn, BtnBound, TGreyBtn, WhiteBlackBtn } from '../../../common/Button/Button'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { hyunDaiMultiModal, onClickCheckAtom, selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'
import {
	getSingleProducts,
	patchOutlet,
	patchSaleCategory,
	patchSalePriceType,
	postingMemoAndNote,
} from '../../../api/SellProduct'
import { useAtom, useAtomValue } from 'jotai'
import Excel from '../../../components/TableInner/Excel'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { singleDispatchFields, SingleDispatchFieldsCols } from '../../../constants/admin/Single'
import useMutationQuery from '../../../hooks/useMutationQuery'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import { isEqual } from 'lodash'
import {
	CustomInput,
	FilterContianer,
	FilterHeader,
	SubTitle,
	TableBottomWrap,
	TableContianer,
	TCSubContainer,
} from '../../../modal/External/ExternalFilter'
import Multi2 from '../../../modal/Common/Multi2'
import { changeCategoryAtom } from '../../../store/Layout/Popup'
import HyunDaiOriginal from './HyunDaiOriginal'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import SingleSellProductSearchFields from './SingleProductSearchFields/SingleSellProductSearchFileds'
import useAlert from '../../../store/Alert/useAlert'
import useTableData from '../../../hooks/useTableData'
import useTableSelection from '../../../hooks/useTableSelection'
import TableV2HiddenSection from '../../Table/TableV2HiddenSection'
import TableV2 from '../../Table/TableV2'
import { queryClient } from '../../../api/query'
import SalsePriceType from '../../../modal/Multi/SalePriceType'

const paramData = {
	pageNum: 1,
	pageSize: 50,
	type: '단일',
	category: '현대제철',
}

const Hyundai = ({}) => {
	const { simpleAlert, simpleConfirm } = useAlert()
	const [checkBoxSelect, setCheckBoxSelect] = useAtom(selectedRowsAtom)
	const parameter = useAtomValue(changeCategoryAtom)
	const [isTableModal, setIsTableModal] = useAtom(onClickCheckAtom)
	const [isMultiModal, setIsMultiModal] = useAtom(hyunDaiMultiModal)

	const [exFilterToggle, setExfilterToggle] = useState(toggleAtom)
	const [toggleMsg, setToggleMsg] = useState('On')
	const [selectProductNumber, setSelectProductNumber] = useState([])
	const [errorMsg, setErrorMsg] = useState('')

	const [memo, setMemo] = useState([])
	const [outletPrice, setOutletPrice] = useState(0)
	const [outletParameter, setOutletParameter] = useState({
		price: 0, // 아울렛 등록 가격
		numbers: [], // 제품번호 목록
	})

	const [param, setParam] = useState(paramData)
	const [getRow, setGetRow] = useState([])
	const getCol = useRef(SingleDispatchFieldsCols())
	const [filterData, setFilteredData] = useState([])

	// 판매가 유형 변경
	const [salePriceType, setSalePriceType] = useState('일반')
	const [isSalePriceType, setIsSalePriceType] = useState(false)

	const { data, refetch, isLoading } = useReactQuery(param, 'product-list', getSingleProducts)
	const hyunDaiList = data?.r
	const hyunDaiPage = data?.pagination

	const { tableRowData, paginationData, totalWeight, totalCount } = useTableData({
		tableField: singleDispatchFields,
		serverData: filterData,
	})

	// 선택 항목
	const { selectedWeightStr, selectedCountStr, selectedData, hasSelected } = useTableSelection({
		weightKey: '중량',
	})

	const { mutate } = useMutationQuery('change-category', patchSaleCategory)
	const { mutate: changeSalePriceType } = useMutationQuery('change-sale-price_type', patchSalePriceType)
	const { mutate: memoAndNote } = useMutationQuery('memo-note', postingMemoAndNote)
	const { mutate: changeOutlet } = useMutationQuery('change-outlet', patchOutlet)

	const toggleBtnClick = () => {
		setExfilterToggle((prev) => !prev)
		if (exFilterToggle === true) {
			setToggleMsg('Off')
		} else {
			setToggleMsg('On')
		}
	}

	const changeSaleCategory = () => {
		return mutate(parameter, {
			onSuccess: () => {
				simpleAlert('저장되었습니다.', () => {
					setIsMultiModal(false)
					setSelectProductNumber([])
					setCheckBoxSelect([])
					queryClient.invalidateQueries('product-list')
				})
			},
			onError: (e) => {
				setErrorMsg(e?.data?.message || '적용 실패하였습니다.')
				simpleAlert(e?.data?.message || '적용 실패하였습니다.', () => {
					setIsMultiModal(false)
				})
			},
		})
	}

	const handleChangeMemo = (params) => {
		const data = params?.data
		setMemo((p) => [
			...p,
			{
				number: data['제품 번호'],
				memo: data['메모'] || '',
				note: data['비고'] || '',
			},
		])
	}

	// 아울렛
	const handlechangeOutlet = () => {
		if (outletParameter?.numbers?.length === 0) {
			simpleAlert('아울렛으로 등록할 제품을 선택해주세요.')
		} else {
			simpleConfirm('선택하신 제품을 아울렛으로 등록하시겠습니까?', () => {
				changeOutlet(outletParameter, {
					onSuccess: () => {
						simpleAlert('변경되었습니다.')
						setSelectProductNumber([])
						setCheckBoxSelect([])
						queryClient.invalidateQueries('product-list')
					},
					onError: (e) => {
						simpleAlert(e?.data?.message || '적용 실패하였습니다.')
					},
				})
			})
		}
	}

	// 판매가 유형
	const handleChangeSalePriceType = () => {
		if (!hasSelected) {
			return simpleAlert('변경할 제품을 선택해 주세요.')
		}
		const numbers = selectedData?.map((item) => item['제품 번호'])
		const body = { salePriceType, numbers }
		changeSalePriceType(body, {
			onSuccess: () => {
				simpleAlert('변경되었습니다.', () => {
					setIsSalePriceType(false)
					setSelectProductNumber([])
					setCheckBoxSelect([])
					setSalePriceType('일반')
					queryClient.invalidateQueries('product-list')
					queryClient.invalidateQueries('getSingleProducts')
				})
			},
			onError: (e) => {
				setErrorMsg(e?.data?.message || '적용 실패하였습니다.')
				simpleAlert(e?.data?.message || '적용 실패하였습니다.', () => {
					setIsSalePriceType(false)
				})
			},
		})
	}

	const createMemoAndNote = () => {
		memoAndNote(memo, {
			onSuccess: () => {
				simpleAlert('저장 되었습니다.', () => {
					setSelectProductNumber([])
					setCheckBoxSelect([])
					queryClient.invalidateQueries('product-list')
				})
			},
			onError: (e) => {
				simpleAlert(e?.data?.message || '실패하였습니다.')
			},
		})
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
				pageNum: 1,
				category: '현대제철',
			}
		})
	}

	useEffect(() => {
		refetch()
	}, [param])

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
		if (checkBoxSelect?.length === 0) return setSelectProductNumber([])
		setSelectProductNumber(() => checkBoxSelect?.map((i) => i['제품 번호']))
	}, [checkBoxSelect])

	useEffect(() => {
		setOutletParameter({
			price: outletPrice,
			numbers: selectProductNumber,
		})
	}, [selectProductNumber, outletPrice])

	useEffect(() => {
		const newFilterData = { list: hyunDaiList, pagination: hyunDaiPage }
		if (newFilterData?.list) {
			setFilteredData(newFilterData)
		}
	}, [data])

	useEffect(() => {
		if (filterData && Array.isArray(filterData?.list)) {
			setGetRow(add_element_field(filterData.list, singleDispatchFields))
		}
	}, [filterData])

	return (
		<>
			<FilterContianer>
				<FilterHeader>
					<div style={{ display: 'flex' }}>
						<h1>단일 제품 관리</h1>
						<SubTitle>
							<Link to={`/product/single`}>
								<h6>전체</h6>
							</Link>
							<h5>현대제철</h5>
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
							<Excel getRow={getRow} sheetName="단일제품 현대제철" />
						</div>
					</TCSubContainer>
					<TCSubContainer bor>
						<div>
							선택중량 <span> {selectedWeightStr} </span> kg / 총 중량 {totalWeight?.toLocaleString()} kg
						</div>
						<div style={{ display: 'flex', gap: '10px' }}>
							<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
								<p>아울렛 일괄 변경</p>
								<CustomInput
									placeholder="아울렛 입력"
									value={outletPrice}
									width={120}
									height={32}
									onChange={(e) => {
										setOutletPrice(e.currentTarget.value)
									}}
								/>
								<TGreyBtn onClick={handlechangeOutlet}>적용</TGreyBtn>
							</div>
							<BtnBound />
							<WhiteBlackBtn
								onClick={() => {
									if (checkBoxSelect == null) simpleAlert('제품을 선택해 주세요.')
									else {
										setIsMultiModal(true)
									}
								}}
							>
								판매 구분 변경
							</WhiteBlackBtn>
							<WhiteBlackBtn
								onClick={() => {
									if (checkBoxSelect == null) simpleAlert('제품을 선택해 주세요.')
									else {
										setIsSalePriceType(true)
									}
								}}
							>
								판매가 유형 변경
							</WhiteBlackBtn>
						</div>
					</TCSubContainer>
					<TableV2
						getRow={tableRowData}
						getCol={getCol.current}
						tablePagination={paginationData}
						onPageChange={onPageChange}
						loading={isLoading}
						changeFn={handleChangeMemo}
					/>
					<TCSubContainer bor>
						<div></div>
						<div style={{ display: 'flex', gap: '10px' }}>
							<WhiteBlackBtn
								onClick={() => {
									setIsTableModal(true)
								}}
							>
								원본 보기
							</WhiteBlackBtn>
						</div>
					</TCSubContainer>
					<TableBottomWrap>
						<BlackBtn
							width={15}
							height={40}
							onClick={() => {
								simpleConfirm('저장 하시겠습니까?', createMemoAndNote)
							}}
						>
							저장
						</BlackBtn>
					</TableBottomWrap>
				</TableContianer>
			</FilterContianer>
			{isTableModal && <HyunDaiOriginal title={'원본보기'} />}
			{isSalePriceType && (
				<SalsePriceType
					closeFn={() => setIsSalePriceType(false)}
					saveFn={handleChangeSalePriceType}
					data={salePriceType}
					setData={setSalePriceType}
				/>
			)}
			{isMultiModal === true && (
				<Multi2
					length={3}
					closeFn={(e, text) => {
						const { tagName } = e.target
						if (tagName === 'IMG') {
							setIsMultiModal(false)
						}
					}}
					errMsg={errorMsg}
					saveFn={changeSaleCategory}
					productNumbers={selectProductNumber}
				/>
			)}
		</>
	)
}

export default Hyundai
