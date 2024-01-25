import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Test3 from '../../Test/Test3'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { packageUidsAtom, selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'
import { useAtom, useAtomValue } from 'jotai'
import {
	FilterContianer,
	FilterHeader,
	TableContianer,
	SubTitle,
	TCSubContainer,
	TableBottomWrap,
} from '../../../modal/External/ExternalFilter'
import { WhiteBlackBtn, WhiteRedBtn, BlackBtn } from '../../../common/Button/Button'
import Hidden from '../../../components/TableInner/Hidden'
import useReactQuery from '../../../hooks/useReactQuery'
import useMutationQuery from '../../../hooks/useMutationQuery'
import Table from '../../Table/Table'
import { getPackageList, patchBeBestPackageRecommend, patchChangeBestPackageRecommend } from '../../../api/SellProduct'
import { add_element_field } from '../../../lib/tableHelpers'
import { packageDispatchFieldsCols, packageDispatchFields } from '../../../constants/admin/SellPackage'
import { packageRecommendDispatchFieldsCols } from '../../../constants/admin/Remcommed'
import useAlert from '../../../store/Alert/useAlert'
const RecommendPack = ({}) => {
	const handleSelectChange = (selectedOption, name) => {
		// setInput(prevState => ({
		//   ...prevState,
		//   [name]: selectedOption.label,
		// }));
	}
	const [isRotated, setIsRotated] = useState(false)

	// Function to handle image click and toggle rotation
	const handleImageClick = () => {
		setIsRotated((prevIsRotated) => !prevIsRotated)
	}

	// 토글 쓰기
	const [exFilterToggle, setExfilterToggle] = useState(toggleAtom)
	const [packages, setPackages] = useAtom(packageUidsAtom)
	const [parameter, setParmeter] = useState({
		pageNum: 1,
		pageSize: 50,
		saleType: '',
		bestStatus: '1',
	})
	const tableFields = useRef(packageRecommendDispatchFieldsCols)
	const getCol = tableFields.current
	const [getRow, setGetRow] = useState('')
	const [pages, setPages] = useState([])
	const { data, isSuccess, refetch } = useReactQuery(parameter, 'package-list', getPackageList)
	const packageList = data?.r
	const pagination = data?.pagination
	const checkBoxSelect = useAtomValue(selectedRowsAtom)
	const [selectUid, setSelectUid] = useState([])
	const [toggleMsg, setToggleMsg] = useState('On')
	const toggleBtnClick = () => {
		setExfilterToggle((prev) => !prev)
		if (exFilterToggle === true) {
			setToggleMsg('Off')
		} else {
			setToggleMsg('On')
		}
	}
	const [uids, setUids] = useAtom(packageUidsAtom)
	const { mutate } = useMutationQuery('patchPkgBest', patchChangeBestPackageRecommend)
	const { mutate: beTheRecommend } = useMutationQuery('patchPkgBeRecommend', patchBeBestPackageRecommend)

	useEffect(() => {
		if (checkBoxSelect) return setSelectUid(() => checkBoxSelect.map((i) => i['고유 번호']))
	}, [checkBoxSelect])
	const handleChangeBest = () => {
		mutate(
			{ uids: uids },
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
			{ status: false, uids: selectUid },
			{
				onSuccess: () => {
					alert('해제완료')
					window.location.reload()
				},
			},
		)
	}
	useEffect(() => {
		if (!isSuccess && !packageList) return
		if (Array.isArray(packageList)) {
			setGetRow(add_element_field(packageList, packageDispatchFields))
			setPages(pagination)
		}
	}, [isSuccess, packageList])
	const { simpleConfirm, showAlert } = useAlert()
	return (
		<FilterContianer>
			<FilterHeader>
				<div style={{ display: 'flex' }}>
					<h1>카스코 추천 제품 관리</h1>
					<SubTitle>
						<Link to={`/product/recommend`}>
							<h6>단일</h6>
						</Link>
						<h5>패키지</h5>
					</SubTitle>
				</div>
			</FilterHeader>

			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>2</span> / 50개 )
						<Hidden />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}></div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택 중량<span> 2 </span>kg / 총 중량 kg
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteBlackBtn>
							<img src="/img/belly.png" /> 순서 변경
						</WhiteBlackBtn>
						<WhiteRedBtn onClick={handleRemoveBest}>추천 상품 해제</WhiteRedBtn>
					</div>
				</TCSubContainer>
				<Table getRow={getRow} getCol={getCol} dragAndDrop={true} />
				<TableBottomWrap>
					<BlackBtn
						width={15}
						height={40}
						onClick={() => {
							simpleConfirm('저장하시겠습니까?', handleChangeBest)
						}}
					>
						저장
					</BlackBtn>
				</TableBottomWrap>
			</TableContianer>
		</FilterContianer>
	)
}

export default RecommendPack
