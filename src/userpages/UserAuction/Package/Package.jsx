import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BtnBound, SkyBtn, TGreyBtn, TWhiteBtn } from '../../../common/Button/Button'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import {
	auctionPackDetailModal,
	auctionPackDetailNumAtom,
	biddingAgreementModal,
	selectedRowsAtom,
	toggleAtom,
} from '../../../store/Layout/Layout'

import {
	CustomInput,
	FilterContianer,
	FilterHeader,
	SubTitle,
	TableContianer,
	TCSubContainer,
} from '../../../modal/External/ExternalFilter'

import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { isEqual } from 'lodash'
import { getAgreement, getBidding, postAgreement, postBidding } from '../../../api/auction/bidding'
import { getAuctionDestination } from '../../../api/auction/winning'
import { CAUTION_CATEGORY, CautionBox } from '../../../components/CautionBox'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import { AuctionBiddingFields, AuctionPackageBiddingFieldsCols } from '../../../constants/admin/Auction'
import { PROD_COL_NAME } from '../../../constants/user/constantKey'
import useReactQuery from '../../../hooks/useReactQuery'
import useTableData from '../../../hooks/useTableData'
import useTableSelection from '../../../hooks/useTableSelection'
import { add_element_field } from '../../../lib/tableHelpers'
import Agreement from '../../../modal/Common/Agreement'
import InventoryFind from '../../../modal/Multi/InventoryFind'
import Table from '../../../pages/Table/Table'
import useAlert from '../../../store/Alert/useAlert'
import { userPageSingleDestiFindAtom } from '../../../store/Layout/Layout'
import AddWishButton from '../../UserSales/_components/AddWishButton'
import UserBiddingSearchFields from '../Single/UserBiddingSearchFields'
import PackDetail from '../../../pages/Auction/Bidding/PackDetail'
import { useCheckAuction } from '../../../hooks/useCheckAuction'

