import React, { useEffect, useState } from 'react'
import {
	Bar,
	BlueBarHeader,
	BlueBlackBtn,
	BlueBtnWrap,
	BlueInput,
	BlueMainDiv,
	BlueRadioWrap,
	BlueSubContainer,
	BlueSubDiv,
	FadeOverlay,
	ModalContainer,
	WhiteCloseBtn,
} from '../Common/Common.Styled'

import { styled } from 'styled-components'
import { useShipmentAddExtraCostMutation } from '../../api/shipment'
import { RadioSearchButton } from '../../components/Search'

import { getAdminTransportation } from '../../service/admin/Standard'
import { formatWeight } from '../../utils/utils'

const initData = {
	orderUid: '',
	extraType: null,
	extraCost: 0,
	extraContents: '',
	isFreightCost: false,
	transportationCost: 0,
	extraFreightCost: 0,
}

const isNumber = (value) => /^\d*$/.test(value)

const Achievement = ({ setAddedModal, data }) => {
	const [param, setParam] = useState(initData)
	const onChange = (key, value) => setParam((prev) => ({ ...prev, [key]: value }))
	const onNumberChange = (key, value) => {
		let newValue = value.replace(/,/g, '')
		if (!isNumber(newValue)) newValue = ''
		setParam((prev) => ({ ...prev, [key]: newValue }))
	}

	const { mutate: addExtraCost } = useShipmentAddExtraCostMutation() // 추가비 및 공차비 추가

	// 추가비 및 공차비 추가
	const onAddExtraCost = () => {
		if (param.extraType === null && !param.isFreightCost) {
			return window.alert('추가할 내용을 입력해주세요.')
		}
		const body = {
			orderUid: data?.orderUid,
			outNumber: data?.outNumber,
			customerDestinationUid: data?.customerDestinationUid,
		}
		if (param.extraType !== null) {
			body.extraType = param.extraType
			body.extraCost = Number(param.extraCost)
			body.extraContents = param.extraType
		}
		if (!!param.isFreightCost) {
			body.extraFreightCost = param.extraFreightCost
		}
		addExtraCost(body)
	}

	const modalClose = () => setAddedModal(false)

	// 운반비 단가 조회
	const getTransportation = async () => {
		const paramData = {
			pageNum: 1,
			pageSize: 5,
			type: 1, // (0: 매입 / 1: 매출)
			storage: data?.storageName,
			destinationName: data.destinationName,
			destinationCode: data.destinationCode,
		}
		const response = await getAdminTransportation(paramData)
		const transportationCost = response?.data?.data?.list[0].effectCost ?? 0
		const weight = data?.weight ?? 0
		onChange('transportationCost', transportationCost)
		onChange('extraFreightCost', Math.floor(weight * transportationCost) / 1000)
	}

	useEffect(() => {
		if (data) {
			getTransportation()
		}
	}, [data])

	return (
		// 판매 제품 관리 - 패키지 관리
		<>
			<FadeOverlay />
			<ModalContainer width={500}>
				<BlueBarHeader>
					<div>추가비 및 공차비 추가</div>
					<div>
						<WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
					</div>
				</BlueBarHeader>
				<BlueSubContainer>
					<div>
						<BlueMainDiv>
							<BlueSubDiv style={{ height: '30px', margin: 0 }}>
								<h6>출고번호</h6>
								<p style={{ color: '#4C83D6' }}>{data?.outNumber ?? '-'}</p>
							</BlueSubDiv>
						</BlueMainDiv>
						<BlueMainDiv>
							<BlueSubDiv style={{ height: '30px', margin: 0 }}>
								<h6>고객사</h6>
								<p>{data?.customerName ?? '-'}</p>
							</BlueSubDiv>
						</BlueMainDiv>
						<Bar width={90} color="#c8c8c8" top={15} />
						<BlueMainDiv style={{ border: 'none' }}>
							<BlueSubDiv style={{ height: '50px' }}>
								<BlueRadioWrap style={{ gap: '50px', padding: '0px', marginLeft: '-10px' }}>
									<RadioSearchButton
										options={[
											{ label: '해당 없음', value: null },
											{ label: '추가', value: '추가' },
											{ label: '감소', value: '감소' },
										]}
										value={param.extraType}
										onChange={(value) => onChange('extraType', value)}
									/>
								</BlueRadioWrap>
							</BlueSubDiv>
							{param.extraType && (
								<BlueInput
									value={Number(param.extraCost).toLocaleString()}
									onChange={(e) => onNumberChange('extraCost', e.target.value)}
									placeholder={param.extraType === '추가' ? '추가 금액을 입력해 주세요.' : '차감 금액을 입력해 주세요.'}
								/>
							)}
						</BlueMainDiv>

						<BlueRadioWrap style={{ marginLeft: '20px' }}>
							<RadioSearchButton
								title={'공차비'}
								options={[
									{ label: '미포함', value: false },
									{ label: '포함', value: true },
								]}
								value={param.isFreightCost}
								onChange={(value) => onChange('isFreightCost', value)}
							/>
						</BlueRadioWrap>
						{param.isFreightCost && (
							<BlueMainDiv style={{ border: 'none' }}>
								<div style={{ display: 'flex', gap: '20px' }}>
									<InputColWrap>
										<p>제품 중량</p>
										<BlueInput value={formatWeight(Number(data?.weight))} readOnly />
										<AbsoluteDiv>*</AbsoluteDiv>
									</InputColWrap>
									<InputColWrap>
										<p>운반비 단가</p>
										<BlueInput value={formatWeight(Number(param?.transportationCost))} readOnly />
										<AbsoluteDiv>=</AbsoluteDiv>
									</InputColWrap>
									<InputColWrap>
										<p>공차비</p>
										<BlueInput value={formatWeight(Number(param?.extraFreightCost))} readOnly />
									</InputColWrap>
								</div>
							</BlueMainDiv>
						)}
					</div>
					<BlueBtnWrap>
						<BlueBlackBtn onClick={onAddExtraCost}>저장</BlueBlackBtn>
					</BlueBtnWrap>
				</BlueSubContainer>
			</ModalContainer>
		</>
	)
}

export default Achievement

const InputColWrap = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 4px;
	position: relative;

	& p {
		font-size: 16px;
		color: #6b6b6b;
	}

	& input {
		width: 100%;
	}
`
const AbsoluteDiv = styled.div`
	position: absolute;
	bottom: 7px;
	right: -16px;
`
