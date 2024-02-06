import { useAtomValue, useSetAtom } from 'jotai'
import { authAtom, initAuth } from './auth'
import { useNavigate } from 'react-router-dom'
import useAlert from '../Alert/useAlert'

const useAuth = () => {
	const { showAlert } = useAlert()
	const navigate = useNavigate()
	const auth = useAtomValue(authAtom)
	const setAuth = useSetAtom(authAtom)

	const authRouter = () => {
		const token = localStorage.getItem('accessToken')
		if (token === null || !auth.isAuth) {
			logout()
		}
		navigate(auth.role === '고객사' ? '/userpage/main' : 'main', { replace: true })
	}

	// 로그인
	const setLogin = (user) => {
		const name = user.name
		const role = user.roles.role
		const authorities = user.roles.authorities
		const token = user.accessToken
		const isTempPassword = user?.useTempPassword

		if (isTempPassword) {
			showAlert({
				title: '비밀번호를 변경해 주세요.',
				content: `임시 비밀번호를 사용하고 있습니다.\n비밀번호를 변경해 주세요.`,
			})
		}

		localStorage.setItem('accessToken', token)
		setAuth({ ...initAuth, isAuth: true, name, role, authorities })
		navigate(role === '고객사' ? '/userpage/main' : 'main', { replace: true })
	}

	// 로그아웃
	const logout = () => {
		setAuth(initAuth)
		localStorage.removeItem('accessToken')
		navigate('/', { replace: true })
	}

	return {
		authRouter,
		setLogin,
		logout,
	}
}
export default useAuth