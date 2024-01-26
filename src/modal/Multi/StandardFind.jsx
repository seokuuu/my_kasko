import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { getSpecList } from '../../api/search'
import { BlackBtn, GreyBtn } from '../../common/Button/Button'
import useReactQuery from '../../hooks/useReactQuery'
import {
	BlueBarBtnWrap,
	BlueBarHeader,
	BlueSubContainer,
	ModalContainer,
	NonFadeOverlay,
	WhiteCloseBtn,
} from '../../modal/Common/Common.Styled'

export default function StandardFind({ closeFn }) {
	const array = []
	// const [isModal, setIsModal] = useAtom(blueModalAtom)
	const [filterText, setFilterText] = useState('') // 필터 텍스트를 저장하는 상태 변수
	const [filterUid, setFilterUid] = useState(0)
	const [selectedCountry, setSelectedCountry] = useState('')

	const { data: list } = useReactQuery({}, 'getSpecList', getSpecList)
	const [filter, setFilter] = useState([])

	useEffect(() => {
		const res = list && list.filter((li) => li.spec.includes(filterText))

		console.log('규격약호 목록 :', res)
		if (filterText && list) {
			setFilter(res)
		} else {
			setFilter(list)
		}
	}, [filterText, list])
	const gridRef = useRef()

	const onFindButtonClick = () => {
		const res = list && list.filter((li) => li.spec.includes(filterText))
		if (filterText) {
			setFilter(res)
		} else {
			setFilter(list)
		}
	}

	const handleResultBlockClick = useCallback((country) => {
		setSelectedCountry(country)
		setFilterText(country) // 클릭한 국가로 필터 텍스트를 설정합니다
	}, [])
	return (
		<div>
			<>
				<NonFadeOverlay />
				<ModalContainer width={600} style={{ borderRadius: '4px', boxShadow: '0px 4px 20px 0px rgba(0,0,0,0.10)' }}>
					<BlueBarHeader style={{ borderTopLeftRadius: '4px', borderTopRightRadius: '10px' }}>
						<div>규격 약호 찾기</div>
						<div>
							<WhiteCloseBtn onClick={closeFn} src="/svg/white_btn_close.svg" />
						</div>
					</BlueBarHeader>
					<BlueSubContainer style={{ padding: '30px' }}>
						<FindSpec>
							<FSTitle>
								<div style={{ fontSize: '16px', justifyContent: 'space-evenly' }}>검색</div>
								<RBInput
									placeholder="회사 명"
									ref={gridRef}
									value={filterText}
									onChange={(e) => setFilterText(e.target.value)}
								/>
								<GreyBtn width={13} height={30} fontSize={16} onClick={onFindButtonClick}>
									찾기
								</GreyBtn>
							</FSTitle>
							<FSResult>
								{filter?.map((x, index) => {
									return (
										<ResultBlock
											key={index}
											onClick={() => {
												console.log('x ;', x)
												handleResultBlockClick(x.spec)
												setFilterUid(x.uid)
											}}
										>
											{x.spec}
										</ResultBlock>
									)
								})}
							</FSResult>
						</FindSpec>
					</BlueSubContainer>
					<BlueBarBtnWrap>
						<BlackBtn onClick={(e) => closeFn(e, filterText, filterUid)} width={30} height={40}>
							확인
						</BlackBtn>
					</BlueBarBtnWrap>
				</ModalContainer>
			</>
		</div>
	)
}

const FindSpec = styled.div`
	width: 100%;
	height: 250px;
`

const FSTitle = styled.div`
	width: 100%;
	height: 50px;
	border: 1px solid #c8c8c8;
	display: flex;
	align-items: center;
	justify-content: space-around;

	& > * {
	}

	input {
		border: 1px solid #c8c8c8;
		height: 30px;
		width: 300px;
	}
`

const FSResult = styled.div`
	width: 100%;
	height: 230px;
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	padding: 10px;
	overflow-y: scroll;
	border: 1px solid #c8c8c8;
`

const ResultBlock = styled.div`
	width: 23%;
	height: 45px;
	background-color: #f1f1f1;
	cursor: pointer;
	font-size: 16px;
	justify-content: center;
	align-items: center;
	text-align: center;
	display: flex;
	margin-left: 2px;
`

const RBInput = styled.input`
	font-size: 16px;
`
