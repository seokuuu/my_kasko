import React, { useEffect, useMemo, useState } from 'react'
import { styled } from 'styled-components'

import { BlackBtn, WhiteBtn } from '../../../../common/Button/Button'
import { CenterRectangleWrap } from '../../../../common/OnePage/OnePage.Styled'
import DateGrid from '../../../../components/DateGrid/DateGrid'
import TextEditor from '../../../../components/Editor/TextEditor'

import { StyledCheckMainDiv, StyledCheckSubSquDiv } from '../../../../common/Check/CheckImg'

import { CheckImg2 } from '../../../../common/Check/CheckImg'

import { isEqual } from 'lodash'
import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom'
import { usePopupDetailsQuery, usePopupRegisterMutation, usePopupUpdateMutation } from '../../../../api/operate/popup'
import { InputA, PropsInput } from '../../../../common/Input/Input'
import { CustomSelect } from '../../../../common/Option/Main'
import useBlockRoute from '../../../../hooks/useBlockRoute'
import { ExCheckWrap } from '../../../../modal/External/ExternalFilter'
import useAlert from '../../../../store/Alert/useAlert'
import { mainPopupSelectOptions } from '../../constants'
// 팝업 등록
const PopupPost = ({ isRegister }) => {
	const { id } = useParams()

	const navigate = useNavigate()

	const { simpleConfirm, simpleAlert } = useAlert()

	/**
	 * @description
	 * 특정 버튼의 클릭 여부를 관찰하는 상태값입니다.
	 * 목적 : 특정 폼에서 등록,수정 버튼을 눌렀는지에 대한 여부를 확인하기 위한 용도입니다.
	 */
	const [observeClick, setObserveClick] = useState(false)
	// 폼 초깃값
	const initForm = {
		title: '',
		content: '<p></p>\n', // 텍스트 에디터 초기값입니다.
		link: '',
		status: 1,
		startDate: '',
		endDate: '',
		position: mainPopupSelectOptions[0],
	}

	// 등록/수정 폼

	const [form, setForm] = useState(initForm)
	console.log('form :', form)
	//  팝업 상세 API
	const { data } = usePopupDetailsQuery(id)

	// 팝업 등록 API
	const { mutate: register } = usePopupRegisterMutation()

	// 팝업 수정 API
	const { mutate: update } = usePopupUpdateMutation()

	// 인풋 핸들러(제목,링크)
	function commonChangeHandler(e) {
		const { name, value } = e.target

		setForm((p) => ({ ...p, [name]: value }))
	}

	// 날짜 핸들러(시작일,종료일)

	function dateHandler(date, name) {
		setForm((p) => ({ ...p, [name]: date }))
	}

	function onSubmit() {
		if (id && data) {
			update({
				...form,
				status: Number(form.status),
				position: form.position.value,
				popupTitle: '',
				startDate: moment(form.startDate ? form.startDate : new Date()).format('YYYY-MM-DD hh:mm:ss'),
				endDate: moment(form.endDate ? form.endDate : new Date()).format('YYYY-MM-DD hh:mm:ss'),
				uid: data.uid,
			})
		} else {
			register({
				...form,
				status: Number(form.status),
				position: form.position.value,
				popupTitle: '',
				startDate: moment(form.startDate ? form.startDate : new Date()).format('YYYY-MM-DD hh:mm:ss'),
				endDate: moment(form.endDate ? form.endDate : new Date()).format('YYYY-MM-DD hh:mm:ss'),
			})
		}
		setObserveClick(true)
	}

	// 등록/수정 핸들러
	function submitHandler() {
		if (!form.title) {
			return simpleAlert('제목을 입력해주세요.')
		}
		if (!form.content) {
			return simpleAlert('게시글을 입력해주세요.')
		}
		if (!form.link) {
			return simpleAlert('링크를 입력해주세요.')
		}

		simpleConfirm('저장하시겠습니까?', onSubmit)
	}

	// 등록하는 도중, 페이지가 나가게 될때에 대한 조건입니다.
	// 기존 initForm 값과 변경된 form값을 비교하여 변경된 것이 있다면 true 로 변경해줍니다.
	// 객체의 깊은 비교를 위해 loadash의 isEqual을 사용합니다.
	const blockCondition = useMemo(() => !isEqual(initForm, form) && isRegister && !observeClick, [form, observeClick])

	useBlockRoute(blockCondition)

	/**
	 * @description
	 * 상세 데이터 존재시 데이터 바인딩
	 */

	useEffect(() => {
		if (data && id) {
			setForm((p) => ({
				...p,
				title: data.title,
				content: data.content,
				link: data.link,
				status: Boolean(data.status),
				startDate: moment(data.startDate).toDate(),
				endDate: moment(data.endDate).toDate(),
			}))
		}
	}, [data, id])

	return (
		<>
			<CenterRectangleWrap>
				<CRWMain>
					<h5>팝업 {isRegister ? '등록' : '수정'}</h5>
					<div style={{ marginBottom: '10px' }}>
						<PropsInput
							placeholder="제목을 입력해 주세요."
							name="title"
							value={form.title}
							onChange={commonChangeHandler}
						/>
					</div>

					<TextEditor name="content" setState={setForm} value={id && data && data.content} />
					<BottomWrap>
						<BottomOne style={{ marginTop: '20px' }}>
							<div>노출 기간</div>
							<div>
								<ExCheckWrap>
									<StyledCheckMainDiv>
										<StyledCheckSubSquDiv
											onClick={() => {
												setForm((p) => ({ ...p, status: !p.status }))
											}}
											isChecked={Boolean(!form.status)}
										>
											<CheckImg2 src="/svg/check.svg" isChecked={Boolean(!form.status)} />
										</StyledCheckSubSquDiv>
										<p style={{ fontSize: '16px' }}>노출 안함</p>
									</StyledCheckMainDiv>
								</ExCheckWrap>
							</div>
						</BottomOne>
						<BottomOne>
							<div style={{ width: '48%' }}>
								<DateGrid
									startDate={form.startDate ? form.startDate : moment().toDate()}
									setStartDate={(date) => dateHandler(date, 'startDate')}
								/>
							</div>
							<div style={{ width: '48%' }}>
								<DateGrid
									startDate={form.endDate ? form.endDate : moment().toDate()}
									setStartDate={(date) => dateHandler(date, 'endDate')}
								/>
							</div>
						</BottomOne>
						<BottomOne style={{ margin: '20px 0px' }}>
							<div style={{ width: '48%' }}>
								<p style={{ marginBottom: '5px' }}>메인 팝업</p>
								<div>
									<CustomSelect
										style={{ width: '100%' }}
										options={mainPopupSelectOptions}
										defaultValue={mainPopupSelectOptions[0]}
										value={form.position}
										onChange={(e) => setForm((p) => ({ ...p, position: e }))}
									/>
								</div>
							</div>
							<div style={{ width: '48%' }}>
								<p style={{ marginBottom: '5px' }}>팝업 링크</p>
								<div style={{ width: '48%' }}>
									<InputA
										style={{ width: '209%' }}
										placeholder="http://kasco.co.kr"
										name="link"
										value={form.link}
										onChange={commonChangeHandler}
									/>
								</div>
							</div>
						</BottomOne>
					</BottomWrap>

					<CRWSub>
						<BtnWrap>
							<WhiteBtn
								width={90}
								height={50}
								style={{ marginRight: '10px' }}
								onClick={() => navigate('/operate/exposure')}
							>
								돌아가기
							</WhiteBtn>
							<BlackBtn width={90} height={50} onClick={submitHandler}>
								{isRegister ? '등록' : '수정 완료'}
							</BlackBtn>
						</BtnWrap>
					</CRWSub>
				</CRWMain>
			</CenterRectangleWrap>
		</>
	)
}

export default PopupPost

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
		justify-content: space-between;
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

const BottomWrap = styled.div`
	display: block;
	justify-content: left;
	font-size: 16px;
	height: 200px;
`

const BtnWrap = styled.div`
	display: flex;
	width: 500px;
	justify-content: space-evenly;
	align-items: center;
	margin-left: auto;
	margin-right: auto;
`

const BottomOne = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 10px 0px;
	align-items: center;
`
