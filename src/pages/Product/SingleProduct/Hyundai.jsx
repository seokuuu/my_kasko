import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BlackBtn, BtnBound, TGreyBtn, WhiteBlackBtn } from '../../../common/Button/Button'

import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import {
	hyunDaiMultiModal,
	hyundaiModalAtom,
	hyundaiSpecAtom,
	onClickCheckAtom,
	selectedRowsAtom,
	toggleAtom,
} from '../../../store/Layout/Layout'
import { patchOutlet, postingMemoAndNote } from '../../../api/SellProduct'

import { useAtom, useAtomValue } from 'jotai'
import { getSingleProducts, patchSaleCategory } from '../../../api/SellProduct'
import { getSPartList, getStorageList } from '../../../api/search'

import Excel from '../../../components/TableInner/Excel'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { SingleDispatchFieldsCols, singleDispatchFields } from '../../../constants/admin/Single'
import useMutationQuery from '../../../hooks/useMutationQuery'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import { isEqual } from 'lodash'
import {
	FilterContianer,
	FilterHeader,
	SubTitle,
	TCSubContainer,
	TableBottomWrap,
	TableContianer,
	Tilde,
} from '../../../modal/External/ExternalFilter'
import StandardFind from '../../../modal/Multi/StandardFind'

import Table from '../../Table/Table'
// import { requestDataAtom } from '../../../store/Table/SalesRequst'

import Multi2 from '../../../modal/Common/Multi2'
import { popupObject } from '../../../store/Layout/Layout'
import { changeCategoryAtom } from '../../../store/Layout/Popup'
import { KilogramSum } from '../../../utils/KilogramSum'
import useTablePaginationPageChange from '../../../hooks/useTablePaginationPageChange'
import { onSizeChange } from '../../Operate/utils'
import HyunDaiOriginal from './HyunDaiOriginal'
import { CustomInput } from '../../../modal/External/ExternalFilter'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import SingleSellProductSearchFields from './SingleProductSearchFields/SingleSellProductSearchFileds'
import useAlert from '../../../store/Alert/useAlert'

