import { useState } from 'react'
import { styled } from 'styled-components'
import { storageOptions } from '../../../common/Option/SignUp'

import { MainSelect } from '../../../common/Option/Main'
import { BlackBtn, BtnWrap, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import DateGrid from '../../../components/DateGrid/DateGrid'
import { ToggleBtn, Circle, Wrapper } from '../../../common/Toggle/Toggle'
import { GreyBtn } from '../../../common/Button/Button'
import Test3 from '../../Test/Test3'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { toggleAtom } from '../../../store/Layout/Layout'
import BlueBar from '../../../modal/BlueBar/BlueBar'
import { blueModalAtom } from '../../../store/Layout/Layout'
import { useAtom } from 'jotai'
import { FilterWrap } from '../../../modal/External/ExternalFilter'
import {
	TCSubContainer,
	FilterContianer,
	FilterHeader,
	FilterFooter,
	FilterSubcontianer,
	FilterLeft,
	FilterRight,
	RowWrap,
	PartWrap,
	PWRight,
	Input,
	GridWrap,
	Tilde,
	DoubleWrap,
	ResetImg,
	TableContianer,
	InputStartWrap,
	FilterHeaderAlert,
} from '../../../modal/External/ExternalFilter'
import Hidden from '../../../components/TableInner/Hidden'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import UserManangeSearchFields from '../UserManage/UserManangeSearchFields'
import { isEqual } from 'lodash'

const CarrierManage = ({}) => {
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

	const paramData = {
		pageNum: 1,
		pageSize: 50,
	}

	const [param, setParam] = useState(paramData)

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

	console.log('isModal =>', isModal)

	const modalOpen = () => {
		setIsModal(true)
	}

	const globalProductResetOnClick = () => {
		// if resetting the search field shouldn't rerender table
		// then we need to create paramData object to reset the search fields.
		setParam(paramData)
	}
	// import
	const globalProductSearchOnClick = (userSearchParam) => {
		setParam((prevParam) => {
			if (isEqual(prevParam, { ...prevParam, ...userSearchParam })) {
				// refetch()
				return prevParam
			}
			return {
				...prevParam,
				...userSearchParam,
			}
		})
	}

	return (
		<FilterContianer>
			<div>
				<FilterHeader>
					<h1>운송사 관리</h1>
					{/* 토글 쓰기 */}
					<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
				</FilterHeader>
				{exFilterToggle && (
					<FilterWrap>
						{/* <FilterSubcontianer>
							<FilterLeft>
								<RowWrap>
									<PartWrap>
										<h6 style={{ width: '100px' }}>고객사 검색</h6>
										<MainSelect />
										<Input style={{ marginLeft: '10px' }} />
										<GreyBtn style={{ width: '70px' }} height={35} margin={10} onClick={modalOpen}>
											찾기
										</GreyBtn>
									</PartWrap>
								</RowWrap>
							</FilterLeft>
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
						</FilterFooter> */}
						<GlobalProductSearch
							param={param}
							isToggleSeparate={true}
							renderCustomSearchFields={(props) => <UserManangeSearchFields {...props} />} //
							globalProductSearchOnClick={globalProductSearchOnClick}
							globalProductResetOnClick={globalProductResetOnClick}
						/>
					</FilterWrap>
				)}
			</div>

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
						<WhiteRedBtn>
							<img src="/img/delete_member.png" />
							운송사 삭제
						</WhiteRedBtn>
						<WhiteSkyBtn>
							<img src="/img/add_member.png" />
							운송사 등록
						</WhiteSkyBtn>
					</div>
				</TCSubContainer>
				<Test3 />
			</TableContianer>
		</FilterContianer>
	)
}

export default CarrierManage
