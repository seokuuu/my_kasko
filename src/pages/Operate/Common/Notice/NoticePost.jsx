import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'

import { BlackBtn, WhiteBtn } from '../../../../common/Button/Button'
import { CenterRectangleWrap } from '../../../../common/OnePage/OnePage.Styled'
import TextEditor from '../../../../components/Editor/TextEditor'

import { PropsInput } from '../../../../common/Input/Input'

import { useNavigate, useParams } from 'react-router-dom'
import {
	useNoticeDetailsQuery,
	useNoticeRegisterMutation,
	useNoticeUpdateMutation,
} from '../../../../api/operate/notice'
import AlertPopup from '../../../../modal/Alert/AlertPopup'
import useConfirmModal from '../../../../hooks/useConfirmModal'
import AttachedFile from './components/AttachedFile'
import IsExposure from './components/IsExposure'
/**
 * @description
 * 공지사항/자료실 등록&수정 페이지
 * @param  {string} title 페이지 카테고리(공지 or 자료실)
 * @param {boolean} isRegister 등록 or 수정 페이지
 */
const NoticePost = ({ title, isRegister }) => {
	const navigate = useNavigate()
	const { id } = useParams()

	// 확인 모달 관련 값들
	const { popupSwitch, setPopupSwitch, setNowPopupType, nowPopup, setNowPopup, initConfirmModal } = useConfirmModal()

	// 등록 폼
	const [form, setForm] = useState({
		status: true, // 상단 노출 여부
		title: '', // 제목
		content: '', // 내용
		file: [], // 새로 담을 파일 뎅터
		existFile: [], // 기존 파일 데이터
		deleteFileList: [], // 삭제할 파일 인덱스(uid)
	})

	// 상단 노출 여부 라디오 UI 관련 state
	const radioDummy = ['노출', '미노출']
	const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))

	// 공지사항& 자료실 상세 조회 API
	const { data } = useNoticeDetailsQuery(id)
	// 공지사항& 자료실 등록 API
	const { mutate: register } = useNoticeRegisterMutation(title === '공지' ? '공지사항' : '자료실')
	// 공지사항& 자료실 수정 API
	const { mutate: update } = useNoticeUpdateMutation(title === '공지' ? '공지사항' : '자료실')

	// 등록 API REQUEST PARAMETER
	const registerParams = {
		title: form.title,
		content: form.content,
		status: Number(form.status),
		fileList: form.file,
	}

	// 수정 API REQUEST PARAMETER
	const updateParams = {
		title: form.title,
		content: form.content,
		status: Number(form.status),
		fileList: form.file,
		deleteFileList: form.deleteFileList,
		uid: id,
	}

	// 제목 인풋 이벤트 핸들러
	function commonChangeHandler(e) {
		const { name, value } = e.target

		setForm((p) => ({ ...p, [name]: value }))
	}

	/**
   *@description
   등록 핸들러
   등록 폼 유효성 검사 및 모달 띄우기
   */
	function submitHandler() {
		if (!form.title) {
			return alert('제목을 입력해주세요.')
		}

		if (!form.content) {
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

	/**
	 * @description
	 * 등록 or 수정 API 요청
	 * detailsId와 data가 있다면 수정 API 없다면 등록 API
	 */
	useEffect(() => {
		if (nowPopup.num === '1-12') {
			if (id && data) {
				console.log('수정 API')
				update(updateParams)
			} else {
				register(registerParams)
			}
			initConfirmModal()
		}
	}, [nowPopup])
	/**
   @description
   * 상세 데이터값이 있다면 form 데이터 바인딩
   */
	useEffect(() => {
		if (!isRegister && id && data) {
			setCheckRadio(Boolean(data.status) ? [true, false] : [false, true])

			setForm({
				title: data.title,
				content: data.content,
				status: Number(data.status),
				existFile: data.fileList.length !== 0 ? data.fileList.map((f) => ({ ...f, name: f.originalName })) : [],
			})
		}
	}, [data])

	return (
		<>
			<CenterRectangleWrap>
				<CRWMain>
					<h5>
						{title} {isRegister ? '등록' : '수정'}
					</h5>
					<div style={{ marginBottom: '10px' }}>
						<PropsInput
							placeholder="제목을 입력해 주세요."
							name="title"
							value={form.title}
							onChange={commonChangeHandler}
						/>
					</div>
					{/* 내용 */}
					<TextEditor name="content" setState={setForm} value={data && data.content} />
					<BottomWrap>
						<BottomOne style={{ margin: '20px 0px' }}>
							{/* 상단 노출 여부 */}
							<IsExposure
								setState={setForm}
								setCheckRadio={setCheckRadio}
								checkRadio={checkRadio}
								radioDummy={radioDummy}
							/>
							{/* 첨부 파일 */}
							<AttachedFile name="file" setState={setForm} fileList={form.existFile} isExistTitle={true} />
						</BottomOne>
					</BottomWrap>

					<CRWSub>
						<BtnWrap>
							<WhiteBtn
								width={90}
								height={50}
								style={{ marginRight: '10px' }}
								onClick={() => (title === '공지' ? navigate('/operate/notice') : navigate('/operate/datasheet'))}
							>
								돌아가기
							</WhiteBtn>
							<BlackBtn width={90} height={50} onClick={submitHandler}>
								저장
							</BlackBtn>
						</BtnWrap>
					</CRWSub>
				</CRWMain>
				{popupSwitch && <AlertPopup setPopupSwitch={setPopupSwitch} />}
			</CenterRectangleWrap>
		</>
	)
}

export default NoticePost

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
