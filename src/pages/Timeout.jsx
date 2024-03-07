import { useEffect } from 'react'
import useAlert from '../store/Alert/useAlert'
import { useNavigate } from 'react-router-dom'

const Timeout = () => {
	const navigate = useNavigate()
	const { simpleAlert } = useAlert()
	useEffect(() => {
		simpleAlert('서버와 연결이 끊겼습니다.')
		navigate(-1)
	}, [])
	return <></>
}
export default Timeout
