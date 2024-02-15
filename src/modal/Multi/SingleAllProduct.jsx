import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { BlackBtn, BtnWrap } from '../../common/Button/Button'
import Excel from '../../components/TableInner/Excel'
import {
	packageCreateObjAtom,
	packageUpdateObjAtom,
	selectedRowsAtom,
	singleAllProductModal,
	toggleAtom,
} from '../../store/Layout/Layout'
import PageDropdown from '../../components/TableInner/PageDropdown'
import { useAtom, useAtomValue } from 'jotai'
import { FilterContianer, FilterHeader, TableContianer, TCSubContainer } from '../../modal/External/ExternalFilter'
import useReactQuery from '../../hooks/useReactQuery'
import Hidden from '../../components/TableInner/Hidden'
import { getSingleProducts } from '../../api/SellProduct'
import { singleDispatchFields, SingleDispatchFieldsCols } from '../../constants/admin/Single'
import { add_element_field } from '../../lib/tableHelpers'
import Table from '../../pages/Table/Table'
import { KilogramSum } from '../../utils/KilogramSum'
import { BlueBarHeader, WhiteCloseBtn } from '../Common/Common.Styled'
import HeaderToggle from '../../components/Toggle/HeaderToggle'
import { CRWMainBottom, CRWSub } from '../../pages/Operate/Common/Datasheet/DatasheetEdit'
import GlobalProductSearch from '../../components/GlobalProductSearch/GlobalProductSearch'
import { isEqual } from 'lodash'
import PackageProductSearchModalFields from '../../pages/Product/PackageManage/PackageProductSearchModalFields'

const SingleAllProduct = ({ setSelectPr, selectPr, isUpdate }) => {
	const packageObj = useAtomValue(isUpdate ? packageUpdateObjAtom : packageCreateObjAtom)
	const [getRow, setGetRow] = useState([])

	const tableField = useRef(SingleDispatchFieldsCols)
	const getCol = tableField.current

	const [isModal, setIsModal] = useAtom(singleAllProductModal)
	const checkBoxSelect = useAtomValue(selectedRowsAtom)
	const [pagiNation, setPagination] = useState({})

	const paramData = {
		pageNum: 1,
		pageSize: 50,
		type: '일반',
		category: '전체',
		saleType: packageObj?.sellType === '경매' ? '경매 대상재' : '상시판매 대상재',
		packageStatus: 1,
		productStatus: packageObj?.sellType === '경매' ? '등록 대기' : '판매중',
		stockStatus: packageObj?.sellType === '상시' ? '자사재고' : '',
	}

	const [param, setParam] = useState(paramData)
	//✅ request, Data패칭

	const { data, isSuccess, refetch } = useReactQuery(param, 'product-list', getSingleProducts)
	const singleList = data?.r
	const singleProductPage = data?.pagination

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
		setParam((p) => ({ ...p, pageNum: Number(value) }))
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
					'제품 경매 번호': item['제품 경매 번호'],
					'제품 판매 유형': item['판매 유형'],
					'제품 판매 구분': item['판매 구분'],
					'제품 판매가 유형': item['판매가 유형'],
					제품군: item['제품군명'],
					'제품 중량': item['중량'],
					공급가: item['운반비 공급가'],
					부가세: item['운반비 부가세'],
					'경매 시작가': item['경매 시장 단가'],
					'최종 수정자': item['최종 수정자'],
					메모: item['메모'],
					비고: item['비고'],
				}
			}),
		)
		modalClose()
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
							<GlobalProductSearch
								param={param}
								isToggleSeparate={true}
								renderCustomSearchFields={(props) => <PackageProductSearchModalFields {...props} />}
								globalProductSearchOnClick={globalProductSearchOnClick}
								globalProductResetOnClick={globalProductResetOnClick}
							/>
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
											setParam((prev) => ({ ...prev, pageNum: 1, pageSize: parseInt(e.target.value) }))
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
