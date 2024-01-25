import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BlackBtn, BtnBound, TGreyBtn, WhiteBlackBtn, WhiteRedBtn } from '../../../common/Button/Button'

import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import {
	CustomInput,
	FilterContianer,
	FilterHeader,
	SubTitle,
	TCSubContainer,
	TableBottomWrap,
	TableContianer,
} from '../../../modal/External/ExternalFilter'
import {
	blueModalAtom,
	popupAtom,
	popupObject,
	selectedRowsAtom,
	singleProductModify,
	toggleAtom,
} from '../../../store/Layout/Layout'
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
import {
	SingleDispatchFieldsCols,
	SingleSalesDispatchFieldsCols,
	singleDispatchFields,
} from '../../../constants/admin/Single'
import SingleSellProductSearchFields from './SingleProductSearchFields/SingleSellProductSearchFileds'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import StandardFind from '../../../modal/Multi/StandardFind'
import { specAtom } from '../../../store/Layout/Layout'
import { KilogramSum } from '../../../utils/KilogramSum'
import useTablePaginationPageChange from '../../../hooks/useTablePaginationPageChange'
import { onSizeChange } from '../../Operate/utils'
import Table from '../../Table/Table'
import { hyunDaiMultiModal } from '../../../store/Layout/Layout'
import useMutationQuery from '../../../hooks/useMutationQuery'
import { changeCategoryAtom } from '../../../store/Layout/Popup'
import SalseType from '../../../modal/Multi/SaleType'
import { changeSaleTypeAtom } from '../../../store/Layout/Popup'
import UploadV2 from '../../../modal/Upload/UploadV2'
import SingleProductModify from './SingleProductModify'
import { popupDummy } from '../../../modal/Alert/PopupDummy'
import AlertPopup from '../../../modal/Alert/AlertPopup'
import useAlert from '../../../store/Alert/useAlert'
const SalesProduct = () => {
	const [popup, setPopup] = useAtom(popupAtom)
	// const checkSales = ['전체', '미응찰', '관심제품', '응찰']

	//state
	const [filterData, setFilteredData] = useState([])
	//store
	const [spec, setSpec] = useAtom(specAtom)
	const [isModal, setIsModal] = useState(blueModalAtom)
	const [pagination, setPagination] = useState({})
	const checkBoxSelect = useAtomValue(selectedRowsAtom)
	const [isMultiModal, setIsMultiModal] = useAtom(hyunDaiMultiModal)
	const [parameter, setParameter] = useAtom(changeCategoryAtom)
	const [parameter2, setParameter2] = useAtom(changeSaleTypeAtom)
	const { simpleConfirm, showAlert, simpleAlert } = useAlert()
	// 판매유형 변경

	const [isSaleType, setIsSaleType] = useState(false)
	const [singleModfiy, setSingleModify] = useAtom(singleProductModify)
	const [uploadModal, setUploadModal] = useState(false)
	const [isRotated, setIsRotated] = useState(false)
	const [errorMsg, setErrorMsg] = useState('')
	const [nowPopup, setNowPopup] = useAtom(popupObject)
	// Function to handle image click and toggle rotation
	const paramData = {
		pageNum: 1,
		pageSize: 50,
		type: '일반',
		category: '동은스틸',
	}
	const [param, setParam] = useState(paramData)
	const { data, isSuccess, isLoading, refetch } = useReactQuery(param, 'product-list', getSingleProducts)
	const SaleProductList = data?.r
	const SaleProductPages = data?.pagination

	const [getRow, setGetRow] = useState('')
	const tableField = useRef(SingleSalesDispatchFieldsCols)
	const getCol = tableField.current
	const [memo, setMemo] = useState([])
	// Filter State

	// 토글 쓰기
	const [exFilterToggle, setExfilterToggle] = useState(toggleAtom)
	const [toggleMsg, setToggleMsg] = useState('On')
	const [selectProductNumber, setSelectProductNumber] = useState([])
	const toggleBtnClick = () => {
		setExfilterToggle((prev) => !prev)
		if (exFilterToggle === true) {
			setToggleMsg('Off')
		} else {
			setToggleMsg('On')
		}
	}

	useEffect(() => {
		if (filterData === undefined) {
			SaleProductList && setFilteredData(SaleProductList)
		}

		if (!isSuccess && !filterData) return
		if (Array.isArray(filterData)) {
			setGetRow(add_element_field(filterData, singleDispatchFields))
		}
		//타입, 리액트쿼리, 데이터 확인 후 실행
	}, [isSuccess, filterData])

	useEffect(() => {
		if (isSuccess) {
			setFilteredData(SaleProductList)
			setPagination(SaleProductPages)
		}
	}, [isSuccess])

	// 초기화

	useEffect(() => {
		if (checkBoxSelect?.length === 0) return
		setSelectProductNumber(() => checkBoxSelect?.map((i) => i['제품 번호']))
	}, [checkBoxSelect])
	const [excelToJson, setExcelToJson] = useState([])
	const { mutate, isError } = useMutationQuery('change-category', patchSaleCategory)
	const { mutate: changeSaleType, isError: saleTypeError } = useMutationQuery('change-saleType', patchSaleType)
	const { mutate: changeOutlet, isError: outletError } = useMutationQuery('change-outlet', patchOutlet)
	const { mutate: deletePr, isError: deleteError } = useMutationQuery('delete-Product', deleteProduct)
	const { mutate: memoAndNote } = useMutationQuery('memo-note', postingMemoAndNote)

	// Memo and Note
	const handleChangeMemo = (params) => {
		const data = params?.data
		setMemo((p) => [
			...p,
			{
				number: data['제품 번호'],
				memo: data['비고'] || '',
				note: data['메모'] || '',
			},
		])
	}

	const createMemoAndNote = () => {
		memoAndNote(memo, {
			onSuccess: (d) => {
				if (d?.data?.status === 200) {
					showAlert({
						title: '저장되었습니다.',
						func: () => {
							setPopup(false)
							window.location.reload()
						},
					})
				}
				if (d?.data?.status === 400) {
					showAlert({
						title: `${d?.data?.message}`,
						func: () => {
							setPopup(false)
							window.location.reload()
						},
					})
				}
			},
		})
	}

	//판매 구분
	const changeSaleCategory = () => {
		const res = mutate(parameter, {
			onSuccess: (d) => {
				showAlert({
					title: '저장되었습니다.',
					func: () => {
						setIsMultiModal(false)
						window.location.reload()
					},
				})
			},
			onError: (e) => {
				setErrorMsg(e.data.message)
				setNowPopup({
					num: '1-12',
					title: '',
					content: `${e.data.message}`,
					func: () => {
						console.log('hi')
						setIsMultiModal(false)
					},
				})
			},
		})

		return res
	}
	// 판매 유형
	const handlechangeSaleType = () => {
		const res = changeSaleType(parameter2, {
			onSuccess: () => {
				setIsMultiModal(false)
				window.location.reload()
			},
			onError: (e) => {
				setErrorMsg(e.data.message)
				setNowPopup({
					num: '1-12',
					title: '',
					content: `${e.data.message}`,
					func: () => {
						console.log('hi')
						setIsMultiModal(false)
					},
				})
			},
		})

		return res
	}

	/// 아울렛 가격 일괄 설정 파트
	const [outletPrice, setOutletPrice] = useState(0)
	const [outletParameter, setOutletParameter] = useState({
		price: 0, // 아울렛 등록 가격
		numbers: [], // 제품번호 목록
	})

	useEffect(() => {
		setOutletParameter({
			price: outletPrice,
			numbers: selectProductNumber,
		})
	}, [selectProductNumber, outletPrice])

	// 아울렛
	const handlechangeOutlet = () => {
		const res = changeOutlet(outletParameter, {
			onSuccess: (d) => {
				if (d?.data?.status) {
					showAlert({
						title: '일괄 변경되었습니다.',
						func: () => {
							window.location.reload()
						},
					})
				}
			},
			onError: (e) => {
				setErrorMsg(e.data.message)
				showAlert({
					title: `${e.data.message}`,
					func: () => {
						window.location.reload()
					},
				})
			},
		})
		return res
	}
	// console.log(selectProductNumber.join(','))
	const handleDelete = () => {
		const confirm = window.confirm('정말로 삭제하시겠습니까?')
		if (confirm) {
			deletePr(selectProductNumber?.join(','), {
				onSuccess: () => {
					window.location.reload()
				},
			})
		} else return
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
	const { pagination: customPagination, onPageChanage } = useTablePaginationPageChange(data, setParam)
	return (
		<>
			{' '}
			<FilterContianer>
				<FilterHeader>
					<div style={{ display: 'flex' }}>
						<h1>단일 관리</h1>
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
							조회 목록 (선택 <span>{checkBoxSelect?.length > 0 ? checkBoxSelect?.length : '0'}</span> /{' '}
							{pagination ? pagination?.listCount : SaleProductPages?.listCount}개 )
							<Hidden />
						</div>
						<div style={{ display: 'flex', gap: '10px' }}>
							<PageDropdown handleDropdown={(e) => onSizeChange(e, setParam)} />
							<Excel getRow={getRow} sheetName="단일제품 판매제품 리스트" />
						</div>
					</TCSubContainer>
					<TCSubContainer bor>
						<div>
							선택 중량<span> {KilogramSum(checkBoxSelect)} </span>kg / 총{' '}
							{pagination ? pagination?.totalWeight : SaleProductPages?.totalWeight} 중량 kg
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
									if (checkBoxSelect?.length > 0) setIsMultiModal(true)
									else {
										simpleAlert('제품을 선택해 주세요.')
									}
								}}
							>
								판매 구분 변경
							</WhiteBlackBtn>
							<BtnBound />
							<WhiteBlackBtn
								onClick={() => {
									if (checkBoxSelect.length > 0) {
										setIsSaleType(true)
									} else {
										simpleAlert('1개 이상의 품목을 선택해주세요')
									}
								}}
							>
								판매 유형 변경
							</WhiteBlackBtn>
						</div>
					</TCSubContainer>
					<Table
						getRow={getRow}
						getCol={getCol}
						loading={isLoading}
						tablePagination={customPagination}
						onPageChange={onPageChanage}
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
						// console.log('TARGET :', e.target.tagName)
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
			{/* {popup && <AlertPopup saveFn={createMemoAndNote} err={'안됩니다'} setPopupSwitch={setPopup} />} */}
		</>
	)
}

export default SalesProduct