const Hyundai = ({}) => {
	const [memo, setMemo] = useState([])

	const paramData = {
		pageNum: 1,
		pageSize: 50,
		type: '일반',
		category: '현대제철',
	}
	const [param, setParam] = useState(paramData)

	const checkBoxSelect = useAtomValue(selectedRowsAtom)

	// Function to handle image click and toggle rotation
	const [isTableModal, setIsTableModal] = useAtom(onClickCheckAtom)
	const [getRow, setGetRow] = useState('')
	const { data, isSuccess, refetch, isLoading } = useReactQuery(param, 'product-list', getSingleProducts)

	const hyunDaiList = data?.r
	const hyunDaiPage = data?.pagination

	const tableField = useRef(SingleDispatchFieldsCols)
	const getCol = tableField.current
	const { data: storageList } = useReactQuery('', 'getStorageList', getStorageList)
	const { data: spartList } = useReactQuery('', 'getSPartList', getSPartList)
	// modal
	const [isMultiModal, setIsMultiModal] = useAtom(hyunDaiMultiModal)
	// const [requestData, setRequestData] = useAtom(requestDataAtom)

	const [filterData, setFilteredData] = useState([])

	const [exFilterToggle, setExfilterToggle] = useState(toggleAtom)
	const [toggleMsg, setToggleMsg] = useState('On')

	const [pagiNation, setPagination] = useState({})

	const [storages, setStorages] = useState([])
	const [sparts, setSparts] = useState([])

	const { simpleConfirm, showAlert } = useAlert()
	// 초기화

	useEffect(() => {
		if (storageList) return setStorages(storageList)
	}, [storageList])

	useEffect(() => {
		if (spartList) return setSparts(spartList)
	}, [spartList])

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
			setFilteredData(hyunDaiList)
			setPagination(hyunDaiPage)
		}
	}, [isSuccess])

	useEffect(() => {
		if (filterData === undefined) {
			hyunDaiList &&
				setFilteredData((p) => {
					hyunDaiList.map((i, idx) => ({
						순번: idx,
						...i,
					}))
				})
		}
		if (!isSuccess && !filterData) return null
		if (Array.isArray(filterData)) {
			setGetRow(add_element_field(filterData, singleDispatchFields))
		}
		//타입, 리액트쿼리, 데이터 확인 후 실행
	}, [isSuccess, filterData])

	const [selectProductNumber, setSelectProductNumber] = useState([])
	const [parameter, setParameter] = useAtom(changeCategoryAtom)
	const [errorMsg, setErrorMsg] = useState('')
	const [nowPopup, setNowPopup] = useAtom(popupObject)
	// 판매 구분 변경
	useEffect(() => {
		if (checkBoxSelect?.length === 0) return
		setSelectProductNumber(() => checkBoxSelect?.map((i) => i['제품 번호']))
	}, [checkBoxSelect])

	// 상태구분 변경

	const { mutate, isError } = useMutationQuery('change-category', patchSaleCategory)
	const { simpleAlert } = useAlert()
	const changeSaleCategory = () => {
		const res = mutate(parameter, {
			onSuccess: (d) => {
				simpleAlert('저장되었습니다.', () => {
					setIsMultiModal(false)
					window.location.reload()
				})
			},
			onError: (e) => {
				setErrorMsg(e.data.message)
				simpleAlert(e.data.message, () => {
					setIsMultiModal(false)
					window.location.reload()
				})
			},
		})

		return res
	}
	const { mutate: memoAndNote } = useMutationQuery('memo-note', postingMemoAndNote)
	const { mutate: changeOutlet } = useMutationQuery('change-outlet', patchOutlet)
	const [outletPrice, setOutletPrice] = useState(0)
	const [outletParameter, setOutletParameter] = useState({
		price: 10000, // 아울렛 등록 가격
		numbers: ['FC53683103-1'], // 제품번호 목록
	})
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
	useEffect(() => {
		setOutletParameter({
			price: outletPrice,
			numbers: selectProductNumber,
		})
	}, [selectProductNumber, outletPrice])

	// 아울렛
	const handlechangeOutlet = () => {
		console.log('아울렛 변경')
		changeOutlet(outletParameter, {
			onSuccess: () => {
				showAlert({
					title: '일괄 변경되었습니다.',
					func: () => {
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
	}
	const createMemoAndNote = () => {
		memoAndNote(memo, {
			onSuccess: () => {
				showAlert({
					title: '저장 되었습니다.',
					func: () => {
						window.location.reload()
					},
				})
			},
		})
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
	const { pagination, onPageChanage } = useTablePaginationPageChange(data, setParam)
	return (
		<>
			<FilterContianer>
				<FilterHeader>
					<div style={{ display: 'flex' }}>
						<h1>단일 관리</h1>
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
							조회 목록 (선택 <span>{checkBoxSelect?.length > 0 ? checkBoxSelect?.length : '0'}</span> /{' '}
							{pagiNation ? pagiNation?.listCount : hyunDaiPage?.listCount}개 )
							<Hidden />
						</div>
						<div style={{ display: 'flex', gap: '10px' }}>
							<PageDropdown handleDropdown={(e) => onSizeChange(e, setParam)} />
							<Excel getRow={getRow} sheetName="단일제품 현대제철" />
						</div>
					</TCSubContainer>
					<TCSubContainer bor>
						<div>
							선택 중량<span> {KilogramSum(checkBoxSelect)} </span>kg / 총{' '}
							{pagiNation
								? pagiNation?.totalWeight?.toLocaleString('ko-kr')
								: hyunDaiPage?.totalWeight?.toLocaleString('ko-kr')}{' '}
							중량 kg
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
						</div>
					</TCSubContainer>
					<Table
						getRow={getRow}
						getCol={getCol}
						setChoiceComponent={() => {}}
						handleOnRowClicked={() => {}}
						tablePagination={pagination}
						onPageChange={onPageChanage}
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

			{isMultiModal === true && (
				<Multi2
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
		</>
	)
}

export default Hyundai
