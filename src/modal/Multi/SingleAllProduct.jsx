import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { BlackBtn, GreyBtn, YellBtn } from '../../common/Button/Button'
import { MainSelect } from '../../common/Option/Main'
import { storageOptions } from '../../common/Option/SignUp'
import Excel from '../../components/TableInner/Excel'
import {
	SingleProductModalAtom,
	SingleProductSpecAtom,
	toggleAtom,
	selectedRowsAtom,
	singleAllProductModal,
} from '../../store/Layout/Layout'
import StandardFind from '../../modal/Multi/StandardFind'
import { CheckBox } from '../../common/Check/Checkbox'
import { CheckImg2, StyledCheckSubSquDiv } from '../../common/Check/CheckImg'
import PageDropdown from '../../components/TableInner/PageDropdown'
import { useAtom, useAtomValue } from 'jotai'
import {
	DoubleWrap,
	ExCheckDiv,
	ExCheckWrap,
	ExInputsWrap,
	ExRadioWrap,
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
	PartWrap,
	PWRight,
	ResetImg,
	RowWrap,
	SubTitle,
	TableContianer,
	TCSubContainer,
	Tilde,
} from '../../modal/External/ExternalFilter'
import { Filtering } from '../../utils/filtering'
import useReactQuery from '../../hooks/useReactQuery'
import Hidden from '../../components/TableInner/Hidden'
import { getSingleProducts } from '../../api/SellProduct'
import { SingleDispatchFieldsCols, singleDispatchFields } from '../../constants/admin/Single'
import { add_element_field } from '../../lib/tableHelpers'
import Table from '../../pages/Table/Table'
import { getStorageList, getSPartList } from '../../api/search'
import { QueryClient } from '@tanstack/react-query'
import { supplierOptions, ProductOptions } from '../../common/Option/storage'
import { KilogramSum } from '../../utils/KilogramSum'
import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../common/Check/RadioImg'
import { BlueBarHeader, BlueInput, BlueSubDiv } from '../Common/Common.Styled'
import { WhiteCloseBtn } from '../Common/Common.Styled'
import HeaderToggle from '../../components/Toggle/HeaderToggle'
import { CRWMainBottom } from '../../pages/Operate/Common/Datasheet/DatasheetEdit'
import { CRWSub } from '../../pages/Operate/Common/Datasheet/DatasheetEdit'
import { BtnWrap } from '../../common/Button/Button'
import { WhiteBtn } from '../../common/Button/Button'
import { OverAllMain, OverAllTable } from '../../common/Overall/Overall.styled'
import useTablePaginationPageChange from '../../hooks/useTablePaginationPageChange'

