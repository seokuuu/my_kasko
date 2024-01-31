import React, { useEffect, useState, useMemo, useRef } from 'react'
import { BlackBtn, WhiteRedBtn } from '../../common/Button/Button'
import Test3 from '../../pages/Test/Test3'
import { selectedRowsAtom, selectedRowsAtom3, toggleAtom, weightAtom, weightObj } from '../../store/Layout/Layout'
import Table from '../../pages/Table/Table'
import {
	FilterContianer,
	TableContianer,
	TCSubContainer,
	FilterTopContainer,
	FilterTCTop,
} from '../../modal/External/ExternalFilter'

import { useAtom, useAtomValue } from 'jotai'
import { aucProAddModalAtom } from '../../store/Layout/Layout'
import useReactQuery from '../../hooks/useReactQuery'
import styled from 'styled-components'
import { BlueBarHeader, BlueSubContainer, FadeOverlay, ModalContainer, WhiteCloseBtn } from '../Common/Common.Styled'
import { getDetailStocks, getInventoryStocks, postStocks } from '../../api/stocks/Inventory'
import { add_element_field } from '../../lib/tableHelpers'
import {
	StockDetailInventoryFields,
	StockInventoryDetailFieldCols,
	StockInventoryFieldCols,
	StockInventoryFields,
} from '../../constants/admin/StockInventory'
import useMutationQuery from '../../hooks/useMutationQuery'
import useAlert from '../../store/Alert/useAlert'
import { update } from 'lodash'
import { OutSide } from './PackageDetailModal'
// 중량 판매 등록
const WeightSales = ({}) => {
	const { simpleConfirm, simpleAlert, showAlert } = useAlert()
	// const [isModal, setIsModal] = useAtom()

	const modalClose = () => {
		setAddModal(false)
	}

	const titleData = ['패키지 명', '수량', '시작가']
	const contentData = ['알뜰패키지', '50', '3598']
	const [addModal, setAddModal] = useAtom(weightAtom)
	const checkSales = ['전체', '확정 전송', '확정 전송 대기']
	const [weightModal, setWeightModal] = useAtom(weightAtom)
	const [selectObj, setSelectObj] = useAtom(weightObj)
	// 이건 ag-grid에서 받아오는 테이블 로우의 값이다.
	const [selectedRowData, setSelectedRowData] = useAtom(selectedRowsAtom)
	const [request, setRequest] = useState({
		pageNum: 1,
		pageSize: 50,
		reciptStatus: '입고 확정',
	})

	const [postRequest, setPostRequest] = useState({
		originalProductUid: selectObj['제품 고유 번호'], // 제품 고유 번호
		addProductList: [],
		deleteProductUids: [],
	})
	const {
		data: originalData,
		isLoading: loading,
		isSuccess: success,
	} = useReactQuery(request, 'getInventroyStock', getInventoryStocks)
	const {
		data: TableData,
		isLoading,
		isSuccess,
	} = useReactQuery(selectObj['제품 고유 번호'], 'getInventroyStockDetail', getDetailStocks)
	const [rows, setRows] = useState([])
	const [checkedRows, setCheckedRows] = useState([])

	const [updateState, setUpdateState] = useState([])
	const tableRowData = useMemo(() => {
		if (!originalData || !originalData?.data?.list) {
			return []
		}
		const rowData = originalData?.data?.list

		const displayData = add_element_field(rowData, StockInventoryFields)
		return displayData
	}, [isSuccess, originalData])

	const bottomTableRowData = useMemo(() => {
		if (!TableData || !TableData?.data) {
			return []
		}
		const rowData = TableData?.data

		const displayData = add_element_field(rowData, StockDetailInventoryFields)
		return displayData
	}, [isSuccess, TableData])

	const [quantity, setQuantity] = useState({
		thickness: '',
		width: '',
		length: '',
	})

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
	}, [TableData, quantity])

	console.log('UPDATE', updateState)
	const tableTitle = StockInventoryDetailFieldCols
	const tableFields = useRef(tableTitle)
	const getCol = tableFields.current
	const [select, setSelect] = useState([])
	const [add, setAdd] = useState([]) // 추가값
	const [deleted, setDeleted] = useState([])
	// 체크된 값 들어올때 하단 테이블의 컬럼에 맞게 다시 매핑작업

	// 각각값

	useEffect(() => {
		let newNumber = 1
		// 현존하는 중량 제품 번호에서 가장 큰 번호 다음으로 추가 되는걸로
		const usedNumber = rows.map((item) => Number(item['제품 번호'].split('-')[1]))
		let maxNumber = Math.max(...usedNumber) + 1

		setSelect(() =>
			selectedRowData?.map((i, idx) => ({
				'중량 제품 번호': i['중량 제품 번호'] || '',
				'제품 고유 번호': i['제품 고유 번호'] || '',
				'제품 번호':
					rows?.length === 0
						? selectObj['제품 번호'] + '-' + (selectedRowData.length - newNumber++)
						: selectObj['제품 번호'] + '-' + maxNumber++,
				중량: i['중량'],
				폭: i['폭'],
				길이: i['길이'],
				두께: i['두께'],
				제조사: i['제조사'],
				'판매 구분': i['판매 구분'],
				'유찰 횟수': i['유찰 횟수'],
				수정자: i['수정자'] || '',
				'수정 날짜': i['수정일'],
				'중량 판매 개수': i['중량 판매 개수'],
			})),
		)
	}, [selectedRowData])

	useEffect(() => {
		const usedNumber = rows.map((item) => Number(item['제품 번호'].split('-')[1]))
		let maxNumber = Math.max(...usedNumber) + 1
		console.log('ADD', add)
		setAdd(() =>
			selectedRowData?.map((i, idx) => ({
				productNumber:
					rows?.length === 0
						? selectObj['제품 번호'] + '-' + (selectedRowData.length - idx)
						: selectObj['제품 번호'] + '-' + maxNumber++,
				thickness: i['두께'],
				width: quantity['폭'] ? quantity['폭'] : i['폭'],
				length: quantity['길이'] ? quantity['길이'] : i['길이'],
			})),
		)
	}, [select, quantity.thickness, quantity.width, quantity.length])
	console.log('셀렉트', select)
	// select => 테이블에서 추가
	// Rows가 기존
	const handleImageClick = () => {
		if (select?.length > 4) {
			simpleAlert('4개 이하로만 추가 가능합니다.', () => {
				return null
			})
		}
		if (select?.length > 0) {
			if (rows.length === 0) {
				setRows(() => [...select])
				setPostRequest((p) => ({ ...p, addProductList: [...add] }))
				setSelectedRowData([])
			} else if (rows.length < 4) {
				setRows((p) => [...p, ...select])
				setPostRequest((p) => ({ ...p, addProductList: [...add] }))
				setSelectedRowData([])
				if (rows.length + select.length > 4) {
					showAlert({
						title: '4개 이하로만 추가 가능합니다.',
						func: () => {
							window.location.reload()
						},
					})
				} else {
					return null
				}
				console.log(add)
				console.log('포스트', postRequest)
			}
			if (rows.length >= 4) {
				simpleAlert('4개 이하로만 추가 가능합니다.')
			}
		} else if (select?.length === 0) {
			simpleAlert('중량 판매 등록할 상품을 선택해 주세요.', () => {
				return null
			})
		}

		setSelect([])
	}

	const handleOnchange = (e, uid, rowIndex) => {
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
	const handleCheck = (id, data) => {
		if (Array.isArray(checkedRows) && checkedRows?.includes(id)) {
			setCheckedRows(...checkedRows.filter((rowId) => rowId !== id))
		} else {
			setCheckedRows([...checkedRows, id])
			setDeleted([...deleted, data])
		}
	}

	const handleDelete = () => {
		setRows(rows.filter((row) => !checkedRows?.includes(row['중량 제품 번호'])))
		// setCheckedRows([])
		setPostRequest((p) => ({ ...p, deleteProductUids: [...checkedRows] }))
	}

	const { mutate } = useMutationQuery('getJunior', postStocks)

	// 수치값을 변형시켠 값을 업데이트해서 보내주는걸로

	useState(() => {
		setPostRequest((p) => ({
			...p,
			addProductList: updateState,
		}))
	}, [updateState])
	const reload = () => {
		setAddModal(false)
		window.location.reload()
	}
	const handleSubmit = () => {
		console.log(postRequest)
		mutate(postRequest, {
			onSuccess: (d) => {
				showAlert({ title: '저장되었습니다.', func: reload })
			},
			onError: (e) => {
				showAlert({ title: e.data.message, func: reload })
			},
		})
	}
	useEffect(() => {
		console.log('UPDATE ROWS:', rows)
		setUpdateState(
			rows.map((i) => {
				return {
					thickness: i['두께'],
					width: i['폭'],
					length: i['길이'],
				}
			}),
		)
		console.log('UPDATE ROWS2:', updateState)
	}, [rows])

	console.log(rows)
	return (
		<OutSideArea>
			{/* <FadeOverlay /> */}
			<ModalContainer style={{ width: '50%', height: '90%', zIndex: 1 }}>
				<BlueBarHeader style={{ height: '60px' }}>
					{/* <div>{title}</div> */}
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
							{/* <Test3 hei2={330} hei={100} /> */}
							<Table hei2={330} hei={100} getRow={tableRowData} getCol={getCol} isLoading={isLoading} />
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
						<div style={{ border: '1px solid', padding: '4px 2px', overflow: 'scroll' }}>
							<TCSubContainer>
								<div>
									중량 판매 (<span>2</span> /4 ){/* <Hidden /> */}
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
											title.field !== '' ? <TableHeaderCell key={index}>{title.field}</TableHeaderCell> : null,
										)}
									</TableRow>
								</thead>
								<tbody>
									{rows.map((row, index) => (
										<TableRow>
											<TableCell>
												<Checkbox
													type="checkbox"
													checked={checkedRows?.includes(row['중량 제품 번호'])}
													onChange={() => handleCheck(row['중량 제품 번호'], row)}
												/>
											</TableCell>
											{Object.entries(row)?.map(([k, v], idx) => (
												<TableCell key={idx}>
													{k === '폭' || k === '길이' || k === '두께' ? (
														<input
															defaultValue={v}
															name={k === '폭' ? 'width' : k === '길이' ? 'length' : 'thickness'}
															id={row['제품 번호']}
															onChange={(e) => {
																handleOnchange(e, String(row['제품 고유 번호']), index, k)
															}}
														/>
													) : (
														<div>{row[k]}</div>
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
							simpleConfirm('저장하시겠습니까?', handleSubmit)
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

const TCSDiv = styled.div`
	padding: 15px 0px;
	font-weight: 700;
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
	border: 1px solid #000;
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
	border: 1px solid #000;
	width: 150px;
	padding: 4px 2px;
	&:first-child {
		width: 50px;
		padding: 8px 16px;
	}
	input {
		max-width: 128px;
		height: 30px;
		border: 1px solid #000;
		width: max-content;
	}
`

const SubTables = styled.table`
	min-width: 900px;
	border-collapse: collapse;
	overflow: scroll;
`
const Checkbox = styled.input`
	margin-right: 10px;
`

const DeleteButton = styled.button`
	padding: 10px;
	margin-top: 10px;
`
const OutSideArea = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 0;
	background-color: rgba(0, 0, 0, 0.4);
`
