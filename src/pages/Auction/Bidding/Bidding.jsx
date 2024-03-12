import { useEffect, useState } from 'react'

import { BtnBound, SkyBtn, TGreyBtn, TWhiteBtn } from '../../../common/Button/Button'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import {
	auctionPackDetailModal,
	auctionPackDetailNumAtom,
	biddingAgreementModal,
	invenDestinationData,
	selectedRowsAtom,
	toggleAtom,
	userPageSingleDestiFindAtom,
} from '../../../store/Layout/Layout'

import { useNavigate } from 'react-router-dom'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import {
	CustomInput,
	FilterContianer,
	FilterHeader,
	StyledHeading,
	StyledSubHeading,
	SubTitle,
	TableContianer,
	TCSubContainer,
} from '../../../modal/External/ExternalFilter'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtom, useAtomValue } from 'jotai'
import { isEqual } from 'lodash'
import { getAgreement, getBidding, postAgreement, postBidding } from '../../../api/auction/bidding'
import { getAuctionDestination } from '../../../api/auction/winning'
import { CAUTION_CATEGORY, CautionBox } from '../../../components/CautionBox'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import Excel from '../../../components/TableInner/Excel'
import {
	AuctionBiddingFields,
	AuctionBiddingFieldsCols,
	AuctionPackageBiddingFieldsCols,
} from '../../../constants/admin/Auction'
import useReactQuery from '../../../hooks/useReactQuery'

import { add_element_field } from '../../../lib/tableHelpers'
import Agreement from '../../../modal/Common/Agreement'
import InventoryFind from '../../../modal/Multi/InventoryFind'
import useAlert from '../../../store/Alert/useAlert'

import { useCheckAuction } from '../../../hooks/useCheckAuction'
import useTableData from '../../../hooks/useTableData'
import useTableSelection from '../../../hooks/useTableSelection'
import { authAtom } from '../../../store/Auth/auth'
import { onSizeChange } from '../../Operate/utils'
import Table from '../../Table/Table'
import BiddingSearchFields from './BiddingSearchFields'
import PackDetail from './PackDetail'

