import React, { useEffect, useMemo, useRef, useState } from 'react'
import { BlackBtn, WhiteRedBtn } from '../../common/Button/Button'
import { anotherTableRowsAtom, weightAtom, weightObj } from '../../store/Layout/Layout'
import Table from '../../pages/Table/Table'
import { FilterContianer, FilterTCTop, TableContianer, TCSubContainer } from '../../modal/External/ExternalFilter'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import useReactQuery from '../../hooks/useReactQuery'
import styled from 'styled-components'
import { BlueBarHeader, BlueSubContainer, ModalContainer, WhiteCloseBtn } from '../Common/Common.Styled'
import { getDetailStocks, getInventoryStocks, postStocks } from '../../api/stocks/Inventory'
import { add_element_field } from '../../lib/tableHelpers'
import {
	StockDetailInventoryFields,
	StockInventoryDetailFieldCols,
	StockInventoryFields,
} from '../../constants/admin/StockInventory'
import useMutationQuery from '../../hooks/useMutationQuery'
import useAlert from '../../store/Alert/useAlert'
import { authAtom } from '../../store/Auth/auth'
import moment from 'moment'

// 중량 판매 등록 모달
const WeightSales = () => {
	const auth = useAtomValue(authAtom)
	const { simpleConfirm, simpleAlert } = useAlert()

	const setAddModal = useSetAtom(weightAtom)
	const selectObj = useAtomValue(weightObj)
	const selectedRowData = useAtomValue(anotherTableRowsAtom)

	const requestData = {
		pageNum: 1,
		pageSize: 1,
		number: selectObj['제품 번호'],
		reciptStatus: '입고 확정',
	}

	const [rows, setRows] = useState([]) // 중량판매 테이블 row 데이터
	const [checkedRows, setCheckedRows] = useState([]) // 중량 판매 테이블 체크 리스트
	const [updateState, setUpdateState] = useState([]) // 변경 데이터
	const [deleted, setDeleted] = useState([]) // 삭제 데이터
	const [postRequest, setPostRequest] = useState({
		originalProductUid: selectObj['제품 고유 번호'], // 제품 고유 번호
		addProductList: [],
		deleteProductUids: [],
	})
	// 제품 상세
	const { data: originalData, isLoading: loading } = useReactQuery(requestData, 'getInventroyStock', getInventoryStocks)

	// 해당 제품 중량 판매 제품 목록
	const { data: TableData } = useReactQuery(selectObj['제품 고유 번호'], 'getInventroyStockDetail', getDetailStocks)

	// 제품 상세 정보 테이블 데이터
	const tableRowData = useMemo(() => {
		if (!originalData || !originalData?.data?.list) {
			return []
		}
		return add_element_field(originalData?.data?.list, StockInventoryFields)
	}, [originalData])

	// 제품 > 중량 판매로 지정된 제품 목록
	const bottomTableRowData = useMemo(() => {
		if (!TableData || !TableData?.data) {
			return []
		}
		return add_element_field(TableData?.data, StockDetailInventoryFields)
	}, [TableData])

	const tableTitle = StockInventoryDetailFieldCols
	const tableFields = useRef(tableTitle)
	const getCol = tableFields.current

	// 중량판매 제품 등록
	const createSelectData = (idx = null) => {
		let newNumber = 1
		const usedNumber = rows.map((item) => Number(item['제품 번호'].split('-')[1]))
		let maxNumber = Math.max(...usedNumber) + 1

		return selectedRowData?.map((i) => ({
			'중량 제품 번호': i['중량 제품 번호'] || '',
			'제품 번호':
				rows?.length === 0
					? selectObj['제품 번호'] + '-' + (idx != null ? idx : selectedRowData.length - newNumber++)
					: selectObj['제품 번호'] + '-' + maxNumber++,
			중량: i['중량'],
			두께: i['두께'],
			폭: i['폭'],
			길이: i['길이'],
			제조사: i['제조사'],
			'판매 구분': i['판매 구분'],
			'유찰 횟수': i['유찰 횟수'],
			'제품 고유 번호': i['제품 고유 번호'] || '',
			수정자: auth.name || '',
			'수정 날짜': moment(new Date()).format('YYYY-MM-DD'),
			'중량 판매 개수': i['중량 판매 개수'],
		}))
	}

	const updateRowsReValue = (data) => {
		const row = tableRowData[0]
		return data?.map((item) => ({
			...item,
			두께: (row['두께'] / data?.length).toFixed(1),
			폭: (row['폭'] / data?.length).toFixed(1),
			길이: (row['길이'] / data?.length).toFixed(1),
		}))
	}

	// Rows가 기존
	const handleImageClick = () => {
		if (!selectedRowData || selectedRowData?.length === 0) {
			simpleAlert('중량 판매 등록할 상품을 선택해 주세요.')
			return
		}
		if (rows?.length >= 4) {
			simpleAlert('4개 이하로만 추가 가능합니다')
			return
		}

		// table row add
		let newSelectedData = createSelectData()
		if (rows.length === 0) {
			newSelectedData = [...newSelectedData, ...createSelectData(1)]
		}
		const newRows = updateRowsReValue([...rows, ...newSelectedData])
		setRows([])
		setTimeout(() => {
			setRows(newRows)
		}, 100)

		// post data set
		const newAddData = newRows.map((item) => ({
			productNumber: item['제품 번호'],
			thickness: item['두께'],
			width: item['폭'],
			length: item['길이'],
		}))
		setPostRequest((p) => ({ ...p, addProductList: [...newAddData] }))
	}

	// 중량 제품 두께, 폭, 길이 수정
	const handleOnchange = (e, rowIndex) => {
		const { value, name } = e.target
		setPostRequest((prevPostRequest) => {
			return {
				...prevPostRequest,
				addProductList: prevPostRequest.addProductList.map((item, idx) => {
					if (idx === rowIndex) {
						return {
							...item,
							[name]: value,
						}
					}
					return item
				}),
			}
		})
	}

	// 체크박스 check handler
	const handleCheck = (id, data) => {
		if (checkedRows?.includes(id)) {
			setCheckedRows(checkedRows.filter((rowId) => rowId !== id))
		} else {
			setCheckedRows([...checkedRows, id])
			setDeleted([...deleted, data])
		}
	}

	// 선택 목록 제거
	const handleDelete = () => {
		let deleteRows = rows.filter((row) => !checkedRows?.includes(row['제품 번호']))
		const newRows = updateRowsReValue(deleteRows)
		setRows([])
		if (rows.length > 2) {
			setTimeout(() => {
				setRows(newRows)
			}, 100)
		}

		const deleteUids = deleteRows.map((item) => item['중량 제품 번호'])
		setPostRequest((p) => ({ ...p, deleteProductUids: [...p.deleteProductUids, ...deleteUids] }))
		setCheckedRows([])
	}

	const { mutate } = useMutationQuery('getJunior', postStocks)

	const handleSubmit = () => {
		if (!postRequest.originalProductUid) {
			simpleAlert('중량 판매 등록할 제품을 선택해주세요.')
			return
		}
		if (postRequest.addProductList.length === 0 && postRequest.deleteProductUids.length === 0) {
			simpleAlert('중량 판매 등록할 제품을 등록해주세요.')
			return
		}
		mutate(postRequest, {
			onSuccess: () => {
				simpleAlert('저장되었습니다.', () => window.location.reload())
			},
			onError: (e) => {
				simpleAlert(e?.data?.message || '실패하였습니다.', () => window.location.reload())
			},
		})
	}

	const modalClose = () => {
		setAddModal(false)
	}

	useEffect(() => {
		setRows(
			bottomTableRowData.map((i) => {
				return {
					...i,
					두께: i['두께'],
					중량: i['중량'],
					길이: i['길이'],
				}
			}),
		)
	}, [TableData])

	return (
		<OutSideArea>
			<ModalContainer style={{ width: '1200px', height: '90%', zIndex: 1 }}>
				<BlueBarHeader style={{ height: '60px' }}>
					<div>중량 판매 등록</div>
					<div>
						<WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
					</div>
				</BlueBarHeader>
				<BlueSubContainer style={{ padding: '30px 10px 20px 10px' }}>
					<FilterContianer>
						<TableContianer style={{ padding: '0px' }}>
							<FilterTCTop style={{ border: 'none', paddingLeft: '15px', marginTop: '10px', fontSize: '17px' }}>
								<h6 style={{ fontSize: '17px' }}>중량 판매 대상 제품</h6>
								<p>{selectObj['제품 번호']}</p>
							</FilterTCTop>
							<Table
								hei2={120}
								hei={100}
								getRow={tableRowData}
								getCol={getCol}
								isLoading={loading}
								isAnotherTable={true}
							/>
						</TableContianer>
					</FilterContianer>
					<FilterContianer style={{ color: '#B02525', paddingLeft: '20px', paddingTop: '5px' }}>
						* 절단은 한번에 두번까지 제한 ex) 한번 절단한 제품 재절단 x{' '}
					</FilterContianer>

					<PowerMiddle>
						<button onClick={handleImageClick} style={{ background: 'white' }}>
							<img src="/img/circle_add.png" alt="add row" />
						</button>
					</PowerMiddle>
					<TableContainer>
						<div style={{ border: '1px solid #c8c8c8', overflow: 'scroll' }}>
							<TCSubContainer style={{ padding: '18px 12px 12px' }}>
								<div>
									중량 판매 (<span>{checkedRows?.length}</span> / {rows?.length} )
								</div>
							</TCSubContainer>
							<SubTables>
								<thead>
									<TableRow>
										<TableHeaderCell>
											<Checkbox
												type="checkbox"
												checked={checkedRows?.length === rows?.length}
												onChange={() =>
													checkedRows?.length === rows?.length
														? setCheckedRows([])
														: setCheckedRows(rows.map((row) => row['제품 번호']))
												}
											/>
										</TableHeaderCell>
										{tableTitle.map((title, index) =>
											title.field !== '' ? (
												<TableHeaderCell key={index}>
													{title.field === '수정 날짜' ? '절단일자' : title.field}
												</TableHeaderCell>
											) : null,
										)}
									</TableRow>
								</thead>
								<tbody>
									{rows.map((row, index) => (
										<TableRow key={index}>
											<TableCell>
												<Checkbox
													type="checkbox"
													checked={checkedRows?.includes(row['제품 번호'])}
													onChange={() => handleCheck(row['제품 번호'], row)}
												/>
											</TableCell>
											{Object.entries(row)?.map(([k, v], idx) => (
												<TableCell key={idx}>
													{k === '폭' || k === '길이' || k === '두께' ? (
														<input
															defaultValue={v}
															name={k === '폭' ? 'width' : k === '길이' ? 'length' : 'thickness'}
															id={row['제품 번호']}
															onChange={(e) => handleOnchange(e, index)}
														/>
													) : (
														<div
															style={{
																width: '100%',
																height: '100%',
																display: 'flex',
																alignItems: 'center',
																justifyContent: 'center',
															}}
														>
															{row[k]}
														</div>
													)}
												</TableCell>
											))}
										</TableRow>
									))}
								</tbody>
							</SubTables>
						</div>
					</TableContainer>

					<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
						<WhiteRedBtn width={15} fontSize={17} onClick={handleDelete}>
							선택 목록 제거
						</WhiteRedBtn>
					</div>

					{/* 나중 해당 테이블에서 바꾸기 */}
				</BlueSubContainer>

				<div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
					<BlackBtn
						width={13}
						height={40}
						fontSize={17}
						onClick={() => {
							simpleConfirm('저장하시겠습니까?', () => {
								handleSubmit()
							})
						}}
					>
						저장
					</BlackBtn>
				</div>
			</ModalContainer>
		</OutSideArea>
	)
}

