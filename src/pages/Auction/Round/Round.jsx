import { useCallback, useEffect, useRef, useState } from 'react'
import { WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import {
	auctionRoundEditPageAtom,
	btnCellUidAtom,
	roundPostModalAtom,
	selectedRowsAtom2,
	toggleAtom,
} from '../../../store/Layout/Layout'

import Table from '../../Table/Table'

import {
	FilterContianer,
	FilterHeader,
	StyledHeading,
	StyledSubHeading,
	SubTitle,
	TableContianer,
	TCSubContainer,
} from '../../../modal/External/ExternalFilter'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { isArray, isEqual } from 'lodash'
import { deleteAuction, getAuction } from '../../../api/auction/round'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import { AuctionRoundFields, AuctionRoundFieldsCols } from '../../../constants/admin/Auction'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import AuctionRound from '../../../modal/Multi/AuctionRound'
import useAlert from '../../../store/Alert/useAlert'
import TableV2HiddenSection from '../../Table/TableV2HiddenSection'
import RoundAucListEdit from './RoundAucListEdit'
import RoundSearchFields from './RoundSearchFields'

const Round = ({}) => {
	const { simpleConfirm, simpleAlert } = useAlert()
	const [uidAtom, setUidAtom] = useAtom(btnCellUidAtom)
	const [roundModal, setRoundModal] = useAtom(roundPostModalAtom)
	const [editPage, setEditPage] = useAtom(auctionRoundEditPageAtom)
	const [types, setTypes] = useState('단일')

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

	// api호출, 리액트쿼리 / filter
	const [getRow, setGetRow] = useState('')
	const tableField = useRef(AuctionRoundFieldsCols)
	const getCol = tableField.current
	const queryClient = useQueryClient()
	const checkedArray = useAtom(selectedRowsAtom2)[0]

	const initialParamState = {
		pageNum: 1,
		pageSize: 10000,
		type: types,
	}

	const [originalRow, setOriginalRow] = useState([]) //원본 row를 저장해서 radio check에러 막기

	const [param, setParam] = useState(initialParamState)
	const [tablePagination, setTablePagination] = useState([])

	useEffect(() => {
		setParam((prevParams) => ({
			...prevParams,
			type: types,
		}))
	}, [types])

	const { isLoading, isError, data, isSuccess, refetch } = useReactQuery(param, 'auction', getAuction)

	const resData = data?.data?.data?.list

	const resPagination = data?.data?.data?.pagination
	const onPageChange = (value) => {
		setParam((prevParam) => ({
			...prevParam,
			pageNum: Number(value),
		}))
	}

	useEffect(() => {
		let getData = resData
		//타입, 리액트쿼리, 데이터 확인 후 실행
		if (!isSuccess && !resData) return
		if (Array.isArray(getData)) {
			setGetRow(add_element_field(getData, AuctionRoundFields))
			setTablePagination(resPagination)
		}
	}, [isSuccess, resData])

	const matchingData = resData?.find((data) => data.uid === uidAtom)
	const auctionNum = matchingData?.number
	const auctionStatus = matchingData?.status

	// const 임의의UID = 22 //임의의 uid값 * 현재 에러나옴
	// const mutation = useMutationQuery('auction', () => deleteAuction(임의의UID))

	// const handleRemoveBtn = useCallback(() => {
	//   mutation.mutate()
	// }, [mutation])

	// 삭제
	const mutation = useMutation(deleteAuction, {
		onSuccess: () => {
			queryClient.invalidateQueries('auction')
			simpleAlert('삭제 되었습니다.', () => {
				refetch()
			})
		},
		onError: () => {
			simpleAlert('오류가 발생했습니다. 다시 시도해주세요.')
		},
	})

	const handleRemoveBtn = useCallback(() => {
		if (!isArray(checkedArray) || !checkedArray.length > 0) return simpleAlert('삭제할 항목을 선택해주세요.')

		// 삭제할 수 없는 데이터들입니다.
		const cannotRemoveOptions = checkedArray.some((data) => data['경매 상태'] === ('진행중' || '종료'))
		if (cannotRemoveOptions) return simpleAlert('진행중이거나 종료인 경매 상태는 삭제할 수 없습니다.')
		simpleConfirm('선택한 항목을 삭제하시겠습니까?', () =>
			checkedArray.forEach((item) => {
				mutation.mutate(item['고유 번호']) //mutation.mutate로 api 인자 전해줌
			}),
		)
	}, [checkedArray])

	useEffect(() => {
		// 컴포넌트가 언마운트될 때 switchEdit을 재설정하는 정리 함수
		return () => {
			setEditPage(false)
			setRoundModal(false)
		}
	}, [])

	const globalProductResetOnClick = () => {
		setParam(initialParamState)
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
			{editPage ? (
				<RoundAucListEdit
					setEditPage={setEditPage}
					types={types}
					uidAtom={uidAtom}
					auctionNum={auctionNum}
					auctionStatus={auctionStatus}
					roundPageRefetch={refetch}
				/>
			) : (
				<FilterContianer>
					<FilterHeader>
						<div style={{ display: 'flex' }}>
							<h1>경매 회차 관리</h1>
							<SubTitle>
								<StyledHeading isActive={types === '단일'} onClick={() => setTypes('단일')}>
									단일
								</StyledHeading>
								<StyledSubHeading isActive={types === '패키지'} onClick={() => setTypes('패키지')}>
									패키지
								</StyledSubHeading>
							</SubTitle>
						</div>
						{/* 토글 쓰기 */}
						<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
					</FilterHeader>
					{exFilterToggle && (
						<>
							<GlobalProductSearch
								param={param}
								isToggleSeparate={true}
								renderCustomSearchFields={(props) => <RoundSearchFields {...props} />} // 만들어야함 -> WinningSearchFields
								globalProductSearchOnClick={globalProductSearchOnClick} // import
								globalProductResetOnClick={globalProductResetOnClick} // import
							/>
						</>
					)}
					<TableContianer>
						<TCSubContainer bor>
							<div>
								조회 목록 (선택 <span>{checkedArray.length}</span> / {resData?.length}개 )
								<TableV2HiddenSection />
							</div>
							<div style={{ display: 'flex', gap: '10px' }}>
								{/* <PageDropdown handleDropdown={(e) => onSizeChange(e, setParam)} /> */}
								<Excel getRow={getRow} sheetName="경매 회차 관리" />
							</div>
						</TCSubContainer>
						<TCSubContainer>
							<div></div>
							<div style={{ display: 'flex', gap: '10px' }}>
								<WhiteRedBtn onClick={handleRemoveBtn}>회차 삭제</WhiteRedBtn>
								<WhiteSkyBtn
									onClick={() => {
										setRoundModal(true)
									}}
								>
									경매 회차 등록
								</WhiteSkyBtn>
							</div>
						</TCSubContainer>
						<Table
							getCol={getCol}
							getRow={getRow}
							tablePagination={tablePagination}
							onPageChange={onPageChange}
							loading={isLoading}
						/>
						{roundModal && <AuctionRound setRoundModal={setRoundModal} types={types} refetch={refetch} />}
					</TableContianer>
				</FilterContianer>
			)}
		</>
	)
}

export default Round
