/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Excel from '../../../components/TableInner/Excel'
import { BlackBtn, BtnWrap, WhiteBlackBtn, WhiteBtn, WhiteRedBtn } from '../../../common/Button/Button'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import {
	packageCreateObjAtom,
	packageUpdateObjAtom,
	selectedRowsAtom,
	singleAllProductModal,
	toggleAtom,
} from '../../../store/Layout/Layout'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import {
	ExRadioWrap,
	FilterContianer,
	FilterHeader,
	FilterTCBottom,
	FilterTCBSub,
	FilterTCTop,
	FilterTopContainer,
	Input,
	TableContianer,
	TCSubContainer,
} from '../../../modal/External/ExternalFilter'
import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../../common/Check/RadioImg'
import { getPackageProductsList, postCreatePackage, postUpdatePackage } from '../../../api/SellProduct'
import { useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { packageProductsDispatchFields, packageProductsDispatchFieldsCols } from '../../../constants/admin/SellPackage'
import { add_element_field } from '../../../lib/tableHelpers'
import SingleAllProduct from '../../../modal/Multi/SingleAllProduct'
import { CRWMainBottom, CRWSub } from '../../Operate/Common/Datasheet/DatasheetEdit'
import useTablePaginationPageChange from '../../../hooks/useTablePaginationPageChange'
import { onSizeChange } from '../../Operate/utils'
import Table from '../../Table/Table'
import useMutationQuery from '../../../hooks/useMutationQuery'
import useAlert from '../../../store/Alert/useAlert'
import { KilogramSum } from '../../../utils/KilogramSum'
import TableV2HiddenSection from '../../Table/TableV2HiddenSection'
import { formatWeight, numberDeleteComma } from '../../../utils/utils'

const PackageCreate = () => {
	const navigate = useNavigate()
	const radioDummy = ['경매', '상시']
	const prevData = useLocation().state?.data

	const [isModal, setIsModal] = useAtom(singleAllProductModal)
	const [packageObj, setPackageObj] = useAtom(packageCreateObjAtom)
	const [checkBoxSelect, setCheckBoxSelect] = useAtom(selectedRowsAtom)
	const checkWeight = checkBoxSelect?.map((x) => parseInt(numberDeleteComma(x['제품 중량'])))
	const checkWeightSum = checkWeight?.reduce((total, current) => total + current, 0)?.toLocaleString()

	const setUpdateObj = useSetAtom(packageUpdateObjAtom)

	const [packageName, setPackageName] = useState(prevData ? prevData['패키지 이름'] : packageObj?.packageName)
	const [price, setPrice] = useState(prevData ? prevData['시작가/판매가'] : packageObj?.price)

	const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))
	const [savedRadioValue, setSavedRadioValue] = useState('')
	const [select, setSelect] = useState([])
	const [selectUid, setSelectUid] = useState([])
	const [curUid, setCuruid] = useState([])
	const [check, setCheck] = useState([])
	const [sumArr, setSumArr] = useState([])
	const [getRow, setGetRow] = useState('')

	const [filteredData, setFilteredData] = useState([])
	const [createRequest, setCreateRequest] = useState({})
	const [updateRequest, setUpdateRequest] = useState({})
	const [requestParams, setRequestParams] = useState(
		prevData && {
			pageNum: 1,
			pageSize: 10000,
			packageNumber: prevData ? prevData['패키지 번호'] : '',
		},
	)

	const { data, isSuccess, isLoading } = useQuery(
		['packageProducts', requestParams],
		() => getPackageProductsList(requestParams),
		{
			enabled: !!requestParams?.packageNumber,
		},
	)

	const packageData = data?.r

	const handleAddProduct = () => {
		setIsModal(true)
	}
	const handleChangePackName = (e) => {
		const { value, name } = e.currentTarget
		if (name === 'packageName') {
			setPackageName(value)
		} else if (name === 'price') {
			const intValue = parseInt(value.replace(/,/g, ''), 10)
			setPrice(intValue)
		}
	}

	const { pagination, onPageChanage } = useTablePaginationPageChange(prevData ? data : select, setRequestParams)

	const { simpleConfirm, showAlert, simpleAlert } = useAlert()
	const { mutate: create, isLoading: createLoading } = useMutationQuery(['query'], postCreatePackage)
	const { mutate: update, isLoading: updateLoading } = useMutationQuery(['query'], postUpdatePackage)

	useLocation(createLoading || updateLoading)

	const handleSubmit = () => {
		if (!createRequest.name) {
			simpleAlert('패키지 명을 입력해주세요.')
			return
		}
		if (!createRequest.price) {
			simpleAlert('시작가/판매가를 입력해주세요.')
			return
		}
		if (createRequest.productUids.length === 0) {
			simpleAlert('등록할 제품을 추가해주세요.')
			return
		}
		simpleConfirm('저장하시겠습니까?', () => {
			create(createRequest, {
				onSuccess: (d) => {
					simpleAlert('저장되었습니다.', () => {
						navigate('/product/package')
					})

					if (d?.data?.status === 400) {
						simpleAlert(price === undefined || price === '0' ? '판매가를 입력하세요' : `${d?.data?.message}`)
					}
				},
				onError: (error) => {
					return simpleAlert(error?.data?.message || '요청중 오류가 발생했습니다.\n다시 시도해 주세요.')
				},
			})
		})
	}

	const handleUpdate = () => {
		if (!updateRequest.name) {
			simpleAlert('패키지 명을 입력해주세요.')
			return
		}
		if (!updateRequest.price) {
			simpleAlert('시작가/판매가를 입력해주세요.')
			return
		}
		if (updateRequest.productUids.length === 0) {
			simpleAlert('등록할 제품을 추가해주세요.')
			return
		}

		updateRequest.price = numberDeleteComma(updateRequest.price)

		simpleConfirm('수정하시겠습니까?', () => {
			update(updateRequest, {
				onSuccess: () => {
					simpleAlert('수정되었습니다', () => {
						navigate('/product/package')
						window.location.reload()
					})
				},
				onError: (e) => {
					simpleAlert(`${e?.data?.message || '수정 실패하였습니다.'}`, () => {
						window.location.reload()
					})
				},
			})
		})
	}

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
		setCheckBoxSelect([])
		return { sumArr, updateRequest }
	}

	// 제품 추가
	useEffect(() => {
		if (getRow && select) {
			const filterData = [...getRow, ...select]
			const neoFilterData = filterData?.map((item) => ({
				...item,
				'총 중량': parseInt(item['총 중량']).toLocaleString(),
				'제품 중량': parseInt(item['제품 중량']).toLocaleString(),
			}))
			setSumArr(neoFilterData)
		}
	}, [getRow, select])

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
			const localeFilteredData = filteredData?.map((item) => ({
				...item,
				totalWeight: parseInt(item.totalWeight),
				weight: parseInt(item.weight),
			}))
			setGetRow(add_element_field(localeFilteredData, packageProductsDispatchFields))
		}
		//타입, 리액트쿼리, 데이터 확인 후 실행
	}, [isSuccess, filteredData, prevData])

	console.log('filteredData', filteredData)

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
			packageName: packageName ? packageName : prevData ? prevData['패키지 이름'] : '',
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

	useEffect(() => {
		if (!select) return null

		setSelectUid(() => select.map((i) => i['고유 번호']))
	}, [select])

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

	const handleBackPage = () => {
		navigate(-1)
	}

	const calculateTotal = (list, key) => {
		if (!list) return 0
		return formatWeight(list?.map((item) => Number(item[key])).reduce((acc, cur) => acc + cur, 0))
	}

	return (
		<FilterContianer>
			<FilterHeader>
				<h1>패키지 {prevData ? '수정' : '생성'}</h1>
				{/* 토글 쓰기 */}
				<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
			</FilterHeader>
			{exFilterToggle && (
				<FilterTopContainer>
					{prevData && (
						<FilterTCTop>
							<h6>패키지 번호</h6>
							<p>{prevData['패키지 번호'] ?? ''}</p>
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
													// onClick={() => {
													// 	setCheckRadio(CheckBox(checkRadio, checkRadio.length, index))
													// }}
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
									<Input name={'price'} value={price?.toLocaleString()} onChange={handleChangePackName} />
								</div>
							</div>
						</FilterTCBSub>
					</FilterTCBottom>
				</FilterTopContainer>
			)}
			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록(선택 <span>{check?.length}</span> /
						{!prevData ? select.length : pagination ? pagination?.listCount : pagination?.listCount}개 )
						<TableV2HiddenSection />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={(e) => onSizeChange(e, setRequestParams)} />
						<Excel getRow={prevData ? sumArr : select} />
					</div>
				</TCSubContainer>
				<TCSubContainer bor>
					<div>
						선택 중량<span> {checkWeightSum} </span>kg / 총 중량
						{!prevData
							? calculateTotal(select, '제품 중량')
							: pagination
							? pagination?.totalWeight?.toLocaleString()
							: pagination?.totalWeight?.toLocaleString()}{' '}
						kg
					</div>
					<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
						<WhiteRedBtn onClick={handleRemoveItem}>목록 제거</WhiteRedBtn>
						<WhiteBlackBtn onClick={handleAddProduct}>제품 추가</WhiteBlackBtn>
					</div>
				</TCSubContainer>
				<Table
					getCol={packageProductsDispatchFieldsCols}
					getRow={prevData ? (select.length > 0 ? sumArr : getRow) : select}
					// tablePagination={pagination}
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
								<BlackBtn width={90} height={50} onClick={handleSubmit}>
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
			{isModal && <SingleAllProduct selectPr={select} setSelectPr={setSelect} isUpdate={!!prevData} />}
		</FilterContianer>
	)
}

export default PackageCreate
