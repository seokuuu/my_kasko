import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BtnBound, SkyBtn, TGreyBtn, TWhiteBtn } from '../../../common/Button/Button'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { biddingAgreementModal, selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'

import {
	CustomInput,
	FilterContianer,
	FilterHeader,
	SubTitle,
	TableContianer,
	TableIndicateWrap,
	TCSubContainer,
} from '../../../modal/External/ExternalFilter'

import PageDropdown from '../../../components/TableInner/PageDropdown'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtom, useAtomValue } from 'jotai'
import { isEqual } from 'lodash'
import { getAgreement, getBidding, postAgreement, postBidding } from '../../../api/auction/bidding'
import { getAuctionDestination } from '../../../api/auction/winning'
import { CAUTION_CATEGORY, CautionBox } from '../../../components/CautionBox'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import Excel from '../../../components/TableInner/Excel'
import { AuctionBiddingFields, AuctionBiddingFieldsCols } from '../../../constants/admin/Auction'
import { PROD_COL_NAME } from '../../../constants/user/constantKey'
import { useCheckAuction } from '../../../hooks/useCheckAuction'
import useReactQuery from '../../../hooks/useReactQuery'
import useWishBiddingQuery from '../../../hooks/useWishBiddingQuery'
import useTableData from '../../../hooks/useTableData'
import useTableSelection from '../../../hooks/useTableSelection'
import Agreement from '../../../modal/Common/Agreement'
import InventoryFind from '../../../modal/Multi/InventoryFind'
import Table from '../../../pages/Table/Table'
import TableV2HiddenSection from '../../../pages/Table/TableV2HiddenSection'
import useAlert from '../../../store/Alert/useAlert'
import { authAtom } from '../../../store/Auth/auth'
import { auctionStartAtom, userPageSingleDestiFindAtom } from '../../../store/Layout/Layout'
import { useLoading } from '../../../store/Loading/loadingAtom'
import { wishProductNumbersAtom } from '../../../store/Product'
import AddWishButton from '../../UserSales/_components/AddWishButton'
import UserBiddingSearchFields from './UserBiddingSearchFields'

