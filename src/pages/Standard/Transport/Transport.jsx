import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useCallback, useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import { BlackBtn, TGreyBtn, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import DateGrid from '../../../components/DateGrid/DateGrid'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import AlertPopup from '../../../modal/Alert/AlertPopup'
import {
	CustomInput,
	FilterContianer,
	FilterHeader,
	FilterWrap,
	StyledHeading,
	StyledSubHeading,
	SubTitle,
	TableBottomWrap,
	TableContianer,
	TableTitle,
	TCSubContainer,
} from '../../../modal/External/ExternalFilter'
import Upload from '../../../modal/Upload/Upload'
import {
	btnCellRenderAtom,
	btnCellUidAtom,
	destiDelPopupAtom,
	destiPostModalAtom,
	popupObject,
	selectedRowsAtom,
	toggleAtom,
} from '../../../store/Layout/Layout'
import Table from '../../Table/Table'

import { popupDummy } from '../../../modal/Alert/PopupDummy'

import { Link } from 'react-router-dom'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'

import { CheckBox } from '../../../common/Check/Checkbox'
import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../../common/Check/RadioImg'

import {
	StandardTransportationEdit,
	StandardTransportationFields,
	StandardTransportationFieldsCols,
	StandardTransportationPost,
} from '../../../constants/admin/Standard'

import { AuctionUnitPricePostDropOptions2, AuctionUnitPricePostDropOptions3 } from '../../../constants/admin/Auction'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isArray, isEqual } from 'lodash'
import moment from 'moment'
import { getSpartList, getStorageList } from '../../../api/transPortDrop'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import useMutationQuery from '../../../hooks/useMutationQuery'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import TableModal from '../../../modal/Table/TableModal'
import {
	deleteAdminTransportation,
	editAdminTransportation,
	editAdminUnitCost,
	getAdminTransportation,
	postAdminTransportation,
} from '../../../service/admin/Standard'
import useAlert from '../../../store/Alert/useAlert'
import TransportSearchFilter from './TransportSearchFilter'

