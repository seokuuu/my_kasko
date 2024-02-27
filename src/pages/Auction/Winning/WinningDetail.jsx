import React, { Fragment, useEffect, useRef, useState } from 'react'
import {
	BlackBtn,
	BtnBound,
	NewBottomBtnWrap,
	SkyBtn,
	TGreyBtn,
	TWhiteBtn,
	WhiteBlackBtn,
	WhiteBtn,
	WhiteRedBtn,
	WhiteSkyBtn,
} from '../../../common/Button/Button'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { invenDestination, invenDestinationData, selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'

import {
	CustomInput,
	FilterContianer,
	FilterHeader,
	FilterTCTop,
	FilterTopContainer,
	TCSubContainer,
	TableContianer,
} from '../../../modal/External/ExternalFilter'

import { useAtom } from 'jotai'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import DefaultBlueBar from '../../../modal/Multi/DefaultBlueBar'
import { aucProAddModalAtom } from '../../../store/Layout/Layout'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isEqual } from 'lodash'
import {
	destiApproveReq,
	destiChangeReject,
	getWinningDetail,
	partDeleteBidding,
	partDepositConfirm,
	publishDepositForm,
} from '../../../api/auction/winning'
import { getDestinationFind } from '../../../api/search'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle } from '../../../components/MapTable/MapTable'
import { AuctionWinningDetailFields, AuctionWinningDetailFieldsCols } from '../../../constants/admin/Auction'
import useMutationQuery from '../../../hooks/useMutationQuery'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import InventoryFind from '../../../modal/Multi/InventoryFind'
import useAlert from '../../../store/Alert/useAlert'
import PrintDepositRequestButton from '../../../userpages/UserSales/_components/PrintDepositRequestButton'
import Table from '../../Table/Table'
import WinningDetailFields from './WinningDetailFields'

