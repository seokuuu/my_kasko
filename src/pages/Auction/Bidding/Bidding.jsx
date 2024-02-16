import { useEffect, useState } from 'react'

import { BtnBound, SkyBtn, TGreyBtn, TWhiteBtn } from '../../../common/Button/Button'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import {
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
	TCSubContainer,
	TableContianer,
} from '../../../modal/External/ExternalFilter'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { isEqual } from 'lodash'
import { getBidding, postAgreement, postBidding } from '../../../api/auction/bidding'
import { getAuctionDestination } from '../../../api/auction/winning'
import { CAUTION_CATEGORY, CautionBox } from '../../../components/CautionBox'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import Excel from '../../../components/TableInner/Excel'
import { AuctionBiddingFields, AuctionBiddingFieldsCols } from '../../../constants/admin/Auction'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import Agreement from '../../../modal/Common/Agreement'
import InventoryFind from '../../../modal/Multi/InventoryFind'
import useAlert from '../../../store/Alert/useAlert'
import { auctionPackDetailModal, auctionPackDetailNumAtom, biddingAgreementModal } from '../../../store/Layout/Layout'
import Table from '../../Table/Table'
import BiddingSearchFields from './BiddingSearchFields'
import PackDetail from './PackDetail'
const Bidding = ({}) => {
	const navigate = useNavigate()
	const [aucDetail, setAucDetail] = useAtom(auctionPackDetailNumAtom) // 해당 row 값 저장
	const [aucDetailModal, setAucDetailModal] = useAtom(auctionPackDetailModal) // 패키지 모달
	const [agreementModal, setAgreementModal] = useAtom(biddingAgreementModal) // 입찰 동의서 모달

	const [checkAgreement, setCheckAgreement] = useState({
		auctionNumber: '2024021601',
		agreement: '',
	})

	const { simpleAlert, simpleConfirm, showAlert } = useAlert()
	const [destinationPopUp, setDestinationPopUp] = useAtom(userPageSingleDestiFindAtom)
	const [destinationData, setDestinationData] = useAtom(invenDestinationData)
	// 고객사 팝업 상태,객체

	const [types, setTypes] = useState('단일')

	const radioDummy = ['전체', '미진행', '진행중', '종료']

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
	const [propsUid, setPropsUid] = useState(null)
	const [destiObject, setDestiObject] = useState() //
	const queryClient = useQueryClient()
	const checkedArray = useAtom(selectedRowsAtom)[0]
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

	const [winningCreateInput, setwinningCreateInput] = useState(productListInner)
	const [liveStatus, setLiveStatus] = useState('getBidding') // TODO : 수정해놓기
	// 전체 GET
	const { isLoading, isError, data, isSuccess, refetch } = useReactQuery(param, liveStatus, getBidding)
	const resData = data?.data?.data?.list
	console.log('resData 사륜안', resData)
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
		type: types,
	}

	const [winningCreateData, setWinningCreateData] = useState(init)

	const { data: auctionDestination } = useReactQuery('', 'getAuctionDestination', getAuctionDestination)

	//
	useEffect(() => {
		const selectedObject = auctionDestination?.data?.data.find((item) => item.uid === propsUid)
		setDestiObject(selectedObject)
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
					biddingPrice: finalInput?.biddingPrice,
					customerDestinationUid: finalInput?.customerDestinationUid,
				}
			} else if (param?.type === '패키지') {
				return {
					packageNumber: item['패키지 번호'],
					biddingPrice: finalInput?.biddingPrice,
					customerDestinationUid: finalInput?.customerDestinationUid,
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

	// 입찰 동의서 Mutate
	const { mutate: postAgreementMutation } = useMutation(postAgreement, {
		onSuccess() {
			showAlert({
				title: '해당 회차에 동의하셨습니다.',
				content: '',
				func: () => {
					refetch()
					setAgreementModal(false)
				},
			})
		},
	})

	// 입찰 동의서 Post
	const agreementOnClickHandler = () => {
		if (checkAgreement?.agreement === 'N') {
			showAlert({
				title: '해당 회차에 미동의하셨습니다. \n 이전 페이지로 이동합니다.',
				content: '',
				func: () => {
					refetch()
					setAgreementModal(false)
					navigate(-1)
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
	const [valueDesti, setValueDesti] = useState()

	const onCellValueChanged = (params) => {
		const p = params.data

		setValues((prevValues) => ({
			...prevValues,
			biddingPrice: p['응찰가'],
			productUid: p['제품 고유 번호'],
		}))
		setValueDesti(p['경매 번호'])
	}

	useEffect(() => {
		setWinningCreateData((prev) => ({
			...prev,
			biddingList: [{ ...values }],
			auctionNumber: valueDesti,
		}))
	}, [values])

	console.log('winningCreateData <33', winningCreateData)

	// 	TODO : 목적지 항목 추가하기 (후순위)
	// 	찾기 누르면
	// 목적지 코드 destiCode ,
	// 목적지 명 destiName ,
	// 목적지 주소 address,
	// 목적지 연락처 phone

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
						조회 목록 (선택 <span>2</span> / 50개 )
						<Hidden />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={handleTablePageSize} />
						<Excel getRow={getRow} />
					</div>
				</TCSubContainer>
				<TCSubContainer bor>
					<div>
						선택 중량<span> 2 </span>kg / 총 중량 kg
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
						<TGreyBtn
							onClick={() => {
								setFinalInput((prevFinalInput) => ({
									...prevFinalInput,
									customerDestinationUid: destiObject && destiObject.uid,
								}))
							}}
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
					getCol={AuctionBiddingFieldsCols}
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
				<PackDetail aucDetail={aucDetail} packNum={aucDetail['패키지 번호']} setAucDetailModal={setAucDetailModal} />
			)}
			{/* 입찰 동의서 모달 */}
			{agreementModal && (
				<Agreement
					setAgreementModal={setAgreementModal}
					setCheckAgreement={setCheckAgreement}
					agreementOnClickHandler={agreementOnClickHandler}
				/>
			)}
		</FilterContianer>
	)
}

export default Bidding