const Transport = () => {
	const [modalSwitch, setModalSwitch] = useAtom(destiPostModalAtom)
	const [btnCellModal, setBtnCellModal] = useAtom(btnCellRenderAtom)
	const [popupSwitch, setPopupSwitch] = useAtom(destiDelPopupAtom) // 팝업 스위치
	const setNowPopup = useSetAtom(popupObject) // 팝업 객체
	const [startDate, setStartDate] = useState(new Date()) // 수정 버튼 Date
	const [startDate2, setStartDate2] = useState(new Date()) // 하단 적용일자 Date
	const [address, setAddress] = useState('')

	const radioDummy = ['증가', '감소']
	const uidAtom = useAtomValue(btnCellUidAtom)
	const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))

	const { simpleAlert, simpleConfirm } = useAlert()

	// 토글 쓰기
	const [exFilterToggle, setExfilterToggle] = useState(toggleAtom)
	const [toggleMsg, setToggleMsg] = useState('On')
	const toggleBtnClick = () => {
		setExfilterToggle((prev) => !prev)
		if (!!exFilterToggle) {
			setToggleMsg('Off')
		} else {
			setToggleMsg('On')
		}
	}

	const [getRow, setGetRow] = useState([])
	const tableField = useRef(StandardTransportationFieldsCols)
	const originEngRowField = StandardTransportationFields
	const getCol = tableField.current
	const queryClient = useQueryClient()
	const checkedArray = useAtom(selectedRowsAtom)[0]
	const uids = checkedArray?.map((item) => item['운반비 고유 번호'])
	const [types, setTypes] = useState(0) // 매입 매출 구분 (0: 매입 / 1: 매출)

	// 단가 일괄 수정 Patch
	const [unitPriceEdit, setUnitPriceEdit] = useState() // 단가 일괄 수정 input 값
	const [realUnitPriceEdit, setRealUnitPriceEdit] = useState([])
	const onUnitEditHandler = useCallback(
		(e) => {
			const { name, value } = e.target
			setUnitPriceEdit(value)
		},
		[unitPriceEdit],
	)
	const unitPriceEditDate = moment(startDate2).format('YYYY-MM-DD')
	const unitPriceEditOnClick = () => {
		// resData 배열을 순회하며 조건에 맞는 객체를 찾고 수정
		if (!unitPriceEdit) {
			simpleAlert('적용할 퍼센트를 입력해주세요.')
			return
		}
		const updatedResData = resData.map((item) => {
			if (item.effectDate === unitPriceEditDate) {
				// unitPriceEdit.percent에 따라 증가 또는 감소
				const percentage = parseFloat(unitPriceEdit) / 100

				const updatedEffectCost =
					checkRadio[0] === true
						? item.effectCost + item?.effectCost * percentage
						: item.effectCost - item?.effectCost * percentage
				// 변경된 값이 있는 경우에만 realUnitPriceEdit에 추가
				if (item.effectCost !== updatedEffectCost) {
					setRealUnitPriceEdit((prev) => [
						...prev,
						{
							uid: item.uid,
							effectDate: item.effectDate,
							effectCost: updatedEffectCost,
						},
					])
				}

				// 원본 객체의 effectCost 수정
				item.effectCost = updatedEffectCost
			}
			return item
		})

		// 변경된 데이터로 state 업데이트
		setGetRow(add_element_field(updatedResData, StandardTransportationFields))
	}

	const updateList = realUnitPriceEdit.map((item) => ({
		uid: item.uid,
		effectDate: item.effectDate,
		effectCost: item.effectCost,
	}))

	const finalResult = {
		updateList: realUnitPriceEdit.map((item) => {
			return {
				uid: item.uid,
				effectDate: item.effectDate,
				effectCost: item.effectCost,
			}
		}),
	}

	const editCostMutation = useMutation(editAdminUnitCost)
	const costEdit = () => {
		if (finalResult.updateList.length === 0) {
			simpleAlert('일괄 수정할 단가를 적용해주세요.')
			return
		}
		simpleConfirm('일괄 단가 수정하시겠습니까?', () => {
			editCostMutation.mutate(finalResult, {
				onSuccess: () => {
					simpleAlert('수정되었습니다.')
					queryClient.invalidateQueries('transportation')
				},
				onError: (error) => {
					simpleAlert(error?.data?.message || '일괄 단가 수정을 실패했습니다. 다시 시도해 주세요.')
				},
			})
		})
	}

	const paramData = {
		pageNum: 1,
		pageSize: 50,
		type: 0, // (0: 매입 / 1: 매출)
	}
	// GET
	const [param, setParam] = useState(paramData)
	const [tablePagination, setTablePagination] = useState([])
	const { isLoading, data, isSuccess, refetch } = useReactQuery(param, 'getAdminTransportation', getAdminTransportation)
	const resData = data?.data?.data?.list

	useEffect(() => {
		let getData = resData
		//타입, 리액트쿼리, 데이터 확인 후 실행
		if (!isSuccess && !resData) return
		if (Array.isArray(getData)) {
			setGetRow(add_element_field(getData, StandardTransportationFields))
			setTablePagination(data.data.data.pagination)
		}
	}, [isSuccess, resData])

	// DELETE
	const mutation = useMutation(deleteAdminTransportation, {
		onSuccess: () => {
			queryClient.invalidateQueries('transportation')
		},
		onError: (error) => {
			simpleAlert(error?.data?.message || '운반비 삭제에 실패했습니다. 다시 시도해 주세요.')
		},
	})

	// 선택한 것 삭제 요청 (해당 함수 func 인자로 전달)
	const propsRemove = () => {
		checkedArray.forEach((item) => {
			mutation.mutate(item['운반비 고유 번호']) //mutation.mutate로 api 인자 전해줌
		})
	}

	// 팝업 '확인' 버튼 함수 (prop으로 줄 함수 선택)
	const firstPopupClick = useCallback(
		(num) => {
			if (isArray(checkedArray) && checkedArray.length > 0) {
				setPopupSwitch(true)
				const firstPopup = popupDummy.find((popup) => popup.num === num)
				setNowPopup((prevNowPopup) => ({
					...prevNowPopup,
					...firstPopup,
					func: propsRemove,
				}))
			} else {
				simpleAlert('삭제할 항목을 선택해주세요.')
			}
		},
		[checkedArray],
	)
	const [postInput, setPostInput] = useState({
		type: 0,
		storage: '',
		destinationCode: '',
		destinationName: '',
		spart: '',
		effectDate: '',
		effectCost: 0,
	})

	const onPostHandler = useCallback(
		(e) => {
			const { name, value } = e.target
			setPostInput((prev) => ({ ...prev, [name]: value }))
		},
		[postInput],
	)

	const postMutation = useMutationQuery('', postAdminTransportation)

	const propsPost = () => {
		const postData = {
			...postInput,
			destinationName: address,
			type: types,
			storage: postInput.storageName,
			effectDate: moment(startDate).format('YYYY-MM-DD'),
		}

		postMutation.mutate(postData, {
			onSuccess: () => {
				setModalSwitch(false)
				queryClient.invalidateQueries('transportation')
				simpleAlert('등록되었습니다.')
				refetch()
			},
			onError: (error) => {
				simpleAlert(error?.data?.message || '등록에 실패했습니다. 다시 시도해 주세요.')
			},
		})
	}

	// POST
	const openModal = () => {
		setModalSwitch(true)
		setNowPopup((prev) => ({
			...prev,
			func: propsPost,
		}))
	}

	const [editInput, setEditInput] = useState()

	useEffect(() => {
		setEditInput({ ...editInput, effectDate: moment(startDate).format('YYYY-MM-DD hh:mm:ss'), uid: uidAtom })
	}, [startDate, uidAtom])

	const onEditHandler = useCallback(
		(e) => {
			const { name, value } = e.target
			setEditInput({ ...editInput, [name]: value })
		},
		[editInput],
	)

	// Edit
	const editMutation = useMutationQuery('', editAdminTransportation)
	const propsEdit = () => {
		editMutation.mutate(editInput, {
			onSuccess: () => {
				queryClient.invalidateQueries('transportation')
				refetch()
			},
			onError: (error) => {
				simpleAlert(error?.data?.message || '수정 실패했습니다. 다시 시도해 주세요.')
			},
		})
	}

	// API에 맞게 한글 -> 영문으로 key 변경 (수정 Modal Input의 key를 변경시킨다)
	const convertKey = {
		적용단가: 'effectCost',
	}
	const { data: testStorage } = useReactQuery(param, 'getStorageList', getStorageList)
	const { data: testSpart } = useReactQuery(param, 'getSPartList', getSpartList)
	const dropdownProps = [
		{ options: testSpart, defaultValue: testSpart && testSpart[0] },
		{ options: AuctionUnitPricePostDropOptions2, defaultValue: AuctionUnitPricePostDropOptions2[0] },
		{ options: AuctionUnitPricePostDropOptions3, defaultValue: AuctionUnitPricePostDropOptions3[0] },
		{ options: testStorage, defaultValue: testStorage && testStorage[0] },
	]

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
		setParam({ ...paramData, type: types })
	}

	const globalProductSearchOnClick = (userSearchParam) => {
		setParam((prevParam) => {
			if (isEqual(prevParam, { ...prevParam, ...userSearchParam })) {
				return prevParam
			}
			return {
				...prevParam,
				...userSearchParam,
			}
		})
	}

	useEffect(() => {
		document.getElementById('resetBtn').click()
	}, [types])

	useEffect(() => {
		refetch()
	}, [param])

	return (
		<FilterContianer>
			<div>
				<FilterHeader>
					<div style={{ display: 'flex' }}>
						<h1>운반비 관리</h1>
						<SubTitle>
							<h5>운반비 관리</h5>
							<Link to={'/standard/surcharge'}>
								<h6>할증 관리</h6>
							</Link>
						</SubTitle>
					</div>
					<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
				</FilterHeader>
				{exFilterToggle && (
					<FilterWrap>
						<GlobalProductSearch
							param={param}
							isToggleSeparate={true}
							renderCustomSearchFields={(props) => <TransportSearchFilter {...props} />}
							globalProductSearchOnClick={globalProductSearchOnClick}
							globalProductResetOnClick={globalProductResetOnClick}
						/>
					</FilterWrap>
				)}
			</div>

			<TableTitle>
				<StyledHeading isActive={types === 0} onClick={() => setTypes(0)}>
					매입 운반비
				</StyledHeading>
				<StyledSubHeading isActive={types === 1} onClick={() => setTypes(1)}>
					매출 운반비
				</StyledSubHeading>
			</TableTitle>
			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>{checkedArray?.length || 0}</span> / {data?.data?.data?.pagination?.listCount}개 )
						<Hidden />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={handleTablePageSize} />
						<Excel getRow={getRow} sheetName={types === 0 ? '매입 운반비' : '매출 운반비'} />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<TCSubDiv>
						<div>
							선택 <span>{checkedArray?.length || 0}</span>(개)
						</div>
					</TCSubDiv>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteRedBtn
							onClick={() => {
								firstPopupClick('2-2')
							}}
						>
							운반비 삭제
						</WhiteRedBtn>
						<WhiteSkyBtn
							onClick={() => {
								openModal()
							}}
						>
							운반비 등록
						</WhiteSkyBtn>
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<TCGreyDiv>
						<div>
							<p style={{ marginRight: '10px' }}>적용일자</p>
							<DateGrid
								startDate={startDate2}
								setStartDate={setStartDate2}
								height={30}
								width={130}
								bgColor={'white'}
								fontSize={15}
							/>
						</div>
						<div>
							<p style={{ marginLeft: ' 20px' }}>단가 일괄 수정</p>
							<div style={{ display: 'flex', gap: '10px', margin: '0px 15px', padding: '5px' }}>
								{radioDummy.map((text, index) => (
									<RadioMainDiv key={index}>
										<RadioCircleDiv
											isChecked={checkRadio[index]}
											onClick={() => {
												setCheckRadio(CheckBox(checkRadio, checkRadio.length, index))
											}}
										>
											<RadioInnerCircleDiv isChecked={checkRadio[index]} />
										</RadioCircleDiv>
										<div style={{ display: 'flex', marginLeft: '5px', color: 'black' }}>{text}</div>
									</RadioMainDiv>
								))}
							</div>
						</div>
						<div></div>
						<CustomInput
							placeholder="% 입력"
							name="percent"
							onChange={onUnitEditHandler}
							style={{ marginRight: '5px' }}
							width={140}
							height={30}
						/>
						<TGreyBtn onClick={unitPriceEditOnClick}>적용(날짜+% 한번에)</TGreyBtn>
					</TCGreyDiv>
					<div style={{ display: 'flex', gap: '10px' }}></div>
				</TCSubContainer>

				<Table
					getCol={getCol}
					getRow={getRow}
					tablePagination={tablePagination}
					onPageChange={onPageChange}
					loading={isLoading}
				/>
				<TableBottomWrap>
					<BlackBtn width={15} height={40} onClick={costEdit}>
						저장
					</BlackBtn>
				</TableBottomWrap>
			</TableContianer>
			{btnCellModal && (
				// Edit
				<TableModal
					title={'운반비 수정'}
					btnCellModal={btnCellModal} // Modal Atom Switch
					setBtnCellModal={setBtnCellModal} // 수정 버튼에 대한 ag-grid event
					modalInTable={StandardTransportationEdit} // Modal 안에 들어갈 Table 매칭 디렉토리 ex)
					getRow={getRow} // 해당 컴포넌트 Table 자체 Object (한글)
					uidAtom={uidAtom} // 수정버튼 누른 해당 object의 고유 id (btnCellRender에서 추출된 uid)
					onEditHandler={onEditHandler} // edit 버튼의 함수를 스프레드 func를 전달
					propsHandler={propsEdit} // 실질 patch 역할하는 함수
					editTitle={'운반비 고유 번호'}
					convertKey={convertKey}
					startDate={startDate}
					setStartDate={setStartDate}
				/>
			)}
			{popupSwitch && <AlertPopup setPopupSwitch={setPopupSwitch} />}
			{modalSwitch && (
				// Post
				<Upload
					title={'운반비 등록'}
					modalSwitch={modalSwitch}
					setModalSwitch={setModalSwitch}
					propsHandler={propsPost}
					modalInTable={StandardTransportationPost}
					getRow={getRow}
					uidAtom={uidAtom}
					onEditHandler={onPostHandler}
					dropdownProps={dropdownProps}
					address={address}
					setAddress={setAddress}
					convertKey={convertKey}
					startDate={startDate}
					setStartDate={setStartDate}
				/>
			)}
		</FilterContianer>
	)
}

export default Transport

const TCSubDiv = styled.div``

const TCGreyDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	> div {
		display: flex;
		align-items: center;
	}

	p {
		color: ${(props) => props.theme.colors.TxtAlter};
		font-size: 16px;
	}
`
