import React, { useEffect, useState } from 'react'
import {
	BlueBarHeader,
	BlueBlackBtn,
	BlueBtnWrap,
	BlueDateDiv,
	BlueMainDiv,
	BlueRadioWrap,
	BlueSubContainer,
	BlueSubDiv,
	FadeOverlay,
	ModalContainer,
	WhiteCloseBtn,
} from '../Common/Common.Styled'

import { styled } from 'styled-components'

import { useAtom } from 'jotai'
import { blueModalAtom } from '../../store/Layout/Layout'

import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../common/Check/RadioImg'

import { CheckBox } from '../../common/Check/Checkbox'
import DateGrid from '../../components/DateGrid/DateGrid'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import moment from 'moment'
import { getAuctionTime, postAuction } from '../../api/auction/round'
import { CheckImg2, StyledCheckSubSquDiv } from '../../common/Check/CheckImg'
import useAlert from '../../store/Alert/useAlert'
import { ExCheckDiv, ExCheckWrap } from '../External/ExternalFilter'
import useReactQuery from '../../hooks/useReactQuery'
import { client } from '../../api'

const AuctionRound = ({ setRoundModal, types, refetch }) => {
	const [isModal, setIsModal] = useAtom(blueModalAtom)
	const queryClient = useQueryClient()
	const { simpleConfirm, simpleAlert } = useAlert()
	const modalClose = () => {
		setRoundModal(false)
	}

	const init = {
		saleType: types,
		auctionType: '',
		insertStartDate: '',
		insertEndDate: '',
		timeList: [],
	}

	const initB = {
		saleType: types,
		auctionType: '',
		insertStartDate: '',
		insertEndDate: '',
		insertStartTime: '',
		insertEndTime: '',
	}

	const [input, setInput] = useState(init)
	const [inputB, setInputB] = useState(initB)

	const [dates, setDates] = useState({
		insertStartDate: '',
		insertEndDate: '',
		addedDate: '',
	})

	const [times, setTimes] = useState({
		startHour: '',
		startMinute: '',
		endHour: '',
		endMinute: '',
	})

	const dateHandler = (date, name) => {
		setDates((p) => ({ ...p, [name]: date }))
	}

	//라디오
	const radioDummy = ['정기 경매', '추가 경매']
	const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))

	const { data } = useQuery({
		queryKey: ['getAuctionTime'],
		queryFn: getAuctionTime,
		cacheTime: 0,
	})

	const responseTimeData = data?.data?.data

	const getFormattedTime = (startTime, endTime) => {
		if (!startTime || !endTime) return ''

		const start = moment(`${startTime}`, 'HH:mm:ss').format('HH:mm')
		const end = moment(`${endTime}`, 'HH:mm:ss').format('HH:mm')
		return `${start} - ${end}`
	}

	const am = getFormattedTime(responseTimeData?.amStartTime, responseTimeData?.amEndTime)
	const pm = getFormattedTime(responseTimeData?.pmStartTime, responseTimeData?.pmEndTime)

	const getText = (type, time) => (time ? `${type} 경매 (${time})` : `${type} 경매`)
	const amText = getText('오전', am)
	const pmText = getText('오후', pm)

	//체크
	const checkDummy = [amText, pmText]
	const [check1, setCheck1] = useState(Array.from({ length: checkDummy.length }, () => false))

	//체크 useEffect
	useEffect(() => {
		const selectedTimeList = []

		if (check1[0]) {
			selectedTimeList.push('오전')
		}

		if (check1[1]) {
			selectedTimeList.push('오후')
		}

		const selectedAuctionType = radioDummy.find((_, index) => checkRadio[index])
		const formattedAuctionType = selectedAuctionType.replace(/\s/g, '')

		setInput({
			...input,
			timeList: selectedTimeList,
			auctionType: formattedAuctionType,
		})
		setInputB({
			...inputB,
			auctionType: formattedAuctionType,
		})
	}, [check1, checkRadio])

	// 날짜 YYYY-MM-DD 형식으로 변환
	useEffect(() => {
		setInput((p) => ({
			...p,
			insertStartDate: dates.insertStartDate && moment(dates.insertStartDate).format('YYYY-MM-DD'),
			insertEndDate: dates.insertStartDate && moment(dates.insertEndDate).format('YYYY-MM-DD'),
		}))
		setInputB((p) => ({
			...p,
			insertStartDate: dates.addedDate && moment(dates.addedDate).format('YYYY-MM-DD'),
			insertEndDate: dates.addedDate && moment(dates.addedDate).format('YYYY-MM-DD'),
		}))
	}, [dates])

	const timesHandler = (e) => {
		const { name, value } = e.target
		if (
			(name.includes('Hour') && (value < 0 || value > 23)) ||
			(name.includes('Minute') && (value < 0 || value > 59))
		) {
			alert('올바른 시간을 입력해주세요. (0 ~ 23시, 0 ~ 59분)')
			return // 잘못된 값이면 함수 종료
		}
		setTimes((p) => ({ ...p, [name]: value }))
	}

	// times "hh:mm" 식 변환
	useEffect(() => {
		const insertStartTime = `${times.startHour}:${times.startMinute}`
		const insertEndTime = `${times.endHour}:${times.endMinute}`
		setInputB((p) => ({
			...p,
			insertStartTime: insertStartTime,
			insertEndTime: insertEndTime,
		}))
	}, [times])

	// const mutation = useMutationQuery('', postAuction)

	const mutation = useMutation(postAuction, {
		onSuccess: () => {
			queryClient.invalidateQueries('auction')
			simpleAlert('등록 되었습니다.', () => {
				setRoundModal(false)
				refetch()
			})
		},
		onError: (error) => {
			simpleAlert(error?.data?.message || '오류가 발생했습니다. 다시 시도해주세요.')
		},
	})

	const regularException = [
		// 반복 기간 시작일과 종료일 중 하나라도 선택하지 않으면 예외처리를 해줍니다.
		{
			condition: !Boolean(input.insertStartDate) && !Boolean(input.insertEndDate),
			message: '반복 기간을 설정해주세요.',
		},
		// 시간대를 선택하지 않으면 예외처리를 해줍니다.
		{
			condition: input.timeList.length === 0,
			message: '시간대를 선택해주세요.',
		},
		// 시작일이 오늘날짜 이전이면 예외처리를 해줍니다.
		// {
		// 	condition: new Date(input.insertStartDate).getTime() < new Date().getTime(),
		// 	message: '시작일은 오늘 날짜부터 선택가능합니다.',
		// },
		// // 종료일은 시작일과 같거나 이전이면 예외처리를 해줍니다.
		// {
		// 	condition: new Date(input.insertStartDate).getDate() + 1 > new Date(input.insertEndDate).getDate(),
		// 	message: '종료일은 시작일 이후여야합니다.',
		// },
	]

	const addException = [
		{
			condition: !Boolean(dates.addedDate),
			message: '일자를 선택해주세요.',
		},
		{
			condition:
				!Boolean(times.startHour) &&
				!Boolean(times.endHour) &&
				!Boolean(times.startMinute) &&
				!Boolean(times.endMinute),
			message: '시,분을 입력해주세요.',
		},
	]

	function onSubmit() {
		if (checkRadio[0]) {
			for (let i = 0; i < regularException.length; i++) {
				if (regularException[i].condition) {
					simpleAlert(regularException[i].message)
					return
				}
			}
		} else {
			for (let i = 0; i < addException.length; i++) {
				if (addException[i].condition) {
					simpleAlert(addException[i].message)
					return
				}
			}
		}

		simpleConfirm('등록하시겠습니까?', () => mutation.mutate(checkRadio[0] ? input : inputB))
	}

	return (
		// 재고 관리 - 판매 구분 변경
		<>
			<FadeOverlay zindex={899} />
			<ModalContainer width={850} zindex={900}>
				<BlueBarHeader>
					<div>경매 회차 등록</div>
					<div>
						<WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
					</div>
				</BlueBarHeader>
				<BlueSubContainer>
					<div>
						<BlueMainDiv>
							<BlueSubDiv style={{ height: '50px' }}>
								<BlueRadioWrap>
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
								</BlueRadioWrap>
							</BlueSubDiv>
							{checkRadio[1] ? (
								<BlueSubDiv style={{ height: '80px' }} bor>
									<h6>경매 일정</h6>
									<BlueDateDiv>
										<DateGrid
											startDate={dates.addedDate}
											setStartDate={(date) => dateHandler(date, 'addedDate')}
											fontSize={16}
										/>
										<div style={{ marginLeft: '10px' }}>
											<TimeInput placeholder="0시" name="startHour" value={times.startHour} onChange={timesHandler} />
											<TimeInput
												placeholder="0분"
												name="startMinute"
												value={times.startMinute}
												onChange={timesHandler}
											/>
											~ <TimeInput placeholder="0시" name="endHour" value={times.endHour} onChange={timesHandler} />
											<TimeInput placeholder="0분" name="endMinute" value={times.endMinute} onChange={timesHandler} />
										</div>
									</BlueDateDiv>
								</BlueSubDiv>
							) : (
								<>
									<BlueSubDiv style={{ height: '80px' }} bor>
										<h6>반복 기간 설정</h6>
										<BlueDateDiv>
											<DateGrid
												startDate={dates.insertStartDate}
												setStartDate={(date) => dateHandler(date, 'insertStartDate')}
												fontSize={16}
											/>
											<p>~</p>{' '}
											<DateGrid
												startDate={dates.insertEndDate}
												setStartDate={(date) => dateHandler(date, 'insertEndDate')}
												fontSize={16}
											/>
										</BlueDateDiv>
									</BlueSubDiv>
									<BlueSubDiv style={{ height: '80px' }} bor>
										<h6>시간대 선택</h6>
										<div>
											<ExCheckWrap style={{ margin: '0px' }}>
												{checkDummy.map((x, index) => (
													<ExCheckDiv>
														<StyledCheckSubSquDiv
															onClick={() => setCheck1(CheckBox(check1, check1.length, index, true))}
															isChecked={check1[index]}
														>
															<CheckImg2 src="/svg/check.svg" isChecked={check1[index]} />
														</StyledCheckSubSquDiv>
														<p>{x}</p>
													</ExCheckDiv>
												))}
											</ExCheckWrap>
										</div>
									</BlueSubDiv>
								</>
							)}

							{/* <BlueSubDiv style={{ height: '80px' }} bor>
								<h6>경매 번호</h6>
								<div>
									<input
										style={{ borderBottom: '1px solid black', fontSize: '16px', padding: '5px' }}
										placeholder="경매 번호 자동 생성"
									/>
								</div>
							</BlueSubDiv> */}
						</BlueMainDiv>
						<BlueBtnWrap>
							<BlueBlackBtn onClick={onSubmit}>등록</BlueBlackBtn>
						</BlueBtnWrap>
					</div>
				</BlueSubContainer>
			</ModalContainer>
		</>
	)
}

export default AuctionRound

const TimeInput = styled.input`
	width: 50px;
	height: 35px;
	border-radius: 3px;
	border: 1px solid #c8c8c8;
	font-size: 16px;
`
