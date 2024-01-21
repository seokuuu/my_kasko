import { useEffect, useRef, useState } from 'react'
import { storageOptions } from '../../../common/Option/SignUp'

import { BlackBtn, BtnBound, GreyBtn, SkyBtn, TGreyBtn, TWhiteBtn, WhiteGrnBtn } from '../../../common/Button/Button'
import { MainSelect } from '../../../common/Option/Main'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { invenDestination, selectedRowsAtom, toggleAtom, invenDestinationData } from '../../../store/Layout/Layout'

import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'

import {
	CustomInput,
	DoubleWrap,
	FilterContianer,
	FilterFooter,
	FilterHeader,
	FilterHeaderAlert,
	FilterLeft,
	FilterRight,
	FilterSubcontianer,
	Input,
	MiniInput,
	PWRight,
	PartWrap,
	ResetImg,
	RowWrap,
	StyledHeading,
	StyledSubHeading,
	SubTitle,
	TCSubContainer,
	TableContianer,
	Tilde,
} from '../../../modal/External/ExternalFilter'

import { useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { getBidding, postBidding } from '../../../api/auction/bidding'
import Excel from '../../../components/TableInner/Excel'
import { AuctionBiddingFields, AuctionBiddingFieldsCols } from '../../../constants/admin/Auction'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import InventoryFind from '../../../modal/Multi/InventoryFind'
import Table from '../../Table/Table'
import { getDestinationFind } from '../../../api/search'
import useMutationQuery from '../../../hooks/useMutationQuery'
import BiddingSearchFields from './BiddingSearchFields'
import { isEqual } from 'lodash'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'

const Bidding = ({}) => {
	const [destinationPopUp, setDestinationPopUp] = useAtom(invenDestination)
	const [destinationData, setDestinationData] = useAtom(invenDestinationData)
	// 고객사 팝업 상태,객체

	console.log('destinationData', destinationData)

	const [types, setTypes] = useState('단일')
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
	const tableField = useRef(AuctionBiddingFieldsCols)
	const getCol = tableField.current
	const queryClient = useQueryClient()
	const checkedArray = useAtom(selectedRowsAtom)[0]
	// const productNumbers = checkedArray?.map((item) => item['제품 고유 번호'])

	const paramData = {
		pageNum: 1,
		pageSize: 50,
		type: types,
	}
	const [param, setParam] = useState(paramData)

	const init = {
		auctionNumber: null,
		type: types,
		biddingList: [],
	}

	const [input, setInput] = useState(init)

	const [innerObject, setInnerObject] = useState({})
	const [biddingInput, setBiddingInput] = useState(null)
	const [biddingList, setBiddingList] = useState([])
	const [tablePagination, setTablePagination] = useState([])

	console.log('biddingList @@', biddingList)

	const biddingHandler = (e) => {
		const value = e.target.value
		const intValue = parseInt(value)
		setBiddingInput(intValue)
	}

	useEffect(() => {
		const productNumbers = checkedArray?.map((item) => item['제품 고유 번호'])

		const auctionNumber = checkedArray?.[0]?.['경매 번호']

		setInput((prevInput) => ({
			...prevInput,
			auctionNumber: auctionNumber,
		}))

		const updatedBiddingList = productNumbers?.map((productUid) => ({
			productUid,
		}))

		setInput((prevInput) => ({
			...prevInput,
			biddingList: updatedBiddingList?.map((item) => ({
				...item,
				productUid: item.productUid, // 유지하고 싶은 다른 속성은 그대로 두고
			})),
		}))

		// setBiddingList(updatedBiddingList)
	}, [checkedArray])

	// 목적지 적용 버튼
	const handleSetCustomerDestinationUid = () => {
		const updatedBiddingList = input.biddingList.map((item) => ({
			...item,
			customerDestinationUid: destinationData.uid,
		}))

		// setBiddingList(updatedBiddingList)
		setInput((prevInput) => ({
			...prevInput,
			biddingList: [...updatedBiddingList],
		}))
	}

	// 응찰가 적용 버튼
	const handleSetBiddingPrice = () => {
		const updatedBiddingList2 = input.biddingList.map((item) => ({
			...item,
			biddingPrice: biddingInput,
		}))

		// setBiddingList(updatedBiddingList2)
		setInput((prevInput) => ({
			...prevInput,
			biddingList: [...updatedBiddingList2],
		}))
	}

	console.log('input ==>', input)

	const postMutation = useMutationQuery('', postBidding)

	// 응찰 버튼 POST
	const confirmOnClickHandler = () => {
		postMutation.mutate(input)
	}

	// 목적지 찾기 GET
	const { data: inventoryDestination } = useReactQuery('', 'getDestinationFind', getDestinationFind)

	// 전체 GET
	const { isLoading, isError, data, isSuccess, refetch } = useReactQuery(param, 'getBidding', getBidding)
	const resData = data?.data?.data?.list
	const resPagination = data?.data?.data?.pagination

	useEffect(() => {
		let getData = resData
		//타입, 리액트쿼리, 데이터 확인 후 실행
		if (!isSuccess && !resData) return
		if (Array.isArray(getData)) {
			setGetRow(add_element_field(getData, AuctionBiddingFields))
			setTablePagination(resPagination)
		}
	}, [isSuccess, resData])

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
			<FilterHeaderAlert>
				<div style={{ display: 'flex' }}>
					<div style={{ marginRight: '20px' }}>
						<img src="/img/notice.png" />
					</div>
					<div style={{ marginTop: '6px' }}>
						<div>
							· 경매 남은 시간은 본 화면에서 발생되는 메시지 창에 따라 다소 지연될 수 있습니다. 경매 남은 시간을
							최신으로 갱신하려면 다시 조회해 주세요.
						</div>
						<div style={{ marginTop: '6px' }}>
							· 처음 경매 참여하신 고객은 왼쪽 메뉴 경매 관리 {'>'} 고객 목적지 등록 화면에서 배송 목적지를 반드시
							등록한 후 응찰에 참여해 주시길 부탁드립니다.
						</div>
					</div>
				</div>

				<div>
					수정
					<img style={{ marginLeft: '10px' }} src="/img/setting.png" />
				</div>
			</FilterHeaderAlert>
			{exFilterToggle && (
				<>
					<FilterSubcontianer>
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
					</FilterSubcontianer>
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
						<WhiteGrnBtn>
							<div>
								<img src="/img/grnstar.png" />
							</div>
							관심상품 등록
						</WhiteGrnBtn>
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
						<p>일괄 경매 응찰</p>
						<CustomInput placeholder="응찰가 입력" width={120} height={32} onChange={biddingHandler} />
						<TGreyBtn height={30} style={{ width: '50px' }} onClick={handleSetBiddingPrice}>
							적용
						</TGreyBtn>
						<BtnBound style={{ margin: '0px' }} />
						<SkyBtn style={{ width: '200px', fontSize: '20px' }} height={50} onClick={confirmOnClickHandler}>
							응찰
						</SkyBtn>
					</div>
				</TCSubContainer>
				<Table getCol={getCol} getRow={getRow} tablePagination={tablePagination} onPageChange={onPageChange} />
			</TableContianer>
			{destinationPopUp && (
				<InventoryFind title={'목적지 찾기'} setSwitch={setDestinationPopUp} data={inventoryDestination} />
			)}
		</FilterContianer>
	)
}

export default Bidding
