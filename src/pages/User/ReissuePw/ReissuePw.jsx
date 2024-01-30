import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { styled } from 'styled-components'
import { BlueBtn } from '../../../common/Button/Button'
import { SInput } from '../../../common/Input/Input'
import { emailOptionsIncludingDirect } from '../../../common/Option/SignUp'
import { FindContainer, FindMsg, FindTitleMsg } from '../FindId/FindId'
import { Container, IbwTxt, LoginContainer, LoginSubContainer, SubContainer, Title } from '../Login/Login.Styled'

import { useSetAtom } from 'jotai/index'
import { resetPw } from '../../../api/auth'
import { busIdRegex } from '../../../common/Regex/Regex'
import useAlert from '../../../store/Alert/useAlert'
import { accordionAtom, headerAtom, subHeaderAtom } from '../../../store/Layout/Layout'

const init = {
	id: '',
	name: '',
	businessNumber: '',
	email: '',
}

const ReissuePw = () => {
	const { simpleAlert, showAlert } = useAlert()
	const navigate = useNavigate()
	const setShowHeader = useSetAtom(headerAtom)
	const setShowAccordion = useSetAtom(accordionAtom)
	const setShowSubHeader = useSetAtom(subHeaderAtom)
	setShowHeader(false)
	setShowAccordion(false)
	setShowSubHeader(false)

	const [input, setInput] = useState(init)
	const [validErrorMassage, setValidErrorMessage] = useState(init)
	const [emailFirst, setEmailFirst] = useState('')
	const [emailDomain, setEmailDomain] = useState({ selectModeValue: '', inputModeValue: '' })
	console.log('emailDomain :', emailDomain)
	const [isActive, setIsActive] = useState(false)

	const reissueHandler = useCallback((e) => {
		const { name, value } = e.target
		setInput({ ...input, [name]: value })
	})

	const emailHandler = useCallback((e) => {
		const value = e.target.value
		setEmailFirst(value)
	})

	const onSubmit = async () => {
		try {
			await resetPw(input)
			showAlert({
				title: '임시 비밀번호 발송 완료',
				content: '입력하신 이메일로 임시 비밀번호가\n' + '발송되었습니다.',
			})
			navigate('/')
		} catch (e) {
			showAlert({
				title: '일치하는 계정이 없습니다.',
				content: '입력하신 정보가 맞는지 확인 후 다시 진행해 주세요.',
			})
		}
	}

	const isValidation = () => {
		if (!input.id) {
			validErrorMessageHandler('id')
			return setIsActive(false)
		}
		if (!input.name) {
			validErrorMessageHandler('name')
			return setIsActive(false)
		}
		if (!input.businessNumber || !busIdRegex.test(input.businessNumber)) {
			validErrorMessageHandler('businessNumber')
			return setIsActive(false)
		}
		if (!input.email) {
			validErrorMessageHandler('email')
			return setIsActive(false)
		}

		setValidErrorMessage(init)
		setIsActive(true)
	}

	// 이메일 도메인의 값에 따라 셀렉트 모드,인풋 모드 값을 할당해줍니다.
	const chooseEmailDomain = useMemo(
		() => (emailDomain.selectModeValue === '직접 입력' ? emailDomain.inputModeValue : emailDomain.selectModeValue),
		[emailDomain],
	)

	const validErrorMessageHandler = (name) => {
		setValidErrorMessage({ ...init, [name]: true })
	}

	useEffect(() => {
		if (emailFirst && emailDomain) {
			setInput({ ...input, email: emailFirst + '@' + chooseEmailDomain })
		}
	}, [emailFirst, emailDomain])

	useEffect(() => {
		isValidation()
	}, [input])

	return (
		<Container>
			<SubContainer>
				<Title style={{ marginTop: '10px', marginBottom: '20px' }}>
					<img src="/img/login_logo.png" alt="" />
					<FindMsg style={{ left: '-65px' }}>회원가입 시 등록한 정보를 입력해 주세요.</FindMsg>
				</Title>
				<LoginContainer style={{ width: '500px' }}>
					<LoginSubContainer style={{ width: '90%', marginTop: '20px' }}>
						<FindContainer>
							<FindTitleMsg>
								<h5>아이디</h5>
								{validErrorMassage.id && <p>내용을 확인해 주세요.</p>}
							</FindTitleMsg>
							<input onChange={reissueHandler} name="id" value={input.id}></input>
						</FindContainer>
						<FindContainer>
							<FindTitleMsg>
								<h5>대표자 성명</h5>
								{validErrorMassage.name && <p>내용을 확인해 주세요.</p>}
							</FindTitleMsg>
							<input onChange={reissueHandler} name="name" value={input.name}></input>
						</FindContainer>
						<FindContainer>
							<FindTitleMsg>
								<h5>사업자 번호</h5>
								{validErrorMassage.businessNumber && <p>올바른 번호가 아닙니다.</p>}
							</FindTitleMsg>
							<input onChange={reissueHandler} name="businessNumber" value={input.businessNumber}></input>
						</FindContainer>
						<EmailContainer>
							<FindTitleMsg>
								<h5>이메일 인증</h5>
								{validErrorMassage.email && <p>내용을 확인해 주세요.</p>}
							</FindTitleMsg>
							<div
								style={{
									display: 'flex',
									lineHeight: '40px',
								}}
							>
								<SInput style={{ width: '180px' }} onChange={emailHandler} />
								<p style={{ margin: '0 5px' }}>@</p>
								{emailDomain.selectModeValue === '직접 입력' ? (
									<SInput
										value={emailDomain.inputModeValue}
										onChange={(e) => setEmailDomain((p) => ({ ...p, inputModeValue: e.target.value }))}
										style={{
											width: '200px',
										}}
									/>
								) : (
									<EmailSelect
										options={emailOptionsIncludingDirect}
										defaultValue={emailOptionsIncludingDirect[0]}
										onChange={(selectedOption) => {
											setEmailDomain((p) => ({ ...p, selectModeValue: selectedOption.label }))
										}}
									/>
								)}
							</div>
						</EmailContainer>
					</LoginSubContainer>
					<div style={{ textAlign: 'center' }}>
						<CustomBtn type={'button'} width={90} height={40} fontSize={16} onClick={onSubmit} isActive={isActive}>
							비밀번호 재발급
						</CustomBtn>
						<IbwTxt>
							아이디가 기억 안나시나요?
							<Link to={`/findid`}>
								<span> 아이디 찾기</span>
							</Link>
						</IbwTxt>
					</div>
				</LoginContainer>
			</SubContainer>
		</Container>
	)
}

export default ReissuePw

const EmailSelect = styled(Select)`
	text-align: center;
	line-height: 26.5px;
	width: 210px;
`

const EmailContainer = styled.div`
	color: black;
	text-align: left;
	margin-bottom: 15px;
	h5 {
		font-size: 16px;
	}
`
const CustomBtn = styled(BlueBtn)`
	background: ${(props) => (props.isActive ? '#061737' : '#D7D7D7')};
`
