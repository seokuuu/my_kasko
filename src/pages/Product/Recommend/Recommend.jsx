import React from 'react'
import { useState, useEffect, useRef, useCallback } from 'react'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { toggleAtom } from '../../../store/Layout/Layout'
import Table from '../../Table/Table'
import { TableBottomWrap } from '../../../modal/External/ExternalFilter'
import {
	FilterContianer,
	FilterHeader,
	TableContianer,
	SubTitle,
	TCSubContainer,
} from '../../../modal/External/ExternalFilter'
import { WhiteBlackBtn, WhiteRedBtn, BlackBtn } from '../../../common/Button/Button'
import { Link } from 'react-router-dom'
import { getSingleProducts, patchBeBestRecommend, patchChangeBestRecommend } from '../../../api/SellProduct'
import useReactQuery from '../../../hooks/useReactQuery'
import Hidden from '../../../components/TableInner/Hidden'
import { SingleDispatchFieldsCols, singleDispatchFields } from '../../../constants/admin/Single'
import { add_element_field } from '../../../lib/tableHelpers'
import { useAtom, useAtomValue } from 'jotai'
import { packageUidsAtom } from '../../../store/Layout/Layout'
import useMutationQuery from '../../../hooks/useMutationQuery'
import { selectedRowsAtom } from '../../../store/Layout/Layout'
import {
	singleRecommendDispatchFields,
	packageRecommendDispatchFieldsCols,
	singleRecommendDispatchFieldsCols,
} from '../../../constants/admin/Remcommed'
import { KilogramSum } from '../../../utils/KilogramSum'

const Recommend = ({}) => {
	const handleSelectChange = (selectedOption, name) => {
		// setInput(prevState => ({
		//   ...prevState,
		//   [name]: selectedOption.label,
		// }));
	}
	const [isRotated, setIsRotated] = useState(false)
	const [getRow, setGetRow] = useState('')
	// const [packageUids, setUids] = useAtom()
	const tableField = useRef(singleRecommendDispatchFieldsCols)
	const getCol = tableField.current
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
	const [dragAndDrop, setDragAndDrop] = useState(true)
	const [requestParameter, setRequestParamter] = useState({
		pageNum: 1,
		pageSize: 10,
		type: '일반',
		category: '전체',
		bestStatus: '1',
	})
	const { data, isSuccess, isLoading } = useReactQuery(requestParameter, 'product-list', getSingleProducts)
	const singleData = data?.r
	const pagination = data?.pagination

	const [pages, setPages] = useState([])
	useEffect(() => {
		// if (singleData === undefined) {
		//   SaleProductList && setFilteredData(SaleProductList)
		// }

		if (!isSuccess && !singleData) return
		if (Array.isArray(singleData)) {
			setGetRow(add_element_field(singleData, singleRecommendDispatchFields))
			setPages(pagination)
		}
		//타입, 리액트쿼리, 데이터 확인 후 실행
	}, [isSuccess, singleData])

	const onPageChange = (value) => {
		setRequestParamter((p) => ({ ...p, pageNum: Number(value) }))
	}
	const [uids, setUids] = useAtom(packageUidsAtom)
	const [selectUid, setSelectUid] = useState([])
	const checkBoxSelect = useAtomValue(selectedRowsAtom)
	console.log('체크셀렉트', checkBoxSelect)
	const { mutate } = useMutationQuery('patchBest', patchChangeBestRecommend)
	const { mutate: beTheRecommend } = useMutationQuery('patchBeRecommend', patchBeBestRecommend)

	useEffect(() => {
		if (checkBoxSelect) return setSelectUid(() => checkBoxSelect.map((i) => i['제품 번호']))
	}, [checkBoxSelect])
	const handleChangeBest = () => {
		mutate(
			{ numbers: uids },
			{
				onSuccess: () => {
					alert('순서변경 완료')
					window.location.reload()
				},
				onError: () => {
					alert('순서변경 실패')
				},
			},
		)
	}
	const handleRemoveBest = () => {
		beTheRecommend(
			{ status: false, numbers: selectUid },
			{
				onSuccess: () => {
					alert('해제완료')
					window.location.reload()
				},
			},
		)
	}

	return (
		<FilterContianer>
			<FilterHeader>
				<div style={{ display: 'flex' }}>
					<h1>카스코 추천 제품 관리</h1>
					<SubTitle>
						<h5>단일</h5>
						<Link to={`/product/recommendpkg`}>
							<h6>패키지</h6>
						</Link>
					</SubTitle>
				</div>
			</FilterHeader>

			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>{checkBoxSelect?.length > 0 ? checkBoxSelect?.length : '0'}</span> /{' '}
						{pagination?.listCount}개 )
						<Hidden />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}></div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택 중량<span> {KilogramSum(checkBoxSelect)} </span>kg / 총 {pagination?.totalWeight}kg
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteBlackBtn>
							<img src="/img/belly.png" /> 순서 변경
						</WhiteBlackBtn>
						<WhiteRedBtn onClick={handleRemoveBest}>추천 상품 해제</WhiteRedBtn>
					</div>
				</TCSubContainer>

				<Table
					getRow={getRow}
					getCol={getCol}
					loading={isLoading}
					dragAndDrop={true}
					// tablePagination={pages}
					// onPageChange={onPageChange}
				/>

				<TableBottomWrap>
					<BlackBtn width={15} height={40} onClick={handleChangeBest}>
						저장
					</BlackBtn>
				</TableBottomWrap>
			</TableContianer>
		</FilterContianer>
	)
}

export default Recommend
