import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BlackBtn, BtnBound, TGreyBtn, WhiteBlackBtn, WhiteRedBtn } from '../../../common/Button/Button'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import {
	CustomInput,
	FilterContianer,
	FilterHeader,
	SubTitle,
	TableBottomWrap,
	TableContianer,
	TCSubContainer,
} from '../../../modal/External/ExternalFilter'
import { hyunDaiMultiModal, selectedRowsAtom, singleProductModify, toggleAtom } from '../../../store/Layout/Layout'
import { isEqual } from 'lodash'
import Multi2 from '../../../modal/Common/Multi2'
import { useAtom, useAtomValue } from 'jotai'
import {
	deleteProduct,
	getSingleProducts,
	patchOutlet,
	patchSaleCategory,
	patchSaleType,
	postExcelSubmitProduct,
	postingMemoAndNote,
} from '../../../api/SellProduct'
import Excel from '../../../components/TableInner/Excel'
import { singleDispatchFields, SingleSalesDispatchFieldsCols } from '../../../constants/admin/Single'
import SingleSellProductSearchFields from './SingleProductSearchFields/SingleSellProductSearchFileds'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import useMutationQuery from '../../../hooks/useMutationQuery'
import { changeCategoryAtom, changeSaleTypeAtom } from '../../../store/Layout/Popup'
import SalseType from '../../../modal/Multi/SaleType'
import UploadV2 from '../../../modal/Upload/UploadV2'
import SingleProductModify from './SingleProductModify'
import useAlert from '../../../store/Alert/useAlert'
import useTableData from '../../../hooks/useTableData'
import useTableSelection from '../../../hooks/useTableSelection'
import { queryClient } from '../../../api/query'
import TableV2HiddenSection from '../../Table/TableV2HiddenSection'
import TableV2 from '../../Table/TableV2'

const paramData = {
	pageNum: 1,
	pageSize: 50,
	type: '단일',
	category: '판매제품',
}

