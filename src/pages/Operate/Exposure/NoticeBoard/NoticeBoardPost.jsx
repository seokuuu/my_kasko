import React, { useEffect, useMemo, useState } from 'react'
import { styled } from 'styled-components'

import { BlackBtn, WhiteBtn } from '../../../../common/Button/Button'
import { CenterRectangleWrap } from '../../../../common/OnePage/OnePage.Styled'

import { isEqual } from 'lodash'
import { useNavigate, useParams } from 'react-router-dom'
import {
	useNoticeBoardDetailsQuery,
	useNoticeBoardRegisterMutation,
	useNoticeBoardUpdateMutation,
} from '../../../../api/operate/noticeBoard'
import { PropsTextArea } from '../../../../common/Input/Input'
import useAlert from '../../../../store/Alert/useAlert'
import IsExposure from './components/IsExposure'
/**
 * @description
 * 전광판 등록,수정 내부 컴포넌트입니다.
 */
const NoticeBoardPost = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	const initForm = { title: '', status: true }

	const [observeClick, setObserveClick] = useState(false)

	// 등록 폼
	const [form, setForm] = useState(initForm)

	// 확인 모달 관련 값들
	const { simpleAlert, simpleConfirm } = useAlert()

	//  전광판 상세 API
	const { data } = useNoticeBoardDetailsQuery(id)

	console.log('상세 데이터 :', data)

	// 전광판 등록 API
	const { mutate: register } = useNoticeBoardRegisterMutation()

	// 전광판 등록 API
	const { mutate: update } = useNoticeBoardUpdateMutation()

	// 내용 인풋 이벤트 핸들러
	function commonChangeHandler(e) {
		const { name, value } = e.target

		setForm((p) => ({ ...p, [name]: value }))
	}

	function onSubmit() {
		if (id && data) {
			update({ ...form, status: Number(form.status), uid: data.uid })
		} else {
			register({ ...form, status: Number(form.status) })
		}
		setObserveClick(true)
	}

	// 등록 핸들러
	function submitHandler() {
		if (!form.title) {
			return simpleAlert('내용을 입력해주세요.')
		}

		simpleConfirm('저장하시겠습니까?', onSubmit)
	}

	const checkDummy = ['노출 안함']
	const radioDummy = ['노출', '미노출']

	const [check, setCheck] = useState(Array.from({ length: checkDummy.length }, () => false))
	const [checkData, setCheckData] = useState(Array.from({ length: checkDummy.length }, () => ''))
	const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))

	const blockCondition = useMemo(() => !isEqual(initForm, form) && !Boolean(id) && !observeClick, [form, observeClick])
	// useBlockRoute(blockCondition)

	useEffect(() => {
		const updatedCheck = checkDummy.map((value, index) => {
			return check[index] ? value : ''
		})
		// 그냥 배열에 담을 때
		const filteredCheck = updatedCheck.filter((item) => item !== '')
		setCheckData(filteredCheck)
	}, [check])

	useEffect(() => {
		if (id && data) {
			setCheckRadio(Boolean(data.status) ? [true, false] : [false, true])
			setForm({
				title: data.title,
				status: Number(data.status),
			})
		}
	}, [data])

	return (
		<>
			<CenterRectangleWrap>
				<CRWMain>
					<h5>전광판 {id ? '저장' : '등록'}</h5>
					<div style={{ marginBottom: '10px', display: 'flex' }}>
						<PropsTextArea
							name="title"
							value={form.title}
							onChange={commonChangeHandler}
							style={{ marginLeft: 'auto', marginRight: 'auto' }}
							per={90}
							height={260}
							placeholder="질문 내용을 입력해주세요. 띄어쓰기 포함하여 최대 80자까지 가능합니다."
							maxLength={80}
						/>
					</div>
					{/* 전광판 노출 여부 */}
					<IsExposure
						setState={setForm}
						setCheckRadio={setCheckRadio}
						checkRadio={checkRadio}
						radioDummy={radioDummy}
					/>

					<CRWSub>
						<BtnWrap>
							<WhiteBtn
								width={90}
								height={50}
								style={{ marginRight: '10px' }}
								onClick={() => navigate('/operate/noticeBoard')}
							>
								돌아가기
							</WhiteBtn>
							<BlackBtn width={90} height={50} onClick={submitHandler}>
								{id ? '저장' : '등록'}
							</BlackBtn>
						</BtnWrap>
					</CRWSub>
				</CRWMain>
			</CenterRectangleWrap>
		</>
	)
}

export default NoticeBoardPost

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

const BtnWrap = styled.div`
	display: flex;
	width: 500px;
	justify-content: space-evenly;
	align-items: center;
	margin-left: auto;
	margin-right: auto;
`
