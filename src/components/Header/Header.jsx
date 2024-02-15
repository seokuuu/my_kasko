import React, { startTransition } from 'react'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../store/Auth/useAuth'

const Header = () => {
	const navigate = useNavigate()
	const { getName, logout } = useAuth()

	const goToHome = () => {
		startTransition(() => {
			navigate('/')
		})
	}

	return (
		<HeaderWrap>
			<div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
				<div style={{ marginLeft: '20px' }}>
					<img src="/img/header_logo.png" onClick={goToHome} style={{ cursor: 'pointer' }} />
				</div>
				<UserWrap>
					<div>
						<strong>{getName()}</strong> 님
					</div>
					<div>
						<Logout onClick={logout}>[로그아웃]</Logout>
					</div>
				</UserWrap>
			</div>
		</HeaderWrap>
	)
}

export default Header

const HeaderWrap = styled.div`
	display: flex;
	height: 65px;
	width: 100%;
	max-width: 100%;
	background-color: #061737;
	border: 1px solid black;
	align-items: center;
`
const UserWrap = styled.div`
	display: flex;
	width: auto;
	margin-right: 20px;
	justify-content: space-between;
	gap: 32px;
	color: #ffffff;
`
const Logout = styled.button`
	background: #061737;
	color: #ffffff;
`
