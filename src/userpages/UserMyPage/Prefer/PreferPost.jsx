import { useMemo, useState } from 'react'
import {
	HalfWrap,
	Left,
	MainTitle,
	OnePageContainer,
	OnePageSubContainer,
	Part,
	Right,
	Title,
} from '../../../common/OnePage/OnePage.Styled'

import { CustomInput } from '../../../common/Input/Input'

import { styled } from 'styled-components'

import { useMutation } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { isEqual } from 'lodash'
import { postCustomerfavorite, preferQueryKey } from '../../../api/myPage'
import { queryClient } from '../../../api/query'
import { BlackBtn, BtnWrap, GreyBtn, WhiteBtn } from '../../../common/Button/Button'
import useBlockRoute from '../../../hooks/useBlockRoute'
import { isEmptyObj } from '../../../lib'
import StandardFind from '../../../modal/Multi/StandardFind'
import useAlert from '../../../store/Alert/useAlert'
import { kyuModalAtom } from '../../../store/Layout/GlobalProductSearch'

const init = {
	name: '', // 선호제품명
	spec: {
		text: '',
		uid: null,
	}, //DB 필요
	thicknessMin: null,
	thicknessMax: null,
	widthMin: null,
	widthMax: null,
	lengthMin: null,
	lengthMax: null,
	tsMin: null,
	tsMax: null,
	ypMin: null,
	ypMax: null,
	cMin: null,
	cMax: null,
	elMin: null,
	elMax: null,
}

