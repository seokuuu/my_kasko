import { useAtomValue } from 'jotai'
import { isEqual } from 'lodash'
import moment from 'moment/moment'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useClaimDetailsQuery, useClaimRegisterMutation, useClaimUpdateMutaion } from '../../../../api/operate/claim'
import { BlackBtn, WhiteBtn } from '../../../../common/Button/Button'
import { CheckImg2, StyledCheckMainDiv, StyledCheckSubSquDiv } from '../../../../common/Check/CheckImg'
import { CheckBox } from '../../../../common/Check/Checkbox'
import { CenterRectangleWrap } from '../../../../common/OnePage/OnePage.Styled'
import { claimOngoingStatus } from '../../../../common/Option/ClaimPost'
import { MainSelect } from '../../../../common/Option/Main'
import DateGrid from '../../../../components/DateGrid/DateGrid'
import TextEditor from '../../../../components/Editor/TextEditor'
import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle, DateTitle } from '../../../../components/MapTable/MapTable'
import useBlockRoute from '../../../../hooks/useBlockRoute'
import useAlert from '../../../../store/Alert/useAlert'
import { selectedRowsAtom } from '../../../../store/Layout/Layout'
import AttachedFile from '../Notice/components/AttachedFile'

/**
 * @description
 */
const OperateClaimRegister = ({ pageType }) => {
	const { id } = useParams()

	const navigate = useNavigate()
	const location = useLocation()

	const {
		productUid,
		auctionNumber,
		productNumber,
		registerDate,
		updateDate,
		thickness,
		width,
		length,
		spec,
		weight,
		maker,
		grade,
		preferThickness,
		customerName,
	} = location.state ?? {}
	const titleData = [
		'제품 번호',
		'클레임 등록 일자',
		'클레임 수정 일자',
		'두께(mm)',
		'폭(mm)',
		'길이(mm)',
		'규격약호',
		'중량(kg)',
		'매입처',
		'등급',
		'정척 여부',
		'',
	]

	const contentData = ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-']

	// 상단 정보 데이터
	const [contents, setContents] = useState({ content: contentData, title: '-' })

	const checkDummy = ['카스코', '현대제철']

	// 제품 목록에서 등록을 위해 선택된 값
	const selected = useAtomValue(selectedRowsAtom)

	console.log('목록에서 선택된 데이터 :', selected)
	// 제품 목록에서 선택한 productUid(제품 고유 번호) & auctionNumber(경매번호)

	// 확인 모달 관련 값들
	const { simpleConfirm } = useAlert()

	const [check, setCheck] = useState(Array.from({ length: checkDummy.length }, () => false))
	// const [checkData, setCheckData] = useState(Array.from({ length: checkDummy.length }, () => ''))

	const [observeClick, setObserveClick] = useState(false)

	// 폼 초깃값
	const initForm = {
		content: '<p></p>\n',
		file: [], // 새로 담을 파일
		existFile: [], // 기존 파일 데이터
		deleteFileList: [], // 삭제할 파일 인덱스(uid)
		claimStatus: { value: 'ask0', label: '진행중 ' }, // 클레임 진행상태
		requestDate: '', // 클레임 요청일
		registrationDate: '', // 현대제철 클레임 등록일
		processor: [], //Array.from({ length: checkDummy.length }, () => ''), // 반품 진행
		kaskoReturnDate: '', // 카스코 반품일
		hsReturnDate: '', // 현대제철 반품일
		endDate: '', // 클레임 종료일
	}

	console.log('initForm :', initForm)

	// 등록 폼
	const [form, setForm] = useState(initForm)
	console.log('form :', form)

	// 등록 API
	const { mutate: register } = useClaimRegisterMutation()

	// 등록& 수정 공통 요청 PARAMETER
	const commonParams = {
		content: form.content,
		requestDate: form.requestDate && moment(form.requestDate).format('YYYY-MM-DD hh:mm:ss'),
		registrationDate: form.registrationDate && moment(form.registrationDate).format('YYYY-MM-DD hh:mm:ss'),
		processor: form.processor,
		kaskoReturnDate: form.kaskoReturnDate && moment(form.kaskoReturnDate).format('YYYY-MM-DD hh:mm:ss'),
		hsReturnDate: form.hsReturnDate && moment(form.hsReturnDate).format('YYYY-MM-DD hh:mm:ss'),
		endDate: form.endDate && moment(form.endDate).format('YYYY-MM-DD hh:mm:ss'),
		fileList: form.file,
		claimStatus: form.claimStatus.label.trim(),
		auctionNumber,
	}
	// 상세 API
	const { data: detailsData } = useClaimDetailsQuery(id)

	// 등록 요청 PARAMETER
	const requestParams = {
		...commonParams,
		productUid,
		auctionNumber,
	}
	// 수정 API
	const { mutate: update } = useClaimUpdateMutaion()
	// 등록 요청 PARAMETER
	const updateParams = {
		...commonParams,
		uid: id,
		productUid: detailsData?.productUid ?? 0,
		deleteFileList: form.deleteFileList,
	}

	// 날짜 핸들러
	function dateHandler(date, name) {
		setForm((p) => ({ ...p, [name]: date }))
	}

	function onSubmit() {
		if (id && detailsData) {
			update(updateParams)
		} else {
			register(requestParams)
		}
		setObserveClick(true)
	}
	function onSubmitHandler() {
		simpleConfirm('저장하시겠습니까?', onSubmit)
	}
	const blockCondition = useMemo(() => !isEqual(initForm, form) && !Boolean(id) && !observeClick, [form, observeClick])

	useBlockRoute(blockCondition)

	useEffect(() => {
		return () => setForm(initForm)
	}, [])

	// 체크박스(반품 진행)
	useEffect(() => {
		const updatedCheck = checkDummy.map((value, index) => {
			return check[index] ? value : ''
		})
		const filteredCheck = updatedCheck.filter((item) => item !== '')
		setForm((p) => ({ ...p, processor: filteredCheck }))
	}, [check])

	// selected 값이 있다면 상단 내용 데이터 바인딩(등록 & 수정)
	useEffect(() => {
		// 등록시 데이터 바인딩
		if (pageType === 'register') {
			const newContentsData = [
				productNumber,
				registerDate,
				updateDate,
				thickness,
				width,
				length,
				spec,
				weight,
				maker,
				grade,
				preferThickness,
			]

			setContents({ title: customerName, content: newContentsData })
		}

		// 수정시 상세 데이터 바인딩
		if (pageType === 'detail' && id && detailsData) {
			const newContentsData = [
				detailsData.productNumber,
				detailsData.createDate ? moment(detailsData.createDate).format('YYYY-MM-DD') : '-',
				detailsData.updateDate ? moment(detailsData.updateDate).format('YYYY-MM-DD') : '-',

				detailsData.thickness,
				detailsData.width,
				detailsData.length,
				detailsData.spec,
				detailsData.weight,
				detailsData.supplier,
			]

			setContents({ title: detailsData.supplier, content: newContentsData })

			// 반품 진행 체크 여부
			const processor = detailsData.processor.split(',').map((i) => i.trim())
			const processorChecked = checkDummy.map((c) => (processor.find((p) => p === c) ? true : false))

			// 클레임 진행 상테
			const claimStatus = claimOngoingStatus.find((c) => detailsData.status === c.label.trim()) ?? claimOngoingStatus[0]

			// 기존 파일
			const existFile =
				detailsData.fileList.length !== 0 ? detailsData.fileList.map((f) => ({ ...f, name: f.originalName })) : []

			console.log('claimStatus :', claimStatus)
			setForm((p) => ({
				...p,
				content: detailsData.content,
				requestDate: detailsData.requestDate && moment(detailsData.requestDate).toDate(),
				registrationDate: detailsData.registrationDate && moment(detailsData.registrationDate).toDate(),
				kaskoReturnDate: detailsData.kaskoReturnDate && moment(detailsData.kaskoReturnDate).toDate(),
				hsReturnDate: detailsData.hsReturnDate && moment(detailsData.hsReturnDate).toDate(),
				endDate: detailsData.endDate && moment(detailsData.endDate).toDate(),
				existFile,
				processor,
				claimStatus,
			}))

			setCheck(processorChecked)
		}
	}, [selected, id, detailsData, pageType])

	console.log('form :', form)
	return (
		<>
			<CenterRectangleWrap>
				<CRWMain>
					<h5>클레임 {pageType === 'register' ? '등록' : '수정'}</h5>
					{/* 클레임 정보 */}
					<ClaimRow>
						<ClaimTitle style={{ width: '50%' }}>업체명</ClaimTitle>
						<ClaimContent style={{ width: '50%' }}>{contents.title}</ClaimContent>
					</ClaimRow>
					<ClaimTable>
						{[0, 1, 2, 3].map((index) => (
							<ClaimRow key={index}>
								{titleData.slice(index * 3, index * 3 + 3).map((title, idx) => (
									<Fragment agmentkey={title}>
										<ClaimTitle>{title}</ClaimTitle>
										<ClaimContent>{contents.content[index * 3 + idx]}</ClaimContent>
									</Fragment>
								))}
							</ClaimRow>
						))}
					</ClaimTable>
					{/* 클레임 폼 입력 */}
					<h4>내용</h4>
					<TextEditor name="content" setState={setForm} value={id && detailsData && detailsData.content} />
					<CRWMainBottom>
						<CMBLeft>
							<div>
								<DateTitle>클레임 요청 일자</DateTitle>
								<DateGrid
									width={130}
									left={-30}
									fontSize={17}
									startDate={form.requestDate}
									setStartDate={(date) => dateHandler(date, 'requestDate')}
								/>
							</div>
							<div>
								<DateTitle>현대 제철 클레임 요청 일자</DateTitle>
								<DateGrid
									width={130}
									left={-30}
									fontSize={17}
									startDate={form.registrationDate}
									setStartDate={(date) => dateHandler(date, 'registrationDate')}
								/>
							</div>
							<div>
								<DateTitle>클레임 완료 일자</DateTitle>
								<DateGrid
									width={130}
									left={-30}
									fontSize={17}
									startDate={form.endDate}
									setStartDate={(date) => dateHandler(date, 'endDate')}
								/>
							</div>
							<div>
								<DateTitle small={true}>첨부 파일</DateTitle>
								<AttachedFile name="file" fileList={form.existFile} setState={setForm} isExistTitle={false} />
							</div>
						</CMBLeft>
						<CMBLeft>
							<SelectWrap>
								<DateTitle style={{ width: '150px' }}>클레임 진행 상태</DateTitle>
								<MainSelect
									options={claimOngoingStatus}
									// defaultValue={claimOngoingStatus[0]}
									value={form.claimStatus}
									onChange={(e) => setForm((p) => ({ ...p, claimStatus: e }))}
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
									setStartDate={(e) => dateHandler(e, 'kaskoReturnDate')}
								/>
							</div>
							<div>
								<DateTitle small>현대제철 반품일자</DateTitle>
								<DateGrid
									width={130}
									left={-45}
									fontSize={17}
									startDate={form.hsReturnDate}
									setStartDate={(e) => dateHandler(e, 'hsReturnDate')}
								/>
							</div>
						</CMBLeft>
					</CRWMainBottom>
					<CRWSub>
						<BtnWrap>
							<WhiteBtn
								width={40}
								height={40}
								style={{ marginRight: '10px' }}
								onClick={() => {
									pageType === 'register' ? navigate('/operate/common/product') : navigate(-1)
								}}
							>
								돌아가기
							</WhiteBtn>
							<BlackBtn width={40} height={40} onClick={onSubmitHandler}>
								저장
							</BlackBtn>
						</BtnWrap>
					</CRWSub>
				</CRWMain>
			</CenterRectangleWrap>
		</>
	)
}

export default OperateClaimRegister

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
