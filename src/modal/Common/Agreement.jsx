import React, { useEffect } from 'react'
import { useState } from 'react'

import {
	ModalContainer,
	ModalSubContainer,
	NonFadeOverlay,
	BlueBarHeader,
	BlueSubContainer,
	WhiteCloseBtn,
	BSCSWrap,
	AgreementMain,
	AgreementBottom,
	AgreementTop,
	FadeOverlay,
} from '../Common/Common.Styled'

import { blueModalAtom } from '../../store/Layout/Layout'
import { useAtom } from 'jotai'
import { GreyBtn } from '../../common/Button/Button'

import { ExRadioWrap } from '../External/ExternalFilter'
import { RadioMainDiv, RadioCircleDiv, RadioInnerCircleDiv } from '../../common/Check/RadioImg'
import { CheckBox } from '../../common/Check/Checkbox'
import { styled } from 'styled-components'

const Agreement = ({ setAgreementModal, setCheckAgreement, agreementOnClickHandler }) => {
	const [isModal, setIsModal] = useAtom(blueModalAtom)

	const modalClose = () => {
		setIsModal(false)
	}

	const radioDummy = ['동의', '동의하지 않음']
	const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))

	useEffect(() => {
		let agreementValue = checkRadio[0] ? 'Y' : 'N'
		setCheckAgreement((prev) => ({
			...prev,
			agreement: agreementValue,
		}))
	}, [checkRadio])

	return (
		// 입찰 동의서
		<div>
			<FadeOverlay />
			<ModalContainer width={850} style={{ top: '50%' }}>
				<BlueBarHeader
					// onClick={() => {
					// 	setAgreementModal(false)
					// }}
					style={{ height: '0px' }}
				></BlueBarHeader>
				<AgreementMain>
					<h6>입찰 동의서</h6>
					<AgreementTop>
						<div>
							<h6>1. 자격 조건 :</h6>
							<div>
								<p> 기존 거래 업체 : 신규 입찰 참여 업체(입찰 직전일 등록 완료 업체)</p>
							</div>
						</div>
						<div>
							<h6>2.입찰 시기:</h6>
							<div>
								<p> 월 ~ 금 2회 (오전 09:00 ~ 10:00 / 오후 01:30 ~ 02:00 )</p>
							</div>
						</div>
						<div>
							<h6>3.입찰 조건:</h6>
							<div>
								<p>후판 - 장단위 / 10톤 이상(후판 착지별 낙찰량 10톤 미민 시, 낙찰 취소)</p>
								<span>* 제품 보증 : EN 코드 표기 불가 / 선급재의 경우, 선급인증검사 미실시 및 인증불가</span>
								<h5>주문 외 1급 - 재질 보증</h5>
								<h5>주문 외 2급 - NO CLAIM 조건</h5>
							</div>
						</div>
						<div>
							<h6>4. 응찰 가격 :</h6>
							<div>
								<p>천 원 단위(/톤) / 최고가 초과 금액 응찰 가능</p>
							</div>
						</div>
						<div>
							<h6>5. 낙찰 조건 :</h6>
							<div>
								<p>시작가 이상 최고가 응찰자로 낙찰 후 </p>
								<p>익일(영업일 기준) 12:00시 이전 현금 입금 (운임/VAT 포함)</p>
								<span>* 입금 금액 미달 시 전량 낙찰 취소 (부분 낙찰 불가)</span>
								<span>* 낙찰 후, 도착지 변경 불가</span>
							</div>
						</div>
						<div>
							<h6>6. 입금 계좌 :</h6>
							<div>
								<p>우리은행 1005-301-817070</p>
								<p>신한은행 140-013-498612</p>
								<p>기업은행 070-8889-3456, (예금주 : 주식회사 카스코철강)</p>
								<span>* 송금 수수료 구매자 부담</span>
							</div>
						</div>
						<div>
							<h6>7. 운반비 : </h6>
							<div>
								<p> 당사 운임 기준 적용 (지역별 톤당 운임)</p>
								<span>* 후판은 Size 별로 운송비 할증 존재, 착지별 낙찰 수량 25톤 미만 시 출하 지연될 수 있음.</span>
								<span>* 광폭제 (너비 3,400초과)는 착지별로 일반재와는 별도로 물량을 계산해 25톤 1대분 운임이</span>
								<span style={{ marginLeft: '12px' }}>적용될 수 있으므로 낙찰 후 추가로 운송비가 청구 될 수 있음.</span>
							</div>
						</div>
						<div>
							<h6>8. 입찰 제한 :</h6>
							<div>
								<p>1. 낙찰 후 입금 기한내 (익영업일 12:00시) 미임급 시 {'>'} 2주간 입찰 제한</p>
								<p>2. 입찰제한 2회 발생 시 {'>'} 경매 참여 자격 취소</p>
								<span>* 경매 낙찰 의도가 아닌 행위 적발 시 경매 참여가 제한됨.</span>
							</div>
						</div>
						<div>
							<h6>9. 기타사항 :</h6>
							<div>
								<p>일부 제품은 재고 표 상의 규격 정보와 다르게 마킹되어있음.</p>
								<span>* 예시) 일부 SS400, SM490 등은 제품 마킹이 선급 재질로 되어있음</span>
							</div>
						</div>
						<div>
							<h6 style={{ width: '100%' }}>10. 상기 외 사항은 일반 상관례에 준한다.</h6>
						</div>
					</AgreementTop>
					<AgreementBottom>
						<div>
							상기 사항을 확인, 동의하며 입찰에 참여합니다.
							<br /> 주식회사 카스코철강 貴中
						</div>
						<div>
							{' '}
							<ExRadioWrap>
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
							</ExRadioWrap>
						</div>
					</AgreementBottom>
					<BottomA>
						<div></div>
						<GreyBtn
							style={{ width: '180px' }}
							height={35}
							margin={25}
							fontSize={17}
							onClick={agreementOnClickHandler}
							type="button"
						>
							확인
						</GreyBtn>
						<img src="/img/logo.png" />
					</BottomA>
				</AgreementMain>
			</ModalContainer>
		</div>
	)
}

export default Agreement

const BottomA = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	img {
		position: relative;
		right: 50px;
	}
`
