import React, { Fragment, useEffect, useRef, useState } from 'react'

import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import styled from 'styled-components'
import { getPackageProductsList } from '../../api/SellProduct'
import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle } from '../../components/MapTable/MapTable'
import Excel from '../../components/TableInner/Excel'
import PageDropdown from '../../components/TableInner/PageDropdown'
import { packageDetailDispatchFieldsCols, packageProductsDispatchFields } from '../../constants/admin/SellPackage'
import useReactQuery from '../../hooks/useReactQuery'
import { add_element_field } from '../../lib/tableHelpers'
import Table from '../../pages/Table/Table'
import { packageDetailModal, selectPackageAtom, selectedRowsAtom } from '../../store/Layout/Layout'
import { KilogramSum } from '../../utils/KilogramSum'
import { BlueBarHeader, WhiteCloseBtn } from '../Common/Common.Styled'
import {
	FilterContianer,
	FilterHeader,
	FilterTCTop,
	FilterTopContainer,
	TCSubContainer,
	TableContianer,
} from '../External/ExternalFilter'

export default function PackageDetailModal() {
	const checkBoxSelect = useAtomValue(selectedRowsAtom)
	const checkWeight = checkBoxSelect?.map((x) => parseInt(x['제품 중량']?.replace(/,/g, '')))
	const checkWeightSum = checkWeight?.reduce((total, current) => total + current, 0)?.toLocaleString()

	const setIsModal = useSetAtom(packageDetailModal)
	const select = useAtomValue(selectPackageAtom)
	const [param, setParam] = useState({
		pageNum: 1,
		pageSize: 50,
		packageNumber: select['패키지 번호'],
	})

	const titleData = ['패키지 명', '수량', select['판매 유형'] === '상시판매 대상재' ? '상시판매가' : '시작가']
	const tableField = useRef(packageDetailDispatchFieldsCols)
	const getCol = tableField.current
	const [getRow, setGetRow] = useState('')

	const { data, isSuccess } = useReactQuery(param, 'package-list', getPackageProductsList)
	const detailList = data?.r
	const tablePagination = data?.pagination
	const [filteredData, setFilteredData] = useState([])

	useEffect(() => {
		if (filteredData && isSuccess) {
			detailList && setFilteredData(detailList)
		}
		if (!isSuccess && !filteredData) return null
		if (Array.isArray(filteredData)) {
			setGetRow(add_element_field(filteredData, packageProductsDispatchFields))
		}
		//타입, 리액트쿼리, 데이터 확인 후 실행
	}, [data, filteredData])

	useEffect(() => {
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [])

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
		<OutSide>
			<Container>
				<BlueBarHeader>
					<div>패키지 상세 보기</div>
					<div>
						<WhiteCloseBtn
							onClick={() => {
								setIsModal(false)
							}}
							src="/svg/white_btn_close.svg"
						/>
					</div>
				</BlueBarHeader>
				<OverTable>
					<FilterContianer>
						<FilterHeader>
							<div style={{ display: 'flex' }}></div>
						</FilterHeader>
						<FilterTopContainer>
							<FilterTCTop>
								<h6>패키지 번호</h6>
								<p>{select['패키지 번호']}</p>
							</FilterTCTop>
						</FilterTopContainer>
						<ClaimTable>
							{[0, 1].map((index) => (
								<ClaimRow key={index}>
									{titleData.slice(index * 3, index * 3 + 3).map((title, idx) => (
										<Fragment key={idx}>
											<ClaimTitle>{title}</ClaimTitle>
											{title === '패키지 명' && (
												<ClaimContent>{detailList ? detailList[0].packageName : null}</ClaimContent>
											)}
											{title === '수량' && <ClaimContent>{filteredData.length}</ClaimContent>}
											{title === '상시판매가' && (
												<ClaimContent>
													{detailList ? Number(detailList[0].packagePrice)?.toLocaleString() : null}
												</ClaimContent>
											)}
											{title === '시작가' && (
												<ClaimContent>
													{detailList ? Number(detailList[0].packagePrice)?.toLocaleString() : null}
												</ClaimContent>
											)}
										</Fragment>
									))}
								</ClaimRow>
							))}
						</ClaimTable>
						<TableContianer>
							<TCSubContainer bor>
								<div>
									조회 목록 (선택 <span>{checkBoxSelect?.length > 0 ? checkBoxSelect?.length : '0'}</span> /{' '}
									{tablePagination?.listCount?.toLocaleString()}개 )
								</div>
								<div style={{ display: 'flex', gap: '10px' }}>
									<PageDropdown handleDropdown={handleTablePageSize} />
									<Excel getRow={getRow} sheetName="패키지 상세 보기" />
								</div>
							</TCSubContainer>
							<TCSubContainer bor>
								<div>
									선택 중량 <span> {checkWeightSum} </span>kg / 총 {tablePagination?.totalWeight?.toLocaleString()} kg
								</div>
							</TCSubContainer>
							<Table getRow={getRow} getCol={getCol} tablePagination={tablePagination} onPageChange={onPageChange} />
						</TableContianer>
					</FilterContianer>
				</OverTable>
			</Container>
		</OutSide>
	)
}

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