const Package = ({}) => {
	const nowAuction = useCheckAuction()
	const [aucDetailModal, setAucDetailModal] = useAtom(auctionPackDetailModal) // 패키지 모달
	const [aucDetail, setAucDetail] = useAtom(auctionPackDetailNumAtom) // 해당 row 값 저장
	const [live, setLive] = useState(true) // LIVE get 일시 중단
	console.log('live', live)
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

	console.log('auctionDestination Single 목적지', auctionDestination?.data?.data)

	const [customerData, setCustomerData] = useState()
	const [propsUid, setPropsUid] = useState(null)
	const [destiObject, setDestiObject] = useState() //

	console.log('destiObject', destiObject)

	const productListInner = {
		biddingPrice: null,
		customerDestinationUid: null,
	}

	const [winningCreateInput, setwinningCreateInput] = useState(productListInner)

	console.log('winningCreateInput', winningCreateInput)

	const [getRow, setGetRow] = useState('')
	const tableField = useRef(AuctionPackageBiddingFieldsCols)
	const getCol = tableField.current
	const queryClient = useQueryClient()
	// const checkedArrayState = useAtom(selectedRowsAtom)[0]
	const [tablePagination, setTablePagination] = useState([])
	const [checkedArrayState, setCheckedArrayState] = useAtom(selectedRowsAtom)
	const uids = checkedArrayState?.map((item) => item['패키지 번호'])

	console.log('uids ', uids)

	const paramData = {
		pageNum: 1,
		pageSize: 50,
		type: '패키지',
	}
	const [param, setParam] = useState(paramData)

	const [liveStatus, setLiveStatus] = useState(nowAuction ? 'LIVEgetBidding' : 'getBidding') // 현재 경매에 따라 실시간 get

	const [realAucNum, setRealAucNum] = useState(null)
	console.log('realAucNum', realAucNum)
	const { data: getAgreementData } = useReactQuery(realAucNum, 'getAgreement', getAgreement)

	console.log('getAgreementData', getAgreementData)

	// 전체 GET
	const { isLoading, isError, data, isSuccess, refetch } = useReactQuery(param, liveStatus, getBidding)
	const resData = data?.data?.data?.list
	const resPagination = data?.data?.data?.pagination

	console.log('resData', resData)

	// 초기 목적지 GET
	const { data: destiData } = useReactQuery('', 'getAuctionDestination', getAuctionDestination)

	const initDestiData = destiData?.data?.data
	const filteredDestiData = initDestiData?.filter((item) => item.represent === 1)
	const firstDestiData = filteredDestiData?.[0]

	console.log('firstDestiData', firstDestiData)

	useEffect(() => {
		let getData = resData
		const filteredAucNum = resData && resData.map((x) => x['auctionNumber'])
		const checkAgreeAucNum = filteredAucNum && filteredAucNum[0]
		if (!isSuccess && !resData) return
		if (Array.isArray(getData)) {
			if (live) setGetRow(add_element_field(getData, AuctionBiddingFields))
			setTablePagination(resPagination)
			setRealAucNum(checkAgreeAucNum)
			setCheckAgreement((prev) => ({
				...prev,
				auctionNumber: checkAgreeAucNum,
			}))
		}
	}, [isSuccess, resData, initDestiData])

	// 경매 번호 가져오기
	const auctionNumber = checkedArrayState?.[0]?.['경매 번호']

	console.log('auctionNumber', auctionNumber)

	const init = {
		auctionNumber: null,
		type: '패키지',
	}
	const [winningCreateData, setWinningCreateData] = useState(init)
	console.log('winningCreateData', winningCreateData)
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

	console.log('finalInput', finalInput)

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
			packageNumber: item['패키지 번호'],
			biddingPrice:
				item['응찰가'] === 0
					? item['시작가'] + finalInput?.biddingPrice
					: item['현재 최고 가격'] + finalInput?.biddingPrice,
			customerDestinationUid: finalInput?.customerDestinationUid ?? destiObject?.uid,
			// 여기에 다른 필요한 속성을 추가할 수 있습니다.
		}))

		// winningCreateData를 업데이트하여 productList를 갱신
		setWinningCreateData((prevData) => ({
			...prevData,
			biddingList: updatedProductList,
		}))
	}, [checkedArrayState, finalInput, param])

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

	const { mutate: postMutation } = useMutation(postBidding, {
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
		onError: () => {
			setWinningCreateData(init)
			setwinningCreateInput({
				biddingPrice: null,
				customerDestinationUid: null,
			})
			setFinalInput({
				biddingPrice: null,
				customerDestinationUid: null,
			})
			simpleAlert('오류가 발생했습니다. 다시 시도해주세요.')
			refetch()
		},
	})

	// 응찰 버튼 POST
	const confirmOnClickHandler = () => {
		setLive(true) // 실시간으로 다시 설정
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
	// const [valueDesti, setValueDesti] = useState()

	// 응찰가 직접 입력
	const onCellValueChanged = (params) => {
		const p = params.data
		console.log('바뀌는 값 확인', p['패키지 번호'])
		setValues((prevValues) => ({
			...prevValues,
			biddingPrice: p['응찰가'],
			packageNumber: p['패키지 번호'],
		}))
		// setValueDesti(p['경매 번호'])
	}

	useEffect(() => {
		setWinningCreateData((prev) => ({
			...prev,
			biddingList: [{ ...values }],
			auctionNumber: auctionNumber,
		}))
	}, [values])

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
		const updatedResData = resData.map((item) => {
			if (uids.includes(item.packageNumber)) {
				item.destinationCode = destiObject?.destinationCode ?? item.destinationCode
				item.destinationName = destiObject?.destinationName ?? item.destinationName
				item.customerDestinationName = destiObject?.customerDestinationName ?? item.customerDestinationName
				item.customerDestinationAddress = destiObject?.address ?? item.customerDestinationAddress
				item.customerDestinationPhone = destiObject?.phone ?? item.customerDestinationPhone

				item.memberBiddingPrice = item.biddingPrice + winningCreateInput?.biddingPrice
			}
			return item
		})

		console.log('222 뒤', updatedResData)

		// 변경된 데이터로 state 업데이트
		setGetRow(add_element_field(updatedResData, AuctionBiddingFields))
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
		serverData: data?.data?.data,
		wish: { display: true, key: ['productNumber', 'packageNumber'] },
		best: { display: true },
	})
	/* ==================== 관심상품 등록 end ==================== */

	console.log('destiObject', destiObject)
	// 목적지 적용 버튼 handler 111
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
			setValues((p) => ({
				...p,
				customerDestinationUid: destiObject.uid,
			}))
			setDestiObject(destiObject)
		})

		const updatedResData = resData.map((item) => {
			if (uids.includes(item.packageNumber)) {
				item.destinationCode = destiObject?.destinationCode ?? item.destinationCode
				item.destinationName = destiObject?.destinationName ?? item.destinationName
				item.customerDestinationName = destiObject?.customerDestinationName ?? item.customerDestinationName
				item.customerDestinationAddress = destiObject?.address ?? item.customerDestinationAddress
				item.customerDestinationPhone = destiObject?.phone ?? item.customerDestinationPhone

				item.memberBiddingPrice = item.biddingPrice + winningCreateInput?.biddingPrice
			}

			return item
		})
		console.log('111 앞 ', updatedResData)
		console.log('destiObject', destiObject)
		setGetRow(add_element_field(updatedResData, AuctionBiddingFields))
	}

	console.log('values', values)

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
	console.log('checkGetAgreement', checkGetAgreement)

	// 입찰 동의서 Mutate
	const { mutate: postAgreementMutation } = useMutation(postAgreement, {
		onSuccess() {
			showAlert({
				title: '해당 회차에 동의하셨습니다.',
				content: '',
				func: () => {
					refetch()
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
					navigate('/userpage/main')
				},
			})
		} else {
			postAgreementMutation(checkAgreement)
		}
	}

	const [getAgreeState, setGetAgreeState] = useState(false) // 동의 상태

	// 입찰 동의서 렌더
	useEffect(() => {
		// 경매번호도 잘 들어오고, get 미동의(false)가 들어왔을 때
		if (realAucNum && checkGetAgreement === false) {
			setAgreementModal(true)
		} else setAgreementModal(false)
	}, [realAucNum, checkGetAgreement])

	// 목적지, 입찰 동의서 & 모달 여부
	useEffect(() => {
		if (initDestiData === undefined) return
		if (agreementModal === false && initDestiData.length === 0) {
			simpleAlert('목적지를 등록하지 않으면 \n 경매에 참여하실 수 없습니다. \n 목적지를 등록하시겠습니까?', () => {
				navigate('/userpage/userdestination')
			})
		}
		if (initDestiData.length > 0 && firstDestiData?.represent !== 1) {
			simpleAlert('대표 목적지를 등록하지 않으셨습니다.  \n 목적지를 등록하시겠습니까?', () => {
				navigate('/userpage/userdestination')
			})
		}
	}, [agreementModal, firstDestiData, initDestiData])

	console.log('agreementModal', agreementModal)
	console.log('winningCreateData', winningCreateData)

	return (
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
			{/* 주의사항 */}
			<CautionBox category={CAUTION_CATEGORY.auction} />
			{exFilterToggle && (
				<>
					<GlobalProductSearch
						param={param}
						isToggleSeparate={true}
						renderCustomSearchFields={(props) => <UserBiddingSearchFields {...props} />}
						globalProductSearchOnClick={globalProductSearchOnClick}
						globalProductResetOnClick={globalProductResetOnClick}
					/>
				</>
			)}
			<TableContianer>
				{nowAuction && (
					<>
						<TCSubContainer bor>
							<div>
								조회 목록 (선택 <span>{selectedCountStr}</span> / {totalCountStr}개 )
								<Hidden />
							</div>
							<div style={{ display: 'flex', gap: '10px' }}>
								<PageDropdown handleDropdown={handleTablePageSize} />
								<Excel getRow={getRow} />
								<AddWishButton products={selectedData} productNumberKey={PROD_COL_NAME.productNumber} />
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
								<CustomInput
									placeholder="h50"
									width={60}
									height={32}
									defaultValue={destiObject?.destinationCode}
									readOnly
								/>
								<CustomInput placeholder="목적지명" width={120} height={32} defaultValue={destiObject?.name} readOnly />
								<CustomInput
									placeholder="도착지 연락처"
									width={120}
									height={32}
									defaultValue={destiObject?.phone}
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
									// 	setValues((p) => ({
									// 		...p,
									// 		customerDestinationUid: destiObject && destiObject.uid,
									// 	}))
									// }}
									onClick={destiOnClickHandler}
								>
									적용
								</TGreyBtn>

								<BtnBound style={{ margin: '0px' }} />
								<p>일괄 경매 응찰 | 최고가 +</p>
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
									style={{ width: '50px' }}
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
						</TCSubContainer>
					</>
				)}

				<Table
					getCol={getCol}
					getRow={getRow}
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
			{/* 패키지 상세보기 모달 */}
			{aucDetailModal && (
				<PackDetail
					aucDetail={aucDetail}
					packNum={aucDetail['패키지 번호']}
					setAucDetailModal={setAucDetailModal}
					destiObject={destiObject}
				/>
			)}
			{/* 입찰 동의서 모달 */}
			{agreementModal && (
				<Agreement setCheckAgreement={setCheckAgreement} agreementOnClickHandler={agreementOnClickHandler} />
			)}
		</FilterContianer>
	)
}

export default Package
