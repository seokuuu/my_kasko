import useAuth from '../store/Auth/useAuth'
import { useEffect } from 'react'
import useAlert from '../store/Alert/useAlert'

const NotAuth = () => {
	const { logout } = useAuth()
	const { simpleAlert } = useAlert()
	useEffect(() => {
		simpleAlert('로그인 후 이용해 주세요.')
		logout()
	}, [])
	return <></>
}
export default NotAuth
