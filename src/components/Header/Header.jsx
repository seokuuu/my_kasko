import React from 'react'
import { styled } from 'styled-components'
import useAuth from '../../store/Auth/useAuth'

const Header = () => {
	const { getName, logout } = useAuth()
	const name = getName().name
	const customerName = getName().customerName

	return (
		<HeaderWrap>
			<div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
				<div style={{ marginLeft: '20px' }}>
					<img src="/img/header_logo.png" style={{ cursor: 'pointer' }} alt="main-logo" />
				</div>
				<UserWrap>
					<div>
						<strong>
							{customerName} / {name}
						</strong>{' '}
						님
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
	width: calc(100vw - 20px);
	min-width: 1900px;
	background-color: #061737;
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
