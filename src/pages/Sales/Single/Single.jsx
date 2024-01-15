import { useEffect, useState } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { BlackBtn, GreyBtn, WhiteBlackBtn } from '../../../common/Button/Button'
import { MainSelect, storageOptions } from '../../../common/Option/Main'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import {
	DoubleWrap,
	EditGear,
	ExInputsWrap,
	FilterContianer,
	FilterFooter,
	FilterHeader,
	FilterHeaderAlert,
	FilterLeft,
	FilterRight,
	FilterSubcontianer,
	FilterWrap,
	Input,
	MiniInput,
	PWRight,
	PartWrap,
	ResetImg,
	RowWrap,
	TCSubContainer,
	TableBottomWrap,
	TableContianer,
	Tilde,
} from '../../../modal/External/ExternalFilter'
import { blueModalAtom, selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import useReactQuery from '../../../hooks/useReactQuery'
import { getSingleProducts } from '../../../api/SellProduct'
import Table from '../../../pages/Table/Table'
import { responseToTableRowMap, singleProductListFieldCols } from '../../../constants/admin/singleProduct'
import { add_element_field } from '../../../lib/tableHelpers'
import { KilogramSum } from '../../../utils/KilogramSum'
import { formatWeight } from '../../../utils/utils'
import { InputSearch, StorageSelect } from '../../../components/Search'

const Single = ({}) => {
	const checkBoxSelect = useAtomValue(selectedRowsAtom)
	const [isRotated, setIsRotated] = useState(false)
	const [singleProductListData, setSingleProductListData] = useState(null)
	const [singleProductPagination, setSingleProductPagination] = useState([])
	const paramData = {
		pageNum: 1,
		pageSize: 50,
	}
	const [param, setParam] = useState(paramData)
	const {
		isLoading,
		isError,
		data: getSingleProductsRes,
		isSuccess,
	} = useReactQuery(param, 'getSingleProducts', getSingleProducts)

	// TODO: Check why the response object changed to pagination and r.
	useEffect(() => {
		console.log('getSingleProductsRes--', getSingleProductsRes)
		if (getSingleProductsRes) {
			setSingleProductListData(formatTableRowData(getSingleProductsRes.r))
			setSingleProductPagination(getSingleProductsRes.pagination)
		}
		// if (getSingleProductsRes && getSingleProductsRes.data && getSingleProductsRes.data.data) {
		//   setSingleProductListData(formatTableRowData(getSingleProductsRes.data.data.list))
		//   setSingleProductPagination(getSingleProductsRes.data.data.pagination)
		// }
	}, [isSuccess, getSingleProductsRes])

	const formatTableRowData = (singleProductListData) => {
		return add_element_field(singleProductListData, responseToTableRowMap)
	}

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

	const [isModal, setIsModal] = useAtom(blueModalAtom)

	const [noticeEdit, setnoticeEdit] = useState(false)

	const noticeEditOnClickHandler = () => {
		setnoticeEdit((prev) => !prev)
	}

	const modalOpen = () => {
		setIsModal(true)
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

	return (
		<FilterContianer>
			<div>
				<FilterHeader>
					<h1>상시 판매 단일</h1>
					{/* 토글 쓰기 */}
					<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
				</FilterHeader>
				<FilterHeaderAlert>
					<div style={{ display: 'flex' }}>
						<div style={{ marginRight: '20px' }}>
							<img src="/img/notice.png" />
						</div>
						{noticeEdit ? (
							<div style={{ marginTop: '6px' }}>
								<div>
									<input style={{ border: '1px solid' }} />
								</div>
								<div>
									<input style={{ marginTop: '6px', border: '1px solid' }} />
								</div>
							</div>
						) : (
							<div style={{ marginTop: '6px' }}>
								<div>· 주의사항 영역</div>
								<div style={{ marginTop: '6px' }}>· 주의사항 영역</div>
							</div>
						)}
					</div>

					{noticeEdit ? (
						<EditGear onClick={noticeEditOnClickHandler}>
							완료
							<img style={{ marginLeft: '10px' }} src="/img/setting.png" />
						</EditGear>
					) : (
						<EditGear onClick={noticeEditOnClickHandler}>
							수정
							<img style={{ marginLeft: '10px' }} src="/img/setting.png" />
						</EditGear>
					)}
				</FilterHeaderAlert>
				{exFilterToggle && (
					<FilterWrap>
						<FilterSubcontianer>
							<FilterLeft>
								<RowWrap>
									<StorageSelect
										value={param.storage}
										onChange={(e) => setParam((prev) => ({ ...prev, storage: e.label }))}
									/>
									<PartWrap>
										<h6>매입처</h6>
										<PWRight>
											<MainSelect options={storageOptions} defaultValue={storageOptions[0]} />
										</PWRight>
									</PartWrap>
									<PartWrap>
										<h6>규격 약호</h6>
										<Input />
										<GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17} onClick={modalOpen}>
											찾기
										</GreyBtn>
									</PartWrap>
								</RowWrap>
								<RowWrap>
									<PartWrap first>
										<h6>구분</h6>
										<MainSelect />
										<MainSelect />
										<MainSelect />
										<MainSelect />
										<MainSelect />
									</PartWrap>
								</RowWrap>
								<RowWrap style={{ borderBottom: '0px' }}>
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
								<RowWrap none>
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
										style={{ height: '90%' }}
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
								<BlackBtn width={100} height={40}>
									검색
								</BlackBtn>
							</div>
						</FilterFooter>
					</FilterWrap>
				)}
			</div>
			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>{checkBoxSelect?.length > 0 ? checkBoxSelect?.length : '0'}</span> /{' '}
						{singleProductPagination?.listCount}개 )
						<Hidden />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={handleTablePageSize} />
						<Excel getRow={singleProductListData} />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택 중량
						<span> {formatWeight(KilogramSum(checkBoxSelect))} </span>
						kg / 총 중량 {formatWeight(singleProductPagination.totalWeight)} kg
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteBlackBtn>노출 상태 변경</WhiteBlackBtn>
					</div>
				</TCSubContainer>
				<Table
					getCol={singleProductListFieldCols}
					getRow={singleProductListData}
					tablePagination={singleProductPagination}
					onPageChange={onPageChange}
				/>
				<TableBottomWrap>
					<BlackBtn width={13} height={40} fontSize={17}>
						저장
					</BlackBtn>
				</TableBottomWrap>
			</TableContianer>
		</FilterContianer>
	)
}

export default Single
