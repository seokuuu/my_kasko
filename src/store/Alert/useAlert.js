import { useSetAtom } from 'jotai'
import { alertAtom, initAlertAtomData } from './alertAtom'

const useAlert = () => {
	const setAlert = useSetAtom(alertAtom)

	const simpleAlert = (title, func = () => {}) => {
		setAlert({ ...initAlertAtomData, isOpen: true, isConfirm: false, title, func })
	}

	const showAlert = ({ title, content, func }) => {
		setAlert({ ...initAlertAtomData, isOpen: true, isConfirm: false, title, content, func })
	}

	const simpleConfirm = (title, func) => {
		setAlert({ ...initAlertAtomData, isOpen: true, isConfirm: true, title, func })
	}

	const showConfirm = ({ title, content, func }) => {
		setAlert({ ...initAlertAtomData, isOpen: true, isConfirm: true, title, content, func })
	}

	const redAlert = (title, func) => {
		setAlert({ ...initAlertAtomData, isOpen: true, isConfirm: true, isRed: true, title, func })
	}

	const closeAlert = () => {
		setAlert(initAlertAtomData)
	}

	return { simpleAlert, showAlert, simpleConfirm, showConfirm, redAlert, closeAlert }
}

export default useAlert
