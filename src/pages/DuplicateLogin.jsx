import { useEffect } from 'react'
import useAuth from '../store/Auth/useAuth'
import useAlert from '../store/Alert/useAlert'

const DuplicateLogin = () => {
	const { logout } = useAuth()
	const { simpleAlert } = useAlert()
	useEffect(() => {
		simpleAlert('다른 기기에서 로그인 되었습니다.')
		logout()
	}, [])
	return <></>
}
export default DuplicateLogin