const PreferPost = ({ setChoiceComponent }) => {
	const [submitData, setSubmitData] = useState(init)

	const { simpleAlert, showAlert, simpleConfirm } = useAlert()

	// 등록 API
	const { mutate: create } = useMutation(postCustomerfavorite, {
		onSuccess() {
			showAlert({
				title: '저장되었습니다.',
				content: '',
				func: () => {
					setChoiceComponent('리스트')
					queryClient.invalidateQueries(preferQueryKey.list)
				},
			})
		},
		onError(error) {
			simpleAlert(error.status === 400 ? error.data.message : '저장에 실패하였습니다.')
		},
	})

	// 규격 약호 모달
	const [isModal, setIsModal] = useAtom(kyuModalAtom)
	const eventHandle = (e) => {
		const { name, value } = e.target
		if (name !== 'name') {
			const regex =
				name.toString().includes('length') || name.toString().includes('el')
					? /^[0-9]+$/.test(value)
					: /^[0-9.]+$/.test(value)
			return setSubmitData({ ...submitData, [name]: regex ? value : '' })
		}
		setSubmitData({ ...submitData, [name]: value })
	}

	const submitHandle = () => {
		const requestParams = {
			...submitData,
			specUid: submitData.spec.uid,
		}
		delete requestParams.spec

		if (!requestParams.name) {
			simpleAlert('선호제품명을 기입해주세요.')
		} else {
			create(requestParams)
		}
	}

	// 규격약호 모달 오픈
	function modalOpen() {
		setIsModal(true)
	}

	// 규격 약호 핸들러
	function onSpecHandler(e, text, uid) {
		const { tagName } = e.target
		if (tagName === 'IMG') {
			setIsModal(false)
		} else {
			setSubmitData((p) => ({ ...p, spec: { text: text, uid: uid } }))
			setIsModal(false)
		}
	}

	function onSpecResetHandler() {
		setSubmitData({
			...submitData,
			spec: {
				text: '',
				uid: null,
			},
		})
	}

	// 처음 폼과 이전 폼을 비교한 값입니다.
	const blockCondition = useMemo(() => !isEqual(init, submitData), [submitData])

	// 돌아가기
	const goBack = () => {
		if (blockCondition) {
			simpleConfirm('현재 작업 중인 내용이 저장되지 않았습니다. \n페이지를 나가시겠습니까?', () =>
				setChoiceComponent('리스트'),
			)
		} else {
			setChoiceComponent('리스트')
		}
	}

	useBlockRoute(blockCondition)

	return (
		<OnePageContainer>
			<MainTitle>선호제품 등록</MainTitle>
			<OnePageSubContainer>
				<HalfWrap>
					<Left>
						<Part style={{ marginTop: '35px' }}>
							<Title>
								<h4>선호제품 명</h4>
								<p></p>
							</Title>
							<CustomInput
								placeholder="선호제품 명 입력"
								width={340}
								name="name"
								value={submitData.name}
								onChange={eventHandle}
							/>
						</Part>

						<Part style={{ marginTop: '35px' }}>
							<Title>
								<h4>규격 약호</h4>
								<p></p>
							</Title>
							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									gap: 8,
								}}
							>
								<CustomInput readOnly={true} value={submitData.spec.text} disabled />
								<GreyBtn style={{ width: '70px' }} height={35} fontSize={17} onClick={modalOpen}>
									찾기
								</GreyBtn>
								<GreyBtn style={{ width: '70px' }} height={35} fontSize={17} onClick={onSpecResetHandler}>
									삭제
								</GreyBtn>
							</div>
						</Part>

						<Part style={{ marginTop: '35px' }}>
							<Title>
								<h4>두께</h4>
								<p></p>
							</Title>
							<CustomInput
								type={'number'}
								step={0.01}
								width={150}
								name="thicknessMin"
								value={submitData.thicknessMin}
								onChange={eventHandle}
							/>
							<span style={{ padding: '0px 5px' }}>~</span>
							<CustomInput
								type={'number'}
								step={0.01}
								width={150}
								name="thicknessMax"
								value={submitData.thicknessMax}
								onChange={eventHandle}
							/>
						</Part>

						<Part style={{ marginTop: '35px' }}>
							<Title>
								<h4>폭</h4>
								<p></p>
							</Title>
							<CustomInput
								type={'number'}
								step={0.01}
								width={150}
								name="widthMin"
								onChange={eventHandle}
								value={submitData.widthMin}
							/>
							<span style={{ padding: '0px 5px' }}>~</span>
							<CustomInput
								type={'number'}
								step={0.01}
								width={150}
								name="widthMax"
								onChange={eventHandle}
								value={submitData.widthMax}
							/>
						</Part>

						<Part style={{ marginTop: '35px' }}>
							<Title>
								<h4>길이</h4>
								<p></p>
							</Title>
							<CustomInput
								type={'number'}
								step={0}
								width={150}
								name="lengthMin"
								onChange={eventHandle}
								value={submitData.lengthMin}
							/>
							<span style={{ padding: '0px 5px' }}>~</span>
							<CustomInput
								type={'number'}
								step={0}
								width={150}
								name="lengthMax"
								onChange={eventHandle}
								value={submitData.lengthMax}
							/>
						</Part>
					</Left>
					<Right>
						<Part style={{ marginTop: '35px' }}>
							<Title>
								<h4>TS</h4>
								<p></p>
							</Title>
							<CustomInput
								type={'number'}
								step={0.01}
								width={150}
								name="tsMin"
								onChange={eventHandle}
								value={submitData.tsMin}
							/>
							<span style={{ padding: '0px 5px' }}>~</span>
							<CustomInput
								type={'number'}
								step={0.01}
								width={150}
								name="tsMax"
								onChange={eventHandle}
								value={submitData.tsMax}
							/>
						</Part>

						<Part style={{ marginTop: '35px' }}>
							<Title>
								<h4>YP</h4>
								<p></p>
							</Title>
							<CustomInput
								type={'number'}
								step={0.01}
								width={150}
								name="ypMin"
								onChange={eventHandle}
								value={submitData.ypMin}
							/>
							<span style={{ padding: '0px 5px' }}>~</span>
							<CustomInput
								type={'number'}
								step={0.01}
								width={150}
								name="ypMax"
								onChange={eventHandle}
								value={submitData.ypMax}
							/>
						</Part>
						<Part style={{ marginTop: '35px' }}>
							<Title>
								<h4>C%</h4>
								<p></p>
							</Title>
							<CustomInput
								type={'number'}
								step={0.01}
								width={150}
								name="cMin"
								onChange={eventHandle}
								value={submitData.cMin}
							/>
							<span style={{ padding: '0px 5px' }}>~</span>
							<CustomInput
								type={'number'}
								step={0.01}
								width={150}
								name="cMax"
								onChange={eventHandle}
								value={submitData.cMax}
							/>
						</Part>

						<Part style={{ marginTop: '35px' }}>
							<Title>
								<h4>EL</h4>
								<p></p>
							</Title>
							<CustomInput
								type={'number'}
								step={0.01}
								width={150}
								name="elMin"
								onChange={eventHandle}
								value={submitData.elMin}
							/>
							<span style={{ padding: '0px 5px' }}>~</span>
							<CustomInput
								type={'number'}
								step={0.01}
								width={150}
								name="elMax"
								onChange={eventHandle}
								value={submitData.elMax}
							/>
						</Part>
					</Right>
				</HalfWrap>
			</OnePageSubContainer>
			<BtnWrap bottom={-130}>
				<WhiteBtn width={40} height={40} onClick={goBack}>
					돌아가기
				</WhiteBtn>
				<BlackBtn width={40} height={40} onClick={submitHandle}>
					저장
				</BlackBtn>
			</BtnWrap>
			{isModal && <StandardFind closeFn={onSpecHandler} />}
		</OnePageContainer>
	)
}

export default PreferPost

const RadioContainer = styled.div`
	display: flex;
	width: 250px;
	justify-content: space-between;
`
