import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'

import { BlackBtn, WhiteBtn } from '../../../common/Button/Button'
import { CenterRectangleWrap } from '../../../common/OnePage/OnePage.Styled'
import { claimOngoingStatus } from '../../../common/Option/ClaimPost'
import DateGrid from '../../../components/DateGrid/DateGrid'
import TextEditor from '../../../components/Editor/TextEditor'

import { CheckImg2, StyledCheckMainDiv, StyledCheckSubSquDiv } from '../../../common/Check/CheckImg'

import { CheckBox } from '../../../common/Check/Checkbox'

import { MainSelect } from '../../../common/Option/Main'
import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle, DateTitle } from '../../../components/MapTable/MapTable'
import { useLocation, useNavigate } from 'react-router-dom'
import { useShipmentClaimRegisterMutation } from '../../../api/operate/claim'
import moment from 'moment'

const checkDummy = ['카스코', '현대제철']

/**
 * @description
 * 사용처 : 출고 관리> 출고 실적, 운영 관리 > 클레임 등록
 * @returns
 */
const ClaimRegister = () => {
	const { state: data } = useLocation()
	const navigate = useNavigate()
	const { mutate: createClaim } = useShipmentClaimRegisterMutation()

	const [check, setCheck] = useState(Array.from({ length: 2 }, () => false))
	const [form, setForm] = useState({
		content: '',
		productUid: data.productUid,
		auctionNumber: data.orderNumber,
		claimStatus: '진행중',
		requestDate: '',
		registrationDate: '',
		processor: '카스코',
		kaskoReturnDate: '',
		hsReturnDate: '',
		endDate: '',
	})

	// onchange
	const onChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

	// 등록
	const onSubmit = () => {
		const param = {
			...form,
			requestDate: moment(form.requestDate).format('YYYY-MM-DD HH:mm:ss'),
			registrationDate: moment(form.registrationDate).format('YYYY-MM-DD HH:mm:ss'),
			kaskoReturnDate: moment(form.kaskoReturnDate).format('YYYY-MM-DD HH:mm:ss'),
			hsReturnDate: moment(form.hsReturnDate).format('YYYY-MM-DD HH:mm:ss'),
			endDate: moment(form.endDate).format('YYYY-MM-DD HH:mm:ss'),
		}
		console.log(param)
		createClaim(param)
	}

	// 체크박스(반품 진행)
	useEffect(() => {
		const updatedCheck = checkDummy.map((value, index) => {
			return check[index] ? value : ''
		})
		const filteredCheck = updatedCheck.filter((item) => item !== '')
		setForm((p) => ({ ...p, processor: filteredCheck }))
	}, [check])

	return (
		<>
			<CenterRectangleWrap>
				<CRWMain>
					<h5>클레임 등록</h5>
					<ClaimRow>
						<ClaimTitle style={{ width: '50%' }}>업체명</ClaimTitle>
						<ClaimContent style={{ width: '50%' }}>{data.customerName}</ClaimContent>
					</ClaimRow>
					<ClaimTable>
						<ClaimRow>
							<ClaimTitle style={{ width: '50%' }}>제품 번호</ClaimTitle>
							<ClaimContent style={{ width: '50%' }}>{data.productNumber}</ClaimContent>
						</ClaimRow>
						<ClaimRow>
							<ClaimTitle>두께</ClaimTitle>
							<ClaimContent>{data.thickness}</ClaimContent>
							<ClaimTitle>폭</ClaimTitle>
							<ClaimContent>{data.width}</ClaimContent>
							<ClaimTitle>길이</ClaimTitle>
							<ClaimContent>{data.length}</ClaimContent>
						</ClaimRow>
						<ClaimRow>
							<ClaimTitle>규격약호</ClaimTitle>
							<ClaimContent>{data.spec}</ClaimContent>
							<ClaimTitle>중량(kg)</ClaimTitle>
							<ClaimContent>{data.weight}</ClaimContent>
							<ClaimTitle>매입처</ClaimTitle>
							<ClaimContent>{data.supplier}</ClaimContent>
						</ClaimRow>
					</ClaimTable>
					<h4>내용</h4>
					<TextEditor name="content" setState={setForm} />
					<CRWMainBottom>
						<CMBLeft>
							<div>
								<DateTitle>클레임 요청 일자</DateTitle>
								<DateGrid
									width={130}
									left={-30}
									fontSize={17}
									startDate={form.requestDate}
									setStartDate={(date) => onChange('requestDate', date)}
								/>
							</div>
							<div>
								<DateTitle>현대 제철 클레임 요청 일자</DateTitle>
								<DateGrid
									width={130}
									left={-30}
									fontSize={17}
									startDate={form.registrationDate}
									setStartDate={(date) => onChange('registrationDate', date)}
								/>
							</div>
							<div>
								<DateTitle>클레임 완료 일자</DateTitle>
								<DateGrid
									width={130}
									left={-30}
									fontSize={17}
									startDate={form.endDate}
									setStartDate={(date) => onChange('endDate', date)}
								/>
							</div>
						</CMBLeft>
						<CMBLeft>
							<SelectWrap>
								<DateTitle style={{ width: '150px' }}>클레임 진행 상태</DateTitle>
								<MainSelect
									options={claimOngoingStatus}
									defaultValue={claimOngoingStatus[0]}
									name="claimStatus"
									onChange={(e) => onChange('claimStatus', e.label)}
								/>
							</SelectWrap>
							<div>
								<DateTitle small>반품 진행</DateTitle>
								<CheckWrap>
									{checkDummy.map((x, index) => (
										<StyledCheckMainDiv>
											<StyledCheckSubSquDiv
												onClick={() => setCheck(CheckBox(check, check.length, index, true))}
												isChecked={check[index]}
											>
												<CheckImg2 src="/svg/check.svg" isChecked={check[index]} />
											</StyledCheckSubSquDiv>
											<p>{x}</p>
										</StyledCheckMainDiv>
									))}
								</CheckWrap>
							</div>
							<div>
								<DateTitle small>카스코 반품일자</DateTitle>
								<DateGrid
									width={130}
									left={-45}
									fontSize={17}
									startDate={form.kaskoReturnDate}
									setStartDate={(date) => onChange('kaskoReturnDate', date)}
								/>
							</div>
							<div>
								<DateTitle small>현대제철 반품일자</DateTitle>
								<DateGrid
									width={130}
									left={-45}
									fontSize={17}
									startDate={form.hsReturnDate}
									setStartDate={(date) => onChange('hsReturnDate', date)}
								/>
							</div>
						</CMBLeft>
					</CRWMainBottom>
					<CRWSub>
						<BtnWrap>
							<WhiteBtn width={40} height={40} style={{ marginRight: '10px' }} onClick={() => navigate(-1)}>
								돌아가기
							</WhiteBtn>
							<BlackBtn width={40} height={40} onClick={onSubmit}>
								저장
							</BlackBtn>
						</BtnWrap>
					</CRWSub>
				</CRWMain>
			</CenterRectangleWrap>
		</>
	)
}