const Bidding = () => {
	const auth = useAtomValue(authAtom)
	const nowAuction = useCheckAuction() // 현재 경매 여부 체크

	const [live, setLive] = useState(true) // LIVE get 일시 중단
	console.log('live', live)
	const navigate = useNavigate()
	const [realAucNum, setRealAucNum] = useState(null) // 진짜 경매 번호
	const [getAgreeState, setGetAgreeState] = useState(false) // 동의 상태
	const [aucDetail, setAucDetail] = useAtom(auctionPackDetailNumAtom) // 패키지 해당 row 값 저장
	const [aucDetailModal, setAucDetailModal] = useAtom(auctionPackDetailModal) // 패키지 모달
	const [agreementModal, setAgreementModal] = useAtom(biddingAgreementModal) // 입찰 동의서 모달

	const [checkAgreement, setCheckAgreement] = useState({
		auctionNumber: '',
		agreement: '',
	})

	const { simpleAlert, simpleConfirm, showAlert } = useAlert()
	const [destinationPopUp, setDestinationPopUp] = useAtom(userPageSingleDestiFindAtom)
	const [destinationData, setDestinationData] = useAtom(invenDestinationData)
	// 고객사 팝업 상태,객체

	const [types, setTypes] = useState('단일')

	const [addedInput, setAddedInput] = useState(null)

	const [isRotated, setIsRotated] = useState(false)

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

	const [getRow, setGetRow] = useState('')
	const getRowFilter = getRow && getRow?.map((x) => x['응찰가'])

	const [propsUid, setPropsUid] = useState(null)
	const [destiObject, setDestiObject] = useState() //
	console.log('destiObject', destiObject)
	const queryClient = useQueryClient()
	const checkedArray = useAtom(selectedRowsAtom)[0]
	const [checkedArrayState, setCheckedArrayState] = useAtom(selectedRowsAtom)
	const uids = checkedArrayState?.map((item) => item['제품 번호'].value)
	const packUids = checkedArrayState?.map((item) => item['패키지 번호'].value)
	console.log('uids', uids)
	const [tablePagination, setTablePagination] = useState([])
	const paramData = {
		pageNum: 1,
		pageSize: 50,
		type: '단일',
	}

	const [param, setParam] = useState(paramData)

	useEffect(() => {}, [types])

	const productListInner = {
		biddingPrice: null,
		customerDestinationUid: null,
	}

	const destiOnClickHandler = () => {
		setLive(false)
		if (!uids || uids?.length === 0) {
			simpleAlert('적용할 경매를 선택해주세요.')
			return
		}
		simpleAlert('적용 되었습니다.', () => {
			setFinalInput((prevFinalInput) => ({
				...prevFinalInput,
				customerDestinationUid: destiObject && destiObject.uid,
			}))
			setValues((p) => ({
				...p,
				customerDestinationUid: destiObject && destiObject.uid,
			}))
			setDestiObject(destiObject)
		})

		const updatedResData = oriData?.list?.map((item) => {
			if (param?.type === '단일')
				if (uids.includes(item.productNumber)) {
					item.destinationCode = destiObject?.destinationCode ?? item.destinationCode
					item.destinationName = destiObject?.destinationName ?? item.destinationName
					item.customerDestinationName = destiObject?.customerDestinationName ?? item.customerDestinationName
					item.customerDestinationAddress = destiObject?.address ?? item.customerDestinationAddress
					item.customerDestinationPhone = destiObject?.phone ?? item.customerDestinationPhone

					item.memberBiddingPrice =
						item.biddingPrice === 0
							? item.auctionStartPrice + winningCreateInput?.biddingPrice
							: item.biddingPrice + winningCreateInput?.biddingPrice
				}
			if (param?.type === '패키지')
				if (packUids.includes(item.packageNumber)) {
					item.destinationCode = destiObject?.destinationCode ?? item.destinationCode
					item.destinationName = destiObject?.destinationName ?? item.destinationName
					item.customerDestinationName = destiObject?.customerDestinationName ?? item.customerDestinationName
					item.customerDestinationAddress = destiObject?.address ?? item.customerDestinationAddress
					item.customerDestinationPhone = destiObject?.phone ?? item.customerDestinationPhone

					item.memberBiddingPrice =
						item.biddingPrice === 0
							? item.auctionStartPrice + winningCreateInput?.biddingPrice
							: item.biddingPrice + winningCreateInput?.biddingPrice
				}
			return item
		})

		setGetRow(add_element_field(updatedResData, AuctionBiddingFields))
	}

	const [winningCreateInput, setwinningCreateInput] = useState(productListInner)
	const [liveStatus, setLiveStatus] = useState(null)

	useEffect(() => {
		setLiveStatus(nowAuction && live ? true : false)
	}, [nowAuction, live])
	// 전체 GET
	const { isLoading, isError, data, isSuccess, refetch } = useReactQuery(param, liveStatus, getBidding)
	const resData = data?.data?.data?.list
	const { data: getAgreementData } = useReactQuery(realAucNum, 'getAgreement', getAgreement)
	const originData = data?.data?.data
	const [oriData, setOridata] = useState()

	const checkGetAgreement = getAgreementData?.data?.data

	// status가 false여야지 모달이 보이는거니 !false 형식으로

	const resPagination = data?.data?.data?.pagination

	// 초기 목적지 GET
	const { data: destiData } = useReactQuery('', 'getAuctionDestination', getAuctionDestination)

	const initDestiData = destiData?.data?.data
	const filteredDestiData = initDestiData?.filter((item) => item.represent === 1)
	const firstDestiData = filteredDestiData?.[0]

	const restrictStartPriceData = resData?.map((item) => ({
		...item,
		auctionStartPrice: null,
	}))

	useEffect(() => {
		let getData = auth?.statusList?.auctionStatus === '시작가 제한' ? restrictStartPriceData : resData
		const filteredAucNum = resData && resData.map((x) => x['auctionNumber']) // 경매 번호 get
		const checkAgreeAucNum = filteredAucNum && filteredAucNum[0] // 경매 번호 1개 추출
		if (!isSuccess && !resData) return
		if (Array.isArray(getData)) {
			if (live) {
				setOridata(originData)
			}
			setTablePagination(resPagination)
			setRealAucNum(checkAgreeAucNum)
			setCheckAgreement((prev) => ({
				...prev,
				auctionNumber: checkAgreeAucNum,
			}))
			setDestiObject(firstDestiData)
		}
	}, [isSuccess, resData, initDestiData])

	// 경매 번호 가져오기
	const auctionNumber = checkedArray?.[0]?.['경매 번호']

	const init = {
		auctionNumber: null,
		type: types,
	}

	const [winningCreateData, setWinningCreateData] = useState(init)

	const { data: auctionDestination } = useReactQuery('', 'getAuctionDestination', getAuctionDestination)

	useEffect(() => {
		if (resData) {
			const updatedResData = resData?.map((item) => {
				if (
					!item.destinationCode ||
					!item.destinationName ||
					!item.customerDestinationName ||
					!item.customerDestinationAddress ||
					!item.customerDestinationPhone
				) {
					item.destinationCode = destiObject?.destinationCode
					item.destinationName = destiObject?.destinationName
					item.customerDestinationName = destiObject?.customerDestinationName
					item.customerDestinationAddress = destiObject?.address
					item.customerDestinationPhone = destiObject?.phone
				}

				return item
			})

			setGetRow(add_element_field(updatedResData, AuctionBiddingFields))
		}
	}, [destiObject])

	//
	useEffect(() => {
		const selectedObject = auctionDestination?.data?.data.find((item) => item.uid === propsUid)
		if (propsUid) setDestiObject(selectedObject)
		setWinningCreateData((p) => ({
			...p,
			auctionNumber: auctionNumber,
			type: param?.type,
		}))
	}, [propsUid, auctionNumber, param])

	const [finalInput, setFinalInput] = useState({
		biddingPrice: null,
		customerDestinationUid: null,
	})

	useEffect(() => {
		const updatedProductList = checkedArray?.map((item) => {
			if (param?.type === '단일') {
				return {
					productUid: item['제품 고유 번호'],
					biddingPrice:
						item['현재 최고 가격'] === 0
							? item['시작가'] + (finalInput?.biddingPrice || 1)
							: item['현재 최고 가격'] + (finalInput?.biddingPrice || 1),
					customerDestinationUid: finalInput?.customerDestinationUid ?? destiObject?.uid,
				}
			} else if (param?.type === '패키지') {
				return {
					packageNumber: item['패키지 번호'],
					biddingPrice:
						item['현재 최고 가격'] === 0
							? item['시작가'] + (finalInput?.biddingPrice || 1)
							: item['현재 최고 가격'] + (finalInput?.biddingPrice || 1),
					customerDestinationUid: finalInput?.customerDestinationUid ?? destiObject?.uid,
				}
			}
		})

		// winningCreateData를 업데이트하여 productList를 갱신합니다.
		setWinningCreateData((prevData) => ({
			...prevData,
			biddingList: updatedProductList,
		}))
	}, [checkedArray, finalInput, param])

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
					refetch()
					queryClient.invalidateQueries('auction')
				},
			})
		},
		onError: () => {
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
			simpleAlert('오류가 발생했습니다. 다시 시도해주세요.')
			refetch()
		},
	})

	// 응찰 버튼 POST
	const confirmOnClickHandler = () => {
		setLive(true) // 실시간으로 다시 설정
		postMutation(winningCreateData)
	}

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
					navigate('/main')
				},
			})
		} else {
			postAgreementMutation(checkAgreement)
		}
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

	const onCellValueChanged = (params) => {
		const p = params.data

		setValues((prevValues) => ({
			...prevValues,
			biddingPrice: p['응찰가'],
			productUid: p['제품 고유 번호'],
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

	//일괄 경매 응찰 적용 onClick hanlder
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
			if (param?.type === '단일')
				if (uids.includes(item.productNumber)) {
					item.destinationCode = destiObject?.destinationCode ?? item.destinationCode
					item.destinationName = destiObject?.destinationName ?? item.destinationName
					item.customerDestinationName = destiObject?.customerDestinationName ?? item.customerDestinationName
					item.customerDestinationAddress = destiObject?.address ?? item.customerDestinationAddress
					item.customerDestinationPhone = destiObject?.phone ?? item.customerDestinationPhone

					item.memberBiddingPrice =
						item.biddingPrice === 0
							? item.auctionStartPrice + winningCreateInput?.biddingPrice
							: item.biddingPrice + winningCreateInput?.biddingPrice
				}
			if (param?.type === '패키지')
				if (packUids.includes(item.packageNumber)) {
					item.destinationCode = destiObject?.destinationCode ?? item.destinationCode
					item.destinationName = destiObject?.destinationName ?? item.destinationName
					item.customerDestinationName = destiObject?.customerDestinationName ?? item.customerDestinationName
					item.customerDestinationAddress = destiObject?.address ?? item.customerDestinationAddress
					item.customerDestinationPhone = destiObject?.phone ?? item.customerDestinationPhone

					item.memberBiddingPrice =
						item.biddingPrice === 0
							? item.auctionStartPrice + winningCreateInput?.biddingPrice
							: item.biddingPrice + winningCreateInput?.biddingPrice
				}
			return item
		})

		// 변경된 데이터로 state 업데이트
		setGetRow(add_element_field(updatedResData, AuctionBiddingFields))
	}

	console.log('checkGetAgreement', checkGetAgreement)

	useEffect(() => {
		// 경매번호도 잘 들어오고, get 미동의(false)가 들어왔을 때
		if (realAucNum && checkGetAgreement === false) {
			setAgreementModal(true)
		} else if (auth?.statusList?.auctionStatus === '경매 제한') {
			simpleAlert('경매에 참여하실 수 없습니다.', () => {
				navigate('/main')
			})
		} else setAgreementModal(false)
	}, [realAucNum, checkGetAgreement, auth])

	// 목적지, 입찰 동의서 & 모달 여부
	useEffect(() => {
		if (initDestiData === undefined) return
		if (agreementModal === false && initDestiData.length === 0) {
			simpleAlert('목적지를 등록하지 않으면 \n 경매에 참여하실 수 없습니다. \n 목적지를 등록하시겠습니까?', () => {
				navigate('/usermanage/clientdestination')
			})
		}
		if (initDestiData.length > 0 && firstDestiData?.represent !== 1) {
			simpleAlert('대표 목적지를 등록하지 않으셨습니다.  \n 목적지를 등록하시겠습니까?', () => {
				navigate('/usermanage/clientdestination')
			})
		}
	}, [agreementModal, firstDestiData, initDestiData])

	const { selectedData, selectedWeightStr, selectedWeight, selectedCountStr } = useTableSelection({
		weightKey: '중량',
	})

	const { tableRowData, paginationData, totalWeightStr, totalCountStr, totalCount } = useTableData({
		tableField: AuctionBiddingFields,
		serverData: oriData,
		wish: { display: true, key: ['productNumber', 'packageNumber'] },
		best: { display: true },
	})

	return (
		<FilterContianer>
			<FilterHeader>
				<div style={{ display: 'flex' }}>
					<h1>경매 응찰</h1>
					<SubTitle>
						<StyledHeading isActive={param?.type === '단일'} onClick={() => setParam({ ...param, type: '단일' })}>
							단일
						</StyledHeading>
						<StyledSubHeading
							isActive={param?.type === '패키지'}
							onClick={() => setParam({ ...param, type: '패키지' })}
						>
							패키지
						</StyledSubHeading>
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
						renderCustomSearchFields={(props) => <BiddingSearchFields {...props} />} // 만들어야함 -> WinningSearchFields
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
					{nowAuction && (
						<>
							<div style={{ display: 'flex', gap: '10px' }}>
								<PageDropdown handleDropdown={(e) => onSizeChange(e, setParam)} />
								<Excel getRow={getRow} />
							</div>
						</>
					)}
				</TCSubContainer>
				<TCSubContainer bor>
					<div>
						선택 중량 <span> {selectedWeightStr} </span> (kg) / 총 중량 {totalWeightStr} (kg)
					</div>
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
								<p>목적지</p>
								<CustomInput placeholder="h50" width={60} height={32} defaultValue={destiObject?.code} readOnly />
								<CustomInput
									placeholder="목적지 명"
									width={120}
									height={32}
									defaultValue={destiObject?.destinationName}
									readOnly
								/>
								<CustomInput placeholder="도착지 연락처" defaultValue={destiObject?.phone} width={120} height={32} />
								<TWhiteBtn
									style={{ width: '50px' }}
									height={30}
									onClick={() => {
										setDestinationPopUp(true)
									}}
								>
									찾기
								</TWhiteBtn>
								<TGreyBtn onClick={destiOnClickHandler}>적용</TGreyBtn>
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
						</>
					)}
				</TCSubContainer>

				<Table
					getCol={param?.type === '단일' ? AuctionBiddingFieldsCols : AuctionPackageBiddingFieldsCols}
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
			{/* 패키지 상세보기 모달 */}
			{aucDetailModal && (
				<PackDetail aucDetail={aucDetail} packNum={aucDetail['패키지 번호']} setAucDetailModal={setAucDetailModal} />
			)}
			{/* 입찰 동의서 모달 */}
			{agreementModal && nowAuction && (
				<Agreement
					setCheckAgreement={setCheckAgreement}
					agreementOnClickHandler={agreementOnClickHandler}
					refetch={refetch}
				/>
			)}
		</FilterContianer>
	)
}

export default Bidding
