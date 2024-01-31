/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react'
import Excel from '../../../components/TableInner/Excel'
// import { MainSelect } from '../../../common/Option/Main'
import { BlackBtn, BtnWrap, WhiteRedBtn } from '../../../common/Button/Button'
// import DateGrid from '../../../components/DateGrid/DateGrid'
// import { ToggleBtn, Circle, Wrapper } from '../../../common/Toggle/Toggle'
import { WhiteBlackBtn } from '../../../common/Button/Button'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import {
	packageModeAtom,
	packageUpdateObjAtom,
	selectedRowsAtom,
	selectedRowsAtom2,
	singleAllProductModal,
	toggleAtom,
} from '../../../store/Layout/Layout'

import { CheckBox } from '../../../common/Check/Checkbox'
// import { StyledCheckMainDiv, StyledCheckSubSquDiv, CheckImg2 } from '../../../common/Check/CheckImg'
import { WhiteBtn } from '../../../common/Button/Button'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import {
	ExRadioWrap,
	FilterContianer,
	FilterHeader,
	FilterTCBSub,
	FilterTCBottom,
	FilterTCTop,
	FilterTopContainer,
	Input,
	TCSubContainer,
	TableContianer,
} from '../../../modal/External/ExternalFilter'

import { RadioMainDiv, RadioCircleDiv, RadioInnerCircleDiv } from '../../../common/Check/RadioImg'
// import usePaiging from '../../../hooks/queries'
import { getPackageProductsList, postCreatePackage, postUpdatePackage } from '../../../api/SellProduct'
import { useLocation, useNavigate } from 'react-router-dom'

import { useMutation, useQuery } from '@tanstack/react-query'
import useReactQuery from '../../../hooks/useReactQuery'

import { useAtom, useAtomValue } from 'jotai'
import { packageProductsDispatchFields, packageProductsDispatchFieldsCols } from '../../../constants/admin/SellPackage'
import { add_element_field } from '../../../lib/tableHelpers'
import SingleAllProduct from '../../../modal/Multi/SingleAllProduct'
import { packageCreateObjAtom } from '../../../store/Layout/Layout'
import { CRWMainBottom, CRWSub } from '../../Operate/Common/Datasheet/DatasheetEdit'
import useTablePaginationPageChange from '../../../hooks/useTablePaginationPageChange'
import { onSizeChange } from '../../Operate/utils'
import Table from '../../Table/Table'

import useMutationQuery from '../../../hooks/useMutationQuery'
import useAlert from '../../../store/Alert/useAlert'
import { KilogramSum } from '../../../utils/KilogramSum'

