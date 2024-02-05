import { useEffect, useRef, useState } from 'react'

import { BtnBound, SkyBtn, TGreyBtn, TWhiteBtn } from '../../../common/Button/Button'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import {
	invenDestinationData,
	selectedRowsAtom,
	toggleAtom,
	userPageSingleDestiFindAtom,
} from '../../../store/Layout/Layout'

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
import { getBidding, postBidding } from '../../../api/auction/bidding'
import { getAuctionDestination } from '../../../api/auction/winning'
import { CAUTION_CATEGORY, CautionBox } from '../../../components/CautionBox'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import Excel from '../../../components/TableInner/Excel'
import { AuctionBiddingFields, AuctionBiddingFieldsCols } from '../../../constants/admin/Auction'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import InventoryFind from '../../../modal/Multi/InventoryFind'
import useAlert from '../../../store/Alert/useAlert'
import Table from '../../Table/Table'
import BiddingSearchFields from './BiddingSearchFields'

const Bidding = ({}) => {
	const { simpleAlert, simpleConfirm, showAlert } = useAlert()
	const [destinationPopUp, setDestinationPopUp] = useAtom(userPageSingleDestiFindAtom)
	const [destinationData, setDestinationData] = useAtom(invenDestinationData)
	// 고객사 팝업 상태,객체

	console.log('destinationData', destinationData)

	const [types, setTypes] = useState('단일')

	console.log('types => ', types)

	const radioDummy = ['전체', '미진행', '진행중', '종료']

	const handleSelectChange = (selectedOption, name) => {
		// setInput(prevState => ({
		//   ...prevState,
		//   [name]: selectedOption.label,
		// }));
	}
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
	console.log('destiObject', destiObject)
	const tableField = useRef(AuctionBiddingFieldsCols)
	const getCol = tableField.current
	const queryClient = useQueryClient()
	const checkedArray = useAtom(selectedRowsAtom)[0]
	// const productNumbers = checkedArray?.map((item) => item['제품 고유 번호'])
	const [tablePagination, setTablePagination] = useState([])

	const paramData = {
		pageNum: 1,
		pageSize: 50,
		type: types,
	}

	console.log('paramData', paramData)

	const [param, setParam] = useState(paramData)
	console.log('param !@#', param)

	const productListInner = {
		biddingPrice: null,
		customerDestinationUid: null,
	}

	const [winningCreateInput, setwinningCreateInput] = useState(productListInner)
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
		type: types,
	}

	console.log('init', init)

	const [winningCreateData, setWinningCreateData] = useState(init)

	const { data: auctionDestination } = useReactQuery('', 'getAuctionDestination', getAuctionDestination)

	console.log('auctionDestination', auctionDestination?.data?.data)

	//
	useEffect(() => {
		const selectedObject = auctionDestination?.data?.data.find((item) => item.uid === propsUid)
		setDestiObject(selectedObject)
		setWinningCreateData((p) => ({
			...p,
			auctionNumber: auctionNumber,
			type: types,
		}))
	}, [propsUid, auctionNumber, types])

	const [finalInput, setFinalInput] = useState({
		biddingPrice: null,
		customerDestinationUid: null,
	})

	console.log('finalInput', finalInput)

	// biddingList에 들어갈 3총사를 다 넣어줌.
	useEffect(() => {
		const updatedProductList = checkedArray?.map((item) => ({
			productUid: item['제품 고유 번호'],
			biddingPrice: finalInput?.biddingPrice,
			customerDestinationUid: finalInput?.customerDestinationUid,
			// 여기에 다른 필요한 속성을 추가할 수 있습니다.
		}))

		// winningCreateData를 업데이트하여 productList를 갱신
		setWinningCreateData((prevData) => ({
			...prevData,
			biddingList: updatedProductList,
		}))
	}, [checkedArray, finalInput, types])

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

	// const postMutation = useMutationQuery('', postBidding, {
	// 	onSuccess: () => {
	// 		// simpleAlert('응찰 되었습니다.', () => {
	// 		// 	refetch()
	// 		// })
	// 		console.log('응찰 성공 @@@@@@@@@@@@@@@@@')
	// 	},
	// 	onError: () => {
	// 		simpleAlert('오류가 발생했습니다. 다시 시도해주세요.')
	// 	},
	// })

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

	console.log('values', values)

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

	useEffect(() => {
		setWinningCreateData((prev) => ({
			...prev,
			biddingList: [{ ...values }],
			auctionNumber: valueDesti,
		}))
	}, [values])

	console.log('winningCreateData <33', winningCreateData)

	// 	TODO : 목적지 항목 추가하기
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
						<StyledHeading isActive={types === '단일'} onClick={() => setTypes('단일')}>
							단일
						</StyledHeading>
						<StyledSubHeading isActive={types === '패키지'} onClick={() => setTypes('패키지')}>
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
					{/* <FilterSubcontianer>
						<FilterLeft>
							<RowWrap>
								<PartWrap first>
									<h6>창고 구분</h6>
									<PWRight>
										<MainSelect options={storageOptions} defaultValue={storageOptions[0]} />
									</PWRight>
								</PartWrap>

								<PartWrap>
									<h6>매입처</h6>
									<PWRight>
										<MainSelect options={storageOptions} defaultValue={storageOptions[0]} />
									</PWRight>
								</PartWrap>

								<PartWrap>
									<h6>규격 약호</h6>
									<Input />
									<GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17}>
										찾기
									</GreyBtn>
								</PartWrap>
							</RowWrap>
							<RowWrap none>
								<PartWrap first>
									<h6>구분</h6>
									<MainSelect />
									<MainSelect />
								</PartWrap>
							</RowWrap>
							<RowWrap none>
								<PartWrap first>
									<h6>두께(MM)</h6>
									<MiniInput /> <Tilde>~</Tilde>
									<MiniInput />
								</PartWrap>
								<PartWrap>
									<h6>폭(MM)</h6>
									<MiniInput /> <Tilde>~</Tilde>
									<MiniInput />
								</PartWrap>
								<PartWrap>
									<h6>길이(MM)</h6>
									<MiniInput /> <Tilde>~</Tilde>
									<MiniInput />
								</PartWrap>
							</RowWrap>
						</FilterLeft>
						<FilterRight>
							<DoubleWrap>
								<h6>제품 번호 </h6>
								<textarea
									placeholder='복수 조회 진행 &#13;&#10;  제품 번호 "," 혹은 enter로 &#13;&#10;  구분하여 작성해주세요.'
								/>
							</DoubleWrap>
						</FilterRight>
					</FilterSubcontianer> */}
					{/* <FilterFooter>
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
		</FilterContianer>
	)
}

export default Bidding