export default ClaimRegister

export const CRWMain = styled.div`
	width: 100%;

	h4 {
		margin-top: 20px;
	}

	h5 {
		margin: 30px auto;
		text-align: center;
		font-size: 24px;
	}

	h6 {
		margin-bottom: 30px;
		text-align: center;
		font-size: 16px;
	}
`

export const CRWMainBottom = styled.div`
	width: 100%;
	height: fit-content;

	margin: 10px 0px;
	display: flex;
	justify-content: space-around;
`

export const CMBLeft = styled.div`
	width: 50%;

	> div {
		width: 400px;
		display: flex;
		margin: 10px auto;
	}
	height: fit-content;
`

export const CMBRight = styled.div`
	max-width: 50%;

	> div {
		width: 300px;
		display: flex;
		justify-content: space-between;
	}
	height: fit-content;
`

export const CRWSub = styled.div`
	display: flex;
`

const SelectWrap = styled.div`
	display: flex;
	gap: 25px;
`

const BtnWrap = styled.div`
	display: flex;
	width: 500px;
	justify-content: space-evenly;
	align-items: center;
	margin-left: auto;
	margin-right: auto;
`

const CheckWrap = styled.div`
	display: flex;
	font-size: 16px;
	align-items: center;
	min-width: 250px;
	gap: 15px;
	position: relative;
	left: 25px;
`
