import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getProNoList } from '../../api/search'
import { GreyBtn } from '../../common/Button/Button'
import useReactQuery from '../../hooks/useReactQuery'
import {
	BlueBarBtnWrap,
	BlueBarHeader,
	BlueSubContainer,
	ModalContainer,
	NonFadeOverlay,
	WhiteCloseBtn,
} from '../../modal/Common/Common.Styled'
import { proNoModalAtom } from '../../store/Layout/GlobalProductSearch'
import { useSetAtom } from 'jotai'

export default function ProNoFindModal({ setData }) {
	const setProNoModalAtom = useSetAtom(proNoModalAtom)

	const [search, setSearch] = useState('') // 필터 텍스트를 저장하는 상태 변수
	const [list, setList] = useState([])

	const { data: proNoList } = useReactQuery({}, 'getProNoList', getProNoList)

	const onFindButtonClick = () => {
		if (!search) {
			setList(proNoList)
			return
		}
		const newList = proNoList?.filter((item) => item.number === search)
		setList(newList)
	}

	const closeModal = () => {
		setProNoModalAtom(false)
	}

	const onClickHandler = (value) => {
		setData(value)
		closeModal()
	}

	useEffect(() => {
		if (proNoList) {
			setList([{ number: '전체', uid: '' }, ...proNoList])
		}
	}, [proNoList])

	return (
		<div>
			<>
				<NonFadeOverlay />
				<ModalContainer width={600} style={{ borderRadius: '4px', boxShadow: '0px 4px 20px 0px rgba(0,0,0,0.10)' }}>
					<BlueBarHeader style={{ borderTopLeftRadius: '4px', borderTopRightRadius: '10px' }}>
						<div>Pro.No 찾기</div>
						<div>
							<WhiteCloseBtn onClick={closeModal} src="/svg/white_btn_close.svg" />
						</div>
					</BlueBarHeader>
					<BlueSubContainer style={{ padding: '30px' }}>
						<FindSpec>
							<FSTitle>
								<div style={{ fontSize: '16px', justifyContent: 'space-evenly' }}>검색</div>
								<RBInput placeholder="pro.no 검색" value={search} onChange={(e) => setSearch(e.target.value)} />
								<GreyBtn width={13} height={30} fontSize={16} onClick={onFindButtonClick}>
									찾기
								</GreyBtn>
							</FSTitle>
							<FSResult>
								{list?.map((x, index) => (
									<ResultBlock key={index} onClick={() => onClickHandler(x.number)}>
										{x.number}
									</ResultBlock>
								))}
							</FSResult>
						</FindSpec>
					</BlueSubContainer>
					<BlueBarBtnWrap></BlueBarBtnWrap>
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