export default WeightSales

const TableContainer = styled.div`
	width: 100%;
	margin-bottom: 20px;
	overflow-x: scroll;
`

const PowerMiddle = styled.div`
	display: flex;
	justify-content: center;
	padding: 10px;
`
const TableRow = styled.tr`
	width: 100%;
	display: flex;
	height: 40px;
	font-size: 15px;
	cursor: pointer;
`

const TableHeaderCell = styled.th`
	text-align: center;
	border: 1px solid #c8c8c8;
	width: 150px;
	margin-top: 4px;
	padding: 8px 2px;
	background-color: #dbe2f0;
	&:first-child {
		width: 50px;
		padding: 8px 16px;
	}
`

const TableCell = styled.td`
	text-align: center;
	border: 1px solid #c8c8c8;
	width: 150px;
	padding: 4px 2px;
	&:first-child {
		width: 50px;
		padding: 8px 16px;
	}
	input {
		max-width: 128px;
		height: 30px;
		border: 1px solid #c8c8c8;
		width: max-content;
	}
`

const SubTables = styled.table`
	min-width: 900px;
	height: 220px;
	border-collapse: collapse;
	overflow: scroll;
`
const Checkbox = styled.input`
	margin-right: 10px;
`

const OutSideArea = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 9;
	background-color: rgba(0, 0, 0, 0.4);
`
