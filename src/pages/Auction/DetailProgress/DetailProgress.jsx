import { useEffect, useRef, useState } from 'react'
import { storageOptions } from '../../../common/Option/SignUp'
import Excel from '../../../components/TableInner/Excel'

import { BlackBtn, GreyBtn } from '../../../common/Button/Button'
import { MainSelect } from '../../../common/Option/Main'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'

import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'

import {
	DoubleWrap,
	FilterContianer,
	FilterFooter,
	FilterHeader,
	FilterLeft,
	FilterRight,
	FilterSubcontianer,
	Input,
	MiniInput,
	PWRight,
	PartWrap,
	ResetImg,
	RowWrap,
	TCSubContainer,
	TableContianer,
	Tilde,
} from '../../../modal/External/ExternalFilter'
import Table from '../../Table/Table'
import { useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { AuctionDetailProgressFields, AuctionDetailProgressFieldsCols } from '../../../constants/admin/Auction'
import useReactQuery from '../../../hooks/useReactQuery'
import { getDetailProgress } from '../../../api/auction/detailprogress'
import { add_element_field } from '../../../lib/tableHelpers'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import ProgressSearchFields from '../Progress/ProgressSearchFields'
import { isEqual } from 'lodash'

const DetailProgress = ({}) => {
	const radioDummy = ['전체', '미진행', '진행중', '종료']
	const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))

	const [savedRadioValue, setSavedRadioValue] = useState('')
	useEffect(() => {
		const checkedIndex = checkRadio.findIndex((isChecked, index) => isChecked && index < radioDummy.length)

		// 찾지 못하면 -1을 반환하므로, -1이 아닌 경우(찾은 경우)
		// if (checkedIndex !== -1) {
		//   const selectedValue = radioDummy[checkedIndex];
		//   setSavedRadioValue(selectedValue); //내 state에 반환
		//   setInput({ ...input, type: selectedValue }); //서버 전송용 input에 반환
		// }
	}, [checkRadio])

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

	const [tablePagination, setTablePagination] = useState([])

	const [getRow, setGetRow] = useState('')
	const tableField = useRef(AuctionDetailProgressFieldsCols)
	const getCol = tableField.current
	const queryClient = useQueryClient()
	const checkedArray = useAtom(selectedRowsAtom)[0]

	const paramData = {
		pageNum: 1,
		pageSize: 50,
	}
	const [param, setParam] = useState(paramData)

	// GET
	const { isLoading, isError, data, isSuccess, refetch } = useReactQuery(param, 'getDetailProgress', getDetailProgress)
	const resData = data?.data?.data?.list
	const resPagination = data?.data?.data?.pagination

	console.log('resData', resData)

	useEffect(() => {
		let getData = resData
		//타입, 리액트쿼리, 데이터 확인 후 실행
		if (!isSuccess && !resData) return
		if (Array.isArray(getData)) {
			setGetRow(add_element_field(getData, AuctionDetailProgressFields))
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
				<h1>경매 진행 상세 조회</h1>
				{/* 토글 쓰기 */}
				<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
			</FilterHeader>

			{exFilterToggle && (
				<>
					{/* <FilterSubcontianer>
						<FilterLeft>
							<RowWrap none>
								<PartWrap first>
									<h6>창고 구분</h6>
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
							<RowWrap>
								<PartWrap>
									<h6>고객사 명/고객사코드</h6>
									<Input />
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
						renderCustomSearchFields={(props) => <ProgressSearchFields {...props} />}
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
						<PageDropdown handleDropdown={handleTablePageSize} />
						<Excel getRow={getRow} />
					</div>
				</TCSubContainer>
				<Table getCol={getCol} getRow={getRow} tablePagination={tablePagination} onPageChange={onPageChange} />
			</TableContianer>
		</FilterContianer>
	)
}

export default DetailProgress