const Single = ({}) => {
	const checkWish = useAtomValue(wishProductNumbersAtom)
	const [aucCheck, setAucCheck] = useAtom(auctionStartAtom) // 경매 시작 atom
	const auth = useAtomValue(authAtom) // 이거 auction.js에서 hook으로 바꾸기
	const nowAuction = useCheckAuction() // 현재 경매 여부 체크
	const [live, setLive] = useState(true) // LIVE get 일시 중단

	const navigate = useNavigate()
	const [addedInput, setAddedInput] = useState(null) // 일괄 경매 응찰 input state
	const [checkedBiddingPrice, setCheckedBiddingPrice] = useState(null) // 체크된 응찰가
	const { simpleAlert, simpleConfirm, showAlert } = useAlert()
	const [destinationPopUp, setDestinationPopUp] = useAtom(userPageSingleDestiFindAtom)
	const [agreementModal, setAgreementModal] = useAtom(biddingAgreementModal) // 입찰 동의서 모달

	const [checkAgreement, setCheckAgreement] = useState({
		auctionNumber: '',
		agreement: '',
	})

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

	const [customerData, setCustomerData] = useState()
	const [propsUid, setPropsUid] = useState(null)
	const [destiObject, setDestiObject] = useState() //

	const productListInner = {
		biddingPrice: null,
		customerDestinationUid: null,
	}

	const [winningCreateInput, setwinningCreateInput] = useState(productListInner)

	const [getRow, setGetRow] = useState('')
	const [newGetRow, setNewGetRow] = useState({})

	const queryClient = useQueryClient()
	// const checkedArrayState = useAtom(selectedRowsAtom)[0]
	const [tablePagination, setTablePagination] = useState([])
	const [checkedArrayState, setCheckedArrayState] = useAtom(selectedRowsAtom)

	const uids = checkedArrayState?.map((item) => item && item['제품 고유 번호'])

	const paramData = {
		pageNum: 1,
		pageSize: 50,
		type: '단일',
	}
	const [param, setParam] = useState(paramData)

	const [realAucNum, setRealAucNum] = useState(null)

	const { data: getAgreementData } = useReactQuery(realAucNum, 'getAgreement', getAgreement)

	// 전체 GET
	const { isLoading, isError, data, isSuccess, refetch } = useWishBiddingQuery(param, live, getBidding, nowAuction)
	const originData = data?.data?.data
	const [oriData, setOridata] = useState()

	// 관심 제품 필터
	/**
	* @description
	- checkWish 목록을 가져와야하니, dependency에 넣어주자
	- 관심제품 atom이 true && 검색 버튼 true여야지
	- 초기화 누르면
	*/
	const wishFilterData = oriData?.list.filter((item) => checkWish && checkWish?.includes(item?.productNumber))

	const tableField = useMemo(() => {
		return AuctionBiddingFieldsCols(checkedArrayState)
	}, [checkedArrayState])

	const resData = data?.data?.data?.list
	const resPagination = data?.data?.data?.pagination

	// 시작가 제한 Data.

	// 초기 목적지 GET
	const { data: destiData } = useReactQuery('', 'getAuctionDestination', getAuctionDestination)

	const initDestiData = destiData?.data?.data
	const filteredDestiData = initDestiData?.filter((item) => item.represent === 1)
	const firstDestiData = filteredDestiData?.[0]

	// const wishedProducts =
	// 	originData?.list &&
	// 	originData?.list?.filter((product) => {
	// 		const hasWishedProductNumber = product['제품 번호']?.wish
	// 		const hasWishedPackageNumber = product['패키지 번호']?.wish
	// 		return hasWishedProductNumber || hasWishedPackageNumber
	// 	})

	const restrictStartPriceData = {
		...originData,
		list: originData?.list?.map((item) => ({
			...item,
			auctionStartPrice: null,
		})),
	}

	useEffect(() => {
		let restrictOriginData =
			auth?.statusList?.auctionStatus === '시작가 제한' && aucCheck === 'START' ? restrictStartPriceData : originData

		const filteredAucNum = resData && resData.map((x) => x['auctionNumber'])
		const checkAgreeAucNum = filteredAucNum && filteredAucNum[0]
		if (!isSuccess && !resData) return
		if (Array.isArray(originData?.list)) {
			if (live) {
				setOridata(restrictOriginData)
				// setGetRow(add_element_field(getData, AuctionBiddingFields))
			}
			setTablePagination(resPagination)
			setRealAucNum(checkAgreeAucNum)
			setCheckAgreement((prev) => ({
				...prev,
				auctionNumber: checkAgreeAucNum,
			}))
		}
	}, [isSuccess, initDestiData, originData])

	// 111 - 1
	// 목적지 관련 rows 빈 값일 시 대표 목적지 자동 Mapping
	// useEffect(() => {
	// 	if (firstDestiData || destiObject) {
	// 		const updatedResData = originData?.list?.map((item) => {
	// 			if (
	// 				!item.destinationCode ||
	// 				!item.destinationName ||
	// 				!item.customerDestinationName ||
	// 				!item.customerDestinationAddress ||
	// 				!item.customerDestinationPhone
	// 			) {
	// 				item.destinationCode = firstDestiData?.destinationCode
	// 				item.destinationName = firstDestiData?.destinationName
	// 				item.customerDestinationName = firstDestiData?.customerDestinationName
	// 				item.customerDestinationAddress = firstDestiData?.address
	// 				item.customerDestinationPhone = firstDestiData?.phone
	// 			}

	// 			return item
	// 		})

	// 		setOridata((prevData) => ({
	// 			...prevData,
	// 			list: updatedResData,
	// 		}))
	// 	}
	// }, [firstDestiData, destiObject])

	// 경매 번호 가져오기
	const auctionNumber = checkedArrayState?.[0]?.['경매 번호']

	const init = {
		auctionNumber: null,
		type: '단일',
	}
	const [winningCreateData, setWinningCreateData] = useState(init)
	//
	useEffect(() => {
		const selectedObject = auctionDestination?.data?.data.find((item) => item.uid === propsUid)
		if (propsUid) setDestiObject(selectedObject)
		setWinningCreateData((p) => ({
			...p,
			auctionNumber: auctionNumber,
		}))
	}, [propsUid, auctionNumber, param])

	const [finalInput, setFinalInput] = useState({
		biddingPrice: null,
		customerDestinationUid: null,
	})

	// 첫 렌더시 초기 및 대표 목적지 set
	useMemo(() => {
		setDestiObject(firstDestiData)
		setFinalInput((p) => ({
			...p,
			customerDestinationUid: firstDestiData?.uid,
		}))
	}, [destiData])

	// biddingList에 들어갈 3총사를 다 넣어줌.
	useEffect(() => {
		const updatedProductList = checkedArrayState?.map((item) => ({
			productUid: item['제품 고유 번호'],
			biddingPrice:
				parseInt(item?.['현재 최고 가격']?.replace(/,/g, '')) === 0
					? parseInt(item?.['시작가']?.replace(/,/g, '')) + (finalInput?.biddingPrice || 1)
					: parseInt(item?.['현재 최고 가격']?.replace(/,/g, '')) >= 1 &&
					  parseInt(item?.['현재 최고 가격']?.replace(/,/g, '')) <=
							parseInt(item?.['나의 최고 응찰 가격']?.replace(/,/g, ''))
					? parseInt(item?.['나의 최고 응찰 가격']?.replace(/,/g, '')) + (finalInput?.biddingPrice || 1)
					: parseInt(item?.['현재 최고 가격']?.replace(/,/g, '')) + (finalInput?.biddingPrice || 1),

			customerDestinationUid: finalInput?.customerDestinationUid ?? destiObject?.uid,
		}))

		// winningCreateData를 업데이트하여 productList를 갱신
		setWinningCreateData((prevData) => ({
			...prevData,
			biddingList: updatedProductList,
		}))
	}, [checkedArrayState, finalInput, param, destiObject])

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
		setCheckedArrayState([])
	}

	const { mutate: postMutation, isLoading: postAuctionLoading } = useMutation(postBidding, {
		onSuccess() {
			showAlert({
				title: '응찰이 완료되었습니다.',
				content: '',
				func: () => {
					refetch()
					setWinningCreateData({
						...init,
						auctionNumber: auctionNumber,
					})
					setwinningCreateInput({
						biddingPrice: null,
						customerDestinationUid: null,
					})
					setFinalInput({
						biddingPrice: null,
						customerDestinationUid: null,
					})
					queryClient.invalidateQueries('auction')
				},
			})
		},
		onError: (error) => {
			setWinningCreateData(init)
			setwinningCreateInput({
				biddingPrice: null,
				customerDestinationUid: null,
			})
			setFinalInput({
				biddingPrice: null,
				customerDestinationUid: null,
			})
			simpleAlert(error?.data?.message || '오류가 발생했습니다. 다시 시도해주세요.')
		},
	})

	// 경매 로딩
	useLoading(isLoading || postAuctionLoading)

	// 응찰 버튼 POST
	const confirmOnClickHandler = () => {
		if (!winningCreateData.auctionNumber) {
			simpleAlert('응찰할 제품을 선택해주세요.')
			return
		}
		if (!isLoading || !postAuctionLoading) {
			postMutation(winningCreateData)
		}
		setLive(true)
	}

	const globalProductResetOnClick = () => {
		// if resetting the search field shouldn't rerender table
		// then we need to create paramData object to reset the search fields.
		setParam(paramData)
	}
	// import
	const globalProductSearchOnClick = (userSearchParam) => {
		let newProductNumber = ''
		if (userSearchParam.biddingStatus === '관심제품') {
			newProductNumber = checkWish.join(',')
		}
		setParam((prevParam) => {
			if (isEqual(prevParam, { ...prevParam, ...userSearchParam })) {
				refetch()
				return prevParam
			}
			return {
				...prevParam,
				...userSearchParam,
				productNumberList: newProductNumber ? newProductNumber : userSearchParam.productNumberList,
			}
		})
	}

	// const [values, setValues] = useState({}) // cell input 직접 입력 값
	// const [valueDesti, setValueDesti] = useState()

	// 응찰가 직접 입력
	// const onCellValueChanged = (params) => {
	// 	const p = params.data
	// 	setValues((prevValues) => ({
	// 		...prevValues,
	// 		biddingPrice: p['응찰가'],
	// 		productUid: p['제품 고유 번호'],
	// 	}))
	// 	// setValueDesti(p['경매 번호'])
	// }

	// useEffect(() => {
	// 	setWinningCreateData((prev) => ({
	// 		...prev,
	// 		biddingList: [{ ...values }],
	// 		auctionNumber: auctionNumber,
	// 	}))
	// }, [values])

	//  222
	const unitPriceBatchOnClick = () => {
		setLive(false) // LIVE get 일시 중단
		setFinalInput((p) => ({
			...p,
			biddingPrice: winningCreateInput?.biddingPrice,
		}))
		if (!uids || uids?.length === 0) {
			simpleAlert('적용할 경매를 선택해주세요.')
			return
		}
		if (!winningCreateInput?.biddingPrice) {
			simpleAlert('적용할 금액을 입력해주세요.')
			return
		}

		simpleAlert('적용 되었습니다.')
		const updatedResData = oriData?.list?.map((item) => {
			if (uids.includes(item.productUid)) {
				item.destinationCode = destiObject?.destinationCode ?? item.destinationCode
				item.destinationName = destiObject?.destinationName ?? item.destinationName
				item.customerDestinationName = destiObject?.customerDestinationName ?? item.customerDestinationName
				item.customerDestinationAddress = destiObject?.address ?? item.customerDestinationAddress
				item.customerDestinationPhone = destiObject?.phone ?? item.customerDestinationPhone

				item.memberBiddingPrice =
					item.biddingPrice === 0
						? item.auctionStartPrice + winningCreateInput?.biddingPrice
						: item.biddingPrice >= 1 && item.biddingPrice <= item.memberBiddingPrice
						? item.memberBestBiddingPrice + winningCreateInput.biddingPrice
						: item.biddingPrice + winningCreateInput?.biddingPrice
			}

			return item
		})

		// 변경된 데이터로 state 업데이트
		setOridata((prevData) => ({
			...prevData,
			list: updatedResData,
		}))

		// setGetRow(add_element_field(updatedResData, AuctionBiddingFields))
	}

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
		serverData: oriData,
		wish: { display: true, key: ['productNumber', 'packageNumber'] },
		best: { display: true },
	})

	/* ==================== 관심상품 등록 end ==================== */

	// 목적지 적용 버튼 handler 111 - 2

	const destiOnClickHandler = () => {
		setLive(false)
		if (!uids || uids?.length === 0) {
			simpleAlert('적용할 경매를 선택해주세요.')
			return
		}
		simpleAlert('적용 되었습니다.', () => {
			setFinalInput((prevFinalInput) => ({
				...prevFinalInput,
				customerDestinationUid: destiObject.uid,
			}))
			// setValues((p) => ({
			// 	...p,
			// 	customerDestinationUid: destiObject.uid,
			// }))
			// setDestiObject(destiObject)
		})
		const updatedResData = oriData?.list?.map((item) => {
			if (uids.includes(item.productUid)) {
				item.destinationCode = destiObject?.destinationCode ?? item.destinationCode
				item.destinationName = destiObject?.destinationName ?? item.destinationName
				item.customerDestinationName = destiObject?.customerDestinationName ?? item.customerDestinationName
				item.customerDestinationAddress = destiObject?.address ?? item.customerDestinationAddress
				item.customerDestinationPhone = destiObject?.phone ?? item.customerDestinationPhone

				// item.memberBiddingPrice =
				// 	item.biddingPrice === 0
				// 		? item.auctionStartPrice + winningCreateInput?.biddingPrice
				// 		: item.biddingPrice >= 1 && item.biddingPrice <= item.memberBiddingPrice
				// 		? item.memberBestBiddingPrice + winningCreateInput.biddingPrice
				// 		: item.biddingPrice + winningCreateInput?.biddingPrice
			}
			return item
		})
		setOridata((prevData) => ({
			...prevData,
			list: updatedResData,
		}))
		// setGetRow(add_element_field(updatedResData, AuctionBiddingFields))
	}

	// 응찰가 Table Cell Input
	const handleCheckboxChange = (event, rowData) => {
		if (event.target.checked) {
			// 체크된 경우 해당 응찰가 값을 상태에 저장
			setCheckedBiddingPrice(rowData?.biddingPrice || null)
		} else {
			// 체크가 해제된 경우 상태 초기화
			setCheckedBiddingPrice(null)
		}
	}

	// status가 false여야지 모달이 보이는거니 !false 형식으로
	const checkGetAgreement = getAgreementData?.data?.data

	// 입찰 동의서 Mutate
	const { mutate: postAgreementMutation } = useMutation(postAgreement, {
		onSuccess() {
			showAlert({
				title: '해당 회차에 동의하셨습니다.',
				content: '',
				func: () => {
					setAgreementModal(false)
					window.location.reload()
				},
			})
		},
	})

	// 입찰 동의서 Post
	const agreementOnClickHandler = () => {
		if (checkAgreement?.agreement === 'N') {
			showAlert({
				title: '해당 회차에 미동의하셨습니다. \n 메인 페이지로 이동합니다.',
				content: '',
				func: () => {
					refetch()
					setAgreementModal(false)
					navigate('/main')
				},
			})
		} else {
			postAgreementMutation(checkAgreement)
		}
	}

	useEffect(() => {
		// 경매번호도 잘 들어오고, get 미동의(false)가 들어왔을 때
		if (realAucNum && checkGetAgreement === false) {
			setAgreementModal(true)
		} else if (auth?.statusList?.auctionStatus === '경매 제한') {
			simpleAlert('경매에 참여하실 수 없습니다.', () => {
				navigate('/userpage/main')
			})
		} else setAgreementModal(false)
	}, [realAucNum, checkGetAgreement, auth])

	// 목적지, 입찰 동의서 & 모달 여부
	useEffect(() => {
		if (initDestiData === undefined) return
		if (agreementModal === false && initDestiData.length === 0) {
			simpleAlert('목적지를 등록하지 않으면 \n 경매에 참여하실 수 없습니다. \n 목적지를 등록하시겠습니까?', () => {
				navigate('/userpage/userdestination')
				queryClient.clear()
			})
		}
		if (initDestiData.length > 0 && firstDestiData?.represent !== 1) {
			simpleAlert('대표 목적지를 등록하지 않으셨습니다.  \n 목적지를 등록하시겠습니까?', () => {
				navigate('/userpage/userdestination')
				queryClient.clear()
			})
		}
	}, [agreementModal, firstDestiData, initDestiData])

	return (
		<FilterContianer>
			<FilterHeader>
				<div style={{ display: 'flex' }}>
					<h1>경매 응찰</h1>
					<SubTitle>
						<h5>단일</h5>
						<Link to={`/userpage/auctionpackage`}>
							<h6>패키지</h6>
						</Link>
					</SubTitle>
				</div>
				{/* 토글 쓰기 */}
				<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
			</FilterHeader>
			{/* 주의사항 */}
			<CautionBox category={CAUTION_CATEGORY.auction} />
			{exFilterToggle && (
				<>
					<GlobalProductSearch
						param={param}
						setParam={setParam}
						isToggleSeparate={true}
						renderCustomSearchFields={(props) => <UserBiddingSearchFields {...props} />}
						globalProductSearchOnClick={globalProductSearchOnClick}
						globalProductResetOnClick={globalProductResetOnClick}
					/>
				</>
			)}
			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>{selectedCountStr}</span> / {totalCountStr}개 )
						<TableV2HiddenSection />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={handleTablePageSize} />
						{/*{!nowAuction && <Excel getRow={tableRowData} sheetName="경매 응찰" />}*/}
						<AddWishButton products={selectedData} productNumberKey={PROD_COL_NAME.productNumber} />
					</div>
				</TCSubContainer>
				<TCSubContainer bor>
					<TableIndicateWrap weight>
						선택 중량 <span> {selectedWeightStr} </span> (kg) / 총 중량 {totalWeightStr} (kg)
					</TableIndicateWrap>
					{nowAuction && (
						<>
							<div
								style={{
									display: 'flex',
									gap: '10px',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<TableIndicateWrap desti>목적지</TableIndicateWrap>
								<CustomInput
									placeholder="h50"
									width={60}
									height={32}
									value={destiObject && destiObject?.destinationCode}
									readOnly
								/>
								<CustomInput
									placeholder="목적지명"
									width={120}
									height={32}
									value={destiObject && destiObject?.name}
									readOnly
								/>
								<CustomInput
									placeholder="도착지 연락처"
									width={120}
									height={32}
									value={destiObject && destiObject?.phone}
									readOnly
								/>
								<TWhiteBtn
									style={{ minWidth: '50px' }}
									height={30}
									onClick={() => {
										setDestinationPopUp(true)
									}}
								>
									찾기
								</TWhiteBtn>
								<TGreyBtn style={{ minWidth: '50px' }} onClick={destiOnClickHandler}>
									적용
								</TGreyBtn>

								<BtnBound style={{ margin: '0px' }} />
								<TableIndicateWrap overall>일괄 경매 응찰 | 최고가 +</TableIndicateWrap>
								<CustomInput
									placeholder=""
									width={140}
									height={32}
									value={winningCreateInput.biddingPrice !== null ? winningCreateInput.biddingPrice : ''}
									onChange={(e) => {
										setwinningCreateInput((p) => ({
											...p,
											biddingPrice: parseInt(e.target.value) || null,
										}))
										setAddedInput(parseInt(e.target.value))
									}}
								/>
								<TGreyBtn
									height={30}
									style={{ minWidth: '50px' }}
									// onClick={() => {
									// 	setFinalInput((p) => ({
									// 		...p,
									// 		biddingPrice: winningCreateInput?.biddingPrice,
									// 	}))
									// }}
									onClick={unitPriceBatchOnClick}
								>
									적용
								</TGreyBtn>
								<BtnBound style={{ margin: '0px' }} />
								<SkyBtn style={{ width: '200px', fontSize: '20px' }} height={50} onClick={confirmOnClickHandler}>
									응찰
								</SkyBtn>
							</div>
						</>
					)}
				</TCSubContainer>

				<Table
					getCol={tableField}
					getRow={tableRowData}
					tablePagination={tablePagination}
					onPageChange={onPageChange}
					// changeFn={onCellValueChanged}
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
			{/* 입찰 동의서 모달 */}

			{agreementModal && nowAuction && (
				<Agreement setCheckAgreement={setCheckAgreement} agreementOnClickHandler={agreementOnClickHandler} />
			)}
		</FilterContianer>
	)
}

export default Single