// 경매 낙찰 상세
const WinningDetail = ({ detailRow, setDetailRow }) => {
	const { simpleAlert, simpleConfirm, showAlert } = useAlert()
	const [destinationPopUp, setDestinationPopUp] = useAtom(invenDestination)
	const [tablePagination, setTablePagination] = useState([])
	const [destinationData, setDestinationData] = useAtom(invenDestinationData)
	console.log('destinationData', destinationData)
	console.log('winning detailRow', detailRow)
	const titleData = ['고객사 명', '고객 코드', '창고', '총 수량', '총 중량', '입금 요청 금액']
	const contentData = [
		detailRow?.['고객사명'],
		detailRow?.['고객 코드'],
		detailRow?.['창고'],
		detailRow?.['수량'],
		detailRow?.['중량'],
		new Intl.NumberFormat('en-US').format(detailRow?.['입금 요청액']) + '원',
	]

	const matchingData = {
		'경매 번호': 'auctionNumber',
		창고: 'storage',
		'고객사 목적지 고유 번호': 'customerDestinationUid',
		'낙찰 상태': 'biddingStatus',
	}

	// 상세 GET 및 param
	function matchDetailRowWithMatchingData(detailRow, matchingData) {
		const matchedData = {}

		Object.keys(matchingData).forEach((key) => {
			const detailKey = matchingData[key]
			if (detailRow.hasOwnProperty(key)) {
				matchedData[detailKey] = detailRow[key]
			}
		})

		return matchedData
	}
	// 상세 GET 및 param
	const matchedResult = matchDetailRowWithMatchingData(detailRow, matchingData)

	const checkSales = ['전체', '확정 전송', '확정 전송 대기']
	const [addModal, setAddModal] = useAtom(aucProAddModalAtom)
	//checkSales
	const [check1, setCheck1] = useState(Array.from({ length: checkSales.length }, () => false))

	//checkShips
	const [checkData1, setCheckData1] = useState(Array.from({ length: checkSales.length }, () => ''))

	const [getRow, setGetRow] = useState('')
	const tableField = useRef(AuctionWinningDetailFieldsCols)
	const getCol = tableField.current
	const queryClient = useQueryClient()
	const checkedArray = useAtom(selectedRowsAtom)[0]

	const init = {
		updateList: [],
	}

	const [input, setInput] = useState(init)

	console.log('checkedArray', checkedArray)

	// 낙찰 취소 관련
	const keysToExtract = ['주문 고유 번호']

	const keyMappings = {
		'주문 고유 번호': 'orderUid',
	}

	// 부분 낙찰 취소
	const extractedArray = checkedArray?.reduce((result, item) => {
		const orderUid = item[keysToExtract[0]]
		console.log('orderUid 추워', orderUid)

		// 중복 체크
		if (!result.includes(orderUid)) {
			// 중복이 아닌 경우에만 결과 배열에 추가
			result.push(orderUid)
		}

		return result
	}, [])

	const keysToExtractDeposit = ['경매 번호', '창고', '고객사 목적지 고유 번호', '낙찰 상태']

	const keyMappingsDeposit = {
		'경매 번호': 'auctionNumber',
		창고: 'storage',
		'고객사 목적지 고유 번호': 'customerDestinationUid',
		'낙찰 상태': 'biddingStatus',
	}

	// 입금 요청서 발행에 사용될 array
	const extractedArrayDeposit = checkedArray?.map((item) =>
		keysToExtractDeposit.reduce((obj, key) => {
			obj[keyMappingsDeposit[key]] = item[key]
			return obj
		}, {}),
	)

	const paramData = {
		pageNum: 1,
		pageSize: 50,
		...matchedResult,
	}

	// Test 후 주석 해제 필
	const [param, setParam] = useState(paramData)
	console.log('param !@#', param)

	// Test 후 주석 해제 필
	// useEffect(() => {
	//   window.scrollTo(0, 0)

	//   setParam((p) => ({
	//     ...p,
	//     auctionNumber: detailRow?.['경매 번호'],
	//     storage: detailRow?.['고객사명'],
	//     customerDestinationUid: detailRow?.['고객사 목적지 고유 번호'],
	//     biddingStatus: detailRow?.['낙찰 상태'],
	//   }))
	// }, [])

	const { data: inventoryDestination } = useReactQuery('', 'getDestinationFind', getDestinationFind)

	console.log('inventoryDestination', inventoryDestination?.data?.data)

	const [winningCreateData, setWinningCreateData] = useState({})
	const { isLoading, isError, data, isSuccess, refetch } = useReactQuery(param, 'getWinningDetail', getWinningDetail)
	const resData = data?.data?.data?.list
	const resPagination = data?.data?.data?.pagination

	console.log('resData !@#', resData)
	console.log('resData !@#', resData)

	useEffect(() => {
		let getData = resData
		//타입, 리액트쿼리, 데이터 확인 후 실행
		if (!isSuccess && !resData) return
		if (Array.isArray(getData)) {
			setGetRow(add_element_field(getData, AuctionWinningDetailFields))
			setTablePagination(resPagination)
		}
	}, [isSuccess, resData])

	// useEffect(() => {
	// 	let getData = resData
	// 	//타입, 리액트쿼리, 데이터 확인 후 실행
	// 	if (!isSuccess && !resData) return
	// 	if (Array.isArray(getData)) {
	// 		setGetRow(add_element_field(getData, AuctionWinningDetailFields))
	// 		setTablePagination(resPagination)
	// 	}
	// }, [isSuccess, resData])

	useEffect(() => {
		const productNumbers = checkedArray?.map((item) => item['주문 고유 번호'])

		const updatedBiddingList = productNumbers?.map((uid) => ({
			uid,
		}))

		setInput((prevInput) => ({
			...prevInput,
			updateList: updatedBiddingList?.map((item) => ({
				...item,
				uid: item.uid, // 유지하고 싶은 다른 속성은 그대로 두고
			})),
		}))

		// setBiddingList(updatedBiddingList)
	}, [checkedArray])

	console.log('updateList', input.updateList?.length)
	const [destiObject, setDestiObject] = useState()
	const [finalInput, setFinalInput] = useState({
		requestCustomerDestinationUid: null,
	})

	console.log('destiObject ###', destiObject)
	console.log('finalInput ###', finalInput)
	useEffect(() => {
		setDestiObject(destinationData)
	}, [destinationData])

	useEffect(() => {
		const updatedProductList = checkedArray?.map((item) => ({
			uid: item['주문 고유 번호'],
			requestCustomerDestinationUid: finalInput?.requestCustomerDestinationUid,
			// 여기에 다른 필요한 속성을 추가할 수 있습니다.
		}))

		// winningCreateData를 업데이트하여 productList를 갱신
		setWinningCreateData((prevData) => ({
			...prevData,
			updateList: updatedProductList,
		}))
	}, [checkedArray, finalInput])

	console.log('winningCreateData', winningCreateData)

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

	const onPageChange = (value) => {
		setParam((prevParam) => ({
			...prevParam,
			pageNum: Number(value),
		}))
	}

	// 부분 낙찰 취소 버튼 Handler
	const { mutate: deleteMutation } = useMutation(partDeleteBidding, {
		onSuccess() {
			showAlert({
				title: '부분 낙찰 취소되었습니다.',
				content: '',
				func: () => {
					refetch()
					queryClient.invalidateQueries('partDelete')
				},
			})
		},
		onError: () => {
			simpleAlert('오류가 발생했습니다. 다시 시도해주세요.')
		},
	})
	const deleteOnClickHandler = () => {
		deleteMutation(extractedArray)
	}

	// 부분 입금 확인 POST
	const { mutate: depositMuation } = useMutation(partDepositConfirm, {
		onSuccess() {
			showAlert({
				title: '부분 입금 확인되었습니다.',
				content: '',
				func: () => {
					refetch()
					queryClient.invalidateQueries('partDelete')
				},
			})
		},
		onError: () => {
			simpleAlert('오류가 발생했습니다. 다시 시도해주세요.')
		},
	})
	// 부분 입금 확인 버튼 Handler
	const partDepostiHandler = () => {
		depositMuation(extractedArray)
	}

	// 목적지 승인 요청 POST
	const { mutate: destiApproveMutation } = useMutation(destiApproveReq, {
		onSuccess() {
			showAlert({
				title: '목적지 승인이 완료되었습니다.',
				content: '',
				func: () => {
					refetch()
					queryClient.invalidateQueries('destiApprove')
					setWinningCreateData({})
				},
			})
		},
		onError: () => {
			simpleAlert('오류가 발생했습니다. 다시 시도해주세요.')
		},
	})
	const destiApproveOnClickHandler = () => {
		destiApproveMutation(winningCreateData)
	}

	// 목적지 변경 반려 POST
	const { mutate: destiChangeRejMutation } = useMutation(destiChangeReject, {
		onSuccess() {
			showAlert({
				title: '목적지 변경이 반려되었습니다.',
				content: '',
				func: () => {
					refetch()
					queryClient.invalidateQueries('destiReject')
					setWinningCreateData({})
				},
			})
		},
		onError: () => {
			simpleAlert('오류가 발생했습니다. 다시 시도해주세요.')
		},
	})
	const destiChangeRejOnClickHandler = () => {
		destiChangeRejMutation(winningCreateData)
	}

	// 목적지 변경 승인 POST
	const { mutate: destiChangeApproveMutation } = useMutation(destiChangeReject, {
		onSuccess() {
			showAlert({
				title: '목적지 변경이 승인되었습니다.',
				content: '',
				func: () => {
					refetch()
					queryClient.invalidateQueries('destiChangeApprove')
					setWinningCreateData({})
				},
			})
		},
		onError: () => {
			simpleAlert('오류가 발생했습니다. 다시 시도해주세요.')
		},
	})
	const destiChangeApprovOnClickHandler = () => {
		destiChangeApproveMutation(winningCreateData)
	}

	// 입금 요청서 발행
	const publishDepositMutation = useMutationQuery('', publishDepositForm)
	const publishDepositOnClickHandler = () => {
		publishDepositMutation.mutate(extractedArrayDeposit)
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

	return (
		<FilterContianer>
			<FilterHeader>
				<div style={{ display: 'flex' }}>
					<h1>경매 낙찰 상세</h1>
				</div>
				{/* 토글 쓰기 */}
				<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
			</FilterHeader>
			<FilterTopContainer>
				<FilterTCTop>
					<h6>경매 번호</h6>
					<p>{detailRow && detailRow['경매 번호']}</p>
				</FilterTCTop>
			</FilterTopContainer>
			<ClaimTable style={{ marginBottom: '30px' }}>
				{[0, 1].map((index) => (
					<ClaimRow key={index}>
						{titleData.slice(index * 3, index * 3 + 3).map((title, idx) => (
							<Fragment agmentkey={title}>
								<ClaimTitle>{title}</ClaimTitle>
								<ClaimContent>{contentData[index * 3 + idx]}</ClaimContent>
							</Fragment>
						))}
					</ClaimRow>
				))}
			</ClaimTable>
			{exFilterToggle && (
				<>
					{/* <FilterSubcontianer>
						<FilterLeft>
							<RowWrap>
								<PartWrap>
									<h6 style={{ width: '130px' }}>확정 전송 일자</h6>
									<GridWrap>
										<DateGrid bgColor={'white'} fontSize={17} />
										<Tilde>~</Tilde>
										<DateGrid bgColor={'white'} fontSize={17} />
									</GridWrap>
								</PartWrap>
							</RowWrap>
							<RowWrap style={{ borderBottom: '0px' }}>
								{' '}
								<PartWrap>
									<h6>주문 상태</h6>
									<ExCheckWrap>
										{checkSales.map((x, index) => (
											<ExCheckDiv>
												<StyledCheckSubSquDiv
													onClick={() => setCheck1(CheckBox(check1, check1.length, index, true))}
													isChecked={check1[index]}
												>
													<CheckImg2 src="/svg/check.svg" isChecked={check1[index]} />
												</StyledCheckSubSquDiv>
												<p>{x}</p>
											</ExCheckDiv>
										))}
									</ExCheckWrap>
								</PartWrap>
							</RowWrap>
						</FilterLeft>
					</FilterSubcontianer>
					<FilterFooter>
						<div style={{ display: 'flex' }}>
							<p>초기화</p>
							<ResetImg
								src="/img/reset.png"
								style={{ marginLeft: '10px', marginRight: '20px' }}
								onClick={handleImageClick}
								className={isRotated ? 'rotate' : ''}
							/>
						</div>
						<div style={{ width: '180px' }}>
							<BlackBtn width={100} height={40}>
								검색
							</BlackBtn>
						</div>
					</FilterFooter> */}
					<GlobalProductSearch
						param={param}
						isToggleSeparate={true}
						renderCustomSearchFields={(props) => <WinningDetailFields {...props} />}
						globalProductSearchOnClick={globalProductSearchOnClick}
						globalProductResetOnClick={globalProductResetOnClick}
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
						<PageDropdown />
						<Excel getRow={getRow} />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택 중량<span> 2 </span>kg / 총 중량 kg
					</div>
					<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
						<p>목적지</p>
						<CustomInput placeholder="h50" width={60} height={32} defaultValue={destinationData?.code} readOnly />
						<CustomInput placeholder="목적지명" width={120} height={32} defaultValue={destinationData?.name} readOnly />
						{/* <CustomInput placeholder="도착지 연락처" width={120} height={32} /> */}
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
									requestCustomerDestinationUid: destiObject && destiObject.uid,
								}))
							}}
						>
							적용
						</TGreyBtn>
						<BtnBound style={{ margin: '0px' }} />
						<WhiteBlackBtn onClick={destiApproveOnClickHandler}>목적지 승인 요청</WhiteBlackBtn>

						<BtnBound style={{ margin: '0px' }} />
						<WhiteRedBtn onClick={destiChangeRejOnClickHandler}>목적지 변경 반려</WhiteRedBtn>
						<WhiteSkyBtn str onClick={destiChangeApprovOnClickHandler}>
							목적지 변경 승인
						</WhiteSkyBtn>
					</div>
				</TCSubContainer>
				<Table getCol={getCol} getRow={getRow} tablePagination={tablePagination} onPageChange={onPageChange} />
				<TCSubContainer>
					<div></div>
					<div style={{ display: 'flex', gap: '10px' }}>
						{/* 입금 확인 요청서 */}
						<PrintDepositRequestButton
							auctionNumber={param?.auctionNumber}
							storage={param?.storage}
							customerDestinationUid={param?.customerDestinationUid}
							biddingStatus={param?.biddingStatus}
						/>
						<BtnBound style={{ margin: '0px' }} />
						<WhiteRedBtn onClick={deleteOnClickHandler}>부분 낙찰 취소 </WhiteRedBtn>
						<SkyBtn onClick={partDepostiHandler}>부분 입금 확인</SkyBtn>
					</div>
				</TCSubContainer>
				<NewBottomBtnWrap>
					<BlackBtn
						width={13}
						height={40}
						onClick={() => {
							setDetailRow(null)
						}}
					>
						돌아가기
					</BlackBtn>
				</NewBottomBtnWrap>
				{addModal && <DefaultBlueBar setAddModal={setAddModal} />}
			</TableContianer>
			{destinationPopUp && (
				<InventoryFind
					title={'목적지 찾기'}
					setSwitch={setDestinationPopUp}
					data={inventoryDestination}
					handleButtonOnClick={() => {}}
				/>
			)}
		</FilterContianer>
	)
}

export default WinningDetail
