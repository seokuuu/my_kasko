import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'

import { BlackBtn, WhiteBtn } from '../../../../common/Button/Button'
import { CenterRectangleWrap } from '../../../../common/OnePage/OnePage.Styled'

import { useNavigate, useParams } from 'react-router-dom'
import {
	useNoticeBoardDetailsQuery,
	useNoticeBoardRegisterMutation,
	useNoticeBoardUpdateMutation,
} from '../../../../api/operate/noticeBoard'
import { PropsTextArea } from '../../../../common/Input/Input'
import AlertPopup from '../../../../modal/Alert/AlertPopup'
import useConfirmModal from '../../../../hooks/useConfirmModal'
import IsExposure from './components/IsExposure'
/**
 * @description
 * 전광판 등록,수정 내부 컴포넌트입니다.
 */
const NoticeBoardPost = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	// 등록 폼
	const [form, setForm] = useState({ title: '', status: true })

	// 확인 모달 관련 값들
	const { popupSwitch, setPopupSwitch, setNowPopupType, nowPopup, setNowPopup, initConfirmModal } = useConfirmModal()

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

	// 등록 핸들러
	function submitHandler() {
		if (!form.title) {
			return alert('내용을 입력해주세요.')
		}

		setPopupSwitch(true)
		setNowPopupType(2)
		setNowPopup({
			num: '2-1',
			title: '저장하시겠습니까?',
			next: '1-12',
			func() {},
		})
	}

	const checkDummy = ['노출 안함']
	const radioDummy = ['노출', '미노출']

	const [check, setCheck] = useState(Array.from({ length: checkDummy.length }, () => false))
	const [checkData, setCheckData] = useState(Array.from({ length: checkDummy.length }, () => ''))
	const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))

	useEffect(() => {
		const updatedCheck = checkDummy.map((value, index) => {
			return check[index] ? value : ''
		})
		// 그냥 배열에 담을 때
		const filteredCheck = updatedCheck.filter((item) => item !== '')
		setCheckData(filteredCheck)

		// 전송용 input에 담을 때
		// setInput({
		//   ...input,
		//   businessType: updatedCheck.filter(item => item !== ''),
		// });
	}, [check])

	/**
	 * @description
	 * 등록 or 수정 API 요청
	 * detailsId와 data가 있다면 수정 API 없다면 등록 API
	 */
	useEffect(() => {
		if (nowPopup.num === '1-12') {
			if (id && data) {
				update({ ...form, status: Number(form.status), uid: data.uid })
			} else {
				register({ ...form, status: Number(form.status) })
			}
			initConfirmModal()
		}
	}, [nowPopup])

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
				{popupSwitch && <AlertPopup setPopupSwitch={setPopupSwitch} />}
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
