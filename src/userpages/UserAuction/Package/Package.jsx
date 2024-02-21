import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BlackBtn, BtnBound, GreyBtn, SkyBtn, TGreyBtn, TWhiteBtn, WhiteGrnBtn } from '../../../common/Button/Button'
import { MainSelect } from '../../../common/Option/Main'
import { storageOptions } from '../../../common/Option/SignUp'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'

import { CheckBox } from '../../../common/Check/Checkbox'

import {
	CustomInput,
	DoubleWrap,
	ExRadioWrap,
	FilterContianer,
	FilterFooter,
	FilterHeader,
	FilterHeaderAlert,
	FilterLeft,
	FilterRight,
	FilterSubcontianer,
	Input,
	MiniInput,
	PartWrap,
	PWRight,
	ResetImg,
	RowWrap,
	SubTitle,
	TableContianer,
	TCSubContainer,
	Tilde,
} from '../../../modal/External/ExternalFilter'

import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../../common/Check/RadioImg'

import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { getBidding, postBidding } from '../../../api/auction/bidding'
import { getAuctionDestination } from '../../../api/auction/winning'
import { AuctionBiddingFields, AuctionBiddingFieldsCols } from '../../../constants/admin/Auction'
import useMutationQuery from '../../../hooks/useMutationQuery'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import InventoryFind from '../../../modal/Multi/InventoryFind'
import Table from '../../../pages/Table/Table'
import { userPageSingleDestiFindAtom } from '../../../store/Layout/Layout'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import UserBiddingSearchFields from '../Single/UserBiddingSearchFields'
import { isEqual } from 'lodash'
import useTableSelection from '../../../hooks/useTableSelection'
import useTableData from '../../../hooks/useTableData'
import { PROD_COL_NAME } from '../../../constants/user/constantKey'
import AddWishButton from '../../UserSales/_components/AddWishButton'
import { CAUTION_CATEGORY, CautionBox } from '../../../components/CautionBox'
import useAlert from '../../../store/Alert/useAlert'

