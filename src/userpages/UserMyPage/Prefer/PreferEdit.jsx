import { useEffect, useState } from 'react'
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
import { useMutation } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { getDetailCustomerfavorite, patchCustomerfavorite, preferQueryKey } from '../../../api/myPage'
import { queryClient } from '../../../api/query'
import { BlackBtn, BtnWrap, GreyBtn, WhiteBtn } from '../../../common/Button/Button'
import useReactQuery from '../../../hooks/useReactQuery'
import { isEmptyObj } from '../../../lib'
import StandardFind from '../../../modal/Multi/StandardFind'
import useAlert from '../../../store/Alert/useAlert'
import { kyuModalAtom } from '../../../store/Layout/GlobalProductSearch'

const init = {
	name: '', // 선호제품명
	spec: {
		text: '',
		uid: 0,
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
	cmin: null,
	cmax: null,
	elMin: null,
	elMax: null,
	uid: null,
}

const PreferEdit = ({ setSwtichEdit, uidAtom }) => {
	const { simpleAlert, showAlert } = useAlert()
	// 규격 약호 모달
	const [isModal, setIsModal] = useAtom(kyuModalAtom)
	const [submitData, setSubmitData] = useState(init)
	const { mutate: update } = useMutation(patchCustomerfavorite, {
		onSuccess() {
			showAlert({
				title: '저장되었습니다.',
				content: '',
				func: () => {
					setSwtichEdit(false)
					queryClient.invalidateQueries(preferQueryKey.list)
				},
			})
		},
		onError(error) {
			simpleAlert(error.status === 400 ? error.data.message : '저장에 실패하였습니다.')
		},
	})

	const { data, isSuccess } = useReactQuery(uidAtom, 'getDetailCustomerfavorite', getDetailCustomerfavorite)

	const detailData = data?.data?.data

	useEffect(() => {
		// detailData가 정상적으로 가져와진 후에 submitData를 초기화합니다.
		if (detailData) {
			setSubmitData({
				cmin: detailData.cmin,
				cmax: detailData.cmax,
				elMax: detailData.elMax,
				elMin: detailData.elMin,
				lengthMax: detailData.lengthMax,
				lengthMin: detailData.lengthMin,
				thicknessMax: detailData.thicknessMax,
				thicknessMin: detailData.thicknessMin,
				tsMax: detailData.tsMax,
				tsMin: detailData.tsMin,
				widthMax: detailData.widthMax,
				widthMin: detailData.widthMin,
				ypMax: detailData.ypMax,
				ypMin: detailData.ypMin,
				name: detailData.name,

				spec: {
					text: detailData.spec,
					uid: detailData.specUid,
				},
				uid: detailData.uid,
			})
		}
	}, [isSuccess, detailData])

	const eventHandle = (e) => {
		const { name, value } = e.target
		setSubmitData({ ...submitData, [name]: value })
	}

	const submitHandle = () => {
		const requestParams = {
			...submitData,
			specUid: submitData.spec.uid,
			cMin: submitData.cmin,
			cMax: submitData.cmax,
		}

		delete requestParams.cmin
		delete requestParams.cmax
		delete requestParams.spec

		if (!requestParams.name) {
			simpleAlert('선호제품명을 기입해주세요.')
		} else {
			update(requestParams)
		}
	}

	const goBack = () => {
		setSwtichEdit(false)
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
	return (
		<OnePageContainer>
			<MainTitle>선호제품 수정</MainTitle>
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
							<CustomInput readOnly={true} value={submitData.spec.text} disabled />
							<GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17} onClick={modalOpen}>
								찾기
							</GreyBtn>
						</Part>

						<Part style={{ marginTop: '35px' }}>
							<Title>
								<h4>두께</h4>
								<p></p>
							</Title>
							<CustomInput width={150} name="thicknessMin" value={submitData.thicknessMin} onChange={eventHandle} />
							<span style={{ padding: '0px 5px' }}>~</span>
							<CustomInput width={150} name="thicknessMax" value={submitData.thicknessMax} onChange={eventHandle} />
						</Part>

						<Part style={{ marginTop: '35px' }}>
							<Title>
								<h4>폭</h4>
								<p></p>
							</Title>
							<CustomInput width={150} name="widthMin" onChange={eventHandle} value={submitData.widthMin} />
							<span style={{ padding: '0px 5px' }}>~</span>
							<CustomInput width={150} name="widthMax" onChange={eventHandle} value={submitData.widthMax} />
						</Part>

						<Part style={{ marginTop: '35px' }}>
							<Title>
								<h4>길이</h4>
								<p></p>
							</Title>
							<CustomInput width={150} name="lengthMin" onChange={eventHandle} value={submitData.lengthMin} />
							<span style={{ padding: '0px 5px' }}>~</span>
							<CustomInput width={150} name="lengthMax" onChange={eventHandle} value={submitData.lengthMax} />
						</Part>
					</Left>
					<Right>
						<Part style={{ marginTop: '35px' }}>
							<Title>
								<h4>TS</h4>
								<p></p>
							</Title>
							<CustomInput width={150} name="tsMin" onChange={eventHandle} value={submitData.tsMin} />
							<span style={{ padding: '0px 5px' }}>~</span>
							<CustomInput width={150} name="tsMax" onChange={eventHandle} value={submitData.tsMax} />
						</Part>

						<Part style={{ marginTop: '35px' }}>
							<Title>
								<h4>YP</h4>
								<p></p>
							</Title>
							<CustomInput width={150} name="ypMin" onChange={eventHandle} value={submitData.ypMin} />
							<span style={{ padding: '0px 5px' }}>~</span>
							<CustomInput width={150} name="ypMax" onChange={eventHandle} value={submitData.ypMax} />
						</Part>
						<Part style={{ marginTop: '35px' }}>
							<Title>
								<h4>C%</h4>
								<p></p>
							</Title>
							<CustomInput width={150} name="cmin" onChange={eventHandle} value={submitData.cmin} />
							<span style={{ padding: '0px 5px' }}>~</span>
							<CustomInput width={150} name="cmax" onChange={eventHandle} value={submitData.cmax} />
						</Part>

						<Part style={{ marginTop: '35px' }}>
							<Title>
								<h4>EL</h4>
								<p></p>
							</Title>
							<CustomInput width={150} name="elMin" onChange={eventHandle} value={submitData.elMin} />
							<span style={{ padding: '0px 5px' }}>~</span>
							<CustomInput width={150} name="elMax" onChange={eventHandle} value={submitData.elMax} />
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

export default PreferEdit