const PackageCreate = () => {
	const radioDummy = ['경매', '상시']
	const prevData = useLocation().state?.data
	const navigate = useNavigate()
	const [packageObj, setPackageObj] = useAtom(packageCreateObjAtom)
	const [updateObj, setUpdateObj] = useAtom(packageUpdateObjAtom)
	const [packageName, setPackageName] = useState(prevData ? prevData['패키지 이름'] : packageObj?.packageName)
	const [price, setPrice] = useState(prevData ? prevData['패키지 경매&판매 시작가'] : packageObj?.price)

	const [isModal, setIsModal] = useAtom(singleAllProductModal)
	const [mode, setMode] = useAtom(packageModeAtom)
	const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))
	const [savedRadioValue, setSavedRadioValue] = useState('')
	const [select, setSelect] = useState([])
	const [selectUid, setSelectUid] = useState([])
	const [curUid, setCuruid] = useState([])
	const [check, setCheck] = useState([])
	const checkBoxSelect = useAtomValue(selectedRowsAtom)
	const checkBoxSelect2 = useAtomValue(selectedRowsAtom2)
	// 경매,상시 선택시 선택한 내용의 라디오가 선택되게끔 하는

	useEffect(() => {
		setUpdateObj(() => ({
			packageNumber: prevData && prevData['패키지 번호'],
			sellType:
				prevData === savedRadioValue
					? prevData['판매 유형'] === '상시판매 대상재'
						? '상시'
						: '경매'
					: savedRadioValue === '경매 대상재'
					? '경매'
					: '상시',
			packageName: packageName ? packageName : prevData['패키지 이름'],
		}))

		setPackageObj(() => ({
			packageNumber: '',
			sellType: savedRadioValue === '상시판매 대상재' ? '상시' : '경매',
			packageName: packageName,
		}))
	}, [prevData, savedRadioValue, packageName])
	useEffect(() => {
		setCheckRadio(
			Array.from({ length: radioDummy.length }, (_, index) => {
				if (prevData === undefined) {
					if (packageObj.sellType === '경매') return index === 0
					else {
						return index === 1
					}
				} else {
					if (prevData['판매 유형'] === '상시판매 대상재') {
						return index === 1
					} else {
						return index === 0
					}
				}
			}),
		)
	}, [prevData])

	useEffect(() => {
		const checkedIndex = checkRadio.findIndex((isChecked, index) => isChecked && index < radioDummy.length)
		const updateValue = radioDummy[checkedIndex]
		setSavedRadioValue(() => {
			if (updateValue === '경매') {
				return '경매 대상재'
			} else if (updateValue === '상시') {
				return '상시판매 대상재'
			}
		})
	}, [checkRadio])
	//checkSales

	console.log('SAVEDRADIO', savedRadioValue)
	const tableField = useRef(packageProductsDispatchFieldsCols)
	const getCol = tableField.current
	const [requestParams, setRequestParams] = useState(
		prevData && {
			pageNum: 1,
			pageSize: 50,
			packageNumber: prevData['패키지 번호'],
		},
	)

	const { data, isSuccess, isLoading } = useQuery(
		['packageProducts', requestParams],
		() => getPackageProductsList(requestParams),
		{
			enabled: !!requestParams?.packageNumber,
		},
	)

	// const { data, isSuccess } = useReactQuery(requestParams, 'packageProducts', getPackageProductsList)
	const packageData = data?.r
	const packagePage = data?.pagination

	const [getRow, setGetRow] = useState('')
	const [filteredData, setFilteredData] = useState([])

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
		if (isSuccess && prevData) {
			setFilteredData(packageData)
		}
	}, [isSuccess, requestParams, packageData])
	// 제품 추가하는 Uids
	useEffect(() => {
		setCuruid(filteredData.map((item) => item?.productUid))
	}, [isSuccess, filteredData])

	useEffect(() => {
		if (isSuccess && filteredData === undefined) {
			packageData && setFilteredData(packageData)
		}
		if (!isSuccess && !filteredData) return null
		if (Array.isArray(filteredData) && prevData) {
			setGetRow(add_element_field(filteredData, packageProductsDispatchFields))
		}
		//타입, 리액트쿼리, 데이터 확인 후 실행
	}, [isSuccess, filteredData, prevData])

	const handleAddProduct = () => {
		setIsModal(true)
	}
	const handleChangePackName = (e) => {
		const { value, name } = e.currentTarget
		if (name === 'packageName') {
			setPackageName(value)
		} else if (name === 'price') {
			setPrice(value)
		}
	}

	const { pagination, onPageChanage } = useTablePaginationPageChange(prevData ? data : select, setRequestParams)
	useEffect(() => {
		if (!select) return null

		setSelectUid(() => select.map((i) => i['고유 번호']))
	}, [select])

	const [createRequest, setCreateRequest] = useState({})
	const [updateRequest, setUpdateRequest] = useState({})

	// 기존 테이블에서 선택한 체크박스
	useEffect(() => {
		if (checkBoxSelect) return setCheck(() => [...checkBoxSelect.map((i) => i['제품 고유 번호'])])
	}, [checkBoxSelect])

	useEffect(() => {
		setCreateRequest({
			name: packageName,
			saleType: savedRadioValue,
			price: price,
			productUids: selectUid,
		})
	}, [packageName, savedRadioValue, price, selectUid])

	useEffect(() => {
		setUpdateRequest(
			prevData && {
				name: packageName,
				saleType: savedRadioValue,
				productUids: [...curUid, ...selectUid],
				price: price,
				uid: prevData['고유 번호'],
			},
		)
	}, [packageName, savedRadioValue, selectUid, price, curUid])
	const { simpleConfirm, showAlert, simpleAlert } = useAlert()
	const { mutate: create } = useMutationQuery(['query'], postCreatePackage)
	const { mutate: update } = useMutationQuery(['query'], postUpdatePackage)

	/** TODO 등록 / 수정은 되나 얼렛이 작동하지 않음 */
	const handleSubmit = () => {
		create(createRequest, {
			onSuccess: (d) => {
				simpleAlert('저장되었습니다.', () => {
					navigate('/product/package')
				})

				if (d?.data?.status === 400) {
					simpleAlert(price === undefined || price === '0' ? '판매가를 입력하세요' : `${d?.data?.message}`)
				}
				// console.log('성공')
			},
		})
	}

	/** TODO 등록 / 수정은 되나 얼렛이 작동하지 않음 */
	const handleUpdate = () => {
		simpleConfirm('수정하시겠습니까?', () => {
			update(updateRequest, {
				onSuccess: (d) => {
					if (d?.data?.status === 200) {
						simpleAlert('수정되었습니다', () => navigate('/product/package'))
					}
				},
				onError: (e) => {
					if (e.data?.status === 400)
						showAlert({
							title: `${e?.data?.message}`,
							content: '',
							func: () => {
								// navigate(-1)
								window.location.reload()
							},
						})
				},
			})
		})
	}
	const [sumArr, setSumArr] = useState([])
	useEffect(() => {
		if (getRow && select) {
			setSumArr([...getRow, ...select])
		}
	}, [getRow, select])

	const handleRemoveItem = () => {
		if (prevData) {
			if (select.length === 0) {
				const filteredArr = getRow.filter((li) => !check.includes(li['제품 고유 번호']))
				setGetRow(filteredArr)
				setUpdateRequest((p) => ({ ...p, productUids: filteredArr.map((i) => i['제품 고유 번호']) }))
			} else if (select.length > 0) {
				const filteredArr = sumArr.filter((li) => !check.includes(li['제품 고유 번호']))
				setSumArr(filteredArr)
				setUpdateRequest((p) => ({ ...p, productUids: filteredArr.map((i) => i['제품 고유 번호']) }))
			}
		} else {
			const filteredArr = select.filter((li) => !check.includes(li['제품 고유 번호']))
			setSelect(filteredArr)
		}
		return { sumArr, updateRequest }
	}
	const handleBackPage = () => {
		navigate(-1)
	}

	return (
		<FilterContianer>
			<FilterHeader>
				<h1>패키지 {prevData ? '수정' : '생성'}</h1>
				{/* 토글 쓰기 */}
				<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
			</FilterHeader>
			{exFilterToggle && (
				<>
					<FilterTopContainer>
						{prevData && (
							<FilterTCTop>
								<h6>패키지 번호</h6>
								<p>{prevData['패키지 번호']}</p>
							</FilterTCTop>
						)}
						<FilterTCBottom>
							<FilterTCBSub>
								<div>
									<h6>판매 유형</h6>
									<div style={{ marginTop: '2px' }}>
										<ExRadioWrap>
											{radioDummy.map((text, index) => (
												<RadioMainDiv key={index}>
													<RadioCircleDiv
														isWhite
														isChecked={checkRadio[index]}
														onClick={() => {
															setCheckRadio(CheckBox(checkRadio, checkRadio.length, index))
														}}
													>
														<RadioInnerCircleDiv isWhite isChecked={checkRadio[index]} />
													</RadioCircleDiv>
													<div style={{ display: 'flex', marginLeft: '5px' }}>{text}</div>
												</RadioMainDiv>
											))}
										</ExRadioWrap>
									</div>
								</div>
								<div>
									<h6>패키지 명 지정</h6>
									<div>
										<Input name={'packageName'} value={packageName} onChange={handleChangePackName} />
									</div>
								</div>
								<div>
									<h6>시작가/판매가</h6>
									<div>
										<Input name={'price'} value={price} onChange={handleChangePackName} />
									</div>
								</div>
							</FilterTCBSub>
						</FilterTCBottom>
					</FilterTopContainer>
				</>
			)}
			<TableContianer>
				<TCSubContainer bor>
					<div>
						{check?.length}
						조회 목록(선택 <span>{check?.length}</span> /
						{!prevData ? select.length : pagination ? pagination?.listCount : pagination?.listCount}개 )
						<Hidden />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={(e) => onSizeChange(e, setRequestParams)} />
						<Excel getRow={prevData ? sumArr : select} />
					</div>
				</TCSubContainer>
				<TCSubContainer bor>
					<div>
						선택 중량<span> {KilogramSum(checkBoxSelect)} </span>kg / 총{' '}
						{!prevData ? select.length : pagination ? pagination?.totalWeight : pagination?.totalWeight} 중량 kg
					</div>
					<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
						<WhiteRedBtn onClick={handleRemoveItem}>목록 제거</WhiteRedBtn>
						<WhiteBlackBtn onClick={handleAddProduct}>제품 추가</WhiteBlackBtn>
					</div>
				</TCSubContainer>
				<Table
					getCol={getCol}
					getRow={prevData ? (select.length > 0 ? sumArr : getRow) : select}
					tablePagination={pagination}
					onPageChange={onPageChanage}
					loading={isLoading}
				/>
				<div style={{ marginTop: '12px' }}>&nbsp;</div>
				<CRWMainBottom>
					<CRWSub>
						<BtnWrap>
							<WhiteBtn
								width={90}
								height={50}
								style={{ marginRight: '10px' }}
								onClick={() => {
									simpleConfirm(
										'현재 작업중인 내용이 저장 되지 않았습니다. \n 페이지를 나가시겠습니까?',
										handleBackPage,
									)
								}}
							>
								돌아가기
							</WhiteBtn>
							{!prevData ? (
								<BlackBtn
									width={90}
									height={50}
									onClick={() => {
										simpleConfirm('저장하시겠습니까?', () => {
											handleSubmit()
										})
									}}
								>
									등록
								</BlackBtn>
							) : (
								<BlackBtn width={90} height={50} onClick={handleUpdate}>
									수정
								</BlackBtn>
							)}
						</BtnWrap>
					</CRWSub>
				</CRWMainBottom>
			</TableContianer>
			{isModal && <SingleAllProduct selectPr={select} setSelectPr={setSelect} isUpdate={prevData ? true : false} />}
		</FilterContianer>
	)
}

export default PackageCreate
