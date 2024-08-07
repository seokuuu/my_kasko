import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import {
	BlackBtn,
	BtnBound,
	NewBottomBtnWrap,
	SkyBtn,
	TGreyBtn,
	TWhiteBtn,
	WhiteRedBtn,
	WhiteSkyBtn,
} from '../../../common/Button/Button'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import {
	aucProAddModalAtom,
	invenDestination,
	invenDestinationData,
	selectedRowsAtom,
	toggleAtom,
	winningDetailAucNumAtom,
} from '../../../store/Layout/Layout'

import {
	CustomInput,
	FilterContianer,
	FilterHeader,
	FilterTCTop,
	FilterTopContainer,
	TableContianer,
	TCSubContainer,
} from '../../../modal/External/ExternalFilter'

import { useAtom } from 'jotai'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import DefaultBlueBar from '../../../modal/Multi/DefaultBlueBar'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isEqual } from 'lodash'
import { useNavigate } from 'react-router-dom'
import {
	destiApproveReq,
	destiChangeApprove,
	destiChangeReject,
	getAuctionDetailDestination,
	getWinningDetail,
	partDeleteBidding,
	partDepositConfirm,
	publishDepositForm,
} from '../../../api/auction/winning'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle } from '../../../components/MapTable/MapTable'
import { AuctionWinningDetailFields, AuctionWinningDetailFieldsCols } from '../../../constants/admin/Auction'
import useMutationQuery from '../../../hooks/useMutationQuery'
import useReactQuery from '../../../hooks/useReactQuery'
import useTableData from '../../../hooks/useTableData'
import useTableSelection from '../../../hooks/useTableSelection'
import InventoryFind from '../../../modal/Multi/InventoryFind'
import useAlert from '../../../store/Alert/useAlert'
import PrintDepositRequestButton from '../../../userpages/UserSales/_components/PrintDepositRequestButton'
import { onSizeChange } from '../../Operate/utils'
import Table from '../../Table/Table'
import TableV2HiddenSection from '../../Table/TableV2HiddenSection'
import WinningDetailFields from './WinningDetailFields'