const SalesProduct = () => {
	const { simpleConfirm, simpleAlert } = useAlert()
	const checkBoxSelect = useAtomValue(selectedRowsAtom)
	const parameter = useAtomValue(changeCategoryAtom)
	const parameter2 = useAtomValue(changeSaleTypeAtom)
	const [isMultiModal, setIsMultiModal] = useAtom(hyunDaiMultiModal)
	const singleModfiy = useAtomValue(singleProductModify)

	const [exFilterToggle, setExfilterToggle] = useState(toggleAtom)
	const [toggleMsg, setToggleMsg] = useState('On')
	const [selectProductNumber, setSelectProductNumber] = useState([])
	const [memo, setMemo] = useState([])
	const [isSaleType, setIsSaleType] = useState(false)
	const [uploadModal, setUploadModal] = useState(false)
	const [errorMsg, setErrorMsg] = useState('')
	const [excelToJson, setExcelToJson] = useState([])
	/// 아울렛 가격 일괄 설정 파트
	const [outletPrice, setOutletPrice] = useState(0)
	const [outletParameter, setOutletParameter] = useState({
		price: 0, // 아울렛 등록 가격
		numbers: [], // 제품번호 목록
	})

	const [param, setParam] = useState(paramData)
	const [getRow, setGetRow] = useState('')
	const [filterData, setFilteredData] = useState([])

	const { data, isSuccess, isLoading, refetch } = useReactQuery(param, 'product-list', getSingleProducts)
	const SaleProductList = data?.r
	const SaleProductPages = data?.pagination

	const { tableRowData, paginationData, totalWeight, totalCount } = useTableData({
		tableField: singleDispatchFields,
		serverData: filterData,
	})

	// 선택 항목
	const { selectedWeightStr, selectedCountStr } = useTableSelection({
		weightKey: '중량',
	})

	const { mutate } = useMutationQuery('change-category', patchSaleCategory)
	const { mutate: changeSaleType } = useMutationQuery('change-saleType', patchSaleType)
	const { mutate: changeOutlet } = useMutationQuery('change-outlet', patchOutlet)
	const { mutate: deletePr } = useMutationQuery('delete-Product', deleteProduct)
	const { mutate: memoAndNote } = useMutationQuery('memo-note', postingMemoAndNote)

	// 토글 쓰기
	const toggleBtnClick = () => {
		setExfilterToggle((prev) => !prev)
		if (exFilterToggle === true) {
			setToggleMsg('Off')
		} else {
			setToggleMsg('On')
		}
	}

	// Memo and Note
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

	const createMemoAndNote = () => {
		memoAndNote(memo, {
			onSuccess: () => {
				simpleAlert('저장 되었습니다.', () => {
					setSelectProductNumber([])
					queryClient.invalidateQueries('product-list')
				})
			},
			onError: (e) => {
				simpleAlert(e?.data?.message || '실패하였습니다.')
			},
		})
	}

	//판매 구분
	const changeSaleCategory = () => {
		return mutate(parameter, {
			onSuccess: () => {
				simpleAlert('저장되었습니다.', () => {
					setIsMultiModal(false)
					setSelectProductNumber([])
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

	// 판매 유형
	const handlechangeSaleType = () => {
		changeSaleType(parameter2, {
			onSuccess: () => {
				simpleAlert('변경되었습니다.', () => {
					setIsSaleType(false)
					setSelectProductNumber([])
					queryClient.invalidateQueries('product-list')
					queryClient.invalidateQueries('getSingleProducts')
				})
			},
			onError: (e) => {
				setErrorMsg(e?.data?.message || '적용 실패하였습니다.')
				simpleAlert(e?.data?.message || '적용 실패하였습니다.', () => {
					setIsSaleType(false)
				})
			},
		})
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
						queryClient.invalidateQueries('product-list')
					},
					onError: (e) => {
						simpleAlert(e?.data?.message || '적용 실패하였습니다.')
					},
				})
			})
		}
	}

	const handleDelete = () => {
		if (selectProductNumber) {
			simpleConfirm('정말로 삭제하시겠습니까?', () => {
				deletePr(selectProductNumber?.join(','), {
					onSuccess: () => {
						queryClient.invalidateQueries('product-list')
					},
					onError: (e) => {
						simpleAlert(e?.data?.message || '적용 실패하였습니다.')
					},
				})
			})
		}
	}

	const globalProductResetOnClick = () => {
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
		if (filterData && Array.isArray(filterData?.list)) {
			setGetRow(add_element_field(filterData.list, singleDispatchFields))
		}
	}, [filterData])

	useEffect(() => {
		const newFilterData = { list: SaleProductList, pagination: SaleProductPages }
		if (isSuccess && newFilterData?.list) {
			setFilteredData(newFilterData)
		}
	}, [isSuccess, data])

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
							<Link to={`/product/hyundai`}>
								<h6>현대제철</h6>
							</Link>

							<h5>판매제품</h5>
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
							<Excel getRow={getRow} sheetName="단일제품 판매제품 리스트" />
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
							<BtnBound />
							<WhiteBlackBtn
								onClick={() => {
									if (checkBoxSelect == null) simpleAlert('제품을 선택해 주세요.')
									else {
										setIsSaleType(true)
									}
								}}
							>
								판매 유형 변경
							</WhiteBlackBtn>
						</div>
					</TCSubContainer>
					<TableV2
						getRow={tableRowData}
						getCol={SingleSalesDispatchFieldsCols(true)}
						tablePagination={paginationData}
						onPageChange={onPageChange}
						loading={isLoading}
						changeFn={handleChangeMemo}
					/>
					<TCSubContainer bor>
						<div></div>
						<div style={{ display: 'flex', gap: '10px' }}>
							<WhiteRedBtn onClick={handleDelete}>제품 삭제</WhiteRedBtn>
							<WhiteBlackBtn onClick={() => setUploadModal(true)}>제품 등록</WhiteBlackBtn>
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
			{isSaleType && (
				<SalseType
					closeFn={(e, text) => {
						const { tagName } = e.target
						if (tagName === 'IMG') {
							setIsSaleType(false)
						}
					}}
					errMsg={errorMsg}
					saveFn={handlechangeSaleType}
					productNumbers={selectProductNumber}
				/>
			)}
			{uploadModal && (
				<UploadV2
					originEngRowField={singleDispatchFields}
					setModalSwitch={setUploadModal}
					postApi={postExcelSubmitProduct}
					setExcelToJson={setExcelToJson}
					excelToJson={excelToJson}
				/>
			)}
			{singleModfiy && <SingleProductModify title={'제품 수정'} />}
		</>
	)
}

export default SalesProduct
