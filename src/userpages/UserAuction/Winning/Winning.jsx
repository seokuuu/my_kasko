import { useEffect, useRef, useState } from 'react'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'

import { FilterContianer, FilterHeader, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'

import { useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { isEqual } from 'lodash'
import { getWinning } from '../../../api/auction/winning'
import { CAUTION_CATEGORY, CautionBox } from '../../../components/CautionBox'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { AuctionWinningFields, UserAuctionWinningFieldsCols } from '../../../constants/admin/Auction'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import Table from '../../../pages/Table/Table'
import UserWinningSearchFields from './UserWinningSearchFields'

const Winning = ({}) => {
	const [tablePagination, setTablePagination] = useState([])
	const checkSales = ['전체', '확정 전송', '확정 전송 대기']
	const radioDummy = ['전체', '낙찰', '낙찰 취소', '낙찰 확정']

	//checkSales
	const [check1, setCheck1] = useState(Array.from({ length: checkSales.length }, () => false))

	const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))

	//checkShips
	const [checkData1, setCheckData1] = useState(Array.from({ length: checkSales.length }, () => ''))

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

	const paramData = {
		pageNum: 1,
		pageSize: 50,
		orderType: '경매',
	}
	const [param, setParam] = useState(paramData)

	const [getRow, setGetRow] = useState('')
	const tableField = useRef(UserAuctionWinningFieldsCols)
	const getCol = tableField.current

	const queryClient = useQueryClient()
	const checkedArray = useAtom(selectedRowsAtom)[0]

	// GET
	const { isLoading, isError, data, isSuccess, refetch } = useReactQuery(param, 'getDetailProgress', getWinning)
	const resData = data?.data?.data?.list
	const resPagination = data?.data?.data?.pagination
	console.log('resData', resData)

	useEffect(() => {
		let getData = resData
		//타입, 리액트쿼리, 데이터 확인 후 실행
		if (!isSuccess && !resData) return
		if (Array.isArray(getData)) {
			setGetRow(add_element_field(getData, AuctionWinningFields))
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
					<h1>낙찰 확인</h1>
				</div>
				{/* 토글 쓰기 */}
				<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
			</FilterHeader>
			{/* 주의사항 */}
			<CautionBox category={CAUTION_CATEGORY.bid} />
			{exFilterToggle && (
				<>
					{/* <FilterSubcontianer>
						<FilterLeft>
							<RowWrap>
								<PartWrap first>
									<h6 style={{ width: '130px' }}>경매 일자</h6>
									<GridWrap>
										<DateGrid bgColor={'white'} fontSize={17} />
										<Tilde>~</Tilde>
										<DateGrid bgColor={'white'} fontSize={17} />
									</GridWrap>
								</PartWrap>
								<PartWrap>
									<h6 style={{ width: '100px' }}>창고 구분</h6>
									<MainSelect />
								</PartWrap>
							</RowWrap>
							<RowWrap none>
								<PartWrap>
									<h6 style={{ width: '180px' }}>고객사 명/고객사코드</h6>
									<Input />
									<Input />
									<GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17}>
										찾기
									</GreyBtn>
								</PartWrap>
								<PartWrap>
									<h6>진행 상태</h6>
									<ExRadioWrap>
										{radioDummy.map((text, index) => (
											<RadioMainDiv key={index}>
												<RadioCircleDiv
													isChecked={checkRadio[index]}
													onClick={() => {
														setCheckRadio(CheckBox(checkRadio, checkRadio.length, index))
													}}
												>
													<RadioInnerCircleDiv isChecked={checkRadio[index]} />
												</RadioCircleDiv>
												<div style={{ display: 'flex', marginLeft: '5px' }}>{text}</div>
											</RadioMainDiv>
										))}
									</ExRadioWrap>
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
						renderCustomSearchFields={(props) => <UserWinningSearchFields {...props} />}
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
					<div style={{ display: 'flex', gap: '10px' }}></div>
				</TCSubContainer>
				<Table
					getCol={getCol}
					getRow={getRow}
					tablePagination={tablePagination}
					onPageChange={onPageChange}
					setChoiceComponent={() => {}}
				/>
				{/* <TCSubContainer>
					<div></div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<SkyBtn>입금확인</SkyBtn>
					</div>
				</TCSubContainer> */}
			</TableContianer>
		</FilterContianer>
	)
}

export default Winning
