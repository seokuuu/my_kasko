import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { CheckImg, StyledCheckMainDiv, StyledCheckSubDiv } from '../../../common/Check/CheckImg'

import {
	Container,
	IbwLeft,
	IbwRight,
	IbwTxt,
	IbwWrap,
	ImgWrap,
	Input,
	InputBottomWrap,
	InputBtmWrap,
	InputWrap,
	LoginBottom,
	LoginBottom2,
	LoginBtn,
	LoginBtnWrap,
	LoginContainer,
	LoginSubContainer,
	SubContainer,
	Title,
} from './Login.Styled'
import { accordionAtom, headerAtom, subHeaderAtom } from '../../../store/Layout/Layout'
import { login } from '../../../api/auth'
import { authoritiesAtom, useAuth, useUpdateAuth } from '../../../store/auth'
import { useSetAtom } from 'jotai/index'
import useAlert from '../../../store/Alert/useAlert'
import { useAtom } from 'jotai'

const Login = () => {
	const { simpleAlert, showAlert } = useAlert()
	const navigate = useNavigate()
	const setShowHeader = useSetAtom(headerAtom)
	const setShowAccordion = useSetAtom(accordionAtom)
	const setShowSubHeader = useSetAtom(subHeaderAtom)
	const auth = useAuth()
	const updateAuth = useUpdateAuth()
	const [authorities, setAuthorities] = useAtom(authoritiesAtom)

	setShowHeader(false)
	setShowAccordion(false)
	setShowSubHeader(false)
	// // HeadFootLeftSwitch 막기

	const [id, setId] = useState('')
	const [pw, setPw] = useState('')
	const [idPlaceholder, setIdPlaceholder] = useState('아이디')
	const [idPlaceholderColor, setIdPlaceholderColor] = useState('')
	const [pwPlaceholder, setPwPlaceholder] = useState('비밀번호')
	const [pwPlaceholderColor, setPwPlaceholderColor] = useState('')
	const [buttonDisabled, setButtonDisabled] = useState(false)
	const [check, setCheck] = useState(false)
	const [idBottom, setIdBottom] = useState('')
	const [bottomColor, setBottomColor] = useState('')
	const [pwBottom, setPwBottom] = useState('')

	const idRegex = /^[a-z0-9]{4,12}$/
	// const passwordRegex = /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{4,12}$/;
	const passwordRegex = /^[a-z0-9]{4,12}$/

	const handleIdChange = useCallback((e) => {
		const value = e.target.value
		setId(value)
	}, [])

	const handlePwChange = useCallback((e) => {
		const value = e.target.value
		setPw(value)
	}, [])

	const isIdValid = idRegex.test(id)
	const isPasswordValid = passwordRegex.test(pw)

	// 아이디 저장
	const saveIdToLocalStorage = (id) => {
		return localStorage.setItem('savedId', id)
	}

	const removeSavedIdFromLocalStorage = () => {
		return localStorage.removeItem('savedId')
	}

	const getSavedIdFromLocalStorage = () => {
		return localStorage.getItem('savedId')
	}

	useEffect(() => {
		const savedId = getSavedIdFromLocalStorage()
		if (savedId) {
			setId(savedId)
			setCheck(true)
		}
	}, [])

	const handleSaveId = () => {
		setCheck((prev) => !prev)

		if (!check) {
			saveIdToLocalStorage(id)
		} else {
			removeSavedIdFromLocalStorage()
		}
	}

	useEffect(() => {
		setButtonDisabled(!isIdValid || !isPasswordValid)

		if (id && !isIdValid) {
			setIdBottom('올바른 내용이 아닙니다.')
			setBottomColor('#d92f2f')
			setIdPlaceholderColor('#d92f2f')
		} else if (id && isIdValid) {
			setIdBottom('')
			setIdPlaceholderColor('#4ca9ff')
		}

		if (pw && !isPasswordValid) {
			setPwBottom('영문, 숫자 조합 4~12자리로 입력해 주세요')
			setBottomColor('#d92f2f')
			setPwPlaceholderColor('#d92f2f')
		} else if (pw && isPasswordValid) {
			setPwBottom('')
			setPwPlaceholderColor('#4ca9ff')
		}
	}, [id, pw, idBottom, pwBottom])

	useEffect(() => {
		if (id && isIdValid) {
			setIdPlaceholderColor('#4ca9ff')
		} else {
			setIdPlaceholderColor('#d92f2f')
		}
	}, [id])

	useEffect(() => {
		if (pw) {
			setPwPlaceholderColor('#4ca9ff')
		} else {
			setPwPlaceholderColor('#d92f2f')
		}
	}, [pw])

	const handleIdFocus = useCallback(
		(e) => {
			if (id === '') {
				setIdPlaceholderColor('#d92f2f')
				setIdPlaceholder('아이디를 입력해 주세요')
			}
		},
		[id],
	)

	const handleIdBlur = useCallback((e) => {
		setIdPlaceholderColor('#d92f2f')
		setIdPlaceholder('아이디')
	}, [])

	const handlePwFocus = useCallback(() => {
		if (pw === '') {
			setPwPlaceholderColor('#d92f2f')
			// setPwPlaceholder('영문, 숫자 조합 8~12자리로 입력해 주세요');
		}
	}, [pw])

	const handlePwBlur = useCallback(() => {
		setPwPlaceholderColor('black')
		setPwPlaceholder('비밀번호')
	}, [])

	/** 로그인 */
	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault()
			const requestData = {
				id: id,
				password: pw,
			}
			try {
				const { data: res } = await login(requestData)
				const user = res.data
				const name = user.name
				const authorities = user.roles.authorities
				const role = user.roles.role

				localStorage.setItem('accessToken', user?.accessToken)
				localStorage.setItem('refreshToken', user?.refreshToken)
				setAuthorities({ name, role, authorities })
				await updateAuth()

				if (user?.useTempPassword) {
					return showAlert({
						title: '비밀번호를 변경해 주세요.',
						content: `임시 비밀번호를 사용하고 있습니다.\n비밀번호를 변경해 주세요.`,
					})
				}
			} catch (e) {
				loginError(e.data)
			}
		},
		[id, pw],
	)

	const loginError = (error) => {
		if (error.message === '관리자가 승인 대기중 입니다.') {
			showAlert({
				title: '회원가입 승인 중',
				content: '관리자가 승인 대기중 입니다.\n' + '관리자 승인 후 이용하실 수 있습니다.',
			})
		}
		if (error.message === '장기 미 로그인 회원입니다.') {
			showAlert({
				title: '안내',
				content: `장기 미 로그인(90일)으로 인해 로그인이 제한되었습니다.\n카스코 철강으로 문의주세요.`,
			})
		}
		if (error.message === '탈퇴한 회원입니다.') {
			simpleAlert('탈퇴 처리된 회원입니다.')
		}
	}

	const handleKeyPress = (e) => {
		if (e.key == 'Enter') {
			e.preventDefault()
			handleSubmit(e)
		}
	}

	useEffect(() => {
		if (auth && authorities?.role) {
			if (!localStorage.getItem('accessToken')) {
				setAuthorities({ name: '', role: '', authorities: [] })
				updateAuth()
				return
			}
			navigate(authorities.role === '고객사' ? '/userpage/main' : 'main')
		}
	}, [auth, authorities])

	return (
		<Container>
			<SubContainer>
				<Title>
					<img src="/img/login_logo.png" alt="" />
					{/*<Link to={`/userpage/main`}>*/}
					{/*</Link>*/}
				</Title>
				<LoginContainer>
					<LoginSubContainer>
						<InputWrap>
							<img src="/svg/Login_id_icon.svg" style={{ marginLeft: '2px' }} />
							<Input
								type="text"
								value={id}
								onChange={handleIdChange}
								onFocus={handleIdFocus}
								onBlur={handleIdBlur}
								placeholder={idPlaceholder}
								borderColor={idPlaceholderColor}
								onKeyUp={handleKeyPress}
								style={{ color: id === '' ? idPlaceholderColor : 'black' }}
							/>
						</InputWrap>
						{idBottom && <InputBtmWrap bottomColor={bottomColor}>{idBottom}</InputBtmWrap>}
						<InputWrap>
							<img src="/svg/Login_pw_icon.svg" />
							<Input
								type="password"
								value={pw}
								onChange={handlePwChange}
								onFocus={handlePwFocus}
								onBlur={handlePwBlur}
								placeholder={pwPlaceholder}
								borderColor={pwPlaceholderColor}
								onKeyUp={handleKeyPress}
								style={{ color: pw === '' ? pwPlaceholderColor : 'black' }}
							/>
						</InputWrap>
						{pwBottom && <InputBtmWrap bottomColor={bottomColor}>{pwBottom}</InputBtmWrap>}
						<InputBottomWrap>
							<IbwWrap>
								<IbwLeft>
									<StyledCheckMainDiv>
										<StyledCheckSubDiv
											style={{
												backgroundColor: check ? '#4c83d6' : '#E6E6E6',
												marginTop: '-2px',
											}}
											onClick={() => {
												handleSaveId()
											}}
											isChecked={check[0]}
											id="rememberId"
										>
											<CheckImg src="/svg/check.svg" />
										</StyledCheckSubDiv>
									</StyledCheckMainDiv>
									<div style={{ marginLeft: '5px' }}>아이디 저장</div>
								</IbwLeft>
								<IbwRight>
									<Link to={`/findid`}>아이디 찾기</Link> /<Link to={`/reissuepw`}>비밀번호 재발급</Link>
								</IbwRight>
							</IbwWrap>

							<LoginBtnWrap>
								{buttonDisabled ? (
									<LoginBtn disabled>로그인</LoginBtn>
								) : (
									<LoginBtn onClick={handleSubmit}>로그인</LoginBtn>
								)}
							</LoginBtnWrap>
							<IbwTxt>
								아직 회원이 아니세요?
								<Link to={`/signup`}>
									<span style={{ marginLeft: '5px' }}>회원가입</span>
								</Link>
							</IbwTxt>
						</InputBottomWrap>
					</LoginSubContainer>
				</LoginContainer>
				<LoginBottom>
					2023년 1월 이후 공인인증서 로그인이 폐지되었습니다. 회원가입 후 이용해주세요. 계정 분실 등의 문의는 업무
					담당자(
					<span style={{ color: 'black' }}>070-8889-3456~9</span>)로 문의해 주세요.
					<LoginBottom2>
						<p>Email: kasko@kasko.co.kr </p> <p>Fax: 031-719-6540</p>
					</LoginBottom2>
				</LoginBottom>
				<ImgWrap>
					<img src="/img/login_kasko.png" />
					{/*<Link to={`/main`}>*/}
					{/*</Link>*/}
					<p>Copyright 2023 카스코철강. All Rights Reserved.</p>
				</ImgWrap>
			</SubContainer>
		</Container>
	)
}

export default Login
