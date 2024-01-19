import React, { Fragment, useEffect, useRef, useState } from 'react'
import {
	BlackBtn,
	BtnBound,
	SkyBtn,
	TGreyBtn,
	TWhiteBtn,
	WhiteBlackBtn,
	WhiteRedBtn,
	WhiteSkyBtn,
} from '../../../common/Button/Button'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { invenDestination, invenDestinationData, selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'

import {
	CustomInput,
	ExCheckDiv,
	ExCheckWrap,
	FilterContianer,
	FilterFooter,
	FilterHeader,
	FilterLeft,
	FilterSubcontianer,
	FilterTCTop,
	FilterTopContainer,
	GridWrap,
	PartWrap,
	ResetImg,
	RowWrap,
	TCSubContainer,
	TableContianer,
	Tilde,
} from '../../../modal/External/ExternalFilter'

import { CheckImg2, StyledCheckSubSquDiv } from '../../../common/Check/CheckImg'
import { CheckBox } from '../../../common/Check/Checkbox'

import { useAtom } from 'jotai'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import DefaultBlueBar from '../../../modal/Multi/DefaultBlueBar'
import { aucProAddModalAtom } from '../../../store/Layout/Layout'

import { useQueryClient } from '@tanstack/react-query'
import {
	destiApproveReq,
	destiChangeApprove,
	destiChangeReject,
	getWinningDetail,
	partDeleteBidding,
	partDepositConfirm,
	publishDepositForm,
} from '../../../api/auction/winning'
import DateGrid from '../../../components/DateGrid/DateGrid'
import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle } from '../../../components/MapTable/MapTable'
import { AuctionWinningDetailFields, AuctionWinningDetailFieldsCols } from '../../../constants/admin/Auction'
import useMutationQuery from '../../../hooks/useMutationQuery'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import Table from '../../Table/Table'
import InventoryFind from '../../../modal/Multi/InventoryFind'
import { getDestinationFind } from '../../../api/search'

// 경매 낙찰 상세
const WinningDetail = ({ detailRow }) => {
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

	const extractedArray = checkedArray?.reduce((result, item) => {
		const orderUid = item[keysToExtract[0]]

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

	// Test 후 주석 해제 필
	const [detailParams, setDetailParams] = useState({
		// pageNum: 1,
		// pageSize: 50,
		// auctionNumber: '',
		// storage: '',
		// customerDestinationUid: '',
		// biddingStatus: '',
		pageNum: 1,
		pageSize: 50,
		auctionNumber: '2024010211',
		storage: '우성',
		customerDestinationUid: '165',
		biddingStatus: '낙찰 취소',
	})

	console.log('detailParams', detailParams)

	// Test 후 주석 해제 필
	// useEffect(() => {
	//   window.scrollTo(0, 0)

	//   setDetailParams((p) => ({
	//     ...p,
	//     auctionNumber: detailRow?.['경매 번호'],
	//     storage: detailRow?.['고객사명'],
	//     customerDestinationUid: detailRow?.['고객사 목적지 고유 번호'],
	//     biddingStatus: detailRow?.['낙찰 상태'],
	//   }))
	// }, [])

	console.log('detailParams', detailParams)

	const { data: inventoryDestination } = useReactQuery('', 'getDestinationFind', getDestinationFind)

	console.log('inventoryDestination', inventoryDestination?.data?.data)
	const { isLoading, isError, data, isSuccess } = useReactQuery(detailParams, 'getWinningDetail', getWinningDetail)
	const resData = data?.data?.data?.list
	const resPagination = data?.data?.data?.pagination

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

	// 목적지 적용 버튼
	const handleSetCustomerDestinationUid = () => {
		const updatedWinningList = input.updateList?.map((item) => ({
			...item,
			requestCustomerDestinationUid: destinationData.uid,
		}))

		// setBiddingList(updatedBiddingList)
		setInput((prevInput) => ({
			...prevInput,
			updateList: [...updatedWinningList],
		}))
	}

	console.log('input', input)

	useEffect(() => {
		// true에 해당되면, value를, false면 빈값을 반환
		const updatedCheck = checkSales.map((value, index) => {
			return check1[index] ? value : ''
		})
		// 빈값을 제외한 진짜배기 값이 filteredCheck에 담긴다.
		const filteredCheck = updatedCheck.filter((item) => item !== '')
		setCheckData1(filteredCheck)

		// 전송용 input에 담을 때
		// setInput({
		//   ...input,
		//   businessType: updatedCheck.filter(item => item !== ''),
		// });
	}, [check1])

	const handleSelectChange = (selectedOption, name) => {
		// setInput(prevState => ({
		//   ...prevState,F
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

	const onPageChange = (value) => {
		setDetailParams((prevParam) => ({
			...prevParam,
			pageNum: Number(value),
		}))
	}

	// 부분 낙찰 취소 POST
	const deleteMutation = useMutationQuery('', partDeleteBidding)

	// 부분 낙찰 취소 버튼 Handler
	const deleteOnClickHandler = () => {
		deleteMutation.mutate(extractedArray)
	}

	// 부분 입금 확인 POST
	const depositMuation = useMutationQuery('', partDepositConfirm)

	// 부분 입금 확인 버튼 Handler
	const partDepostiHandler = () => {
		depositMuation.mutate(extractedArray)
	}

	// 목적지 승인 요청 POST
	const destiApproveMutation = useMutationQuery('', destiApproveReq)
	const destiApproveOnClickHandler = () => {
		destiApproveMutation.mutate(input)
	}

	// 목적지 변경 반려 POST
	const destiChangeRejMutation = useMutationQuery('', destiChangeReject)
	const destiChangeRejOnClickHandler = () => {
		destiChangeRejMutation.mutate(input)
	}
	// 목적지 변경 승인 POST
	const destiChangeApproveMutation = useMutationQuery('', destiChangeApprove)
	const destiChangeApprovOnClickHandler = () => {
		destiChangeApproveMutation.mutate(input)
	}

	const publishDepositMutation = useMutationQuery('', publishDepositForm)
	const publishDepositOnClickHandler = () => {
		publishDepositMutation.mutate(extractedArrayDeposit)
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
					<FilterSubcontianer>
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
					</FilterFooter>
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
						<CustomInput placeholder="h50" width={60} height={32} defaultValue={destinationData?.code} />
						<CustomInput placeholder="목적지명" width={120} height={32} defaultValue={destinationData?.name} />
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
						<TGreyBtn onClick={handleSetCustomerDestinationUid}>적용</TGreyBtn>
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
						<WhiteSkyBtn onClick={publishDepositOnClickHandler}>입금 요청서 발행</WhiteSkyBtn>
						<BtnBound style={{ margin: '0px' }} />
						<WhiteRedBtn onClick={deleteOnClickHandler}>부분 낙찰 취소 </WhiteRedBtn>
						<SkyBtn onClick={partDepostiHandler}>부분 입금 확인</SkyBtn>
					</div>
				</TCSubContainer>
				{addModal && <DefaultBlueBar setAddModal={setAddModal} />}
			</TableContianer>
			{destinationPopUp && (
				<InventoryFind title={'목적지 찾기'} setSwitch={setDestinationPopUp} data={inventoryDestination} />
			)}
		</FilterContianer>
	)
}

export default WinningDetail