const Single = ({}) => {
	const { simpleAlert, simpleConfirm, showAlert } = useAlert()
	const radioDummy = ['전체', '미응찰', '관심제품', '응찰']
	const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))
	const [destinationPopUp, setDestinationPopUp] = useAtom(userPageSingleDestiFindAtom)
	const [savedRadioValue, setSavedRadioValue] = useState('')
	useEffect(() => {
		const checkedIndex = checkRadio.findIndex((isChecked, index) => isChecked && index < radioDummy.length)

		// 찾지 못하면 -1을 반환하므로, -1이 아닌 경우(찾은 경우)
		// if (checkedIndex !== -1) {
		//   const selectedValue = radioDummy[checkedIndex];
		//   setSavedRadioValue(selectedValue); //내 state에 반환
		//   setInput({ ...input, type: selectedValue }); //서버 전송용 input에 반환
		// }
	}, [checkRadio])

	const handleSelectChange = (selectedOption, name) => {
		// setInput(prevState => ({
		//   ...prevState,
		//   [name]: selectedOption.label,
		// }));
	}
	const [isRotated, setIsRotated] = useState(false)

	// Function to handle image click and toggle rotation
	const handleImageClick = () => {
		setIsRotated((prevIsRotated) => !prevIsRotated)
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

	const { data: auctionDestination } = useReactQuery('', 'getAuctionDestination', getAuctionDestination)

	console.log('auctionDestination', auctionDestination?.data?.data)

	const [customerData, setCustomerData] = useState()
	const [propsUid, setPropsUid] = useState(null)
	const [destiObject, setDestiObject] = useState()

	const productListInner = {
		biddingPrice: null,
		customerDestinationUid: null,
	}

	const [winningCreateInput, setwinningCreateInput] = useState(productListInner)

	console.log('winningCreateInput', winningCreateInput)

	const [getRow, setGetRow] = useState('')
	const tableField = useRef(AuctionBiddingFieldsCols)
	const getCol = tableField.current
	const queryClient = useQueryClient()
	const checkedArray = useAtom(selectedRowsAtom)[0]
	const [tablePagination, setTablePagination] = useState([])

	const paramData = {
		pageNum: 1,
		pageSize: 50,
		type: '패키지',
	}
	const [param, setParam] = useState(paramData)
	const [liveStatus, setLiveStatus] = useState('LIVEgetBidding')
	// 전체 GET
	const { isLoading, isError, data, isSuccess, refetch } = useReactQuery(param, liveStatus, getBidding)
	const resData = data?.data?.data?.list
	const resPagination = data?.data?.data?.pagination

	useEffect(() => {
		let getData = resData
		if (!isSuccess && !resData) return
		if (Array.isArray(getData)) {
			setGetRow(add_element_field(getData, AuctionBiddingFields))
			setTablePagination(resPagination)
		}
	}, [isSuccess, resData])

	// 경매 번호 가져오기
	const auctionNumber = checkedArray?.[0]?.['경매 번호']

	const init = {
		auctionNumber: null,
		type: '패키지',
	}
	const [winningCreateData, setWinningCreateData] = useState(init)

	//
	useEffect(() => {
		const selectedObject = auctionDestination?.data?.data.find((item) => item.uid === propsUid)
		setDestiObject(selectedObject)
		setWinningCreateData((p) => ({
			...p,
			auctionNumber: auctionNumber,
		}))
	}, [propsUid, auctionNumber])

	const [finalInput, setFinalInput] = useState({
		biddingPrice: null,
		customerDestinationUid: null,
	})

	// biddingList에 들어갈 3총사를 다 넣어줌.
	useEffect(() => {
		const updatedProductList = checkedArray?.map((item) => ({
			productUid: item['제품 고유 번호'],
			biddingPrice:
				item['응찰가'] === 0 ? item['시작가'] + finalInput?.biddingPrice : item['응찰가'] + finalInput?.biddingPrice,
			customerDestinationUid: finalInput?.customerDestinationUid,
			// 여기에 다른 필요한 속성을 추가할 수 있습니다.
		}))

		// winningCreateData를 업데이트하여 productList를 갱신
		setWinningCreateData((prevData) => ({
			...prevData,
			biddingList: updatedProductList,
		}))
	}, [checkedArray, finalInput])

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

	// 응찰 Mutate
	const { mutate: postMutation } = useMutation(postBidding, {
		onSuccess() {
			showAlert({
				title: '응찰이 완료되었습니다.',
				content: '',
				func: () => {
					refetch()
					queryClient.invalidateQueries('auction')
				},
			})
		},
		onError: () => {
			simpleAlert('오류가 발생했습니다. 다시 시도해주세요.')
		},
	})

	// 응찰 버튼 POST
	const confirmOnClickHandler = () => {
		postMutation(winningCreateData)
	}

	const globalProductResetOnClick = () => {
		// if resetting the search field shouldn't rerender table
		// then we need to create paramData object to reset the search fields.
		setParam(paramData)
	}
	// import
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

	const [values, setValues] = useState({})
	const [valueDesti, setValueDesti] = useState()

	const onCellValueChanged = (params) => {
		const p = params.data
		console.log('바뀌는 값 확인', p['제품 고유 번호'])
		setValues((prevValues) => ({
			...prevValues,
			biddingPrice: p['응찰가'],
			productUid: p['제품 고유 번호'],
		}))
		setValueDesti(p['경매 번호'])
	}

	console.log('winningCreateData', winningCreateData)

	/* ==================== 관심상품 등록 start ==================== */
	/**
	 * @todo
	 * [1] 테이블 데이터를 아래 hook의 tableRowData로 사용하므로 다른 기능에 충돌이 있는지 확인이 필요합니다.
	 * [2] 선택 데이터, 총 중량 등 아래 hook에서 제공하는 변수와 겹치는 항목이 있다면 정리가 필요합니다.
	 */
	// 선택상품(checked product) - 선택상품 정보를 조회합니다.
	const { selectedData, selectedWeightStr, selectedWeight, selectedCountStr } = useTableSelection({
		weightKey: '중량',
	})
	// 테이블 데이터, 페이지 데이터, 총 중량
	const { tableRowData, paginationData, totalWeightStr, totalCountStr, totalCount } = useTableData({
		tableField: AuctionBiddingFields,
		serverData: data?.data?.data,
		wish: { display: true, key: ['productNumber', 'packageNumber'] },
		best: { display: true },
	})
	/* ==================== 관심상품 등록 end ==================== */

	const destiOnClickHandler = () => {
		simpleAlert('적용 되었습니다.', () => {
			setFinalInput((prevFinalInput) => ({
				...prevFinalInput,
				customerDestinationUid: destiObject && destiObject.uid,
			}))
			setValues((p) => ({
				...p,
				customerDestinationUid: destiObject && destiObject.uid,
			}))
		})
	}

	return (
		<>
			{' '}
			<FilterContianer>
				<FilterHeader>
					<div style={{ display: 'flex' }}>
						<h1>경매 응찰</h1>
						<SubTitle>
							<Link to={`/userpage/auctionsingle`}>
								<h6>단일</h6>
							</Link>
							<h5>패키지</h5>
						</SubTitle>
					</div>
					{/* 토글 쓰기 */}
					<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
				</FilterHeader>
				{/* 공지사항 */}
				<CautionBox category={CAUTION_CATEGORY.auction} />
				{exFilterToggle && (
					<>
						<GlobalProductSearch
							param={param}
							isToggleSeparate={true}
							renderCustomSearchFields={(props) => <UserBiddingSearchFields {...props} />} // 만들어야함 -> WinningSearchFields
							globalProductSearchOnClick={globalProductSearchOnClick} // import
							globalProductResetOnClick={globalProductResetOnClick} // import
						/>
					</>
				)}
				<TableContianer>
					<TCSubContainer bor>
						<div>
							조회 목록 (선택 <span>{selectedCountStr}</span> / {totalCountStr}개 )
							<Hidden />
						</div>
						<div style={{ display: 'flex', gap: '10px' }}>
							<PageDropdown handleDropdown={handleTablePageSize} />
							<Excel getRow={getRow} />
							<AddWishButton products={selectedData} productNumberKey={PROD_COL_NAME.packageNumber} />
						</div>
					</TCSubContainer>
					<TCSubContainer bor>
						<div>
							선택중량 <span> {selectedWeightStr} </span> (kg) / 총 중량 {totalWeightStr} (kg)
						</div>
						<div
							style={{
								display: 'flex',
								gap: '10px',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<p>목적지</p>
							<CustomInput placeholder="h50" width={60} height={32} defaultValue={destiObject?.code} readOnly />
							<CustomInput
								placeholder="목적지명"
								width={120}
								height={32}
								defaultValue={destiObject?.destinationName}
								readOnly
							/>
							<CustomInput
								placeholder="도착지 연락처"
								width={120}
								height={32}
								defaultValue={destiObject?.name}
								readOnly
							/>
							<TWhiteBtn
								style={{ width: '50px' }}
								height={30}
								onClick={() => {
									setDestinationPopUp(true)
								}}
							>
								찾기
							</TWhiteBtn>
							<TGreyBtn
								// onClick={() => {
								// 	setFinalInput((prevFinalInput) => ({
								// 		...prevFinalInput,
								// 		customerDestinationUid: destiObject && destiObject.uid,
								// 	}))
								// }}
								onClick={destiOnClickHandler}
							>
								적용
							</TGreyBtn>
							<BtnBound style={{ margin: '0px' }} />
							<p>일괄 경매 응찰</p>
							<CustomInput
								placeholder="응찰가 + 최고가 입력"
								width={140}
								height={32}
								onChange={(e) => {
									setwinningCreateInput((p) => ({
										...p,
										biddingPrice: parseInt(e.target.value) || null,
									}))
								}}
							/>
							<TGreyBtn
								height={30}
								style={{ width: '50px' }}
								onClick={() => {
									setFinalInput((p) => ({
										...p,

										biddingPrice: winningCreateInput?.biddingPrice,
									}))
								}}
							>
								적용
							</TGreyBtn>
							<BtnBound style={{ margin: '0px' }} />
							<SkyBtn style={{ width: '200px', fontSize: '20px' }} height={50} onClick={confirmOnClickHandler}>
								응찰
							</SkyBtn>
						</div>
					</TCSubContainer>
					<Table
						getCol={getCol}
						getRow={tableRowData}
						tablePagination={tablePagination}
						onPageChange={onPageChange}
						changeFn={onCellValueChanged}
					/>
				</TableContianer>
				{destinationPopUp && (
					<InventoryFind
						title={'목적지 찾기'}
						type={'낙찰 생성'}
						setSwitch={setDestinationPopUp}
						data={auctionDestination}
						setPropsUid={setPropsUid}
					/>
				)}
			</FilterContianer>
		</>
	)
}

export default Single
