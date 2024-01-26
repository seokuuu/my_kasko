import { useCallback, useEffect, useRef, useState } from 'react'
import { BlackBtn, GreyBtn, TGreyBtn } from '../../../common/Button/Button'
import { MainSelect } from '../../../common/Option/Main'
import { storageOptions } from '../../../common/Option/SignUp'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'

import {
	CustomInput,
	DoubleWrap,
	ExInputsWrap,
	FilterContianer,
	FilterFooter,
	FilterHeader,
	FilterLeft,
	FilterRight,
	FilterSubcontianer,
	FilterTCTop,
	FilterTopContainer,
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

import { useAtom, useAtomValue } from 'jotai'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'

import { useQueryClient } from '@tanstack/react-query'
import { getExtraProductList } from '../../../api/auction/round'
import { AuctionRoundExtraProductFields, AuctionRoundExtraProductFieldsCols } from '../../../constants/admin/Auction'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import {
	BlueBarHeader,
	BlueSubContainer,
	FadeOverlay,
	ModalContainer,
	WhiteCloseBtn,
} from '../../../modal/Common/Common.Styled'
import Table from '../../Table/Table'
import { isArray, isEqual } from 'lodash'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import RoundAucListEditFields from './RoundAucListEditFields'
import useAlert from '../../../store/Alert/useAlert'

// 경매 제품 추가(단일) 메인 컴포넌트
// 경매 제품 추가 (패키지), 경매 목록 상세(종료된 경매)와 호환 가능
const RoundAucProAdd = ({
	setAddModal,
	setAddModalnewResData,
	setNewResData,
	types,
	newResData,
	propsResData,
	list,
	onListAdd,
}) => {
	const [tablePagination, setTablePagination] = useState([])
	const checkSales = ['전체', '확정 전송', '확정 전송 대기']
	const { simpleConfirm, simpleAlert } = useAlert()
	//checkSales
	const selectedRows = useAtomValue(selectedRowsAtom)
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

	const modalClose = () => {
		setAddModal(false)
	}

	const [getRow, setGetRow] = useState('')
	const tableField = useRef(AuctionRoundExtraProductFieldsCols)
	const getCol = tableField.current
	const queryClient = useQueryClient()
	const checkedArray = useAtom(selectedRowsAtom)[0]

	const [originalRow, setOriginalRow] = useState([]) //원본 row를 저장해서 radio check에러 막기

	const paramData = {
		pageNum: 1,
		pageSize: 50,
		saleType: '경매 대상재',
		registrationStatus: '경매 등록 대기',
		type: types,
	}
	const [param, setParam] = useState(paramData)

	const { isLoading, isError, data, isSuccess, refetch } = useReactQuery(
		param,
		'getExtraProductList',
		getExtraProductList,
	)

	const resData = data?.data?.data?.list
	const resPagination = data?.data?.data?.pagination
	console.log('resData', resData)

	useEffect(() => {
		// 이미 추가된 데이터 중복 제거
		const getData = resData?.filter((obj) => !list?.some((item) => obj.uid === item.uid))
		if (getData && Array.isArray(getData)) {
			setGetRow(add_element_field(getData, AuctionRoundExtraProductFields))
			setTablePagination(data?.pagination)
		}
	}, [resData])

	// const resetNewResData = () => {
	// 	setNewResData([])
	// }

	// const handleAddBtn = () => {
	// 	if (!isArray(checkedArray) || !checkedArray.length > 0) return simpleAlert('선택해주세요!')
	// 	else {
	// 		simpleConfirm('선택한 항목을 추가하시겠습니까?', () =>
	// 			checkedArray.forEach((item) => {
	// 				console.log('item =>', item)
	// 				setNewResData((prevData) => [...prevData, item])
	// 				setAddModal(false)
	// 			}),
	// 		)
	// 	}
	// }

	// 제품 추가
	const onAdd = () => {
		if (!selectedRows || selectedRows.length === 0) {
			return
		}
		const key = '고유 번호'
		const findKey = selectedRows.map((item) => item[key])
		console.log('findKey', findKey)
		const addData = resData?.filter((item) => findKey.includes(item.uid))

		onListAdd(addData)
		setAddModal(false)
	}

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
		<>
			<FadeOverlay />
			<ModalContainer style={{ width: '75%', height: '100%' }}>
				<BlueBarHeader style={{ height: '60px' }}>
					{/* <div>{title}</div> */}
					<div>경매 제품 추가({types})</div>
					<div>
						<WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
					</div>
				</BlueBarHeader>
				<BlueSubContainer style={{ padding: '0px 25px' }}>
					<FilterContianer>
						<FilterHeader>
							<div style={{ display: 'flex' }}></div>
							{/* 토글 쓰기 */}
							<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
						</FilterHeader>
						<FilterTopContainer>
							<FilterTCTop>
								<h6>경매 번호</h6>
								<p>2023041050</p>
							</FilterTCTop>
						</FilterTopContainer>
						{exFilterToggle && (
							<>
								{/* <FilterSubcontianer modal style={{ height: '100%' }}>
                  <FilterLeft>
                    <RowWrap modal>
                      <PartWrap first>
                        <h6>창고 구분</h6>
                        <PWRight>
                          <MainSelect options={storageOptions} defaultValue={storageOptions[0]} />
                        </PWRight>
                      </PartWrap>
                      <PartWrap>
                        <h6>매입처 </h6>
                        <PWRight>
                          <MainSelect options={storageOptions} defaultValue={storageOptions[0]} />
                        </PWRight>
                      </PartWrap>

                      <PartWrap modal>
                        <h6>규격 약호</h6>
                        <Input />
                        <GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17}>
                          찾기
                        </GreyBtn>
                      </PartWrap>
                    </RowWrap>
                    <RowWrap modal>
                      <PartWrap first>
                        <h6>구분</h6>
                        <MainSelect />
                        <MainSelect />
                        <MainSelect />
                        <MainSelect />
                        <MainSelect />
                      </PartWrap>
                    </RowWrap>
                    <RowWrap modal none>
                      <PartWrap first>
                        <h6>두께(MM)</h6>
                        <ExInputsWrap>
                          <MiniInput /> <Tilde>~</Tilde>
                          <MiniInput />
                        </ExInputsWrap>
                      </PartWrap>
                      <PartWrap>
                        <h6>폭(MM)</h6>
                        <ExInputsWrap>
                          <MiniInput /> <Tilde>~</Tilde>
                          <MiniInput />
                        </ExInputsWrap>
                      </PartWrap>
                      <PartWrap>
                        <h6>길이(MM)</h6>
                        <ExInputsWrap>
                          <MiniInput /> <Tilde>~</Tilde>
                          <MiniInput />
                        </ExInputsWrap>
                      </PartWrap>
                    </RowWrap>
                    <RowWrap modal none>
                      <PartWrap first>
                        <h6>유찰 횟수</h6>
                        <ExInputsWrap>
                          <Input /> <Tilde>~</Tilde>
                          <Input />
                        </ExInputsWrap>
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
                    <BlackBtn width={90} height={35}>
                      검색
                    </BlackBtn>
                  </div>
                </FilterFooter> */}
								<GlobalProductSearch
									param={param}
									isToggleSeparate={true}
									renderCustomSearchFields={(props) => <RoundAucListEditFields {...props} />} // 만들어야함 -> WinningSearchFields
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
							<TCSubContainer>
								<div>
									선택 중량<span> 2 </span>kg / 총 중량 kg
								</div>
								<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}></div>
							</TCSubContainer>
							<Table
								hei2={250}
								hei={100}
								getCol={AuctionRoundExtraProductFieldsCols}
								getRow={getRow}
								isLoading={isLoading}
								onPageChange={onPageChange}
							/>
							<TCSubContainer style={{ marginTop: '25px' }}>
								<div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
									<BlackBtn width={13} height={40} onClick={onAdd}>
										제품 추가
									</BlackBtn>
								</div>
							</TCSubContainer>
						</TableContianer>
					</FilterContianer>
				</BlueSubContainer>
			</ModalContainer>
		</>
	)
}

export default RoundAucProAdd