const SingleAllProduct = ({ setSelectPr, selectPr }) => {
	const DEFAULT_OBJ = { value: '', label: '전체' }
	const checkSales = ['전체', '판매재', '판매제외제', '판매 완료제']
	const checkShips = ['전체', '경매대상재', '상시판매 대상재']
	const checkTypes = ['전체', '특가', '일반']

	//checkSales
	const [check1, setCheck1] = useState(Array.from({ length: checkSales.length }, () => false))
	const [check2, setCheck2] = useState(Array.from({ length: checkShips.length }, () => false))
	const [check3, setCheck3] = useState(Array.from({ length: checkTypes.length }, () => false))

	//checkShips
	const [checkData1, setCheckData1] = useState(Array.from({ length: checkSales.length }, () => ''))
	const [checkData2, setCheckData2] = useState(Array.from({ length: checkShips.length }, () => ''))
	const [checkData3, setCheckData3] = useState(Array.from({ length: checkTypes.length }, () => ''))

	const [getRow, setGetRow] = useState('')

	const tableField = useRef(SingleDispatchFieldsCols)
	const getCol = tableField.current
	const { data: storageList } = useReactQuery('', 'getStorageList', getStorageList)
	const { data: spartList } = useReactQuery('', 'getSPartList', getSPartList)
	const [spec, setSpec] = useAtom(SingleProductSpecAtom)
	const [isModal, setIsModal] = useAtom(singleAllProductModal)
	const checkBoxSelect = useAtomValue(selectedRowsAtom)
	const [select, setSelect] = useState({
		storage: '',
		sPart: '',
		maker: '',
		stocks: '',
		supply: '',
		grade: '',
		preferThick: '',
	})

	const [Quantity, setQuantity] = useState({
		startSpecification: '',
		endSpecification: '',
	})
	const [filterData, setFilteredData] = useState([])
	const [productNoNumber, setProductNoNumber] = useState('')
	const [productNumber, setProductNumber] = useState('')
	const [pagiNation, setPagination] = useState({})
	const [search, setSearch] = useState({
		productNumber: [],
	})
	const [storages, setStorages] = useState([])
	const [sparts, setSparts] = useState([])
	const selectedRef = useRef(null)
	const queryClient = new QueryClient()
	const [requestParameter, setRequestParameter] = useState({
		pageNum: 1,
		pageSize: 50,
		type: '일반',
		category: '전체',
	})
	//✅ request, Data패칭
	const [request, setRequest] = useState({
		pageNum: 1,
		pageSize: 50,
		type: '일반',
		category: '전체',
		storage: { label: '전체', value: '' }, // 창고
		spart: { label: '제품군', value: '' }, // 제품군
		stockStatus: ProductOptions.stocks[0], //제품 상태
		supplier: { label: '전체', value: '' }, // 매입처
		preferThickNess: ProductOptions.preferThick[0], // 정척여부
		grade: ProductOptions.grade[0], //제품 등급
		maker: ProductOptions.stocks[0], // 제조사

		spec: spec, //규격약호
		minFailCount: 0, // 최소 유찰 횟수
		maxFailCount: 0, // 최대 유찰 횟수

		saleCategoryList: [], // 판매 구분
		saleType: '', // 판매 유형
		salePriceType: '', //판매가 유형

		productNumberList: [],
	})
	const { data, isSuccess, refetch } = useReactQuery(requestParameter, 'product-list', getSingleProducts)
	const singleList = data?.r
	const singleProductPage = data?.pagination

	useEffect(() => {
		// true에 해당되면, value를, false면 빈값을 반환
		const updatedCheck = checkSales.map((value, index) => {
			return check1[index] ? value : ''
		})
		// 빈값을 제외한 진짜배기 값이 filteredCheck에 담긴다.
		const filteredCheck = updatedCheck.filter((item) => item !== '')
		setCheckData1(filteredCheck)
	}, [check1])

	useEffect(() => {
		// true에 해당되면, value를, false면 빈값을 반환
		const updatedCheck = checkShips.map((value, index) => {
			return check2[index] ? value : ''
		})
		// 빈값을 제외한 진짜배기 값이 filteredCheck에 담긴다.
		const filteredCheck = updatedCheck.filter((item) => item !== '')
		setCheckData2(filteredCheck)
	}, [check2])

	useEffect(() => {
		// true에 해당되면, value를, false면 빈값을 반환
		const updatedCheck = checkTypes.map((value, index) => {
			return check3[index] ? value : ''
		})
		// 빈값을 제외한 진짜배기 값이 filteredCheck에 담긴다.
		const filteredCheck = updatedCheck.filter((item) => item !== '')
		setCheckData3(filteredCheck)
	}, [check3])

	const handleSelectChange = (name, value) => {
		setSelect((prevState) => ({
			...prevState,
			[name]: value.value,
		}))
	}
	const [isRotated, setIsRotated] = useState(false)

	// Function to handle image click and toggle rotation

	// 테이블 연결하기
	useEffect(() => {
		if (!isSuccess && !singleList) return
		if (Array.isArray(singleList)) {
			setGetRow(add_element_field(singleList, singleDispatchFields))
			setPagination(singleProductPage)
		}
		//타입, 리액트쿼리, 데이터 확인 후 실행
	}, [isSuccess, singleList])

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

	useEffect(() => {
		if (storageList) return setStorages(storageList)
	}, [storageList])

	useEffect(() => {
		if (spartList) return setSparts(spartList)
	}, [spartList])

	const handleNumberChange = (e) => {
		const { name, value } = e.currentTarget
		setQuantity((p) => ({ ...p, [name]: value }))
	}

	const handleImageClick = () => {
		setProductNoNumber('')
		setProductNumber('')
		setSpec('')
		setSelect(() => ({
			storage: null,
			sPart: null,
			maker: null,
			stocks: null,
			supply: null,
			grade: null,
			preferThick: null,
		}))
		setQuantity({})
		setCheck1([])
		setCheck2([])
		setCheck3([])
		setCheckData1([])
		setCheckData2([])
		setCheckData3([])
		setIsRotated((prevIsRotated) => !prevIsRotated)

		if (
			!spec ||
			!productNoNumber ||
			!productNumber ||
			!select ||
			!Quantity ||
			!checkData1 ||
			!checkData2 ||
			!checkData3
		) {
			setFilteredData(singleList)
			setPagination(singleProductPage)
		}
	}

	const handleSearch = () => {
		const request = {
			pageNum: 1,
			pageSize: 10,
			type: '일반',
			category: '전체',
			proNo: productNoNumber, //프로넘
			storage: select.storage, // 창고
			spart: select.sPart, // 제품군
			stockStatus: select.stocks, //제품 상태
			supplier: select.supply, // 매입처
			preferThickNess: select.preferThick, // 정척여부
			grade: select.grade, //제품 등급
			maker: select.maker, // 제조사

			spec: spec, //규격약호
			minFailCount: Quantity.startSpecification, // 최소 유찰 횟수
			maxFailCount: Quantity.endSpecification, // 최대 유찰 횟수

			saleCategoryList: checkData1, // 판매 구분
			saleType: checkData2, // 판매 유형
			salePriceType: checkData3, //판매가 유형

			productNumberList: search.productNumber,
		}

		queryClient.prefetchQuery(['product', Filtering(request)], async () => {
			const res = await getSingleProducts(Filtering(request))
			// console.log('RES :', res.data)
			// setFilteredData(res.data?.list)
			setPagination(res.data?.pagination)
			return res.data?.list
		})
	}
	const modalClose = () => {
		setIsModal(false)
	} // 뒤에 배경 안움직이게
	useEffect(() => {
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [])
	const onPageChange = (value) => {
		setRequestParameter((p) => ({ ...p, pageNum: Number(value) }))
	}
	const handleSelectProduct = () => {
		setSelectPr(() =>
			checkBoxSelect.map((item) => {
				return {
					...item,
					'패키지 번호': '',
					'제품 고유 번호': item['고유 번호'],
					'제품 창고': item['창고'],
					'제품 매입처': item['매입처'],
					'제품 제조사': item['제조사'],
					'제품 경매 번호': item['경매 번호'],
					'제품 판매 유형': item['판매 유형'],
					'제품 판매 구분': item['판매 구분'],
					'제품 판매가 유형': item['판매가 유형'],
					제품군: item['제품군명'],
					'제품 중량': item['중량'],
					공급가: item['운반비 공급가'],
					부가세: item['운반비 부가세'],
					'경매 시작가': item['경매 시장 단가'],
					'최종 수정자': item['최종 수정자'],
				}
			}),
		)
		modalClose()
	}
	// console.log(checkBoxSelect)
	return (
		<OutSide>
			<Container>
				<BlueBarHeader>
					<div>패키지 제품 추가</div>
					<div>
						<WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
					</div>
				</BlueBarHeader>
				<OverTable>
					<FilterContianer>
						<FilterHeader>
							<div style={{ display: 'flex' }}></div>
							<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
						</FilterHeader>
						{exFilterToggle && (
							<>
								<FilterTopContainer>
									<FilterTCTop>
										<h6>패키지 번호</h6>
										<p>PK0000000</p>
									</FilterTCTop>
								</FilterTopContainer>
								<FilterSubcontianer>
									<FilterLeft>
										<RowWrap none>
											<PartWrap first>
												<h6>창고구분</h6>
												<PWRight>
													<MainSelect
														ref={selectedRef}
														options={[DEFAULT_OBJ, ...storages]}
														defaultValue={[DEFAULT_OBJ, ...storages][0]}
														name="storage"
														// value={select.storage}
														onChange={(e) => {
															setSelect((p) => ({
																...p,
																storage: e.label,
															}))
														}}
													/>
												</PWRight>
											</PartWrap>
											<PartWrap>
												<h6>매입처</h6>
												<PWRight>
													<MainSelect
														options={supplierOptions}
														defaultValue={{ value: '', label: '전체' }}
														name="supply"
														onChange={(e) => {
															setSelect((p) => ({
																...p,
																supply: e.label,
															}))
														}}
													/>
												</PWRight>
											</PartWrap>
											<PartWrap first>
												<h6>유찰 횟수</h6>
												<ExInputsWrap>
													<Input
														value={Quantity?.startSpecification || ''}
														onChange={handleNumberChange}
														name="startSpecification"
													/>{' '}
													<Tilde>~</Tilde>
													<Input
														value={Quantity?.endSpecification || ''}
														onChange={handleNumberChange}
														name="endSpecification"
													/>
												</ExInputsWrap>
											</PartWrap>
										</RowWrap>

										<RowWrap>
											<PartWrap first>
												<h6>창고구분</h6>
												<PWRight>
													<MainSelect
														options={[DEFAULT_OBJ, ...sparts]}
														defaultValue={{ value: '', label: '전체' }}
														name="sPart"
														onChange={(e) => {
															setSelect((p) => ({
																...p,
																sPart: e.value,
															}))
														}}
													/>
													{Object.entries(ProductOptions).map(([k, v], idx) => {
														return (
															<MainSelect
																options={v}
																defaultValue={v[0]}
																name={k}
																onChange={(e) => {
																	handleSelectChange(k, e, idx)
																}}
															/>
														)
													})}
												</PWRight>
											</PartWrap>
										</RowWrap>
										<RowWrap>
											<PartWrap first>
												<h6>판매 구분</h6>
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
											<PartWrap>
												<h6>판매 유형</h6>
												<ExRadioWrap>
													{checkShips.map((x, index) => (
														<RadioMainDiv>
															<RadioCircleDiv
																onClick={() => setCheck2(CheckBox(check2, check2.length, index))}
																isChecked={check2[index]}
															>
																<RadioInnerCircleDiv isChecked={check2[index]} />
															</RadioCircleDiv>
															<div style={{ display: 'flex', marginLeft: '5px' }}>{x}</div>
														</RadioMainDiv>
													))}
												</ExRadioWrap>
											</PartWrap>
										</RowWrap>

										<RowWrap>
											<PartWrap first>
												<h6>판매가 유형</h6>
												<ExRadioWrap>
													{checkTypes.map((x, index) => (
														<RadioMainDiv key={index}>
															<RadioCircleDiv
																onClick={() => setCheck3(CheckBox(check3, check3.length, index))}
																isChecked={check3[index]}
															>
																<RadioInnerCircleDiv isChecked={check3[index]} />
															</RadioCircleDiv>
															<div style={{ display: 'flex', marginLeft: '5px' }}>{x}</div>
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
										<BlackBtn width={100} height={40} onClick={handleSearch}>
											검색
										</BlackBtn>
									</div>
								</FilterFooter>
							</>
						)}
						<TableContianer>
							<TCSubContainer bor>
								<div>
									조회 목록 (선택 <span>{checkBoxSelect?.length > 0 ? checkBoxSelect?.length : '0'}</span> /{' '}
									{pagiNation ? pagiNation.listCount : singleProductPage?.listCount}개 )
									<Hidden />
								</div>
								<div style={{ display: 'flex', gap: '10px' }}>
									<PageDropdown
										handleDropdown={(e) =>
											setRequestParameter((prev) => ({ ...prev, pageNum: 1, pageSize: parseInt(e.target.value) }))
										}
									/>
									<Excel />
								</div>
							</TCSubContainer>
							<TCSubContainer bor>
								<div style={{ margin: '4px' }}>
									선택 중량<span> {KilogramSum(checkBoxSelect)} </span>kg / 총{singleProductPage?.totalWeight} 중량 kg
								</div>
							</TCSubContainer>
							<Table
								getRow={getRow}
								getCol={getCol}
								tablePagination={pagiNation}
								isRowClickable={true}
								onPageChange={onPageChange}
							/>
						</TableContianer>
						<CRWMainBottom>
							<CRWSub>
								<BtnWrap>
									<BlackBtn width={60} height={50} onClick={handleSelectProduct}>
										등록
									</BlackBtn>
								</BtnWrap>
							</CRWSub>
						</CRWMainBottom>
					</FilterContianer>
				</OverTable>
			</Container>
		</OutSide>
	)
}

export default SingleAllProduct

export const Container = styled.div`
	min-width: 75%;
	max-height: 800px;
	position: absolute;
	top: 50%;
	left: 55%;
	/* overflow: scroll; */
	transform: translate(-50%, -50%);
`

export const OutSide = styled.div`
	background-color: rgba(0, 0, 0, 0.4);
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 10;
	overflow-y: scroll;
`
export const OverTable = styled.div`
	width: 100%;
	background-color: #fff;
	padding: 12px 60px;
`