// 경매 낙찰 상세
const WinningDetail = ({ setAucDetail }) => {
	const navigate = useNavigate()
	const [detailRow, setDetailRow] = useAtom(winningDetailAucNumAtom)
	const { simpleAlert, showAlert } = useAlert()
	const [destinationPopUp, setDestinationPopUp] = useAtom(invenDestination)
	const [tablePagination, setTablePagination] = useState([])
	const [destinationData, setDestinationData] = useAtom(invenDestinationData)
	const [contentData, setContentData] = useState([])

	const titleData = [
		'경매 번호',
		'고객사 명',
		'고객 코드',
		'창고',
		'총 수량',
		'총 중량',
		'제품 금액 (VAT 포함)',
		'운반비 (VAT 포함)',
		'입금 요청 금액',
	]

	useEffect(() => {
		if (detailRow) {
			const newContentData = [
				detailRow['경매 번호'],
				detailRow['고객사명'],
				detailRow['고객 코드'],
				detailRow['창고'],
				detailRow['수량'],
				detailRow['중량'],
				detailRow['제품 금액 (VAT 포함)'] + '원',
				detailRow['운반비 (VAT 포함)'] + '원',
				detailRow['입금 요청액'] + '원',
			]
			// 새로운 contentData 값을 상태로 업데이트
			setContentData(newContentData)
		}
	}, [detailRow])

	const matchingData = {
		'경매 번호': 'auctionNumber',
		창고: 'storage',
		'고객사 목적지 고유 번호': 'customerDestinationUid',
		'낙찰 상태': 'biddingStatus',
		'패키지 번호': 'packageNumber',
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

	const [getRow, setGetRow] = useState('')
	const tableField = useRef(AuctionWinningDetailFieldsCols)
	const getCol = tableField.current
	const queryClient = useQueryClient()

	const [checkedArray, setCheckedArray] = useAtom(selectedRowsAtom)

	const init = {
		updateList: [],
	}

	const [input, setInput] = useState(init)

	// 낙찰 취소 관련
	const keysToExtract = ['주문 고유 번호']

	const keyMappings = {
		'주문 고유 번호': 'orderUid',
	}

	// 부분 낙찰 취소
	const extractedArray = checkedArray?.reduce((result, item) => {
		const orderUid = item[keysToExtract[0]]

		// 중복 체크
		if (!result.includes(orderUid)) {
			// 중복이 아닌 경우에만 결과 배열에 추가
			result.push(orderUid)
		}

		return result
	}, [])

	const keysToExtractDeposit = ['경매 번호', '창고', '고객사 목적지 고유 번호', '낙찰 상태', '패키지 번호']

	const keyMappingsDeposit = {
		'경매 번호': 'auctionNumber',
		창고: 'storage',
		'고객사 목적지 고유 번호': 'customerDestinationUid',
		'낙찰 상태': 'biddingStatus',
		'패키지 번호': 'packageNumber',
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

	const [param, setParam] = useState(paramData)

	const customerCode = detailRow['고객 코드']

	const [winningCreateData, setWinningCreateData] = useState({})
	const { isLoading, isError, data, isSuccess, refetch } = useReactQuery(param, 'getWinningDetail', getWinningDetail)

	const originData = data?.data?.data
	const [oriData, setOridata] = useState()

	const resData = data?.data?.data?.list

	const newCustomerCode = resData?.map((x) => x?.code)[0]

	const { data: inventoryDestination } = useReactQuery(
		newCustomerCode,
		'getAuctionDetailDestination',
		getAuctionDetailDestination,
	)

	const resDestiData = inventoryDestination?.data?.data
	const matchedDestination = resDestiData?.find((item) => item.uid === destinationData?.uid)

	const uids = checkedArray?.map((item) => item && item['주문 고유 번호'])

	// 목적지 적용 버튼 onClick Handler
	const destiOnClickHandler = () => {
		if (!uids || uids?.length === 0) {
			simpleAlert('적용할 경매를 선택해주세요.')
			return
		}
		simpleAlert('적용 되었습니다.', () => {
			setFinalInput((prevFinalInput) => ({
				...prevFinalInput,
				requestCustomerDestinationUid: destiObject && destiObject.uid,
			}))
		})

		const updatedResData = oriData?.list?.map((item) => {
			if (uids.includes(item.orderUid)) {
				item.requestDestinationName = matchedDestination?.destinationName || destinationData?.destinationName
				item.requestDestinationAddress = matchedDestination?.address || destinationData?.address
				item.requestDestinationPhone = matchedDestination?.managerPhone || destinationData?.managerPhone
				item.requestDestinationManagerPhone = matchedDestination?.phone || destinationData?.phone
			}

			return item
		})

		setOridata((prevData) => ({
			...prevData,
			list: updatedResData,
		}))
	}

	useEffect(() => {
		queryClient.invalidateQueries('getWinningDetail')
	}, [])

	// 예외 처리
	useEffect(() => {
		if (isSuccess && resData === undefined && !detailRow) navigate('/auction/winning')
	}, [isSuccess, resData, detailRow])

	const resPagination = data?.data?.data?.pagination

	useEffect(() => {
		let getData = originData || []
		//타입, 리액트쿼리, 데이터 확인 후 실행
		if (!isSuccess && !getData) return
		if (Array.isArray(getData?.list)) {
			setOridata(getData)
			setTablePagination(resPagination)
		}
	}, [isSuccess, originData])

	const tableFields = useMemo(() => {
		return AuctionWinningDetailFieldsCols(checkedArray)
	}, [checkedArray])

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

	const [destiObject, setDestiObject] = useState()

	const [finalInput, setFinalInput] = useState({
		requestCustomerDestinationUid: null,
	})

	useEffect(() => {
		setDestiObject(destinationData)
	}, [destinationData])

	useEffect(() => {
		const updatedProductList = checkedArray?.map((item) => ({
			uid: item['주문 고유 번호'],
			requestCustomerDestinationUid: destinationData?.uid || item['변경 요청 목적지 고유 번호'],
			// 여기에 다른 필요한 속성을 추가할 수 있습니다.
		}))

		// winningCreateData를 업데이트하여 productList를 갱신
		setWinningCreateData((prevData) => ({
			...prevData,
			updateList: updatedProductList,
		}))
	}, [checkedArray, finalInput])

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

		onError: (e) => {
			simpleAlert(e?.data?.message || '오류가 발생했습니다. 다시 시도해주세요.')
		},
	})
	const deleteOnClickHandler = () => {
		if (!checkedArray || checkedArray?.length === 0) {
			simpleAlert('제품을 선택해주세요.')
			return
		}
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

		onError: (e) => {
			simpleAlert(e?.data?.message || '오류가 발생했습니다. 다시 시도해주세요.')
		},
	})

	// 부분 입금 확인 버튼 Handler
	const partDepostiHandler = () => {
		if (!checkedArray || checkedArray?.length === 0) {
			simpleAlert('제품을 선택해주세요.')
			return
		}
		depositMuation(extractedArray)
	}

	// 목적지 승인 요청 POST
	const { mutate: destiApproveMutation } = useMutation(destiApproveReq, {
		onSuccess() {
			showAlert({
				title: '목적지 승인요청이 완료되었습니다.',
				content: '',
				func: () => {
					refetch()
					queryClient.invalidateQueries('destiApprove')
					window.location.reload()
				},
			})
		},
		onError: (error) => {
			simpleAlert(error.status === 400 ? error.data.message : '오류가 발생했습니다. 다시 시도해주세요.')
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
		onError: (error) => {
			simpleAlert(error.status === 400 ? error.data.message : '오류가 발생했습니다. 다시 시도해주세요.')
		},
	})
	const destiChangeRejOnClickHandler = () => {
		if (!checkedArray || checkedArray?.length === 0) {
			simpleAlert('제품을 선택해주세요.')
			return
		}
		destiChangeRejMutation(winningCreateData)
	}

	// 목적지 변경 승인 POST
	const { mutate: destiChangeApproveMutation } = useMutation(destiChangeApprove, {
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
		onError: (error) => {
			simpleAlert(error.status === 400 ? error.data.message : '오류가 발생했습니다. 다시 시도해주세요.')
		},
	})
	const destiChangeApprovOnClickHandler = () => {
		if (!checkedArray || checkedArray?.length === 0) {
			simpleAlert('제품을 선택해주세요.')
			return
		}
		destiChangeApproveMutation(winningCreateData)
	}

	// 입금 요청서 발행
	const publishDepositMutation = useMutationQuery('', publishDepositForm)
	const publishDepositOnClickHandler = () => {
		publishDepositMutation.mutate(extractedArrayDeposit)
	}

	const globalProductResetOnClick = () => {
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

	const { selectedWeightStr, selectedCountStr } = useTableSelection({
		weightKey: '중량',
	})

	const { tableRowData, totalWeightStr, totalCountStr } = useTableData({
		tableField: AuctionWinningDetailFields,
		serverData: oriData,
		// wish: { display: true, key: ['productNumber', 'packageNumber'] },
		// best: { display: true },
	})

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
					<p>{contentData[0]}</p>
				</FilterTCTop>
			</FilterTopContainer>
			<ClaimTable style={{ marginBottom: '30px' }}>
				{[0, 1, 2].map((index) => (
					<ClaimRow key={index}>
						{titleData.slice(index * 3, index * 3 + 3).map((title, idx) => (
							<Fragment key={title}>
								<ClaimTitle>{title}</ClaimTitle>
								<ClaimContent>{contentData[index * 3 + idx]}</ClaimContent>
							</Fragment>
						))}
					</ClaimRow>
				))}
			</ClaimTable>
			{exFilterToggle && (
				<>
					<GlobalProductSearch
						param={param}
						setParam={setParam}
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
						조회 목록 (선택 <span>{selectedCountStr}</span> / {totalCountStr}개 )
						<TableV2HiddenSection />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={(e) => onSizeChange(e, setParam)} />
						{console.log('tableRowData  : ', tableRowData)}
						<Excel getRow={tableRowData} sheetName="경매 낙찰 상세" />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택 중량 <span> {selectedWeightStr} </span> (kg) / 총 중량 {totalWeightStr} (kg)
					</div>
					<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
						<p>목적지</p>
						<CustomInput placeholder="h50" width={60} height={32} defaultValue={destinationData?.code} readOnly />
						<CustomInput placeholder="목적지명" width={120} height={32} defaultValue={destinationData?.name} readOnly />
						{/* <CustomInput placeholder="도착지 연락처" width={120} height={32} /> */}
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
						{/* <WhiteBlackBtn onClick={destiApproveOnClickHandler}>목적지 승인 요청</WhiteBlackBtn>
						<BtnBound style={{ margin: '0px' }} /> */}
						<WhiteRedBtn onClick={destiChangeRejOnClickHandler}>목적지 변경 반려</WhiteRedBtn>
						<WhiteSkyBtn str onClick={destiChangeApprovOnClickHandler}>
							목적지 변경 승인
						</WhiteSkyBtn>
					</div>
				</TCSubContainer>
				<Table
					getCol={tableFields}
					getRow={tableRowData}
					tablePagination={tablePagination}
					onPageChange={onPageChange}
				/>
				<TCSubContainer>
					<div></div>
					<div style={{ display: 'flex', gap: '10px' }}>
						{/* 입금 확인 요청서 */}
						<PrintDepositRequestButton
							auctionNumber={param?.auctionNumber}
							storage={param?.storage}
							customerDestinationUid={param?.customerDestinationUid}
							biddingStatus={param?.biddingStatus}
							packagerNumber={param?.packageNumber}
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
							navigate(-1)
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
